/* Demo 3 — home skin: dark (default, Figma 1609:50255) or light (?home=light). */
(function () {
  "use strict";

  function resolveSkin() {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get("home") === "light") return "light";
      if (params.get("home") === "dark") return "dark";
    } catch (e) {}
    return "dark";
  }

  function placeComposer(skin) {
    var home = document.querySelector(".d1-home");
    var hero = document.querySelector(".d3-home-hero");
    var composer = document.querySelector("[data-d1-composer]");
    if (!home || !composer) return;
    if (skin === "dark" && hero) {
      hero.appendChild(composer);
      return;
    }
    var brief = home.querySelector(".d1-brief");
    if (brief) home.insertBefore(composer, brief);
    else home.appendChild(composer);
  }

  function applyHeroPad(skin) {
    var hero = document.querySelector(".d3-home-hero");
    if (!hero) return;
    if (skin === "dark") {
      /* Inline — survives file:// (query-string CSS often fails there). */
      hero.style.cssText =
        "box-sizing:border-box;padding:96px 24px;background:#004c45;border-radius:16px";
    } else {
      hero.style.cssText = "";
    }
  }

  function apply() {
    var skin = resolveSkin();
    var shell = document.querySelector(".d1-shell");
    var home = document.querySelector(".d1-home");
    if (shell) shell.setAttribute("data-d3-home-skin", skin);
    if (home) home.setAttribute("data-d3-home-skin", skin);
    document.documentElement.setAttribute("data-d3-home-skin", skin);
    placeComposer(skin);
    applyHeroPad(skin);
  }

  apply();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  }
})();
