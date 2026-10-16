/* Standalone sign-in page. Password reveal, then a short fade into the
   Demo 1 portal. The session flag matches js/signin.js so ../index.html
   resumes signed in and skips its own gate. */
(function () {
  var page = document.querySelector(".d1-su");
  var form = document.querySelector("[data-d1-signin-form]");
  var password = document.querySelector("[data-d1-password]");
  var toggle = document.querySelector("[data-d1-password-toggle]");
  if (!page || !form || !password) return;

  var email = form.querySelector("[name='email']");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      sessionStorage.setItem("d1-signed-in", "true");
      sessionStorage.setItem("d1-repeat", "false");
    } catch (error) {}

    page.classList.add("is-out");
    window.setTimeout(function () {
      window.location.href = "../index.html";
    }, reduced ? 0 : 380);
  });
})();
