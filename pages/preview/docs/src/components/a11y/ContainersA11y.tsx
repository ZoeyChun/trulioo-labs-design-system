import { A11yGuide, A11yItem } from "./A11yGuide";

export function AccordionA11y() {
  return (
    <A11yGuide>
      <A11yItem title="Expanded state">
        Toggle <code>aria-expanded</code> on <code>.tds-accordion__header</code> when content opens or closes.
      </A11yItem>
      <A11yItem title="Region">
        Associate content with the header via <code>aria-controls</code> and an <code>id</code> on{" "}
        <code>.tds-accordion__content</code>.
      </A11yItem>
      <A11yItem title="Keyboard">
        Header responds to <code>Enter</code> and <code>Space</code>. Consider arrow-key navigation between headers in a group.
      </A11yItem>
    </A11yGuide>
  );
}
