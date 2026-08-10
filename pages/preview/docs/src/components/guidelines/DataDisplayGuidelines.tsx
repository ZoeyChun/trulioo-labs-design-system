import { DoDontPair, GuidelineSection } from "./GuidelineDoDont";

export function AiTagGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Always include the sparkles icon"
        lead={
          <p>
            AITag marks TruAI-powered features. The sparkles icon in{" "}
            <code>.tds-ai-tag__icon</code> is required — label text alone is not enough.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <span className="tds-ai-tag tds-ai-tag--sm">
              <span className="tds-ai-tag__icon" aria-hidden="true">
                ✦
              </span>
              <span className="tds-ai-tag__label">TruAI</span>
            </span>
          }
          doCaption="Icon + label communicate AI origin at a glance."
          dontPreview={<span className="tds-ai-tag tds-ai-tag--sm">TruAI</span>}
          dontCaption="Don't omit the sparkles icon from the badge."
        />
      </GuidelineSection>
    </div>
  );
}

export function DataTableGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use semantic table markup"
        lead={
          <p>
            Data tables wrap a native <code>&lt;table&gt;</code> in{" "}
            <code>.tds-data-table-container</code>. Column headers use <code>th</code> with{" "}
            <code>aria-sort</code> when sortable.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-data-table-container" style={{ width: 280 }}>
              <div className="tds-data-table__wrapper">
                <table className="tds-data-table">
                  <thead>
                    <tr>
                      <th aria-sort="none">Business name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="tds-data-table__text-cell">Acme Corp</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          }
          doCaption="Real table elements support screen readers and keyboard sort."
          dontPreview={
            <div className="tds-data-table-container" style={{ width: 280 }}>
              <div role="row">
                <span role="columnheader">Business name</span>
              </div>
            </div>
          }
          dontCaption="Don't rebuild tables with div grids — use native table markup."
        />
      </GuidelineSection>
    </div>
  );
}

export function DataFieldGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Label the data, not the input"
        lead={
          <p>
            Data fields display read-only label/value pairs. Use uppercase labels in{" "}
            <code>.tds-data-field__label</code> and values in <code>.tds-data-field__value</code>.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-data-field" style={{ maxWidth: 240 }}>
              <div className="tds-data-field__label-row">
                <span className="tds-data-field__label">Jurisdiction</span>
              </div>
              <div className="tds-data-field__content">
                <div className="tds-data-field__value-row">
                  <span className="tds-data-field__value">British Columbia</span>
                </div>
              </div>
            </div>
          }
          doCaption="Specific labels name the data attribute being shown."
          dontPreview={
            <div className="tds-data-field" style={{ maxWidth: 240 }}>
              <span className="tds-data-field__label">Field</span>
              <span className="tds-data-field__value">Value</span>
            </div>
          }
          dontCaption="Don't use generic Field/Value placeholders in production UI."
        />
      </GuidelineSection>
    </div>
  );
}

export function CounterLabelGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Match counter color to meaning"
        lead={
          <p>
            Counter labels show counts with primary or secondary variants and semantic status
            colors. Keep numbers concise — they supplement, not replace, the parent label.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <span className="tds-counter tds-counter--primary tds-counter--positive tds-counter--md">
              12
            </span>
          }
          doCaption="Use positive/intermediate/negative when the count reflects status."
          dontPreview={
            <span className="tds-counter tds-counter--primary tds-counter--negative tds-counter--md">
              0
            </span>
          }
          dontCaption="Don't use negative styling for neutral counts."
        />
      </GuidelineSection>
    </div>
  );
}

export function SectionHeaderGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Group related content with a clear title"
        lead={
          <p>
            Section headers introduce table sections or page blocks. Put the title and optional
            subtext in <code>.tds-section-header__left</code>; actions go in{" "}
            <code>__right</code>.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-section-header" style={{ maxWidth: 360 }}>
              <div className="tds-section-header__left">
                <div className="tds-section-header__title-stack">
                  <p className="tds-section-header__title">Open issues</p>
                  <p className="tds-section-header__subtext">Requires review before approval</p>
                </div>
              </div>
            </div>
          }
          doCaption="Title + subtext explain what the section contains."
          dontPreview={
            <div className="tds-section-header" style={{ maxWidth: 360 }}>
              <p className="tds-section-header__title">Section</p>
            </div>
          }
          dontCaption="Don't use vague titles like Section without context."
        />
      </GuidelineSection>
    </div>
  );
}

export function DismissIssueBadgeGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Pick the right color for the surface"
        lead={
          <p>
            Dismiss badges sit on tags and compact pills. Use <code>--black</code> on light
            backgrounds and <code>--white</code> on dark or colored tags.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <button
              type="button"
              className="tds-dismiss-badge tds-dismiss-badge--md tds-dismiss-badge--black"
              aria-label="Dismiss issue"
            >
              ×
            </button>
          }
          doCaption="Black variant on neutral/light tag surfaces."
          dontPreview={
            <button
              type="button"
              className="tds-dismiss-badge tds-dismiss-badge--md tds-dismiss-badge--white"
              aria-label="Dismiss issue"
            >
              ×
            </button>
          }
          dontCaption="White variant disappears on light backgrounds — match surface contrast."
        />
      </GuidelineSection>
    </div>
  );
}

export function FlagIconGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use ISO country codes"
        lead={
          <p>
            Country flags use the <code>fi fi-{'{code}'}</code> pattern from flag-icons. Pair with
            visible country text — the flag alone is not accessible.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <span className="tds-action-list-item__leading-visual">
              <span className="fi fi-ca" role="img" aria-label="Canada" />
              <span>Canada</span>
            </span>
          }
          doCaption="Flag + country name gives context for all users."
          dontPreview={<span className="fi fi-ca" />}
          dontCaption="Don't rely on flags alone without a text label or aria-label."
        />
      </GuidelineSection>
    </div>
  );
}

export function ActionListItemGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="One primary label per row"
        lead={
          <p>
            Action list items are menu rows inside dropdown panels. Keep labels short; use{" "}
            <code>__description</code> for secondary detail and <code>--selected</code> for the
            current choice.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <button type="button" className="tds-action-list-item tds-action-list-item--selected" role="menuitem">
              <span className="tds-action-list-item__label">British Columbia</span>
              <span className="tds-action-list-item__check" aria-hidden="true">
                ✓
              </span>
            </button>
          }
          doCaption="Selected rows show a checkmark — one selection at a time."
          dontPreview={
            <button type="button" className="tds-action-list-item" role="menuitem">
              <span className="tds-action-list-item__label">
                British Columbia — selected province in Canada for this business
              </span>
            </button>
          }
          dontCaption="Don't cram descriptions into the primary label."
        />
      </GuidelineSection>
    </div>
  );
}

export function StatCardGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Lead with the metric, explain in the footer"
        lead={
          <p>
            Stat cards show a headline number with optional sub-label and a footer trend line. Use{" "}
            <code>--positive</code> or <code>--negative</code> on the card to color the footer icon.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-stat-card tds-stat-card--positive" style={{ maxWidth: 220 }}>
              <p className="tds-stat-card__label">Match rate</p>
              <div className="tds-stat-card__value-group">
                <p className="tds-stat-card__value">94%</p>
                <p className="tds-stat-card__sub-label">Last 30 days</p>
              </div>
              <div className="tds-stat-card__footer">
                <span className="tds-stat-card__icon" aria-hidden="true">
                  ↑
                </span>
                <p className="tds-stat-card__description">Up 3% from prior period</p>
              </div>
            </div>
          }
          doCaption="Value is prominent; footer explains the trend."
          dontPreview={
            <div className="tds-stat-card" style={{ maxWidth: 220 }}>
              <p className="tds-stat-card__description">Match rate is 94% which is good</p>
            </div>
          }
          dontCaption="Don't bury the metric in paragraph text."
        />
      </GuidelineSection>
    </div>
  );
}
