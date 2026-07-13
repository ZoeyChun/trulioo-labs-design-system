/**
 * Score gauge (Device Intelligence).
 * Ported from Components/score-gauge — renders into .dv-di-gauge[data-score].
 */

const NS = "http://www.w3.org/2000/svg";
const CX = 113.526;
const CY = 121.53;
const R_OUTER = 95.53;
const R_INNER = 76.43;
const R_DARK = R_OUTER - 5;
const POINTER_R = 73;
const START = 160;
const SWEEP = 220;
const TRACK = "#f4f6f4";
const POINTER = "#004c45";
const NUMBER = "#172d2d";
const DURATION = 1400;

const PAL: Record<
  string,
  { fill: string; border: string; tag: string }
> = {
  high: { fill: "#fff1f1", border: "#db2b2b", tag: "#ba151d" },
  medium: { fill: "#fff4db", border: "#d8a13b", tag: "#775516" },
  low: { fill: "#eaf7f0", border: "#6fb38a", tag: "#166534" },
};

function polar(deg: number, r: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function sector(s: number, e: number, rO: number, rI: number): string {
  const sweep = (((e - s) % 360) + 360) % 360;
  if (sweep < 0.05) return "";
  const lg = sweep > 180 ? 1 : 0;
  const o1 = polar(s, rO);
  const o2 = polar(e, rO);
  const i2 = polar(e, rI);
  const i1 = polar(s, rI);
  return (
    `M${o1[0]} ${o1[1]} A${rO} ${rO} 0 ${lg} 1 ${o2[0]} ${o2[1]}` +
    ` L${i2[0]} ${i2[1]} A${rI} ${rI} 0 ${lg} 0 ${i1[0]} ${i1[1]} Z`
  );
}

function mk(
  tag: string,
  attrs: Record<string, string | number>,
  parent: SVGElement | null,
): SVGElement {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, String(v));
  }
  if (parent) parent.appendChild(el);
  return el;
}

function renderGauge(container: Element): void {
  const score = parseFloat(container.getAttribute("data-score") ?? "") || 0;
  const max = parseFloat(container.getAttribute("data-max") ?? "") || 100;
  const pal = PAL[container.getAttribute("data-risk") ?? ""] ?? PAL.high;
  const label = container.getAttribute("data-label") ?? "";
  container.innerHTML = "";

  const svg = mk(
    "svg",
    { width: 227, height: 180, viewBox: "0 0 227 180", overflow: "visible" },
    null,
  );
  container.appendChild(svg);

  mk("path", { d: sector(START, START + SWEEP, R_OUTER, R_INNER), fill: TRACK }, svg);
  const fl = mk("path", { fill: pal.fill, d: "" }, svg);
  const fd = mk("path", { fill: pal.border, d: "" }, svg);
  const pw = mk(
    "polygon",
    {
      points: "0,-12 8.5,6.5 -8.5,6.5",
      fill: "#fff",
      stroke: "#fff",
      "stroke-width": 4,
      "stroke-linejoin": "round",
    },
    svg,
  );
  const pg = mk(
    "polygon",
    {
      points: "0,-7 7,5.5 -7,5.5",
      fill: POINTER,
      "stroke-linejoin": "round",
    },
    svg,
  );
  const txt = mk(
    "text",
    {
      x: CX,
      y: 101,
      "text-anchor": "middle",
      "dominant-baseline": "middle",
      style: `font-size:64px;font-weight:400;fill:${NUMBER};font-family:inherit;`,
    },
    svg,
  );
  txt.textContent = "0";

  const fo = mk(
    "foreignObject",
    { x: CX - 70, y: 125, width: 140, height: 30, overflow: "visible" },
    svg,
  );
  const wrap = document.createElement("div");
  wrap.style.cssText =
    "display:flex;align-items:center;justify-content:center;height:100%;";
  const badge = document.createElement("span");
  badge.textContent = label;
  badge.style.cssText =
    `display:inline-flex;align-items:center;background:${pal.fill};border:1px solid ${pal.border}` +
    `;color:${pal.tag};border-radius:9999px;padding:4px 8px;font-size:12px;font-weight:510;white-space:nowrap;line-height:16px;font-family:inherit;`;
  wrap.appendChild(badge);
  fo.appendChild(wrap);

  let t0: number | null = null;
  function anim(now: number): void {
    if (t0 === null) t0 = now;
    const raw = Math.min((now - t0) / DURATION, 1);
    const v = score * (1 - Math.pow(1 - raw, 4));
    if (v > 0.3) {
      const end = START + (v / max) * SWEEP;
      fl.setAttribute("d", sector(START, end, R_OUTER, R_INNER));
      fd.setAttribute("d", sector(START, end, R_OUTER, R_DARK));
      const p = polar(end, POINTER_R);
      const tf = `translate(${p[0]},${p[1]}) rotate(${end + 90})`;
      pw.setAttribute("transform", tf);
      pg.setAttribute("transform", tf);
      (pw as SVGElement).style.display = "";
      (pg as SVGElement).style.display = "";
    } else {
      fl.setAttribute("d", "");
      fd.setAttribute("d", "");
      (pw as SVGElement).style.display = "none";
      (pg as SVGElement).style.display = "none";
    }
    txt.textContent = String(Math.round(v));
    if (raw < 1) requestAnimationFrame(anim);
  }
  requestAnimationFrame(anim);
}

export function renderGauges(root: Document | HTMLElement): void {
  const scope: ParentNode = root;
  scope.querySelectorAll(".dv-di-gauge[data-score]").forEach(renderGauge);
}
