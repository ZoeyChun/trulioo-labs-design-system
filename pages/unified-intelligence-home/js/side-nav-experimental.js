/**
 * Labs SideNav — Figma SideNav (1187:10323 expanded · 1188:10370 collapsed).
 * Builds Home + Labs (KYB/KYC) from the catalog icon set.
 */
(function (global) {
  "use strict";

  var HOME_SVG =
    '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2.5 7.5 8 2.5l5.5 5V13a1 1 0 0 1-1 1H10v-4H6v4H3.5a1 1 0 0 1-1-1V7.5z"/></svg>';

  var FLASK_PATH =
    'M10.6593 0C10.8256 0 10.986 0.0659699 11.1036 0.18359C11.221 0.30117 11.2872 0.46076 11.2872 0.62695C11.2872 0.79313 11.221 0.95272 11.1036 1.07031C10.986 1.18793 10.8256 1.2539 10.6593 1.2539H10.0323V5.71679L14.8692 13.7802H14.8712C14.9853 13.9706 15.0471 14.1882 15.0499 14.4101C15.0526 14.6319 14.9961 14.8508 14.8868 15.0439C14.7776 15.2366 14.6192 15.397 14.4278 15.5087C14.2362 15.6204 14.0178 15.6796 13.796 15.6796H1.25207C1.03035 15.6793 0.812606 15.6197 0.621206 15.5078C0.429926 15.3959 0.271286 15.2357 0.162216 15.0429C0.0531262 14.8498 -0.00277409 14.6308 0.000105914 14.4091C0.00298591 14.1874 0.0647559 13.9704 0.178816 13.7802L5.01476 5.71679V1.2539H4.38781C4.22148 1.2539 4.06207 1.18791 3.94445 1.07031C3.82683 0.95268 3.76085 0.79329 3.76085 0.62695C3.76088 0.46064 3.82685 0.30119 3.94445 0.18359C4.06206 0.0660399 4.22152 0 4.38781 0H10.6593ZM6.26962 1.2539V5.89064C6.26992 6.00414 6.23842 6.11564 6.17982 6.21284L4.26183 9.41404C5.3726 9.45254 6.55962 9.78694 7.80672 10.4179C9.58462 11.3178 10.9226 11.3966 11.8634 11.2109L8.86732 6.21284C8.80872 6.11574 8.77832 6.00404 8.77842 5.89064V1.2539H6.26962Z';

  var FLASK_SVG =
    '<svg class="icon tds-labs-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="' +
    FLASK_PATH +
    '" fill="currentColor"/></svg>';

  var CHEVRONS_LEFT = '<path d="M10 4 6 8l4 4M6 4 2 8l4 4"/>';
  var CHEVRONS_RIGHT = '<path d="M6 4l4 4-4 4M10 4l4 4-4 4"/>';
  var CHEVRON_UP = '<path d="M4 10l4-4 4 4"/>';

  var KYB_ITEMS = [
    { id: "business-reputation-review", title: "Business Horizon", path: "business-reputation-review/index.html", match: ["/business-reputation-review/", "/kyb results/", "/kyb-results"] },
    { id: "policy-review", title: "Policy Review" },
    { id: "kyb-self-serve", title: "KYB Self-Serve" },
    { id: "ubo-agent", title: "UBO Agent" },
    { id: "deep-search", title: "Deep Search" },
    { id: "trulioo-mcp-agent", title: "Orchestration Agent" }
  ];

  var KYC_ITEMS = [
    { id: "document-verification", title: "Document Verification", path: "unified-intelligence-home/document-verification-transactions.html", match: ["document-verification"] },
    { id: "bank-verification", title: "Bank Verification", path: "bank-verification/index.html", match: ["bank-verification"] },
    { id: "electronic-id", title: "Electronic ID", path: "electronic-id/index.html", match: ["electronic-id"] },
    { id: "kyc-eidas", title: "KYC eIDAS", path: "KYC eIDAS/index.html", match: ["kyc eidas", "kyc-eidas"] },
    { id: "device-intelligence", title: "Device Intelligence", path: "device-intelligence/index.html", match: ["device-intelligence"] }
  ];

  function currentPath() {
    return decodeURIComponent(window.location.pathname).toLowerCase();
  }

  function pagesHref(rel) {
    var parts = String(rel || "").split("/");
    var encoded = parts.map(function (part) {
      return encodeURIComponent(part);
    }).join("/");
    var path = window.location.pathname;
    var marker = "/pages/";
    var idx = path.indexOf(marker);
    if (idx !== -1) return path.slice(0, idx + marker.length) + encoded;
    try {
      return new URL(encoded, window.location.href).href;
    } catch (e) {
      return encoded;
    }
  }

  function repoAsset(file) {
    var path = window.location.pathname;
    var idx = path.indexOf("/pages/");
    if (idx !== -1) return path.slice(0, idx + 1) + "assets/" + file;
    return "../../assets/" + file;
  }

  function labsUrl() {
    return pagesHref("unified-intelligence-home/labs.html");
  }

  function iconFor(id) {
    var icons = global.LabsIcons || {};
    return icons[id] || "";
  }

  function itemIsActive(item) {
    if (!item.match) return false;
    var path = currentPath();
    return item.match.some(function (token) {
      return path.indexOf(token) !== -1;
    });
  }

  function isHomePage() {
    return /\/unified-intelligence-home\/labs\.html$/i.test(currentPath());
  }

  function anySubitemActive() {
    return KYB_ITEMS.concat(KYC_ITEMS).some(itemIsActive);
  }

  function tooltip(label) {
    return (
      '<span class="tds-side-nav__tooltip" role="tooltip">' +
        '<span class="tds-side-nav__tooltip-caret"></span>' +
        '<span class="tds-side-nav__tooltip-body">' + label + "</span>" +
      "</span>"
    );
  }

  function subItemHtml(item) {
    var selected = itemIsActive(item);
    var icon = iconFor(item.id);
    var selectedClass = selected ? " tds-side-nav__sub-item--selected" : "";
    var current = selected ? ' aria-current="page"' : "";
    var inner =
      '<span class="tds-side-nav__sub-item-icon" aria-hidden="true">' + icon + "</span>" +
      '<span class="tds-side-nav__sub-item-text">' + item.title + "</span>";

    if (item.path) {
      return (
        '<a href="' + pagesHref(item.path) + '" class="tds-side-nav__sub-item' + selectedClass + '"' + current + ' data-nav-id="' + item.id + '">' +
          inner +
        "</a>"
      );
    }

    return (
      '<button type="button" class="tds-side-nav__sub-item' + selectedClass + '"' + current + ' data-nav-id="' + item.id + '">' +
        inner +
      "</button>"
    );
  }

  function sectionHtml(title, items) {
    return (
      '<div class="tds-side-nav__section">' +
        '<div class="tds-side-nav__section-title">' + title + "</div>" +
        '<div class="tds-side-nav__section-items">' +
          items.map(subItemHtml).join("") +
        "</div>" +
      "</div>"
    );
  }

  function navStackHtml(homeCurrent, labsGroupActive) {
    var homeActive = homeCurrent ? " tds-side-nav__nav-item--active" : "";
    var homeCurrentAttr = homeCurrent ? ' aria-current="page"' : "";
    var labsActive = labsGroupActive ? " tds-side-nav__nav-item--active" : "";
    return (
      "<div>" +
        '<button type="button" class="tds-side-nav__nav-item' + homeActive + '"' + homeCurrentAttr + ' data-nav="home">' +
          '<span class="tds-side-nav__nav-item-label">' +
            '<span class="tds-side-nav__nav-item-icon" aria-hidden="true">' + HOME_SVG + "</span>" +
            '<span class="tds-side-nav__nav-item-text">Home</span>' +
          "</span>" +
        "</button>" +
      "</div>" +
      '<div class="tds-side-nav__nav-group">' +
        '<button type="button" class="tds-side-nav__nav-item' + labsActive + '" aria-expanded="true">' +
          '<span class="tds-side-nav__nav-item-label">' +
            '<span class="tds-side-nav__nav-item-icon" aria-hidden="true">' + FLASK_SVG + "</span>" +
            '<span class="tds-side-nav__nav-item-text">Labs</span>' +
          "</span>" +
          '<span class="tds-side-nav__nav-item-chevron" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">' + CHEVRON_UP + "</svg></span>" +
        "</button>" +
        '<div class="tds-side-nav__sub-nav">' +
          sectionHtml("KYB", KYB_ITEMS) +
          '<hr class="tds-side-nav__divider">' +
          sectionHtml("KYC", KYC_ITEMS) +
        "</div>" +
      "</div>"
    );
  }

  function ensureBrandExpanded(sideNav) {
    var brand = sideNav.querySelector(".tds-side-nav__brand");
    if (!brand) return;
    brand.setAttribute("aria-label", "Trulioo Labs");
    if (!brand.querySelector(".tds-side-nav__brand-expanded")) {
      var expanded = document.createElement("span");
      expanded.className = "tds-side-nav__brand-expanded";
      expanded.innerHTML =
        '<span class="tds-side-nav__brand-logo">' +
          '<img src="' + repoAsset("trulioo-labs-logo.svg") + '" alt="Trulioo Labs" width="152" height="24">' +
        "</span>";
      brand.appendChild(expanded);
    }
    brand.onclick = function () {
      window.location.href = labsUrl();
    };
  }

  function ensureCollapseBar(sideNav) {
    var bar = document.getElementById("sidenav-collapse");
    if (bar) return bar;
    bar = document.createElement("button");
    bar.type = "button";
    bar.className = "tds-side-nav__collapse-bar";
    bar.id = "sidenav-collapse";
    bar.setAttribute("aria-label", "Expand sidebar");
    bar.setAttribute("aria-expanded", "false");
    bar.innerHTML =
      '<svg class="icon icon--sm" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">' +
        CHEVRONS_RIGHT +
      "</svg>" +
      '<span class="tds-side-nav__collapse-label text-label-sm-uppercase">Hide Sidebar</span>';
    var footer = sideNav.querySelector(".tds-side-nav__footer");
    if (footer) sideNav.insertBefore(bar, footer);
    else sideNav.appendChild(bar);
    return bar;
  }

  function ensureProfileInfo(sideNav) {
    var profile = sideNav.querySelector(".tds-side-nav__profile");
    if (!profile || profile.querySelector(".tds-side-nav__profile-info")) return;
    var info = document.createElement("span");
    info.className = "tds-side-nav__profile-info";
    info.innerHTML =
      '<span class="tds-side-nav__profile-name-row">' +
        '<span class="tds-side-nav__profile-name">Jane Doe</span>' +
        '<span class="tds-side-nav__profile-chevron" aria-hidden="true"><svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 4l4 4-4 4"/></svg></span>' +
      "</span>" +
      '<span class="tds-side-nav__profile-email">janedoe@trulioo.com</span>';
    profile.appendChild(info);
    profile.setAttribute("aria-label", "Jane Doe, janedoe@trulioo.com");
  }

  function setRailButton(btn, label, svg, href) {
    btn.setAttribute("aria-label", label);
    btn.innerHTML = svg + tooltip(label);
    btn.onclick = function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (href) window.location.href = href;
    };
  }

  function expandLabsNav(sideNav) {
    sideNav = sideNav || document.getElementById("app-sidenav");
    if (!sideNav) return;
    sideNav.classList.remove("tds-side-nav--collapsed");

    var collapseBtn = document.getElementById("sidenav-collapse");
    if (collapseBtn) {
      collapseBtn.setAttribute("aria-expanded", "true");
      collapseBtn.setAttribute("aria-label", "Collapse sidebar");
      var collapseSvg = collapseBtn.querySelector("svg");
      if (collapseSvg) collapseSvg.innerHTML = CHEVRONS_LEFT;
    }

    var profile = sideNav.querySelector(".tds-side-nav__profile");
    if (profile) profile.classList.remove("tds-side-nav__profile--collapsed");

    var iconRail = sideNav.querySelector(".tds-side-nav__icon-rail");
    if (iconRail) iconRail.setAttribute("aria-hidden", "true");

    var labsNav = sideNav.querySelector(".tds-side-nav__nav-item[aria-expanded]");
    var subNav = sideNav.querySelector(".tds-side-nav__sub-nav");
    if (labsNav) labsNav.setAttribute("aria-expanded", "true");
    if (subNav) subNav.style.display = "";

    var chevron = labsNav && labsNav.querySelector(".tds-side-nav__nav-item-chevron svg");
    if (chevron) chevron.innerHTML = CHEVRON_UP;
  }

  function init(options) {
    options = options || {};
    var sideNav = document.getElementById(options.rootId || "app-sidenav");
    if (!sideNav) return;

    document.body.setAttribute("data-sidenav", "experimental");
    sideNav.classList.add("tds-side-nav--collapsed", "tds-side-nav--experimental");

    var main = sideNav.querySelector(".tds-side-nav__main");
    if (!main) return;

    var homeCurrent = isHomePage();
    var labsGroupActive = anySubitemActive();

    var stack = main.querySelector(".tds-side-nav__nav-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "tds-side-nav__nav-stack";
      var existingRail = main.querySelector(".tds-side-nav__icon-rail");
      if (existingRail) main.insertBefore(stack, existingRail);
      else main.appendChild(stack);
    }
    stack.innerHTML = navStackHtml(homeCurrent, labsGroupActive);

    var homeNav = stack.querySelector('[data-nav="home"]');
    if (homeNav) {
      homeNav.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = labsUrl();
      });
    }

    var rail = main.querySelector(".tds-side-nav__icon-rail");
    if (!rail) {
      rail = document.createElement("div");
      rail.className = "tds-side-nav__icon-rail";
      main.appendChild(rail);
    }
    rail.setAttribute("aria-hidden", "false");
    rail.innerHTML =
      '<button type="button" class="tds-side-nav__icon-button" aria-label="Home"></button>' +
      '<button type="button" class="tds-side-nav__icon-button" data-nav="labs" aria-label="Labs"></button>';

    var homeBtn = rail.querySelector('[aria-label="Home"]');
    var labsBtn = rail.querySelector('[data-nav="labs"]');
    if (homeBtn) setRailButton(homeBtn, "Home", HOME_SVG, labsUrl());
    if (labsBtn) {
      setRailButton(labsBtn, "Labs", FLASK_SVG, null);
      labsBtn.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        expandLabsNav(sideNav);
      };
    }

    rail.querySelectorAll(".tds-side-nav__icon-button").forEach(function (btn) {
      btn.classList.remove("tds-side-nav__icon-button--active");
      btn.removeAttribute("aria-current");
    });

    if (homeCurrent && homeBtn) {
      homeBtn.classList.add("tds-side-nav__icon-button--active");
      homeBtn.setAttribute("aria-current", "page");
    }

    ensureBrandExpanded(sideNav);
    ensureCollapseBar(sideNav);
    ensureProfileInfo(sideNav);

    var profile = sideNav.querySelector(".tds-side-nav__profile");
    if (profile) profile.classList.add("tds-side-nav__profile--collapsed");
  }

  global.SideNavExperimental = { init: init, expandLabsNav: expandLabsNav };
})(typeof window !== "undefined" ? window : globalThis);
