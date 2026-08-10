import type { ReactNode } from "react";

export type AnatomyPointerPlacement = "top" | "bottom" | "left" | "right";

type AnatomyTargetProps = {
  number: number;
  placement: AnatomyPointerPlacement;
  children: ReactNode;
  className?: string;
};

function PointerContents({
  number,
  placement,
}: {
  number: number;
  placement: AnatomyPointerPlacement;
}) {
  const badge = <span className="ds-anatomy-pointer__badge">{number}</span>;
  const stem = <span className="ds-anatomy-pointer__stem" aria-hidden="true" />;

  switch (placement) {
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

export function AnatomyTarget({ number, placement, children, className }: AnatomyTargetProps) {
  return (
    <span className={["ds-anatomy-target", className].filter(Boolean).join(" ")}>
      {children}
      <span
        className={`ds-anatomy-pointer ds-anatomy-pointer--${placement}`}
        aria-hidden="true"
      >
        <PointerContents number={number} placement={placement} />
      </span>
    </span>
  );
}
