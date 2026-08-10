import { DoDontPair, GuidelineSection } from "./GuidelineDoDont";

const homeIcon = (
  <svg className="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 6.5 8 2l5.5 4.5V13a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V6.5z" />
    <path d="M6 14V9h4v5" />
  </svg>
);

function PreviewRow({ children }: { children: React.ReactNode }) {
  return <div className="tds-guideline-button-row">{children}</div>;
}

function SideNavMini({ collapsed = false }: { collapsed?: boolean }) {
  if (collapsed) {
    return (
      <aside className="tds-side-nav tds-side-nav--collapsed" style={{ width: 72, minHeight: 200 }}>
        <div className="tds-side-nav__main">
          <div className="tds-side-nav__icon-rail">
            <button type="button" className="tds-side-nav__icon-button" aria-label="Home">
              {homeIcon}
            </button>
            <button
              type="button"
              className="tds-side-nav__icon-button tds-side-nav__icon-button--active"
              aria-current="page"
              aria-label="Labs"
            >
              {homeIcon}
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="tds-side-nav tds-side-nav--expanded" style={{ width: 220, minHeight: 200 }}>
      <div className="tds-side-nav__main">
        <div className="tds-side-nav__nav-stack">
          <button type="button" className="tds-side-nav__nav-item">
            <span className="tds-side-nav__nav-item-label">
              <span className="tds-side-nav__nav-item-icon">{homeIcon}</span>
              <span className="tds-side-nav__nav-item-text">Home</span>
            </span>
          </button>
          <button type="button" className="tds-side-nav__nav-item tds-side-nav__nav-item--active" aria-current="page">
            <span className="tds-side-nav__nav-item-label">
              <span className="tds-side-nav__nav-item-icon">{homeIcon}</span>
              <span className="tds-side-nav__nav-item-text">Labs</span>
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export function SideNavGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use expanded mode for primary workspace navigation"
        lead={
          <p>
            SideNav is the persistent app shell for KYB and Labs products. Expanded mode shows
            labels, nested sections, and the user profile — use it as the default on desktop.
          </p>
        }
      >
        <DoDontPair
          doPreview={<SideNavMini />}
          doCaption="Keep one active top-level item with aria-current='page' and nested sub-items for the current section."
          dontPreview={<SideNavMini collapsed />}
          dontCaption="Don't default to collapsed mode on wide screens — icon-only rails hide wayfinding context."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Collapse when content needs full width"
        lead={
          <p>
            Collapsed mode preserves quick access via icon buttons and tooltips. Switch on narrow
            viewports or when a data-heavy view (tables, graphs) needs horizontal space.
          </p>
        }
      >
        <DoDontPair
          doPreview={<SideNavMini collapsed />}
          doCaption="Pair collapsed rails with aria-label on each icon button and tooltips on hover."
          dontPreview={<SideNavMini collapsed />}
          dontCaption="Don't remove the collapse/expand control — users must be able to restore labels."
        />
      </GuidelineSection>
    </div>
  );
}

export function NavItemGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Match size to container density"
        lead={
          <p>
            Nav items scale from 30px (sm) to 38px (lg). Use medium in sidebars and dropdown panels;
            small for nested lists inside collapsible groups.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-dropdown-panel" style={{ width: 220 }}>
              <button type="button" className="tds-nav-item tds-nav-item--md tds-nav-item--active">
                <span className="tds-nav-item__current-selection" aria-hidden="true" />
                <span>Dashboard</span>
              </button>
              <button type="button" className="tds-nav-item tds-nav-item--md">
                <span>Verifications</span>
              </button>
            </div>
          }
          doCaption="Use md (34px) in standard sidebar and dropdown lists."
          dontPreview={
            <div className="tds-dropdown-panel" style={{ width: 220 }}>
              <button type="button" className="tds-nav-item tds-nav-item--lg">
                <span>Dashboard</span>
              </button>
              <button type="button" className="tds-nav-item tds-nav-item--lg">
                <span>Verifications</span>
              </button>
            </div>
          }
          dontCaption="Don't use lg in compact dropdown panels — it wastes vertical space."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Mark the current destination clearly"
        lead={
          <p>
            Apply <code>.tds-nav-item--active</code> and <code>aria-current="page"</code> on the
            selected row. Include <code>.tds-nav-item__current-selection</code> for the teal bar
            indicator when the design calls for it.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-dropdown-panel" style={{ width: 220 }}>
              <button type="button" className="tds-nav-item tds-nav-item--md">
                <span>Overview</span>
              </button>
              <button type="button" className="tds-nav-item tds-nav-item--md tds-nav-item--active" aria-current="page">
                <span className="tds-nav-item__current-selection" aria-hidden="true" />
                <span>Entities</span>
              </button>
            </div>
          }
          doCaption="One active item per list. Disabled items use the disabled attribute."
          dontPreview={
            <div className="tds-dropdown-panel" style={{ width: 220 }}>
              <button type="button" className="tds-nav-item tds-nav-item--md tds-nav-item--active">
                <span>Overview</span>
              </button>
              <button type="button" className="tds-nav-item tds-nav-item--md tds-nav-item--active">
                <span>Entities</span>
              </button>
            </div>
          }
          dontCaption="Don't mark multiple items active in the same list."
        />
      </GuidelineSection>
    </div>
  );
}

export function NavListGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Group related destinations with headings"
        lead={
          <p>
            Nav lists organize sidebar and panel navigation. Use uppercase group headings and
            dividers to separate workspaces from settings or archived items.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="card" style={{ maxWidth: 240, padding: 0 }}>
              <div className="tds-nav-list">
                <div className="tds-nav-list__heading">Workspace</div>
                <button type="button" className="tds-nav-item tds-nav-item--active">
                  <span className="tds-nav-item__current-selection" aria-hidden="true" />
                  <span>Dashboard</span>
                </button>
                <button type="button" className="tds-nav-item">
                  <span>Verifications</span>
                </button>
                <div className="tds-nav-list__divider" />
                <div className="tds-nav-list__heading">Settings</div>
                <button type="button" className="tds-nav-item">
                  <span>Preferences</span>
                </button>
              </div>
            </div>
          }
          doCaption="Headings label groups; dividers separate unrelated sections."
          dontPreview={
            <div className="card" style={{ maxWidth: 240, padding: 0 }}>
              <div className="tds-nav-list">
                <button type="button" className="tds-nav-item">
                  <span>Dashboard</span>
                </button>
                <button type="button" className="tds-nav-item">
                  <span>Verifications</span>
                </button>
                <button type="button" className="tds-nav-item">
                  <span>Preferences</span>
                </button>
              </div>
            </div>
          }
          dontCaption="Don't flatten long lists — users lose scanability without group structure."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Collapse long groups to reduce scroll"
        lead={
          <p>
            Use <code>.tds-nav-list__collapse-trigger</code> for expandable sections. Toggle{" "}
            <code>aria-expanded</code> and hide nested items with the <code>hidden</code> attribute.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="card" style={{ maxWidth: 240, padding: 0 }}>
              <div className="tds-nav-list">
                <button type="button" className="tds-nav-list__collapse-trigger" aria-expanded="true">
                  <span>Verification types</span>
                  <span className="tds-nav-list__collapse-icon" aria-hidden="true">
                    <svg className="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </span>
                </button>
                <div className="tds-nav-list__collapse-content">
                  <button type="button" className="tds-nav-item tds-nav-item--sm tds-nav-item--active">
                    <span>KYB</span>
                  </button>
                  <button type="button" className="tds-nav-item tds-nav-item--sm">
                    <span>KYC</span>
                  </button>
                </div>
              </div>
            </div>
          }
          doCaption="Nested items use sm size for tighter density under the trigger."
          dontPreview={
            <div className="card" style={{ maxWidth: 240, padding: 0 }}>
              <div className="tds-nav-list">
                <button type="button" className="tds-nav-item tds-nav-item--sm">
                  <span>KYB</span>
                </button>
                <button type="button" className="tds-nav-item tds-nav-item--sm">
                  <span>KYC</span>
                </button>
                <button type="button" className="tds-nav-item tds-nav-item--sm">
                  <span>AML</span>
                </button>
                <button type="button" className="tds-nav-item tds-nav-item--sm">
                  <span>Bank</span>
                </button>
              </div>
            </div>
          }
          dontCaption="Don't expose every nested item by default when the list exceeds ~5 entries."
        />
      </GuidelineSection>
    </div>
  );
}

function TabsRow({ count = 2, activeIndex = 0 }: { count?: number; activeIndex?: number }) {
  const labels = ["Overview", "Documents", "Activity", "Ownership", "Signals"];
  return (
    <div className="tds-tabs">
      <div className="tds-tabs__row">
        <div className="tds-tabs__list" role="tablist">
          {labels.slice(0, count).map((label, i) => (
            <button
              key={label}
              type="button"
              className={`tds-tab-item${i === activeIndex ? " tds-tab-item--active" : ""}`}
              role="tab"
              aria-selected={i === activeIndex}
            >
              <span className="tds-tab-item__content">{label}</span>
              <span className="tds-tab-item__indicator" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <div className="tds-tabs__divider" aria-hidden="true" />
    </div>
  );
}

export function TabsGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Switch related views at the same hierarchy level"
        lead={
          <p>
            Tabs organize content within a page — like Overview, Documents, and Activity on KYB
            results. Keep labels short and scannable; use counters sparingly for actionable counts.
          </p>
        }
      >
        <DoDontPair
          doPreview={<TabsRow count={3} />}
          doCaption="2–5 tabs fit comfortably without overflow. One tab is active with aria-selected='true'."
          dontPreview={<TabsRow count={5} activeIndex={4} />}
          dontCaption="Don't cram more than ~6 tabs without enabling overflow scroll."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Include the indicator on every tab"
        lead={
          <p>
            The 3px teal underline lives in <code>.tds-tab-item__indicator</code>. Include it on
            every tab — even inactive and disabled — so row height stays consistent.
          </p>
        }
      >
        <DoDontPair
          doPreview={<TabsRow count={2} />}
          doCaption="Active tab shows the filled indicator; inactive tabs keep an empty indicator slot."
          dontPreview={
            <div className="tds-tabs">
              <div className="tds-tabs__row">
                <div className="tds-tabs__list">
                  <button type="button" className="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true">
                    <span className="tds-tab-item__content">Tab 1</span>
                  </button>
                  <button type="button" className="tds-tab-item" role="tab" aria-selected="false">
                    <span className="tds-tab-item__content">Tab 2</span>
                  </button>
                </div>
              </div>
              <div className="tds-tabs__divider" aria-hidden="true" />
            </div>
          }
          dontCaption="Don't omit the indicator — tabs will jump vertically when selection changes."
        />
      </GuidelineSection>
    </div>
  );
}

export function TabItemGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use tab semantics on interactive items"
        lead={
          <p>
            Each tab is a <code>&lt;button&gt;</code> with <code>role="tab"</code>,{" "}
            <code>aria-selected</code>, and a visible label in <code>.tds-tab-item__content</code>.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <PreviewRow>
              <button type="button" className="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true">
                <span className="tds-tab-item__content">Overview</span>
                <span className="tds-tab-item__indicator" aria-hidden="true" />
              </button>
              <button type="button" className="tds-tab-item" role="tab" aria-selected="false">
                <span className="tds-tab-item__content">Documents</span>
                <span className="tds-tab-item__indicator" aria-hidden="true" />
              </button>
            </PreviewRow>
          }
          doCaption="Wrap tabs in a tablist. Pair with a tabpanel that references the active tab."
          dontPreview={
            <PreviewRow>
              <a href="#" className="tds-tab-item tds-tab-item--active">
                <span className="tds-tab-item__content">Overview</span>
              </a>
              <a href="#" className="tds-tab-item">
                <span className="tds-tab-item__content">Documents</span>
              </a>
            </PreviewRow>
          }
          dontCaption="Don't use links for in-page section switching — use buttons with tab roles."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Disable unavailable sections instead of hiding them"
        lead={
          <p>
            When a tab's content isn't ready (e.g. Settings before onboarding completes), keep the
            tab visible but disabled so users understand the full information architecture.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <PreviewRow>
              <button type="button" className="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true">
                <span className="tds-tab-item__content">Overview</span>
                <span className="tds-tab-item__indicator" aria-hidden="true" />
              </button>
              <button type="button" className="tds-tab-item tds-tab-item--disabled" role="tab" aria-selected="false" disabled>
                <span className="tds-tab-item__content">Settings</span>
                <span className="tds-tab-item__indicator" aria-hidden="true" />
              </button>
            </PreviewRow>
          }
          doCaption="Disabled tabs retain the indicator slot and use the native disabled attribute."
          dontPreview={
            <PreviewRow>
              <button type="button" className="tds-tab-item tds-tab-item--active" role="tab" aria-selected="true">
                <span className="tds-tab-item__content">Overview</span>
                <span className="tds-tab-item__indicator" aria-hidden="true" />
              </button>
            </PreviewRow>
          }
          dontCaption="Don't remove tabs users will eventually reach — it breaks mental models."
        />
      </GuidelineSection>
    </div>
  );
}

export function FilterTabGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Filter content, don't navigate away"
        lead={
          <p>
            Filter tabs narrow a list or table in place — status filters on KYB results, for
            example. They are not a substitute for page-level tabs or breadcrumbs.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-filter-tabs" role="tablist" aria-label="Status filters">
              <button type="button" className="tds-filter-tab tds-filter-tab--selected" role="tab" aria-selected="true">
                All <span className="tds-counter tds-counter--secondary tds-counter--sm">12</span>
              </button>
              <button type="button" className="tds-filter-tab" role="tab" aria-selected="false">
                Active <span className="tds-counter tds-counter--secondary tds-counter--sm">8</span>
              </button>
              <button type="button" className="tds-filter-tab" role="tab" aria-selected="false">
                Archived
              </button>
            </div>
          }
          doCaption="One pill is selected at a time. Counts use CounterLabel secondary sm."
          dontPreview={<TabsRow count={3} />}
          dontCaption="Don't use underline tabs for inline filtering — the visual language differs."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Keep pill labels concise"
        lead={
          <p>
            Selected pills use inverse label/sm medium on interactive fill. Unselected pills use
            body/xs on transparent. Long labels wrap awkwardly in pill shapes.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-filter-tabs" role="tablist">
              <button type="button" className="tds-filter-tab tds-filter-tab--selected" role="tab" aria-selected="true">
                Verified
              </button>
              <button type="button" className="tds-filter-tab" role="tab" aria-selected="false">
                Pending
              </button>
            </div>
          }
          doCaption="Short status names scan quickly in dense toolbars."
          dontPreview={
            <div className="tds-filter-tabs" role="tablist">
              <button type="button" className="tds-filter-tab tds-filter-tab--selected" role="tab" aria-selected="true">
                Verified business entities
              </button>
              <button type="button" className="tds-filter-tab" role="tab" aria-selected="false">
                Pending manual review
              </button>
            </div>
          }
          dontCaption="Don't use full sentence labels — truncate or abbreviate instead."
        />
      </GuidelineSection>
    </div>
  );
}

export function FilterTab2Guidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Build pills from FilterTabsItem atoms"
        lead={
          <p>
            FilterTabsItem is the individual pill inside a <code>.tds-filter-tabs</code> container.
            It shares CSS with FilterTabs — style selected and unselected states consistently.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <PreviewRow>
              <button type="button" className="tds-filter-tab" role="tab" aria-selected="false">
                Draft
              </button>
              <button type="button" className="tds-filter-tab tds-filter-tab--selected" role="tab" aria-selected="true">
                Active
              </button>
            </PreviewRow>
          }
          doCaption="Toggle .tds-filter-tab--selected or aria-selected='true' on the active pill only."
          dontPreview={
            <PreviewRow>
              <button type="button" className="tds-filter-tab tds-filter-tab--selected" role="tab" aria-selected="true">
                Draft
              </button>
              <button type="button" className="tds-filter-tab tds-filter-tab--selected" role="tab" aria-selected="true">
                Active
              </button>
            </PreviewRow>
          }
          dontCaption="Don't allow multi-select unless the UX explicitly supports multiple filters."
        />
      </GuidelineSection>
    </div>
  );
}

export function BreadcrumbGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Show the path, not every click"
        lead={
          <p>
            Breadcrumbs communicate hierarchy — workspace → entity → current page. Keep paths
            shallow (3–4 levels) and truncate middle segments on narrow viewports if needed.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <nav className="tds-breadcrumbs" aria-label="Breadcrumb">
              <a href="#" className="tds-breadcrumb-item">
                Entities
              </a>
              <span className="tds-breadcrumb-divider" aria-hidden="true">
                /
              </span>
              <span className="tds-breadcrumb-item tds-breadcrumb-item--current" aria-current="page">
                Acme Corp
              </span>
            </nav>
          }
          doCaption="Ancestors are links in teal; the current page is plain text with aria-current='page'."
          dontPreview={
            <nav className="tds-breadcrumbs" aria-label="Breadcrumb">
              <a href="#" className="tds-breadcrumb-item">
                Home
              </a>
              <span className="tds-breadcrumb-divider" aria-hidden="true">
                /
              </span>
              <a href="#" className="tds-breadcrumb-item">
                Workspace
              </a>
              <span className="tds-breadcrumb-divider" aria-hidden="true">
                /
              </span>
              <a href="#" className="tds-breadcrumb-item">
                Entities
              </a>
              <span className="tds-breadcrumb-divider" aria-hidden="true">
                /
              </span>
              <a href="#" className="tds-breadcrumb-item">
                Acme Corp
              </a>
            </nav>
          }
          dontCaption="Don't link the current page — it implies navigation away from where the user is."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Use semantic nav markup"
        lead={
          <p>
            Wrap breadcrumbs in <code>&lt;nav aria-label="Breadcrumb"&gt;</code>. Dividers are
            decorative — mark them <code>aria-hidden="true"</code>.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <nav className="tds-breadcrumbs" aria-label="Breadcrumb">
              <a href="#" className="tds-breadcrumb-item">
                One
              </a>
              <span className="tds-breadcrumb-divider" aria-hidden="true">
                /
              </span>
              <a href="#" className="tds-breadcrumb-item">
                Two
              </a>
              <span className="tds-breadcrumb-divider" aria-hidden="true">
                /
              </span>
              <span className="tds-breadcrumb-item tds-breadcrumb-item--current" aria-current="page">
                Current page
              </span>
            </nav>
          }
          doCaption="Landmark nav with aria-label helps screen readers skip repetitive chrome."
          dontPreview={
            <div className="tds-breadcrumbs">
              <span>One / Two / Current page</span>
            </div>
          }
          dontCaption="Don't flatten breadcrumbs into plain text — links lose keyboard access."
        />
      </GuidelineSection>
    </div>
  );
}
