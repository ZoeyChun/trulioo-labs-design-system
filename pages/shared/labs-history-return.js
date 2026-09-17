/**
 * Labs back navigation.
 *
 * history.back() is unsafe here: returning from a result via location.href
 * makes the transactions referrer the result page (ping-pong), and bfcache
 * can restore an expanded sidenav ("back opens nav").
 */
(function (global) {
  "use strict";

  var KEY = "labsHistoryReturnUrl";

  function consume() {
    try {
      var url = global.sessionStorage.getItem(KEY);
      if (url) global.sessionStorage.removeItem(KEY);
      return url;
    } catch (e) {
      return null;
    }
  }

  function parseUrl(href) {
    try {
      return new URL(href, global.location.href);
    } catch (e) {
      return null;
    }
  }

  function samePath(a, b) {
    var ua = parseUrl(a);
    var ub = parseUrl(b);
    return !!(ua && ub && ua.origin === ub.origin && ua.pathname === ub.pathname);
  }

  function labsHomeUrl() {
    try {
      if (global.location.pathname.indexOf("/unified-intelligence-home/") !== -1) {
        return new URL("labs.html", global.location.href).href;
      }
      return new URL("../unified-intelligence-home/labs.html", global.location.href).href;
    } catch (e) {
      return "../unified-intelligence-home/labs.html";
    }
  }

  function isLabsOrigin(href) {
    var url = parseUrl(href);
    return !!(url && url.origin === global.location.origin);
  }

  function isProductDetailUrl(href) {
    var url = parseUrl(href);
    if (!url) return false;
    var path = url.pathname;
    if (/transactions\.html$/i.test(path)) return false;
    if (/\/labs\.html$/i.test(path)) return false;
    return /\/(document-verification|bank-verification|electronic-id|device-intelligence|KYB Results|kyc-form|KYC eIDAS|business-reputation-review)\//i.test(
      path
    );
  }

  function goTo(url) {
    if (!url) return false;
    global.location.href = url;
    return true;
  }

  global.LabsHistoryReturn = {
    go: function (fallback) {
      var url = consume() || fallback || "";
      if (!url) return false;
      return goTo(url);
    },
    pageBack: function (fallback) {
      try {
        var stored = global.sessionStorage.getItem(KEY);
        if (stored && samePath(stored, global.location.href)) {
          global.sessionStorage.removeItem(KEY);
        }
      } catch (e) { /* demo-only */ }
      if (this.go()) return true;

      var dest = fallback || labsHomeUrl();
      var explicit = parseUrl(dest);
      if (explicit) dest = explicit.href;

      var referrer = global.document.referrer;
      if (
        referrer &&
        isLabsOrigin(referrer) &&
        !samePath(referrer, global.location.href) &&
        !isProductDetailUrl(referrer)
      ) {
        return goTo(referrer);
      }

      return goTo(dest);
    }
  };
})(window);
