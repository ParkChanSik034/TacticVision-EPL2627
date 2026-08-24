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
    "formations.json", "managers.json", "managers-current.json", "manifest.json", "players.json",
    "people-comparison.json", "player-name-ko-namuwiki.json", "player-provider-crosscheck.json", "roles.json", "squad-provider.json", "squads.json", "tactics.json", "team-comparison.json", "team-provider-crosscheck.json", "teams.json",
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


def validate_players(value: Any, team_ids: set[str]) -> None:
    check(isinstance(value, dict), "players.json", "must be an object")
    if not isinstance(value, dict):
        return
    required = {"name", "englishName", "koreanName", "teamId", "number", "position", "age", "height", "foot", "nationality", "positions"}
    for player_id, player in value.items():
        location = f"players.json.{player_id}"
        check(player_id.startswith("player-") and bool(KEBAB.fullmatch(player_id)), location, "must use player-<name-slug>")
        if not fields(player, required, location):
            continue
        check(nonempty(player["name"]), f"{location}.name", "must be non-empty")
        check(nonempty(player["englishName"]), f"{location}.englishName", "must be non-empty")
        check(nonempty(player["koreanName"]), f"{location}.koreanName", "must be non-empty")
        if player.get("nameLocalizationSource") == "namuwiki-squad-template-pair":
            check(bool(re.search(r"[가-힣]", player["koreanName"])), f"{location}.koreanName", "verified NamuWiki name must contain Hangul")
            check(nonempty(player.get("nameSourceUrl")), f"{location}.nameSourceUrl", "verified name must include its document URL")
        elif player.get("nameLocalizationSource") == "unverified-use-english":
            check(player["koreanName"] == player["englishName"], f"{location}.koreanName", "unverified name must safely fall back to English")
        check(player["teamId"] in team_ids, f"{location}.teamId", "must reference teams.json")
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
        if "analysisStatus" in manager:
            check(manager["analysisStatus"].startswith(("reviewed-", "provisional-")), f"{location}.analysisStatus", "must be reviewed-* or provisional-*")
            for field_name in ("identity", "traits", "achievements", "principles", "sourceLinks", "keyPlayers", "sliders", "controlValuesStatus"):
                check(field_name in manager, location, f"analysis profile missing {field_name}")
            check(isinstance(manager.get("traits"), list) and bool(manager.get("traits")), f"{location}.traits", "must be a non-empty array")
            check(isinstance(manager.get("achievements"), list) and len(manager.get("achievements", [])) >= 2, f"{location}.achievements", "must contain at least two meaningful achievements")
            check(isinstance(manager.get("principles"), list) and len(manager.get("principles", [])) == 3, f"{location}.principles", "must contain build-up, attack, and defence/transition")
            check(isinstance(manager.get("sourceLinks"), list) and bool(manager.get("sourceLinks")), f"{location}.sourceLinks", "must contain at least one source")
            check(isinstance(manager.get("keyPlayers"), list) and len(manager.get("keyPlayers", [])) == 3, f"{location}.keyPlayers", "must contain exactly three tactical roles")
            sliders = manager.get("sliders", {})
            check(isinstance(sliders, dict) and set(sliders) == {"defline", "width", "press"}, f"{location}.sliders", "must contain defline, width, and press")
            if isinstance(sliders, dict):
                for slider_name, slider_value in sliders.items():
                    check(number_between(slider_value, 0, 100), f"{location}.sliders.{slider_name}", "must be between 0 and 100")
            check(manager.get("controlValuesStatus") == "tacticvision-analysis-estimate", f"{location}.controlValuesStatus", "must identify values as TacticVision estimates")


def validate_current_managers(value: Any, team_ids: set[str]) -> None:
    location = "managers-current.json"
    required = {"schemaVersion", "season", "asOf", "sourceId", "sourceUrl", "license", "relation", "managers"}
    if not fields(value, required, location):
        return
    check(value["sourceId"] == "wikidata-cc0", f"{location}.sourceId", "unexpected source")
    check(value["license"] == "CC0-1.0", f"{location}.license", "unexpected license")
    managers = value["managers"]
    check(isinstance(managers, dict) and set(managers) == team_ids, f"{location}.managers", "must contain every canonical team")
    if not isinstance(managers, dict):
        return
    manager_qids = []
    for team_id, manager in managers.items():
        item = f"{location}.managers.{team_id}"
        if not fields(manager, {"teamId", "teamWikidataId", "managerWikidataId", "englishName", "koreanName", "coachingCareer", "sourceUrl", "sourceRevision"}, item):
            continue
        check(manager["teamId"] == team_id, f"{item}.teamId", "must match object key")
        check(manager["managerWikidataId"].startswith("Q"), f"{item}.managerWikidataId", "must be a QID")
        check(nonempty(manager["englishName"]), f"{item}.englishName", "must be non-empty")
        check(isinstance(manager["sourceRevision"], int), f"{item}.sourceRevision", "must be an integer")
        career = manager["coachingCareer"]
        check(isinstance(career, list), f"{item}.coachingCareer", "must be an array")
        if isinstance(career, list):
            for index, row in enumerate(career):
                career_item = f"{item}.coachingCareer[{index}]"
                if not fields(row, {"teamWikidataId", "teamName", "startDate", "endDate", "sourceUrl"}, career_item):
                    continue
                check(row["teamWikidataId"].startswith("Q"), f"{career_item}.teamWikidataId", "must be a QID")
                check(nonempty(row["teamName"]), f"{career_item}.teamName", "must be non-empty")
                check(row["startDate"] is None or bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}", row["startDate"])), f"{career_item}.startDate", "must be null or YYYY-MM-DD")
                check(row["endDate"] is None or bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}", row["endDate"])), f"{career_item}.endDate", "must be null or YYYY-MM-DD")
        manager_qids.append(manager["managerWikidataId"])
    unique(manager_qids, f"{location} manager QIDs")


def validate_squads(value: Any, team_ids: set[str]) -> None:
    if not validate_team_keyed(value, team_ids, "squads.json"):
        return
    all_ids: list[str] = []
    for team_id, squad in value.items():
        location = f"squads.json.{team_id}"
        if not fields(squad, {"starters", "substitutes"}, location):
            continue
        starters, substitutes = squad["starters"], squad["substitutes"]
        check(isinstance(starters, list) and len(starters) <= 11, f"{location}.starters", "must contain at most 11 verified records")
        check(isinstance(substitutes, list), f"{location}.substitutes", "must be an array")
        if not isinstance(starters, list) or not isinstance(substitutes, list):
            continue
        check(len(starters) + len(substitutes) >= 15, f"{location}.roster", "must contain at least 15 verified players for the MVP")
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


def validate_team_comparison(value: Any, team_ids: set[str]) -> None:
    location = "team-comparison.json"
    required = {"schemaVersion", "season", "asOf", "sourceId", "sourceUrl", "sourceSha256", "completedMatches", "metrics", "teams"}
    if not fields(value, required, location):
        return
    check(value["sourceId"] == "openfootball-england-public-domain", f"{location}.sourceId", "unexpected source")
    check(isinstance(value["sourceSha256"], str) and bool(re.fullmatch(r"[0-9a-f]{64}", value["sourceSha256"])), f"{location}.sourceSha256", "must be SHA-256")
    rows = value["teams"]
    check(isinstance(rows, dict) and set(rows) == team_ids, f"{location}.teams", "team IDs must match teams.json")
    if not isinstance(rows, dict):
        return
    played_total = 0
    for team_id, row in rows.items():
        item = f"{location}.teams.{team_id}"
        row_fields = {"teamId", "name", "shortName", "played", "wins", "draws", "losses", "goalsFor", "goalsAgainst", "goalDifference", "points", "pointsPerGame"}
        if not fields(row, row_fields, item):
            continue
        check(row["teamId"] == team_id, f"{item}.teamId", "must match its key")
        for metric in ("played", "wins", "draws", "losses", "goalsFor", "goalsAgainst", "points"):
            check(isinstance(row[metric], int) and row[metric] >= 0, f"{item}.{metric}", "must be a non-negative integer")
        check(row["played"] == row["wins"] + row["draws"] + row["losses"], item, "played must equal W+D+L")
        check(row["goalDifference"] == row["goalsFor"] - row["goalsAgainst"], f"{item}.goalDifference", "must equal GF-GA")
        check(row["points"] == row["wins"] * 3 + row["draws"], f"{item}.points", "must equal 3W+D")
        expected_ppg = round(row["points"] / row["played"], 2) if row["played"] else None
        check(row["pointsPerGame"] == expected_ppg, f"{item}.pointsPerGame", "does not match points/played")
        played_total += row["played"]
    check(played_total == value["completedMatches"] * 2, f"{location}.completedMatches", "must match team appearance total")


def validate_people_comparison(value: Any) -> None:
    location = "people-comparison.json"
    if not fields(value, {"schemaVersion", "asOf", "sourceId", "sourceUrl", "license", "players", "managers"}, location):
        return
    check(value["sourceId"] == "wikidata-cc0", f"{location}.sourceId", "unexpected source")
    check(value["license"] == "CC0-1.0", f"{location}.license", "unexpected license")
    check(len(value["players"]) == 8, f"{location}.players", "must contain 8 records")
    check(len(value["managers"]) == 6, f"{location}.managers", "must contain 6 records")
    for group in ("players", "managers"):
        for person_id, person in value[group].items():
            item = f"{location}.{group}.{person_id}"
            check(person["id"] == person_id, f"{item}.id", "must match its key")
            check(person["wikidataId"].startswith("Q"), f"{item}.wikidataId", "must be a QID")
            check(isinstance(person["sourceRevision"], int), f"{item}.sourceRevision", "must be an integer")
            check(nonempty(person["birthDate"]), f"{item}.birthDate", "must be present")
            check(number_between(person["heightCm"], 140, 220), f"{item}.heightCm", "must be 140..220")
    check("nationality" in value["players"]["isak"]["factWarnings"],
          f"{location}.players.isak.factWarnings", "nationality conflict must remain quarantined")


def validate_team_provider_crosscheck(value: Any, team_ids: set[str]) -> None:
    location = "team-provider-crosscheck.json"
    required = {"schemaVersion", "season", "asOf", "sourceId", "sourceUrl", "usage", "limitations", "warnings", "teams"}
    if not fields(value, required, location):
        return
    check(value["season"] == "2026-2027", f"{location}.season", "unexpected season")
    check(value["sourceId"] == "thesportsdb-free-community", f"{location}.sourceId", "unexpected source")
    teams = value["teams"]
    check(isinstance(teams, dict) and set(teams) == team_ids, f"{location}.teams", "must contain every canonical team")
    if isinstance(teams, dict):
        provider_ids = []
        for team_id, team in teams.items():
            item = f"{location}.teams.{team_id}"
            if not fields(team, {"teamId", "providerTeamId", "providerName", "providerLeagueId", "affiliationMatches"}, item):
                continue
            check(team["teamId"] == team_id, f"{item}.teamId", "must match object key")
            check(nonempty(team["providerTeamId"]), f"{item}.providerTeamId", "must be non-empty")
            check(isinstance(team["affiliationMatches"], bool), f"{item}.affiliationMatches", "must be boolean")
            provider_ids.append(team["providerTeamId"])
        unique(provider_ids, f"{location} provider team IDs")
    check(isinstance(value["warnings"], list), f"{location}.warnings", "must be an array")


def validate_player_provider_crosscheck(value: Any, people: dict[str, Any]) -> None:
    location = "player-provider-crosscheck.json"
    required = {"schemaVersion", "asOf", "sourceId", "sourceUrl", "usage", "limitations", "warnings", "players"}
    if not fields(value, required, location):
        return
    check(value["sourceId"] == "thesportsdb-free-community", f"{location}.sourceId", "unexpected source")
    players = value["players"]
    expected = set(people["players"]) if isinstance(people, dict) and isinstance(people.get("players"), dict) else set()
    check(isinstance(players, dict) and set(players) == expected, f"{location}.players", "must match Player Compare IDs")
    if isinstance(players, dict):
        provider_ids = []
        for player_id, player in players.items():
            item = f"{location}.players.{player_id}"
            if not fields(player, {"playerId", "providerPlayerId", "providerName", "currentTeam", "position", "thumbnailUrl"}, item):
                continue
            check(player["playerId"] == player_id, f"{item}.playerId", "must match object key")
            check(nonempty(player["providerPlayerId"]), f"{item}.providerPlayerId", "must be non-empty")
            check(nonempty(player["providerName"]), f"{item}.providerName", "must be non-empty")
            provider_ids.append(player["providerPlayerId"])
        unique(provider_ids, f"{location} provider player IDs")
    check(isinstance(value["warnings"], list), f"{location}.warnings", "must be an array")
def main() -> int:
    actual = {path.name for path in DATA_DIR.glob("*.json")}
    check(actual == FILES, "app/data", "contract file set differs: "
          f"missing={sorted(FILES - actual)}, unexpected={sorted(actual - FILES)}")
    data = {name: load(name) for name in sorted(FILES)}
    formations = data["formations.json"] if isinstance(data["formations.json"], dict) else {}
    validate_manifest(data["manifest.json"])
    validate_formations(data["formations.json"])
    team_ids = validate_teams(data["teams.json"], formations)
    validate_players(data["players.json"], team_ids)
    validate_managers(data["managers.json"], team_ids, formations)
    validate_current_managers(data["managers-current.json"], team_ids)
    validate_squads(data["squads.json"], team_ids)
    validate_roles(data["roles.json"])
    validate_tactics(data["tactics.json"], team_ids)
    validate_team_comparison(data["team-comparison.json"], team_ids)
    validate_people_comparison(data["people-comparison.json"])
    validate_player_provider_crosscheck(data["player-provider-crosscheck.json"], data["people-comparison.json"])
    validate_team_provider_crosscheck(data["team-provider-crosscheck.json"], team_ids)
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
