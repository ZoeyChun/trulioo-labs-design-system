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

export function ButtonAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Required label text with optional leading visual, counter, trailing visual, and dropdown caret. Loading replaces trailing slots with a spinner."
      api=".tds-btn · __leading-icon · __counter · __trailing-icon · .tds-caret · .tds-spinner--sm"
      tag="Figma 96:2225"
      parts={[
        {
          number: 1,
          name: "Leading visual",
          api: ".tds-btn__leading-icon",
          detail: "Optional icon before the label.",
        },
        {
          number: 2,
          name: "Label",
          api: "text",
          detail: "Verb-led action text. Always required.",
        },
        {
          number: 3,
          name: "Counter",
          api: ".tds-btn__counter",
          detail: "Optional numeric badge after the label.",
        },
        {
          number: 4,
          name: "Trailing visual",
          api: ".tds-btn__trailing-icon",
          detail: "Optional icon after the label or counter.",
        },
        {
          number: 5,
          name: "Dropdown",
          api: ".tds-caret",
          detail: "Optional chevron when the button opens a menu.",
        },
        {
          name: "Spinner",
          api: ".tds-spinner--sm",
          detail: "Shown with .tds-btn--loading; replaces trailing slots.",
        },
      ]}
    >
      <div className="ds-anatomy-diagram">
        <button type="button" className="tds-btn tds-btn--lg tds-btn--secondary">
          <AnatomyTarget number={1} placement="bottom">
            <span className="tds-btn__leading-icon">{faceIcon}</span>
          </AnatomyTarget>
          <AnatomyTarget number={2} placement="top">
            <span className="ds-anatomy-target__label">Button</span>
          </AnatomyTarget>
          <AnatomyTarget number={3} placement="top">
            <span className="tds-btn__counter">20</span>
          </AnatomyTarget>
          <AnatomyTarget number={4} placement="bottom">
            <span className="tds-btn__trailing-icon">{faceIcon}</span>
          </AnatomyTarget>
          <AnatomyTarget number={5} placement="bottom">
            <span className="tds-caret tds-caret--default" aria-hidden="true">
              <svg viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.073724 3.46966L3.4702 0.0732225C3.56783 -0.0244075 3.72612 -0.0244075 3.82375 0.0732225L7.22014 3.46966C7.37764 3.62716 7.26614 3.89644 7.04334 3.89644H0.250504C0.0277738 3.89644 -0.083766 3.62715 0.073724 3.46966Z"
                  fill="currentColor"
                />
                <path
                  d="M0.073724 7.32322L3.4702 10.7197C3.56783 10.8173 3.72612 10.8173 3.82375 10.7197L7.22014 7.32322C7.37764 7.16572 7.26614 6.89644 7.04334 6.89644H0.250504C0.0277738 6.89644 -0.083766 7.16573 0.073724 7.32322Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </AnatomyTarget>
        </button>
      </div>
    </ComponentAnatomyCard>
  );
}
