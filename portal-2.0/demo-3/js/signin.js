/* Demo 3 session bootstrap — no sign-in gate. Loader stays off. */
(function () {
  var loader = document.querySelector("[data-d1-loader]");
  var home = document.querySelector(".d1-home");

  if (home) home.setAttribute("data-d1-repeat", "true");

  if (loader) {
    loader.hidden = true;
    loader.style.display = "none";
  }
  document.body.classList.add("d1-app-ready");

  document.querySelectorAll("[data-d1-signout]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      try {
        sessionStorage.removeItem("d3-signed-in");
        sessionStorage.removeItem("d3-from-signin");
      } catch (e) {}
      window.location.href = "./";
    });
  });
})();
