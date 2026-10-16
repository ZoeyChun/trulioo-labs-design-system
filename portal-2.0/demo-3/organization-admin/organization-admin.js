(function () {
  var PERMS = [
    { key: "transactions", label: "View transactions" },
    { key: "users", label: "Invite and manage users" },
    { key: "workflows", label: "Manage workflows" },
    { key: "audit", label: "View audit log" },
    { key: "billing", label: "Manage billing" }
  ];

  var stats = { users: 24, admins: 3, locked: 2, pending: 3, expired: 1 };
  var editingId = null;
  var confirmTarget = null;
  var snackTimer = 0;
  var resendTimers = {};

  var users = [
    person("jane", "Jane", "Doe", "janedoe@trulioo.com", "Org Admin", "Active", "Oct 1, 2026, 9:42 AM", { transactions: true, workflows: false, billing: false, users: false, audit: true }),
    person("ethan", "Ethan", "Brooks", "ethan.brooks@acme.com", "Org User", "Active", "Sep 29, 2026, 3:18 PM", { transactions: true, workflows: true, billing: false, users: false, audit: false }),
    person("sofia", "Sofia", "Chen", "sofia.chen@acme.com", "Org User", "Active", "Sep 25, 2026, 11:07 AM", { transactions: true, workflows: false, billing: false, users: false, audit: true }),
    person("lucas", "Lucas", "Rivera", "lucas.rivera@acme.com", "Org User", "Locked", "Sep 30, 2026, 6:53 PM", { transactions: false, workflows: false, billing: false, users: false, audit: false }),
    person("maya", "Maya", "Patel", "maya.patel@acme.com", "Org User", "Active", "Sep 22, 2026, 8:26 AM", { transactions: true, workflows: false, billing: true, users: false, audit: false })
  ];

  var invites = [
    invite("jane", "Jane", "Doe", "janedoe@trulioo.com", "Org User", "Pending", "Oct 1, 2026, 9:42 AM", "Oct 8, 2026, 12:00 AM"),
    invite("ethan", "Ethan", "Brooks", "ethan.brooks@acme.com", "Org User", "Pending", "Sep 29, 2026, 3:18 PM", "Oct 4, 2026, 12:00 AM"),
    invite("sofia", "Sofia", "Chen", "sofia.chen@acme.com", "Org User", "Pending", "Sep 25, 2026, 11:07 AM", "Oct 1, 2026, 12:00 AM"),
    invite("lucas", "Lucas", "Rivera", "lucas.rivera@acme.com", "Org User", "Expired", "Sep 30, 2026, 6:53 PM", "--")
  ];

  function person(id, first, last, email, role, status, lastLogin, permissions) {
    return { id: id, first: first, last: last, email: email, role: role, status: status, lastLogin: lastLogin, permissions: permissions };
  }

  function invite(id, first, last, email, role, status, sent, expires) {
    return { id: id, first: first, last: last, email: email, role: role, status: status, sent: sent, expires: expires };
  }

  function faIcon(className) {
    return '<i class="' + className + '" aria-hidden="true"></i>';
  }

  function faSvg(viewBox, path) {
    return '<svg class="fa-glyph" viewBox="' + viewBox + '" aria-hidden="true"><path fill="currentColor" d="' + path + '"/></svg>';
  }

  function icon(name) {
    if (name === "lock") return faIcon("fa-solid fa-lock");
    if (name === "unlock") {
      return faSvg("0 -32 384 544", "M112 96C112 52 148 16 192 16C234 16 269 49 272 90C273 103 284 113 298 112C311 111 321 99 320 86C315 20 259 -32 192 -32C121 -32 64 25 64 96V160C29 160 0 189 0 224V448C0 483 29 512 64 512H320C355 512 384 483 384 448V224C384 189 355 160 320 160H112V96ZM64 208H112H320C329 208 336 215 336 224V448C336 457 329 464 320 464H64C55 464 48 457 48 448V224C48 215 55 208 64 208Z");
    }
    if (name === "ellipsis") return faIcon("fa-solid fa-ellipsis");
    if (name === "refresh") {
      return faSvg("0 -32 512 576", "M403 109C322 28 190 28 109 109L82 136H160C173 136 184 147 184 160C184 173 173 184 160 184H24C11 184 0 173 0 160V24C0 11 11 0 24 0C37 0 48 11 48 24V102L75 75C175 -25 337 -25 437 75C480 118 505 173 511 230C512 243 503 255 489 256C476 257 464 248 463 234C458 189 438 144 403 109ZM2 283C0 269 10 258 23 256C36 255 48 264 49 278C54 323 74 368 109 403C190 484 322 484 403 403L430 376H352C339 376 328 365 328 352C328 339 339 328 352 328H488C502 328 512 339 512 352V488C512 501 502 512 488 512C475 512 464 501 464 488V410L437 437C337 537 175 537 75 437C32 394 7 339 2 283Z");
    }
    if (name === "trash") return faIcon("fa-regular fa-trash-can");
    if (name === "pen") return faIcon("fa-solid fa-pen");
    if (name === "check") return faIcon("fa-solid fa-check");
    return "";
  }

  function tipButton(label, glyph, attrs, hostClass) {
    return '<span class="org-tip-host' + (hostClass ? " " + hostClass : "") + '"><button type="button" class="tds-icon-btn tds-icon-btn--invisible tds-icon-btn--sm" aria-label="' + label + '" ' + (attrs || "") + '><span class="tds-icon-btn__icon" aria-hidden="true">' + icon(glyph) + '</span></button><span class="tds-tooltip tds-tooltip--dark tds-tooltip--bottom" role="tooltip"><span class="tds-tooltip__body"><span class="tds-tooltip__text">' + label + '</span></span><span class="tds-tooltip__caret" aria-hidden="true"></span></span></span>';
  }

  function weekFromNow() {
    var date = new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    date.setDate(date.getDate() + 7);
    var hours = date.getHours();
    var suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : String(minutes);
    return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + ", " + hours + ":" + minutes + " " + suffix;
  }

  function tag(label, type) {
    return '<span class="tds-tag tds-tag--sm tds-tag--' + type + '">' + label + '</span>';
  }

  function statusTag(status) {
    if (status === "Active" || status === "Accepted") return tag(status, "positive");
    if (status === "Locked") return tag(status, "negative");
    if (status === "Pending") return tag(status, "intermediate");
    return tag(status, "default");
  }

  function roleTag(role) {
    return tag(role, "default");
  }

  function renderStats() {
    var items = [
      ["Org users", stats.users],
      ["Org admins", stats.admins],
      ["Locked accounts", stats.locked],
      ["Pending invitations", stats.pending],
      ["Expired invitations", stats.expired]
    ];
    document.getElementById("stats").innerHTML = items.map(function (item) {
      return '<div class="org-stat"><p class="org-stat__label">' + item[0] + '</p><p class="org-stat__value">' + item[1] + '</p></div>';
    }).join("");
    document.getElementById("count-users").textContent = String(stats.users);
    document.getElementById("count-invites").textContent = String(stats.pending);
  }

  function renderUsers() {
    document.getElementById("users-body").innerHTML = users.map(function (user) {
      var locked = user.status === "Locked";
      return '<tr data-user="' + user.id + '">' +
        '<td class="tds-data-table__text-cell"><div class="org-name"><span class="org-name__primary">' + user.first + " " + user.last + '</span><span class="org-name__secondary">' + user.email + '</span></div></td>' +
        '<td><span class="tds-data-table__label-cell">' + roleTag(user.role) + '</span></td>' +
        '<td><span class="tds-data-table__label-cell">' + statusTag(user.status) + '</span></td>' +
        '<td>' + user.lastLogin + '</td>' +
        '<td><div class="tds-data-table__actions-cell">' +
          tipButton(locked ? "Unlock" : "Lock", locked ? "lock" : "unlock", 'data-lock="' + user.id + '"') +
          tipButton("More", "ellipsis", 'data-menu="' + user.id + '" aria-haspopup="menu" aria-expanded="false"') +
          '<div class="tds-dropdown-panel org-menu" role="menu" hidden data-menu-panel="' + user.id + '">' +
            '<button type="button" class="tds-action-list-item" role="menuitem" data-edit="' + user.id + '"><span class="tds-action-list-item__leading-visual" aria-hidden="true">' + icon("pen") + '</span><span class="tds-action-list-item__label">Edit User</span></button>' +
            '<button type="button" class="tds-action-list-item org-menu-remove" role="menuitem" data-remove-user="' + user.id + '"><span class="tds-action-list-item__leading-visual" aria-hidden="true">' + icon("trash") + '</span><span class="tds-action-list-item__label">Remove</span></button>' +
          '</div>' +
        '</div></td></tr>';
    }).join("");
  }

  function renderInvites() {
    document.getElementById("invites-body").innerHTML = invites.filter(function (row) {
      return row.status !== "Accepted";
    }).map(function (row) {
      var sent = !!row.justResent;
      return '<tr>' +
        '<td class="tds-data-table__text-cell"><div class="org-name"><span class="org-name__primary">' + row.first + " " + row.last + '</span><span class="org-name__secondary">' + row.email + '</span></div></td>' +
        '<td><span class="tds-data-table__label-cell">' + roleTag(row.role) + '</span></td>' +
        '<td><span class="tds-data-table__label-cell">' + statusTag(row.status) + '</span></td>' +
        '<td>' + row.sent + '</td>' +
        '<td>' + row.expires + '</td>' +
        '<td><div class="tds-data-table__actions-cell">' +
          tipButton(sent ? "Sent" : "Resend", sent ? "check" : "refresh", 'data-resend="' + row.id + '"', sent ? "org-resend--sent" : "") +
          tipButton("Withdraw", "trash", 'data-remove-invite="' + row.id + '"', "org-remove") +
        '</div></td></tr>';
    }).join("");
  }

  function renderPerms(host, selected) {
    var left = PERMS.filter(function (_, index) { return index % 2 === 0; });
    var right = PERMS.filter(function (_, index) { return index % 2 === 1; });
    host.innerHTML = [left, right].map(function (column) {
      return '<div class="org-perms__col">' + column.map(function (perm) {
        var checked = selected[perm.key] ? " checked" : "";
        return '<label class="org-perm"><input class="tds-checkbox" type="checkbox" name="' + perm.key + '"' + checked + '> <span>' + perm.label + '</span></label>';
      }).join("") + '</div>';
    }).join("");
  }

  function closeMenus() {
    document.querySelectorAll("[data-menu-panel]").forEach(function (panel) {
      panel.hidden = true;
    });
    document.querySelectorAll("[data-menu]").forEach(function (button) {
      button.setAttribute("aria-expanded", "false");
    });
  }

  function openDialog(id) {
    var dialog = document.getElementById(id);
    dialog.hidden = false;
    requestAnimationFrame(function () {
      dialog.classList.add("tds-dialog--open");
    });
    document.body.classList.add("tds-dialog-open");
  }

  function closeDialog(id) {
    var dialog = document.getElementById(id);
    dialog.classList.remove("tds-dialog--open");
    dialog.hidden = true;
    if (!document.querySelector(".tds-dialog--open")) {
      document.body.classList.remove("tds-dialog-open");
    }
  }

  function showSnackbar(message) {
    var bar = document.getElementById("snackbar");
    document.getElementById("snackbar-text").textContent = message;
    bar.hidden = false;
    window.clearTimeout(snackTimer);
    snackTimer = window.setTimeout(function () {
      bar.hidden = true;
    }, 4000);
  }

  function setTab(name) {
    var showUsers = name !== "invitations";
    [
      { tab: document.getElementById("tab-users"), panel: document.getElementById("panel-users"), on: showUsers },
      { tab: document.getElementById("tab-invites"), panel: document.getElementById("panel-invites"), on: !showUsers }
    ].forEach(function (item) {
      item.tab.setAttribute("aria-selected", item.on ? "true" : "false");
      item.tab.classList.toggle("tds-tab-item--active", item.on);
      item.panel.hidden = !item.on;
    });
    closeMenus();
  }

  function setNav(expanded) {
    var nav = document.getElementById("sidenav");
    var button = document.getElementById("collapse-nav");
    var profile = document.getElementById("profile-button");
    if (!nav || !button || !profile) return;
    nav.classList.toggle("tds-side-nav--collapsed", !expanded);
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
    button.setAttribute("aria-label", expanded ? "Collapse sidebar" : "Expand sidebar");
    profile.classList.toggle("tds-side-nav__profile--collapsed", !expanded);
  }

  function readPerms(root) {
    var values = {};
    PERMS.forEach(function (perm) {
      var input = root.querySelector('input[name="' + perm.key + '"]');
      values[perm.key] = !!(input && input.checked);
    });
    return values;
  }

  function fillEdit(user) {
    editingId = user.id;
    document.getElementById("edit-first").value = user.first;
    document.getElementById("edit-last").value = user.last;
    document.getElementById("edit-email").value = user.email;
    setStatus(user.status === "Active");
    renderPerms(document.getElementById("edit-perms"), user.permissions);
  }

  function setStatus(active) {
    var track = document.getElementById("edit-status");
    track.setAttribute("aria-checked", active ? "true" : "false");
    track.classList.toggle("tds-switch__track--on", active);
    document.getElementById("edit-status-label").textContent = active ? "Active" : "Inactive";
  }

  function openEdit(id) {
    var user = users.filter(function (item) { return item.id === id; })[0];
    if (!user) return;
    fillEdit(user);
    closeMenus();
    openDialog("edit-dialog");
  }

  document.getElementById("tab-users").addEventListener("click", function () { setTab("users"); });
  document.getElementById("tab-invites").addEventListener("click", function () { setTab("invitations"); });

  var collapseNav = document.getElementById("collapse-nav");
  if (collapseNav) {
    collapseNav.addEventListener("click", function () {
      setNav(document.getElementById("sidenav").classList.contains("tds-side-nav--collapsed"));
    });
  }

  document.getElementById("invite-open").addEventListener("click", function () {
    document.getElementById("invite-form").reset();
    document.querySelectorAll('#invite-dialog .tds-radio-card').forEach(function (card, index) {
      card.classList.toggle("tds-radio-card--selected", index === 0);
    });
    renderPerms(document.getElementById("invite-perms"), { transactions: true, workflows: false, billing: false, users: false, audit: true });
    openDialog("invite-dialog");
  });

  document.getElementById("invite-dialog").addEventListener("change", function (event) {
    if (event.target.name !== "role") return;
    document.querySelectorAll("#invite-dialog .tds-radio-card").forEach(function (card) {
      card.classList.toggle("tds-radio-card--selected", card.contains(event.target) && event.target.checked);
    });
  });

  document.querySelector("#edit-dialog .tds-switch").addEventListener("click", function (event) {
    event.preventDefault();
    var track = document.getElementById("edit-status");
    setStatus(track.getAttribute("aria-checked") !== "true");
  });

  document.getElementById("edit-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var user = users.filter(function (item) { return item.id === editingId; })[0];
    if (!user) return;
    var wasLocked = user.status === "Locked";
    var wasAdmin = user.role === "Org Admin";
    user.first = document.getElementById("edit-first").value.trim() || user.first;
    user.last = document.getElementById("edit-last").value.trim() || user.last;
    user.email = document.getElementById("edit-email").value.trim() || user.email;
    user.status = document.getElementById("edit-status").getAttribute("aria-checked") === "true" ? "Active" : "Locked";
    user.permissions = readPerms(document.getElementById("edit-perms"));
    if (wasLocked && user.status !== "Locked") stats.locked = Math.max(0, stats.locked - 1);
    if (!wasLocked && user.status === "Locked") stats.locked += 1;
    if (wasAdmin !== (user.role === "Org Admin")) {
      stats.admins += user.role === "Org Admin" ? 1 : -1;
    }
    renderUsers();
    renderStats();
    closeDialog("edit-dialog");
    showSnackbar("User changes saved successfully");
  });

  document.getElementById("invite-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("invite-email").value.trim();
    if (!email) return;
    var role = (document.querySelector('#invite-dialog input[name="role"]:checked') || {}).value || "Org User";
    var local = email.split("@")[0] || "New";
    var parts = local.replace(/[._-]+/g, " ").split(" ");
    var first = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : "New";
    var last = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : "User";
    invites.unshift(invite("invite-" + Date.now(), first, last, email, role, "Pending", "Oct 15, 2026, 12:03 PM", "Oct 22, 2026, 12:00 AM"));
    stats.pending += 1;
    document.getElementById("success-email").textContent = email;
    renderInvites();
    renderStats();
    closeDialog("invite-dialog");
    openDialog("success-dialog");
  });

  document.getElementById("view-invites").addEventListener("click", function () {
    closeDialog("success-dialog");
    setTab("invitations");
  });

  function openConfirm(type, id) {
    var record = (type === "user" ? users : invites).filter(function (item) { return item.id === id; })[0];
    if (!record) return;
    confirmTarget = { type: type, id: id };
    var title = document.getElementById("confirm-title");
    var message = document.getElementById("confirm-message");
    var action = document.getElementById("confirm-action");
    if (type === "user") {
      title.textContent = "Remove user?";
      message.textContent = record.first + " " + record.last + " will be removed from your organization.";
      action.textContent = "Remove user";
    } else {
      title.textContent = "Withdraw invitation?";
      message.textContent = "The invitation sent to " + record.email + " will be withdrawn.";
      action.textContent = "Withdraw invitation";
    }
    closeMenus();
    openDialog("confirm-dialog");
  }

  function deleteUser(id) {
    var removed = users.filter(function (item) { return item.id === id; })[0];
    users = users.filter(function (item) { return item.id !== id; });
    if (removed) {
      stats.users = Math.max(0, stats.users - 1);
      if (removed.role === "Org Admin") stats.admins = Math.max(0, stats.admins - 1);
      if (removed.status === "Locked") stats.locked = Math.max(0, stats.locked - 1);
    }
    renderUsers();
    renderStats();
    showSnackbar("User removed");
  }

  function deleteInvite(id) {
    var gone = invites.filter(function (item) { return item.id === id; })[0];
    window.clearTimeout(resendTimers[id]);
    invites = invites.filter(function (item) { return item.id !== id; });
    if (gone && gone.status === "Pending") stats.pending = Math.max(0, stats.pending - 1);
    if (gone && gone.status === "Expired") stats.expired = Math.max(0, stats.expired - 1);
    renderInvites();
    renderStats();
    showSnackbar("Invitation withdrawn");
  }

  function resendInvite(id) {
    var resent = invites.filter(function (item) { return item.id === id; })[0];
    if (!resent) return;
    if (resent.status === "Expired") {
      resent.status = "Pending";
      stats.expired = Math.max(0, stats.expired - 1);
      stats.pending += 1;
    }
    resent.sent = "Just now";
    resent.expires = weekFromNow();
    resent.justResent = true;
    renderInvites();
    renderStats();
    window.clearTimeout(resendTimers[id]);
    resendTimers[id] = window.setTimeout(function () {
      resent.justResent = false;
      renderInvites();
    }, 3000);
    showSnackbar("Invitation resent");
  }

  document.getElementById("confirm-action").addEventListener("click", function () {
    if (!confirmTarget) return;
    var target = confirmTarget;
    confirmTarget = null;
    closeDialog("confirm-dialog");
    if (target.type === "user") deleteUser(target.id);
    else deleteInvite(target.id);
  });

  document.addEventListener("click", function (event) {
    var close = event.target.closest("[data-close]");
    if (close) closeDialog(close.getAttribute("data-close"));

    var menuButton = event.target.closest("[data-menu]");
    if (menuButton) {
      var id = menuButton.getAttribute("data-menu");
      var panel = document.querySelector('[data-menu-panel="' + id + '"]');
      var willOpen = panel.hidden;
      closeMenus();
      panel.hidden = !willOpen;
      menuButton.setAttribute("aria-expanded", willOpen ? "true" : "false");
      return;
    }

    var edit = event.target.closest("[data-edit]");
    if (edit) {
      openEdit(edit.getAttribute("data-edit"));
      return;
    }

    var lock = event.target.closest("[data-lock]");
    if (lock) {
      var lockedUser = users.filter(function (item) { return item.id === lock.getAttribute("data-lock"); })[0];
      if (!lockedUser) return;
      if (lockedUser.status === "Locked") {
        lockedUser.status = "Active";
        stats.locked = Math.max(0, stats.locked - 1);
        showSnackbar("Account unlocked");
      } else {
        lockedUser.status = "Locked";
        stats.locked += 1;
        showSnackbar("Account locked");
      }
      renderUsers();
      renderStats();
      return;
    }

    var removeUser = event.target.closest("[data-remove-user]");
    if (removeUser) {
      openConfirm("user", removeUser.getAttribute("data-remove-user"));
      return;
    }

    var resend = event.target.closest("[data-resend]");
    if (resend) {
      resendInvite(resend.getAttribute("data-resend"));
      return;
    }

    var removeInvite = event.target.closest("[data-remove-invite]");
    if (removeInvite) {
      openConfirm("invite", removeInvite.getAttribute("data-remove-invite"));
      return;
    }

    if (!event.target.closest(".org-menu")) closeMenus();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    closeMenus();
    ["edit-dialog", "invite-dialog", "success-dialog", "confirm-dialog"].forEach(function (id) {
      if (!document.getElementById(id).hidden) closeDialog(id);
    });
  });

  function clearHighlights() {
    document.querySelectorAll(".org-row-highlight").forEach(function (row) {
      row.classList.remove("org-row-highlight");
    });
  }

  function findUser(name) {
    var q = String(name || "").trim().toLowerCase();
    if (!q) return null;
    setTab("users");
    clearHighlights();
    var match = null;
    users.forEach(function (item) {
      var full = (item.first + " " + item.last + " " + item.email).toLowerCase();
      if (!match && full.indexOf(q) !== -1) match = item;
    });
    renderUsers();
    if (!match) return null;
    window.setTimeout(function () {
      var row = document.querySelector('tr[data-user="' + match.id + '"]');
      if (row) {
        row.classList.add("org-row-highlight");
        row.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }, 40);
    return match;
  }

  function filterUsers(status) {
    setTab("users");
    clearHighlights();
    var body = document.getElementById("users-body");
    if (!body) return;
    renderUsers();
    if (!status) return;
    Array.prototype.forEach.call(body.querySelectorAll("tr"), function (row) {
      var id = row.getAttribute("data-user");
      var user = users.filter(function (item) { return item.id === id; })[0];
      if (!user) return;
      row.hidden = user.status !== status;
      if (user.status === status) row.classList.add("org-row-highlight");
    });
  }

  function openInvite() {
    var btn = document.getElementById("invite-open");
    if (btn) btn.click();
  }

  function snapshot() {
    return {
      stats: {
        users: stats.users,
        admins: stats.admins,
        locked: stats.locked,
        pending: stats.pending,
        expired: stats.expired
      },
      users: users.map(function (u) {
        return { id: u.id, name: u.first + " " + u.last, email: u.email, role: u.role, status: u.status };
      }),
      invites: invites.map(function (i) {
        return { id: i.id, name: i.first + " " + i.last, email: i.email, role: i.role, status: i.status };
      })
    };
  }

  window.OrgAdmin = {
    openInvite: openInvite,
    setTab: setTab,
    findUser: findUser,
    filterUsers: filterUsers,
    snapshot: snapshot,
    clearHighlights: clearHighlights
  };

  window.addEventListener("message", function (event) {
    var data = event.data;
    if (!data || data.type !== "d3-org-cmd") return;
    var cmd = data.cmd;
    var payload = data.payload || {};
    if (cmd === "invite") openInvite();
    else if (cmd === "tab") setTab(payload.tab === "invitations" ? "invitations" : "users");
    else if (cmd === "find") findUser(payload.name);
    else if (cmd === "filter") filterUsers(payload.status || "");
    else if (cmd === "snapshot" && event.source) {
      event.source.postMessage({ type: "d3-org-snapshot", snapshot: snapshot() }, "*");
    }
  });

  renderPerms(document.getElementById("invite-perms"), { transactions: true, workflows: false, billing: false, users: false, audit: true });
  renderStats();
  renderUsers();
  renderInvites();

  var params = new URLSearchParams(window.location.search);
  if (params.get("embed") === "1") document.body.classList.add("org-admin--embed");
  if (params.get("nav") === "expanded") setNav(true);
  if (params.get("tab") === "invitations") setTab("invitations");
  if (params.get("dialog") === "invite") document.getElementById("invite-open").click();
  if (params.get("dialog") === "edit") openEdit("jane");
  if (params.get("dialog") === "success") {
    document.getElementById("success-email").textContent = "janedoe@trulioo.com";
    openDialog("success-dialog");
  }
  if (params.get("snackbar") === "1") showSnackbar("User changes saved successfully");
  if (params.get("menu") === "1") {
    var firstMenu = document.querySelector("[data-menu]");
    if (firstMenu) firstMenu.click();
  }
})();
