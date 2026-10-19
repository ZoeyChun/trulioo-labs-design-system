/**
 * Portal / Labs embed mode.
 * When ?embed=1 or the page is framed (demo-3 Labs iframe), hide the
 * in-page side nav — the parent portal already owns navigation.
 */
(function () {
  "use strict";

  function isFramed() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  function wantsEmbed() {
    try {
      if (new URLSearchParams(window.location.search).get("embed") === "1") return true;
    } catch (e) {}
    return isFramed();
  }

  if (!wantsEmbed()) return;

  document.documentElement.classList.add("app-embed");

  function markBody() {
    if (document.body) document.body.classList.add("app-embed");
  }
  if (document.body) markBody();
  else document.addEventListener("DOMContentLoaded", markBody);

  function withEmbed(url) {
    if (!url || url.charAt(0) === "#" || /^(mailto|tel|javascript):/i.test(url)) return url;
    try {
      var abs = new URL(url, window.location.href);
      if (abs.origin !== window.location.origin) return url;
      abs.searchParams.set("embed", "1");
      return abs.href;
    } catch (e) {
      return url;
    }
  }

  /* Keep embed=1 across in-lab navigations (back links, result pages, etc.). */
  document.addEventListener(
    "click",
    function (event) {
      var a = event.target && event.target.closest ? event.target.closest("a[href]") : null;
      if (!a) return;
      var next = withEmbed(a.getAttribute("href"));
      if (next && next !== a.getAttribute("href")) {
        a.setAttribute("href", next);
      }
    },
    true
  );

  window.AppEmbed = {
    active: true,
    withEmbed: withEmbed
  };
})();
