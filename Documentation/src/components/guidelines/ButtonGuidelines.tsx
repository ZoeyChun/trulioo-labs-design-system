import { DoDontPair, GuidelineSection } from "./GuidelineDoDont";

function ButtonSpecimen({
  label,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  leadingIcon = false,
  trailingIcon = false,
}: {
  label: string;
  variant?: "primary" | "secondary" | "danger" | "invisible";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  leadingIcon?: boolean;
  trailingIcon?: boolean;
}) {
  const cls = [
    "tds-btn",
    `tds-btn--${size}`,
    `tds-btn--${variant}`,
    disabled ? "tds-btn--inactive" : "",
    loading ? "tds-btn--loading" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={cls} disabled={disabled}>
      {loading && <span className="tds-spinner tds-spinner--sm" />}
      {leadingIcon && (
        <svg className="tds-btn__leading-visual" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm1 10H7V7h2v4Zm0-5H7V4h2v2Z" />
        </svg>
      )}
      {label}
      {trailingIcon && (
        <svg className="tds-btn__trailing-visual" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function ButtonRow({ children }: { children: React.ReactNode }) {
  return <div className="tds-guideline-button-row">{children}</div>;
}

export function ButtonGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Choose the right variant for the action's weight"
        lead={
          <p>
            Each variant signals a different level of importance. A page should have one
            primary action, supported by secondary or invisible buttons for less critical
            paths. Reserve danger for destructive operations.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ButtonRow>
              <ButtonSpecimen label="Submit verification" variant="primary" />
              <ButtonSpecimen label="Save draft" variant="secondary" />
            </ButtonRow>
          }
          doCaption="Pair one primary button with secondary buttons so the main action stands out."
          dontPreview={
            <ButtonRow>
              <ButtonSpecimen label="Submit verification" variant="primary" />
              <ButtonSpecimen label="Save draft" variant="primary" />
            </ButtonRow>
          }
          dontCaption="Don't use two primary buttons side by side. Competing emphasis confuses priority."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Write labels that describe the outcome"
        lead={
          <p>
            Start with a verb and include the object when it adds clarity. Users scan buttons
            quickly; the label should answer &ldquo;what happens when I click this?&rdquo;
            without reading surrounding text.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ButtonRow>
              <ButtonSpecimen label="Verify business" variant="primary" />
              <ButtonSpecimen label="Download report" variant="secondary" />
            </ButtonRow>
          }
          doCaption="Use verb-led labels that name the action and its object."
          dontPreview={
            <ButtonRow>
              <ButtonSpecimen label="Submit" variant="primary" />
              <ButtonSpecimen label="Click here" variant="secondary" />
            </ButtonRow>
          }
          dontCaption="Don't use vague labels. Submit what? Click here for what?"
        />
      </GuidelineSection>

      <GuidelineSection
        title="Use danger buttons only for destructive actions"
        lead={
          <p>
            The danger variant warns users that the action is irreversible or high-impact.
            Pair it with a confirmation step (dialog or inline confirmation) for operations
            like deleting a business or revoking access.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ButtonRow>
              <ButtonSpecimen label="Remove business" variant="danger" />
              <ButtonSpecimen label="Cancel" variant="secondary" />
            </ButtonRow>
          }
          doCaption="Reserve danger for irreversible actions. Pair with a cancel option."
          dontPreview={
            <ButtonRow>
              <ButtonSpecimen label="Continue" variant="danger" />
            </ButtonRow>
          }
          dontCaption="Don't use danger styling for non-destructive actions. It creates false urgency."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Match button size to its context"
        lead={
          <p>
            Use large buttons for full-width form submissions and page-level CTAs. Medium
            is the default for toolbars and inline actions. Small works in tables, cards,
            and dense layouts where space is limited.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ButtonRow>
              <ButtonSpecimen label="Add owner" size="sm" variant="secondary" />
              <ButtonSpecimen label="Save changes" size="md" variant="primary" />
            </ButtonRow>
          }
          doCaption="Use small buttons in tight spaces (table rows, cards) and medium for standard actions."
          dontPreview={
            <ButtonRow>
              <ButtonSpecimen label="Add" size="lg" variant="secondary" />
              <ButtonSpecimen label="Ok" size="lg" variant="primary" />
            </ButtonRow>
          }
          dontCaption="Don't use large buttons with short, vague labels. The size amplifies the emptiness."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Show loading state for async actions"
        lead={
          <p>
            When a button triggers a network request or background process, show the loading
            spinner and disable the button to prevent duplicate submissions. Restore the
            button once the action completes or fails.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ButtonRow>
              <ButtonSpecimen label="Submitting..." variant="primary" loading disabled />
            </ButtonRow>
          }
          doCaption="Show a spinner and disable the button during async operations to prevent double-clicks."
          dontPreview={
            <ButtonRow>
              <ButtonSpecimen label="Submit verification" variant="primary" />
              <span className="tds-guideline-annotation">
                (no feedback after click)
              </span>
            </ButtonRow>
          }
          dontCaption="Don't leave the button in its default state during processing. Users will click again."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Use icons to reinforce meaning, not decorate"
        lead={
          <p>
            A leading icon can strengthen recognition for common actions (download, add, search).
            Avoid adding icons to every button. If the label already communicates the
            action clearly, the icon is visual noise.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ButtonRow>
              <ButtonSpecimen label="Download report" variant="secondary" leadingIcon />
            </ButtonRow>
          }
          doCaption="Use a leading icon when it adds recognition to a well-known action."
          dontPreview={
            <ButtonRow>
              <ButtonSpecimen label="Save changes" variant="primary" leadingIcon trailingIcon />
            </ButtonRow>
          }
          dontCaption="Don't stack multiple icons on a single button. It clutters the label."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Only disable when the user can fix it"
        lead={
          <p>
            A disabled button tells the user something is missing but doesn't explain what.
            Use the disabled state only when the required action is visible and obvious,
            like filling a required field directly above the button.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ButtonRow>
              <ButtonSpecimen label="Submit verification" variant="primary" disabled />
            </ButtonRow>
          }
          doCaption="Disable the button when the fix is obvious, like an empty required field above it."
          dontPreview={
            <ButtonRow>
              <ButtonSpecimen label="Submit verification" variant="primary" disabled />
              <span className="tds-guideline-annotation">
                (no explanation visible)
              </span>
            </ButtonRow>
          }
          dontCaption="Don't disable without showing what's needed. Users can't fix what they can't identify."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Use buttons for actions, links for navigation"
        lead={
          <p>
            A <code>&lt;button&gt;</code> changes data or triggers a process (submit, save,
            delete). An <code>&lt;a&gt;</code> navigates to a new page or resource. Using the
            wrong element breaks keyboard behavior and screen reader announcements.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ButtonRow>
              <ButtonSpecimen label="Save changes" variant="primary" />
              <a href="#" className="tds-btn tds-btn--md tds-btn--secondary" role="link">
                View audit log
              </a>
            </ButtonRow>
          }
          doCaption="Use button for state changes and anchor for navigation, even when both look like buttons."
          dontPreview={
            <ButtonRow>
              <ButtonSpecimen label="Go to dashboard" variant="primary" />
            </ButtonRow>
          }
          dontCaption="Don't use a button element for navigation. It prevents open-in-new-tab and breaks history."
        />
      </GuidelineSection>
    </div>
  );
}
