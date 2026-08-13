import { useEffect, useState, type RefObject } from "react";
import type { AppRoute } from "../data/navigation";

function routeKey(route: AppRoute): string {
  if (route.type === "home") return "home";
  return `${route.section}/${route.pageId}`;
}

export function useStickyTopBarVisible(
  mainRef: RefObject<HTMLElement | null>,
  route: AppRoute
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (route.type === "home") {
      setVisible(false);
      return;
    }

    const main = mainRef.current;
    if (!main) return;

    let observer: IntersectionObserver | null = null;

    const attach = () => {
      const title = main.querySelector<HTMLElement>(
        ".tds-preview__panel.is-active .tds-preview__chapter-title"
      );

      observer?.disconnect();
      observer = null;

      if (!title) {
        setVisible(false);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setVisible(!entry.isIntersecting);
        },
        { root: main, threshold: 0 }
      );
      observer.observe(title);
    };

    const raf = requestAnimationFrame(attach);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [mainRef, routeKey(route)]);

  return visible;
}
