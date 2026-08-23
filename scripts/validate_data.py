#!/usr/bin/env python3
"""Validate the TacticVision MVP JSON contract with Python's standard library."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


DATA_DIR = Path(__file__).resolve().parents[1] / "app" / "data"
FILES = {
    "formations.json", "managers.json", "manifest.json", "players.json",
    "roles.json", "squads.json", "tactics.json", "teams.json",
}
KEBAB = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
FORMATION = re.compile(r"^\d(?:-\d)+$")
errors: list[str] = []


def check(condition: bool, location: str, message: str) -> None:
    if not condition:
        errors.append(f"{location}: {message}")


def fields(value: Any, required: set[str], location: str) -> bool:
    if not isinstance(value, dict):
        check(False, location, "must be an object")
        return False
    missing = sorted(required - value.keys())
    check(not missing, location, f"missing fields: {', '.join(missing)}")
    return not missing


def nonempty(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def number_between(value: Any, low: int, high: int) -> bool:
    return not isinstance(value, bool) and isinstance(value, (int, float)) and low <= value <= high


def unique(values: list[Any], location: str) -> None:
    encoded = [json.dumps(value, sort_keys=True, ensure_ascii=False) for value in values]
    check(len(encoded) == len(set(encoded)), location, "contains duplicate values")


def load(name: str) -> Any:
    try:
        with (DATA_DIR / name).open(encoding="utf-8") as handle:
            return json.load(handle)
    except FileNotFoundError:
        check(False, name, "required file is missing")
    except json.JSONDecodeError as exc:
        check(False, name, f"invalid JSON at {exc.lineno}:{exc.colno}: {exc.msg}")
    return None


def validate_manifest(value: Any) -> None:
    required = {"schemaVersion", "datasetVersion", "asOf", "generatedAt", "defaultSourceId", "files"}
    if not fields(value, required, "manifest.json"):
        return
    check(bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}", value["asOf"])), "manifest.json.asOf", "must use YYYY-MM-DD")
    expected = FILES - {"manifest.json"}
    check(isinstance(value["files"], dict) and set(value["files"]) == expected,
          "manifest.json.files", "must list every contract data file exactly once")
    if not isinstance(value["files"], dict):
        return
    for name, metadata in value["files"].items():
        location = f"manifest.json.files.{name}"
        if not fields(metadata, {"layer", "sourceId", "status"}, location):
            continue
        check(metadata["layer"] in {"external-facts", "tacticvision-standards", "tacticvision-analysis"},
              f"{location}.layer", "unknown layer")
        check(metadata["status"] in {"prototype", "partial", "ready"}, f"{location}.status", "unknown status")
        check(nonempty(metadata["sourceId"]), f"{location}.sourceId", "must be non-empty")


def validate_formations(value: Any) -> None:
    check(isinstance(value, dict) and bool(value), "formations.json", "must be a non-empty object")
    if not isinstance(value, dict):
        return
    allowed_roles = {"gk", "def", "wide", "mid", "att"}
    for formation_id, slots in value.items():
        location = f"formations.json.{formation_id}"
        check(bool(FORMATION.fullmatch(formation_id)), location, "invalid formation ID")
        check(isinstance(slots, list) and len(slots) == 11, location, "must contain exactly 11 slots")
        if not isinstance(slots, list):
            continue
        positions: list[str] = []
        for index, slot in enumerate(slots):
            item = f"{location}[{index}]"
            if not fields(slot, {"pos", "x", "y", "role"}, item):
                continue
            check(nonempty(slot["pos"]), f"{item}.pos", "must be non-empty")
            positions.append(slot["pos"])
            check(number_between(slot["x"], 0, 100), f"{item}.x", "must be between 0 and 100")
            check(number_between(slot["y"], 0, 100), f"{item}.y", "must be between 0 and 100")
            check(slot["role"] in allowed_roles, f"{item}.role", "unknown formation role")
        unique(positions, f"{location} positions")


def validate_teams(value: Any, formations: dict[str, Any]) -> set[str]:
    check(isinstance(value, dict) and bool(value), "teams.json", "must be a non-empty object")
    if not isinstance(value, dict):
        return set()
    short_names: list[str] = []
    required = {"id", "name", "koreanName", "shortName", "primaryColor", "defaultFormation", "dataStatus"}
    for team_id, team in value.items():
        location = f"teams.json.{team_id}"
        check(bool(KEBAB.fullmatch(team_id)), location, "team ID must be lowercase kebab-case")
        if not fields(team, required, location):
            continue
        check(team["id"] == team_id, f"{location}.id", "must match the top-level key")
        check(nonempty(team["name"]) and nonempty(team["koreanName"]), location, "team names must be non-empty")
        check(bool(re.fullmatch(r"[A-Z]{3}", team["shortName"])), f"{location}.shortName", "must be 3 uppercase letters")
        short_names.append(team["shortName"])
        check(bool(re.fullmatch(r"#[0-9A-Fa-f]{6}", team["primaryColor"])), f"{location}.primaryColor", "must be #RRGGBB")
        check(team["defaultFormation"] in formations, f"{location}.defaultFormation", "unknown formation reference")
        check(team["dataStatus"] in {"planned", "partial", "ready"}, f"{location}.dataStatus", "unknown status")
    unique(short_names, "teams.json shortName values")
    return set(value)


def validate_players(value: Any) -> None:
    check(isinstance(value, dict), "players.json", "must be an object")
    if not isinstance(value, dict):
        return
    required = {"name", "number", "position", "age", "height", "foot", "nationality", "positions"}
    for player_id, player in value.items():
        location = f"players.json.{player_id}"
        check(player_id.startswith("player-") and bool(KEBAB.fullmatch(player_id)), location, "must use player-<name-slug>")
        if not fields(player, required, location):
            continue
        check(nonempty(player["name"]), f"{location}.name", "must be non-empty")
        check(player["number"] is None or (isinstance(player["number"], int) and 1 <= player["number"] <= 99),
              f"{location}.number", "must be null or 1..99")
        positions = player["positions"]
        check(isinstance(positions, list) and bool(positions) and all(nonempty(item) for item in positions),
              f"{location}.positions", "must be a non-empty string array")
        if isinstance(positions, list):
            unique(positions, f"{location}.positions")
            check(player["position"] in positions, f"{location}.position", "must occur in positions")
        check(player["foot"] in {"Left", "Right", "Both", None}, f"{location}.foot", "invalid value")
        check(player["age"] is None or number_between(player["age"], 15, 60), f"{location}.age", "must be null or 15..60")
        check(player["height"] is None or number_between(player["height"], 140, 220), f"{location}.height", "must be null or 140..220 cm")


def validate_team_keyed(value: Any, team_ids: set[str], name: str) -> bool:
    check(isinstance(value, dict), name, "must be an object")
    if not isinstance(value, dict):
        return False
    check(set(value) == team_ids, name, "team IDs must exactly match teams.json")
    return True


def validate_managers(value: Any, team_ids: set[str], formations: dict[str, Any]) -> None:
    if not validate_team_keyed(value, team_ids, "managers.json"):
        return
    required = {"name", "nationality", "preferredFormations", "style", "signings", "feedback"}
    for team_id, manager in value.items():
        location = f"managers.json.{team_id}"
        if not fields(manager, required, location):
            continue
        for field_name in ("name", "nationality", "style", "signings", "feedback"):
            check(nonempty(manager[field_name]), f"{location}.{field_name}", "must be non-empty")
        preferred = manager["preferredFormations"]
        check(isinstance(preferred, list) and bool(preferred), f"{location}.preferredFormations", "must be non-empty")
        if isinstance(preferred, list):
            unique(preferred, f"{location}.preferredFormations")
            for formation_id in preferred:
                check(formation_id in formations, f"{location}.preferredFormations", f"unknown formation {formation_id!r}")


def validate_squads(value: Any, team_ids: set[str]) -> None:
    if not validate_team_keyed(value, team_ids, "squads.json"):
        return
    all_ids: list[str] = []
    for team_id, squad in value.items():
        location = f"squads.json.{team_id}"
        if not fields(squad, {"starters", "substitutes"}, location):
            continue
        starters, substitutes = squad["starters"], squad["substitutes"]
        check(isinstance(starters, list) and len(starters) == 11, f"{location}.starters", "must contain 11 records")
        check(isinstance(substitutes, list), f"{location}.substitutes", "must be an array")
        if not isinstance(starters, list) or not isinstance(substitutes, list):
            continue
        team_ids_seen: list[str] = []
        for index, player in enumerate(starters + substitutes):
            item = f"{location}.roster[{index}]"
            if not fields(player, {"id", "name", "position", "availablePositions"}, item):
                continue
            check(nonempty(player["id"]) and nonempty(player["name"]) and nonempty(player["position"]), item, "id, name, and position must be non-empty")
            available = player["availablePositions"]
            check(isinstance(available, list) and bool(available) and all(nonempty(pos) for pos in available),
                  f"{item}.availablePositions", "must be a non-empty string array")
            if isinstance(available, list):
                unique(available, f"{item}.availablePositions")
            team_ids_seen.append(player["id"])
            all_ids.append(player["id"])
        unique(team_ids_seen, f"{location} roster IDs")
    unique(all_ids, "squads.json global roster IDs")


def validate_roles(value: Any) -> None:
    check(isinstance(value, list) and bool(value), "roles.json", "must be a non-empty array")
    if not isinstance(value, list):
        return
    required = {"id", "group", "nameKo", "nameEn", "icon", "summary", "description", "purpose", "movements", "attributes", "usedWhen", "difference", "examples"}
    role_ids: list[str] = []
    for index, role in enumerate(value):
        location = f"roles.json[{index}]"
        if not fields(role, required, location):
            continue
        check(bool(KEBAB.fullmatch(role["id"])), f"{location}.id", "must be lowercase kebab-case")
        role_ids.append(role["id"])
        for field_name in ("group", "nameKo", "nameEn", "icon", "summary", "description", "purpose", "difference"):
            check(nonempty(role[field_name]), f"{location}.{field_name}", "must be non-empty")
        for field_name in ("movements", "usedWhen", "examples"):
            check(isinstance(role[field_name], list) and bool(role[field_name]), f"{location}.{field_name}", "must be non-empty")
        attributes = role["attributes"]
        check(isinstance(attributes, list) and bool(attributes), f"{location}.attributes", "must be non-empty")
        if isinstance(attributes, list):
            for attribute_index, attribute in enumerate(attributes):
                item = f"{location}.attributes[{attribute_index}]"
                check(isinstance(attribute, list) and len(attribute) == 2, item, "must be [name, score]")
                if isinstance(attribute, list) and len(attribute) == 2:
                    check(nonempty(attribute[0]), f"{item}[0]", "name must be non-empty")
                    check(number_between(attribute[1], 0, 100), f"{item}[1]", "score must be 0..100")
    unique(role_ids, "roles.json IDs")


def validate_tactics(value: Any, team_ids: set[str]) -> None:
    if not validate_team_keyed(value, team_ids, "tactics.json"):
        return
    expected_presets = {"tikitaka", "gegen", "lowblock"}
    for team_id, tactic in value.items():
        location = f"tactics.json.{team_id}"
        if not fields(tactic, {"presets"}, location):
            continue
        presets = tactic["presets"]
        check(isinstance(presets, dict) and set(presets) == expected_presets,
              f"{location}.presets", "must contain tikitaka, gegen, and lowblock")
        if not isinstance(presets, dict):
            continue
        for preset_name, preset in presets.items():
            item = f"{location}.presets.{preset_name}"
            if not fields(preset, {"defline", "width", "pressing"}, item):
                continue
            for metric in ("defline", "width", "pressing"):
                check(number_between(preset[metric], 0, 100), f"{item}.{metric}", "must be 0..100")


def main() -> int:
    actual = {path.name for path in DATA_DIR.glob("*.json")}
    check(actual == FILES, "app/data", "contract file set differs: "
          f"missing={sorted(FILES - actual)}, unexpected={sorted(actual - FILES)}")
    data = {name: load(name) for name in sorted(FILES)}
    formations = data["formations.json"] if isinstance(data["formations.json"], dict) else {}
    validate_manifest(data["manifest.json"])
    validate_formations(data["formations.json"])
    team_ids = validate_teams(data["teams.json"], formations)
    validate_players(data["players.json"])
    validate_managers(data["managers.json"], team_ids, formations)
    validate_squads(data["squads.json"], team_ids)
    validate_roles(data["roles.json"])
    validate_tactics(data["tactics.json"], team_ids)
    if errors:
        print(f"Data validation failed with {len(errors)} error(s):", file=sys.stderr)
        for error in errors:
            print(f"  - {error}", file=sys.stderr)
        return 1
    print(f"Data validation passed: {len(FILES)} files, {len(team_ids)} teams, "
          f"{len(data['players.json'])} canonical players, {len(data['roles.json'])} roles, "
          f"{len(formations)} formations.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
