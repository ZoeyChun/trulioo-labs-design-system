/**
 * Panel header — back / brand / expand / minimize (icon buttons).
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
      parts.iconBtn({
        icon: icons.back,
        label: cfg.backLabel || "Back to KYB Verification",
        className: "tds-icon-btn--invisible d3-chat-pane__back",
        hidden: true,
        attrs: { "data-d3-chat-back": true },
      }) +
      '<p class="d3-chat-pane__brand">' +
      util.esc(brand) +
      "</p>" +
      '<div class="d3-chat-pane__tools">' +
      parts.iconBtn({
        icon: icons.expand,
        label: cfg.expandLabel || "Expand chat to full canvas",
        className: "tds-icon-btn--invisible d3-chat-pane__expand",
        attrs: {
          "data-d3-chat-expand": true,
          "aria-pressed": "false",
        },
      }) +
      parts.iconBtn({
        icon: icons.close,
        label: cfg.closeLabel || "Minimize chat",
        className: "tds-icon-btn--invisible d3-chat-pane__close",
        attrs: { "data-d3-chat-close": true },
      }) +
      "</div>" +
      "</div>"
    );
  };
})(typeof window !== "undefined" ? window : this);
