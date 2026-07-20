/**
 * TDS DatePicker — single and range calendar interactions for preview demos.
 */
(function () {
  "use strict";

  var MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  var PLACEHOLDER = "mm/dd/yyyy";
  var CHEVRON_LEFT =
    '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 8L10 3L10.7 3.7L6.4 8L10.7 12.3L10 13L5 8Z" fill="currentColor"/></svg>';
  var CHEVRON_RIGHT =
    '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M11 8L6 3L5.3 3.7L9.6 8L5.3 12.3L6 13L11 8Z" fill="currentColor"/></svg>';

  var openContext = null;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function dateKey(date) {
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
  }

  function parseDateKey(key) {
    var parts = key.split("-");
    if (parts.length !== 3) return null;
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function formatDate(date) {
    return pad(date.getMonth() + 1) + "/" + pad(date.getDate()) + "/" + date.getFullYear();
  }

  function parseDate(str) {
    if (!str) return null;
    var parts = str.split("/");
    if (parts.length !== 3) return null;
    var month = Number(parts[0]) - 1;
    var day = Number(parts[1]);
    var year = Number(parts[2]);
    var date = new Date(year, month, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return null;
    }
    return date;
  }

  function sameDay(a, b) {
    return (
      a &&
      b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function compareDays(a, b) {
    return startOfDay(a).getTime() - startOfDay(b).getTime();
  }

  function setFieldValue(field, valueEl, date) {
    if (!valueEl) return;
    if (date) {
      valueEl.textContent = formatDate(date);
      valueEl.classList.remove("tds-date-picker__placeholder");
    } else {
      valueEl.textContent = PLACEHOLDER;
      valueEl.classList.add("tds-date-picker__placeholder");
    }
  }

  function createCalendar(label) {
    var calendar = document.createElement("div");
    calendar.className = "tds-date-picker__calendar";
    calendar.setAttribute("role", "dialog");
    calendar.setAttribute("aria-label", label || "Choose date");
    calendar.hidden = true;
    calendar.innerHTML =
      '<div class="tds-date-picker__header">' +
      '<button type="button" class="tds-date-picker__nav" data-date-picker-prev aria-label="Previous month">' +
      CHEVRON_LEFT +
      "</button>" +
      '<div class="tds-date-picker__title">' +
      '<span class="tds-date-picker__month"></span>' +
      '<span class="tds-date-picker__year"></span>' +
      "</div>" +
      '<button type="button" class="tds-date-picker__nav" data-date-picker-next aria-label="Next month">' +
      CHEVRON_RIGHT +
      "</button>" +
      "</div>" +
      '<div class="tds-date-picker__weekdays" aria-hidden="true">' +
      ["S", "M", "T", "W", "T", "F", "S"]
        .map(function (day) {
          return (
            '<span class="tds-date-picker__day tds-date-picker__day--weekday">' +
            day +
            "</span>"
          );
        })
        .join("") +
      "</div>" +
      '<div class="tds-date-picker__weeks"></div>';
    return calendar;
  }

  function buildMonthGrid(viewDate) {
    var year = viewDate.getFullYear();
    var month = viewDate.getMonth();
    var first = new Date(year, month, 1);
    var startOffset = first.getDay();
    var gridStart = new Date(year, month, 1 - startOffset);
    var weeks = [];

    for (var w = 0; w < 6; w += 1) {
      var days = [];
      for (var d = 0; d < 7; d += 1) {
        days.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + w * 7 + d));
      }
      weeks.push(days);
    }
    return weeks;
  }

  function renderCalendar(calendar, state) {
    var monthEl = calendar.querySelector(".tds-date-picker__month");
    var yearEl = calendar.querySelector(".tds-date-picker__year");
    var weeksEl = calendar.querySelector(".tds-date-picker__weeks");
    var today = startOfDay(new Date());
    var viewDate = state.viewDate;
    var weeks = buildMonthGrid(viewDate);

    monthEl.textContent = MONTHS[viewDate.getMonth()];
    yearEl.textContent = String(viewDate.getFullYear());

    weeksEl.innerHTML = weeks
      .map(function (week) {
        return (
          '<div class="tds-date-picker__week">' +
          week
            .map(function (date) {
              var outside = date.getMonth() !== viewDate.getMonth();
              var classes = ["tds-date-picker__day"];
              if (outside) classes.push("tds-date-picker__day--outside");

              if (sameDay(date, today)) classes.push("tds-date-picker__day--today");

              if (state.mode === "single" && sameDay(date, state.selected)) {
                classes.push("tds-date-picker__day--selected");
              }

              if (state.mode === "range" && state.rangeStart && state.rangeEnd) {
                var start = compareDays(date, state.rangeStart);
                var end = compareDays(date, state.rangeEnd);
                if (start >= 0 && end <= 0) {
                  classes.push("tds-date-picker__day--in-range");
                  if (sameDay(date, state.rangeStart)) {
                    classes.push("tds-date-picker__day--range-start", "tds-date-picker__day--selected");
                  }
                  if (sameDay(date, state.rangeEnd)) {
                    classes.push("tds-date-picker__day--range-end", "tds-date-picker__day--selected");
                  }
                }
              } else if (state.mode === "range" && state.rangeStart && !state.rangeEnd) {
                if (sameDay(date, state.rangeStart)) {
                  classes.push("tds-date-picker__day--selected", "tds-date-picker__day--range-start");
                } else if (state.hoverEnd) {
                  var lo =
                    compareDays(state.rangeStart, state.hoverEnd) <= 0
                      ? state.rangeStart
                      : state.hoverEnd;
                  var hi =
                    compareDays(state.rangeStart, state.hoverEnd) <= 0
                      ? state.hoverEnd
                      : state.rangeStart;
                  var pos = compareDays(date, lo);
                  var posEnd = compareDays(date, hi);
                  if (pos >= 0 && posEnd <= 0) {
                    classes.push("tds-date-picker__day--in-range");
                    if (sameDay(date, lo)) classes.push("tds-date-picker__day--range-start");
                    if (sameDay(date, hi)) classes.push("tds-date-picker__day--range-end");
                  }
                }
              }

              return (
                '<button type="button" class="' +
                classes.join(" ") +
                '" data-date="' +
                dateKey(date) +
                '">' +
                date.getDate() +
                "</button>"
              );
            })
            .join("") +
          "</div>"
        );
      })
      .join("");
  }

  function closeOpenPicker() {
    if (!openContext) return;
    openContext.close();
    openContext = null;
  }

  function initSinglePicker(picker) {
    if (
      picker.classList.contains("tds-date-picker--disabled") ||
      picker.classList.contains("tds-date-picker--readonly")
    ) {
      return;
    }

    var field = picker.querySelector(".tds-date-picker__field");
    var valueEl = picker.querySelector(".tds-date-picker__value");
    if (!field || !valueEl || field.tagName !== "BUTTON") return;

    var selected = parseDate(picker.dataset.value || valueEl.textContent.trim());
    if (selected) setFieldValue(field, valueEl, selected);

    var viewDate = selected ? new Date(selected) : new Date();
    var calendar = picker.querySelector(".tds-date-picker__calendar");
    if (!calendar) {
      calendar = createCalendar(picker.dataset.calendarLabel || "Choose date");
      picker.appendChild(calendar);
    }

    var state = {
      mode: "single",
      viewDate: new Date(viewDate),
      selected: selected,
    };

    function render() {
      renderCalendar(calendar, state);
    }

    function handleDayClick(btn) {
      var date = parseDateKey(btn.dataset.date);
      if (!date) return;
      state.selected = date;
      state.viewDate = new Date(date);
      setFieldValue(field, valueEl, date);
      render();
      close();
    }

    calendar.querySelector(".tds-date-picker__weeks").onclick = function (e) {
      var btn = e.target.closest("[data-date]");
      if (!btn || btn.disabled) return;
      e.stopPropagation();
      handleDayClick(btn);
    };

    function open() {
      closeOpenPicker();
      picker.classList.add("tds-date-picker--open");
      field.classList.add("tds-date-picker__field--focus");
      field.setAttribute("aria-expanded", "true");
      calendar.hidden = false;
      if (state.selected) state.viewDate = new Date(state.selected);
      render();
      openContext = { close: close };
    }

    function close() {
      picker.classList.remove("tds-date-picker--open");
      field.classList.remove("tds-date-picker__field--focus");
      field.setAttribute("aria-expanded", "false");
      calendar.hidden = true;
      if (openContext && openContext.close === close) openContext = null;
    }

    field.addEventListener("click", function (e) {
      e.stopPropagation();
      if (picker.classList.contains("tds-date-picker--open")) close();
      else open();
    });

    calendar.querySelector("[data-date-picker-prev]").addEventListener("click", function (e) {
      e.stopPropagation();
      state.viewDate = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() - 1, 1);
      render();
    });

    calendar.querySelector("[data-date-picker-next]").addEventListener("click", function (e) {
      e.stopPropagation();
      state.viewDate = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() + 1, 1);
      render();
    });

    calendar.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  function initRangePicker(range) {
    if (
      range.classList.contains("tds-date-picker-range--disabled") ||
      range.classList.contains("tds-date-picker-range--readonly")
    ) {
      return;
    }

    var startPicker = range.querySelector('[data-date-picker-part="start"]');
    var endPicker = range.querySelector('[data-date-picker-part="end"]');
    if (!startPicker || !endPicker) return;

    var startField = startPicker.querySelector(".tds-date-picker__field");
    var endField = endPicker.querySelector(".tds-date-picker__field");
    var startValue = startPicker.querySelector(".tds-date-picker__value");
    var endValue = endPicker.querySelector(".tds-date-picker__value");
    if (!startField || !endField || !startValue || !endValue) return;

    var rangeStart = parseDate(range.dataset.start || startValue.textContent.trim());
    var rangeEnd = parseDate(range.dataset.end || endValue.textContent.trim());
    if (rangeStart) setFieldValue(startField, startValue, rangeStart);
    if (rangeEnd) setFieldValue(endField, endValue, rangeEnd);

    var viewDate = rangeStart || rangeEnd || new Date();
    var calendar = range.querySelector(".tds-date-picker__calendar");
    if (!calendar) {
      calendar = createCalendar("Choose date range");
      calendar.classList.add("tds-date-picker-range__calendar");
      range.appendChild(calendar);
    }

    var activePart = "start";
    var state = {
      mode: "range",
      viewDate: new Date(viewDate),
      rangeStart: rangeStart,
      rangeEnd: rangeEnd,
      hoverEnd: null,
    };

    function render() {
      renderCalendar(calendar, state);
    }

    function handleRangeDayClick(btn) {
      var date = parseDateKey(btn.dataset.date);
      if (!date) return;

      if (!state.rangeStart || (state.rangeStart && state.rangeEnd)) {
        state.rangeStart = date;
        state.rangeEnd = null;
        activePart = "end";
        setFieldValue(startField, startValue, date);
        setFieldValue(endField, endValue, null);
      } else {
        if (compareDays(date, state.rangeStart) < 0) {
          state.rangeEnd = state.rangeStart;
          state.rangeStart = date;
        } else {
          state.rangeEnd = date;
        }
        setFieldValue(startField, startValue, state.rangeStart);
        setFieldValue(endField, endValue, state.rangeEnd);
        state.hoverEnd = null;
        state.viewDate = new Date(date);
        render();
        close();
        return;
      }

      state.hoverEnd = null;
      state.viewDate = new Date(date);
      render();
    }

    var weeksEl = calendar.querySelector(".tds-date-picker__weeks");
    weeksEl.onmouseover = function (e) {
      var btn = e.target.closest("[data-date]");
      if (!btn || !state.rangeStart || state.rangeEnd) return;
      state.hoverEnd = parseDateKey(btn.dataset.date);
      render();
    };

    weeksEl.onclick = function (e) {
      var btn = e.target.closest("[data-date]");
      if (!btn) return;
      e.stopPropagation();
      handleRangeDayClick(btn);
    };

    function setActivePicker(part) {
      activePart = part;
      startPicker.classList.toggle("tds-date-picker--open", part === "start");
      endPicker.classList.toggle("tds-date-picker--open", part === "end");
      startField.classList.toggle("tds-date-picker__field--focus", part === "start");
      endField.classList.toggle("tds-date-picker__field--focus", part === "end");
      startField.setAttribute("aria-expanded", part === "start" ? "true" : "false");
      endField.setAttribute("aria-expanded", part === "end" ? "true" : "false");
    }

    function open(part) {
      closeOpenPicker();
      setActivePicker(part || activePart);
      calendar.hidden = false;
      if (part === "start" && state.rangeStart) state.viewDate = new Date(state.rangeStart);
      if (part === "end" && state.rangeEnd) state.viewDate = new Date(state.rangeEnd);
      render();
      openContext = { close: close };
    }

    function close() {
      startPicker.classList.remove("tds-date-picker--open");
      endPicker.classList.remove("tds-date-picker--open");
      startField.classList.remove("tds-date-picker__field--focus");
      endField.classList.remove("tds-date-picker__field--focus");
      startField.setAttribute("aria-expanded", "false");
      endField.setAttribute("aria-expanded", "false");
      calendar.hidden = true;
      state.hoverEnd = null;
      if (openContext && openContext.close === close) openContext = null;
    }

    startField.addEventListener("click", function (e) {
      e.stopPropagation();
      if (!calendar.hidden && activePart === "start") close();
      else open("start");
    });

    endField.addEventListener("click", function (e) {
      e.stopPropagation();
      if (!calendar.hidden && activePart === "end") close();
      else open("end");
    });

    calendar.querySelector("[data-date-picker-prev]").addEventListener("click", function (e) {
      e.stopPropagation();
      state.viewDate = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() - 1, 1);
      render();
    });

    calendar.querySelector("[data-date-picker-next]").addEventListener("click", function (e) {
      e.stopPropagation();
      state.viewDate = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() + 1, 1);
      render();
    });

    calendar.addEventListener("mouseleave", function () {
      if (!state.rangeEnd) {
        state.hoverEnd = null;
        render();
      }
    });

    calendar.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  document.querySelectorAll("[data-date-picker]").forEach(initSinglePicker);
  document.querySelectorAll("[data-date-picker-range]").forEach(initRangePicker);

  document.addEventListener("click", function () {
    closeOpenPicker();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeOpenPicker();
  });
})();
