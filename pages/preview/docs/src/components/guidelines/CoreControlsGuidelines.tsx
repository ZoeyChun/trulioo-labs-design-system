import { DoDontPair, GuidelineSection } from "./GuidelineDoDont";

const faceIcon = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5.5" cy="6.5" r="1" fill="currentColor" />
    <circle cx="10.5" cy="6.5" r="1" fill="currentColor" />
    <path
      d="M5 10.5c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const closeIcon = (
  <svg className="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

function IconButtonSpecimen({
  variant = "secondary",
  size = "md",
  circular = false,
  loading = false,
  ariaLabel,
}: {
  variant?: "primary" | "secondary" | "danger" | "invisible";
  size?: "sm" | "md" | "lg";
  circular?: boolean;
  loading?: boolean;
  ariaLabel: string;
}) {
  const cls = [
    "tds-icon-btn",
    `tds-icon-btn--${size}`,
    `tds-icon-btn--${variant}`,
    circular ? "tds-icon-btn--circular" : "",
    loading ? "tds-icon-btn--loading" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={cls}
      aria-label={ariaLabel}
      aria-busy={loading ? "true" : undefined}
    >
      {loading ? (
        <span className="tds-spinner tds-spinner--xs" aria-hidden="true" />
      ) : (
        <span className="tds-icon-btn__icon" aria-hidden="true">
          {faceIcon}
        </span>
      )}
    </button>
  );
}

function TooltipSpecimen({ text }: { text: string }) {
  return (
    <div
      className="tds-tooltip tds-tooltip--dark tds-tooltip--bottom tds-tooltip--caret-sm"
      role="tooltip"
    >
      <div className="tds-tooltip__body">
        <p className="tds-tooltip__text">{text}</p>
      </div>
      <span className="tds-tooltip__caret" aria-hidden="true" />
    </div>
  );
}

function IconButtonWithTooltip({ ariaLabel }: { ariaLabel: string }) {
  return (
    <span className="tds-guideline-icon-tooltip">
      <TooltipSpecimen text={ariaLabel} />
      <IconButtonSpecimen variant="secondary" ariaLabel={ariaLabel} />
    </span>
  );
}

function PreviewRow({ children }: { children: React.ReactNode }) {
  return <div className="tds-guideline-button-row">{children}</div>;
}

export function IconButtonGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Always provide an accessible label"
        lead={
          <p>
            Icon buttons have no visible text. Every instance needs an{" "}
            <code>aria-label</code> that describes the action — especially in verification
            toolbars where multiple icon-only controls sit side by side.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <PreviewRow>
              <IconButtonSpecimen variant="secondary" ariaLabel="Download verification report" />
              <IconButtonSpecimen variant="secondary" ariaLabel="Share business summary" />
            </PreviewRow>
          }
          doCaption="Use descriptive aria-label values that name the action and its target."
          dontPreview={
            <PreviewRow>
              <IconButtonSpecimen variant="secondary" ariaLabel="Button" />
              <IconButtonSpecimen variant="secondary" ariaLabel="Icon" />
            </PreviewRow>
          }
          dontCaption="Don't use generic labels like Button or Icon. Screen reader users can't distinguish them."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Match variant weight to action importance"
        lead={
          <p>
            Icon buttons follow the same variant hierarchy as text buttons. Use primary for the
            dominant action, secondary for standard toolbar controls, danger for destructive
            operations, and invisible for low-emphasis affordances.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <PreviewRow>
              <IconButtonSpecimen variant="primary" ariaLabel="Submit verification" />
              <IconButtonSpecimen variant="secondary" ariaLabel="Edit business details" />
              <IconButtonSpecimen variant="invisible" ariaLabel="More options" />
            </PreviewRow>
          }
          doCaption="Reserve primary for the single most important icon action in a group."
          dontPreview={
            <PreviewRow>
              <IconButtonSpecimen variant="primary" ariaLabel="Filter results" />
              <IconButtonSpecimen variant="primary" ariaLabel="Sort column" />
              <IconButtonSpecimen variant="primary" ariaLabel="Refresh data" />
            </PreviewRow>
          }
          dontCaption="Don't use primary styling on every icon button. Competing emphasis reduces clarity."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Show loading state for async icon actions"
        lead={
          <p>
            When an icon button triggers a network request, swap the icon for a spinner and set{" "}
            <code>aria-busy="true"</code>. This prevents duplicate submissions in flows like
            document re-upload or verification refresh.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <PreviewRow>
              <IconButtonSpecimen variant="primary" loading ariaLabel="Refreshing verification status" />
            </PreviewRow>
          }
          doCaption="Replace the icon with .tds-spinner--xs and disable interaction during async work."
          dontPreview={
            <PreviewRow>
              <IconButtonSpecimen variant="primary" ariaLabel="Refresh verification status" />
              <span className="tds-guideline-annotation">(no feedback after click)</span>
            </PreviewRow>
          }
          dontCaption="Don't leave the icon unchanged during processing. Users will click again."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Choose Icon Button vs. Button with icon"
        lead={
          <p>
            Use icon-only buttons when the icon is universally recognized (close, search, settings,
            add) and space is constrained. If the action isn't immediately obvious from the icon
            alone, use a text button with a leading icon instead.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <PreviewRow>
              <IconButtonSpecimen variant="secondary" ariaLabel="Search businesses" />
              <IconButtonSpecimen variant="secondary" ariaLabel="Settings" />
            </PreviewRow>
          }
          doCaption="Use icon-only buttons for universally recognized actions in tight spaces."
          dontPreview={
            <PreviewRow>
              <IconButtonSpecimen variant="secondary" ariaLabel="Generate compliance report" />
            </PreviewRow>
          }
          dontCaption="Don't use icon-only for uncommon actions. If users need a tooltip to understand it, add a text label."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Pair with a tooltip for sighted users"
        lead={
          <p>
            <code>aria-label</code> serves screen readers, but sighted users also need help
            identifying unfamiliar icons. Show a tooltip on hover and keyboard focus that
            matches the <code>aria-label</code> text.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <PreviewRow>
              <IconButtonWithTooltip ariaLabel="Download report" />
            </PreviewRow>
          }
          doCaption="Show a tooltip on hover/focus that matches the aria-label."
          dontPreview={
            <PreviewRow>
              <IconButtonSpecimen variant="secondary" ariaLabel="Download report" />
              <span className="tds-guideline-annotation">(no tooltip on hover)</span>
            </PreviewRow>
          }
          dontCaption="Don't rely on the icon alone. Sighted users shouldn't have to guess the action."
        />
      </GuidelineSection>
    </div>
  );
}

function ButtonGroupSpecimen({
  labels,
  selectedIndex = 1,
}: {
  labels: string[];
  selectedIndex?: number;
}) {
  return (
    <div className="tds-button-group" role="group" aria-label="View mode">
      {labels.map((label, index) => (
        <button
          key={label}
          type="button"
          className={`tds-btn tds-btn--sm ${
            index === selectedIndex ? "tds-btn--invisible" : "tds-btn--secondary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function ButtonGroupGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use for mutually exclusive choices"
        lead={
          <p>
            Button groups present related choices as a row of standard buttons with one option
            active at a time. Use them to switch between related views like list vs. graph, or
            summary vs. detail in KYB results.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ButtonGroupSpecimen labels={["Summary", "Owners", "Documents"]} selectedIndex={0} />
          }
          doCaption="Group 2–5 related, mutually exclusive options with one clearly selected."
          dontPreview={
            <div className="tds-button-group" role="group" aria-label="Actions">
              <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary">
                Export
              </button>
              <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary">
                Share
              </button>
              <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary">
                Archive
              </button>
            </div>
          }
          dontCaption="Don't use a button group for independent actions that can all be taken at once."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Keep labels short and parallel"
        lead={
          <p>
            Each segment should use the same grammatical structure — all nouns or all verbs.
            Users scan segments quickly; inconsistent phrasing slows comprehension.
          </p>
        }
      >
        <DoDontPair
          doPreview={<ButtonGroupSpecimen labels={["List", "Graph", "Timeline"]} />}
          doCaption="Use concise, parallel labels that describe each view mode."
          dontPreview={<ButtonGroupSpecimen labels={["List view", "Show graph", "Timeline mode"]} />}
          dontCaption="Don't mix verb and noun phrasing across segments."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Limit group size to five segments"
        lead={
          <p>
            More than five options become hard to scan on smaller screens. If you need more
            choices, consider a select dropdown or tab navigation instead.
          </p>
        }
      >
        <DoDontPair
          doPreview={<ButtonGroupSpecimen labels={["All", "Active", "Pending"]} />}
          doCaption="Keep groups between 2 and 5 segments for scannability."
          dontPreview={
            <ButtonGroupSpecimen
              labels={["All", "Active", "Pending", "Suspended", "Closed", "Review"]}
              selectedIndex={0}
            />
          }
          dontCaption="Don't exceed five segments. Overflow forces truncation or wrapping."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Know when to use Button Group, Segmented Control, or Tabs"
        lead={
          <p>
            All three present options in a row, but they serve different purposes. Button Group
            composes full <code>tds-btn</code> instances and supports mixed variants (secondary,
            danger, icon-only). Segmented Control is a single-track toggle for compact filters.
            Tabs reveal distinct content panels below the selection.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ButtonGroupSpecimen labels={["Approve", "Reject", "Escalate"]} selectedIndex={-1} />
          }
          doCaption="Use Button Group when options need distinct button variants or icon-only members."
          dontPreview={
            <ButtonGroupSpecimen labels={["Day", "Week", "Month"]} selectedIndex={1} />
          }
          dontCaption="Don't use Button Group for simple view-mode toggles. Segmented Control is more compact."
        />
      </GuidelineSection>
    </div>
  );
}

function SegmentedControlSpecimen({
  labels,
  selectedIndex = 0,
  size,
  iconOnly = false,
}: {
  labels: string[];
  selectedIndex?: number;
  size?: "sm";
  iconOnly?: boolean;
}) {
  const cls = [
    "tds-segmented-control",
    size === "sm" ? "tds-segmented-control--sm" : "",
    iconOnly ? "tds-segmented-control--icon-only" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} role="group" aria-label="View mode">
      {labels.map((label, index) => (
        <button
          key={label}
          type="button"
          className={`tds-segmented-control__item${
            index === selectedIndex ? " tds-segmented-control__item--selected" : ""
          }`}
          aria-pressed={index === selectedIndex}
          aria-label={iconOnly ? label : undefined}
        >
          {!iconOnly && <span className="tds-segmented-control__label">{label}</span>}
          {iconOnly && (
            <span className="tds-segmented-control__icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export function SegmentedControlGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use for compact, mutually exclusive choices"
        lead={
          <p>
            SegmentedControl is the neutral-track variant for picking one related option — view
            modes, date ranges, sort direction. Selection applies immediately without a separate
            submit action.
          </p>
        }
      >
        <DoDontPair
          doPreview={<SegmentedControlSpecimen labels={["Day", "Week", "Month"]} selectedIndex={1} />}
          doCaption="Group 2–6 closely related options with one segment clearly selected."
          dontPreview={
            <div className="tds-button-group" role="group" aria-label="Actions">
              <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary">
                Export
              </button>
              <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary">
                Share
              </button>
            </div>
          }
          dontCaption="Don't use SegmentedControl for independent actions. Use ButtonGroup or separate buttons instead."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Limit to six segments maximum"
        lead={
          <p>
            The shared track becomes too crowded beyond six options, especially on smaller
            screens. If you need more choices, switch to a select dropdown, tab navigation,
            or filter chips.
          </p>
        }
      >
        <DoDontPair
          doPreview={<SegmentedControlSpecimen labels={["Day", "Week", "Month", "Year"]} />}
          doCaption="Keep the segment count between 2 and 6 for the track to remain readable."
          dontPreview={
            <SegmentedControlSpecimen
              labels={["1H", "4H", "1D", "1W", "1M", "3M", "1Y", "All"]}
              selectedIndex={2}
            />
          }
          dontCaption="Don't exceed six segments. The track compresses and labels truncate on smaller viewports."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Label icon-only segments individually"
        lead={
          <p>
            Icon-only mode (<code>.tds-segmented-control--icon-only</code>) hides visible text.
            Each segment button needs its own <code>aria-label</code> so screen reader users know
            which view or layout is selected.
          </p>
        }
      >
        <DoDontPair
          doPreview={<SegmentedControlSpecimen labels={["List", "Grid", "Chart"]} iconOnly />}
          doCaption="Set aria-label on every icon-only segment (e.g. aria-label='Grid')."
          dontPreview={
            <div className="tds-segmented-control tds-segmented-control--icon-only" role="group" aria-label="Layout">
              <button type="button" className="tds-segmented-control__item tds-segmented-control__item--selected" aria-pressed="true">
                <span className="tds-segmented-control__icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </div>
          }
          dontCaption="Don't omit aria-label on icon-only segments. Icons alone aren't descriptive."
        />
      </GuidelineSection>
    </div>
  );
}

export function SpinnerGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Size the spinner to its container"
        lead={
          <p>
            Match spinner size to the component it lives inside. Use xs inside icon buttons and
            sm inside standard buttons. Standalone page-level loading uses md or larger.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <PreviewRow>
              <button type="button" className="tds-icon-btn tds-icon-btn--md tds-icon-btn--primary tds-icon-btn--loading" aria-busy="true" aria-label="Loading">
                <span className="tds-spinner tds-spinner--xs" aria-hidden="true" />
              </button>
              <button type="button" className="tds-btn tds-btn--md tds-btn--primary tds-btn--loading" aria-busy="true">
                <span className="tds-spinner tds-spinner--sm" aria-hidden="true" />
                Submitting…
              </button>
            </PreviewRow>
          }
          doCaption="Use xs in icon buttons and sm in text buttons so the spinner fits the hit area."
          dontPreview={
            <PreviewRow>
              <button type="button" className="tds-icon-btn tds-icon-btn--md tds-icon-btn--loading" aria-busy="true" aria-label="Loading">
                <span className="tds-spinner tds-spinner--lg" aria-hidden="true" />
              </button>
            </PreviewRow>
          }
          dontCaption="Don't use an oversized spinner inside a compact control. It overflows the container."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Announce loading to assistive technology"
        lead={
          <p>
            Decorative spinners inside buttons use <code>aria-hidden="true"</code> because the
            parent communicates state. Standalone spinners need <code>role="status"</code> and
            an accessible label.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <span className="tds-spinner tds-spinner--md" role="status" aria-label="Loading verification results" />
          }
          doCaption="Add role='status' and aria-label when the spinner is the only loading indicator."
          dontPreview={
            <span className="tds-spinner tds-spinner--md" aria-hidden="true" />
          }
          dontCaption="Don't leave a standalone spinner without an accessible name. Users won't know content is loading."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Pair with contextual loading copy when possible"
        lead={
          <p>
            For page-level or section-level waits — like fetching KYB results — combine a
            spinner with a short label so users know what's happening.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-spinner-block tds-spinner-block--md">
              <span className="tds-spinner tds-spinner--md" aria-hidden="true" />
              <span className="tds-spinner-block__label">Loading verification results…</span>
            </div>
          }
          doCaption="Use .tds-spinner-block with descriptive copy for waits longer than a few seconds."
          dontPreview={
            <span className="tds-spinner tds-spinner--md" role="status" aria-label="Loading" />
          }
          dontCaption="Don't show a spinner alone for long operations without explaining what's loading."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Use skeletons when the layout shape is known"
        lead={
          <p>
            Spinners work for unknown or variable-shaped content. When you know the layout in
            advance (a card grid, a data table, a profile header), use skeleton placeholders
            instead. Skeletons reduce perceived wait time because users see the page taking shape.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 200 }}>
              <div style={{ height: 14, width: "70%", borderRadius: 4, background: "var(--border-subtle)", opacity: 0.5 }} />
              <div style={{ height: 14, width: "100%", borderRadius: 4, background: "var(--border-subtle)", opacity: 0.35 }} />
              <div style={{ height: 14, width: "85%", borderRadius: 4, background: "var(--border-subtle)", opacity: 0.2 }} />
            </div>
          }
          doCaption="Use skeleton lines when loading a table, card, or list with a predictable structure."
          dontPreview={
            <div style={{ display: "flex", justifyContent: "center", padding: 16 }}>
              <span className="tds-spinner tds-spinner--md" role="status" aria-label="Loading business list" />
            </div>
          }
          dontCaption="Don't use a centered spinner for structured content. It gives no hint of what's coming."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Delay short spinners, explain long ones"
        lead={
          <p>
            Show a spinner only after 300ms of loading to avoid flashing on fast connections.
            For waits over 5 seconds, add progress text explaining what's happening. Immediate
            spinners on sub-second loads feel janky.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-spinner-block tds-spinner-block--md">
              <span className="tds-spinner tds-spinner--md" aria-hidden="true" />
              <span className="tds-spinner-block__label">Verifying business details (2 of 4)...</span>
            </div>
          }
          doCaption="Add progress context for long waits and delay spinner display by 300ms for short loads."
          dontPreview={
            <span className="tds-spinner tds-spinner--sm" role="status" aria-label="Loading" />
          }
          dontCaption="Don't flash a spinner for loads under 300ms. The flicker is worse than a brief pause."
        />
      </GuidelineSection>
    </div>
  );
}

function SwitchSpecimen({
  label,
  checked = false,
  size = "md",
  disabled = false,
}: {
  label: string;
  checked?: boolean;
  size?: "md" | "sm";
  disabled?: boolean;
}) {
  return (
    <label className={`tds-switch${disabled ? " tds-switch--disabled" : ""}`}>
      <span className="tds-switch__label-group">{label}</span>
      <div
        className={[
          "tds-switch__track",
          `tds-switch__track--${size}`,
          checked ? "tds-switch__track--on" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled ? "true" : undefined}
      >
        <span className="tds-switch__indicator" aria-hidden="true" />
        <span className="tds-switch__handle" aria-hidden="true" />
      </div>
    </label>
  );
}

export function SwitchGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use switches for immediate on/off settings"
        lead={
          <p>
            Switches toggle a single setting that takes effect immediately — like enabling
            automated re-verification or showing advanced business fields. Don't use them for
            form submissions that require a Save action.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <SwitchSpecimen label="Enable ongoing monitoring" checked />
          }
          doCaption="Use a switch when toggling the setting applies instantly."
          dontPreview={
            <CheckboxSpecimen label="Accept terms and submit verification" />
          }
          dontCaption="Don't use a switch for consent or commit-to-submit patterns. Use a checkbox instead."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Write labels that state what's being toggled"
        lead={
          <p>
            The label should describe the setting in its ON state. Users shouldn't have to
            guess whether ON means enabled or disabled.
          </p>
        }
      >
        <DoDontPair
          doPreview={<SwitchSpecimen label="Send email notifications" checked />}
          doCaption="Label the setting positively — what happens when the switch is on."
          dontPreview={<SwitchSpecimen label="Notifications" />}
          dontCaption="Don't use vague nouns alone. Notifications of what? Enabled or disabled?"
        />
      </GuidelineSection>

      <GuidelineSection
        title="Match switch size to layout density"
        lead={
          <p>
            Medium switches fit standard form rows and settings panels. Small switches work in
            compact table toolbars or filter rows where vertical space is limited.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SwitchSpecimen label="Include inactive businesses" size="md" />
              <SwitchSpecimen label="Show only flagged" size="sm" />
            </div>
          }
          doCaption="Use md in forms and sm in dense settings rows or table headers."
          dontPreview={<SwitchSpecimen label="Include inactive businesses" size="sm" />}
          dontCaption="Don't default to small in full-width forms. The smaller hit target is harder to tap."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Switch for instant effect, checkbox for batched submission"
        lead={
          <p>
            A switch takes effect the moment the user toggles it. A checkbox is part of a form
            that requires a separate submit action. Mixing them up breaks user expectations about
            when changes are saved.
          </p>
        }
      >
        <DoDontPair
          doPreview={<SwitchSpecimen label="Enable ongoing monitoring" checked />}
          doCaption="Use a switch for settings that apply immediately without a save button."
          dontPreview={
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SwitchSpecimen label="Include subsidiaries" />
              <SwitchSpecimen label="Include inactive entities" />
              <button type="button" className="tds-btn tds-btn--sm tds-btn--primary">
                Apply filters
              </button>
            </div>
          }
          dontCaption="Don't pair switches with a submit button. If changes need confirmation, use checkboxes."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Choose meaningful defaults"
        lead={
          <p>
            Default to OFF for opt-in features like email notifications or advanced monitoring.
            Default to ON for features users expect active by default, like verification
            auto-retry. The default state should match the majority use case.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SwitchSpecimen label="Auto-retry failed verifications" checked />
              <SwitchSpecimen label="Send weekly digest emails" />
            </div>
          }
          doCaption="Default ON for expected behavior, OFF for opt-in features."
          dontPreview={
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SwitchSpecimen label="Share data with third parties" checked />
              <SwitchSpecimen label="Enable marketing emails" checked />
            </div>
          }
          dontCaption="Don't default opt-in or data-sharing features to ON. This creates dark patterns."
        />
      </GuidelineSection>
    </div>
  );
}

function CheckboxSpecimen({
  label,
  checked = false,
  indeterminate = false,
  disabled = false,
}: {
  label: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: 14,
        color: disabled ? "var(--text-disabled)" : undefined,
      }}
    >
      <input
        type="checkbox"
        className="tds-checkbox"
        checked={checked}
        disabled={disabled}
        readOnly
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
      />
      {label}
    </label>
  );
}

export function CheckboxGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use checkboxes for multi-select and consent"
        lead={
          <p>
            Checkboxes let users select zero, one, or many options — filtering KYB results by
            status, selecting documents to download, or agreeing to terms before submission.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <CheckboxSpecimen label="Active" checked />
              <CheckboxSpecimen label="Pending review" />
              <CheckboxSpecimen label="Suspended" />
            </div>
          }
          doCaption="Use checkboxes when users can select multiple independent options."
          dontPreview={
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label className="tds-radio">
                <input type="radio" className="tds-radio__input" name="bad-example" readOnly />
                <span className="tds-radio__label">Active</span>
              </label>
              <label className="tds-radio">
                <input type="radio" className="tds-radio__input" name="bad-example" readOnly />
                <span className="tds-radio__label">Pending review</span>
              </label>
            </div>
          }
          dontCaption="Don't use radio buttons when multiple selections are allowed."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Use indeterminate for partial parent selection"
        lead={
          <p>
            When a parent checkbox controls a group and only some children are selected, set the
            parent to indeterminate. This is common in data tables with row selection.
          </p>
        }
      >
        <DoDontPair
          doPreview={<CheckboxSpecimen label="Select all businesses (3 of 10)" indeterminate />}
          doCaption="Set indeterminate on parent rows when child selection is partial."
          dontPreview={<CheckboxSpecimen label="Select all businesses (3 of 10)" />}
          dontCaption="Don't leave the parent unchecked when some children are selected. The state is misleading."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Keep checkbox labels specific and scannable"
        lead={
          <p>
            Each label should fully describe what checking the box does or selects. Avoid
            orphan checkboxes where the label doesn't explain the consequence.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <CheckboxSpecimen label="I confirm the business information is accurate" />
          }
          doCaption="Write labels that state the commitment or selection clearly."
          dontPreview={<CheckboxSpecimen label="Confirm" />}
          dontCaption="Don't use one-word labels for consent or high-impact selections."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Stack checkbox groups vertically"
        lead={
          <p>
            Vertical stacking with consistent spacing makes checkbox groups easier to scan.
            Horizontal layouts work for 2 or 3 short options but break down quickly on
            smaller screens and with longer labels.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <CheckboxSpecimen label="Government ID" checked />
              <CheckboxSpecimen label="Proof of address" checked />
              <CheckboxSpecimen label="Articles of incorporation" />
            </div>
          }
          doCaption="Stack checkboxes vertically with 8px gap for easy scanning."
          dontPreview={
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <CheckboxSpecimen label="Government ID" checked />
              <CheckboxSpecimen label="Proof of address" checked />
              <CheckboxSpecimen label="Articles of incorporation" />
            </div>
          }
          dontCaption="Don't lay checkboxes out horizontally when labels are long. They wrap unpredictably."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Validate required groups at the group level"
        lead={
          <p>
            When at least one checkbox must be selected (e.g., document types for verification),
            show the validation message on the group, not on individual checkboxes. Individual
            errors on multi-select groups confuse users about what's required.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div>
              <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                <legend style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
                  Required documents
                </legend>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <CheckboxSpecimen label="Government ID" />
                  <CheckboxSpecimen label="Proof of address" />
                </div>
                <p style={{ fontSize: 12, color: "var(--text-danger)", marginTop: 8 }}>
                  Select at least one document type
                </p>
              </fieldset>
            </div>
          }
          doCaption="Show one validation message below the group when at least one selection is required."
          dontPreview={
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div>
                <CheckboxSpecimen label="Government ID" />
                <p style={{ fontSize: 12, color: "var(--text-danger)", marginTop: 2, marginLeft: 24 }}>Required</p>
              </div>
              <div>
                <CheckboxSpecimen label="Proof of address" />
                <p style={{ fontSize: 12, color: "var(--text-danger)", marginTop: 2, marginLeft: 24 }}>Required</p>
              </div>
            </div>
          }
          dontCaption="Don't show individual required errors on each checkbox. Users think all must be checked."
        />
      </GuidelineSection>
    </div>
  );
}

function DismissSpecimen({ size = "md", disabled = false }: { size?: "sm" | "md" | "lg"; disabled?: boolean }) {
  return (
    <button
      type="button"
      className={`tds-dismiss tds-dismiss--${size}`}
      aria-label="Close verification panel"
      disabled={disabled}
    >
      {closeIcon}
    </button>
  );
}

export function DismissActionGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Place dismiss actions in predictable locations"
        lead={
          <p>
            Users expect close buttons in the top-right corner of modals, drawers, and
            dismissible panels. Keep placement consistent across verification flows so users
            don't hunt for the exit.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div
              style={{
                position: "relative",
                width: 280,
                padding: "12px 40px 12px 16px",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                background: "var(--surface-neutral-01)",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500 }}>Verification summary</span>
              <button
                type="button"
                className="tds-dismiss tds-dismiss--md"
                aria-label="Close verification summary"
                style={{ position: "absolute", top: 8, right: 8 }}
              >
                {closeIcon}
              </button>
            </div>
          }
          doCaption="Position the dismiss action in the top-right of the container it closes."
          dontPreview={
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <DismissSpecimen />
              <span style={{ fontSize: 14 }}>Verification summary</span>
            </div>
          }
          dontCaption="Don't place the close button away from the content it dismisses."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Use aria-label to name what's being closed"
        lead={
          <p>
            The X icon alone isn't descriptive. Include an <code>aria-label</code> that names
            the panel, dialog, or notification being dismissed.
          </p>
        }
      >
        <DoDontPair
          doPreview={<DismissSpecimen />}
          doCaption="Use aria-label='Close [panel name]' so screen reader users know what closes."
          dontPreview={
            <button type="button" className="tds-dismiss tds-dismiss--md">
              {closeIcon}
            </button>
          }
          dontCaption="Don't omit aria-label. The icon has no accessible name on its own."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Match dismiss size to the container"
        lead={
          <p>
            Small dismiss buttons fit compact toasts and inline banners. Medium is the default
            for modals and side panels. Large works in full-screen overlays.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <PreviewRow>
              <DismissSpecimen size="sm" />
              <DismissSpecimen size="md" />
              <DismissSpecimen size="lg" />
            </PreviewRow>
          }
          doCaption="Scale the dismiss button to match the container's density and touch target needs."
          dontPreview={
            <PreviewRow>
              <DismissSpecimen size="lg" />
              <span className="tds-guideline-annotation">(inside a compact toast)</span>
            </PreviewRow>
          }
          dontCaption="Don't use a large dismiss button in a small container. It dominates the layout."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Support Escape key and return focus"
        lead={
          <p>
            Every container with a dismiss button must also close on <code>Escape</code>.
            After closing, return keyboard focus to the element that opened the container.
            Without this, keyboard users lose their place in the page.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div
              style={{
                position: "relative",
                width: 280,
                padding: "12px 40px 12px 16px",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                background: "var(--surface-neutral-01)",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500 }}>Business details</span>
              <span style={{ fontSize: 12, display: "block", marginTop: 4, color: "var(--text-secondary)" }}>
                Escape to close, focus returns to trigger
              </span>
              <button
                type="button"
                className="tds-dismiss tds-dismiss--md"
                aria-label="Close business details"
                style={{ position: "absolute", top: 8, right: 8 }}
              >
                {closeIcon}
              </button>
            </div>
          }
          doCaption="Close on Escape and return focus to the trigger element."
          dontPreview={
            <div
              style={{
                position: "relative",
                width: 280,
                padding: "12px 40px 12px 16px",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                background: "var(--surface-neutral-01)",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500 }}>Business details</span>
              <span style={{ fontSize: 12, display: "block", marginTop: 4, color: "var(--text-secondary)" }}>
                Escape does nothing, focus lost after close
              </span>
              <button
                type="button"
                className="tds-dismiss tds-dismiss--md"
                aria-label="Close"
                style={{ position: "absolute", top: 8, right: 8 }}
              >
                {closeIcon}
              </button>
            </div>
          }
          dontCaption="Don't ignore Escape key or drop focus to the top of the page after dismissing."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Intercept dismiss when there are unsaved changes"
        lead={
          <p>
            Dismiss closes the container and discards its content. If the container holds a form
            with unsaved edits, intercept the dismiss action with a confirmation dialog. Silent
            data loss is one of the most frustrating user experiences.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div
              style={{
                padding: 16,
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                background: "var(--surface-neutral-01)",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              <p style={{ fontWeight: 500, marginBottom: 8 }}>Discard unsaved changes?</p>
              <div className="tds-guideline-button-row" style={{ justifyContent: "center" }}>
                <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary">Keep editing</button>
                <button type="button" className="tds-btn tds-btn--sm tds-btn--danger">Discard</button>
              </div>
            </div>
          }
          doCaption="Show a confirmation dialog when dismissing would discard unsaved form data."
          dontPreview={
            <div
              style={{
                position: "relative",
                width: 280,
                padding: "12px 40px 12px 16px",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                background: "var(--surface-neutral-01)",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500 }}>Edit business</span>
              <span style={{ fontSize: 12, display: "block", marginTop: 4, color: "var(--text-secondary)" }}>
                (form with unsaved edits)
              </span>
              <button
                type="button"
                className="tds-dismiss tds-dismiss--md"
                aria-label="Close"
                style={{ position: "absolute", top: 8, right: 8 }}
              >
                {closeIcon}
              </button>
            </div>
          }
          dontCaption="Don't silently discard form data on dismiss. Users lose work without warning."
        />
      </GuidelineSection>
    </div>
  );
}
