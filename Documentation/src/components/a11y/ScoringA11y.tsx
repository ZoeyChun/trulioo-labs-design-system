import { A11yGuide, A11yItem } from "./A11yGuide";

export function ScoreGaugeA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Accessible name">
        Provide an <code>aria-label</code> or visible text describing the score (e.g. "Risk score 72 out of 100").
      </A11yItem>
      <A11yItem title="Decorative chart">
        Mark the SVG chart <code>aria-hidden="true"</code> when the numeric score is exposed to assistive tech.
      </A11yItem>
    </A11yGuide>
  );
}

export function ScoreCardA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Figma reference">
        Follow Figma ScoreCard layout for heading hierarchy until CSS ships.
      </A11yItem>
      <A11yItem title="Score context">
        Pair numeric scores with text labels so meaning isn't color-only.
      </A11yItem>
    </A11yGuide>
  );
}

export function RiskCategoryCardA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Risk tag">
        Tag text must state the risk level — don't rely on tag color alone.
      </A11yItem>
      <A11yItem title="Score">
        Expose score and signal count as readable text, not icons alone.
      </A11yItem>
    </A11yGuide>
  );
}
