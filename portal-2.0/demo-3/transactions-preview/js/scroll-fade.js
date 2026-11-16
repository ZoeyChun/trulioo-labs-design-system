/* Demo 3 — the soft fade on the right edge of the table only hints that more columns follow.
   Once the table is scrolled to its end (or fits), it goes away so the last column — the "..."
   menu — is fully visible and clickable. */
(function () {
  "use strict";

  var scroll = document.querySelector(".ut-tx-table-scroll");
  var wrap = document.querySelector(".ut-tx-table-scroll .tds-data-table__wrapper");
  if (scroll && wrap) {
    function sync() {
      var atEnd = wrap.scrollWidth - wrap.clientWidth - wrap.scrollLeft <= 2;
      scroll.classList.toggle("is-at-end", atEnd);
    }

    wrap.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    new MutationObserver(sync).observe(wrap, { childList: true, subtree: true });
    sync();
  }

  /* The transaction list is one long page. Offer a way back up once the
     view has moved past the toolbar. */
  var topBtn = document.getElementById("utTxScrollTop");
  if (topBtn) {
    var threshold = 48;
    function scrollY() {
      return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
    function syncTop() {
      topBtn.hidden = scrollY() < threshold;
    }
    window.addEventListener("scroll", syncTop, { passive: true });
    topBtn.addEventListener("click", function () {
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
    syncTop();
  }
})();
