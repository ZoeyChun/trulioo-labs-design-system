#!/usr/bin/env python3
"""Import SideNav sub-item icons from Figma SideNavIcons (7225:32904).

Glyphs are single-path (or merged) SVGs exported from Figma MCP asset URLs.
Re-run after updating URL map from download_assets on each symbol node.
"""

from __future__ import annotations

import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "Components/side-nav/icons"

# Figma 7225:32904 symbol glyphs (svgAssets / design-context exports)
# Full symbol exports — extract paths from matching <g id="Icon=…"> when set
ICON_EXPORTS: dict[str, tuple[str, str]] = {
    "deep-search.svg": (
        "ef2629c6-9142-47d8-99d2-e08424846eca",
        "Icon=Deep Search",
    ),
    "device-intelligence.svg": (
        "08496ed0-fb89-4712-bbf2-456c3501fbbe",
        "Icon=Device Intelligence",
    ),
    "kyc-eidas.svg": (
        "45c2c89e-c9f7-4aef-8095-269482697001",
        "Icon=KYC eIDAS",
    ),
}

ICON_SOURCES: dict[str, list[str]] = {
    "business-reputation.svg": [
        "https://www.figma.com/api/mcp/asset/e1829ff4-89c7-4172-9f7b-88842ee20c96.svg",
    ],
    "policy-review.svg": [
        "https://www.figma.com/api/mcp/asset/ab51ad06-e0dc-4dd6-aa77-9be968ec532f.svg",
    ],
    "kyb-self-serve.svg": [
        "https://www.figma.com/api/mcp/asset/1087bdfe-434b-4b0c-a6e9-d679615584ce.svg",
    ],
    "ubo-agent.svg": [
        "https://www.figma.com/api/mcp/asset/fae65d23-39e0-4634-a4a2-8e550f7daf81.svg",
    ],
    "orchestration-agent.svg": [
        "https://www.figma.com/api/mcp/asset/34620081-a491-46dd-9643-86e0e1a28d79.svg",
    ],
    "document-verification.svg": [
        "https://www.figma.com/api/mcp/asset/1e85abba-af10-44aa-8a00-07946af515ec.svg",
    ],
    "bank-verification.svg": [
        "https://www.figma.com/api/mcp/asset/ccdc762d-aac8-4bfb-885d-45e90d518937.svg",
    ],
    "electronic-id.svg": [
        "https://www.figma.com/api/mcp/asset/a297e646-dc5a-48e7-b35d-42e6a0f62cdc.svg",
    ],
    "biometrics.svg": [
        "https://www.figma.com/api/mcp/asset/597a17a7-2ec0-47a4-84e2-c9a286f2a90a.svg",
        "https://www.figma.com/api/mcp/asset/7963aa7c-109a-4b93-8fc3-187b5568f043.svg",
    ],
}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "trulioo-labs-ds/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode("utf-8")


def parse_view_box(svg: str) -> tuple[float, float, float, float]:
    m = re.search(r'viewBox="([^"]+)"', svg)
    if not m:
        w = re.search(r'width="([0-9.]+)"', svg)
        h = re.search(r'height="([0-9.]+)"', svg)
        if w and h:
            return 0.0, 0.0, float(w.group(1)), float(h.group(1))
        return 0.0, 0.0, 24.0, 24.0
    parts = [float(x) for x in m.group(1).split()]
    if len(parts) != 4:
        return 0.0, 0.0, 24.0, 24.0
    return parts[0], parts[1], parts[2], parts[3]


def extract_paths(svg: str) -> list[str]:
    paths: list[str] = []
    for m in re.finditer(r"<path\b[^>]*/?>", svg, flags=re.I):
        tag = m.group(0)
        tag = re.sub(r'\s*id="[^"]*"', "", tag)
        tag = re.sub(r'\s*fill="[^"]*"', "", tag)
        tag = tag.rstrip(">").rstrip("/")
        tag = f'{tag} fill="currentColor"/>'
        paths.append(tag)
    return paths


def extract_group_paths(svg: str, group_id: str) -> list[str]:
    open_tag = f'<g id="{group_id}">'
    start = svg.find(open_tag)
    if start < 0:
        raise ValueError(f"Group {group_id} not found")
    chunk = svg[start:]
    depth = 0
    for pos in range(0, len(chunk)):
        if chunk.startswith("<g", pos):
            depth += 1
        elif chunk.startswith("</g>", pos):
            depth -= 1
            if depth == 0:
                return extract_paths(chunk[: pos + 4])
    raise ValueError(f"Unclosed group {group_id}")


def merge_svgs(urls: list[str]) -> str:
    all_paths: list[str] = []
    min_x, min_y = 0.0, 0.0
    max_x, max_y = 0.0, 0.0
    first = True

    for url in urls:
        svg = fetch(url)
        x, y, w, h = parse_view_box(svg)
        if first:
            min_x, min_y, max_x, max_y = x, y, x + w, y + h
            first = False
        else:
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x + w)
            max_y = max(max_y, y + h)
        all_paths.extend(extract_paths(svg))

    if not all_paths:
        raise ValueError(f"No paths found for {urls}")

    vb = f"{min_x} {min_y} {max_x - min_x} {max_y - min_y}"
    inner = "\n  ".join(all_paths)
    return (
        f'<svg class="icon" xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="{vb}" fill="none" aria-hidden="true">\n  {inner}\n</svg>'
    )


def normalize_single_line(svg: str) -> str:
    return re.sub(r"\s+", " ", svg.strip())


def from_export(asset_id: str, group_id: str) -> str:
    svg = fetch(f"https://www.figma.com/api/mcp/asset/{asset_id}.svg")
    paths = extract_group_paths(svg, group_id)
    if not paths:
        raise ValueError(f"No paths in {group_id}")
    # Symbol art is laid out in ~24×24; use Figma frame viewBox
    inner = "\n  ".join(paths)
    return (
        f'<svg class="icon" xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="0 0 24 24" fill="none" aria-hidden="true">\n  {inner}\n</svg>'
    )


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    for filename, (asset_id, group_id) in ICON_EXPORTS.items():
        try:
            merged = from_export(asset_id, group_id)
        except Exception as exc:
            print(f"ERROR {filename}: {exc}", file=sys.stderr)
            return 1
        out_path = OUT / filename
        out_path.write_text(normalize_single_line(merged) + "\n")
        print(f"wrote {out_path.relative_to(ROOT)}")

    for filename, urls in ICON_SOURCES.items():
        try:
            merged = merge_svgs(urls)
        except Exception as exc:
            print(f"ERROR {filename}: {exc}", file=sys.stderr)
            return 1
        out_path = OUT / filename
        out_path.write_text(normalize_single_line(merged) + "\n")
        print(f"wrote {out_path.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
