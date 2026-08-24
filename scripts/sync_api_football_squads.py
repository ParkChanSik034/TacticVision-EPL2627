#!/usr/bin/env python3
"""Sync current 20-team squads from API-Football into the canonical data contract."""

from __future__ import annotations

import json
import os
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "app" / "data"
API_ROOT = "https://v3.football.api-sports.io"
TEAM_API_IDS = {
    "arsenal": 42, "astonvilla": 66, "bournemouth": 35, "brentford": 55,
    "brighton": 51, "chelsea": 49, "coventry": 1346, "crystalpalace": 52,
    "everton": 45, "fulham": 36, "hullcity": 64, "ipswich": 57,
    "leeds": 63, "liverpool": 40, "mancity": 50, "manutd": 33,
    "newcastle": 34, "nottinghamforest": 65, "sunderland": 746, "tottenham": 47,
}
POSITION_CODES = {
    "Goalkeeper": "GK",
    "Defender": "CB",
    "Midfielder": "CM",
    "Attacker": "ST",
}
STARTER_QUOTAS = {"Goalkeeper": 1, "Defender": 4, "Midfielder": 3, "Attacker": 3}


def load_env() -> None:
    path = ROOT / ".env"
    if not path.exists():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        name, value = line.split("=", 1)
        os.environ.setdefault(name.strip(), value.strip().strip("\"'"))


def fetch_squad(team_api_id: int, api_key: str) -> dict:
    query = urllib.parse.urlencode({"team": team_api_id})
    request = urllib.request.Request(
        f"{API_ROOT}/players/squads?{query}",
        headers={"x-apisports-key": api_key, "User-Agent": "TacticVision-data-sync/1.0"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = json.load(response)
    if payload.get("errors"):
        raise RuntimeError(f"API-Football error for team {team_api_id}: {payload['errors']}")
    records = payload.get("response") or []
    if len(records) != 1:
        raise ValueError(f"Expected one squad for team {team_api_id}, received {len(records)}")
    return records[0]


def player_sort_key(player: dict) -> tuple:
    number = player.get("number")
    return (number is None, number or 999, player.get("name") or "")


def select_default_xi(rows: list[dict]) -> tuple[list[dict], list[dict]]:
    selected: list[dict] = []
    selected_ids: set[int] = set()
    for position, quota in STARTER_QUOTAS.items():
        candidates = sorted((row for row in rows if row.get("position") == position), key=player_sort_key)
        for row in candidates[:quota]:
            selected.append(row)
            selected_ids.add(row["id"])
    if len(selected) < 11:
        remaining = sorted((row for row in rows if row["id"] not in selected_ids), key=player_sort_key)
        selected.extend(remaining[: 11 - len(selected)])
        selected_ids.update(row["id"] for row in selected)
    if len(selected) != 11:
        raise ValueError(f"Could not construct an 11-player default selection from {len(rows)} players")
    substitutes = sorted((row for row in rows if row["id"] not in selected_ids), key=player_sort_key)
    return selected, substitutes


def squad_entry(row: dict) -> dict:
    position = POSITION_CODES.get(row.get("position"), "CM")
    return {
        "id": f"player-api-{row['id']}",
        "name": row["name"],
        "position": position,
        "availablePositions": [position],
        "number": row.get("number"),
        "photoUrl": row.get("photo"),
    }


def main() -> int:
    load_env()
    api_key = os.environ.get("API_FOOTBALL_KEY", "").strip()
    if not api_key:
        raise SystemExit("API_FOOTBALL_KEY is missing from the environment or .env")
    teams = json.loads((DATA / "teams.json").read_text(encoding="utf-8"))
    if set(teams) != set(TEAM_API_IDS):
        raise ValueError("API-Football team mapping must exactly match teams.json")

    players: dict[str, dict] = {}
    squads: dict[str, dict] = {}
    provider_teams: dict[str, dict] = {}
    for index, (team_id, api_team_id) in enumerate(TEAM_API_IDS.items()):
        if index:
            time.sleep(6.2)
        record = fetch_squad(api_team_id, api_key)
        team_record = record["team"]
        rows = record.get("players") or []
        if len(rows) < 11:
            raise ValueError(f"{team_id} returned only {len(rows)} players")
        starters, substitutes = select_default_xi(rows)
        for row in rows:
            player_id = f"player-api-{row['id']}"
            if player_id in players:
                raise ValueError(f"Duplicate player ID across squads: {player_id}")
            position = POSITION_CODES.get(row.get("position"), "CM")
            age = row.get("age")
            if not isinstance(age, int) or not 15 <= age <= 60:
                age = None
            players[player_id] = {
                "name": row["name"],
                "teamId": team_id,
                "number": row.get("number"),
                "position": position,
                "age": age,
                "height": None,
                "foot": None,
                "nationality": "미확정",
                "positions": [position],
                "photoUrl": row.get("photo"),
                "providerPlayerId": row["id"],
                "dataStatus": "api-football-current-squad",
            }
        squads[team_id] = {
            "starters": [squad_entry(row) for row in starters],
            "substitutes": [squad_entry(row) for row in substitutes],
            "selectionStatus": "tacticvision-provisional-default-xi",
            "sourceId": "api-football",
        }
        provider_teams[team_id] = {
            "canonicalTeamId": team_id,
            "providerTeamId": team_record["id"],
            "providerName": team_record["name"],
            "playerCount": len(rows),
        }
        print(f"{team_id}: {len(rows)} players")

    collected_at = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    (DATA / "players.json").write_text(json.dumps(players, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (DATA / "squads.json").write_text(json.dumps(squads, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    audit = {
        "schemaVersion": "1.0.0",
        "asOf": collected_at,
        "sourceId": "api-football",
        "sourceUrl": "https://www.api-football.com/",
        "usage": "current-team-squad-registration",
        "limitations": [
            "The endpoint supplies broad positions rather than detailed tactical positions.",
            "Nationality, height, and preferred foot require a separate verified enrichment source.",
            "The default XI is a TacticVision provisional positional selection, not a match lineup.",
        ],
        "teams": provider_teams,
        "playerCount": len(players),
    }
    for team in teams.values():
        if team.get("dataStatus") == "planned":
            team["dataStatus"] = "partial"
    (DATA / "teams.json").write_text(json.dumps(teams, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (DATA / "squad-provider.json").write_text(json.dumps(audit, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Synced API-Football squads: {len(squads)} teams, {len(players)} players")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
