(function (global) {
  "use strict";

  var KEY = "labsHistoryReturnUrl";

  function consume() {
    try {
      var url = sessionStorage.getItem(KEY);
      if (url) sessionStorage.removeItem(KEY);
      return url;
    } catch (e) {
      return null;
    }
  }

  global.LabsHistoryReturn = {
    go: function (fallback) {
      var url = consume() || fallback || "";
      if (!url) return false;
      var target = window.top && window.top !== window ? window.top : window;
      target.location.href = url;
      return true;
    }
  };
})(window);
