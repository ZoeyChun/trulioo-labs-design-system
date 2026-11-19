/**
 * TDS Combobox — open / select / close / filter / clear for interactive demos.
 *
 * Opt-in: add `.tds-combobox--interactive` on the root (static specimens stay inert).
 * Pairs with Components/combobox/combobox.css. Optional: TdsDropdownPanel for viewport float.
 *
 * Events on the root:
 *   tds-combobox:change  detail: { value, item }
 *   tds-combobox:clear   detail: {}
 *   tds-combobox:open
 *   tds-combobox:close
 */
(function (global) {
  "use strict";

  var CHECK_SVG =
    '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">' +
    '<path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function optionLabel(option) {
    var label = option.querySelector(".tds-combobox__option-label");
    return ((label && label.textContent) || option.textContent || "").trim();
  }

  function getMenu(root) {
    return root.__tdsComboboxMenu || root.querySelector(".tds-combobox__menu");
  }

  function getOptions(root) {
    var menu = getMenu(root);
    if (!menu) return [];
    /* Menu may be portaled to document.body by TdsDropdownPanel — query the menu, not root. */
    return Array.prototype.slice.call(
      menu.querySelectorAll(".tds-combobox__option:not(.tds-combobox__option--empty)")
    );
  }

  function ensureEmptyRow(menu) {
    var panel = menu.querySelector(".tds-dropdown-panel") || menu;
    var empty = panel.querySelector(".tds-combobox__option--empty");
    if (empty) return empty;
    empty = document.createElement("div");
    empty.className = "tds-combobox__option tds-combobox__option--empty";
    empty.setAttribute("role", "option");
    empty.setAttribute("aria-disabled", "true");
    empty.hidden = true;
    empty.innerHTML = '<span class="tds-combobox__option-label">No matches</span>';
    panel.appendChild(empty);
    return empty;
  }

  function filterOptions(root, query) {
    var menu = getMenu(root);
    if (!menu) return;
    var q = (query || "").trim().toLowerCase();
    var options = getOptions(root);
    var visible = 0;
    options.forEach(function (option) {
      var match = !q || optionLabel(option).toLowerCase().indexOf(q) !== -1;
      option.hidden = !match;
      if (match) visible += 1;
    });
    var empty = ensureEmptyRow(menu);
    empty.hidden = visible > 0;
    /* Filtering changes menu height; if it was flipped above the field, re-anchor. */
    if (root.classList.contains("tds-combobox--open") && global.TdsDropdownPanel) {
      var field = root.querySelector(".tds-combobox__field");
      if (field && global.TdsDropdownPanel.positionInViewport) {
        global.TdsDropdownPanel.positionInViewport(field, menu, { align: "start" });
      }
    }
  }

  function syncAria(root, open) {
    var input = root.querySelector(".tds-combobox__input");
    if (input) input.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function syncLeadingFromOption(root, option) {
    var leading = root.querySelector(".tds-combobox__leading-visual");
    var visual = option && option.querySelector(".tds-combobox__option-visual");
    if (!leading) return;
    if (visual) {
      leading.innerHTML = visual.innerHTML;
      leading.hidden = false;
      leading.removeAttribute("hidden");
    }
  }

  function clearOptionSelection(root) {
    getOptions(root).forEach(function (option) {
      option.classList.remove("tds-combobox__option--selected", "tds-combobox__option--highlighted");
      option.setAttribute("aria-selected", "false");
      var check = option.querySelector(".tds-combobox__option-check");
      if (check) check.remove();
    });
  }

  function markOptionSelected(root, option) {
    clearOptionSelection(root);
    option.classList.add("tds-combobox__option--selected");
    option.setAttribute("aria-selected", "true");
    if (!option.querySelector(".tds-combobox__option-check")) {
      var check = document.createElement("span");
      check.className = "tds-combobox__option-check";
      check.setAttribute("aria-hidden", "true");
      check.innerHTML = CHECK_SVG;
      option.appendChild(check);
    }
  }

  function closeCombobox(root) {
    if (!root.classList.contains("tds-combobox--open")) return;
    var menu = getMenu(root);
    root.classList.remove("tds-combobox--open");
    syncAria(root, false);
    if (global.TdsDropdownPanel && menu) {
      global.TdsDropdownPanel.close(menu);
    }
    root.dispatchEvent(new CustomEvent("tds-combobox:close", { bubbles: true }));
  }

  function closeAll(except) {
    document.querySelectorAll(".tds-combobox--interactive.tds-combobox--open").forEach(function (root) {
      if (root === except) return;
      closeCombobox(root);
    });
  }

  function openCombobox(root) {
    if (root.classList.contains("tds-combobox--disabled")) return;
    var input = root.querySelector(".tds-combobox__input");
    var field = root.querySelector(".tds-combobox__field");
    var menu = getMenu(root);
    if (!input || !menu) return;
    root.__tdsComboboxMenu = menu;

    var filterSource = root.classList.contains("tds-combobox--selected") ? "" : input.value;
    if (root.classList.contains("tds-combobox--open")) {
      filterOptions(root, filterSource);
      return;
    }

    closeAll(root);
    root.classList.add("tds-combobox--open");
    syncAria(root, true);
    filterOptions(root, filterSource);

    if (global.TdsDropdownPanel && field) {
      menu.removeAttribute("hidden");
      global.TdsDropdownPanel.open(field, menu, {
        align: "start",
        onClose: function () {
          root.classList.remove("tds-combobox--open");
          syncAria(root, false);
        },
      });
    }

    root.dispatchEvent(new CustomEvent("tds-combobox:open", { bubbles: true }));
  }

  function selectOption(root, option) {
    var input = root.querySelector(".tds-combobox__input");
    var value = option.getAttribute("data-value") || optionLabel(option);
    if (input) {
      input.value = value;
    }
    root.classList.add("tds-combobox--selected");
    markOptionSelected(root, option);
    syncLeadingFromOption(root, option);
    filterOptions(root, "");
    closeCombobox(root);
    root.dispatchEvent(
      new CustomEvent("tds-combobox:change", {
        bubbles: true,
        detail: { value: value, item: option },
      })
    );
  }

  function clearValue(root) {
    var input = root.querySelector(".tds-combobox__input");
    var leading = root.querySelector(".tds-combobox__leading-visual");
    if (input) input.value = "";
    root.classList.remove("tds-combobox--selected");
    clearOptionSelection(root);
    if (leading && root.dataset.comboboxLeadingDefault != null) {
      leading.innerHTML = root.dataset.comboboxLeadingDefault;
    } else if (leading) {
      leading.innerHTML = "";
    }
    filterOptions(root, "");
    root.dispatchEvent(new CustomEvent("tds-combobox:clear", { bubbles: true, detail: {} }));
  }

  function bindCombobox(root) {
    if (root.dataset.tdsComboboxBound) return;
    root.dataset.tdsComboboxBound = "1";

    var input = root.querySelector(".tds-combobox__input");
    var menu = root.querySelector(".tds-combobox__menu");
    var clearBtn = root.querySelector(".tds-combobox__clear");
    var caret = root.querySelector(".tds-caret, [data-combobox-trigger]");
    root.__tdsComboboxMenu = menu;

    if (!input || !menu || root.classList.contains("tds-combobox--disabled")) return;

    if (!input.getAttribute("role")) input.setAttribute("role", "combobox");
    if (!input.getAttribute("aria-autocomplete")) input.setAttribute("aria-autocomplete", "list");
    if (!menu.id) {
      menu.id = (input.id || "tds-combobox") + "-list";
    }
    input.setAttribute("aria-controls", menu.id);
    syncAria(root, root.classList.contains("tds-combobox--open"));

    var leading = root.querySelector(".tds-combobox__leading-visual");
    if (leading && root.dataset.comboboxLeadingDefault == null) {
      root.dataset.comboboxLeadingDefault = leading.innerHTML;
    }

    input.addEventListener("focus", function () {
      openCombobox(root);
    });

    input.addEventListener("click", function () {
      openCombobox(root);
    });

    input.addEventListener("input", function () {
      root.classList.remove("tds-combobox--selected");
      clearOptionSelection(root);
      if (leading && root.dataset.comboboxLeadingDefault != null) {
        leading.innerHTML = root.dataset.comboboxLeadingDefault;
      }
      openCombobox(root);
      filterOptions(root, input.value);
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeCombobox(root);
        input.blur();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        openCombobox(root);
        var first = getOptions(root).find(function (option) {
          return !option.hidden;
        });
        if (first) first.focus();
      }
      if (event.key === "Enter") {
        var liveMenu = getMenu(root);
        var highlighted =
          (liveMenu &&
            liveMenu.querySelector(".tds-combobox__option--highlighted:not([hidden])")) ||
          getOptions(root).find(function (option) {
            return !option.hidden;
          });
        if (root.classList.contains("tds-combobox--open") && highlighted) {
          event.preventDefault();
          selectOption(root, highlighted);
        }
      }
    });

    if (caret) {
      caret.addEventListener("mousedown", function (event) {
        event.preventDefault();
      });
      caret.addEventListener("click", function (event) {
        event.stopPropagation();
        if (root.classList.contains("tds-combobox--open")) closeCombobox(root);
        else {
          openCombobox(root);
          input.focus();
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("mousedown", function (event) {
        event.preventDefault();
      });
      clearBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        clearValue(root);
        openCombobox(root);
        input.focus();
      });
    }

    getOptions(root).forEach(function (option) {
      option.setAttribute("tabindex", "-1");
      option.addEventListener("mousedown", function (event) {
        event.preventDefault();
      });
      option.addEventListener("click", function (event) {
        event.stopPropagation();
        selectOption(root, option);
      });
    });
  }

  function init(root) {
    var scope = root || document;
    if (scope.matches && scope.matches(".tds-combobox--interactive")) {
      bindCombobox(scope);
    }
    scope.querySelectorAll(".tds-combobox--interactive").forEach(function (node) {
      if (node !== scope) bindCombobox(node);
    });
  }

  if (!global.__tdsComboboxListeners) {
    global.__tdsComboboxListeners = true;
    document.addEventListener("pointerdown", function (event) {
      var target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".tds-combobox--interactive, .tds-combobox__menu")) return;
      closeAll();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAll();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      init(document);
    });
  } else {
    init(document);
  }

  global.TdsCombobox = {
    init: init,
    open: openCombobox,
    close: closeCombobox,
    closeAll: closeAll,
    clear: clearValue,
  };
})(window);
