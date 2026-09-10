(function () {
  "use strict";

  var COUNTRIES = [
    { code: "nl", name: "Netherlands" },
    { code: "us", name: "United States" },
    { code: "ca", name: "Canada" },
    { code: "gb", name: "United Kingdom" },
    { code: "de", name: "Germany" },
    { code: "jp", name: "Japan" }
  ];

  function initBackButton() {
    var back = document.querySelector(".kyc-flow__back");
    if (!back) return;
    back.addEventListener("click", function () {
      window.location.href = "../unified-intelligence-home/index.html";
    });
  }

  function initVerificationCards() {
    var cards = document.querySelectorAll(".kyc-flow__card");
    cards.forEach(function (card) {
      var input = card.querySelector("input[type=radio]");
      if (!input) return;
      input.addEventListener("change", function () {
        cards.forEach(function (c) {
          c.classList.toggle("tds-radio-card--selected", c === card);
        });
      });
    });
  }

  function initCountrySelect() {
    var root = document.getElementById("kyc-country-select");
    var trigger = document.getElementById("kyc-country-trigger");
    var options = document.getElementById("kyc-country-options");
    var value = document.getElementById("kyc-country-value");
    var flag = document.getElementById("kyc-country-flag");
    if (!root || !trigger || !options) return;

    COUNTRIES.forEach(function (country) {
      var item = document.createElement("button");
      item.type = "button";
      item.className = "tds-action-list-item tds-action-list-item--md";
      item.setAttribute("role", "option");
      item.innerHTML =
        '<span class="tds-select__country-flag" aria-hidden="true"><span class="fi fi-' + country.code + '"></span></span>' +
        '<span class="tds-action-list-item__label">' + country.name + "</span>";
      item.addEventListener("click", function () {
        value.textContent = country.name;
        flag.className = "fi fi-" + country.code;
        closeMenu();
      });
      options.appendChild(item);
    });

    function openMenu() {
      root.classList.add("tds-select--open");
      trigger.setAttribute("aria-expanded", "true");
      document.addEventListener("click", handleOutsideClick, true);
    }

    function closeMenu() {
      root.classList.remove("tds-select--open");
      trigger.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", handleOutsideClick, true);
    }

    function handleOutsideClick(event) {
      if (!root.contains(event.target)) closeMenu();
    }

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      if (root.classList.contains("tds-select--open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  function initContinueButton() {
    var button = document.querySelector(".kyc-flow__continue");
    if (!button) return;
    button.addEventListener("click", function () {
      var selected = document.querySelector(".kyc-flow__card input[type=radio]:checked");
      var method = selected ? selected.closest(".kyc-flow__card").querySelector(".tds-radio-card__label").textContent : "";
      // eslint-disable-next-line no-console
      console.log("Continue with verification method:", method);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initBackButton();
    initVerificationCards();
    initCountrySelect();
    initContinueButton();
  });
})();
