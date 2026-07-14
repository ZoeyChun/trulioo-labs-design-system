#!/usr/bin/env python3
"""Generate TDS SideNav HTML blocks for app pages."""

def sub_item(label, href, selected=False, icon_svg=""):
    cls = "tds-side-nav__sub-item"
    if selected:
        cls += " tds-side-nav__sub-item--selected"
    current = ' aria-current="page"' if selected else ""
    icon = f'<span class="tds-side-nav__sub-item-icon" aria-hidden="true">{icon_svg}</span>' if icon_svg else ""
    return f'''<a href="{href}" class="{cls}"{current}>
                    {icon}
                    <span class="tds-side-nav__sub-item-text">{label}</span>
                  </a>'''

DOC_ICON = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1.5" y="3" width="13" height="10" rx="1.5"/><circle cx="6" cy="7.5" r="1.5"/><path d="M3.5 11.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5"/><path d="M10 7h2.5M10 9.5h2.5"/></svg>'
BANK_ICON = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4h12v8H2z"/><path d="M5 7v2M8 6v4M11 7v2M4 4V2h8v2"/></svg>'
EID_ICON = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1C5.5 3 4 5.5 4 8c0 2.5 1.5 4.5 4 4.5S12 10.5 12 8c0-2.5-1.5-5-4-7z"/><path d="M8 12.5V15M6 8c0-1.5 1-3 2-4M10 8c0-1.5-1-3-2-4"/></svg>'
UBO_ICON = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="5.5" cy="5" r="2.5"/><path d="M1 13c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4"/><circle cx="11.5" cy="5.5" r="2"/><path d="M15 13c0-2 1.5-3 0-3-1 0-2.5 1-2.5 3"/></svg>'
POLICY_ICON = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 1.5h8a1 1 0 0 1 1 1v12l-5-2.5-5 2.5v-12a1 1 0 0 1 1-1z"/><path d="M6 6l1.5 1.5L10 5"/></svg>'
SEARCH_ICON = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/></svg>'


def build(active_page):
    """active_page: 'document-verification' | 'bank-verification'"""
    dv_href = "../document-verification/index.html"
    bv_href = "../bank-verification/index.html"
    if active_page == "document-verification":
        dv_href = "index.html"
        doc_item = sub_item("Document Verification", dv_href, True, DOC_ICON)
        bank_item = sub_item("Bank Verification", bv_href, False, BANK_ICON)
    else:
        bv_href = "index.html"
        doc_item = sub_item("Document Verification", dv_href, False, DOC_ICON)
        bank_item = sub_item("Bank Verification", bv_href, True, BANK_ICON)

    return f'''    <!-- TDS SideNav component -->
    <aside class="tds-side-nav tds-side-nav--collapsed" id="app-sidenav" aria-label="Primary">

      <div class="tds-side-nav__header">
        <button type="button" class="tds-side-nav__brand" aria-label="Trulioo home">
          <span class="tds-side-nav__logo">
            <img src="../../assets/trulioo-logo-mark.svg" alt="Trulioo" width="40" height="40">
          </span>
        </button>
      </div>

      <div class="tds-side-nav__main">
        <div class="tds-side-nav__nav-stack">
          <div>
            <button type="button" class="tds-side-nav__nav-item">
              <span class="tds-side-nav__nav-item-label">
                <span class="tds-side-nav__nav-item-icon" aria-hidden="true">
                  <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 7.5 8 2.5l5.5 5V13a1 1 0 0 1-1 1H10v-4H6v4H3.5a1 1 0 0 1-1-1V7.5z"/></svg>
                </span>
                <span class="tds-side-nav__nav-item-text">Home</span>
              </span>
            </button>
          </div>

          <div class="tds-side-nav__nav-group">
            <button type="button" class="tds-side-nav__nav-item tds-side-nav__nav-item--active" aria-current="page" aria-expanded="true">
              <span class="tds-side-nav__nav-item-label">
                <span class="tds-side-nav__nav-item-icon" aria-hidden="true">
                  <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2v5.5L3 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1L10 7.5V2M5 2h6"/></svg>
                </span>
                <span class="tds-side-nav__nav-item-text">Labs</span>
              </span>
              <span class="tds-side-nav__nav-item-chevron" aria-hidden="true">
                <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 10l4-4 4 4"/></svg>
              </span>
            </button>

            <div class="tds-side-nav__sub-nav">
              <div class="tds-side-nav__section">
                <div class="tds-side-nav__section-title">KYB</div>
                <div class="tds-side-nav__section-items">
                  <button type="button" class="tds-side-nav__sub-item">
                    <span class="tds-side-nav__sub-item-icon" aria-hidden="true">{UBO_ICON}</span>
                    <span class="tds-side-nav__sub-item-text">UBO Agent</span>
                  </button>
                  <button type="button" class="tds-side-nav__sub-item">
                    <span class="tds-side-nav__sub-item-icon" aria-hidden="true">{POLICY_ICON}</span>
                    <span class="tds-side-nav__sub-item-text">Policy Review</span>
                  </button>
                  <button type="button" class="tds-side-nav__sub-item">
                    <span class="tds-side-nav__sub-item-icon" aria-hidden="true">{SEARCH_ICON}</span>
                    <span class="tds-side-nav__sub-item-text">Deep Search</span>
                  </button>
                </div>
              </div>

              <hr class="tds-side-nav__divider">

              <div class="tds-side-nav__section">
                <div class="tds-side-nav__section-title">KYC</div>
                <div class="tds-side-nav__section-items">
                  {doc_item}
                  {bank_item}
                  <button type="button" class="tds-side-nav__sub-item">
                    <span class="tds-side-nav__sub-item-icon" aria-hidden="true">{EID_ICON}</span>
                    <span class="tds-side-nav__sub-item-text">Electronic ID</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tds-side-nav__icon-rail" aria-hidden="false">
          <button type="button" class="tds-side-nav__icon-button" aria-label="Home">
            <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 7.5 8 2.5l5.5 5V13a1 1 0 0 1-1 1H10v-4H6v4H3.5a1 1 0 0 1-1-1V7.5z"/></svg>
            <span class="tds-side-nav__tooltip" role="tooltip">
              <span class="tds-side-nav__tooltip-caret"></span>
              <span class="tds-side-nav__tooltip-body">Home</span>
            </span>
          </button>
          <button type="button" class="tds-side-nav__icon-button tds-side-nav__icon-button--active" aria-current="page" aria-label="Labs">
            <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2v5.5L3 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1L10 7.5V2M5 2h6"/></svg>
            <span class="tds-side-nav__tooltip" role="tooltip">
              <span class="tds-side-nav__tooltip-caret"></span>
              <span class="tds-side-nav__tooltip-body">Labs</span>
            </span>
          </button>
        </div>
      </div>

      <button type="button" class="tds-side-nav__collapse-bar" id="sidenav-collapse" aria-label="Expand sidebar" aria-expanded="false">
        <svg class="icon icon--sm" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 4l4 4-4 4M10 4l4 4-4 4"/></svg>
        <span class="tds-side-nav__collapse-label text-label-sm-uppercase">Hide Sidebar</span>
      </button>

      <div class="tds-side-nav__footer">
        <button type="button" class="tds-side-nav__profile tds-side-nav__profile--collapsed" aria-label="Jane Doe, janedoe@trulioo.com">
          <span class="tds-side-nav__avatar">JD</span>
          <span class="tds-side-nav__profile-info">
            <span class="tds-side-nav__profile-name-row">
              <span class="tds-side-nav__profile-name">Jane Doe</span>
              <span class="tds-side-nav__profile-chevron" aria-hidden="true">
                <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 4l4 4-4 4"/></svg>
              </span>
            </span>
            <span class="tds-side-nav__profile-email">janedoe@trulioo.com</span>
          </span>
        </button>
      </div>

    </aside>'''


if __name__ == "__main__":
    import re, sys
    from pathlib import Path

    root = Path(__file__).resolve().parents[1]
    pages = {
        "document-verification": root / "pages/document-verification/index.html",
        "bank-verification": root / "pages/bank-verification/index.html",
    }

    for active, path in pages.items():
        html = path.read_text()
        if "tds-side-nav" in html and "app-sidenav__top" not in html:
            print(f"skip {path} (already migrated)")
            continue

        if 'href="../../Components/side-nav/side-nav.css"' not in html:
            html = html.replace(
                '  <link rel="stylesheet" href="../shared/app-shell.css">',
                '  <link rel="stylesheet" href="../../Components/side-nav/side-nav.css">\n  <link rel="stylesheet" href="../shared/app-shell.css">',
                1,
            )

        nav_pattern = re.compile(
            r'    <nav class="app-sidenav" id="app-sidenav"[\s\S]*?    </nav>',
            re.MULTILINE,
        )
        if not nav_pattern.search(html):
            print(f"ERROR: legacy nav not found in {path}", file=sys.stderr)
            sys.exit(1)
        html = nav_pattern.sub(build(active), html, count=1)

        script_block = '''  <script src="../../Components/side-nav/side-nav.js"></script>
  <script>TdsSideNav.init();</script>
'''
        if "side-nav.js" not in html:
            html = html.replace("</body>", script_block + "</body>", 1)

        path.write_text(html)
        print(f"migrated {path}")
