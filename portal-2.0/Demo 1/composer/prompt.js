/* Demo 1 composer. One root: [data-d1-composer].
   Dispatches d1-composer:submit and d1-composer:agent on that root. */
(function () {
  var AGENTS = [
    { id: "auto", label: "Auto" },
    { id: "kyb", label: "KYB Agent" },
    { id: "kyc", label: "KYC Agent" }
  ];

  var FALLBACK_LINE = "Verify Acme Holdings in the United Kingdom.";

  function mount(root) {
    var form = root.querySelector("[data-d1-form]");
    var input = root.querySelector("[data-d1-input]");
    var send = root.querySelector("[data-d1-send]");
    var add = root.querySelector("[data-d1-add]");
    var fileInput = root.querySelector("[data-d1-file]");
    var fileList = root.querySelector("[data-d1-file-list]");
    var mode = root.querySelector("[data-d1-agent]");
    var modeLabel = root.querySelector("[data-d1-agent-label]");
    var menu = root.querySelector("[data-d1-agent-menu]");
    var mic = root.querySelector("[data-d1-mic]");
    var status = root.querySelector("[data-d1-status]");
    if (!form || !input || !send) return;

    var agent = AGENTS[0];
    var files = [];
    var recognition = null;
    var listening = false;
    var fallbackTimer = 0;

    function say(message) {
      if (status) status.textContent = message;
    }

    function canSend() {
      return input.value.trim().length > 0 || files.length > 0;
    }

    var sendIcon = send.querySelector("img");

    function syncSend() {
      var ready = canSend();
      send.disabled = !ready;
      send.classList.toggle("tds-icon-btn--primary", ready);
      if (sendIcon) sendIcon.src = ready ? "assets/icons/arrow-up-on.svg" : "assets/icons/arrow-up.svg";
    }

    function paintAgent() {
      if (modeLabel) modeLabel.textContent = agent.label;
      if (mode) mode.setAttribute("aria-label", "Agent, " + agent.label);
      root.querySelectorAll("[data-d1-agent-option]").forEach(function (option) {
        option.setAttribute("aria-selected", option.getAttribute("data-agent") === agent.id ? "true" : "false");
      });
      root.querySelectorAll("[data-d1-chip]").forEach(function (chip) {
        chip.setAttribute("aria-pressed", chip.getAttribute("data-agent") === agent.id ? "true" : "false");
      });
    }

    function setAgent(next, announce) {
      agent = next;
      paintAgent();
      if (announce) say("Agent set to " + agent.label + ".");
      root.dispatchEvent(new CustomEvent("d1-composer:agent", {
        bubbles: true,
        detail: { agent: agent.id, agentLabel: agent.label }
      }));
    }

    function closeMenu() {
      if (!menu || !mode) return;
      menu.hidden = true;
      mode.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
      if (!menu || !mode) return;
      menu.hidden = false;
      mode.setAttribute("aria-expanded", "true");
    }

    function renderFiles() {
      if (!fileList) return;
      fileList.replaceChildren();
      files.forEach(function (file, index) {
        var item = document.createElement("li");
        item.className = "d1-file";
        var name = document.createElement("span");
        name.className = "d1-file__name";
        name.textContent = file.name;
        var remove = document.createElement("button");
        remove.type = "button";
        remove.className = "d1-file__remove";
        remove.setAttribute("aria-label", "Remove " + file.name);
        remove.textContent = "\u00d7";
        remove.addEventListener("click", function () {
          files.splice(index, 1);
          renderFiles();
          syncSend();
        });
        item.append(name, remove);
        fileList.append(item);
      });
      syncSend();
    }

    function stopVoice() {
      listening = false;
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
        fallbackTimer = 0;
      }
      if (recognition) {
        var current = recognition;
        recognition = null;
        try { current.abort(); } catch (error) { /* already ended */ }
      }
      if (mic) mic.setAttribute("aria-pressed", "false");
    }

    function applyTranscript(text) {
      var next = text.trim();
      if (!next) return;
      input.value = input.value.trim() ? input.value.replace(/\s+$/, "") + " " + next : next;
      input.dispatchEvent(new Event("input"));
      syncSend();
    }

    function scriptedVoice() {
      listening = true;
      if (mic) mic.setAttribute("aria-pressed", "true");
      say("Listening…");
      fallbackTimer = window.setTimeout(function () {
        fallbackTimer = 0;
        listening = false;
        if (mic) mic.setAttribute("aria-pressed", "false");
        applyTranscript(FALLBACK_LINE);
        say("Voice input added.");
        input.focus();
      }, 700);
    }

    function startVoice() {
      if (listening) {
        stopVoice();
        say("Voice input stopped.");
        return;
      }
      var Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Speech) {
        scriptedVoice();
        return;
      }
      var heard = false;
      var rec = new Speech();
      recognition = rec;
      listening = true;
      if (mic) mic.setAttribute("aria-pressed", "true");
      say("Listening…");
      rec.lang = "en-US";
      rec.interimResults = true;
      rec.onresult = function (event) {
        heard = true;
        var transcript = "";
        for (var i = 0; i < event.results.length; i += 1) {
          transcript += event.results[i][0].transcript;
        }
        input.value = transcript;
        input.dispatchEvent(new Event("input"));
        syncSend();
      };
      rec.onerror = function (event) {
        if (!event || event.error === "aborted") return;
        recognition = null;
        listening = false;
        if (mic) mic.setAttribute("aria-pressed", "false");
        if (!heard) scriptedVoice();
      };
      rec.onend = function () {
        if (recognition !== rec) return;
        recognition = null;
        listening = false;
        if (mic) mic.setAttribute("aria-pressed", "false");
      };
      try {
        rec.start();
      } catch (error) {
        recognition = null;
        listening = false;
        scriptedVoice();
      }
    }

    function submit() {
      var text = input.value.trim();
      if (!text && files.length === 0) return;
      stopVoice();
      var detail = {
        text: text,
        agent: agent.id,
        agentLabel: agent.label,
        attachments: files.map(function (file) {
          return { name: file.name, type: file.type, size: file.size };
        })
      };
      root.dispatchEvent(new CustomEvent("d1-composer:submit", { bubbles: true, detail: detail }));
      input.value = "";
      files = [];
      renderFiles();
      closeMenu();
      say("Sent to " + agent.label + ".");
      input.focus();
    }

    input.addEventListener("input", syncSend);
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        submit();
      }
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      submit();
    });

    root.querySelectorAll("[data-d1-chip]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var id = chip.getAttribute("data-agent");
        var next = AGENTS.filter(function (item) { return item.id === id; })[0];
        if (next) setAgent(next, true);
        input.value = chip.getAttribute("data-prompt") || "";
        input.dispatchEvent(new Event("input"));
        closeMenu();
        input.focus();
      });
    });

    if (mode && menu) {
      mode.addEventListener("click", function () {
        if (menu.hidden) openMenu();
        else closeMenu();
      });
      menu.querySelectorAll("[data-d1-agent-option]").forEach(function (option) {
        option.addEventListener("click", function () {
          var id = option.getAttribute("data-agent");
          var next = AGENTS.filter(function (item) { return item.id === id; })[0];
          if (next) setAgent(next, true);
          closeMenu();
          mode.focus();
        });
      });
    }

    document.addEventListener("click", function (event) {
      if (!root.contains(event.target)) closeMenu();
      else if (mode && !mode.contains(event.target) && menu && !menu.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    if (add && fileInput) {
      add.addEventListener("click", function () {
        fileInput.click();
      });
      fileInput.addEventListener("change", function () {
        Array.prototype.forEach.call(fileInput.files || [], function (file) {
          var duplicate = files.some(function (existing) {
            return existing.name === file.name && existing.size === file.size && existing.lastModified === file.lastModified;
          });
          if (!duplicate) files.push(file);
        });
        fileInput.value = "";
        renderFiles();
        if (files.length) say(files.length + (files.length === 1 ? " attachment added." : " attachments added."));
      });
    }

    if (mic) mic.addEventListener("click", startVoice);

    paintAgent();
    syncSend();
  }

  document.querySelectorAll("[data-d1-composer]").forEach(mount);
})();
