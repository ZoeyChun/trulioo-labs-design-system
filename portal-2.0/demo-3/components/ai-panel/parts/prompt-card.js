/**
 * Empty-state suggestion cards (prompt sets).
 */
(function (global) {
  "use strict";

  var ns = (global.D3AiPanel = global.D3AiPanel || {});
  var parts = (ns.parts = ns.parts || {});
  var util = ns.util;
  var icons = ns.icons;

  parts.promptCard = function renderPromptCard(item) {
    item = item || {};
    return (
      '<button type="button" class="d3-prompt-card" data-d3-prompt="' +
      util.esc(item.prompt) +
      '" data-agent="' +
      util.esc(item.agent) +
      '">' +
      '<span class="d3-prompt-card__text">' +
      '<span class="d3-prompt-card__title">' +
      util.esc(item.title) +
      "</span>" +
      '<span class="d3-prompt-card__desc">' +
      util.esc(item.desc) +
      "</span>" +
      "</span>" +
      '<span class="d3-prompt-card__arrow" aria-hidden="true">' +
      icons.arrow +
      "</span>" +
      "</button>"
    );
  };

  parts.promptSet = function renderPromptSet(key, items, hidden) {
    return (
      '<div class="d3-chat-pane__prompts" data-d3-prompt-set="' +
      util.esc(key) +
      '"' +
      (hidden ? " hidden" : "") +
      ">" +
      (items || []).map(parts.promptCard).join("") +
      "</div>"
    );
  };

  parts.promptSets = function renderPromptSets(sets, order, activeKey) {
    sets = sets || {};
    order = order || Object.keys(sets);
    activeKey = activeKey || "hub";
    return order
      .map(function (key) {
        var items = sets[key];
        if (!items) return "";
        return parts.promptSet(key, items, key !== activeKey);
      })
      .join("");
  };
})(typeof window !== "undefined" ? window : this);
