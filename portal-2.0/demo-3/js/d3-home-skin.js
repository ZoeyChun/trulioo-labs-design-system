/* Demo 3 — home skin: dark (default, Figma 1609:50255) or light. Default (no param): 4 (globe). Options: ?home=1 (dark), 2 (light), 3 (full-bleed), 4 (globe), 5 (globe at side); light/dark kept as aliases. */
(function () {
  "use strict";

  function homeParam() {
    try {
      return new URLSearchParams(window.location.search).get("home");
    } catch (e) {}
    return null;
  }

  /* Layout options built on the dark skin: ?home=3 (full-bleed), 4 (globe),
     5 (globe at side). Each loads css/d3-home-N.css plus the listed js/d3-home-X.js
     files, in order (home 5 reuses the home 4 globe). */
  var ASSET_VERSION = "30";
  /* Main home when no ?home= is given. Explicit ?home=1|dark|2|light|3|5 still wins. */
  var DEFAULT_HOME = "4";
  var LAYOUTS = { "3": { js: [] }, "4": { js: ["4"] }, "5": { js: ["4", "5"] } };

  function applyLayout() {
    var n = homeParam() || DEFAULT_HOME;
    var cfg = LAYOUTS[n];
    if (!cfg) return;
    document.documentElement.setAttribute("data-d3-home-layout", n);
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/d3-home-" + n + ".css?v=" + ASSET_VERSION;
    document.head.appendChild(link);
    cfg.js.forEach(function (name) {
      var script = document.createElement("script");
      script.src = "js/d3-home-" + name + ".js?v=" + ASSET_VERSION;
      script.async = false;
      document.head.appendChild(script);
    });
  }

  function resolveSkin() {
    var home = homeParam();
    if (home === "2" || home === "light") return "light";
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

  applyLayout();
  apply();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  }
})();
