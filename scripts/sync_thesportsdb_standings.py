#!/usr/bin/env python3
"""Build the current EPL table from TheSportsDB's free season-results feed."""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "app" / "data"
SOURCE_URL = "https://www.thesportsdb.com/api/v1/json/123/eventsseason.php?id=4328&s=2026-2027"
NAME_ALIASES = {
    "Brighton and Hove Albion": "brighton",
    "Manchester United": "manutd",
    "Manchester City": "mancity",
    "Newcastle United": "newcastle",
    "Nottingham Forest": "nottinghamforest",
    "Tottenham Hotspur": "tottenham",
    "Crystal Palace": "crystalpalace",
    "Aston Villa": "astonvilla",
    "Coventry City": "coventry",
    "Hull City": "hullcity",
    "Ipswich Town": "ipswich",
    "Leeds United": "leeds",
    "Sunderland": "sunderland",
    "Bournemouth": "bournemouth",
    "Brentford": "brentford",
    "Liverpool": "liverpool",
    "Arsenal": "arsenal",
    "Everton": "everton",
    "Fulham": "fulham",
    "Chelsea": "chelsea",
}


def main() -> int:
    request = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "TacticVision-data-sync/1.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        events = (json.load(response).get("events") or [])
    teams = json.loads((DATA / "teams.json").read_text(encoding="utf-8"))
    table = {team_id: {"teamId": team_id, "played": 0, "wins": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0, "points": 0} for team_id in teams}
    results = []
    completed = 0
    for event in events:
        home_score, away_score = event.get("intHomeScore"), event.get("intAwayScore")
        if home_score is None or away_score is None:
            continue
        home_id, away_id = NAME_ALIASES.get(event.get("strHomeTeam")), NAME_ALIASES.get(event.get("strAwayTeam"))
        if not home_id or not away_id:
            raise ValueError(f"Unmapped team: {event.get('strHomeTeam')} / {event.get('strAwayTeam')}")
        home_score, away_score = int(home_score), int(away_score)
        home, away = table[home_id], table[away_id]
        for row, scored, conceded in ((home, home_score, away_score), (away, away_score, home_score)):
            row["played"] += 1; row["goalsFor"] += scored; row["goalsAgainst"] += conceded
        if home_score > away_score:
            home["wins"] += 1; home["points"] += 3; away["losses"] += 1
        elif away_score > home_score:
            away["wins"] += 1; away["points"] += 3; home["losses"] += 1
        else:
            home["draws"] += 1; away["draws"] += 1; home["points"] += 1; away["points"] += 1
        results.append({"id": event.get("idEvent"), "date": event.get("dateEvent"), "homeTeamId": home_id, "awayTeamId": away_id, "homeScore": home_score, "awayScore": away_score, "status": event.get("strStatus") or "FT"})
        completed += 1
    for row in table.values():
        row["goalDifference"] = row["goalsFor"] - row["goalsAgainst"]
    ordered = sorted(table.values(), key=lambda row: (-row["points"], -row["goalDifference"], -row["goalsFor"], teams[row["teamId"]]["name"]))
    for rank, row in enumerate(ordered, 1):
        row["rank"] = rank
    output = {"schemaVersion": "1.0.0", "season": "2026-27", "asOf": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"), "sourceId": "thesportsdb-free-season-results", "sourceUrl": SOURCE_URL, "completedMatches": completed, "standings": ordered, "results": sorted(results, key=lambda row: (row["date"] or "", row["id"] or ""), reverse=True)}
    (DATA / "standings.json").write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Synced standings from TheSportsDB: {completed} completed matches, {len(ordered)} teams")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
