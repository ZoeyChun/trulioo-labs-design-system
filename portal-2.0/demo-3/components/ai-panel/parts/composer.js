/**
 * Idle pane composer — textarea input + action icon buttons.
 * Home composer parks here later; this is the empty-state form.
 */
(function (global) {
  "use strict";

  var ns = (global.D3AiPanel = global.D3AiPanel || {});
  var parts = (ns.parts = ns.parts || {});
  var util = ns.util;
  var icons = ns.icons;
  var iconBtn = function (opts) {
    return parts.iconBtn(opts);
  };

  parts.composer = function renderComposer(cfg) {
    cfg = cfg || {};
    var placeholder =
      cfg.placeholder || "Describe your task or ask about an agent";

    return (
      '<div class="d3-chat-pane__composer" data-d3-chat-composer>' +
      '<form class="d1-prompt d3-pane-idle-form" data-d3-pane-form action="#" method="post">' +
      '<div class="d1-prompt__field">' +
      '<textarea id="d3-pane-prompt" class="d1-prompt__input" data-d3-pane-input rows="1" placeholder="' +
      util.esc(placeholder) +
      '" aria-label="' +
      util.esc(placeholder) +
      '"></textarea>' +
      "</div>" +
      '<div class="d1-prompt__bar">' +
      iconBtn({
        icon: icons.plus,
        label: "Add attachment",
        className: "tds-icon-btn--invisible tds-icon-btn--circular",
        hidden: true,
      }) +
      '<div class="d1-prompt__actions">' +
      iconBtn({
        icon: icons.mic,
        label: "Voice input",
        className: "tds-icon-btn--invisible tds-icon-btn--circular",
      }) +
      iconBtn({
        icon: icons.send,
        label: "Send",
        type: "submit",
        className: "tds-icon-btn--secondary tds-icon-btn--circular",
      }) +
      "</div>" +
      "</div>" +
      "</form>" +
      '<p class="d1-composer__note">TRU AI can make mistakes. Please double-check responses.</p>' +
      "</div>"
    );
  };

  /* Voice input for the idle pane form: browser speech recognition when there is
     one, otherwise the same scripted line the home composer uses. */
  var FALLBACK_LINE = "Verify Acme Holdings in the United Kingdom.";
  var voice = { rec: null, timer: 0, btn: null };

  function voiceDone() {
    if (voice.timer) window.clearTimeout(voice.timer);
    voice.timer = 0;
    voice.rec = null;
    if (voice.btn) voice.btn.setAttribute("aria-pressed", "false");
    voice.btn = null;
  }

  function voiceText(input, text) {
    var next = (text || "").trim();
    if (!next) return;
    input.value = input.value.trim() ? input.value.replace(/\s+$/, "") + " " + next : next;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  }

  document.addEventListener("click", function (event) {
    var btn = event.target.closest && event.target.closest('.d3-pane-idle-form [aria-label="Voice input"]');
    if (!btn) return;
    var form = btn.closest("form");
    var input = form && form.querySelector("[data-d3-pane-input]");
    if (!input) return;
    if (voice.btn) {
      if (voice.rec) { try { voice.rec.abort(); } catch (e) { /* ended */ } }
      voiceDone();
      return;
    }
    voice.btn = btn;
    btn.setAttribute("aria-pressed", "true");
    var Speech = global.SpeechRecognition || global.webkitSpeechRecognition;
    var scripted = function () {
      voice.timer = global.setTimeout(function () {
        voiceText(input, FALLBACK_LINE);
        voiceDone();
      }, 700);
    };
    if (!Speech) { scripted(); return; }
    var heard = false;
    var rec = new Speech();
    voice.rec = rec;
    rec.lang = "en-US";
    rec.onresult = function (e) {
      heard = true;
      var t = "";
      for (var i = 0; i < e.results.length; i += 1) t += e.results[i][0].transcript;
      voiceText(input, t);
    };
    rec.onerror = function (e) {
      if (e && e.error === "aborted") return;
      var wasHeard = heard;
      voice.rec = null;
      if (!wasHeard) scripted(); else voiceDone();
    };
    rec.onend = function () { if (voice.rec === rec) voiceDone(); };
    try { rec.start(); } catch (e) { voice.rec = null; scripted(); }
  });
})(typeof window !== "undefined" ? window : this);
