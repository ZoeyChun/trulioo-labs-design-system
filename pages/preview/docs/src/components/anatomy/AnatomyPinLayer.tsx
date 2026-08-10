import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { AnatomyPin, type AnatomyPinDirection } from "./AnatomyPin";

export type AnatomyPinConfig = {
  number: number;
  direction: AnatomyPinDirection;
  /** CSS selector scoped to the diagram root. */
  selector: string;
  offset?: { x?: number; y?: number };
  /** Anchor point on the target (0–1). Defaults to center. */
  anchor?: { x?: number; y?: number };
};

type AnatomyPinLayerProps = {
  children: ReactNode;
  pins: readonly AnatomyPinConfig[];
  className?: string;
};

/** Renders flat component markup with auto-measured anatomy callouts. */
export function AnatomyPinLayer({ children, pins, className }: AnatomyPinLayerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<Record<number, { top: string; left: string }>>({});

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const rootRect = root.getBoundingClientRect();
      const next: Record<number, { top: string; left: string }> = {};

      for (const pin of pins) {
        const el = root.querySelector<HTMLElement>(pin.selector);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const anchorX = pin.anchor?.x ?? 0.5;
        const anchorY = pin.anchor?.y ?? 0.5;
        const ox = (pin.offset?.x ?? 0) + (pin.direction === "left" ? -4 : pin.direction === "right" ? 4 : 0);
        const oy = (pin.offset?.y ?? 0) + (pin.direction === "top" ? -4 : pin.direction === "bottom" ? 4 : 0);
        let top = 0;
        let left = 0;

        switch (pin.direction) {
          case "top":
            top = rect.top - rootRect.top + oy;
            left = rect.left - rootRect.left + rect.width * anchorX + ox;
            break;
          case "bottom":
            top = rect.bottom - rootRect.top + oy;
            left = rect.left - rootRect.left + rect.width * anchorX + ox;
            break;
          case "left":
            top = rect.top - rootRect.top + rect.height * anchorY + oy;
            left = rect.left - rootRect.left + ox;
            break;
          case "right":
            top = rect.top - rootRect.top + rect.height * anchorY + oy;
            left = rect.right - rootRect.left + ox;
            break;
        }

        next[pin.number] = {
          top: `${top}px`,
          left: `${left}px`,
        };
      }

      setCoords(next);
    };

    measure();
    requestAnimationFrame(measure);
    const raf2 = requestAnimationFrame(() => requestAnimationFrame(measure));

    const ro = new ResizeObserver(measure);
    ro.observe(root);

    for (const pin of pins) {
      const el = root.querySelector<HTMLElement>(pin.selector);
      if (el) ro.observe(el);
    }

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) measure();
            },
            { root: null, threshold: 0 }
          )
        : null;
    io?.observe(root);

    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);

    return () => {
      cancelAnimationFrame(raf2);
      ro.disconnect();
      io?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pins]);

  return (
    <div
      ref={rootRef}
      className={["ds-anatomy-diagram", className].filter(Boolean).join(" ")}
    >
      {children}
      {pins.map((pin) => {
        const style = coords[pin.number];
        if (!style) return null;
        return (
          <AnatomyPin
            key={pin.number}
            number={pin.number}
            direction={pin.direction}
            style={style}
          />
        );
      })}
    </div>
  );
}
