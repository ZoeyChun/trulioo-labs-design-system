import { DoDontPair, GuidelineSection } from "./GuidelineDoDont";

export function TooltipGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Keep tooltip copy short"
        lead={
          <p>
            Tooltips supplement visible UI — they don't replace labels. Limit text to one or two
            lines and match the trigger's <code>aria-label</code> when both exist.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-tooltip tds-tooltip--dark tds-tooltip--bottom" role="tooltip">
              <div className="tds-tooltip__body">
                <p className="tds-tooltip__text">Download report</p>
              </div>
              <span className="tds-tooltip__caret" aria-hidden="true" />
            </div>
          }
          doCaption="Use concise action text that mirrors the trigger label."
          dontPreview={
            <div className="tds-tooltip tds-tooltip--dark tds-tooltip--bottom" role="tooltip">
              <div className="tds-tooltip__body">
                <p className="tds-tooltip__text">
                  Click here to download the full verification report as a PDF file
                </p>
              </div>
              <span className="tds-tooltip__caret" aria-hidden="true" />
            </div>
          }
          dontCaption="Don't use tooltips for long explanations — use a dialog or help link."
        />
      </GuidelineSection>
    </div>
  );
}

export function AnnouncementGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Match variant to message severity"
        lead={
          <p>
            Use semantic variants — warning, error, info, success, neutral — so users recognize
            urgency at a glance. Keep titles scannable and supporting copy in the message slot.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-announcement tds-announcement--warning">
              <p className="tds-announcement__title">Verification incomplete</p>
            </div>
          }
          doCaption="Pick the variant that matches the situation, not decorative color."
          dontPreview={
            <div className="tds-announcement tds-announcement--success">
              <p className="tds-announcement__title">Critical error — action required</p>
            </div>
          }
          dontCaption="Don't use success styling for errors or warnings."
        />
      </GuidelineSection>
    </div>
  );
}

export function DialogGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Use dialogs for focused tasks"
        lead={
          <p>
            Dialogs interrupt the page for confirmations, forms, or detail views. Keep one primary
            action in the footer and provide a clear dismiss path.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div
              style={{
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                overflow: "hidden",
                maxWidth: 320,
              }}
            >
              <div className="tds-dialog__header" style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)" }}>
                Discard changes?
              </div>
              <div className="tds-dialog__footer" style={{ padding: 12, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <button type="button" className="tds-btn tds-btn--sm tds-btn--secondary">
                  Keep editing
                </button>
                <button type="button" className="tds-btn tds-btn--sm tds-btn--danger">
                  Discard
                </button>
              </div>
            </div>
          }
          doCaption="Title states the decision; footer holds cancel and confirm actions."
          dontPreview={
            <div style={{ maxWidth: 320, fontSize: 14 }}>
              Are you sure? Yes / No / Maybe / Learn more
            </div>
          }
          dontCaption="Don't overload dialogs with too many competing actions."
        />
      </GuidelineSection>
    </div>
  );
}
