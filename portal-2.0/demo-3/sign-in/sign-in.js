/* Demo 3 standalone sign-in. Password reveal, then fade into the portal.
   Uses d3-* session keys so Demo 1 stays untouched. */
(function () {
  var page = document.querySelector(".d1-su");
  var form = document.querySelector("[data-d1-signin-form]");
  var password = document.querySelector("[data-d1-password]");
  var toggle = document.querySelector("[data-d1-password-toggle]");
  if (!page || !form || !password) return;

  var email = form.querySelector("[name='email']");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Already signed in → skip the gate. */
  try {
    if (sessionStorage.getItem("d3-signed-in") === "true") {
      window.location.replace("../index.html");
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
      window.location.href = "../index.html";
    }, reduced ? 0 : 380);
  });
})();
