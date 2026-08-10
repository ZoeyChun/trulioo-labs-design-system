export function isMobileLayout(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches;
}

export function supportsSidebarHoverExpand(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (min-width: 1025px)").matches
  );
}

export function searchShortcutLabel(): string {
  if (typeof navigator === "undefined") return "⌘K";
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? "⌘K" : "Ctrl K";
}

export function scrollToAnchor(
  main: HTMLElement | null,
  anchor?: string,
  behavior: ScrollBehavior = "auto",
) {
  if (anchor) {
    requestAnimationFrame(() => {
      const root = main ?? document;
      const el =
        root.querySelector<HTMLElement>(`#${CSS.escape(anchor)}`) ??
        document.getElementById(anchor);
      el?.scrollIntoView({ behavior, block: "start" });
    });
    return;
  }

  main?.scrollTo({ top: 0, behavior });
  window.scrollTo({ top: 0, behavior });
}
