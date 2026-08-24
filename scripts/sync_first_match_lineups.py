#!/usr/bin/env python3
"""Sync each EPL team's first 2026/27 starting XI from API-Football."""

from __future__ import annotations

import json
import os
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
API_ROOT = "https://v3.football.api-sports.io"
SPORTS_DB_ROOT = "https://www.thesportsdb.com/api/v1/json/123"


def load_json(path: Path):
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def load_key() -> str:
    for raw in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
        if "=" not in raw or raw.lstrip().startswith("#"):
            continue
        key, value = raw.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip("\"'"))
    value = os.environ.get("API_FOOTBALL_KEY", "")
    if not value:
        raise RuntimeError("API_FOOTBALL_KEY is missing")
    return value


def fetch_json(url: str, headers=None):
    request = urllib.request.Request(url, headers=headers or {"User-Agent": "TacticVision/1.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def slot_position(row: int, column: int, row_counts: dict[int, int]) -> str:
    count = row_counts[row]
    last = max(row_counts)
    if row == 1:
        return "GK"
    if row == 2:
        maps = {3: ["LCB", "CB", "RCB"], 4: ["LB", "LCB", "RCB", "RB"], 5: ["LWB", "LCB", "CB", "RCB", "RWB"]}
        return maps.get(count, ["CB"] * count)[column - 1]
    if row == last:
        maps = {1: ["ST"], 2: ["LF", "RF"], 3: ["LW", "ST", "RW"], 4: ["LW", "LF", "RF", "RW"]}
        return maps.get(count, ["ST"] * count)[column - 1]
    advanced = row == last - 1
    maps = ({1: ["AM"], 2: ["LAM", "RAM"], 3: ["LAM", "AM", "RAM"], 4: ["LM", "LCM", "RCM", "RM"]} if advanced else
            {1: ["DM"], 2: ["LDM", "RDM"], 3: ["LCM", "CM", "RCM"], 4: ["LM", "LCM", "RCM", "RM"]})
    return maps.get(count, ["CM"] * count)[column - 1]


def parse_lineup(team_id: str, event_id: str, fixture_id: str, payload: dict, canonical_players: dict):
    raw_starters = [entry["player"] for entry in payload.get("startXI", [])]
    row_counts: dict[int, int] = {}
    for player in raw_starters:
        row, _ = map(int, player["grid"].split(":"))
        row_counts[row] = row_counts.get(row, 0) + 1
    starters = []
    for player in raw_starters:
        row, column = map(int, player["grid"].split(":"))
        player_id = f"player-api-{player['id']}"
        canonical = canonical_players.get(player_id, {})
        count = row_counts[row]
        x = 50 if count == 1 else 14 + (column - 1) * (72 / (count - 1))
        last = max(row_counts)
        y = 92 if row == 1 else (50 if last == 2 else 76 - (row - 2) * (58 / (last - 2)))
        starters.append({"id": player_id, "name": canonical.get("koreanName") or player["name"], "number": player.get("number"), "position": slot_position(row, column, row_counts), "grid": player["grid"], "x": round(x, 2), "y": round(y, 2)})
    position_map = {"G": "GK", "D": "CB", "M": "CM", "F": "ST"}
    substitutes = []
    for entry in payload.get("substitutes", []):
        player = entry["player"]
        player_id = f"player-api-{player['id']}"
        canonical = canonical_players.get(player_id, {})
        substitutes.append({"id": player_id, "name": canonical.get("koreanName") or player["name"], "number": player.get("number"), "position": position_map.get(player.get("pos"), "CM")})
    return {"teamId": team_id, "status": "official-first-match-xi", "eventId": event_id, "fixtureId": fixture_id, "formation": payload.get("formation"), "starters": starters, "substitutes": substitutes}


def predicted_lineup(team_id: str, formation: str, slots: list[tuple[str, str]], squads: dict, players: dict):
    all_rows = squads[team_id]["starters"] + squads[team_id]["substitutes"]
    by_id = {row["id"]: row for row in all_rows}
    starters = []
    positions = [position for position, _ in slots]
    counts = formation.split("-")
    rows = [1] + [index + 2 for index, count in enumerate(counts) for _ in range(int(count))]
    row_columns: dict[int, int] = {}
    row_totals = {row: rows.count(row) for row in set(rows)}
    for (position, player_id), row in zip(slots, rows):
        row_columns[row] = row_columns.get(row, 0) + 1
        column = row_columns[row]
        total = row_totals[row]
        x = 50 if total == 1 else 14 + (column - 1) * (72 / (total - 1))
        last = max(rows)
        y = 92 if row == 1 else 76 - (row - 2) * (58 / (last - 2))
        player = players[player_id]
        starters.append({"id": player_id, "name": player.get("koreanName") or player.get("englishName"), "number": by_id[player_id].get("number"), "position": position, "grid": f"{row}:{column}", "x": round(x, 2), "y": round(y, 2)})
    selected = {player_id for _, player_id in slots}
    substitutes = [{"id": row["id"], "name": players[row["id"]].get("koreanName") or row["name"], "number": row.get("number"), "position": row.get("position", "CM")} for row in all_rows if row["id"] not in selected]
    return {"teamId": team_id, "status": "tacticvision-predicted-xi", "eventId": None, "fixtureId": None, "formation": formation, "starters": starters, "substitutes": substitutes}


def main():
    key = load_key()
    standings = load_json(ROOT / "app/data/standings.json")
    players = load_json(ROOT / "app/data/players.json")
    squads = load_json(ROOT / "app/data/squads.json")
    lineups = {}
    headers = {"x-apisports-key": key}
    for result in reversed(standings["results"]):
        event = fetch_json(f"{SPORTS_DB_ROOT}/lookupevent.php?id={result['id']}")["events"][0]
        fixture_id = event.get("idAPIfootball")
        response = fetch_json(f"{API_ROOT}/fixtures/lineups?fixture={fixture_id}", headers=headers).get("response", [])
        for team_id, payload in zip((result["homeTeamId"], result["awayTeamId"]), response):
            lineups[team_id] = parse_lineup(team_id, result["id"], fixture_id, payload, players)

    lineups["chelsea"] = predicted_lineup("chelsea", "4-2-3-1", [
        ("GK", "player-api-18959"), ("RB", "player-api-19545"), ("RCB", "player-api-22094"), ("LCB", "player-api-152953"), ("LB", "player-api-341642"),
        ("LDM", "player-api-116117"), ("RDM", "player-api-5996"), ("LAM", "player-api-1864"), ("AM", "player-api-152982"), ("RAM", "player-api-425733"), ("ST", "player-api-10329")], squads, players)
    lineups["fulham"] = predicted_lineup("fulham", "4-2-3-1", [
        ("GK", "player-api-1438"), ("RB", "player-api-657"), ("RCB", "player-api-2729"), ("LCB", "player-api-152967"), ("LB", "player-api-19549"),
        ("LDM", "player-api-1934"), ("RDM", "player-api-1161"), ("LAM", "player-api-237819"), ("AM", "player-api-1455"), ("RAM", "player-api-278133"), ("ST", "player-api-195106")], squads, players)

    output = {"schemaVersion": "1.0.0", "season": "2026-27", "asOf": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"), "sourceId": "api-football-first-match-lineups", "sourceUrl": f"{API_ROOT}/fixtures/lineups", "teams": lineups}
    with (ROOT / "app/data/first-match-lineups.json").open("w", encoding="utf-8") as handle:
        json.dump(output, handle, ensure_ascii=False, indent=2)
        handle.write("\n")
    print(f"Synced first-match lineups: {sum(v['status'].startswith('official') for v in lineups.values())} official, {sum(v['status'].startswith('tacticvision') for v in lineups.values())} predicted")


if __name__ == "__main__":
    main()
