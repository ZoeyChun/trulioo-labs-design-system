#!/usr/bin/env python3
"""Normalize SideNav icon SVGs and regenerate the Labs icon map.

Source of truth is Figma SideNavIcons (7225:32904); each variant is a 24x24
symbol. Export a variant with download_assets(defaultFormat="svg") and drop the
raw file into Components/side-nav/icons/ under the name below, then re-run.

Raw Figma exports carry the surrounding artboard (a #6D6D6D rect plus the whole
SideNav frame). This strips that, keeps the <g id="Icon=..."> glyph, and rebinds
the glyph fill to currentColor so selected/inverse nav states recolor it.

Re-running on already-normalized files is a no-op.

    python3 scripts/build-sidenav-icons.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ICON_DIR = ROOT / "Components/side-nav/icons"
ICON_MAP_JS = ROOT / "pages/unified-intelligence-home/js/labs-icons.js"

# Figma variant node ids, for re-exporting via download_assets.
FIGMA_NODES = {
    "business-reputation.svg": ("7216:5950", "Icon=Business Horizon"),
    "policy-review.svg": ("7216:5956", "Icon=Policy Review"),
    "kyb-self-serve.svg": ("7216:5958", "Icon=KYB Self-Serve"),
    "ubo-agent.svg": ("7216:5960", "Icon=UBO Agent"),
    "deep-search.svg": ("7216:5962", "Icon=Deep Search"),
    "orchestration-agent.svg": ("7216:5965", "Icon=Orchestration Agent"),
    "document-verification.svg": ("7216:5967", "Icon=Document Verification"),
    "bank-verification.svg": ("7216:5969", "Icon=Bank Verification"),
    "electronic-id.svg": ("7216:5971", "Icon=Electronic ID"),
    "device-intelligence.svg": ("7216:5973", "Icon=Device Intelligence"),
    "kyc-eidas.svg": ("7225:33509", "Icon=KYC eIDAS"),
    "biometrics.svg": ("7216:5977", "Icon=Biometrics"),
    "home.svg": ("7225:33547", "Icon=Home"),
    "labs.svg": ("7225:33550", "Icon=Labs"),
}

# Labs catalog / side-nav item id -> icon file.
ICON_KEYS = {
    "business-reputation-review": "business-reputation.svg",
    "policy-review": "policy-review.svg",
    "kyb-self-serve": "kyb-self-serve.svg",
    "ubo-agent": "ubo-agent.svg",
    "deep-search": "deep-search.svg",
    "trulioo-mcp-agent": "orchestration-agent.svg",
    "document-verification": "document-verification.svg",
    "bank-verification": "bank-verification.svg",
    "electronic-id": "electronic-id.svg",
    "kyc-eidas": "kyc-eidas.svg",
    "device-intelligence": "device-intelligence.svg",
    "biometrics": "biometrics.svg",
}

GLYPH_FILL = "#617269"  # icon/faint, the fill Figma bakes into the export
SVG_OPEN = (
    '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" '
    'viewBox="0 0 24 24" fill="none" aria-hidden="true">'
)


def extract_icon_group(svg: str) -> str | None:
    """Return the inner markup of the <g id="Icon=..."> element, or None."""
    start = re.search(r'<g\b[^>]*\bid="Icon=[^"]*"[^>]*>', svg)
    if not start:
        return None
    depth = 1
    pos = start.end()
    for token in re.finditer(r"<g\b[^>]*?(/?)>|</g>", svg[start.end():]):
        if token.group(0) == "</g>":
            depth -= 1
            if depth == 0:
                return svg[start.end():start.end() + token.start()]
        elif not token.group(1):
            depth += 1
        pos = token.end()
    return None


def normalize(svg: str) -> str | None:
    """Strip artboard bleed and rebind the glyph fill to currentColor."""
    inner = extract_icon_group(svg)
    if inner is None:
        return None
    # Masked/clipped glyphs reference <defs> that live outside the icon group.
    defs = "".join(re.findall(r"<defs>.*?</defs>", svg, flags=re.S))
    if defs and re.search(r"url\(#", inner):
        inner += defs
    else:
        inner = re.sub(r'\bid="[^"]*"', "", inner)
    inner = re.sub(rf'fill="{GLYPH_FILL}"', 'fill="currentColor"', inner, flags=re.I)
    inner = re.sub(r"\s+", " ", inner).strip()
    inner = inner.replace("> <", "><")
    return f"{SVG_OPEN}{inner}</svg>\n"


def js_escape(svg: str) -> str:
    return svg.strip().replace("\\", "\\\\").replace("'", "\\'")


def main() -> int:
    if not ICON_DIR.is_dir():
        print(f"missing {ICON_DIR}", file=sys.stderr)
        return 1

    for name in sorted(FIGMA_NODES):
        path = ICON_DIR / name
        if not path.exists():
            node, group = FIGMA_NODES[name]
            print(f"  -- {name}: absent (re-export {node} / {group})")
            continue
        svg = path.read_text()
        if 'id="Icon=' not in svg:
            print(f"  ok {name}: already normalized")
            continue
        cleaned = normalize(svg)
        if cleaned is None:
            print(f"  !! {name}: has an Icon group but could not extract it")
            continue
        path.write_text(cleaned)
        print(f"  -> {name}: normalized ({len(cleaned)} bytes)")

    missing = [k for k, f in ICON_KEYS.items() if not (ICON_DIR / f).exists()]
    if missing:
        print(f"cannot build icon map, missing: {', '.join(missing)}", file=sys.stderr)
        return 1

    lines = [
        "/* Generated by scripts/build-sidenav-icons.py - do not edit by hand.",
        " * Source: Figma SideNavIcons 7225:32904 (24x24 symbols).",
        " */",
        "(function (global) {",
        '  "use strict";',
        "",
        "  global.LabsIcons = {",
    ]
    entries = [
        f"    '{key}': '{js_escape((ICON_DIR / fname).read_text())}'"
        for key, fname in ICON_KEYS.items()
    ]
    lines.append(",\n".join(entries))
    lines += [
        "  };",
        '})(typeof window !== "undefined" ? window : globalThis);',
        "",
    ]
    ICON_MAP_JS.write_text("\n".join(lines))
    print(f"wrote {ICON_MAP_JS.relative_to(ROOT)} ({len(ICON_KEYS)} icons)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
