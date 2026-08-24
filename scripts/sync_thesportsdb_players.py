#!/usr/bin/env python3
"""Cross-check the eight Player Compare profiles with TheSportsDB."""

from __future__ import annotations

import json
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "app" / "data" / "player-provider-crosscheck.json"
API_ROOT = "https://www.thesportsdb.com/api/v1/json/123"
PLAYER_QUERIES = {
    "haaland": "Erling Haaland",
    "isak": "Alexander Isak",
    "saka": "Bukayo Saka",
    "palmer": "Cole Palmer",
    "rice": "Declan Rice",
    "saliba": "William Saliba",
    "trent": "Trent Alexander-Arnold",
    "alisson": "Alisson Becker",
}


def read_json(path: Path) -> dict:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def fetch_player(name: str) -> list[dict]:
    url = f"{API_ROOT}/searchplayers.php?{urllib.parse.urlencode({'p': name})}"
    request = urllib.request.Request(url, headers={"User-Agent": "TacticVision-data-sync/1.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response).get("player") or []


def select_player(records: list[dict], expected_name: str) -> dict:
    exact = [record for record in records if record.get("strPlayer") == expected_name]
    if len(exact) != 1:
        names = [record.get("strPlayer") for record in records]
        raise ValueError(f"Expected one exact result for {expected_name!r}, received {names!r}")
    return exact[0]


def main() -> int:
    people = read_json(ROOT / "app" / "data" / "people-comparison.json")["players"]
    team_crosscheck = read_json(ROOT / "app" / "data" / "team-provider-crosscheck.json")["teams"]
    provider_team_to_canonical = {
        team["providerTeamId"]: team_id for team_id, team in team_crosscheck.items()
    }
    if set(people) != set(PLAYER_QUERIES):
        raise ValueError("Player query IDs must exactly match people-comparison.json players")

    players = {}
    warnings = []
    provider_ids = []
    for index, (player_id, query) in enumerate(PLAYER_QUERIES.items()):
        if index:
            time.sleep(2.1)
        record = select_player(fetch_player(query), query)
        provider_id = record.get("idPlayer")
        if not provider_id:
            raise ValueError(f"{query} has no TheSportsDB player ID")
        provider_ids.append(provider_id)
        birth_date = record.get("dateBorn")
        if birth_date and birth_date != people[player_id]["birthDate"]:
            warnings.append({
                "playerId": player_id,
                "type": "birth-date-mismatch",
                "wikidata": people[player_id]["birthDate"],
                "theSportsDb": birth_date,
            })
        provider_team_id = record.get("idTeam")
        players[player_id] = {
            "playerId": player_id,
            "providerPlayerId": provider_id,
            "providerName": record.get("strPlayer"),
            "providerTeamId": provider_team_id,
            "canonicalTeamId": provider_team_to_canonical.get(provider_team_id),
            "currentTeam": record.get("strTeam"),
            "position": record.get("strPosition"),
            "nationality": record.get("strNationality"),
            "birthDate": birth_date,
            "height": record.get("strHeight"),
            "preferredSide": record.get("strSide"),
            "number": record.get("strNumber"),
            "thumbnailUrl": record.get("strThumb"),
            "cutoutUrl": record.get("strCutout"),
        }

    if len(provider_ids) != len(set(provider_ids)):
        raise ValueError("Duplicate TheSportsDB player IDs detected")
    collected_at = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    output = {
        "schemaVersion": "1.0.0",
        "asOf": collected_at,
        "sourceId": "thesportsdb-free-community",
        "sourceUrl": "https://www.thesportsdb.com/",
        "usage": "current-affiliation-position-and-image-cross-check",
        "limitations": [
            "Crowd-sourced values may be stale and must not override conflicting verified facts.",
            "Height, preferred side, and squad number may be null on the free endpoint.",
            "No performance statistics are sourced from this endpoint.",
        ],
        "warnings": warnings,
        "players": players,
    }
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Cross-checked TheSportsDB: {len(players)} players, {len(warnings)} warnings")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
