/* Demo 3 — Org Admin Agent: grounded NL over organization members / invites. */
(function () {
  var shell = document.querySelector(".d1-shell");
  var composer = document.querySelector("[data-d1-composer]");
  var thread = document.querySelector("[data-d1-thread]");
  var follow = document.querySelector("[data-d1-follow]");
  if (!shell || !composer || !thread) return;

  var busy = false;
  var SUGGEST = [
    { q: "Invite a new user" },
    { q: "Show pending invitations" },
    { q: "Show locked accounts" }
  ];

  function onOrg() {
    return shell.getAttribute("data-d3-view") === "org";
  }

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function stick() {
    var pane = document.querySelector("[data-d3-chat-thread]");
    var scroller = pane || thread.parentElement;
    if (!scroller) return;
    scroller.scrollTop = scroller.scrollHeight;
  }

  function place(node) {
    thread.appendChild(node);
    stick();
    return node;
  }

  function setBusy(on) {
    busy = on;
    composer.dispatchEvent(new CustomEvent("d1-composer:state", { detail: { busy: on } }));
  }

  function parkActive() {
    document.dispatchEvent(new CustomEvent("d3-kyb:park-composer"));
    if (window.D3Nav) window.D3Nav.markChatActive();
  }

  function renderUser(text) {
    var section = document.createElement("section");
    section.className = "d1-turn d1-enter";
    section.innerHTML = '<div class="d1-user"><p></p></div>';
    section.querySelector("p").textContent = text;
    place(section);
  }

  function playHtml(html) {
    var section = document.createElement("section");
    section.className = "d1-turn d1-enter";
    section.innerHTML = '<div class="d1-ai d1-block">' + html + "</div>";
    place(section);
  }

  function setSuggestions(list) {
    if (!follow) return;
    var rows = follow.querySelectorAll("[data-d1-suggest]");
    rows.forEach(function (btn, i) {
      var span = btn.querySelector("span");
      if (list[i] && span) {
        span.textContent = list[i].q;
        btn.setAttribute("data-d3-org-suggest", list[i].q);
      }
    });
    follow.classList.add("is-on");
    follow.hidden = false;
  }

  function hideFollow() {
    if (follow) {
      follow.classList.remove("is-on");
      follow.hidden = true;
    }
  }

  function cmd(name, payload) {
    if (window.D3Org && window.D3Org.post) window.D3Org.post(name, payload);
  }

  function parse(text) {
    var q = String(text || "").trim();
    var lower = q.toLowerCase();
    if (/invite|add (a )?user|new user/.test(lower)) return { intent: "invite" };
    if (/pending|invitation/.test(lower)) return { intent: "pending" };
    if (/locked|lock(ed)? account/.test(lower)) return { intent: "locked" };
    if (/expired/.test(lower)) return { intent: "expired" };
    if (/org users|all users|member list|show users/.test(lower)) return { intent: "users" };
    if (/summar|overview|how many/.test(lower)) return { intent: "summary" };
    var nameMatch = q.match(/(?:find|show|open)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/);
    if (nameMatch) return { intent: "find", name: nameMatch[1] };
    if (/^(ethan|sofia|lucas|maya|jane)/i.test(q)) return { intent: "find", name: q };
    return { intent: "help" };
  }

  function respond(text) {
    if (!onOrg() || busy || !text) return;
    parkActive();
    hideFollow();
    setBusy(true);
    renderUser(text);
    var parsed = parse(text);

    window.setTimeout(function () {
      if (parsed.intent === "invite") {
        cmd("invite");
        playHtml(
          "<p>Opening <strong>Invite User</strong>. You can set name, email, role, and permissions on the right.</p>"
        );
      } else if (parsed.intent === "pending") {
        cmd("tab", { tab: "invitations" });
        playHtml(
          "<p>Here are the <strong>pending invitations</strong>. You can resend or remove an invite from the actions column.</p>"
        );
      } else if (parsed.intent === "locked") {
        cmd("tab", { tab: "users" });
        cmd("filter", { status: "Locked" });
        playHtml(
          "<p>Showing <strong>locked accounts</strong> in Org Users. Lucas Rivera is locked in this demo — unlock from the row actions.</p>"
        );
      } else if (parsed.intent === "expired") {
        cmd("tab", { tab: "invitations" });
        playHtml(
          "<p>Expired invitations are on the Pending Invitations tab (status <strong>Expired</strong>). You can remove them from the actions menu.</p>"
        );
      } else if (parsed.intent === "users") {
        cmd("tab", { tab: "users" });
        cmd("filter", { status: "" });
        playHtml(
          "<p>Org Users is open. This demo has 24 org users, 3 admins, and 2 locked accounts.</p>"
        );
      } else if (parsed.intent === "summary") {
        playHtml(
          "<p>Pacific Ridge Financial — <strong>24</strong> org users, <strong>3</strong> admins, <strong>2</strong> locked, <strong>3</strong> pending invites, <strong>1</strong> expired.</p>"
        );
      } else if (parsed.intent === "find") {
        cmd("tab", { tab: "users" });
        cmd("find", { name: parsed.name });
        playHtml(
          "<p>Looking up <strong>" +
            esc(parsed.name) +
            "</strong> in Org Users. If they’re in the demo table, that row is highlighted on the right.</p>"
        );
      } else {
        playHtml(
          "<p>I can invite a user, show pending or expired invitations, list locked accounts, or find someone by name. Try one of the prompts below.</p>"
        );
      }
      setSuggestions(SUGGEST);
      setBusy(false);
      stick();
    }, 380);
  }

  composer.addEventListener(
    "d1-composer:submit",
    function (event) {
      if (!onOrg()) return;
      event.stopImmediatePropagation();
      var detail = event.detail || {};
      var text = detail.text || "";
      if (!text || busy) return;
      respond(text);
    },
    true
  );

  if (follow) {
    follow.addEventListener(
      "click",
      function (event) {
        if (!onOrg()) return;
        var btn = event.target.closest("[data-d1-suggest]");
        if (!btn) return;
        var text =
          btn.getAttribute("data-d3-org-suggest") ||
          (btn.querySelector("span") && btn.querySelector("span").textContent.trim()) ||
          "";
        if (!text) return;
        event.stopImmediatePropagation();
        respond(text);
      },
      true
    );
  }

  document.addEventListener(
    "d3-chat:send",
    function (event) {
      if (!onOrg() && (event.detail || {}).agent !== "org") return;
      if ((event.detail || {}).agent && event.detail.agent !== "org" && !onOrg()) return;
      if (!onOrg() && (event.detail || {}).agent === "org") {
        if (window.D3Org) window.D3Org.open();
      }
      if (!onOrg() && (event.detail || {}).agent !== "org") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      var text = (event.detail || {}).text || "";
      if (!text) return;
      respond(text);
    },
    true
  );

  window.D3OrgAgent = { respond: respond };
})();
