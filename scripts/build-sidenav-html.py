#!/usr/bin/env python3
"""Generate TDS SideNav HTML from a single shared template."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

DOC_ICON = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1.5" y="3" width="13" height="10" rx="1.5"/><circle cx="6" cy="7.5" r="1.5"/><path d="M3.5 11.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5"/><path d="M10 7h2.5M10 9.5h2.5"/></svg>'
BANK_ICON = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4h12v8H2z"/><path d="M5 7v2M8 6v4M11 7v2M4 4V2h8v2"/></svg>'
EID_ICON = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1C5.5 3 4 5.5 4 8c0 2.5 1.5 4.5 4 4.5S12 10.5 12 8c0-2.5-1.5-5-4-7z"/><path d="M8 12.5V15M6 8c0-1.5 1-3 2-4M10 8c0-1.5-1-3-2-4"/></svg>'
HOME_ICON = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 7.5 8 2.5l5.5 5V13a1 1 0 0 1-1 1H10v-4H6v4H3.5a1 1 0 0 1-1-1V7.5z"/></svg>'
UBO_ICON = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="5.5" cy="5" r="2.5"/><path d="M1 13c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4"/><circle cx="11.5" cy="5.5" r="2"/><path d="M15 13c0-2 1.5-3 0-3-1 0-2.5 1-2.5 3"/></svg>'
POLICY_ICON = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 1.5h8a1 1 0 0 1 1 1v12l-5-2.5-5 2.5v-12a1 1 0 0 1 1-1z"/><path d="M6 6l1.5 1.5L10 5"/></svg>'
SEARCH_ICON = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/></svg>'
CHEVRON_UP = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 10l4-4 4 4"/></svg>'
CHEVRON_RIGHT = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 4l4 4-4 4"/></svg>'
CHEVRONS_LEFT = '<svg class="icon icon--sm" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M10 4 6 8l4 4M6 4 2 8l4 4"/></svg>'
CHEVRONS_RIGHT = '<svg class="icon icon--sm" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 4l4 4-4 4M10 4l4 4-4 4"/></svg>'

LABS_PATH = "M11.1359 0.160156C11.3022 0.160156 11.4626 0.226126 11.5802 0.343746C11.6976 0.461326 11.7638 0.620916 11.7638 0.787106C11.7638 0.953286 11.6976 1.11288 11.5802 1.23047C11.4626 1.34809 11.3022 1.41406 11.1359 1.41406H10.5089V5.87695L15.3458 13.9404H15.3478C15.4619 14.1308 15.5237 14.3484 15.5265 14.5703C15.5292 14.7921 15.4727 15.011 15.3634 15.2041C15.2542 15.3968 15.0958 15.5572 14.9044 15.6689C14.7128 15.7806 14.4944 15.8398 14.2726 15.8398H1.72863C1.50691 15.8395 1.28917 15.7799 1.09777 15.668C0.906488 15.5561 0.747849 15.3959 0.638779 15.2031C0.529689 15.01 0.473788 14.791 0.476668 14.5693C0.479548 14.3476 0.541318 14.1306 0.655378 13.9404L5.49132 5.87695V1.41406H4.86437C4.69804 1.41406 4.53863 1.34807 4.42101 1.23047C4.30339 1.11284 4.23741 0.953446 4.23741 0.787106C4.23744 0.620796 4.30341 0.461346 4.42101 0.343746C4.53862 0.226196 4.69808 0.160156 4.86437 0.160156H11.1359ZM6.74618 1.41406V6.0508C6.74648 6.1643 6.71498 6.2758 6.65638 6.373L4.73839 9.5742C5.84916 9.6127 7.03618 9.9471 8.28328 10.5781C10.0612 11.478 11.3992 11.5568 12.34 11.3711L9.34388 6.373C9.28528 6.2759 9.25488 6.1642 9.25498 6.0508V1.41406H6.74618Z"
LABS_ICONS = (
    f'<svg class="icon tds-labs-icon tds-labs-icon--onlight" viewBox="0 0 16 16" fill="none" aria-hidden="true">'
    f'<path d="{LABS_PATH}" fill="#617269"/></svg>'
    f'<svg class="icon tds-labs-icon tds-labs-icon--ondark" viewBox="0 0 16 16" fill="none" aria-hidden="true">'
    f'<path d="{LABS_PATH}" fill="white"/></svg>'
)


def sub_item(label: str, href: str | None, selected: bool = False, icon_svg: str = "", indent: str = "                  ") -> str:
    cls = "tds-side-nav__sub-item"
    if selected:
        cls += " tds-side-nav__sub-item--selected"
    current = ' aria-current="page"' if selected else ""
    icon = (
        f'\n{indent}  <span class="tds-side-nav__sub-item-icon" aria-hidden="true">{icon_svg}</span>'
        if icon_svg
        else ""
    )
    tag = "a" if href else "button"
    attrs = f' href="{href}"' if href else ' type="button"'
    return f"""{indent}<{tag}{attrs} class="{cls}"{current}>{icon}
{indent}  <span class="tds-side-nav__sub-item-text">{label}</span>
{indent}</{tag}>"""


def build(
    *,
    active_page: str = "document-verification",
    assets_prefix: str = "../../assets",
    root_id: str = "app-sidenav",
    collapse_id: str = "sidenav-collapse",
    collapsed: bool = True,
    demo_class: str = "",
    include_tooltips: bool | None = None,
    kyc_links: bool = True,
) -> str:
    if include_tooltips is None:
        include_tooltips = collapsed

    indent = "    " if root_id == "app-sidenav" else "              "
    child = indent + "  "
    sub_indent = child + "      "

    dv_href = "../document-verification/index.html"
    bv_href = "../bank-verification/index.html"
    if active_page == "document-verification":
        dv_href = "index.html" if kyc_links else dv_href
        doc_item = sub_item("Document Verification", dv_href if kyc_links else None, True, DOC_ICON, sub_indent)
        bank_item = sub_item("Bank Verification", bv_href if kyc_links else None, False, BANK_ICON, sub_indent)
    else:
        bv_href = "index.html" if kyc_links else bv_href
        doc_item = sub_item("Document Verification", dv_href if kyc_links else None, False, DOC_ICON, sub_indent)
        bank_item = sub_item("Bank Verification", bv_href if kyc_links else None, True, BANK_ICON, sub_indent)

    nav_classes = ["tds-side-nav"]
    if collapsed:
        nav_classes.append("tds-side-nav--collapsed")
    if demo_class:
        nav_classes.append(demo_class)

    collapse_label = (
        '<span class="tds-side-nav__collapse-label text-label-sm-uppercase">Hide Sidebar</span>'
    )
    collapse_chevron = CHEVRONS_RIGHT if collapsed else CHEVRONS_LEFT
    collapse_aria = "Expand sidebar" if collapsed else "Collapse sidebar"
    collapse_expanded = "false" if collapsed else "true"
    icon_rail_hidden = "false" if collapsed else "true"
    profile_collapsed = " tds-side-nav__profile--collapsed" if collapsed else ""

    home_tooltip = ""
    labs_tooltip = ""
    if include_tooltips:
        home_tooltip = """            <span class="tds-side-nav__tooltip" role="tooltip">
              <span class="tds-side-nav__tooltip-caret"></span>
              <span class="tds-side-nav__tooltip-body">Home</span>
            </span>"""
        labs_tooltip = """            <span class="tds-side-nav__tooltip" role="tooltip">
              <span class="tds-side-nav__tooltip-caret"></span>
              <span class="tds-side-nav__tooltip-body">Labs</span>
            </span>"""

    return f"""{indent}<!-- TDS SideNav component -->
{indent}<aside class="{" ".join(nav_classes)}" id="{root_id}" aria-label="Primary">

{child}<div class="tds-side-nav__header">
{child}  <button type="button" class="tds-side-nav__brand" aria-label="Trulioo home">
{child}    <span class="tds-side-nav__logo">
{child}      <img src="{assets_prefix}/trulioo-logo-mark.svg" alt="" width="40" height="40">
{child}    </span>
{child}    <span class="tds-side-nav__wordmark" aria-hidden="true">
{child}      <img src="{assets_prefix}/trulioo-wordmark.svg" alt="" width="98" height="24">
{child}    </span>
{child}  </button>
{child}</div>

{child}<div class="tds-side-nav__main">
{child}  <div class="tds-side-nav__nav-stack">
{child}    <div>
{child}      <button type="button" class="tds-side-nav__nav-item">
{child}        <span class="tds-side-nav__nav-item-label">
{child}          <span class="tds-side-nav__nav-item-icon" aria-hidden="true">{HOME_ICON}</span>
{child}          <span class="tds-side-nav__nav-item-text">Home</span>
{child}        </span>
{child}      </button>
{child}    </div>

{child}    <div class="tds-side-nav__nav-group">
{child}      <button type="button" class="tds-side-nav__nav-item tds-side-nav__nav-item--active" aria-current="page" aria-expanded="true">
{child}        <span class="tds-side-nav__nav-item-label">
{child}          <span class="tds-side-nav__nav-item-icon" aria-hidden="true">{LABS_ICONS}</span>
{child}          <span class="tds-side-nav__nav-item-text">Labs</span>
{child}        </span>
{child}        <span class="tds-side-nav__nav-item-chevron" aria-hidden="true">{CHEVRON_UP}</span>
{child}      </button>

{child}      <div class="tds-side-nav__sub-nav">
{child}        <div class="tds-side-nav__section">
{child}          <div class="tds-side-nav__section-title">KYB</div>
{child}          <div class="tds-side-nav__section-items">
{child}            {sub_item("UBO Agent", None, False, UBO_ICON, sub_indent)}
{child}            {sub_item("Policy Review", None, False, POLICY_ICON, sub_indent)}
{child}            {sub_item("Deep Search", None, False, SEARCH_ICON, sub_indent)}
{child}          </div>
{child}        </div>

{child}        <hr class="tds-side-nav__divider">

{child}        <div class="tds-side-nav__section">
{child}          <div class="tds-side-nav__section-title">KYC</div>
{child}          <div class="tds-side-nav__section-items">
{child}            {doc_item}
{child}            {bank_item}
{child}            {sub_item("Electronic ID", None, False, EID_ICON, sub_indent)}
{child}          </div>
{child}        </div>
{child}      </div>
{child}    </div>
{child}  </div>

{child}  <div class="tds-side-nav__icon-rail" aria-hidden="{icon_rail_hidden}">
{child}    <button type="button" class="tds-side-nav__icon-button" aria-label="Home">
{child}      {HOME_ICON}
{home_tooltip}
{child}    </button>
{child}    <button type="button" class="tds-side-nav__icon-button tds-side-nav__icon-button--active" aria-current="page" aria-label="Labs">
{child}      {LABS_ICONS}
{labs_tooltip}
{child}    </button>
{child}  </div>
{child}</div>

{child}<button type="button" class="tds-side-nav__collapse-bar" id="{collapse_id}" aria-label="{collapse_aria}" aria-expanded="{collapse_expanded}">
{child}  {collapse_chevron}
{child}  {collapse_label}
{child}</button>

{child}<div class="tds-side-nav__footer">
{child}  <button type="button" class="tds-side-nav__profile{profile_collapsed}" aria-label="Jane Doe, janedoe@trulioo.com">
{child}    <span class="tds-side-nav__avatar">JD</span>
{child}    <span class="tds-side-nav__profile-info">
{child}      <span class="tds-side-nav__profile-name-row">
{child}        <span class="tds-side-nav__profile-name">Jane Doe</span>
{child}        <span class="tds-side-nav__profile-chevron" aria-hidden="true">{CHEVRON_RIGHT}</span>
{child}      </span>
{child}      <span class="tds-side-nav__profile-email">janedoe@trulioo.com</span>
{child}    </span>
{child}  </button>
{child}</div>

{indent}</aside>"""


SIDENAV_PATTERN = re.compile(
    r"    <!-- TDS SideNav component -->[\s\S]*?    </aside>",
    re.MULTILINE,
)


def replace_sidenav(html: str, markup: str) -> str:
    if SIDENAV_PATTERN.search(html):
        return SIDENAV_PATTERN.sub(markup, html, count=1)
    raise ValueError("TDS SideNav block not found")


def sync_pages() -> None:
    pages = {
        "document-verification": ROOT / "pages/document-verification/index.html",
        "bank-verification": ROOT / "pages/bank-verification/index.html",
    }
    for active, path in pages.items():
        html = path.read_text()
        markup = build(active_page=active, collapsed=True, kyc_links=True)
        path.write_text(replace_sidenav(html, markup))
        print(f"synced {path.relative_to(ROOT)}")


def sync_preview() -> None:
    preview = ROOT / "Components/side-nav/preview.html"
    html = preview.read_text()

    expanded = build(
        active_page="document-verification",
        assets_prefix="../../assets",
        root_id="preview-expanded",
        collapse_id="preview-collapse-expanded",
        collapsed=False,
        demo_class="tds-side-nav--demo-figma",
        include_tooltips=False,
        kyc_links=False,
    )
    collapsed = build(
        active_page="document-verification",
        assets_prefix="../../assets",
        root_id="preview-collapsed",
        collapse_id="preview-collapse-collapsed",
        collapsed=True,
        demo_class="tds-side-nav--demo-short",
        include_tooltips=True,
        kyc_links=False,
    )

    html = re.sub(
        r'            <aside class="tds-side-nav[\s\S]*?            </aside>',
        expanded.rstrip(),
        html,
        count=1,
    )
    html = re.sub(
        r'            <aside class="tds-side-nav tds-side-nav--collapsed[\s\S]*?            </aside>',
        collapsed.rstrip(),
        html,
        count=1,
    )
    preview.write_text(html)
    print(f"synced {preview.relative_to(ROOT)}")


if __name__ == "__main__":
    try:
        sync_pages()
        sync_preview()
    except ValueError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        sys.exit(1)
