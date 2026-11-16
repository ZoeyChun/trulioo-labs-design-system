/* Demo 3 — the result summary in the chat.

   The report-ready card in the AI chat carries a short summary of the result under its header: the verdict, which
   checks reported and which are still unresolved, one line on field signals, and the transaction ID with Copy.
   One card, so nothing repeats: the name and the verdict appear once (the heading and tag above it are hidden), and the
   detail (every field signal, every tab) stays in the workspace, which the View button opens.

   It reads the same data the report view shows, so the two cannot drift apart. */
(function () {
  "use strict";

  var thread = document.querySelector("[data-d1-thread]");
  var S = window.D3KybSession;
  if (!thread) return;

  var CHECK = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var OPEN = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="4.75" stroke="currentColor" stroke-width="1.5"/></svg>';

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function chip(label, done) {
    return '<span class="d3-rc__chip' + (done ? " is-done" : "") + '"><span class="d3-rc__chip-icon">' + (done ? CHECK : OPEN) + "</span>" + esc(label) + "</span>";
  }

  function row(label, chips) {
    return '<div class="d3-rc__row"><span class="d3-rc__label text-label-sm-uppercase">' + esc(label) + "</span><span class=\"d3-rc__chips\">" + chips + "</span></div>";
  }

  /* Which checks a normal report holds, from the package. */
  function reportedChecks() {
    var st = S ? S.get() : null;
    var pkg = st ? st.package : "insights";
    var addons = st ? st.addons : [];
    var allowed = function (tab) { return !S || S.tabAllowed(pkg, tab, addons); };
    var list = ["Business registry"];
    if (allowed("signals")) list.push("Screening");
    if (allowed("ownership")) list.push("Ownership");
    if (allowed("web")) list.push("Web insights");
    return list;
  }

  function bodyHtml(opts) {
    var checks = row("Checks reported", opts.reported.map(function (l) { return chip(l, true); }).join(""));
    if (opts.unresolved.length) checks += row("Unresolved", opts.unresolved.map(function (l) { return chip(l, false); }).join(""));
    return (
      '<div class="d3-rc__verdict" data-d3-rc-verdict>' + (opts.verdictHtml || "") + "</div>" +
      /* Business Risk Horizon score: shown only when the report has one. */
      '<div class="d3-rc__row d3-rc__score" data-d3-rc-score hidden></div>' +
      '<div class="d3-rc__checks">' + checks + "</div>" +
      '<div class="d3-rc__receipt"><span class="d3-rc__receipt-label">Transaction ID</span>' +
      '<code class="d3-rc__receipt-id" data-d3-rc-id>' + esc(opts.txId || "") + "</code>" +
      '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm" data-d3-rc-copy>Copy</button></div>'
    );
  }

  /* The verdict and the flagged count are read from the report view once it has painted. */
  function readReport() {
    var res = document.querySelector("[data-d3-kyb-resume]");
    if (!res) return null;
    var tag = res.querySelector(".d3-workspace__biz .d1-tag");
    var bullets = res.querySelector(".d3h-bullets");
    var tx = res.querySelector("[data-d3-kyb-detail-txid]");
    if (!tag || !bullets || !tag.textContent.trim() || /verifying/i.test(tag.textContent)) return null;
    var m = bullets.textContent.match(/(\d+)\s+of\s+(\d+)\s+(?:verification\s+)?signals/i);
    var gauge = res.querySelector(".d3h-hero__gauge[data-score]");
    var title = res.querySelector(".d3h-hero__verdict .d3h-card__title--hero");
    var tone = title ? (String(title.className).match(/d3h-card__title--(negative|intermediate|positive)/) || [])[1] : "";
    return {
      score: gauge ? gauge.getAttribute("data-score") : "",
      riskTitle: title && gauge ? title.textContent.trim() : "",
      riskTone: tone || "",
      tagClass: tag.className,
      tagText: tag.textContent.trim(),
      flagged: m ? m[1] : "",
      total: m ? m[2] : "",
      txId: tx ? tx.textContent.trim() : ""
    };
  }

  function enhanceReady(card) {
    var data = null;
    var tries = 0;
    var body = document.createElement("div");
    body.className = "d3-rc__body";
    body.innerHTML = bodyHtml({ reported: reportedChecks(), unresolved: [], txId: "" });
    (card.querySelector(".d1-report-ready__card") || card).appendChild(body);
    function fill() {
      data = readReport();
      if (!data && tries < 20) {
        tries += 1;
        window.setTimeout(fill, 300);
        return;
      }
      if (!data) return;
      var v = body.querySelector("[data-d3-rc-verdict]");
      var tone = String(data.tagClass).replace(/.*d1-tag--/, "d1-tag d1-tag--").split(" ").slice(0, 2).join(" ");
      v.innerHTML = '<span class="' + esc(tone) + '">' + esc(data.tagText) + "</span>" +
        (data.flagged ? '<span class="d3-rc__flag">' + esc(data.flagged) + " of " + esc(data.total) + " signals flagged</span>" : "");
      var sc = body.querySelector("[data-d3-rc-score]");
      if (sc && data.score) {
        sc.innerHTML =
          '<span class="d3-rc__label text-label-sm-uppercase">Business Risk Horizon Score</span>' +
          '<span class="d3-rc__scoreval"><b class="d3-rc__score-num">' + esc(data.score) + "</b>" +
          '<span class="d3-rc__score-label d3-rc__score-label--' + esc(data.riskTone) + '">' + esc(data.riskTitle) + "</span></span>";
        sc.hidden = false;
      }
      var id = body.querySelector("[data-d3-rc-id]");
      if (id && data.txId) id.textContent = data.txId;
    }
    fill();
  }

  function enhancePending(card) {
    var ref = card.parentNode && card.parentNode.getAttribute("data-d3-pending-msg");
    var job = window.D3KybPending && window.D3KybPending.job(ref);
    var body = document.createElement("div");
    body.className = "d3-rc__body";
    body.innerHTML = bodyHtml({
      reported: ["Business registry"],
      unresolved: ["Screening", "Adverse media", "Ownership"],
      txId: job ? job.ref : ref || "",
      verdictHtml: '<span class="d1-tag d1-tag--review">In Progress</span><span class="d3-rc__flag">Up to 24 hours</span>'
    });
    (card.querySelector(".d1-report-ready__card") || card).appendChild(body);
  }

  function enhance(node) {
    if (!node.querySelector) return;
    var card = node.matches && node.matches(".d1-report-ready") ? node : node.querySelector(".d1-report-ready");
    if (!card || card.hasAttribute("data-d3-rc")) return;
    card.setAttribute("data-d3-rc", "");
    if (card.parentNode && card.parentNode.hasAttribute("data-d3-pending-msg")) enhancePending(card);
    else enhanceReady(card);
  }

  new MutationObserver(function (list) {
    list.forEach(function (m) {
      Array.prototype.forEach.call(m.addedNodes, function (n) {
        if (n.nodeType === 1) enhance(n);
      });
    });
  }).observe(thread, { childList: true });

  document.addEventListener("click", function (event) {
    var btn = event.target.closest && event.target.closest("[data-d3-rc-copy]");
    if (!btn) return;
    var id = btn.closest(".d3-rc__receipt").querySelector("[data-d3-rc-id]");
    var text = id ? id.textContent : "";
    try {
      if (navigator.clipboard) navigator.clipboard.writeText(text);
    } catch (e) { /* the demo does not depend on it */ }
    btn.textContent = "Copied";
    window.setTimeout(function () { btn.textContent = "Copy"; }, 1600);
  });
})();
