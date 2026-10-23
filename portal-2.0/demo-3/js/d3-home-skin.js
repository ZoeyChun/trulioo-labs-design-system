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
    var body = hero && hero.querySelector(".d3-home-hero__body");
    var composer = document.querySelector("[data-d1-composer]");
    if (!home || !composer) return;
    /* Dark: composer sits in the padded body (not on the chrome shell). */
    if (skin === "dark" && (body || hero)) {
      (body || hero).appendChild(composer);
      return;
    }
    var brief = home.querySelector(".d1-brief");
    if (brief) home.insertBefore(composer, brief);
    else home.appendChild(composer);
  }

  function apply() {
    var skin = resolveSkin();
    var shell = document.querySelector(".d1-shell");
    var home = document.querySelector(".d1-home");
    var hero = document.querySelector(".d3-home-hero");
    if (shell) shell.setAttribute("data-d3-home-skin", skin);
    if (home) home.setAttribute("data-d3-home-skin", skin);
    document.documentElement.setAttribute("data-d3-home-skin", skin);
    /* Clear any legacy inline pad from older builds. */
    if (hero) hero.style.cssText = "";
    placeComposer(skin);
  }

  apply();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  }
})();
