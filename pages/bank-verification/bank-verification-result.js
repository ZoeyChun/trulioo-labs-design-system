/* Bank Verification — result page (reference demo) */

(function () {
  "use strict";

  var shared = window.BVShared;
  var session = null;
  var teSelectOutsideListener = null;

  function closeResultTestEntitySelect() {
    var root = document.getElementById("bv-result-te-select");
    if (root) root.classList.remove("tds-select--open");
  }

  function unbindResultTestEntityOutsideClick() {
    if (teSelectOutsideListener) {
      document.removeEventListener("click", teSelectOutsideListener);
      teSelectOutsideListener = null;
    }
  }

  var ICON_POSITIVE = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 8.5 7 10l3.5-4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_NEGATIVE = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="m5.5 5.5 5 5M10.5 5.5l-5 5" stroke-linecap="round"/></svg>';
  var ICON_INTERMEDIATE = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M8 5.5v3.5" stroke-linecap="round"/><circle cx="8" cy="11.25" r=".6" fill="currentColor"/></svg>';
  var CARET_SVG = '<svg viewBox="0 0 8 11" fill="currentColor" aria-hidden="true"><path d="M4 0l3.5 4h-7L4 0z"/><path d="M4 11L.5 7h7L4 11z"/></svg>';

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function toneClass(tone) {
    return "tds-tag tds-tag--" + tone + " tds-tag--sm";
  }

  function renderHighlightField(row) {
    var valueHtml = row.kind === "tag"
      ? '<span class="' + toneClass(row.tone) + '">' + escapeHtml(row.value) + "</span>"
      : '<p class="tds-data-field__value' + (row.negative ? " tds-data-field__value--negative" : "") + '">' + escapeHtml(row.value) + "</p>";
    return '<div class="tds-data-field tds-data-field--horizontal">' +
      '<div class="tds-data-field__label-row"><p class="tds-data-field__label">' + escapeHtml(row.label) + "</p></div>" +
      '<div class="tds-data-field__content"><div class="tds-data-field__value-row">' + valueHtml + "</div></div>" +
      "</div>";
  }

  function renderAnnouncements(config) {
    var host = document.getElementById("bv-result-announcements");
    if (!host) return;

    var detailsVerified = !!config.accountDetailsVerified;
    var ownershipConfirmed = !!config.ownershipConfirmed;
    var variant = "success";
    var icon = ICON_POSITIVE;
    if (!detailsVerified) {
      variant = "error";
      icon = ICON_NEGATIVE;
    } else if (!ownershipConfirmed) {
      variant = "warning";
      icon = ICON_INTERMEDIATE;
    }

    host.innerHTML =
      '<div class="tds-announcement tds-announcement--' + variant + '" role="status">' +
        '<span class="tds-announcement__icon" aria-hidden="true">' + icon + "</span>" +
        '<div class="tds-announcement__content">' +
          '<p class="tds-announcement__title">' +
            escapeHtml(detailsVerified
              ? "Bank account details are verified"
              : "Bank account details could not be verified") +
          "</p>" +
          '<p class="tds-announcement__message">' +
            escapeHtml(ownershipConfirmed
              ? "Account ownership is confirmed."
              : "Account ownership is not confirmed.") +
          "</p>" +
        "</div>" +
      "</div>";
  }

  function renderHighlights(config) {
    var host = document.getElementById("bv-result-highlights");
    if (!host) return;
    var total = config.fieldMatches.length;
    var matched = config.matchCount;
    var failed = total - matched;
    var passRate = total === 0 ? 0 : Math.round((matched / total) * 100);
    host.innerHTML = [
      { label: "Fields checked", value: String(total) },
      { label: "Pass rate", value: passRate + "%" },
      { label: "Failed checks", value: String(failed), negative: failed > 0 }
    ].map(renderHighlightField).join("");
  }

  function signalsTone(kind) {
    if (kind === "positive") return "positive";
    if (kind === "negative") return "negative";
    return "intermediate";
  }

  function statusIcon(kind) {
    if (kind === "positive") return ICON_POSITIVE;
    if (kind === "negative") return ICON_NEGATIVE;
    return ICON_INTERMEDIATE;
  }

  function formatDate() {
    return new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  }

  function renderFieldDetailCell(detail) {
    var cell = document.createElement("td");
    cell.className = "tds-data-table__text-cell tds-data-table__text-cell--subtext";

    if (!detail) {
      var placeholder = document.createElement("span");
      placeholder.className = "tds-data-table__cell-placeholder";
      placeholder.textContent = "—";
      cell.appendChild(placeholder);
      return cell;
    }

    var stack = document.createElement("span");
    stack.className = "tds-data-table__cell-text-stack";

    var inputLine = document.createElement("span");
    inputLine.textContent = "Data Input: " + detail.input;

    var fileLine = document.createElement("span");
    fileLine.className = "tds-data-table__cell-subtext";
    fileLine.textContent = "Data on File: " + (detail.returned || "—");

    stack.appendChild(inputLine);
    stack.appendChild(fileLine);
    cell.appendChild(stack);
    return cell;
  }

  function renderResult(config) {
    document.getElementById("bv-result-title").textContent = config.displayName;

    shared.fillCountryMetaValue(
      document.getElementById("bv-result-country"),
      config.country,
      document.getElementById("bv-result-flag")
    );
    document.getElementById("bv-result-txn").textContent = config.transactionId;
    document.getElementById("bv-result-date").textContent = formatDate();

    var teBlock = document.getElementById("bv-result-te-block");
    var teDivider = document.getElementById("bv-result-te-divider");
    var showTe = !!(config.testEntityMode && config.testEntity);
    if (teBlock) teBlock.hidden = !showTe;
    if (teDivider) teDivider.hidden = !showTe;
    if (showTe) renderResultTestEntity(config);

    var gaugeEl = document.getElementById("bv-result-gauge");
    gaugeEl.setAttribute("data-score", String(config.score));
    gaugeEl.setAttribute("data-max", "100");
    gaugeEl.setAttribute("data-risk", config.risk);
    gaugeEl.setAttribute("data-label", config.match);
    gaugeEl.setAttribute("data-show-percent", "true");
    window.ScoreGauge.render(gaugeEl);
    document.getElementById("bv-result-truai").textContent = config.truAi;
    renderHighlights(config);
    renderAnnouncements(config);

    var appended = document.getElementById("bv-result-appended");
    appended.innerHTML = "";
    config.appended.forEach(function (row) {
      var div = document.createElement("div");
      div.className = "dv-detail-row";
      var label = document.createElement("span");
      label.className = "dv-detail-label";
      label.textContent = row.label;
      var val = document.createElement("span");
      val.className = "dv-detail-value";
      val.textContent = row.value;
      if (row.value && String(row.value).length > 16) {
        val.title = row.value;
      }
      div.appendChild(label);
      div.appendChild(val);
      appended.appendChild(div);
    });

    var tbody = document.getElementById("bv-result-field-rows");
    tbody.innerHTML = "";
    config.fieldMatches.forEach(function (row) {
      var tr = document.createElement("tr");

      var signalCell = document.createElement("td");
      signalCell.className = "tds-data-table__text-cell";
      var signalTitle = document.createElement("span");
      signalTitle.className = "tds-data-table__row-header";
      signalTitle.textContent = row.signal;
      signalCell.appendChild(signalTitle);

      var resultCell = document.createElement("td");
      var tone = signalsTone(row.kind);
      resultCell.innerHTML =
        '<span class="tds-data-table__signals tds-data-table__signals--' + tone + '">' +
          '<span class="tds-data-table__signals-icon" aria-hidden="true">' + statusIcon(row.kind) + "</span>" +
          escapeHtml(row.result) +
        "</span>";

      tr.appendChild(signalCell);
      tr.appendChild(renderFieldDetailCell(row.detail));
      tr.appendChild(resultCell);
      tbody.appendChild(tr);
    });

    var capabilityRows = document.getElementById("bv-result-capability-rows");
    if (capabilityRows) {
      capabilityRows.innerHTML = "";
      (config.paymentCapabilities || []).forEach(function (row) {
        var tr = document.createElement("tr");

        var signalCell = document.createElement("td");
        signalCell.className = "tds-data-table__text-cell";
        var signalTitle = document.createElement("span");
        signalTitle.className = "tds-data-table__row-header";
        signalTitle.textContent = row.signal;
        signalCell.appendChild(signalTitle);

        var resultCell = document.createElement("td");
        var tone = signalsTone(row.kind);
        resultCell.innerHTML =
          '<span class="tds-data-table__signals tds-data-table__signals--' + tone + '">' +
            '<span class="tds-data-table__signals-icon" aria-hidden="true">' + statusIcon(row.kind) + "</span>" +
            escapeHtml(row.result) +
          "</span>";

        tr.appendChild(signalCell);
        tr.appendChild(resultCell);
        capabilityRows.appendChild(tr);
      });
    }

    var pre = document.getElementById("bv-result-raw");
    pre.textContent = JSON.stringify(config.raw, null, 2);
    pre.classList.remove("bv-raw-panel__pre--expanded");
    document.getElementById("bv-result-raw-expand").innerHTML =
      '<span class="tds-btn__leading-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3v10M3 8h10"/></svg></span>Expand all';
  }

  function renderResultTestEntity(config) {
    var root = document.getElementById("bv-result-te-select");
    unbindResultTestEntityOutsideClick();
    closeResultTestEntitySelect();
    root.innerHTML = "";
    var entities = shared.TEST_ENTITIES[config.accountType];
    var current = config.testEntity;
    var currentIndex = config.testEntityIndex;

    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "tds-select__trigger tds-select__trigger--sm dv-select-trigger dv-te-trigger bv-test-entity__trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");

    var flag = document.createElement("span");
    flag.className = "tds-select__country-flag bv-test-entity__flag";
    if (current) {
      shared.setFlagElement(flag, current.country);
    } else {
      flag.hidden = true;
    }

    var textWrap = document.createElement("span");
    textWrap.className = "tds-select__text-wrapper";
    shared.fillTestEntityTriggerContent(trigger, textWrap, current);
    var valueEl = textWrap.querySelector(".tds-select__value");
    if (valueEl) valueEl.classList.add("dv-te-value");

    var trailing = document.createElement("span");
    trailing.className = "tds-select__trailing-group";
    if (current) {
      var tag = document.createElement("span");
      tag.className = toneClass(current.tone);
      tag.textContent = current.match;
      trailing.appendChild(tag);
    }
    var caret = document.createElement("span");
    caret.className = "tds-caret tds-caret--default";
    caret.setAttribute("aria-hidden", "true");
    caret.innerHTML = CARET_SVG;
    trailing.appendChild(caret);

    trigger.appendChild(flag);
    trigger.appendChild(textWrap);
    trigger.appendChild(trailing);

    var menu = document.createElement("div");
    menu.className = "tds-select__menu";
    var panel = document.createElement("div");
    panel.className = "tds-dropdown-panel";

    shared.sortedEntityEntries(entities, currentIndex).forEach(function (entry) {
      panel.appendChild(shared.buildTestEntityOption(entry.ent, entry.index, currentIndex === entry.index, function (i) {
        closeResultTestEntitySelect();
        session = shared.applyTestEntityToSession(session, i);
        renderPage();
      }));
    });
    menu.appendChild(panel);
    root.appendChild(trigger);
    root.appendChild(menu);

    trigger.addEventListener("click", function () {
      var open = root.classList.toggle("tds-select--open");
      trigger.setAttribute("aria-expanded", String(open));
    });
    teSelectOutsideListener = function (e) {
      if (!root.contains(e.target)) {
        closeResultTestEntitySelect();
        trigger.setAttribute("aria-expanded", "false");
      }
    };
    document.addEventListener("click", teSelectOutsideListener);
  }

  function goBackToForm() {
    var current = shared.loadSession();
    if (current) {
      current.view = "form";
      shared.saveSession(current);
    }
    shared.showFormView();
    if (window.BankVerification && window.BankVerification.resetFormToDefault) {
      window.BankVerification.resetFormToDefault();
    }
    window.scrollTo(0, 0);
  }

  function wireInteractions() {
    var columns = document.getElementById("bv-result-columns");
    var collapseBtn = document.querySelector(".bv-result-shell .dv-sidebar-toggle--collapse");
    var expandBtn = document.querySelector(".bv-result-shell .dv-sidebar-toggle--expand");

    function setSidebarCollapsed(collapsed) {
      if (columns) columns.classList.toggle("dv-columns--sidebar-collapsed", collapsed);
      if (collapseBtn) collapseBtn.setAttribute("aria-expanded", String(!collapsed));
      if (expandBtn) expandBtn.setAttribute("aria-expanded", String(collapsed));
    }

    if (collapseBtn) collapseBtn.addEventListener("click", function () { setSidebarCollapsed(true); });
    if (expandBtn) expandBtn.addEventListener("click", function () { setSidebarCollapsed(false); });

    document.querySelectorAll(".bv-result-shell .dv-collapsible__header").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        btn.parentElement.classList.toggle("dv-collapsible--open", !open);
        var body = btn.parentElement.querySelector(".dv-collapsible__body");
        if (body) body.hidden = open;
      });
    });

    document.getElementById("bv-result-raw-copy").addEventListener("click", function () {
      navigator.clipboard.writeText(document.getElementById("bv-result-raw").textContent).catch(function () {});
    });

    document.getElementById("bv-result-raw-expand").addEventListener("click", function () {
      var pre = document.getElementById("bv-result-raw");
      var expanded = pre.classList.toggle("bv-raw-panel__pre--expanded");
      this.innerHTML = expanded
        ? '<span class="tds-btn__leading-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8h10"/></svg></span>Collapse'
        : '<span class="tds-btn__leading-icon"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3v10M3 8h10"/></svg></span>Expand all';
    });
  }

  function renderPage() {
    renderResult(shared.buildResultConfig(session));
    window.scrollTo(0, 0);
  }

  function showResult(fromSession) {
    session = fromSession || shared.loadSession();
    if (!session || !session.state) return false;
    session.view = "result";
    shared.saveSession(session);
    shared.showResultView();
    renderPage();
    return true;
  }

  function bootResultPage() {
    var resultView = document.getElementById("bv-result-view");
    if (!resultView) {
      if (shared.loadSession()) {
        window.location.replace("index.html#result");
      } else {
        window.location.replace("index.html");
      }
      return;
    }

    wireInteractions();

    var backBtn = document.getElementById("bv-result-back-btn");
    if (backBtn) backBtn.addEventListener("click", goBackToForm);
  }

  window.BVResult = {
    showResult: showResult,
    goBackToForm: goBackToForm
  };

  document.addEventListener("DOMContentLoaded", bootResultPage);
})();
