/**
 * TdsDropdownPanel — viewport-aware positioning for floating dropdown panels.
 * Used by ButtonMenu, FilterButton, SortButton, Select, and Combobox menus.
 *
 * Positioning rules:
 * 1. Content sizing — panels size to their content by default (width: max-content).
 * 2. Alignment — align to the trigger start or end edge; flip to the other edge
 *    when the preferred side would overflow the viewport.
 * 3. Minimum width — panel min-width equals the triggering component width.
 * 4. Overflow — when wider than the viewport, clamp width (never below min-width)
 *    and adjust horizontal alignment to stay as visible as possible.
 */
(function (global) {
  "use strict";

  var VIEWPORT_CLASS = "tds-dropdown-panel--viewport";
  var MENU_SELECTOR = ".tds-button-menu, .tds-filter-button, .tds-sort-button";
  var DEFAULT_VIEWPORT_PAD = 16;
  var DEFAULT_GAP = 4;
  var DEFAULT_MAX_HEIGHT = 316;
  var MIN_HEIGHT = 160;

  var openEntries = [];
  var globalBound = false;

  function getAlign(menu) {
    if (menu.dataset.dropdownAlign === "start" || menu.dataset.dropdownAlign === "end") {
      return menu.dataset.dropdownAlign;
    }
    if (menu.classList.contains("tds-sort-button")) return "end";
    return "start";
  }

  function resolveHorizontalLeft(triggerRect, panelWidth, preferredAlign, viewportPad) {
    var viewportRight = window.innerWidth - viewportPad;
    var startLeft = triggerRect.left;
    var endLeft = triggerRect.right - panelWidth;

    function fits(left) {
      return left >= viewportPad && left + panelWidth <= viewportRight;
    }

    function overflowAmount(left) {
      return Math.max(0, viewportPad - left) + Math.max(0, left + panelWidth - viewportRight);
    }

    var preferredLeft = preferredAlign === "end" ? endLeft : startLeft;
    var alternateLeft = preferredAlign === "end" ? startLeft : endLeft;

    if (fits(preferredLeft)) return preferredLeft;
    if (fits(alternateLeft)) return alternateLeft;

    var left = overflowAmount(startLeft) <= overflowAmount(endLeft) ? startLeft : endLeft;
    if (left + panelWidth > viewportRight) left = viewportRight - panelWidth;
    if (left < viewportPad) left = viewportPad;

    return left;
  }

  function getMenuPanel(element) {
    if (
      element.classList.contains("tds-select__menu") ||
      element.classList.contains("tds-combobox__menu")
    ) {
      return element.querySelector(".tds-dropdown-panel");
    }
    return null;
  }

  function resetSizing(element) {
    if (!element) return;
    element.style.width = "";
    element.style.minWidth = "";
    element.style.maxWidth = "";
    element.style.maxHeight = "";
  }

  function resetPosition(element) {
    if (!element) return;
    var panel = getMenuPanel(element);

    element.classList.remove(VIEWPORT_CLASS);
    element.style.position = "";
    element.style.top = "";
    element.style.left = "";
    element.style.right = "";
    element.style.bottom = "";
    element.style.visibility = "";
    resetSizing(element);
    resetSizing(panel);
  }

  function untrack(element) {
    openEntries = openEntries.filter(function (entry) {
      return entry.element !== element;
    });
    resetPosition(element);
  }

  function positionInViewport(trigger, element, options) {
    if (!trigger || !element) return;

    options = options || {};
    var viewportPad = options.viewportPad != null ? options.viewportPad : DEFAULT_VIEWPORT_PAD;
    var gap = options.gap != null ? options.gap : DEFAULT_GAP;
    var align = options.align || "start";
    var maxHeight = options.maxHeight != null ? options.maxHeight : DEFAULT_MAX_HEIGHT;
    var minTriggerWidth = options.minTriggerWidth !== false;

    var triggerRect = trigger.getBoundingClientRect();
    var maxAllowedWidth = window.innerWidth - viewportPad * 2;
    var triggerWidth = Math.max(triggerRect.width, 0);
    var panel = getMenuPanel(element);
    var sizeEl = panel || element;

    element.classList.add(VIEWPORT_CLASS);
    element.style.position = "fixed";
    element.style.visibility = "hidden";
    element.style.top = "0px";
    element.style.left = "0px";
    element.style.right = "auto";
    element.style.bottom = "auto";
    resetSizing(element);
    resetSizing(panel);

    sizeEl.style.width = "";
    sizeEl.style.minWidth = minTriggerWidth ? triggerWidth + "px" : "";
    sizeEl.style.maxWidth = maxAllowedWidth + "px";
    sizeEl.style.maxHeight = maxHeight + "px";

    var naturalWidth = sizeEl.offsetWidth;
    var minWidth = minTriggerWidth ? triggerWidth : 0;
    var panelWidth = Math.max(minWidth, Math.min(naturalWidth, maxAllowedWidth));

    var left = resolveHorizontalLeft(triggerRect, panelWidth, align, viewportPad);

    var topBelow = triggerRect.bottom + gap;
    var availableBelow = window.innerHeight - viewportPad - topBelow;
    var availableAbove = triggerRect.top - viewportPad - gap;
    var maxH = Math.min(maxHeight, Math.max(MIN_HEIGHT, availableBelow));

    if (panelWidth < naturalWidth) {
      sizeEl.style.width = Math.round(panelWidth) + "px";
    } else {
      sizeEl.style.width = "";
    }

    element.style.left = Math.round(left) + "px";
    element.style.top = Math.round(topBelow) + "px";

    var panelHeight = element.offsetHeight;
    if (panelHeight > availableBelow && availableAbove > availableBelow) {
      maxH = Math.min(maxHeight, Math.max(MIN_HEIGHT, availableAbove));
      sizeEl.style.maxHeight = Math.round(maxH) + "px";
      panelHeight = Math.min(element.offsetHeight, maxH);
      element.style.top = Math.round(Math.max(viewportPad, triggerRect.top - gap - panelHeight)) + "px";
    } else {
      sizeEl.style.maxHeight = Math.round(maxH) + "px";
    }

    element.style.visibility = "";
  }

  function open(trigger, element, options) {
    untrack(element);
    positionInViewport(trigger, element, options);
    openEntries.push({
      trigger: trigger,
      element: element,
      options: options || {},
      onClose: options.onClose,
    });
  }

  function closeEntry(entry) {
    if (entry.onClose) entry.onClose();
    resetPosition(entry.element);
  }

  function close(element) {
    openEntries = openEntries.filter(function (entry) {
      if (entry.element === element) {
        closeEntry(entry);
        return false;
      }
      return true;
    });
  }

  function closeAll(exceptElement) {
    openEntries.slice().forEach(function (entry) {
      if (exceptElement && entry.element === exceptElement) return;
      closeEntry(entry);
    });
    openEntries = exceptElement
      ? openEntries.filter(function (entry) {
          return entry.element === exceptElement;
        })
      : [];
  }

  function repositionAll() {
    openEntries.slice().forEach(function (entry) {
      positionInViewport(entry.trigger, entry.element, entry.options);
    });
  }

  function bindGlobalListeners() {
    if (globalBound) return;
    globalBound = true;

    document.addEventListener("click", function (event) {
      if (event.target.closest(MENU_SELECTOR)) return;
      if (event.target.closest(".tds-select--interactive")) return;
      if (event.target.closest(".tds-combobox--interactive")) return;
      closeAll();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAll();
    });

    window.addEventListener("resize", repositionAll);
    window.addEventListener("scroll", repositionAll, true);
  }

  function setToolbarMenuOpenState(menu, isOpen) {
    if (menu && menu.classList.contains("tds-filter-button")) {
      menu.classList.toggle("tds-filter-button--open", isOpen);
    }
    if (menu && menu.classList.contains("tds-sort-button")) {
      menu.classList.toggle("tds-sort-button--open", isOpen);
    }
  }

  function resetFilterButtonSelections(menu, panel) {
    menu.classList.remove("tds-filter-button--selected", "tds-filter-button--multi");
    setToolbarMenuOpenState(menu, false);

    var defaultItem = panel.querySelector("[data-tds-filter-default]");
    var menuButtons = panel.querySelectorAll("button.tds-action-list-item");

    menuButtons.forEach(function (item) {
      var selected = defaultItem ? item === defaultItem : item === menuButtons[0];
      item.classList.toggle("tds-action-list-item--selected", selected);
      if (item.hasAttribute("aria-checked")) {
        item.setAttribute("aria-checked", selected ? "true" : "false");
      }
      if (item.hasAttribute("aria-selected")) {
        item.setAttribute("aria-selected", selected ? "true" : "false");
      }
    });

    panel.querySelectorAll("input[type='checkbox']").forEach(function (input) {
      input.checked = input.defaultChecked;
    });
  }

  function resetSortButtonSelections(menu, panel) {
    menu.classList.remove("tds-sort-button--selected");
    setToolbarMenuOpenState(menu, false);

    var defaultItem = panel.querySelector("[data-tds-sort-default]");
    var menuButtons = panel.querySelectorAll("button.tds-action-list-item");

    menuButtons.forEach(function (item) {
      var selected = defaultItem ? item === defaultItem : item === menuButtons[0];
      item.classList.toggle("tds-action-list-item--selected", selected);
      if (item.hasAttribute("aria-checked")) {
        item.setAttribute("aria-checked", selected ? "true" : "false");
      }
      if (item.hasAttribute("aria-selected")) {
        item.setAttribute("aria-selected", selected ? "true" : "false");
      }
    });
  }

  function handleFilterButtonClear(event, menu, panel) {
    event.preventDefault();
    event.stopPropagation();
    close(panel);
    resetFilterButtonSelections(menu, panel);
    menu.dispatchEvent(new CustomEvent("tds-filter-clear", { bubbles: true }));
  }

  function handleSortButtonClear(event, menu, panel) {
    event.preventDefault();
    event.stopPropagation();
    close(panel);
    resetSortButtonSelections(menu, panel);
    menu.dispatchEvent(new CustomEvent("tds-sort-clear", { bubbles: true }));
  }

  function initMenus(root, options) {
    options = options || {};
    bindGlobalListeners();

    (root || document).querySelectorAll(MENU_SELECTOR).forEach(function (menu) {
      if (menu.dataset.tdsDropdownBound) return;

      var trigger = menu.querySelector("button[aria-haspopup='menu']");
      var panel = menu.querySelector(".tds-dropdown-panel");
      if (!trigger || !panel) return;

      menu.dataset.tdsDropdownBound = "1";
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");

      trigger.addEventListener("click", function (event) {
        if (event.target.closest(".tds-filter-button__clear, .tds-sort-button__clear")) return;
        event.stopPropagation();
        var isOpen = !panel.hidden;

        document.querySelectorAll(MENU_SELECTOR).forEach(function (other) {
          if (other === menu) return;
          var otherPanel = other.querySelector(".tds-dropdown-panel");
          if (otherPanel) close(otherPanel);
        });

        if (isOpen) {
          close(panel);
          return;
        }

        panel.hidden = false;
        trigger.setAttribute("aria-expanded", "true");
        setToolbarMenuOpenState(menu, true);
        open(trigger, panel, {
          align: getAlign(menu),
          viewportPad: options.viewportPad,
          gap: options.gap,
          maxHeight: options.maxHeight,
          onClose: function () {
            panel.hidden = true;
            trigger.setAttribute("aria-expanded", "false");
            setToolbarMenuOpenState(menu, false);
          },
        });
      });

      menu.querySelectorAll("button.tds-action-list-item").forEach(function (item) {
        item.addEventListener("click", function () {
          close(panel);
        });
      });

      if (menu.classList.contains("tds-filter-button")) {
        var filterClearEl = menu.querySelector(".tds-filter-button__clear");
        if (filterClearEl && !filterClearEl.dataset.tdsClearBound) {
          filterClearEl.dataset.tdsClearBound = "1";
          filterClearEl.addEventListener("mousedown", function (event) {
            event.stopPropagation();
          });
          filterClearEl.addEventListener("click", function (event) {
            handleFilterButtonClear(event, menu, panel);
          });
        }
      }

      if (menu.classList.contains("tds-sort-button")) {
        var sortClearEl = menu.querySelector(".tds-sort-button__clear");
        if (sortClearEl && !sortClearEl.dataset.tdsClearBound) {
          sortClearEl.dataset.tdsClearBound = "1";
          sortClearEl.addEventListener("mousedown", function (event) {
            event.stopPropagation();
          });
          sortClearEl.addEventListener("click", function (event) {
            handleSortButtonClear(event, menu, panel);
          });
        }
      }
    });
  }

  global.TdsDropdownPanel = {
    open: open,
    close: close,
    closeAll: closeAll,
    resetPosition: resetPosition,
    positionInViewport: positionInViewport,
    repositionAll: repositionAll,
    initMenus: initMenus,
  };
})(typeof window !== "undefined" ? window : globalThis);
