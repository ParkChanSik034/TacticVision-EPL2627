#!/usr/bin/env python3
"""Sync the preferred head coach for all 20 canonical EPL teams from Wikidata."""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "app" / "data" / "managers-current.json"
API = "https://www.wikidata.org/w/api.php"
SPARQL_API = "https://query.wikidata.org/sparql"
TEAM_QIDS = {
    "arsenal": "Q9617", "astonvilla": "Q18711", "bournemouth": "Q19568",
    "brentford": "Q19571", "brighton": "Q19453", "chelsea": "Q9616",
    "coventry": "Q19580", "crystalpalace": "Q19467", "everton": "Q5794",
    "fulham": "Q18708", "hullcity": "Q19477", "ipswich": "Q9653",
    "leeds": "Q1128631", "liverpool": "Q1130849", "mancity": "Q50602",
    "manutd": "Q18656", "newcastle": "Q18716", "nottinghamforest": "Q19490",
    "sunderland": "Q18739", "tottenham": "Q18741",
}
KOREAN_NAME_OVERRIDES = {
    "Q123584452": "피에르 사주",
    "Q1444714": "세르게이 야키로비치",
    "Q690028": "마티아스 야이슬레",
    "Q3455749": "레지 르 브리",
}

# Wikidata P18 remains the licensed source of truth, but a reviewed portrait can
# be selected here when the default image is a match, training, or trophy shot.
# Values must be exact Wikimedia Commons filenames.
PORTRAIT_IMAGE_OVERRIDES: dict[str, str] = {}
PROVIDER_PORTRAIT_OVERRIDES = {
    "Q123584452": {
        "imageUrl": "https://r2.thesportsdb.com/images/media/player/thumb/uepsdr1765991153.jpg",
        "providerId": "34433303",
        "sourceUrl": "https://www.thesportsdb.com/player/34433303/pierre-sage",
    },
    "Q3455749": {
        "imageUrl": "https://r2.thesportsdb.com/images/media/player/thumb/0pefxo1681225433.jpg",
        "providerId": "34217257",
        "sourceUrl": "https://www.thesportsdb.com/player/34217257/regis-le-bris",
    },
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


def claim_values(entity: dict, prop: str, rank: str | None = None) -> list:
    values = []
    for claim in entity.get("claims", {}).get(prop, []):
        if rank and claim.get("rank") != rank:
            continue
        value = claim.get("mainsnak", {}).get("datavalue", {}).get("value")
        if value is not None:
            values.append(value)
    return values


def label(entity: dict, language: str) -> str | None:
    return entity.get("labels", {}).get(language, {}).get("value")


def fetch_coaching_careers(manager_ids: list[str]) -> dict[str, list[dict]]:
    values = " ".join(f"wd:{manager_id}" for manager_id in manager_ids)
    sparql = f"""
SELECT ?manager ?team ?teamLabel ?start ?end WHERE {{
  VALUES ?manager {{ {values} }}
  ?team p:P286 ?statement .
  ?statement ps:P286 ?manager .
  OPTIONAL {{ ?statement pq:P580 ?start }}
  OPTIONAL {{ ?statement pq:P582 ?end }}
  SERVICE wikibase:label {{ bd:serviceParam wikibase:language "ko,en". }}
}}
"""
    query = urllib.parse.urlencode({"query": sparql, "format": "json"})
    request = urllib.request.Request(
        f"{SPARQL_API}?{query}",
        headers={"User-Agent": "TacticVision-data-sync/1.0 (https://github.com/ParkChanSik034/TacticVision-EPL2627)"},
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        bindings = json.load(response)["results"]["bindings"]
    careers = {manager_id: [] for manager_id in manager_ids}
    for row in bindings:
        manager_id = row["manager"]["value"].rsplit("/", 1)[-1]
        team_id = row["team"]["value"].rsplit("/", 1)[-1]
        careers[manager_id].append({
            "teamWikidataId": team_id,
            "teamName": row["teamLabel"]["value"],
            "startDate": row.get("start", {}).get("value", "")[:10] or None,
            "endDate": row.get("end", {}).get("value", "")[:10] or None,
            "sourceUrl": f"https://www.wikidata.org/wiki/{team_id}",
        })
    for rows in careers.values():
        rows.sort(key=lambda item: (item["startDate"] or "0000-00-00", item["teamName"]))
    return careers


def main() -> int:
    with (ROOT / "app" / "data" / "teams.json").open(encoding="utf-8") as handle:
        canonical_teams = json.load(handle)
    if set(canonical_teams) != set(TEAM_QIDS):
        raise ValueError("TEAM_QIDS must exactly match teams.json")

    team_entities = fetch_entities(list(TEAM_QIDS.values()))
    assignments = {}
    manager_ids = []
    for team_id, team_qid in TEAM_QIDS.items():
        preferred = claim_values(team_entities[team_qid], "P286", "preferred")
        ids = [value["id"] for value in preferred if isinstance(value, dict) and value.get("id")]
        if len(ids) != 1:
            raise ValueError(f"{team_id} must have exactly one preferred P286 head coach, received {ids}")
        assignments[team_id] = ids[0]
        manager_ids.append(ids[0])

    manager_entities = fetch_entities(sorted(set(manager_ids)))
    coaching_careers = fetch_coaching_careers(sorted(set(manager_ids)))
    country_ids = set()
    for entity in manager_entities.values():
        country_ids.update(
            value["id"] for value in claim_values(entity, "P27")
            if isinstance(value, dict) and value.get("id")
        )
    countries = fetch_entities(sorted(country_ids), "labels|info") if country_ids else {}

    managers = {}
    for team_id, manager_qid in assignments.items():
        entity = manager_entities[manager_qid]
        dates = claim_values(entity, "P569")
        nationalities = claim_values(entity, "P27")
        images = claim_values(entity, "P18")
        wikidata_image_name = images[0] if images and isinstance(images[0], str) else None
        image_name = PORTRAIT_IMAGE_OVERRIDES.get(manager_qid, wikidata_image_name)
        provider_portrait = PROVIDER_PORTRAIT_OVERRIDES.get(manager_qid)
        managers[team_id] = {
            "teamId": team_id,
            "teamWikidataId": TEAM_QIDS[team_id],
            "managerWikidataId": manager_qid,
            "englishName": label(entity, "en"),
            "koreanName": label(entity, "ko") or KOREAN_NAME_OVERRIDES.get(manager_qid),
            "birthDate": dates[0]["time"][1:11] if dates else None,
            "nationalities": [
                label(countries[value["id"]], "ko") or label(countries[value["id"]], "en")
                for value in nationalities if isinstance(value, dict) and value.get("id") in countries
            ],
            "imageFileName": image_name,
            "imageUrl": provider_portrait["imageUrl"] if provider_portrait else None,
            "imageSelection": "thesportsdb-reviewed-portrait" if provider_portrait else "reviewed-portrait" if manager_qid in PORTRAIT_IMAGE_OVERRIDES else "wikidata-p18",
            "imageFocus": "50% 22%" if provider_portrait else "50% 18%",
            "imageProviderId": provider_portrait["providerId"] if provider_portrait else None,
            "imageSourceUrl": provider_portrait["sourceUrl"] if provider_portrait else f"https://commons.wikimedia.org/wiki/File:{urllib.parse.quote(image_name)}" if image_name else None,
            "coachingCareer": coaching_careers.get(manager_qid, []),
            "sourceUrl": f"https://www.wikidata.org/wiki/{manager_qid}",
            "sourceRevision": entity.get("lastrevid"),
        }

    collected_at = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    output = {
        "schemaVersion": "1.0.0",
        "season": "2026-27",
        "asOf": collected_at,
        "sourceId": "wikidata-cc0",
        "sourceUrl": "https://www.wikidata.org/",
        "license": "CC0-1.0",
        "relation": "preferred P286 (head coach)",
        "managers": managers,
    }
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Synced Wikidata current managers: {len(managers)} teams")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
