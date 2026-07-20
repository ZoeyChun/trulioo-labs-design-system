import { useEffect } from "react";
import { PREVIEW_INTERACTIONS_SCRIPT } from "../data/interactions";

let initialized = false;

export function usePreviewInteractions() {
  useEffect(() => {
    if (initialized) return;
    initialized = true;

    // Run in global scope so inline onclick handlers (toggleAccordion, etc.) work.
    const script = document.createElement("script");
    script.textContent = PREVIEW_INTERACTIONS_SCRIPT;
    document.body.appendChild(script);
    script.remove();
  }, []);
}
