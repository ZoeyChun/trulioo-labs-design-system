#!/usr/bin/env python3
"""Fail if component CSS is duplicated outside Components/_shared/."""

from __future__ import annotations

import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COMPONENTS = ROOT / "Components"
SHARED = COMPONENTS / "_shared"

CANONICAL_SHARED = {
    "field-label.css",
    "field-caption.css",
    "field-validation.css",
    "caret.css",
    "dropdown-panel.css",
    "tag.css",
    "radio.css",
}

NESTED_OK = {
    ("tabs", "tab-item.css"),
    ("side-nav", "nav-item.css"),
    ("side-nav", "nav-list.css"),
    ("data-table", "sort-button.css"),
}


def is_shared_canonical(path: Path) -> bool:
    try:
        rel = path.relative_to(SHARED)
    except ValueError:
        return False
    parts = rel.parts
    return len(parts) == 2 and parts[0] == path.stem and path.name.endswith(".css")


def main() -> int:
    by_name: dict[str, list[Path]] = defaultdict(list)
    errors: list[str] = []

    for css in COMPONENTS.rglob("*.css"):
        rel = css.relative_to(COMPONENTS)
        if rel.parts[0] == "_shared":
            continue
        by_name[css.name].append(css)

    for filename, paths in sorted(by_name.items()):
        if filename not in CANONICAL_SHARED:
            continue
        for path in paths:
            parent = path.parent.name
            grandparent = path.parent.parent.name if path.parent.parent != COMPONENTS else None
            if (grandparent, filename) in NESTED_OK:
                continue
            errors.append(
                f"Duplicate shared atom {filename} outside _shared/: {path.relative_to(ROOT)}"
            )

    for filename, paths in sorted(by_name.items()):
        if len(paths) <= 1:
            continue
        if filename in CANONICAL_SHARED:
            continue
        rels = ", ".join(str(p.relative_to(ROOT)) for p in paths)
        errors.append(f"Duplicate CSS filename {filename}: {rels}")

    if errors:
        print("Component duplicate check failed:\n", file=sys.stderr)
        for err in errors:
            print(f"  - {err}", file=sys.stderr)
        return 1

    print("Component duplicate check passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
