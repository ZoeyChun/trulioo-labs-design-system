import { AnatomyPinLayer } from "./AnatomyPinLayer";
import { AnatomyTarget } from "./AnatomyTarget";
import { ComponentAnatomyCard } from "./ComponentAnatomyCard";

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

export function IconButtonAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Icon-only button with a single 16×16 icon slot. Loading replaces the icon with .tds-spinner--xs."
      api=".tds-icon-btn · __icon · .tds-spinner--xs"
      tag="Figma 1371:22653"
      parts={[
        {
          number: 1,
          name: "Icon slot",
          api: ".tds-icon-btn__icon",
          detail: "Wraps a 16×16 SVG. Hidden during loading state.",
        },
        {
          number: 2,
          name: "Spinner",
          api: ".tds-spinner--xs",
          detail: "Replaces the icon when .tds-icon-btn--loading is applied.",
        },
      ]}
    >
      <div className="ds-anatomy-diagram">
        <button type="button" className="tds-icon-btn tds-icon-btn--md tds-icon-btn--secondary" aria-label="Example">
          <AnatomyTarget number={1} placement="bottom">
            <span className="tds-icon-btn__icon">{faceIcon}</span>
          </AnatomyTarget>
        </button>
      </div>
    </ComponentAnatomyCard>
  );
}

export function ButtonGroupAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Horizontal container that groups 2–5 Button or IconButton children into a segmented control."
      api=".tds-button-group"
      tag="Figma 1952:33320"
      parts={[
        {
          number: 1,
          name: "Group container",
          api: ".tds-button-group",
          detail: "Flex row with shared border-radius. Apply role='group' and aria-label.",
        },
        {
          number: 2,
          name: "Segment button",
          api: ".tds-btn · .tds-icon-btn",
          detail: "Child buttons. Selected segment uses .tds-btn--invisible or .tds-icon-btn--invisible.",
        },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "top", selector: ".tds-button-group" },
          { number: 2, direction: "bottom", selector: ".tds-button-group .tds-btn:first-child" },
        ]}
      >
        <div className="tds-button-group" role="group" aria-label="View mode">
          <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary">
            Summary
          </button>
          <button type="button" className="tds-btn tds-btn--sm tds-btn--invisible">
            Owners
          </button>
          <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary">
            Documents
          </button>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function SpinnerAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Animated loading indicator. Five size tokens from xs to xl. Optional label block for standalone page waits."
      api=".tds-spinner--{xs|sm|md|lg|xl} · .tds-spinner-block"
      tag="Figma 2092:18230"
      parts={[
        {
          number: 1,
          name: "Spinner ring",
          api: ".tds-spinner",
          detail: "Rotating border ring. Size controlled by --xs through --xl modifiers.",
        },
        {
          number: 2,
          name: "Label",
          api: ".tds-spinner-block__label",
          detail: "Optional text below the spinner in .tds-spinner-block layouts.",
        },
      ]}
    >
      <div className="ds-anatomy-diagram">
        <div className="tds-spinner-block tds-spinner-block--md">
          <AnatomyTarget number={1} placement="top">
            <span className="tds-spinner tds-spinner--md" aria-hidden="true" />
          </AnatomyTarget>
          <AnatomyTarget number={2} placement="bottom">
            <span className="tds-spinner-block__label">Loading…</span>
          </AnatomyTarget>
        </div>
      </div>
    </ComponentAnatomyCard>
  );
}

const buttonMenuPins = [
  { number: 1, direction: "top" as const, selector: ".tds-button-menu .tds-btn" },
  { number: 2, direction: "right" as const, selector: ".tds-dropdown-panel" },
  { number: 3, direction: "top" as const, selector: ".tds-action-list-item" },
];

export function ButtonMenuAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Button trigger paired with a dropdown panel. The trigger opens an action list menu positioned 4px below."
      api=".tds-button-menu · .tds-btn · .tds-dropdown-panel"
      tag="Figma 832:13390"
      parts={[
        {
          number: 1,
          name: "Trigger button",
          api: ".tds-btn",
          detail: "Standard button that toggles the menu. Include aria-expanded and aria-haspopup.",
        },
        {
          number: 2,
          name: "Dropdown panel",
          api: ".tds-dropdown-panel",
          detail: "Floating menu container with role='menu'. Holds action list items.",
        },
        {
          number: 3,
          name: "Menu item",
          api: ".tds-action-list-item",
          detail: "Individual action inside the panel. Each item has role='menuitem'.",
        },
      ]}
    >
      <AnatomyPinLayer pins={buttonMenuPins}>
        <div className="tds-button-menu tds-guideline-button-menu">
          <button type="button" className="tds-btn tds-btn--md tds-btn--secondary">
            More actions
          </button>
          <div className="tds-dropdown-panel" role="menu">
            <button type="button" className="tds-action-list-item" role="menuitem">
              <span className="tds-action-list-item__label">Export report</span>
            </button>
            <button type="button" className="tds-action-list-item" role="menuitem">
              <span className="tds-action-list-item__label">Share link</span>
            </button>
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const switchPins = [
  { number: 1, direction: "top" as const, selector: ".tds-switch__label-group" },
  { number: 2, direction: "right" as const, selector: ".tds-switch__track" },
  { number: 3, direction: "top" as const, selector: ".tds-switch__indicator" },
  { number: 4, direction: "bottom" as const, selector: ".tds-switch__handle" },
];

export function SwitchAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Toggle control with optional label group, track, state indicator, and handle pill."
      api=".tds-switch · __label-group · __track--{md|sm} · __track--on"
      tag="Figma 96:3234"
      parts={[
        {
          number: 1,
          name: "Label group",
          api: ".tds-switch__label-group",
          detail: "Text label and optional icon describing the setting.",
        },
        {
          number: 2,
          name: "Track",
          api: ".tds-switch__track",
          detail: "Rounded track with role='switch' and aria-checked. Size via --md or --sm.",
        },
        {
          number: 3,
          name: "Indicator",
          api: ".tds-switch__indicator",
          detail: "Left half of the track. Shows filled bar when ON.",
        },
        {
          number: 4,
          name: "Handle",
          api: ".tds-switch__handle",
          detail: "Draggable pill that slides between OFF (left) and ON (right) positions.",
        },
      ]}
    >
      <AnatomyPinLayer pins={switchPins}>
        <label className="tds-switch">
          <span className="tds-switch__label-group">Enable monitoring</span>
          <div
            className="tds-switch__track tds-switch__track--md tds-switch__track--on"
            role="switch"
            aria-checked="true"
          >
            <span className="tds-switch__indicator" aria-hidden="true" />
            <span className="tds-switch__handle" aria-hidden="true" />
          </div>
        </label>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const checkboxPins = [
  { number: 1, direction: "top" as const, selector: ".tds-checkbox" },
  { number: 2, direction: "bottom" as const, selector: "[data-anatomy='checkbox-label']" },
];

export function CheckboxAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Native checkbox input styled with TDS tokens. Supports checked, unchecked, indeterminate, and disabled states."
      api=".tds-checkbox"
      tag="Figma 299:12998"
      parts={[
        {
          number: 1,
          name: "Checkbox input",
          api: ".tds-checkbox",
          detail: "Native <input type='checkbox'>. Checked and indeterminate states use CSS pseudo-elements.",
        },
        {
          number: 2,
          name: "Label",
          api: "<label>",
          detail: "Wraps the checkbox and descriptive text. Clicking the label toggles the input.",
        },
      ]}
    >
      <AnatomyPinLayer pins={checkboxPins}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <input type="checkbox" className="tds-checkbox" checked readOnly />
          <span data-anatomy="checkbox-label">Include inactive businesses</span>
        </label>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function DismissActionAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Icon-only close button for modals, drawers, and dismissible panels. Three size tokens."
      api=".tds-dismiss--{sm|md|lg}"
      tag="Figma 331:8149"
      parts={[
        {
          number: 1,
          name: "Dismiss button",
          api: ".tds-dismiss",
          detail: "Transparent icon button. Requires aria-label naming what's being closed.",
        },
        {
          number: 2,
          name: "Close icon",
          api: "<svg>",
          detail: "16×16 X icon. Decorative — the aria-label provides the accessible name.",
        },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "top", selector: ".tds-dismiss" },
          { number: 2, direction: "bottom", selector: ".tds-dismiss .icon" },
        ]}
      >
        <button type="button" className="tds-dismiss tds-dismiss--md" aria-label="Close panel">
          {closeIcon}
        </button>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

const segmentedControlPins = [
  { number: 1, direction: "right" as const, selector: ".tds-segmented-control" },
  { number: 2, direction: "top" as const, selector: ".tds-segmented-control__item:first-child" },
  { number: 3, direction: "bottom" as const, selector: ".tds-segmented-control__item:first-child .tds-segmented-control__label" },
];

export function SegmentedControlAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Neutral track grouping 2–6 segment buttons. Selected item lifts with a white surface and shadow."
      api=".tds-segmented-control · __item · __label · __icon"
      tag="Figma 3367:27333"
      parts={[
        {
          number: 1,
          name: "Track container",
          api: ".tds-segmented-control",
          detail: "Inline-flex row on neutral-03 surface. Apply role='group' and aria-label.",
        },
        {
          number: 2,
          name: "Segment item",
          api: ".tds-segmented-control__item",
          detail: "Button segment. Selected via --selected or aria-pressed='true'.",
        },
        {
          number: 3,
          name: "Label",
          api: ".tds-segmented-control__label",
          detail: "Visible text for text mode segments.",
        },
      ]}
    >
      <AnatomyPinLayer pins={segmentedControlPins}>
        <div className="tds-segmented-control" role="group" aria-label="Date range">
          <button type="button" className="tds-segmented-control__item" aria-pressed={false}>
            <span className="tds-segmented-control__label">Day</span>
          </button>
          <button
            type="button"
            className="tds-segmented-control__item tds-segmented-control__item--selected"
            aria-pressed="true"
          >
            <span className="tds-segmented-control__label">Week</span>
          </button>
          <button type="button" className="tds-segmented-control__item" aria-pressed={false}>
            <span className="tds-segmented-control__label">Month</span>
          </button>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}
