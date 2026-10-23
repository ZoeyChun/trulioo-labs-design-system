/* Home composer — rotate Trulioo-context placeholder prompts when idle. */
(function () {
  var PHRASES = [
    "Ask questions or tell me what you’d like to do",
    "Verify a business by name or registration number",
    "Why did KYB failures increase yesterday?",
    "Review identity verifications that need attention",
    "Check adverse media or sanctions for a company",
    "Investigate a high-risk transaction",
    "Compare verification outcomes by country",
    "Look up a registry match for an onboarding case",
    "Ask about watchlist hits on a recent KYB run"
  ];

  var HOLD_MS = 2400;
  var OUT_MS = 160;
  var IN_MS = 200;

  var input = document.querySelector(".d1-home [data-d1-input]");
  var rotator = document.querySelector(".d1-home [data-d1-ph-rotator]");
  var stage = document.querySelector(".d1-home");
  var shell = document.querySelector(".d1-shell");
  if (!input || !rotator || !stage) return;

  var index = 0;
  var timer = 0;
  var animating = false;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setPhrase(text) {
    rotator.textContent = text;
    input.setAttribute("aria-label", text);
  }

  function showRotator(on) {
    rotator.hidden = !on;
    rotator.classList.toggle("is-hidden", !on);
  }

  function isHomeIdle() {
    var onHomeView = !shell || shell.getAttribute("data-d3-view") === "home";
    var onHomeStage = stage.getAttribute("data-d1-stage") === "home";
    return onHomeView && onHomeStage && !input.value.trim() && document.activeElement !== input;
  }

  function stop() {
    window.clearTimeout(timer);
    timer = 0;
    rotator.classList.remove("is-out", "is-in");
  }

  function schedule() {
    stop();
    if (!isHomeIdle()) {
      showRotator(false);
      return;
    }
    /* Home paints prompts via the rotator span only. */
    input.placeholder = "";
    showRotator(true);
    timer = window.setTimeout(advance, HOLD_MS);
  }

  function advance() {
    if (!isHomeIdle() || animating) {
      schedule();
      return;
    }
    index = (index + 1) % PHRASES.length;
    var next = PHRASES[index];

    if (reduced) {
      setPhrase(next);
      schedule();
      return;
    }

    animating = true;
    rotator.classList.remove("is-in");
    rotator.classList.add("is-out");
    window.setTimeout(function () {
      setPhrase(next);
      rotator.classList.remove("is-out");
      /* Force reflow so the enter class retriggers. */
      void rotator.offsetWidth;
      rotator.classList.add("is-in");
      window.setTimeout(function () {
        rotator.classList.remove("is-in");
        animating = false;
        schedule();
      }, IN_MS);
    }, OUT_MS);
  }

  setPhrase(PHRASES[0]);
  showRotator(true);

  input.addEventListener("focus", function () {
    stop();
    showRotator(false);
  });
  input.addEventListener("input", function () {
    if (input.value.trim()) {
      stop();
      showRotator(false);
    } else if (document.activeElement !== input) {
      schedule();
    }
  });
  input.addEventListener("blur", schedule);

  if (typeof MutationObserver !== "undefined") {
    var obs = new MutationObserver(function () {
      if (isHomeIdle()) schedule();
      else {
        stop();
        showRotator(false);
      }
    });
    obs.observe(stage, { attributes: true, attributeFilter: ["data-d1-stage"] });
    if (shell) {
      obs.observe(shell, { attributes: true, attributeFilter: ["data-d3-view"] });
    }
  }

  document.addEventListener("d3-home:composer-reset", function () {
    index = 0;
    setPhrase(PHRASES[0]);
    schedule();
  });

  schedule();
})();
