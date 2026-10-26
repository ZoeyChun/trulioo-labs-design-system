/**
 * Panel header — brand / new chat / expand / minimize (icon buttons).
 */
(function (global) {
  "use strict";

  var ns = (global.D3AiPanel = global.D3AiPanel || {});
  var parts = (ns.parts = ns.parts || {});
  var util = ns.util;
  var icons = ns.icons;

  parts.header = function renderHeader(cfg) {
    cfg = cfg || {};
    var brand = cfg.brand || "TruAI";

    return (
      '<div class="d3-chat-pane__head">' +
      '<p class="d3-chat-pane__brand">' +
      util.esc(brand) +
      "</p>" +
      '<div class="d3-chat-pane__tools">' +
      parts.iconBtn({
        icon: icons.newChat,
        label: cfg.newChatLabel || "New Chat",
        className: "tds-icon-btn--invisible tds-icon-btn--circular d3-chat-pane__new",
        hidden: true,
        /* data-d3-chat-back is the visibility hook: treatments.js / d3-kyb-resume.js
           show it once a thread is under way and hide it on the empty landing. */
        attrs: {
          "data-tooltip": cfg.newChatLabel || "New Chat",
          "data-d3-chat-new": true,
          "data-d3-chat-back": true,
        },
      }) +
      parts.iconBtn({
        icon: icons.expand,
        label: cfg.expandLabel || "Expand",
        className: "tds-icon-btn--invisible tds-icon-btn--circular d3-chat-pane__expand",
        attrs: {
          "data-tooltip": cfg.expandLabel || "Expand",
          "data-d3-chat-expand": true,
          "aria-pressed": "false",
        },
      }) +
      parts.iconBtn({
        icon: icons.minimize,
        label: cfg.closeLabel || "Minimize",
        className: "tds-icon-btn--invisible d3-chat-pane__close",
        attrs: { "data-d3-chat-close": true, "data-tooltip": cfg.closeLabel || "Minimize" },
      }) +
      "</div>" +
      "</div>"
    );
  };
})(typeof window !== "undefined" ? window : this);
