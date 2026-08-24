#!/usr/bin/env python3
"""Fetch openfootball EPL 2026/27 and build canonical Team Compare facts."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_URL = "https://raw.githubusercontent.com/openfootball/england/master/2026-27/1-premierleague.txt"
RAW_DIR = ROOT / "data" / "raw" / "openfootball" / "2026-27"
RAW_FILE = RAW_DIR / "1-premierleague.txt"
SNAPSHOT_FILE = RAW_DIR / "snapshot.json"
OUTPUT_FILE = ROOT / "app" / "data" / "team-comparison.json"

TEAM_ALIASES = {
    "Arsenal FC": "arsenal",
    "Aston Villa FC": "astonvilla",
    "AFC Bournemouth": "bournemouth",
    "Brentford FC": "brentford",
    "Brighton & Hove Albion FC": "brighton",
    "Chelsea FC": "chelsea",
    "Coventry City FC": "coventry",
    "Crystal Palace FC": "crystalpalace",
    "Everton FC": "everton",
    "Fulham FC": "fulham",
    "Hull City AFC": "hullcity",
    "Ipswich Town FC": "ipswich",
    "Leeds United FC": "leeds",
    "Liverpool FC": "liverpool",
    "Manchester City FC": "mancity",
    "Manchester United FC": "manutd",
    "Newcastle United FC": "newcastle",
    "Nottingham Forest FC": "nottinghamforest",
    "Sunderland AFC": "sunderland",
    "Tottenham Hotspur FC": "tottenham",
}

RESULT = re.compile(
    r"^\s+(?:\d{2}:\d{2}\s+)?(.+?)\s{2,}v\s+(.+?)\s{2,}(\d+)-(\d+)\s+\("
)


def read_teams() -> dict[str, dict]:
    with (ROOT / "app" / "data" / "teams.json").open(encoding="utf-8") as handle:
        return json.load(handle)


def fetch_source() -> tuple[bytes, dict[str, str | None]]:
    request = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "TacticVision-data-sync/1.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        content = response.read()
        headers = {
            "etag": response.headers.get("ETag"),
            "lastModified": response.headers.get("Last-Modified"),
        }
    return content, headers


def current_snapshot_sha() -> str | None:
    if not SNAPSHOT_FILE.exists():
        return None
    with SNAPSHOT_FILE.open(encoding="utf-8") as handle:
        return json.load(handle).get("sha256")


def empty_stats(team_id: str, team: dict) -> dict:
    return {
        "teamId": team_id,
        "name": team["name"],
        "shortName": team["shortName"],
        "played": 0,
        "wins": 0,
        "draws": 0,
        "losses": 0,
        "goalsFor": 0,
        "goalsAgainst": 0,
        "goalDifference": 0,
        "points": 0,
        "pointsPerGame": None,
    }


def apply_result(stats: dict, team_id: str, goals_for: int, goals_against: int) -> None:
    row = stats[team_id]
    row["played"] += 1
    row["goalsFor"] += goals_for
    row["goalsAgainst"] += goals_against
    if goals_for > goals_against:
        row["wins"] += 1
        row["points"] += 3
    elif goals_for == goals_against:
        row["draws"] += 1
        row["points"] += 1
    else:
        row["losses"] += 1


def build_team_comparison(text: str, teams: dict[str, dict], collected_at: str, sha256: str) -> dict:
    stats = {team_id: empty_stats(team_id, team) for team_id, team in teams.items()}
    matches = 0
    for line_number, line in enumerate(text.splitlines(), start=1):
        match = RESULT.match(line)
        if not match:
            continue
        home_name, away_name, home_goals, away_goals = match.groups()
        if home_name not in TEAM_ALIASES or away_name not in TEAM_ALIASES:
            raise ValueError(f"Unknown team alias at source line {line_number}: {home_name!r} v {away_name!r}")
        home_id, away_id = TEAM_ALIASES[home_name], TEAM_ALIASES[away_name]
        if home_id not in teams or away_id not in teams:
            raise ValueError(f"Source team is missing from teams.json: {home_id} or {away_id}")
        home_score, away_score = int(home_goals), int(away_goals)
        apply_result(stats, home_id, home_score, away_score)
        apply_result(stats, away_id, away_score, home_score)
        matches += 1

    for row in stats.values():
        row["goalDifference"] = row["goalsFor"] - row["goalsAgainst"]
        row["pointsPerGame"] = round(row["points"] / row["played"], 2) if row["played"] else None

    return {
        "schemaVersion": "1.0.0",
        "season": "2026-27",
        "asOf": collected_at,
        "sourceId": "openfootball-england-public-domain",
        "sourceUrl": SOURCE_URL,
        "sourceSha256": sha256,
        "completedMatches": matches,
        "metrics": {
            "played": {"unit": "matches", "layer": "external-facts"},
            "wins": {"unit": "matches", "layer": "external-facts"},
            "draws": {"unit": "matches", "layer": "external-facts"},
            "losses": {"unit": "matches", "layer": "external-facts"},
            "goalsFor": {"unit": "goals", "layer": "external-facts"},
            "goalsAgainst": {"unit": "goals", "layer": "external-facts"},
            "goalDifference": {"unit": "goals", "layer": "derived-fact"},
            "points": {"unit": "points", "layer": "derived-fact"},
            "pointsPerGame": {"unit": "points-per-match", "layer": "derived-fact"},
        },
        "teams": stats,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--force", action="store_true", help="Rebuild outputs even when the source SHA is unchanged")
    args = parser.parse_args()

    teams = read_teams()
    alias_ids = set(TEAM_ALIASES.values())
    if alias_ids != set(teams):
        raise ValueError(f"Alias IDs differ from teams.json: missing={set(teams)-alias_ids}, extra={alias_ids-set(teams)}")

    content, response_headers = fetch_source()
    text = content.decode("utf-8")
    sha256 = hashlib.sha256(content).hexdigest()
    if not args.force and sha256 == current_snapshot_sha():
        print(f"openfootball source unchanged: sha256={sha256}")
        return 0

    collected_at = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    output = build_team_comparison(text, teams, collected_at, sha256)

    RAW_DIR.mkdir(parents=True, exist_ok=True)
    RAW_FILE.write_bytes(content)
    SNAPSHOT_FILE.write_text(json.dumps({
        "sourceId": "openfootball-england-public-domain",
        "sourceUrl": SOURCE_URL,
        "collectedAt": collected_at,
        "sha256": sha256,
        **response_headers,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    OUTPUT_FILE.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Synced openfootball: {output['completedMatches']} completed matches, {len(output['teams'])} teams, sha256={sha256}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
