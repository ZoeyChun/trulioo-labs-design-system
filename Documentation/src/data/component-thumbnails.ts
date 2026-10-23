import {
  buildComponentNavGroups,
  filterShowcasesForComponent,
  type ComponentNavPage,
} from "./component-nav";
import { PREVIEW_SHOWCASES, type PreviewShowcase } from "./showcases";
import { rewritePreviewAssetPaths } from "../utils/assets";

export type ComponentThumbnail = {
  id: string;
  label: string;
  category: string;
  description?: string;
  canvasHtml: string | null;
  apiHint: string | null;
};

/** Prefer compact, representative demos for card thumbs. */
function scoreThumbnailShowcase(showcase: PreviewShowcase): number {
  let score = 0;
  if (showcase.templateSection === "overview") score += 40;
  if (showcase.templateSection === "variants") score += 30;
  score += Math.max(0, 40 - Math.floor(showcase.html.length / 2500));
  if (/side-nav--demo|data-table|ds-matrix|ownership-table/i.test(showcase.html)) {
    score -= 25;
  }
  return score;
}

export function pickThumbnailShowcase(componentId: string): PreviewShowcase | null {
  const matches = filterShowcasesForComponent(PREVIEW_SHOWCASES, componentId);
  if (matches.length === 0) return null;

  return [...matches].sort((a, b) => scoreThumbnailShowcase(b) - scoreThumbnailShowcase(a))[0] ?? null;
}

function isNoiseNode(el: Element): boolean {
  const tag = el.tagName.toLowerCase();
  if (tag === "script" || tag === "style" || tag === "br" || tag === "hr") return true;
  if (el.classList.contains("ds-state-demo__label")) return true;
  if (el.classList.contains("ds-matrix__corner")) return true;
  if (el.classList.contains("ds-matrix__colhead")) return true;
  if (el.classList.contains("ds-matrix__rowhead")) return true;
  if (el.classList.contains("ds-showcase__head")) return true;
  if (el.classList.contains("ds-showcase__meta")) return true;
  return false;
}

function looksLikeComponent(el: Element): boolean {
  if (isNoiseNode(el)) return false;
  const className = typeof el.className === "string" ? el.className : "";
  if (/\btds-/.test(className)) return true;
  const tag = el.tagName.toLowerCase();
  return ["button", "input", "select", "textarea", "a", "table", "nav", "aside"].includes(tag);
}

/**
 * Walk the canvas and return outerHTML for a single representative element.
 * Prefers the first real control (e.g. one button), not a whole row/matrix.
 */
export function extractSinglePreviewHtml(showcaseHtml: string): string | null {
  if (typeof DOMParser === "undefined") return null;

  const doc = new DOMParser().parseFromString(showcaseHtml, "text/html");
  const canvas = doc.querySelector(".ds-showcase__canvas");
  if (!canvas) return null;

  const preferSelectors = [
    ".ds-state-demo:not([class*='hover']) > :not(.ds-state-demo__label)",
    ".ds-state-demo > :not(.ds-state-demo__label)",
    ".ds-matrix__cell > *",
    ".row > .tds-btn, .row > .tds-icon-btn, .row > [class*='tds-']",
    ".row > *",
    "[class*='tds-btn']:not([disabled])",
    "[class*='tds-']:not(.tds-side-nav-preview):not(.ds-api)",
    "button, input, select, textarea, a.tds-breadcrumb-item, table, aside.tds-side-nav",
  ];

  for (const selector of preferSelectors) {
    const nodes = canvas.querySelectorAll(selector);
    for (const node of nodes) {
      if (!(node instanceof Element) || isNoiseNode(node)) continue;
      if (!looksLikeComponent(node) && !node.querySelector("[class*='tds-']")) continue;

      // Prefer a leaf control over a wrapping grid when both match.
      const leaf = node.matches("[class*='tds-'], button, input, select, textarea, table, aside")
        ? node
        : node.querySelector("[class*='tds-'], button, input, select, textarea, table, aside");

      const pick = leaf instanceof Element ? leaf : node;
      if (isNoiseNode(pick)) continue;

      // Avoid dumping an entire multi-item list into the card.
      if (
        pick.classList.contains("row") ||
        pick.classList.contains("ds-state-grid") ||
        pick.classList.contains("ds-matrix") ||
        pick.classList.contains("tds-side-nav-preview")
      ) {
        continue;
      }

      return pick.outerHTML;
    }
  }

  // Last resort: first element child of the canvas.
  const first = Array.from(canvas.children).find((el) => !isNoiseNode(el));
  return first ? first.outerHTML : null;
}

export function buildComponentThumbnails(): ComponentThumbnail[] {
  const groups = buildComponentNavGroups();
  const thumbs: ComponentThumbnail[] = [];

  for (const group of groups) {
    for (const page of group.pages as ComponentNavPage[]) {
      const showcase = pickThumbnailShowcase(page.id);
      const raw = showcase ? extractSinglePreviewHtml(showcase.html) : null;
      thumbs.push({
        id: page.id,
        label: page.label,
        category: group.label,
        description: page.description,
        canvasHtml: raw ? rewritePreviewAssetPaths(raw) : null,
        apiHint: showcase?.api || null,
      });
    }
  }

  return thumbs;
}

export function thumbnailsByCategory(
  thumbs: ComponentThumbnail[],
): { category: string; items: ComponentThumbnail[] }[] {
  const order = buildComponentNavGroups().map((g) => g.label);
  const map = new Map<string, ComponentThumbnail[]>();
  for (const thumb of thumbs) {
    const list = map.get(thumb.category) ?? [];
    list.push(thumb);
    map.set(thumb.category, list);
  }

  return order
    .filter((cat) => map.has(cat))
    .map((category) => ({
      category,
      items: (map.get(category) ?? []).slice().sort((a, b) => a.label.localeCompare(b.label)),
    }));
}

