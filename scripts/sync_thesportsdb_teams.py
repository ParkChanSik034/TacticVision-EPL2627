#!/usr/bin/env python3
"""Cross-check the EPL 2026/27 team set with TheSportsDB's free API."""

from __future__ import annotations

import json
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "app" / "data" / "team-provider-crosscheck.json"
API_ROOT = "https://www.thesportsdb.com/api/v1/json/123"
LEAGUE_ID = "4328"
SEASON = "2026-2027"

# The free league-list endpoint is capped at ten records. Querying each known
# canonical team explicitly avoids treating that truncated list as complete.
TEAM_QUERIES = {
    "arsenal": "Arsenal",
    "astonvilla": "Aston Villa",
    "bournemouth": "Bournemouth",
    "brentford": "Brentford",
    "brighton": "Brighton and Hove Albion",
    "chelsea": "Chelsea",
    "coventry": "Coventry City",
    "crystalpalace": "Crystal Palace",
    "everton": "Everton",
    "fulham": "Fulham",
    "hullcity": "Hull City",
    "ipswich": "Ipswich Town",
    "leeds": "Leeds United",
    "liverpool": "Liverpool",
    "mancity": "Manchester City",
    "manutd": "Manchester United",
    "newcastle": "Newcastle United",
    "nottinghamforest": "Nottingham Forest",
    "sunderland": "Sunderland",
    "tottenham": "Tottenham Hotspur",
}


def fetch_json(endpoint: str, params: dict[str, str]) -> dict:
    url = f"{API_ROOT}/{endpoint}?{urllib.parse.urlencode(params)}"
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "TacticVision-data-sync/1.0"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def read_canonical_teams() -> dict:
    with (ROOT / "app" / "data" / "teams.json").open(encoding="utf-8") as handle:
        return json.load(handle)


def select_team(records: list[dict], expected_name: str) -> dict:
    exact = [record for record in records if record.get("strTeam") == expected_name]
    if len(exact) != 1:
        names = [record.get("strTeam") for record in records]
        raise ValueError(f"Expected one exact result for {expected_name!r}, received {names!r}")
    return exact[0]


def main() -> int:
    canonical = read_canonical_teams()
    if set(canonical) != set(TEAM_QUERIES):
        raise ValueError(
            "TheSportsDB mapping differs from teams.json: "
            f"missing={set(canonical) - set(TEAM_QUERIES)}, "
            f"extra={set(TEAM_QUERIES) - set(canonical)}"
        )

    teams = {}
    provider_ids = []
    warnings = []
    for index, (team_id, query) in enumerate(TEAM_QUERIES.items()):
        if index:
            time.sleep(2.1)  # Stay below the documented free 30 requests/minute.
        payload = fetch_json("searchteams.php", {"t": query})
        record = select_team(payload.get("teams") or [], query)
        affiliation_matches = record.get("idLeague") == LEAGUE_ID
        if not affiliation_matches:
            warnings.append({
                "teamId": team_id,
                "type": "league-affiliation-mismatch",
                "expectedLeagueId": LEAGUE_ID,
                "providerLeagueId": record.get("idLeague"),
                "providerLeagueName": record.get("strLeague"),
            })
        provider_id = record.get("idTeam")
        if not provider_id:
            raise ValueError(f"{query} has no TheSportsDB team ID")
        provider_ids.append(provider_id)
        teams[team_id] = {
            "teamId": team_id,
            "canonicalName": canonical[team_id]["name"],
            "providerTeamId": provider_id,
            "providerName": record.get("strTeam"),
            "providerShortName": record.get("strTeamShort"),
            "providerLeagueId": record.get("idLeague"),
            "providerLeagueName": record.get("strLeague"),
            "affiliationMatches": affiliation_matches,
            "providerApiFootballId": record.get("idAPIfootball"),
            "stadium": record.get("strStadium"),
            "website": record.get("strWebsite"),
            "badgeUrl": record.get("strBadge"),
        }

    if len(provider_ids) != len(set(provider_ids)):
        raise ValueError("Duplicate TheSportsDB team IDs detected")

    collected_at = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    output = {
        "schemaVersion": "1.0.0",
        "season": SEASON,
        "asOf": collected_at,
        "sourceId": "thesportsdb-free-community",
        "sourceUrl": "https://www.thesportsdb.com/",
        "licenseNote": "Crowd-sourced cross-check only; verify material facts against primary sources.",
        "usage": "provider-id-and-affiliation-cross-check",
        "limitations": [
            "The free league table endpoint returns only five rows.",
            "The free league team endpoint returns only ten rows.",
            "This dataset is not the source of standings or performance statistics.",
        ],
        "warnings": warnings,
        "teams": teams,
    }
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Cross-checked TheSportsDB: {len(teams)} teams, {len(warnings)} warnings for {SEASON}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
