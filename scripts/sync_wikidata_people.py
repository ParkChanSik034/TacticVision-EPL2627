#!/usr/bin/env python3
"""Fetch CC0 biographical facts for Player and Manager Compare."""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "app" / "data" / "people-comparison.json"
API = "https://www.wikidata.org/w/api.php"
PEOPLE = {
    "players": {
        "haaland": "Q28967995", "isak": "Q23759917", "saka": "Q59306386",
        "palmer": "Q99760796", "rice": "Q30007142", "saliba": "Q56868118",
        "trent": "Q27569376", "alisson": "Q18237361",
    },
    "managers": {
        "alonso": "Q208104", "maresca": "Q317282", "dezerbi": "Q2032119",
        "arteta": "Q185572", "slot": "Q1029223", "emery": "Q295610",
    },
}
FACT_WARNINGS = {
    "Q23759917": {
        "nationality": "Wikidata P27 conflicts with Sweden national-team records; do not publish automatically.",
        "verificationUrl": "https://www.svenskfotboll.se/nyheter/landslag/2026/05/herr-trojnummer-vm-2026/",
    }
}


def fetch_entities(ids: list[str], props: str = "labels|claims|info") -> dict:
    query = urllib.parse.urlencode({
        "action": "wbgetentities", "ids": "|".join(ids), "props": props,
        "languages": "en|ko", "format": "json", "maxlag": "5",
    })
    request = urllib.request.Request(
        f"{API}?{query}",
        headers={"User-Agent": "TacticVision-data-sync/1.0 (https://github.com/ParkChanSik034/TacticVision-EPL2627)"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)["entities"]


def claim_values(entity: dict, prop: str) -> list:
    values = []
    for claim in entity.get("claims", {}).get(prop, []):
        value = claim.get("mainsnak", {}).get("datavalue", {}).get("value")
        if value is not None:
            values.append(value)
    return values


def label(entity: dict, language: str = "en") -> str | None:
    return entity.get("labels", {}).get(language, {}).get("value")


def main() -> int:
    all_ids = [qid for group in PEOPLE.values() for qid in group.values()]
    entities = fetch_entities(all_ids)
    linked_ids = set()
    for entity in entities.values():
        for prop in ("P27", "P413"):
            linked_ids.update(value["id"] for value in claim_values(entity, prop) if isinstance(value, dict) and "id" in value)
    linked = fetch_entities(sorted(linked_ids), "labels|info")

    output = {
        "schemaVersion": "1.0.0",
        "asOf": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "sourceId": "wikidata-cc0",
        "sourceUrl": "https://www.wikidata.org/",
        "license": "CC0-1.0",
        "players": {}, "managers": {},
    }
    for group, people in PEOPLE.items():
        for local_id, qid in people.items():
            entity = entities[qid]
            dates = claim_values(entity, "P569")
            heights = claim_values(entity, "P2048")
            countries = claim_values(entity, "P27")
            positions = claim_values(entity, "P413")
            output[group][local_id] = {
                "id": local_id,
                "wikidataId": qid,
                "sourceUrl": f"https://www.wikidata.org/wiki/{qid}",
                "sourceRevision": entity.get("lastrevid"),
                "englishName": label(entity, "en"),
                "koreanName": label(entity, "ko"),
                "birthDate": dates[0]["time"][1:11] if dates else None,
                "nationalities": [label(linked[value["id"]], "en") for value in countries],
                "heightCm": int(float(heights[0]["amount"])) if heights else None,
                "positions": [label(linked[value["id"]], "en") for value in positions],
                "factWarnings": FACT_WARNINGS.get(qid, {}),
            }
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Synced Wikidata CC0 people: {len(output['players'])} players, {len(output['managers'])} managers")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
