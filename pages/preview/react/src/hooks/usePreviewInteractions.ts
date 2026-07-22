import { useEffect } from "react";
import { PREVIEW_INTERACTIONS_SCRIPT } from "../data/interactions";
import dropdownPanelScript from "../../../../../Components/_shared/dropdown-panel/dropdown-panel.js?raw";

let initialized = false;

function runInlineScript(source: string) {
  const script = document.createElement("script");
  script.textContent = source;
  document.body.appendChild(script);
  script.remove();
}

export function usePreviewInteractions() {
  useEffect(() => {
    if (initialized) return;
    initialized = true;

    runInlineScript(dropdownPanelScript);
    // Run in global scope so inline onclick handlers (toggleAccordion, etc.) work.
    runInlineScript(PREVIEW_INTERACTIONS_SCRIPT);
  }, []);
}
