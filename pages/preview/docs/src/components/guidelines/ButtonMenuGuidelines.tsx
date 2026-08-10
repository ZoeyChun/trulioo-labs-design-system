import { DoDontPair, GuidelineSection } from "./GuidelineDoDont";

function MenuItems({ items }: { items: string[] }) {
  return (
    <div className="tds-dropdown-panel" role="menu">
      {items.map((label) => (
        <button key={label} type="button" className="tds-action-list-item" role="menuitem">
          <span className="tds-action-list-item__label">{label}</span>
        </button>
      ))}
    </div>
  );
}

function ButtonMenuSpecimen({
  triggerLabel,
  items,
  open = true,
  align = "start",
}: {
  triggerLabel: string;
  items: string[];
  open?: boolean;
  align?: "start" | "end";
}) {
  return (
    <div
      className="tds-button-menu tds-guideline-button-menu"
      data-dropdown-align={align === "end" ? "end" : undefined}
    >
      <button type="button" className="tds-btn tds-btn--md tds-btn--secondary">
        {triggerLabel}
      </button>
      {open ? <MenuItems items={items} /> : null}
    </div>
  );
}

export function ButtonMenuGuidelines() {
  return (
    <div className="tds-preview__content-guidelines">
      <GuidelineSection
        title="Label the trigger for the action set"
        lead={
          <p>
            The trigger should tell users what kind of choices they'll find inside. Avoid
            generic labels like &ldquo;Button&rdquo; or &ldquo;Click here&rdquo; when a
            scoped label fits the toolbar or row context.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ButtonMenuSpecimen
              triggerLabel="More actions"
              items={["Export report", "Share link", "Archive business"]}
            />
          }
          doCaption="Use a short label that describes the menu's scope, such as More actions or Manage business."
          dontPreview={
            <ButtonMenuSpecimen
              triggerLabel="Button"
              items={[
                "Action list item",
                "Action list item",
                "Action list item",
              ]}
            />
          }
          dontCaption="Don't use placeholder or generic trigger copy that doesn't describe the menu."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Write specific menu item labels"
        lead={
          <p>
            Start items with a verb and include the object being acted on. Users scan menus
            quickly — specificity reduces hesitation and mis-clicks in verification flows.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ButtonMenuSpecimen
              triggerLabel="Manage verification"
              items={["Download summary", "Request re-verification", "View audit log"]}
            />
          }
          doCaption="Use verb-led, object-specific labels so each action is unambiguous."
          dontPreview={
            <ButtonMenuSpecimen
              triggerLabel="Manage verification"
              items={["Download", "Request", "View"]}
            />
          }
          dontCaption="Don't drop the object or context when the same verb could apply to multiple targets."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Signal destructive actions clearly"
        lead={
          <p>
            Destructive menu items should use plain, direct language. Pair them with danger
            styling when the action is irreversible or high-impact.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-button-menu tds-guideline-button-menu">
              <button type="button" className="tds-btn tds-btn--md tds-btn--secondary">
                Manage business
              </button>
              <div className="tds-dropdown-panel" role="menu">
                <button type="button" className="tds-action-list-item" role="menuitem">
                  <span className="tds-action-list-item__label">Edit details</span>
                </button>
                <button type="button" className="tds-action-list-item" role="menuitem">
                  <span className="tds-action-list-item__label">Suspend verification</span>
                </button>
                <button
                  type="button"
                  className="tds-action-list-item tds-guideline-destructive-item"
                  role="menuitem"
                >
                  <span className="tds-action-list-item__label">Remove business</span>
                </button>
              </div>
            </div>
          }
          doCaption="Name destructive outcomes explicitly and use danger styling for irreversible actions."
          dontPreview={
            <ButtonMenuSpecimen
              triggerLabel="Manage business"
              items={["Edit details", "Suspend verification", "Delete"]}
            />
          }
          dontCaption="Don't use vague destructive labels like Delete without stating what is removed."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Keep menus between 3 and 7 items"
        lead={
          <p>
            Fewer than 3 items don't justify a menu. Expose them as separate buttons instead.
            More than 7 items make the menu hard to scan. Group related items with separators
            or reconsider the information architecture.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <ButtonMenuSpecimen
              triggerLabel="More actions"
              items={["Export report", "Share link", "Copy reference ID", "Archive business"]}
            />
          }
          doCaption="Group 3 to 7 related actions in a menu. Use separators for logical sections."
          dontPreview={
            <ButtonMenuSpecimen
              triggerLabel="Actions"
              items={["Export", "Share"]}
            />
          }
          dontCaption="Don't hide 1 or 2 actions behind a menu. Show them as standalone buttons."
        />
      </GuidelineSection>

      <GuidelineSection
        title="Support keyboard navigation"
        lead={
          <p>
            The menu must open on <code>Enter</code> or <code>Space</code>, support
            arrow keys to move between items, select on <code>Enter</code>, and close on{" "}
            <code>Escape</code> with focus returning to the trigger button.
          </p>
        }
      >
        <DoDontPair
          doPreview={
            <div className="tds-button-menu tds-guideline-button-menu">
              <button type="button" className="tds-btn tds-btn--md tds-btn--secondary" aria-expanded="true" aria-haspopup="menu">
                More actions
              </button>
              <div className="tds-dropdown-panel" role="menu">
                <button type="button" className="tds-action-list-item" role="menuitem" tabIndex={-1}>
                  <span className="tds-action-list-item__label">Export report</span>
                </button>
                <button type="button" className="tds-action-list-item tds-action-list-item--focused" role="menuitem" tabIndex={0}>
                  <span className="tds-action-list-item__label">Share link</span>
                </button>
                <button type="button" className="tds-action-list-item" role="menuitem" tabIndex={-1}>
                  <span className="tds-action-list-item__label">Archive business</span>
                </button>
              </div>
            </div>
          }
          doCaption="Use aria-expanded, aria-haspopup, role='menu', and roving tabindex for full keyboard support."
          dontPreview={
            <ButtonMenuSpecimen
              triggerLabel="More actions"
              items={["Export report", "Share link", "Archive business"]}
            />
          }
          dontCaption="Don't skip keyboard support. Users who rely on Tab and arrows can't reach menu items."
        />
      </GuidelineSection>
    </div>
  );
}
