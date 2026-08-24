#!/usr/bin/env python3
"""Build the 2025/26 final EPL table for current-team historical comparison."""

from __future__ import annotations

import hashlib
import json
import re
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "app" / "data"
RAW_DIR = ROOT / "data" / "raw" / "openfootball" / "2025-26"
SOURCE_URL = "https://raw.githubusercontent.com/openfootball/england/master/2025-26/1-premierleague.txt"
RESULT = re.compile(r"^\s+(?:\d{2}:\d{2}\s+)?(.+?)\s{2,}(\d+)-(\d+)(?:\s+\([^)]*\))?\s{2,}(.+?)\s*$")
ALIASES = {
    "Arsenal": "arsenal", "Aston Villa": "astonvilla", "Bournemouth": "bournemouth", "Brentford": "brentford",
    "Brighton & Hove Albion": "brighton", "Chelsea FC": "chelsea", "Crystal Palace": "crystalpalace", "Everton": "everton",
    "Fulham": "fulham", "Leeds United": "leeds", "Liverpool": "liverpool", "Manchester City": "mancity",
    "Manchester United": "manutd", "Newcastle United": "newcastle", "Nottingham Forest": "nottinghamforest",
    "Sunderland": "sunderland", "Tottenham Hotspur": "tottenham", "Burnley": "burnley", "West Ham United": "westham",
    "Wolverhampton Wanderers": "wolves",
}


def empty(team_id: str) -> dict:
    return {"teamId": team_id, "played": 0, "wins": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0, "points": 0}


def apply(row: dict, scored: int, conceded: int) -> None:
    row["played"] += 1; row["goalsFor"] += scored; row["goalsAgainst"] += conceded
    if scored > conceded: row["wins"] += 1; row["points"] += 3
    elif scored == conceded: row["draws"] += 1; row["points"] += 1
    else: row["losses"] += 1


def main() -> int:
    request = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "TacticVision-data-sync/1.0"})
    with urllib.request.urlopen(request, timeout=30) as response: content = response.read()
    stats = {team_id: empty(team_id) for team_id in set(ALIASES.values())}
    matches = 0
    for line_number, line in enumerate(content.decode("utf-8").splitlines(), 1):
        match = RESULT.match(line)
        if not match: continue
        home_name, home_score, away_score, away_name = match.groups()
        if home_name not in ALIASES or away_name not in ALIASES: raise ValueError(f"Unknown team at line {line_number}: {home_name} / {away_name}")
        home_id, away_id = ALIASES[home_name], ALIASES[away_name]
        apply(stats[home_id], int(home_score), int(away_score)); apply(stats[away_id], int(away_score), int(home_score)); matches += 1
    if matches != 380: raise ValueError(f"Expected 380 completed matches, parsed {matches}")
    for row in stats.values(): row["goalDifference"] = row["goalsFor"] - row["goalsAgainst"]
    ordered = sorted(stats.values(), key=lambda row: (-row["points"], -row["goalDifference"], -row["goalsFor"], row["teamId"]))
    for rank, row in enumerate(ordered, 1): row["rank"] = rank
    current_teams = json.loads((DATA / "teams.json").read_text(encoding="utf-8"))
    current_rows = {team_id: next((row for row in ordered if row["teamId"] == team_id), None) for team_id in current_teams}
    collected = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    output = {"schemaVersion": "1.0.0", "asOf": collected, "sourceId": "openfootball-england-public-domain", "sourceUrl": SOURCE_URL, "sourceSha256": hashlib.sha256(content).hexdigest(), "previousSeason": "2025-26", "completedMatches": matches, "teams": current_rows, "previousLeagueTeams": ordered}
    RAW_DIR.mkdir(parents=True, exist_ok=True); (RAW_DIR / "1-premierleague.txt").write_bytes(content)
    (DATA / "team-history.json").write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Synced 2025/26 history: {matches} matches, {sum(row is not None for row in current_rows.values())} returning EPL teams")
    return 0


if __name__ == "__main__": raise SystemExit(main())
