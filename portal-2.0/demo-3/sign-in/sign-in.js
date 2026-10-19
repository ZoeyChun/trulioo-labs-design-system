/* Sign-in page retired — send anyone who lands here into the portal. */
(function () {
  try {
    sessionStorage.setItem("d3-signed-in", "true");
  } catch (e) {}
  window.location.replace("../");
})();
