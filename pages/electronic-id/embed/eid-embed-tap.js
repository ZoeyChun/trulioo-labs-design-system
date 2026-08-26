(function (global) {
  "use strict";

  function initInteractive() {
    var params = new URLSearchParams(global.location.search);
    var interactive = params.get("interactive") === "1";
    if (global.self !== global.top) document.documentElement.classList.add("preview");
    if (interactive) document.documentElement.classList.add("eid-embed--interactive");
    return interactive;
  }

  function bindTap(el, type, extra) {
    if (!el) return;
    el.style.cursor = "pointer";
    if (global.TdsTapCue) global.TdsTapCue.show(el);
    function go() {
      if (global.TdsTapCue) global.TdsTapCue.hide();
      if (global.parent && global.parent !== global) {
        var msg = { source: "eid-embed", type: type };
        if (extra) {
          Object.keys(extra).forEach(function (key) {
            msg[key] = extra[key];
          });
        }
        global.parent.postMessage(msg, "*");
      }
    }
    el.addEventListener("click", go);
    el.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      go();
    });
  }

  function forwardEmbedMessages() {
    global.addEventListener("message", function (event) {
      var data = event.data;
      if (!data || data.source !== "eid-embed") return;
      if (global.parent && global.parent !== global) {
        global.parent.postMessage(data, "*");
      }
    });
  }

  global.EidEmbedTap = {
    initInteractive: initInteractive,
    bindTap: bindTap,
    forwardEmbedMessages: forwardEmbedMessages
  };
})(typeof window !== "undefined" ? window : this);
