/* Demo 3 auth gate — unsigned → sign-in/index.html; fresh sign-in → loader. */
(function () {
  var SIGN_IN_HREF = new URL("sign-in/index.html", window.location.href).href;
  var loader = document.querySelector("[data-d1-loader]");
  var home = document.querySelector(".d1-home");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function forceRepeatHome() {
    if (home) home.setAttribute("data-d1-repeat", "true");
  }

  function goSignIn() {
    try {
      sessionStorage.removeItem("d3-signed-in");
      sessionStorage.removeItem("d3-from-signin");
    } catch (e) {}
    var signIn = new URL(SIGN_IN_HREF);
    try {
      var home = new URLSearchParams(window.location.search).get("home");
      if (/^(light|dark|\d+)$/.test(home || "")) signIn.searchParams.set("home", home);
    } catch (e) {}
    window.location.replace(signIn.href);
  }

  var stored = false;
  var fromSignin = false;
  try {
    stored = sessionStorage.getItem("d3-signed-in") === "true";
    fromSignin = sessionStorage.getItem("d3-from-signin") === "true";
  } catch (e) {}

  if (!stored && !fromSignin) {
    goSignIn();
    return;
  }

  forceRepeatHome();

  document.querySelectorAll("[data-d1-signout]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      goSignIn();
    });
  });

  if (!fromSignin || !loader) {
    if (loader) {
      loader.hidden = true;
      loader.style.display = "none";
    }
    document.body.classList.add("d1-app-ready");
    return;
  }

  try {
    sessionStorage.removeItem("d3-from-signin");
    sessionStorage.setItem("d3-signed-in", "true");
  } catch (e) {}

  var lineMs = reduced ? 0 : 900;
  var LINES = [
    "Loading Pacific Ridge Financial",
    "Syncing 47 new transactions",
    "Getting your workspace ready"
  ];
  var label = loader.querySelector("[data-d1-loader-text]");

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

  loader.hidden = false;
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      loader.classList.add("is-on");
    });
  });
  paint();
  window.setTimeout(advance, lineMs);
})();
