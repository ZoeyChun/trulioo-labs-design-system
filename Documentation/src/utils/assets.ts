/** Relative asset base for GitHub Pages project sites (avoids broken `/assets/` at domain root). */
export const ASSETS_BASE = `${import.meta.env.BASE_URL}assets/`;

export function rewritePreviewAssetPaths(html: string): string {
  return html.replace(/\.\.\/\.\.\/assets\//g, ASSETS_BASE);
}

export function assetUrl(name: string): string {
  return `${ASSETS_BASE}${name}`;
}
