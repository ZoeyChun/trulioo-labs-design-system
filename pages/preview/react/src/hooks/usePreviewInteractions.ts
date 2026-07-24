import { useEffect } from "react";
import { PREVIEW_INTERACTIONS_SCRIPT } from "../data/interactions";
import dropdownPanelScript from "../../../../../Components/_shared/dropdown-panel/dropdown-panel.js?raw";
import datePickerScript from "../../../../../Components/date-picker/date-picker.js?raw";
import type { TabId } from "../data/navigation";

declare global {
  interface Window {
    initPreviewSelects?: (root?: ParentNode) => void;
    __tdsPreviewScriptsLoaded?: boolean;
  }
}

function runInlineScript(source: string) {
  const script = document.createElement("script");
  script.textContent = source;
  document.body.appendChild(script);
  script.remove();
}

export function usePreviewInteractions(activeTab: TabId | null) {
  useEffect(() => {
    if (window.__tdsPreviewScriptsLoaded) return;
    window.__tdsPreviewScriptsLoaded = true;

    runInlineScript(dropdownPanelScript);
    runInlineScript(datePickerScript);
    // Run in global scope so inline onclick handlers (toggleAccordion, etc.) work.
    runInlineScript(PREVIEW_INTERACTIONS_SCRIPT);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      window.initPreviewSelects?.();
    });
    return () => cancelAnimationFrame(frame);
  }, [activeTab]);
}
