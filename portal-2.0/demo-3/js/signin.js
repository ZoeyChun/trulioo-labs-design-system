/* Demo 3 sign-in — returning customer only.
   No first-time / Repeat User toggle. Session keys are d3-* so Demo 1 is untouched. */
(function () {
  var signin = document.querySelector("[data-d1-signin]");
  var form = document.querySelector("[data-d1-signin-form]");
  var loader = document.querySelector("[data-d1-loader]");
  var home = document.querySelector(".d1-home");
  var password = document.querySelector("[data-d1-password]");
  var toggle = document.querySelector("[data-d1-password-toggle]");
  if (!signin || !form || !loader || !password) return;
  var email = form.querySelector("[name='email']");
  if (!email) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function forceRepeatHome() {
    if (home) home.setAttribute("data-d1-repeat", "true");
  }

  var stored = false;
  try { stored = sessionStorage.getItem("d3-signed-in") === "true"; } catch (e) {}

  if (stored) {
    forceRepeatHome();
    signin.style.display = "none";
    loader.style.display = "none";
    document.body.classList.add("d1-app-ready");
  }

  document.querySelectorAll("[data-d1-signout]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      try { sessionStorage.removeItem("d3-signed-in"); } catch (e) {}
      window.location.reload();
    });
  });

  var lineMs = reduced ? 0 : 900;
  var LINES = [
    "Loading Pacific Ridge Financial",
    "Syncing 47 new transactions",
    "Starting your KYB and KYC agents"
  ];
  var label = loader.querySelector("[data-d1-loader-text]");

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
    forceRepeatHome();
    try { sessionStorage.setItem("d3-signed-in", "true"); } catch (error) {}

    window.setTimeout(function () {
      signin.classList.add("is-out");
      loader.hidden = false;
      var index = 0;
      function paint() {
        if (!label) return;
        label.textContent = LINES[index];
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
        if (index >= LINES.length) {
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
    }, reduced ? 0 : 280);
  });
})();
