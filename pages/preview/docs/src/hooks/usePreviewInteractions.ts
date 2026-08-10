import { useEffect } from "react";
import { PREVIEW_INTERACTIONS_SCRIPT } from "../data/interactions";
import dropdownPanelScript from "../../../../../Components/_shared/dropdown-panel/dropdown-panel.js?raw";
import datePickerScript from "../../../../../Components/date-picker/date-picker.js?raw";
import dialogScript from "../../../../../Components/dialog/dialog.js?raw";

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

export function initPreviewDemos(root?: ParentNode) {
  window.initPreviewSelects?.(root);
  window.initPreviewDropdownMenus?.(root);
  window.initDatePickers?.(root);
}

export function usePreviewInteractions(activeChapter: string | null) {
  useEffect(() => {
    if (window.__tdsPreviewScriptsLoaded) return;
    window.__tdsPreviewScriptsLoaded = true;
    runInlineScript(dropdownPanelScript);
    runInlineScript(datePickerScript);
    runInlineScript(dialogScript);
    runInlineScript(PREVIEW_INTERACTIONS_SCRIPT);
    requestAnimationFrame(() => initPreviewDemos());
  }, []);

  useEffect(() => {
    const root = document.querySelector(".tds-preview__panel.is-active") ?? undefined;
    const frame = requestAnimationFrame(() => initPreviewDemos(root ?? undefined));
    return () => cancelAnimationFrame(frame);
  }, [activeChapter]);
}

/** Re-bind interactive demos after a panel mounts showcase HTML (e.g. doc tab switch). */
export function usePanelDemoInteractions(
  panelId: string,
  active: boolean,
  contentKey: string | number,
) {
  useEffect(() => {
    if (!active) return;

    const run = () => {
      const root = document.getElementById(panelId);
      initPreviewDemos(root ?? undefined);
    };

    const frame = requestAnimationFrame(() => requestAnimationFrame(run));
    return () => cancelAnimationFrame(frame);
  }, [panelId, active, contentKey]);
}
