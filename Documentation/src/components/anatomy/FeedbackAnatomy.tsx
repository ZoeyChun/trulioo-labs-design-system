import { AnatomyPinLayer } from "./AnatomyPinLayer";
import { ComponentAnatomyCard } from "./ComponentAnatomyCard";

export function TooltipAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Floating label with body text and optional caret pointing to the trigger."
      api=".tds-tooltip · __body · __caret"
      tag="Figma 1054:18565"
      parts={[
        { number: 1, name: "Tooltip container", api: ".tds-tooltip", detail: "Positions body and caret. Theme and placement modifiers on this element." },
        { number: 2, name: "Body", api: ".tds-tooltip__body", detail: "Padded surface containing tooltip text or rich content." },
        { number: 3, name: "Caret", api: ".tds-tooltip__caret", detail: "Directional pointer — mark aria-hidden='true'." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-tooltip", anchor: { y: 0.35 } },
          { number: 2, direction: "top", selector: ".tds-tooltip__body" },
          { number: 3, direction: "bottom", selector: ".tds-tooltip__caret" },
        ]}
        className="ds-anatomy-diagram--inline"
      >
        <div className="tds-tooltip tds-tooltip--dark tds-tooltip--bottom" role="tooltip">
          <div className="tds-tooltip__body">
            <p className="tds-tooltip__text">Download report</p>
          </div>
          <span className="tds-tooltip__caret" aria-hidden="true" />
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function AnnouncementAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Inline or stacked banner with semantic variant, title, message, and optional dismiss."
      api=".tds-announcement · __title · __dismiss"
      tag="Figma 866:13118"
      parts={[
        { number: 1, name: "Container", api: ".tds-announcement", detail: "Full-width banner with semantic background variant." },
        { number: 2, name: "Title", api: ".tds-announcement__title", detail: "Primary announcement headline." },
        { number: 3, name: "Dismiss", api: ".tds-announcement__dismiss", detail: "Optional close control — needs aria-label." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-announcement", anchor: { y: 0.4 } },
          { number: 2, direction: "top", selector: ".tds-announcement__title" },
          { number: 3, direction: "right", selector: ".tds-announcement__dismiss", anchor: { y: 0.5 } },
        ]}
      >
        <div className="tds-announcement tds-announcement--info" style={{ maxWidth: 420 }}>
          <div className="tds-announcement__content">
            <p className="tds-announcement__title">New verification rules</p>
            <p className="tds-announcement__message">Review updated requirements before submitting.</p>
          </div>
          <button type="button" className="tds-announcement__dismiss" aria-label="Dismiss announcement">
            ×
          </button>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}

export function DialogAnatomy() {
  return (
    <ComponentAnatomyCard
      desc="Modal surface with header, scrollable body, and action footer."
      api=".tds-dialog · __header · __body · __footer"
      tag="Figma 1654:27850"
      parts={[
        { number: 1, name: "Dialog root", api: ".tds-dialog", detail: "Fixed overlay with backdrop and positioned panel." },
        { number: 2, name: "Header", api: ".tds-dialog__header", detail: "Title row with optional badge and trailing actions." },
        { number: 3, name: "Body", api: ".tds-dialog__body", detail: "Scrollable content area." },
        { number: 4, name: "Footer", api: ".tds-dialog__footer", detail: "Primary, secondary, and optional tertiary actions." },
      ]}
    >
      <AnatomyPinLayer
        pins={[
          { number: 1, direction: "right", selector: ".tds-dialog__panel", anchor: { y: 0.3 } },
          { number: 2, direction: "top", selector: ".tds-dialog__header" },
          { number: 3, direction: "right", selector: ".tds-dialog__body", anchor: { y: 0.5 } },
          { number: 4, direction: "bottom", selector: ".tds-dialog__footer" },
        ]}
      >
        <div
          className="tds-dialog__panel"
          style={{ maxWidth: 360, border: "1px solid var(--border-subtle)", borderRadius: 8 }}
        >
          <div className="tds-dialog__header" style={{ padding: "12px 16px" }}>
            Confirm submission
          </div>
          <div className="tds-dialog__body" style={{ padding: "12px 16px" }}>
            Submit verification for Acme Corp?
          </div>
          <div className="tds-dialog__footer" style={{ padding: 12 }}>
            <button type="button" className="tds-btn tds-btn--sm tds-btn--primary">
              Submit
            </button>
          </div>
        </div>
      </AnatomyPinLayer>
    </ComponentAnatomyCard>
  );
}
