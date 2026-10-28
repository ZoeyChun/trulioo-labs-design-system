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
        hidden: true,
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
})(typeof window !== "undefined" ? window : this);
