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

  var ICON_POSITIVE = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6.5"/><path d="M5.5 8l1.8 1.8 3.2-3.6"/></svg>';
  var ICON_NEGATIVE = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6.5"/><path d="M5.8 5.8l4.4 4.4M10.2 5.8l-4.4 4.4"/></svg>';
  var ICON_INTERMEDIATE = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6.5"/><path d="M8 5v4M8 11h.01"/></svg>';
  var CARET_SVG = '<svg viewBox="0 0 8 11" fill="currentColor" aria-hidden="true"><path d="M4 0l3.5 4h-7L4 0z"/><path d="M4 11L.5 7h7L4 11z"/></svg>';

  function toneClass(tone) {
    return "tds-tag tds-tag--" + tone + " tds-tag--sm";
  }

  function statusClass(kind) {
    if (kind === "positive") return "dv-status dv-status--positive";
    if (kind === "negative") return "dv-status dv-status--negative";
    return "dv-status dv-status--intermediate";
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
    var cell = document.createElement("div");
    cell.className = "dv-table__detail-cell";

    if (!detail) {
      var dash = document.createElement("span");
      dash.className = "dv-cell-sub";
      dash.textContent = "—";
      cell.appendChild(dash);
      return cell;
    }

    var list = document.createElement("ul");
    list.className = "bv-field-detail";
    [
      { label: "Data Input:", value: detail.input },
      { label: "Data returned:", value: detail.returned || "—" }
    ].forEach(function (item) {
      var li = document.createElement("li");
      li.className = "bv-field-detail__item";
      var label = document.createElement("span");
      label.className = "bv-field-detail__label";
      label.textContent = item.label;
      var value = document.createElement("span");
      value.className = "bv-field-detail__value";
      value.textContent = item.value;
      li.appendChild(label);
      li.appendChild(document.createTextNode(" "));
      li.appendChild(value);
      list.appendChild(li);
    });
    cell.appendChild(list);
    return cell;
  }

  function renderResult(config) {
    document.getElementById("bv-result-title").textContent = config.displayName;

    var statusEl = document.getElementById("bv-result-status");
    statusEl.className = "tds-tag tds-tag--" + config.tone + " tds-tag--md";
    statusEl.textContent = config.match;

    shared.fillCountryMetaValue(document.getElementById("bv-result-country"), config.country);
    document.getElementById("bv-result-txn").textContent = config.transactionId;
    document.getElementById("bv-result-date").textContent = formatDate();

    var teBlock = document.getElementById("bv-result-te-block");
    var collapseTe = document.getElementById("bv-sidebar-collapse-te");
    var collapseScore = document.getElementById("bv-sidebar-collapse-score");
    if (config.testEntityMode && config.testEntity) {
      teBlock.hidden = false;
      if (collapseTe) collapseTe.hidden = false;
      if (collapseScore) collapseScore.hidden = true;
      renderResultTestEntity(config);
    } else {
      teBlock.hidden = true;
      if (collapseTe) collapseTe.hidden = true;
      if (collapseScore) collapseScore.hidden = false;
    }

    var gaugeEl = document.getElementById("bv-result-gauge");
    gaugeEl.setAttribute("data-score", String(config.score));
    gaugeEl.setAttribute("data-max", "100");
    gaugeEl.setAttribute("data-risk", config.risk);
    gaugeEl.setAttribute("data-label", config.match);
    gaugeEl.setAttribute("data-show-percent", "true");
    window.ScoreGauge.render(gaugeEl);
    document.getElementById("bv-result-truai").textContent = config.truAi;

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

    var matchCountEl = document.getElementById("bv-result-match-count");
    matchCountEl.className = "tds-tag tds-tag--" + config.tone + " tds-tag--sm";
    matchCountEl.textContent = config.matchCount + " Matches";

    var tbody = document.getElementById("bv-result-field-rows");
    tbody.innerHTML = "";
    config.fieldMatches.forEach(function (row) {
      var tr = document.createElement("div");
      tr.className = "dv-table__row";

      var signalCell = document.createElement("div");
      signalCell.className = "dv-table__text-cell";
      var signalTitle = document.createElement("span");
      signalTitle.className = "dv-cell-title";
      signalTitle.textContent = row.signal;
      signalCell.appendChild(signalTitle);

      var labelCell = document.createElement("div");
      labelCell.className = "dv-table__label-cell";
      labelCell.innerHTML =
        '<span class="' + statusClass(row.kind) + '">' +
        '<span class="dv-status__icon">' + statusIcon(row.kind) + '</span>' + row.result + '</span>';

      tr.appendChild(signalCell);
      tr.appendChild(renderFieldDetailCell(row.detail));
      tr.appendChild(labelCell);
      tbody.appendChild(tr);
    });

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
    trigger.className = "tds-select__trigger tds-select__trigger--lg dv-select-trigger bv-test-entity__trigger";
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

    document.querySelectorAll(".bv-result-shell .dv-sidebar-toggle--collapse").forEach(function (btn) {
      btn.addEventListener("click", function () {
        columns.classList.add("dv-columns--sidebar-collapsed");
      });
    });
    document.querySelector(".bv-result-shell .dv-sidebar-toggle--expand").addEventListener("click", function () {
      columns.classList.remove("dv-columns--sidebar-collapsed");
    });

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

    var editBtn = document.getElementById("bv-result-edit");
    if (editBtn) {
      editBtn.addEventListener("click", function (event) {
        event.preventDefault();
        goBackToForm();
      });
    }
  }

  window.BVResult = {
    showResult: showResult,
    goBackToForm: goBackToForm
  };

  document.addEventListener("DOMContentLoaded", bootResultPage);
})();
