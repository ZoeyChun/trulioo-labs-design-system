/* Demo 3 — soft edge fades on the table while columns overflow horizontally.
   Right: more columns off-screen. Left: content tucked under the sticky
   Transaction column. Contained to the table host so toolbar / menus stay above. */
(function () {
  "use strict";

  var scroll = document.querySelector(".ut-tx-table-scroll");
  var wrap = document.querySelector(".ut-tx-table-scroll .tds-data-table__wrapper");
  if (scroll && wrap) {
    function syncStickyMetrics() {
      var nameCol = wrap.querySelector(".ut-tx-th-name, .ut-tx-td-name");
      if (nameCol) {
        scroll.style.setProperty(
          "--ut-tx-sticky-name-width",
          Math.round(nameCol.getBoundingClientRect().width) + "px"
        );
      }
      var head = wrap.querySelector(".ut-tx-table thead");
      if (head) {
        scroll.style.setProperty(
          "--ut-tx-thead-height",
          Math.round(head.getBoundingClientRect().height) + "px"
        );
      }
      /* Keep fades out of the scrollbar gutters. */
      scroll.style.setProperty(
        "--ut-tx-scrollbar-width",
        Math.max(0, wrap.offsetWidth - wrap.clientWidth) + "px"
      );
      scroll.style.setProperty(
        "--ut-tx-scrollbar-height",
        Math.max(0, wrap.offsetHeight - wrap.clientHeight) + "px"
      );
    }

    function sync() {
      syncStickyMetrics();
      var overflow = wrap.scrollWidth - wrap.clientWidth;
      var hasHScroll = overflow > 2;
      var atStart = wrap.scrollLeft <= 2;
      var atEnd = !hasHScroll || overflow - wrap.scrollLeft <= 2;
      scroll.classList.toggle("has-h-scroll", hasHScroll);
      scroll.classList.toggle("is-at-start", atStart);
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
