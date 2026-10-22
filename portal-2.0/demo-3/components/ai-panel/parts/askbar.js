/**
 * Collapsed floating ask bar (shown when chat panel is closed).
 */
(function (global) {
  "use strict";

  var ns = (global.D3AiPanel = global.D3AiPanel || {});
  var parts = (ns.parts = ns.parts || {});
  var util = ns.util;
  var icons = ns.icons;

  parts.askbar = function renderAskbar(cfg) {
    cfg = cfg || {};
    return (
      '<button type="button" class="d3-askbar" data-d3-askbar ' +
      'aria-controls="d3-chat-pane" aria-expanded="false" tabindex="-1">' +
      '<span class="d3-askbar__text" data-d3-askbar-text>' +
      util.esc(cfg.askbarText || "Ask about business verification") +
      "</span>" +
      '<span class="d3-askbar__send" aria-hidden="true">' +
      icons.send +
      "</span>" +
      "</button>"
    );
  };
})(typeof window !== "undefined" ? window : this);
