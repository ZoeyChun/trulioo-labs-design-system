/* Verification Report Module — Demo 3–shaped shell (uses Demo 3 CSS classes)
 *
 * Integration unit (what other flows/designs embed):
 *   article.d3-workspace__card.d3-kyb-resume.is-live[data-vrm-report]
 *   → identity (title, Verified, Details/Export, meta) + tabs + tab panels
 *
 * Recipe:
 *   1. Leave an empty host node in your layout (chat/workspace/detail pane).
 *   2. VerificationReport.mount(host, { product: "kyb", data, onAction })
 *   3. update(host, { data }) / destroy(host) as the flow progresses.
 */
(function (global) {
  "use strict";

  var STORE = typeof WeakMap !== "undefined" ? new WeakMap() : null;
  var products = Object.create(null);
  var uidSeq = 0;

  function nextUid() {
    uidSeq += 1;
    return "vrm-" + uidSeq + "-" + Date.now().toString(36);
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getState(container) {
    if (!container) return null;
    if (STORE) return STORE.get(container) || null;
    return container.__vrmState || null;
  }

  function setState(container, state) {
    if (!container) return;
    if (STORE) STORE.set(container, state);
    else container.__vrmState = state;
  }

  function clearState(container) {
    if (!container) return;
    if (STORE) STORE.delete(container);
    else delete container.__vrmState;
  }

  function register(id, adapter) {
    if (!id || !adapter) return;
    products[String(id)] = adapter;
  }

  function resolveAdapter(productId) {
    return products[productId] || products.stub || null;
  }

  function filterTabs(tabs, allowlist) {
    if (!Array.isArray(tabs)) return [];
    if (!allowlist || !allowlist.length) return tabs.slice();
    var set = {};
    allowlist.forEach(function (id) {
      set[id] = true;
    });
    return tabs.filter(function (tab) {
      return set[tab.id];
    });
  }

  function tagHtml(tag) {
    var tone = tag.tone === "negative" ? "negative" : tag.tone === "review" ? "review" : "positive";
    var icon = tag.icon || "";
    return (
      '<span class="d1-tag d1-tag--' +
      esc(tone) +
      '">' +
      icon +
      esc(tag.label || "") +
      "</span>"
    );
  }

  function metaHtml(fields) {
    if (!fields || !fields.length) return "";
    var parts = [];
    fields.forEach(function (field, i) {
      if (i) parts.push('<div class="d3-workspace__meta-divider" aria-hidden="true"></div>');
      var flag = field.flagSrc
        ? '<img class="d3-workspace__flag" src="' +
          esc(field.flagSrc) +
          '" alt="" width="18" height="12">'
        : "";
      parts.push(
        "<div><dt>" +
          esc(field.label || "") +
          '</dt><dd title="' +
          esc(field.title || field.value || "") +
          '">' +
          esc(field.value || "") +
          flag +
          "</dd></div>"
      );
    });
    return (
      '<dl class="d3-workspace__meta" data-d3-kyb-meta-inline>' + parts.join("") + "</dl>"
    );
  }

  function actionsHtml(actions) {
    if (!actions || !actions.length) return "";
    return (
      '<div class="d3-workspace__biz-actions">' +
      actions
        .map(function (action) {
          return (
            '<button type="button" class="tds-btn tds-btn--secondary tds-btn--sm" data-vrm-action="' +
            esc(action.id) +
            '">' +
            (action.icon
              ? '<span class="tds-btn__leading-icon" aria-hidden="true">' +
                action.icon +
                "</span>"
              : "") +
            esc(action.label || action.id) +
            "</button>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function dialogsHtml(ids) {
    return (
      '<div class="tds-dialog tds-dialog--center tds-dialog--lg tds-dialog--scoped d3-kyb-raw-dialog vrm-dialog" id="' +
      esc(ids.raw) +
      '" hidden>' +
      '<div class="tds-dialog__backdrop">' +
      '<div class="tds-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="' +
      esc(ids.rawTitle) +
      '" tabindex="-1">' +
      '<header class="tds-dialog__header"><div class="tds-dialog__header-row">' +
      '<h2 class="tds-dialog__title" id="' +
      esc(ids.rawTitle) +
      '">Raw Data</h2>' +
      '<button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--md tds-dialog__dismiss" aria-label="Dismiss dialog">' +
      '<span class="tds-icon-btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4 4 12"/></svg></span>' +
      "</button></div>" +
      '<div class="tds-dialog__divider" role="presentation"></div></header>' +
      '<div class="tds-dialog__body">' +
      '<div class="kyb-json-panel d3-kyb-raw-dialog__panel">' +
      '<div class="kyb-json-panel__header">' +
      '<span class="kyb-json-panel__lang">json</span>' +
      '<button class="tds-btn tds-btn--secondary tds-btn--sm" type="button" data-vrm-json-copy aria-label="Copy raw JSON">' +
      '<span class="tds-btn__leading-icon" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="5.5" y="5.5" width="8" height="8" rx="1"/><path d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5"/></svg></span>' +
      "Copy</button></div>" +
      '<div class="kyb-json-panel__body"><pre class="kyb-json-panel__pre" data-vrm-raw-pre></pre></div>' +
      "</div></div></div></div></div>"
    );
  }

  function shellHtml(view, ids) {
    var tags = (view.tags || []).map(tagHtml).join("");
    var meta = metaHtml(view.meta);
    return (
      '<div class="vrm-host d3-workspace" data-d3-kyb-surface="report" data-vrm-product="' +
      esc(view.product) +
      '" data-vrm-raw-id="' +
      esc(ids.raw) +
      '">' +
      '<article class="d3-workspace__card d3-kyb-resume is-live" data-vrm-report>' +
      '<div class="d3-kyb-resume__body">' +
      '<div class="d3-kyb-resume__identity">' +
      '<div class="d3-workspace__biz-row">' +
      '<div class="d3-workspace__biz">' +
      '<h2 class="d3-workspace__biz-name">' +
      esc(view.title || "Verification report") +
      "</h2>" +
      tags +
      "</div>" +
      actionsHtml(view.actions) +
      "</div>" +
      meta +
      "</div>" +
      '<div class="d3-kyb-tabs" role="tablist" aria-label="Verification sections" data-vrm-tabs></div>' +
      '<div class="vrm-panels" data-vrm-panels></div>' +
      "</div></article>" +
      dialogsHtml(ids) +
      "</div>"
    );
  }

  function openDialog(id) {
    if (!id) return;
    if (typeof global.openTdsDialog === "function") {
      global.openTdsDialog(id);
      return;
    }
    var dialog = document.getElementById(id);
    if (!dialog) return;
    dialog.hidden = false;
    dialog.classList.add("tds-dialog--open");
  }

  function fillRawDialog(root, adapter, data) {
    var pre = root.querySelector("[data-vrm-raw-pre]");
    if (!pre) return;
    var text =
      adapter && typeof adapter.buildRawJson === "function"
        ? adapter.buildRawJson(data)
        : JSON.stringify(data || {}, null, 2);
    pre.textContent = text;
    var copyBtn = root.querySelector("[data-vrm-json-copy]");
    if (copyBtn && !copyBtn.dataset.vrmBound) {
      copyBtn.dataset.vrmBound = "1";
      copyBtn.addEventListener("click", function () {
        var payload = pre.textContent || "";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(payload).catch(function () {});
          return;
        }
        var field = document.createElement("textarea");
        field.value = payload;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.left = "-9999px";
        document.body.appendChild(field);
        field.select();
        try {
          document.execCommand("copy");
        } catch (e) {
          /* ignore */
        }
        document.body.removeChild(field);
      });
    }
  }

  function renderTabs(root, tabs, activeTab) {
    var list = root.querySelector("[data-vrm-tabs]");
    if (!list) return;
    list.innerHTML = tabs
      .map(function (tab) {
        var on = tab.id === activeTab;
        return (
          '<button type="button" class="d3-kyb-tabs__item' +
          (on ? " is-active" : "") +
          '" role="tab" aria-selected="' +
          (on ? "true" : "false") +
          '" data-d3-kyb-tab="' +
          esc(tab.id) +
          '" data-vrm-tab="' +
          esc(tab.id) +
          '">' +
          esc(tab.label) +
          "</button>"
        );
      })
      .join("");
  }

  function renderPanels(root, tabs, activeTab, adapter, data, ctx) {
    var panels = root.querySelector("[data-vrm-panels]");
    if (!panels) return;
    panels.innerHTML = tabs
      .map(function (tab) {
        var on = tab.id === activeTab;
        return (
          '<div class="d3-kyb-panel" data-d3-kyb-panel="' +
          esc(tab.id) +
          '" data-vrm-panel="' +
          esc(tab.id) +
          '" role="tabpanel"' +
          (on ? "" : " hidden") +
          "></div>"
        );
      })
      .join("");

    tabs.forEach(function (tab) {
      var panel = panels.querySelector('[data-vrm-panel="' + tab.id + '"]');
      if (!panel) return;
      if (typeof adapter.renderPanel === "function") {
        adapter.renderPanel(panel, tab.id, data, ctx);
      } else {
        panel.innerHTML =
          '<p class="d3-workspace__hint">No content for this section.</p>';
      }
    });
  }

  function setActiveTab(state, tabId) {
    if (!state || !state.root) return;
    var tabs = state.tabs || [];
    var next = tabs.some(function (t) {
      return t.id === tabId;
    })
      ? tabId
      : tabs[0] && tabs[0].id;
    if (!next) return;
    state.activeTab = next;
    state.root.querySelectorAll("[data-vrm-tab]").forEach(function (btn) {
      var on = btn.getAttribute("data-vrm-tab") === next;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    state.root.querySelectorAll("[data-vrm-panel]").forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-vrm-panel") !== next;
    });
  }

  function bindShell(state) {
    var root = state.root;
    root.addEventListener("click", function (event) {
      var tabBtn = event.target.closest("[data-vrm-tab]");
      if (tabBtn && root.contains(tabBtn)) {
        setActiveTab(state, tabBtn.getAttribute("data-vrm-tab"));
        return;
      }
      var actionBtn = event.target.closest("[data-vrm-action]");
      if (actionBtn && root.contains(actionBtn)) {
        var actionId = actionBtn.getAttribute("data-vrm-action");
        if (actionId === "raw") {
          fillRawDialog(root, state.adapter, state.data);
          openDialog(state.dialogIds && state.dialogIds.raw);
        }
        if (typeof state.options.onAction === "function") {
          state.options.onAction({
            id: actionId,
            product: state.product,
            data: state.data
          });
        }
      }
    });
  }

  function buildView(adapter, options) {
    var data = options.data || {};
    var base =
      typeof adapter.buildView === "function"
        ? adapter.buildView(data, options) || {}
        : {};
    return {
      product: options.product,
      title: base.title || data.title || data.name || "Verification report",
      tags: base.tags || [],
      meta: base.meta || [],
      actions: base.actions || []
    };
  }

  function mount(container, options) {
    if (!container) return null;
    options = options || {};
    destroy(container);

    var product = options.product || "kyb";
    var adapter = resolveAdapter(product);
    if (!adapter) {
      container.innerHTML =
        '<p class="d3-workspace__hint">No verification report adapter registered for “' +
        esc(product) +
        '”.</p>';
      return null;
    }

    var data =
      options.data ||
      (typeof adapter.sampleData === "function" ? adapter.sampleData() : {});
    var allTabs =
      typeof adapter.getTabs === "function" ? adapter.getTabs(data, options) : [];
    var tabs = filterTabs(allTabs, options.tabs);
    var activeTab = options.activeTab || (tabs[0] && tabs[0].id) || "";
    var view = buildView(
      adapter,
      Object.assign({}, options, { data: data, product: product })
    );
    view.product = product;

    var uid = nextUid();
    var dialogIds = {
      raw: uid + "-raw",
      rawTitle: uid + "-raw-title"
    };

    container.innerHTML = shellHtml(view, dialogIds);
    var root = container.querySelector(".vrm-host") || container.firstElementChild;
    var ctx = {
      container: container,
      root: root,
      options: options,
      esc: esc,
      dialogIds: dialogIds
    };

    var state = {
      container: container,
      root: root,
      product: product,
      adapter: adapter,
      options: options,
      data: data,
      view: view,
      tabs: tabs,
      activeTab: activeTab,
      dialogIds: dialogIds,
      ctx: ctx
    };
    setState(container, state);
    bindShell(state);
    renderTabs(root, tabs, activeTab);
    renderPanels(root, tabs, activeTab, adapter, data, ctx);
    setActiveTab(state, activeTab);
    fillRawDialog(root, adapter, data);

    if (typeof adapter.afterMount === "function") {
      adapter.afterMount(root, data, ctx);
    }

    return state;
  }

  function update(container, patch) {
    var state = getState(container);
    if (!state) return mount(container, patch || {});
    patch = patch || {};
    var options = Object.assign({}, state.options, patch);
    if (patch.data) options.data = patch.data;
    if (patch.product && patch.product !== state.product) {
      return mount(container, options);
    }
    options.product = state.product;
    options.activeTab = patch.activeTab || state.activeTab;
    return mount(container, options);
  }

  function destroy(container) {
    var state = getState(container);
    if (state && state.adapter && typeof state.adapter.destroy === "function") {
      try {
        state.adapter.destroy(state.root, state.ctx);
      } catch (err) {
        /* ignore */
      }
    }
    clearState(container);
    if (container) container.innerHTML = "";
  }

  register("stub", {
    getTabs: function () {
      return [{ id: "summary", label: "Summary" }];
    },
    buildView: function () {
      return {
        title: "Coming soon",
        tags: [{ label: "Stub", tone: "review" }],
        meta: [],
        actions: []
      };
    },
    renderPanel: function (panel) {
      panel.innerHTML =
        '<p class="d3-workspace__hint">This product report adapter is not implemented yet. Use product: \"kyb\".</p>';
    }
  });

  ["docv", "bankv", "device"].forEach(function (id) {
    register(id, products.stub);
  });

  /** Returns the Demo 3 report card article inside a mounted host, or null. */
  function getReportEl(container) {
    var state = getState(container);
    if (!state || !state.root) return null;
    return state.root.querySelector("[data-vrm-report]") || null;
  }

  global.VerificationReport = {
    mount: mount,
    update: update,
    destroy: destroy,
    register: register,
    getReportEl: getReportEl,
    products: products,
    esc: esc
  };
})(typeof window !== "undefined" ? window : this);
