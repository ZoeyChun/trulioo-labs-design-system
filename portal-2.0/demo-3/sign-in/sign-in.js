/* Demo 3 sign-in page → ../index.html with d3 session flags. */
(function () {
  var page = document.querySelector(".d1-su");
  var form = document.querySelector("[data-d1-signin-form]");
  var password = document.querySelector("[data-d1-password]");
  var toggle = document.querySelector("[data-d1-password-toggle]");
  if (!page || !form || !password) return;

  var email = form.querySelector("[name='email']");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var portalHref = new URL("../index.html", window.location.href).href;

  var params = new URLSearchParams(window.location.search);
  var forceSignIn = params.has("fresh") || params.has("signin");
  try {
    if (forceSignIn) {
      sessionStorage.removeItem("d3-signed-in");
      sessionStorage.removeItem("d3-from-signin");
    } else if (sessionStorage.getItem("d3-signed-in") === "true") {
      /* Already signed in — skip the form unless ?fresh=1 */
      window.location.replace(portalHref);
      return;
    }
  } catch (e) {}

  if (toggle) {
    toggle.addEventListener("click", function () {
      var show = password.type === "password";
      password.type = show ? "text" : "password";
      toggle.setAttribute("aria-pressed", show ? "true" : "false");
      toggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (email) email.value = "janedoe@trulioo.com";
    password.value = "Trulioo2026";

    try {
      sessionStorage.setItem("d3-signed-in", "true");
      sessionStorage.setItem("d3-from-signin", "true");
    } catch (error) {}

    page.classList.add("is-out");
    window.setTimeout(function () {
      window.location.href = portalHref;
    }, reduced ? 0 : 380);
  });
})();
