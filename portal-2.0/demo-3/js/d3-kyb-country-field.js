/* Demo 3 — Without pre-fill the top of the KYB form is a plain, searchable Country dropdown (TDS combobox) instead of
   the country + business search bar. Choosing a country drives the same select the search bar uses, so the session,
   the registry and the form all follow it as before. */
(function () {
  "use strict";

  var lookup = document.getElementById("vb-lookup");
  var nativeSelect = document.getElementById("vb-country-select");
  if (!lookup || !nativeSelect) return;

  var CARET =
    '<svg viewBox="0 0 8 11" fill="currentColor"><path d="M4 0l3.5 4h-7L4 0z"/><path d="M4 11L.5 7h7L4 11z"/></svg>';

  var GLOBE =
    '<svg class="d3-fa-line d3-cc-globe" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.25"/>' +
    '<path d="M1.75 8h12.5M8 1.75c1.7 1.7 2.6 3.8 2.6 6.25S9.7 12.55 8 14.25M8 1.75C6.3 3.45 5.4 5.55 5.4 8s.9 4.55 2.6 6.25" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>';

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* The countries are the ones the search bar already offers. */
  var countries = Array.prototype.map.call(nativeSelect.querySelectorAll("[data-country-code]"), function (item) {
    return { name: item.getAttribute("data-value"), code: item.getAttribute("data-country-code") };
  });
  if (!countries.length) return;

  var root = document.createElement("div");
  root.className = "d3-kyb-countrycb";
  root.setAttribute("data-d3-countrycb", "");
  root.innerHTML =
    '<label class="tds-field-label" for="d3-cc-input">Country</label>' +
    '<div class="tds-combobox tds-combobox--full-width">' +
    '<div class="tds-combobox__field tds-combobox__field--lg">' +
    '<span class="tds-combobox__leading-visual d3-cc-flag" aria-hidden="true" data-d3-cc-flag></span>' +
    '<input class="tds-combobox__input" id="d3-cc-input" type="text" role="combobox" aria-expanded="false" aria-controls="d3-cc-list" aria-autocomplete="list" autocomplete="off" placeholder="Search country" data-d3-cc-input>' +
    '<span class="tds-combobox__trailing-group"><span class="tds-caret tds-caret--default" aria-hidden="true">' + CARET + "</span></span></div>" +
    '<div class="tds-combobox__menu"><div class="tds-dropdown-panel d3-cc-panel" id="d3-cc-list" role="listbox" aria-label="Country" hidden>' +
    countries
      .map(function (c) {
        return (
          '<button type="button" class="tds-combobox__option d3-cc-option" role="option" tabindex="-1" data-d3-cc-option="' + esc(c.code) + '">' +
          '<span class="fi fi-' + esc(c.code) + '" aria-hidden="true"></span><span>' + esc(c.name) + "</span></button>"
        );
      })
      .join("") +
    '<p class="d3-cc-empty" hidden>No country matches.</p></div></div></div>';
  lookup.insertBefore(root, lookup.firstChild);

  var cb = root.querySelector(".tds-combobox");
  var input = root.querySelector("[data-d3-cc-input]");
  var panel = root.querySelector(".d3-cc-panel");
  var flag = root.querySelector("[data-d3-cc-flag]");
  var options = Array.prototype.slice.call(root.querySelectorAll("[data-d3-cc-option]"));
  var empty = root.querySelector(".d3-cc-empty");
  var currentCode = "us";

  function nameOf(code) {
    var c = countries.filter(function (x) { return x.code === code; })[0];
    return c ? c.name : "";
  }

  /* Nothing is chosen until the person chooses: the form below opens on that choice. */
  var chosen = false;

  function paint(code) {
    currentCode = code || currentCode;
    if (!chosen) {
      input.value = "";
      /* No country yet: a globe stands where the flag will be, so the field never looks like it is missing something. */
      flag.innerHTML = GLOBE;
      options.forEach(function (o) { o.classList.remove("tds-combobox__option--selected"); });
      return;
    }
    input.value = nameOf(currentCode);
    flag.innerHTML = '<span class="fi fi-' + esc(currentCode) + '"></span>';
    options.forEach(function (o) {
      o.classList.toggle("tds-combobox__option--selected", o.getAttribute("data-d3-cc-option") === currentCode);
    });
  }

  function reset() {
    chosen = false;
    setOpen(false);
    paint(currentCode);
  }

  function setOpen(open) {
    cb.classList.toggle("tds-combobox--open", open);
    panel.hidden = !open;
    input.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function filter(q) {
    var needle = String(q || "").trim().toLowerCase();
    var shown = 0;
    options.forEach(function (o) {
      var hit = !needle || o.textContent.toLowerCase().indexOf(needle) !== -1;
      o.hidden = !hit;
      if (hit) shown += 1;
    });
    empty.hidden = shown > 0;
  }

  function choose(code) {
    chosen = true;
    paint(code);
    setOpen(false);
    /* The search bar's own select does the real work (session, registry); the form opens on this choice. */
    var item = nativeSelect.querySelector('[data-country-code="' + code + '"]');
    if (item) item.click();
    document.dispatchEvent(new CustomEvent("d3-cc:chosen", { detail: { code: code } }));
  }

  input.addEventListener("focus", function () {
    input.select();
    filter("");
    setOpen(true);
  });
  input.addEventListener("input", function () {
    filter(input.value);
    setOpen(true);
  });
  input.addEventListener("keydown", function (e) {
    var visible = options.filter(function (o) { return !o.hidden; });
    var at = visible.findIndex(function (o) { return o.classList.contains("tds-combobox__option--active"); });
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      if (at !== -1) visible[at].classList.remove("tds-combobox__option--active");
      at = e.key === "ArrowDown" ? (at + 1) % visible.length : (at - 1 + visible.length) % visible.length;
      if (visible[at]) {
        visible[at].classList.add("tds-combobox__option--active");
        visible[at].scrollIntoView({ block: "nearest" });
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      var pick = visible[at] || (visible.length === 1 ? visible[0] : null);
      if (pick) choose(pick.getAttribute("data-d3-cc-option"));
    } else if (e.key === "Escape") {
      paint(currentCode);
      setOpen(false);
    }
  });
  panel.addEventListener("mousedown", function (e) { e.preventDefault(); });
  panel.addEventListener("click", function (e) {
    var o = e.target.closest("[data-d3-cc-option]");
    if (o) choose(o.getAttribute("data-d3-cc-option"));
  });
  document.addEventListener("click", function (e) {
    if (!root.contains(e.target) && cb.classList.contains("tds-combobox--open")) {
      paint(currentCode);
      setOpen(false);
    }
  });

  /* The country can also change from the AI panel or a reset: follow the search bar's select. */
  function followNative() {
    var sel = nativeSelect.querySelector(".tds-action-list-item--selected");
    var code = sel && sel.getAttribute("data-country-code");
    if (code && code !== currentCode) {
      currentCode = code;
      if (chosen) paint(code);
    }
  }
  new MutationObserver(followNative).observe(nativeSelect, { attributes: true, subtree: true, attributeFilter: ["class"] });
  followNative();
  paint(currentCode);
  document.addEventListener("d3-cc:reset", reset);
})();
