/**
 * Demo App — country picker data (Figma 1108:14658).
 *
 * Codes are the ISO-3166 alpha-2 set that the repo's own flag library ships
 * (assets/flag-icons/flags/4x3), so every entry is guaranteed to have a flag.
 * Names come from Intl.DisplayNames rather than a hand-kept table — the browser
 * already has them, and they match the design's labels ("Czechia", "Netherlands").
 * Codes the runtime has no region name for are dropped.
 */
(function () {
  const FEATURED = ["be", "cz", "dk", "in", "it", "nl"];

  const CODES = (
    "ad ae af ag ai al am ao aq ar as at au aw ax az ba bb bd be bf bg bh bi bj bl bm bn bo bq br " +
    "bs bt bv bw by bz ca cc cd cf cg ch ci ck cl cm cn co cp cr cu cv cw cx cy cz de dg dj dk dm " +
    "do dz ec ee eg eh er es et fi fj fk fm fo fr ga gb gd ge gf gg gh gi gl gm gn gp gq gr gs gt " +
    "gu gw gy hk hm hn hr ht hu ic id ie il im in io iq ir is it je jm jo jp ke kg kh ki km kn kp " +
    "kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md me mf mg mh mk ml mm mn mo mp mq mr ms " +
    "mt mu mv mw mx my mz na nc ne nf ng ni nl no np nr nu nz om pa pc pe pf pg ph pk pl pm pn pr " +
    "ps pt pw py qa re ro rs ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr ss st sv sx sy sz " +
    "tc td tf tg th tj tk tl tm tn to tr tt tv tw tz ua ug um un us uy uz va vc ve vg vi vn vu wf " +
    "ws xk ye yt za zm zw"
  ).split(" ");

  let display = null;
  try {
    display = new Intl.DisplayNames(["en"], { type: "region" });
  } catch (err) {
    display = null;
  }

  function nameFor(code) {
    const upper = code.toUpperCase();
    if (!display) return upper;
    const name = display.of(upper);
    return name === upper ? null : name; // no region name: not a country we can label
  }

  const byCode = {};
  const all = [];

  CODES.forEach((code) => {
    const name = nameFor(code);
    if (!name) return;
    const country = { code, name };
    byCode[code] = country;
    all.push(country);
  });

  all.sort((a, b) => a.name.localeCompare(b.name, "en"));

  window.DA_COUNTRIES = {
    all,
    byCode,
    featured: FEATURED.map((code) => byCode[code]).filter(Boolean),
    // The flap only ever shows for the country device intelligence detected.
    detected: "nl",
  };
})();
