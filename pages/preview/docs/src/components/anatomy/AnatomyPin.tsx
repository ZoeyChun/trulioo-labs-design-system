export type AnatomyPinDirection = "top" | "bottom" | "left" | "right";

type AnatomyPinProps = {
  number: number;
  direction: AnatomyPinDirection;
  /** Anchor position within the diagram (percentages recommended). */
  style: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
};

function PinContents({ number, direction }: { number: number; direction: AnatomyPinDirection }) {
  const badge = <span className="ds-anatomy-pin__badge">{number}</span>;
  const stem = <span className="ds-anatomy-pin__stem" aria-hidden="true" />;

  switch (direction) {
    case "top":
      return (
        <>
          {badge}
          {stem}
        </>
      );
    case "bottom":
      return (
        <>
          {stem}
          {badge}
        </>
      );
    case "right":
      return (
        <>
          {stem}
          {badge}
        </>
      );
    case "left":
      return (
        <>
          {badge}
          {stem}
        </>
      );
  }
}

/** Absolutely positioned anatomy callout — use inside `.ds-anatomy-diagram`. */
export function AnatomyPin({ number, direction, style }: AnatomyPinProps) {
  return (
    <span
      className={`ds-anatomy-pin ds-anatomy-pin--${direction}`}
      style={style}
      aria-hidden="true"
    >
      <PinContents number={number} direction={direction} />
    </span>
  );
}
