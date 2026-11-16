import { spawn } from "node:child_process";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9356;
const URL = "http://localhost:8124/portal-2.0/demo-3/transactions-preview.html?v=46";
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${PORT}`, "--user-data-dir=/tmp/chrome-tx-fade",
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
  const ok = await evaluate(`(() => !!document.querySelector("[data-d3-tx-frame]")?.contentDocument?.querySelector(".ut-tx-table-scroll"))()`);
  if (ok) break; await sleep(250);
}

const report = await evaluate(`(async () => {
  const doc = document.querySelector("[data-d3-tx-frame]").contentDocument;
  const win = document.querySelector("[data-d3-tx-frame]").contentWindow;
  const scroll = doc.querySelector(".ut-tx-table-scroll");
  const wrap = doc.querySelector(".tds-data-table__wrapper");
  const quick = doc.querySelector(".ut-tx-quick");
  const toolbar = doc.querySelector(".ut-tx-toolbar");
  await new Promise(r => setTimeout(r, 80));
  const csScroll = win.getComputedStyle(scroll);
  const fadeOpacity = win.getComputedStyle(scroll, "::after").opacity;
  const fadeBlur = win.getComputedStyle(scroll, "::after").backdropFilter
    || win.getComputedStyle(scroll, "::after").webkitBackdropFilter;
  const fadeZ = win.getComputedStyle(scroll, "::after").zIndex;
  const quickZ = win.getComputedStyle(quick).zIndex;
  const toolbarZ = win.getComputedStyle(toolbar).zIndex;
  const scrollZ = csScroll.zIndex;
  const isolation = csScroll.isolation;
  // open outcome menu over the table
  const btn = doc.querySelector('[data-quick="outcome"] .ut-tx-quick__btn');
  btn.click();
  await new Promise(r => setTimeout(r, 40));
  const menu = doc.querySelector('[data-quick="outcome"] .ut-tx-quick__menu');
  const menuZ = win.getComputedStyle(menu).zIndex;
  const menuRect = menu.getBoundingClientRect();
  const fadeRight = scroll.getBoundingClientRect().right;
  const fadeLeft = fadeRight - 56;
  const overlapsFade = menuRect.bottom > scroll.getBoundingClientRect().top
    && menuRect.right > fadeLeft && menuRect.left < fadeRight;
  // scroll to end
  wrap.scrollLeft = wrap.scrollWidth;
  wrap.dispatchEvent(new Event("scroll"));
  await new Promise(r => setTimeout(r, 40));
  const atEndOpacity = win.getComputedStyle(scroll, "::after").opacity;
  const atEndBlur = win.getComputedStyle(scroll, "::after").backdropFilter
    || win.getComputedStyle(scroll, "::after").webkitBackdropFilter;
  const atEndClass = scroll.className;
  // back to start
  wrap.scrollLeft = 0;
  wrap.dispatchEvent(new Event("scroll"));
  await new Promise(r => setTimeout(r, 40));
  return {
    hasHScroll: scroll.classList.contains("has-h-scroll"),
    isAtEndStart: scroll.classList.contains("is-at-end"),
    fadeOpacity,
    fadeBlur,
    fadeZ,
    scrollZ,
    isolation,
    toolbarZ,
    quickZ,
    menuZ,
    overlapsFade,
    atEnd: { className: atEndClass, opacity: atEndOpacity, blur: atEndBlur },
    overflow: wrap.scrollWidth - wrap.clientWidth,
  };
})()`);
console.log(JSON.stringify(report, null, 2));
chrome.kill();
process.exit(0);
