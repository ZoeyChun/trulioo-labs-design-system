/**
 * Shared helpers for AI panel parts.
 */
(function (global) {
  "use strict";

  var ns = (global.D3AiPanel = global.D3AiPanel || {});
  var util = (ns.util = ns.util || {});

  util.esc = function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  util.attr = function attr(name, value) {
    if (value == null || value === false) return "";
    if (value === true) return " " + name;
    return " " + name + '="' + util.esc(value) + '"';
  };
})(typeof window !== "undefined" ? window : this);
