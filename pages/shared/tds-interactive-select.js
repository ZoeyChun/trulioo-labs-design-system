/**
 * TdsInteractiveSelect — open/close and selection for .tds-select--interactive menus.
 * Pairs with Components/select/select.css and TdsDropdownPanel for viewport positioning.
 *
 * Dispatches `tds-select:change` on the select root when an option is chosen:
 *   detail: { value: string, item: HTMLElement, menuType: string }
 */
(function (global) {
  "use strict";

  function closeAllSelectMenus(except) {
    var selects = document.querySelectorAll(".tds-select--interactive.tds-select--open");
    selects.forEach(function (select) {
      if (select === except) return;
      select.classList.remove("tds-select--open");
      var trigger = select.querySelector(".tds-select__trigger");
      var menu = select.__tdsSelectMenu || select.querySelector(".tds-select__menu");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
        trigger.classList.remove("tds-select__trigger--focus");
      }
      if (menu) {
        menu.setAttribute("hidden", "");
        if (global.TdsDropdownPanel) global.TdsDropdownPanel.close(menu);
      }
    });
  }

  function closeSelectMenu(select) {
    var trigger = select.querySelector(".tds-select__trigger");
    var menu = select.__tdsSelectMenu || select.querySelector(".tds-select__menu");
    if (global.TdsDropdownPanel && menu) {
      global.TdsDropdownPanel.close(menu);
      return;
    }
    select.classList.remove("tds-select--open");
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
      trigger.classList.remove("tds-select__trigger--focus");
    }
    if (menu) menu.setAttribute("hidden", "");
  }

  function syncSelectTriggerTag(select, trigger, item) {
    var trailingGroup = trigger.querySelector(".tds-select__trailing-group");
    if (!trailingGroup) return;
    var caret = trailingGroup.querySelector(".tds-caret");
    var existingTag = trailingGroup.querySelector(".tds-select__tag");
    var menuTag = item.querySelector(".tds-action-list-item__trailing-visual .tds-tag");

    if (menuTag && caret) {
      var tag = menuTag.cloneNode(true);
      tag.classList.add("tds-select__tag");
      tag.setAttribute("aria-hidden", "true");
      if (existingTag) existingTag.replaceWith(tag);
      else trailingGroup.insertBefore(tag, caret);
    } else if (existingTag) {
      existingTag.remove();
    }
  }

  function syncSelectTriggerFlag(select, trigger, item, valueEl) {
    var flag = item.querySelector(".tds-action-list-item__leading-visual");
    var slot = select.querySelector(".tds-select__country-flag");
    if (!flag) return;
    if (!slot) {
      slot = document.createElement("span");
      slot.className = "tds-select__country-flag";
      slot.setAttribute("aria-hidden", "true");
      trigger.insertBefore(slot, valueEl || trigger.firstChild);
    }
    slot.hidden = false;
    slot.removeAttribute("hidden");
    slot.innerHTML = flag.innerHTML;
  }

  function syncSelectTriggerIcon(select, trigger, item, valueEl) {
    var icon = item.querySelector(".tds-action-list-item__leading-visual");
    var slot = select.querySelector(".tds-select__leading-visual");
    if (!icon) return;
    if (!slot) {
      slot = document.createElement("span");
      slot.className = "tds-select__leading-visual";
      slot.setAttribute("aria-hidden", "true");
      trigger.insertBefore(slot, valueEl || trigger.firstChild);
    }
    slot.hidden = false;
    slot.removeAttribute("hidden");
    slot.innerHTML = icon.innerHTML;
  }

  function bindSelect(select) {
    if (select.dataset.tdsSelectBound) return;
    select.dataset.tdsSelectBound = "1";

    var trigger = select.querySelector(".tds-select__trigger");
    var menu = select.querySelector(".tds-select__menu");
    select.__tdsSelectMenu = menu;
    var valueEl = select.querySelector(".tds-select__value");
    var menuType = select.dataset.menuType || "text";
    var placeholder = (valueEl && valueEl.dataset.placeholder) || "Placeholder";

    if (!trigger || !menu || select.classList.contains("tds-select--disabled")) return;

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      var isOpen = select.classList.contains("tds-select--open");
      closeAllSelectMenus();
      if (!isOpen) {
        select.classList.add("tds-select--open");
        trigger.setAttribute("aria-expanded", "true");
        trigger.classList.add("tds-select__trigger--focus");
        menu.removeAttribute("hidden");
        if (global.TdsDropdownPanel) {
          global.TdsDropdownPanel.open(trigger, menu, {
            align: "start",
            onClose: function () {
              select.classList.remove("tds-select--open");
              trigger.setAttribute("aria-expanded", "false");
              trigger.classList.remove("tds-select__trigger--focus");
              menu.setAttribute("hidden", "");
            },
          });
        }
      }
    });

    if (menuType === "multiSelect") {
      menu.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
          if (!valueEl) return;
          var checked = Array.prototype.slice.call(
            menu.querySelectorAll('input[type="checkbox"]:checked')
          );
          if (!checked.length) {
            valueEl.textContent = placeholder;
            valueEl.classList.add("tds-select__placeholder");
          } else if (checked.length === 1) {
            valueEl.textContent = checked[0].value;
            valueEl.classList.remove("tds-select__placeholder");
          } else {
            valueEl.textContent = checked.length + " selected";
            valueEl.classList.remove("tds-select__placeholder");
          }
        });
      });
      menu.querySelectorAll("label.tds-action-list-item").forEach(function (label) {
        label.addEventListener("click", function (event) {
          event.stopPropagation();
        });
      });
      return;
    }

    menu
      .querySelectorAll(".tds-action-list-item:not(.tds-action-list-item--disabled)")
      .forEach(function (item) {
        item.addEventListener("click", function (event) {
          event.stopPropagation();
          var label = item.querySelector(".tds-action-list-item__label");
          var val =
            item.dataset.value ||
            (label && label.textContent.trim()) ||
            item.textContent.trim();

          menu.querySelectorAll(".tds-action-list-item").forEach(function (option) {
            option.classList.remove("tds-action-list-item--selected");
          });
          item.classList.add("tds-action-list-item--selected");

          if (valueEl) {
            valueEl.textContent = val;
            valueEl.classList.remove("tds-select__placeholder");
          }

          if (menuType === "icon") syncSelectTriggerIcon(select, trigger, item, valueEl);
          if (menuType === "flag") syncSelectTriggerFlag(select, trigger, item, valueEl);
          if (menuType === "recommended") syncSelectTriggerTag(select, trigger, item);

          closeSelectMenu(select);

          select.dispatchEvent(
            new CustomEvent("tds-select:change", {
              bubbles: true,
              detail: {
                value: val,
                item: item,
                menuType: menuType,
              },
            })
          );
        });
      });
  }

  function init(root) {
    var scope = root || document;
    if (scope.matches && scope.matches(".tds-select--interactive")) {
      bindSelect(scope);
    }
    scope.querySelectorAll(".tds-select--interactive").forEach(function (select) {
      if (select !== scope) bindSelect(select);
    });
  }

  if (!global.__tdsInteractiveSelectListeners) {
    global.__tdsInteractiveSelectListeners = true;
    document.addEventListener("click", function (event) {
      if (event.target.closest(".tds-select--interactive, .tds-select__menu")) return;
      closeAllSelectMenus();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAllSelectMenus();
    });
  }

  global.TdsInteractiveSelect = {
    init: init,
    closeAll: closeAllSelectMenus,
  };
})(window);
