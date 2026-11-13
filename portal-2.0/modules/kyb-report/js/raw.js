/* Raw Data dialog fill + open — port of Demo 3 reveal helpers. */
(function (global) {
  "use strict";

  function formalBusinessName(name) {
    var n = String(name || "Business").trim();
    if (/\b(llc|ltd|inc|corp|limited|incorporated)\b/i.test(n)) return n;
    return n + " LLC";
  }

  function emailDomainFromBiz(biz) {
    var slug = String(biz.name || "business")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 28);
    return (slug || "business") + ".com";
  }

  function buildRawJsonText(biz) {
    var name = biz.name || "Business";
    var registered = formalBusinessName(name);
    var phone =
      (biz.report && biz.report.phone) || biz.phone || "+1 302 555 0000";
    var email =
      (biz.report && biz.report.email) ||
      biz.email ||
      "info@" + emailDomainFromBiz(biz);
    var block =
      "{\n" +
      '  "StandardizedBusinessNames": { "StandardizedBusinessName": [\n' +
      '    { "Name": ' +
      JSON.stringify(name) +
      ', "Type": "Input Business Name", "UsedForMatching": true },\n' +
      '    { "Name": ' +
      JSON.stringify(registered) +
      ', "Type": "Returned Registered Name", "UsedForMatching": true }\n' +
      "  ]},\n" +
      '  "StandardizedCommunication": { "StandardizedCommunication": [\n' +
      '    { "Value": ' +
      JSON.stringify(phone) +
      ', "Type": "Telephone" },\n' +
      '    { "Value": ' +
      JSON.stringify(email) +
      ', "Type": "Primary business email" }\n' +
      "  ]}\n" +
      "}";
    return [block, block, block, block, block].join("\n\n");
  }

  function bindRawCopy(root) {
    var btn = root.querySelector("[data-d3-kyb-json-copy]");
    if (!btn || btn.dataset.krBound) return;
    btn.dataset.krBound = "1";
    btn.addEventListener("click", function () {
      var pre = root.querySelector("[data-d3-kyb-raw-pre]");
      if (!pre) return;
      var text = pre.textContent || "";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function () {});
        return;
      }
      var field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      try {
        document.execCommand("copy");
      } catch (e) {
        /* ignore */
      }
      document.body.removeChild(field);
    });
  }

  function fill(root, biz) {
    if (!root || !biz) return;
    var pre = root.querySelector("[data-d3-kyb-raw-pre]");
    if (pre) pre.textContent = buildRawJsonText(biz);
    bindRawCopy(root);
  }

  function open(biz) {
    if (global.KybReportDialogs) global.KybReportDialogs.ensure();
    var dialog = document.getElementById("d3-kyb-raw-dialog");
    fill(dialog, biz);
    if (typeof global.openTdsDialog === "function") {
      global.openTdsDialog("d3-kyb-raw-dialog");
    }
  }

  function bind(card, biz) {
    if (!card) return;
    card.querySelectorAll("[data-d3-kyb-view-raw], [data-d3-kyb-raw-action]").forEach(function (btn) {
      if (btn.dataset.krRawBound) return;
      btn.dataset.krRawBound = "1";
      btn.hidden = false;
      btn.removeAttribute("hidden");
      btn.addEventListener("click", function () {
        open(biz);
      });
    });
  }

  global.KybReportRaw = {
    fill: fill,
    open: open,
    bind: bind,
    buildRawJsonText: buildRawJsonText
  };
})(typeof window !== "undefined" ? window : globalThis);
