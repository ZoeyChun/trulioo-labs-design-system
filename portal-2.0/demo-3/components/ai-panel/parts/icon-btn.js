/**
 * TDS icon button — back / close / attach / mic / send.
 *
 * @param {object} opts
 * @param {string} opts.icon       SVG markup (from D3AiPanel.icons)
 * @param {string} [opts.label]    aria-label
 * @param {string} [opts.className]
 * @param {string} [opts.type]     button | submit
 * @param {boolean} [opts.hidden]
 * @param {object} [opts.attrs]    extra HTML attributes (data-*, aria-*)
 */
(function (global) {
  "use strict";

  var ns = (global.D3AiPanel = global.D3AiPanel || {});
  var parts = (ns.parts = ns.parts || {});
  var util = ns.util;

  parts.iconBtn = function renderIconBtn(opts) {
    opts = opts || {};
    var classes =
      "tds-icon-btn tds-icon-btn--sm " + (opts.className || "tds-icon-btn--invisible");
    var html =
      '<button type="' +
      util.esc(opts.type || "button") +
      '" class="' +
      util.esc(classes.trim()) +
      '"';

    if (opts.label) html += ' aria-label="' + util.esc(opts.label) + '"';
    if (opts.hidden) html += " hidden";

    var attrs = opts.attrs || {};
    Object.keys(attrs).forEach(function (key) {
      html += util.attr(key, attrs[key]);
    });

    html +=
      '><span class="tds-icon-btn__icon">' +
      (opts.icon || "") +
      "</span></button>";
    return html;
  };
})(typeof window !== "undefined" ? window : this);
