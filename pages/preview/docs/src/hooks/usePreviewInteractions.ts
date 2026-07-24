import { useEffect } from "react";
import { PREVIEW_INTERACTIONS_SCRIPT } from "../data/interactions";
import dropdownPanelScript from "../../../../../Components/_shared/dropdown-panel/dropdown-panel.js?raw";
import datePickerScript from "../../../../../Components/date-picker/date-picker.js?raw";
import dialogScript from "../../../../../Components/dialog/dialog.js?raw";
import type { ContentPageId } from "../data/navigation";

declare global {
  interface Window {
    initPreviewSelects?: (root?: ParentNode) => void;
    initPreviewDropdownMenus?: (root?: ParentNode) => void;
    initDatePickers?: (root?: ParentNode) => void;
    openTdsDialog?: (id: string) => void;
    closeTdsDialog?: (dialog: Element) => void;
    __tdsPreviewScriptsLoaded?: boolean;
  }
}

function runInlineScript(source: string) {
  const script = document.createElement("script");
  script.textContent = source;
  document.body.appendChild(script);
  script.remove();
}

function initVisibleDemos() {
  window.initPreviewSelects?.();
  window.initPreviewDropdownMenus?.();
  window.initDatePickers?.();
}

export function usePreviewInteractions(activeTab: ContentPageId | null) {
  useEffect(() => {
    if (window.__tdsPreviewScriptsLoaded) return;
    window.__tdsPreviewScriptsLoaded = true;
    runInlineScript(dropdownPanelScript);
    runInlineScript(datePickerScript);
    runInlineScript(dialogScript);
    runInlineScript(PREVIEW_INTERACTIONS_SCRIPT);
    requestAnimationFrame(() => initVisibleDemos());
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => initVisibleDemos());
    return () => cancelAnimationFrame(frame);
  }, [activeTab]);
}
