import { spawn } from "node:child_process";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9357;
const URL = "http://localhost:8124/portal-2.0/demo-3/transactions-preview.html?v=46";
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${PORT}`, "--user-data-dir=/tmp/chrome-tx-date2",
  "--window-size=1440,900", URL
], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function waitForList() {
  for (let i = 0; i < 40; i++) {
    try {
      const list = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((r) => r.json());
      const page = list.find((t) => t.type === "page" && t.url.includes("transactions-preview.html"));
      if (page) return page;
    } catch (e) {}
    await sleep(250);
  }
  throw new Error("no page");
}
const page = await waitForList();
const ws = new WebSocket(page.webSocketDebuggerUrl);
let seq = 0; const pending = new Map();
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const p = pending.get(msg.id); pending.delete(msg.id);
    if (msg.error) p.reject(new Error(JSON.stringify(msg.error))); else p.resolve(msg.result);
  }
});
await new Promise((resolve, reject) => { ws.addEventListener("open", resolve); ws.addEventListener("error", reject); });
function send(method, params) {
  const id = ++seq;
  return new Promise((resolve, reject) => { pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
}
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
await send("Runtime.enable");
for (let i = 0; i < 40; i++) {
  const ok = await evaluate(`(() => !!document.querySelector("[data-d3-tx-frame]")?.contentDocument?.querySelector(".ut-tx-date .tds-date-picker__field"))()`);
  if (ok) break; await sleep(250);
}

const report = await evaluate(`(async () => {
  const frame = document.querySelector("[data-d3-tx-frame]");
  const doc = frame.contentDocument;
  const win = frame.contentWindow;
  const field = doc.querySelector(".ut-tx-date .tds-date-picker__field");
  const wrap = doc.querySelector(".ut-tx-date");
  field.click();
  await new Promise(r => setTimeout(r, 80));
  const cal = doc.querySelector("body > .tds-date-picker__calendar--floating")
    || doc.querySelector(".tds-date-picker__calendar:not([hidden])");
  const fr = field.getBoundingClientRect();
  const wr = wrap.getBoundingClientRect();
  const cr = cal.getBoundingClientRect();
  const frameRect = frame.getBoundingClientRect();
  // calendar content boxes
  const days = cal.querySelector(".tds-date-picker__days, .tds-date-picker__grid, [class*='day']");
  const nav = cal.querySelector(".tds-date-picker__nav, .tds-date-picker__header");
  const overflowAncestors = [];
  let n = cal.parentElement;
  while (n && n !== doc.documentElement) {
    const s = win.getComputedStyle(n);
    if (/hidden|clip|auto|scroll/.test(s.overflow + s.overflowX + s.overflowY)) {
      overflowAncestors.push({ tag: n.tagName, className: n.className?.toString?.().slice(0,80), overflow: s.overflow, overflowX: s.overflowX, overflowY: s.overflowY });
    }
    n = n.parentElement;
  }
  return {
    iframe: { w: Math.round(frameRect.width), h: Math.round(frameRect.height), left: Math.round(frameRect.left), right: Math.round(frameRect.right) },
    winInner: { w: win.innerWidth, h: win.innerHeight },
    field: { left: Math.round(fr.left), right: Math.round(fr.right), w: Math.round(fr.width) },
    wrap: { left: Math.round(wr.left), right: Math.round(wr.right), w: Math.round(wr.width) },
    cal: {
      left: Math.round(cr.left), right: Math.round(cr.right), top: Math.round(cr.top),
      w: Math.round(cr.width), h: Math.round(cr.height),
      cssLeft: cal.style.left, cssTop: cal.style.top,
      className: cal.className,
      parent: cal.parentElement?.tagName,
      hidden: cal.hidden,
      cutRight: Math.round(cr.right - win.innerWidth),
      cutRightFrame: Math.round(cr.right - frameRect.width),
    },
    overflowAncestors,
  };
})()`);
console.log(JSON.stringify(report, null, 2));
chrome.kill();
process.exit(0);
