import { A11yGuide, A11yItem } from "./A11yGuide";

export function ProgressIndicatorA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Navigation landmark">
        Wrap steps in <code>&lt;nav aria-label="Progress"&gt;</code> or use <code>role="list"</code> on the indicator.
      </A11yItem>
      <A11yItem title="Current step">
        Mark the active step with <code>aria-current="step"</code>.
      </A11yItem>
      <A11yItem title="Errors">
        Error states need text explaining what's wrong — not color alone.
      </A11yItem>
    </A11yGuide>
  );
}

export function StepProgressA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Figma reference">
        Follow Figma StepProgress patterns for step semantics until CSS ships.
      </A11yItem>
      <A11yItem title="Current step">
        Mark the active step with <code>aria-current="step"</code>.
      </A11yItem>
    </A11yGuide>
  );
}

export function ListedProgressItemA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Figma reference">
        Follow Figma ListedProgressItem patterns for list semantics until CSS ships.
      </A11yItem>
      <A11yItem title="Actions">
        Action buttons in each row need descriptive labels.
      </A11yItem>
    </A11yGuide>
  );
}
