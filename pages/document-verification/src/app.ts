import { renderGauges } from "./gauge";
import { ICON_EXPAND_ALL } from "./icons";
import {
  applyScenario,
  isScenarioId,
  ICON_MINUS,
  ICON_PLUS,
} from "./render";
import { getScenario } from "./scenario-data";
import type { ScenarioId, TabId } from "./types";

const INITIAL_SCENARIO: ScenarioId = "happy-path";
const MORE_VISIBLE_ROWS = 5;
const SPLIT_DEFAULT_END = 353;
const SPLIT_MIN_START = 240;
const SPLIT_MIN_END = 220;
const SPLIT_STACK_MAX = 1200;
type SortDir = "asc" | "desc";

let sharedSplitEnd = SPLIT_DEFAULT_END;

function selectTab(tabId: TabId | string): void {
  const tabs = document.querySelectorAll<HTMLElement>(".dv-tab");
  const panels = document.querySelectorAll<HTMLElement>(".dv-tabpanel");
  tabs.forEach((tab) => {
    const active = tab.getAttribute("data-tab") === tabId;
    tab.classList.toggle("dv-tab--active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  panels.forEach((panel) => {
    panel.hidden = panel.getAttribute("data-tab") !== tabId;
  });
  syncSplitPaneForActiveTab();
}

function setCollapsibleOpen(section: Element, open: boolean): void {
  section.classList.toggle("dv-collapsible--open", open);
  const header = section.querySelector(".dv-collapsible__header");
  const body = section.querySelector(".dv-collapsible__body");
  if (header) header.setAttribute("aria-expanded", String(open));
  if (body instanceof HTMLElement) body.hidden = !open;
}

function panelCollapsibles(panel: Element): Element[] {
  return [...panel.querySelectorAll(".dv-collapsible")];
}

function areAllCollapsiblesOpen(panel: Element): boolean {
  const sections = panelCollapsibles(panel);
  return sections.length > 0 && sections.every((s) => s.classList.contains("dv-collapsible--open"));
}

function setExpandAllButtonLabel(btn: HTMLElement, allOpen: boolean): void {
  const label = allOpen ? "Collapse all" : "Expand all";
  btn.innerHTML = `<span class="tds-btn__leading-icon">${ICON_EXPAND_ALL}</span>${label}`;
  btn.setAttribute("aria-pressed", String(allOpen));
}

function updateExpandAllButton(btn: Element): void {
  if (!(btn instanceof HTMLElement)) return;
  const panel = btn.closest(".dv-tabpanel");
  if (!panel) return;
  setExpandAllButtonLabel(btn, areAllCollapsiblesOpen(panel));
}

function syncExpandAllButtons(root: Document | HTMLElement = document): void {
  root.querySelectorAll(".dv-expand-all").forEach(updateExpandAllButton);
}

function expandAllInPanel(panel: Element): void {
  panelCollapsibles(panel).forEach((section) => {
    setCollapsibleOpen(section, true);
  });
  expandAllInlineInPanel(panel);
}

function collapseAllInPanel(panel: Element): void {
  panelCollapsibles(panel).forEach((section) => {
    setCollapsibleOpen(section, false);
  });
  collapseAllInlineInPanel(panel);
}

function setTxnToggleOpen(btn: HTMLElement, open: boolean): void {
  const acc = btn.closest(".dv-acc");
  const table = acc?.querySelector(".dv-txntable");
  if (!(table instanceof HTMLElement)) return;

  table.hidden = !open;
  btn.setAttribute("aria-expanded", String(open));

  const icon = btn.querySelector(".dv-ni2-txntoggle__icon");
  const label = btn.querySelector(".dv-ni2-txntoggle__label");
  const showLabel =
    label?.getAttribute("data-show-label") ?? "View transactions";
  const hideLabel = showLabel
    .replace(/^Show\s+/i, "Hide ")
    .replace(/^View\s+/i, "Hide ");

  if (icon) icon.innerHTML = open ? ICON_MINUS : ICON_PLUS;
  if (label) label.textContent = open ? hideLabel : showLabel;
}

function setDeviceInfoOpen(scope: Element, open: boolean): void {
  const details =
    scope.querySelector("#dv-device-details") ??
    scope.querySelector(".dv-di-details");
  const btn = scope.querySelector(".dv-di-showinfo button");
  if (!(details instanceof HTMLElement) || !(btn instanceof HTMLElement)) return;

  details.hidden = !open;
  btn.setAttribute("aria-expanded", String(open));
  const iconHtml = open ? ICON_MINUS : ICON_PLUS;
  const label = open ? "Hide Device Information" : "Show Device Information";
  btn.innerHTML = `<span class="tds-btn__leading-icon">${iconHtml}</span>${label}`;
}

function applyMoreSection(wrap: Element, open: boolean): void {
  const table = wrap.previousElementSibling;
  if (!(table instanceof HTMLElement) || !table.classList.contains("dv-table")) {
    return;
  }

  const rows = table.querySelectorAll(".dv-table__row:not(.dv-table__head)");
  const limit = Number.parseInt(
    wrap.getAttribute("data-visible-limit") ?? String(MORE_VISIBLE_ROWS),
    10,
  );
  const hiddenN = Math.max(0, rows.length - limit);
  const label = wrap.getAttribute("data-group-label") ?? "";
  const btn = wrap.querySelector("button");

  rows.forEach((row, index) => {
    if (index >= limit && row instanceof HTMLElement) row.hidden = !open;
  });

  if (btn instanceof HTMLElement) {
    btn.innerHTML =
      `<span class="tds-btn__leading-icon">${open ? ICON_MINUS : ICON_PLUS}</span>` +
      (open ? "Show less" : `${hiddenN} more ${label}`);
  }
  wrap.setAttribute("data-open", String(open));
}

function expandAllInlineInPanel(panel: Element): void {
  panel.querySelectorAll(".dv-more").forEach((wrap) => {
    applyMoreSection(wrap, true);
  });
  panel.querySelectorAll(".dv-ni2-txntoggle").forEach((btn) => {
    if (btn instanceof HTMLElement) setTxnToggleOpen(btn, true);
  });
  setDeviceInfoOpen(panel, true);
}

function collapseAllInlineInPanel(panel: Element): void {
  panel.querySelectorAll(".dv-more").forEach((wrap) => {
    applyMoreSection(wrap, false);
  });
  panel.querySelectorAll(".dv-ni2-txntoggle").forEach((btn) => {
    if (btn instanceof HTMLElement) setTxnToggleOpen(btn, false);
  });
  setDeviceInfoOpen(panel, false);
}

function resetInlineExpansions(root: Document | HTMLElement = document): void {
  // Preserve Evidence inline-expansion state from freshly rendered markup
  // (transaction lists with rows start open per Figma). Only normalize
  // labels/icons to match each table's current hidden state.
  root.querySelectorAll(".dv-ni2-txntoggle").forEach((btn) => {
    const acc = btn.closest(".dv-acc");
    const table = acc?.querySelector(".dv-txntable");
    if (!(table instanceof HTMLElement) || !(btn instanceof HTMLElement)) return;

    const isOpen = !table.hidden;
    btn.setAttribute("aria-expanded", String(isOpen));

    const icon = btn.querySelector(".dv-ni2-txntoggle__icon");
    const label = btn.querySelector(".dv-ni2-txntoggle__label");
    const showLabel =
      label?.getAttribute("data-show-label") ?? "View transactions";
    const hideLabel = showLabel
      .replace(/^Show\s+/i, "Hide ")
      .replace(/^View\s+/i, "Hide ");

    if (icon) icon.innerHTML = isOpen ? ICON_MINUS : ICON_PLUS;
    if (label) label.textContent = isOpen ? hideLabel : showLabel;
  });

  const details =
    root.querySelector("#dv-device-details") ??
    root.querySelector(".dv-di-details");
  if (details instanceof HTMLElement) details.hidden = true;

  root.querySelectorAll(".dv-di-showinfo button").forEach((btn) => {
    if (!(btn instanceof HTMLElement)) return;
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = `<span class="tds-btn__leading-icon">${ICON_PLUS}</span>Show Device Information`;
  });
}

function initMoreButtons(root: Document | HTMLElement = document): void {
  root.querySelectorAll(".dv-group .dv-more").forEach((el) => el.remove());

  root.querySelectorAll(".dv-group .dv-table").forEach((table) => {
    const rows = table.querySelectorAll(
      ".dv-table__row:not(.dv-table__head)",
    );
    if (rows.length <= MORE_VISIBLE_ROWS) return;

    const lblEl = table.closest(".dv-group")?.querySelector(".dv-group__label");
    const label = (lblEl?.textContent ?? "").toLowerCase();
    const hiddenN = rows.length - MORE_VISIBLE_ROWS;

    const wrap = document.createElement("div");
    wrap.className = "dv-more";
    wrap.setAttribute("data-open", "false");
    wrap.setAttribute("data-visible-limit", String(MORE_VISIBLE_ROWS));
    wrap.setAttribute("data-group-label", label);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tds-btn tds-btn--secondary tds-btn--sm";
    btn.innerHTML =
      `<span class="tds-btn__leading-icon">${ICON_PLUS}</span>` +
      `${hiddenN} more ${label}`;

    btn.addEventListener("click", () => {
      const open = wrap.getAttribute("data-open") !== "true";
      applyMoreSection(wrap, open);
    });

    wrap.appendChild(btn);
    table.parentNode?.insertBefore(wrap, table.nextSibling);
    applyMoreSection(wrap, false);
  });
}

function getDataTableRows(table: Element): HTMLElement[] {
  const selector = table.classList.contains("dv-ditable")
    ? ".dv-ditable__row"
    : ".dv-txntable__row";
  return [...table.querySelectorAll(selector)].filter(
    (row): row is HTMLElement => row instanceof HTMLElement,
  );
}

function getRowCellText(row: HTMLElement, colIndex: number): string {
  const cell = row.children[colIndex];
  return cell?.textContent?.trim() ?? "";
}

function sortDataTable(
  table: Element,
  colIndex: number,
  direction: SortDir,
): void {
  const rows = getDataTableRows(table);
  rows.sort((a, b) => {
    const cmp = getRowCellText(a, colIndex).localeCompare(
      getRowCellText(b, colIndex),
      undefined,
      { sensitivity: "base", numeric: true },
    );
    return direction === "asc" ? cmp : -cmp;
  });
  rows.forEach((row) => table.appendChild(row));
}

function updateSortHeaders(
  table: Element,
  activeCol: number,
  direction: SortDir,
): void {
  const head = table.querySelector(".dv-ditable__head, .dv-txntable__head");
  if (!head) return;
  head.querySelectorAll(".dv-datatable__sort").forEach((btn) => {
    const col = Number.parseInt(btn.getAttribute("data-sort-col") ?? "-1", 10);
    if (col === activeCol) {
      btn.setAttribute(
        "aria-sort",
        direction === "asc" ? "ascending" : "descending",
      );
    } else {
      btn.setAttribute("aria-sort", "none");
    }
  });
}

function initDataTableSort(root: Document | HTMLElement = document): void {
  root.querySelectorAll(".dv-ditable, .dv-txntable").forEach((table) => {
    sortDataTable(table, 0, "asc");
    updateSortHeaders(table, 0, "asc");
  });
}

function storeTxnShowLabels(root: Document | HTMLElement = document): void {
  root.querySelectorAll(".dv-ni2-txntoggle__label").forEach((label) => {
    if (!label.getAttribute("data-show-label") && label.textContent) {
      label.setAttribute("data-show-label", label.textContent);
    }
  });
}

function isDeviceIntelligenceTabActive(): boolean {
  const panel = document.querySelector(
    '.dv-tabpanel[data-tab="device-intelligence"]',
  );
  return panel instanceof HTMLElement && !panel.hidden;
}

/** Play gauge entry animation when the Device Intelligence tab is visible. */
function playDeviceGaugeAnimation(): void {
  if (!isDeviceIntelligenceTabActive()) return;
  renderGauges(document);
}

function setScenario(id: ScenarioId): void {
  const config = getScenario(id);
  applyScenario(document, config);
  selectTab(config.defaultTab);
  resetInlineExpansions(document);
  storeTxnShowLabels(document);
  playDeviceGaugeAnimation();
  initMoreButtons(document);
  initDataTableSort(document);
  syncExpandAllButtons(document);
}

function wireTabs(): void {
  document.querySelectorAll(".dv-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");
      if (!target) return;
      selectTab(target);
      if (target === "device-intelligence") playDeviceGaugeAnimation();
    });
  });
}

function wireCollapsibles(): void {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const header = target.closest(".dv-collapsible__header");
    if (!header) return;
    const section = header.closest(".dv-collapsible");
    if (!section) return;
    const willOpen = !section.classList.contains("dv-collapsible--open");
    setCollapsibleOpen(section, willOpen);
    const panel = section.closest(".dv-tabpanel");
    const expandBtn = panel?.querySelector(".dv-expand-all");
    if (expandBtn) updateExpandAllButton(expandBtn);
  });
}

function wireExpandAll(): void {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const btn = target.closest(".dv-expand-all");
    if (!(btn instanceof HTMLElement)) return;
    const panel = btn.closest(".dv-tabpanel");
    if (!panel) return;
    if (areAllCollapsiblesOpen(panel)) {
      collapseAllInPanel(panel);
    } else {
      expandAllInPanel(panel);
    }
    updateExpandAllButton(btn);
  });
}

function wireNiSummaryDrivers(): void {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const card = target.closest("[data-ni-target]");
    if (!(card instanceof HTMLElement)) return;

    const id = card.getAttribute("data-ni-target");
    if (!id) return;

    const acc = document.querySelector(
      `.dv-acc[data-insight-id="${CSS.escape(id)}"]`,
    );
    if (!(acc instanceof HTMLElement)) return;

    const group = acc.closest(".dv-group.dv-collapsible");
    if (group) setCollapsibleOpen(group, true);
    setCollapsibleOpen(acc, true);

    const panel = acc.closest(".dv-tabpanel");
    const expandBtn = panel?.querySelector(".dv-expand-all");
    if (expandBtn) updateExpandAllButton(expandBtn);

    acc.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function wireTxnToggles(): void {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const btn = target.closest(".dv-ni2-txntoggle");
    if (!(btn instanceof HTMLElement)) return;

    const acc = btn.closest(".dv-acc");
    const table = acc?.querySelector(".dv-txntable");
    if (!(table instanceof HTMLElement)) return;

    setTxnToggleOpen(btn, table.hidden);
  });
}

function wireDataTableSort(): void {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const btn = target.closest(".dv-datatable__sort");
    if (!(btn instanceof HTMLElement)) return;

    const head = btn.closest(".dv-ditable__head, .dv-txntable__head");
    const table = head?.parentElement;
    if (!(table instanceof HTMLElement)) return;

    const col = Number.parseInt(btn.getAttribute("data-sort-col") ?? "0", 10);
    const current = btn.getAttribute("aria-sort");
    const direction: SortDir = current === "ascending" ? "desc" : "asc";
    sortDataTable(table, col, direction);
    updateSortHeaders(table, col, direction);
  });
}

function wireDeviceInfoToggle(): void {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const btn = target.closest(".dv-di-showinfo button");
    if (!(btn instanceof HTMLElement)) return;

    const scope = btn.closest(".dv-tabpanel") ?? document;
    const details =
      scope.querySelector("#dv-device-details") ??
      btn.closest(".dv-di-top")?.querySelector(".dv-di-details") ??
      scope.querySelector(".dv-di-details");
    if (!(details instanceof HTMLElement)) return;

    setDeviceInfoOpen(scope, details.hidden);
  });
}

function setSidebarCollapsed(collapsed: boolean): void {
  const columns = document.getElementById("dv-columns");
  const collapseBtn = document.querySelector(".dv-sidebar-toggle--collapse");
  const expandBtn = document.querySelector(".dv-sidebar-toggle--expand");
  if (!columns) return;

  columns.classList.toggle("dv-columns--sidebar-collapsed", collapsed);
  collapseBtn?.setAttribute("aria-expanded", String(!collapsed));
  expandBtn?.setAttribute("aria-expanded", String(collapsed));
}

function wireSidebarCollapse(): void {
  const collapseBtn = document.querySelector(".dv-sidebar-toggle--collapse");
  const expandBtn = document.querySelector(".dv-sidebar-toggle--expand");

  collapseBtn?.addEventListener("click", () => setSidebarCollapsed(true));
  expandBtn?.addEventListener("click", () => setSidebarCollapsed(false));
}

function figureImageTitle(figure: Element): string {
  const caption = figure.querySelector(".dv-doc-image__caption");
  if (caption) {
    const clone = caption.cloneNode(true);
    if (clone instanceof HTMLElement) {
      clone.querySelectorAll("button").forEach((btn) => btn.remove());
      const text = clone.textContent?.trim();
      if (text) return text;
    }
  }

  const viewerTitle = figure
    .closest(".dv-viewer")
    ?.querySelector(".dv-section-title")
    ?.textContent?.trim();
  return viewerTitle ?? "Image";
}

function closeImageModal(): void {
  const modal = document.getElementById("dv-image-modal");
  const body = document.getElementById("dv-image-modal-body");
  if (!(modal instanceof HTMLElement)) return;

  modal.hidden = true;
  if (body) body.innerHTML = "";
  document.body.style.overflow = "";
}

function openImageModal(figure: Element): void {
  const modal = document.getElementById("dv-image-modal");
  const title = document.getElementById("dv-image-modal-title");
  const body = document.getElementById("dv-image-modal-body");
  const media = figure.querySelector(".dv-doc-image__media");
  if (!(modal instanceof HTMLElement) || !title || !body || !media) return;

  title.textContent = figureImageTitle(figure);
  body.innerHTML = media.innerHTML;
  modal.hidden = false;
  document.body.style.overflow = "hidden";

  const closeBtn = modal.querySelector(".dv-image-modal__close");
  if (closeBtn instanceof HTMLElement) closeBtn.focus();
}

function wireImageModal(): void {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest("[data-modal-close]")) {
      closeImageModal();
      return;
    }

    const expandBtn = target.closest(".dv-doc-image .dv-icon-btn");
    const media = expandBtn ? null : target.closest(".dv-doc-image__media");
    const figure = (expandBtn ?? media)?.closest(".dv-doc-image");
    if (!figure) return;

    event.preventDefault();
    openImageModal(figure);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const modal = document.getElementById("dv-image-modal");
    if (modal instanceof HTMLElement && !modal.hidden) closeImageModal();
  });
}

function isSplitPaneStacked(): boolean {
  return window.matchMedia(`(max-width: ${SPLIT_STACK_MAX}px)`).matches;
}

function getActiveSplitPane(): HTMLElement | null {
  const activePanel = document.querySelector<HTMLElement>(".dv-tabpanel:not([hidden])");
  return activePanel?.querySelector<HTMLElement>("[data-split-pane]") ?? null;
}

function clampSplitEnd(pane: HTMLElement, endWidth: number): number {
  const paneWidth = pane.getBoundingClientRect().width;
  if (paneWidth <= 0) return endWidth;
  const maxEnd = paneWidth - SPLIT_MIN_START - 8;
  return Math.max(SPLIT_MIN_END, Math.min(endWidth, maxEnd));
}

function setSplitEndWidth(pane: HTMLElement, endWidth: number): number {
  const clamped = clampSplitEnd(pane, endWidth);
  pane.style.setProperty("--dv-split-end", `${clamped}px`);
  pane.style.gridTemplateColumns = `minmax(${SPLIT_MIN_START}px, 1fr) 8px ${clamped}px`;
  return clamped;
}

function applySharedSplitEndToAllPanes(endWidth: number): void {
  document.querySelectorAll<HTMLElement>("[data-split-pane]").forEach((pane) => {
    setSplitEndWidth(pane, endWidth);
  });
}

function syncSplitPaneForActiveTab(): void {
  if (isSplitPaneStacked()) return;
  const activePane = getActiveSplitPane();
  if (!activePane) return;
  sharedSplitEnd = clampSplitEnd(activePane, sharedSplitEnd);
  applySharedSplitEndToAllPanes(sharedSplitEnd);
}

function wireSplitPanes(): void {
  applySharedSplitEndToAllPanes(SPLIT_DEFAULT_END);
  sharedSplitEnd = SPLIT_DEFAULT_END;
  syncSplitPaneForActiveTab();

  document.querySelectorAll<HTMLElement>("[data-split-pane]").forEach((pane) => {
    const divider = pane.querySelector<HTMLElement>(".dv-split-pane__divider");
    if (!divider) return;

    const stopDragging = (
      pointerId: number,
      onMove: (ev: PointerEvent) => void,
      onUp: (ev: PointerEvent) => void,
    ): void => {
      divider.classList.remove("is-dragging");
      document.body.classList.remove("dv-is-resizing");
      if (divider.hasPointerCapture(pointerId)) {
        divider.releasePointerCapture(pointerId);
      }
      divider.removeEventListener("pointermove", onMove);
      divider.removeEventListener("pointerup", onUp);
      divider.removeEventListener("pointercancel", onUp);
    };

    const updateSplitFromPointer = (clientX: number): void => {
      const clamped = setSplitEndWidth(pane, pane.getBoundingClientRect().right - clientX);
      sharedSplitEnd = clamped;
      document.querySelectorAll<HTMLElement>("[data-split-pane]").forEach((otherPane) => {
        if (otherPane !== pane) setSplitEndWidth(otherPane, sharedSplitEnd);
      });
    };

    divider.addEventListener("pointerdown", (event) => {
      if (isSplitPaneStacked()) return;
      event.preventDefault();

      divider.setPointerCapture(event.pointerId);
      divider.classList.add("is-dragging");
      document.body.classList.add("dv-is-resizing");
      updateSplitFromPointer(event.clientX);

      const onMove = (ev: PointerEvent): void => {
        updateSplitFromPointer(ev.clientX);
      };

      const onUp = (ev: PointerEvent): void => {
        stopDragging(ev.pointerId, onMove, onUp);
      };

      divider.addEventListener("pointermove", onMove);
      divider.addEventListener("pointerup", onUp);
      divider.addEventListener("pointercancel", onUp);
    });

    divider.addEventListener("keydown", (event) => {
      if (isSplitPaneStacked()) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();

      const current = Number.parseInt(
        getComputedStyle(pane).getPropertyValue("--dv-split-end") || `${SPLIT_DEFAULT_END}`,
        10,
      );
      const delta = event.key === "ArrowLeft" ? -16 : 16;
      sharedSplitEnd = setSplitEndWidth(pane, current + delta);
      applySharedSplitEndToAllPanes(sharedSplitEnd);
      syncSplitPaneForActiveTab();
    });
  });

  window.addEventListener("resize", () => {
    syncSplitPaneForActiveTab();
  });
}

function wireAppNavToggle(): void {
  const shell = document.getElementById("app-shell");
  const toggle = document.getElementById("app-nav-toggle");
  const overlay = document.getElementById("app-sidenav-overlay");
  if (!(shell instanceof HTMLElement) || !(toggle instanceof HTMLElement) || !(overlay instanceof HTMLElement)) {
    return;
  }

  const setOpen = (open: boolean): void => {
    shell.classList.toggle("app-shell--nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    overlay.hidden = !open;
    overlay.setAttribute("aria-hidden", String(!open));
  };

  toggle.addEventListener("click", () => {
    setOpen(!shell.classList.contains("app-shell--nav-open"));
  });

  overlay.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && shell.classList.contains("app-shell--nav-open")) {
      setOpen(false);
    }
  });

  window.matchMedia("(min-width: 769px)").addEventListener("change", (query) => {
    if (query.matches) setOpen(false);
  });
}

function wireTestEntitySelect(): void {
  const sel = document.getElementById("dv-te-select");
  if (!sel) return;

  const trigger = sel.querySelector(".tds-select__trigger");
  if (!(trigger instanceof HTMLElement)) return;

  const close = (): void => {
    sel.classList.remove("tds-select--open");
    trigger.setAttribute("aria-expanded", "false");
  };

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = sel.classList.toggle("tds-select--open");
    trigger.setAttribute("aria-expanded", String(open));
  });

  sel.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const opt = target.closest(".dv-te-option");
    if (!(opt instanceof HTMLElement)) return;
    const id = opt.getAttribute("data-id");
    if (id && isScenarioId(id)) {
      setScenario(id);
      close();
    }
  });

  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Node) || !sel.contains(e.target)) close();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  wireTabs();
  wireCollapsibles();
  wireExpandAll();
  wireNiSummaryDrivers();
  wireTxnToggles();
  wireDataTableSort();
  wireDeviceInfoToggle();
  wireSidebarCollapse();
  wireImageModal();
  wireSplitPanes();
  wireAppNavToggle();
  wireTestEntitySelect();
  setScenario(INITIAL_SCENARIO);
});
