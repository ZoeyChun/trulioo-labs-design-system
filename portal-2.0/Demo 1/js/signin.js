/* Sign-in gate. Sign in plays a loader, then reveals the homepage.
   The repeat-customer switch is stored for the home page to read later. */
(function () {
  var signin = document.querySelector("[data-d1-signin]");
  var form = document.querySelector("[data-d1-signin-form]");
  var loader = document.querySelector("[data-d1-loader]");
  var home = document.querySelector(".d1-home");
  var repeat = document.querySelector("[data-d1-repeat]");
  var password = document.querySelector("[data-d1-password]");
  var toggle = document.querySelector("[data-d1-password-toggle]");
  if (!signin || !form || !loader || !password) return;
  var email = form.querySelector("[name='email']");
  if (!email) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lineMs = reduced ? 0 : 900;
  var LINES = {
    fresh: [
      "Signing you in",
      "Setting up Pacific Ridge Financial",
      "Starting your KYB and KYC agents",
      "Preparing your first verification"
    ],
    repeat: [
      "Loading Pacific Ridge Financial",
      "Syncing 47 new transactions",
      "Starting your KYB and KYC agents"
    ]
  };
  var label = loader.querySelector("[data-d1-loader-text]");

  if (repeat) {
    repeat.addEventListener("click", function () {
      var on = repeat.getAttribute("aria-checked") !== "true";
      repeat.setAttribute("aria-checked", on ? "true" : "false");
    });
  }

  if (toggle && password) {
    toggle.addEventListener("click", function () {
      var show = password.type === "password";
      password.type = show ? "text" : "password";
      toggle.setAttribute("aria-pressed", show ? "true" : "false");
      toggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    email.value = "janedoe@trulioo.com";
    password.value = "Trulioo2026";
    var on = repeat && repeat.getAttribute("aria-checked") === "true";
    if (home) home.setAttribute("data-d1-repeat", on ? "true" : "false");
    try { sessionStorage.setItem("d1-repeat", on ? "true" : "false"); } catch (error) { /* private mode */ }

    window.setTimeout(function () {
      signin.classList.add("is-out");
      loader.hidden = false;
      var lines = on ? LINES.repeat : LINES.fresh;
      var index = 0;
      function paint() {
        if (!label) return;
        label.textContent = lines[index];
        label.classList.remove("is-swap");
        void label.offsetWidth;
        label.classList.add("is-swap");
      }
      function leave() {
        document.body.classList.add("d1-app-ready");
        loader.classList.remove("is-on");
        loader.classList.add("is-leaving");
        window.setTimeout(function () {
          signin.hidden = true;
          loader.hidden = true;
        }, reduced ? 0 : 600);
      }
      function advance() {
        index += 1;
        if (index >= lines.length) {
          leave();
          return;
        }
        paint();
        window.setTimeout(advance, lineMs);
      }
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () { loader.classList.add("is-on"); });
      });
      paint();
      window.setTimeout(advance, lineMs);
    }, reduced ? 0 : 450);
  });
})();
