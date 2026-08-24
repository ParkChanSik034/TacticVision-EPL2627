#!/usr/bin/env python3
"""Validate static app structure without third-party dependencies."""

from __future__ import annotations

import re
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "app"
HTML = APP / "index.html"
JS = APP / "assets/js/app.js"


class AppParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids: list[str] = []
        self.assets: list[str] = []
        self.handlers: list[str] = []
        self.images_without_alt: list[str] = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if values.get("id"):
            self.ids.append(values["id"])
        for key in ("src", "href"):
            value = values.get(key, "")
            if value and tag in {"script", "link"} and not urlparse(value).scheme and not value.startswith(("#", "//")):
                self.assets.append(value.split("?", 1)[0])
        for key in ("onclick", "onchange", "oninput", "onkeydown"):
            if values.get(key):
                match = re.match(r"\s*([A-Za-z_$][\w$]*)\s*\(", values[key])
                if match:
                    self.handlers.append(match.group(1))
        if tag == "img" and "alt" not in values:
            self.images_without_alt.append(values.get("src", "<dynamic>"))


def main() -> int:
    html = HTML.read_text(encoding="utf-8")
    js = JS.read_text(encoding="utf-8")
    parser = AppParser()
    parser.feed(html)
    errors: list[str] = []

    duplicates = sorted(key for key, count in Counter(parser.ids).items() if count > 1)
    if duplicates:
        errors.append(f"duplicate HTML IDs: {duplicates}")
    if re.search(r'class="[^"]*\bclass=', html):
        errors.append("malformed nested class attribute")
    for asset in parser.assets:
        if not (APP / asset).is_file():
            errors.append(f"missing local asset: {asset}")
    definitions = set(re.findall(r"\bfunction\s+([A-Za-z_$][\w$]*)\s*\(", js))
    definitions.update(re.findall(r"\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=", js))
    missing_handlers = sorted(set(parser.handlers) - definitions)
    if missing_handlers:
        errors.append(f"undefined inline handlers: {missing_handlers}")
    if parser.images_without_alt:
        errors.append(f"images without alt: {parser.images_without_alt}")
    required_ids = {"home-view", "match-hub-view", "tactical-view", "compare-view", "team-compare-view", "player-compare-view", "match-compare-view", "toast"}
    missing_ids = sorted(required_ids - set(parser.ids))
    if missing_ids:
        errors.append(f"missing core view IDs: {missing_ids}")
    contract_files = {path.name for path in (APP / "data").glob("*.json")}
    for name in re.findall(r"['\"]([a-z][a-z0-9-]+)['\"]", re.search(r"Promise\.all\(\[(.*?)\]\.map\(fetchEntityJson\)", js, re.S).group(1)):
        if f"{name}.json" not in contract_files:
            errors.append(f"fetchEntityJson target missing: {name}.json")

    if errors:
        print(f"App validation failed with {len(errors)} error(s):", file=sys.stderr)
        for error in errors:
            print(f"  - {error}", file=sys.stderr)
        return 1
    print(f"App validation passed: {len(parser.ids)} unique IDs, {len(set(parser.handlers))} inline handlers, {len(contract_files)} JSON files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
