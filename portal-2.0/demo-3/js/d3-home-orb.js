/* Demo 3 — Home hero TruAI orb (vanilla port of Misc/Loader TruAIOrb Home mode).
   Mounts into [data-d3-home-orb]. Intro: one Thinking orbit → landing mesh.
   Hover/focus: Thinking again. Click: focus home composer. */
(function () {
  "use strict";

  /* Render 2× display size, CSS-scaled down — keeps strip logo sharp while orbiting. */
  var DISPLAY_SIZE = 72; /* 0.75 × previous 96px hero size */
  var ORB_SIZE = DISPLAY_SIZE * 2;
  var ORB_BASE = "#9EDFB6";
  var ORB_BLUR_PX = 18;
  var IDLE_BASE_PERIOD_S = 16;
  var SMOOTH_TAU_S = 0.55;
  var LOGO_ORBIT_TAU_S = 0.95;
  var LOGO_ORBIT_PERIOD_S = 2.6;
  var THINKING_ORBIT_RATE = 1.35;
  var HOME_INTRO_MS = (LOGO_ORBIT_PERIOD_S / THINKING_ORBIT_RATE) * 1000;
  var LOGO_PERSPECTIVE = 360;
  var LOGO_SPHERE_R = ORB_SIZE / 2;
  var LOGO_DESIGN_W = ORB_SIZE * (1 - 0.1953 - 0.2033);
  var LOGO_DESIGN_H = ORB_SIZE * (1 - 0.25 - 0.2566);
  var LOGO_DEPTH_SCALE = (LOGO_PERSPECTIVE - LOGO_SPHERE_R) / LOGO_PERSPECTIVE;
  var LOGO_W = LOGO_DESIGN_W * LOGO_DEPTH_SCALE;
  var LOGO_H = LOGO_DESIGN_H * LOGO_DEPTH_SCALE;
  var LOGO_HALF_LON = LOGO_W / (2 * LOGO_SPHERE_R);
  var LOGO_STRIPS = 48;
  var LOGO_PHASE_LEFT = -Math.PI / 2;
  var STRIP_ANGLE = (2 * LOGO_HALF_LON) / LOGO_STRIPS;
  var WARP_STRIP_W = 2 * LOGO_SPHERE_R * Math.tan(STRIP_ANGLE / 2);
  var WARP_SLICE_W = LOGO_W / LOGO_STRIPS;
  var FLAT_STRIP_W = LOGO_DESIGN_W / LOGO_STRIPS;
  var FLAT_SLICE_W = LOGO_DESIGN_W / LOGO_STRIPS;
  var BASE_OMEGA = (Math.PI * 2) / IDLE_BASE_PERIOD_S;
  var LOGO_OMEGA = (Math.PI * 2) / LOGO_ORBIT_PERIOD_S;
  var EASE_IN_OUT = [0.65, 0, 0.35, 1];
  var EASE_OUT_SOFT = [0.22, 1, 0.36, 1];

  var BLOBS = [
    { color: "#FFD166", size: 0.95, homeX: -0.18, homeY: -0.28, travel: 0.12, ax: 1, ay: 0.9, scaleAmp: 0.035, period: 1, opacity: 0.8 },
    { color: "#9EDFB6", size: 1.15, homeX: 0, homeY: -0.06, travel: 0.11, ax: 0.95, ay: 1, scaleAmp: 0.03, period: 1.37, opacity: 0.75 },
    { color: "#5AC6CA", size: 1.05, homeX: 0.22, homeY: -0.12, travel: 0.13, ax: 0.95, ay: 1.05, scaleAmp: 0.035, period: 1.83, opacity: 0.85 },
    { color: "#166534", size: 0.75, homeX: 0.32, homeY: 0.08, travel: 0.1, ax: 1.05, ay: 0.9, scaleAmp: 0.03, period: 2.17, opacity: 0.45 },
    { color: "#33A68C", size: 1, homeX: 0.06, homeY: 0.2, travel: 0.12, ax: 0.9, ay: 1.05, scaleAmp: 0.035, period: 2.41, opacity: 0.8 },
    { color: "#128AB2", size: 0.95, homeX: 0.26, homeY: 0.28, travel: 0.12, ax: 0.9, ay: 1.1, scaleAmp: 0.03, period: 2.73, opacity: 0.78 },
    { color: "#05D6A1", size: 0.9, homeX: -0.2, homeY: 0.3, travel: 0.11, ax: 1.05, ay: 0.85, scaleAmp: 0.03, period: 2.97, opacity: 0.75 }
  ];

  var LANDING = { speed: 2.2, amplitude: 1.55, logoOrbit: 0, logoSpin: 0, swirl: 0 };
  var THINKING = { speed: 3, amplitude: 1.6, logoOrbit: 1, logoSpin: THINKING_ORBIT_RATE, swirl: 0.12 };

  /* Inline SVG mask — file:// (open from Finder) blocks external mask urls. */
  var RING_SRC = "data:image/svg+xml,%3Csvg%20preserveAspectRatio%3D%22none%22%20overflow%3D%22visible%22%20style%3D%22display%3A%20block%3B%22%20width%3D%2238.4904%22%20height%3D%2231.576%22%20viewBox%3D%220%200%2038.4904%2031.576%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%20%3Cg%20id%3D%22Icon%2FBlue-700%22%3E%20%3Cpath%20id%3D%22Vector%22%20d%3D%22M38.4904%2013.335C38.4904%2014.2621%2037.7619%2015.0172%2036.8746%2015.0097C35.9918%2015.0027%2035.2781%2014.2584%2035.2736%2013.3411C35.2691%2012.4107%2035.9859%2011.6603%2036.88%2011.6585C37.774%2011.6566%2038.4904%2012.4028%2038.4904%2013.3345V13.335Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_2%22%20d%3D%22M0.264453%2013.3202C0.265803%2012.3987%200.976811%2011.6595%201.86231%2011.6586C2.75591%2011.6572%203.47681%2012.4024%203.48041%2013.3309C3.484%2014.2492%202.74871%2015.0122%201.86276%2015.0098C0.973663%2015.0075%200.262654%2014.2562%200.264003%2013.3206L0.264453%2013.3202Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_3%22%20d%3D%22M0.000475143%2018.2176C0.00542207%2017.305%200.729473%2016.5602%201.61137%2016.5602C2.49598%2016.5602%203.23037%2017.3279%203.22362%2018.2457C3.21733%2019.1559%202.49463%2019.9091%201.61857%2019.9175C0.725425%2019.9264%20-0.00492194%2019.1592%202.49834e-05%2018.2176H0.000475143Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_4%22%20d%3D%22M38.228%2018.2391C38.2271%2019.1728%2037.5062%2019.9232%2036.6175%2019.9157C35.7284%2019.9082%2035.0134%2019.1499%2035.0197%2018.2214C35.026%2017.3022%2035.7424%2016.5593%2036.6234%2016.5588C37.5183%2016.5588%2038.2293%2017.3027%2038.228%2018.2387V18.2391Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_5%22%20d%3D%22M29.8982%2019.8571C29.0204%2019.8585%2028.3242%2019.1385%2028.3265%2018.232C28.3287%2017.3404%2029.0262%2016.6134%2029.8847%2016.6078C30.7514%2016.6022%2031.4556%2017.3357%2031.4534%2018.2413C31.4511%2019.1432%2030.7653%2019.8557%2029.8982%2019.8571Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_6%22%20d%3D%22M8.35167%2019.8573C7.46797%2019.8578%206.78259%2019.1481%206.78349%2018.2331C6.78439%2017.3266%207.48686%2016.6024%208.35841%2016.6089C9.21243%2016.6155%209.91265%2017.3514%209.90995%2018.2401C9.90725%2019.1359%209.21288%2019.8569%208.35167%2019.8573Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_7%22%20d%3D%22M7.04601%2013.3248C7.04691%2012.4225%207.73184%2011.7067%208.59575%2011.7048C9.46641%2011.703%2010.1689%2012.4342%2010.1639%2013.3375C10.159%2014.2328%209.46641%2014.9556%208.60654%2014.9621C7.74308%2014.9691%207.04511%2014.237%207.04601%2013.3248Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_8%22%20d%3D%22M31.7073%2013.3323C31.7073%2014.2281%2031.0148%2014.9575%2030.159%2014.9626C29.2919%2014.9677%2028.5903%2014.2384%2028.589%2013.3305C28.5872%2012.4239%2029.2865%2011.7011%2030.1612%2011.7048C31.0211%2011.7086%2031.7069%2012.4305%2031.7073%2013.3323Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_9%22%20d%3D%22M3.58172%207.38868C4.38132%207.38962%204.99968%208.03902%204.99474%208.87263C4.98979%209.6866%204.36108%2010.3411%203.58261%2010.3425C2.79425%2010.3439%202.15475%209.68145%202.1534%208.86187C2.15205%208.03762%202.78211%207.38775%203.58172%207.38868Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_10%22%20d%3D%22M35.6524%207.38867C36.4498%207.39148%2037.0627%208.04041%2037.0582%208.87822C37.0537%209.69032%2036.421%2010.3439%2035.6421%2010.3425C34.8537%2010.3407%2034.2165%209.67583%2034.2169%208.85625C34.2178%208.0376%2034.8546%207.38633%2035.6524%207.38914V7.38867Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_11%22%20d%3D%22M2.85502%2024.1802C2.05362%2024.1811%201.43075%2023.5369%201.43075%2022.7075C1.43075%2021.8762%202.05137%2021.2338%202.85367%2021.2348C3.64023%2021.2357%204.26399%2021.8795%204.26939%2022.6953C4.27479%2023.5229%203.64923%2024.1793%202.85502%2024.1802Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_12%22%20d%3D%22M36.3389%2022.7103C36.3371%2023.5364%2035.7093%2024.1816%2034.9092%2024.1802C34.1136%2024.1788%2033.4948%2023.5261%2033.498%2022.6925C33.5011%2021.8683%2034.1298%2021.2315%2034.9371%2021.2348C35.7165%2021.2376%2036.3402%2021.894%2036.3389%2022.7103Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_13%22%20d%3D%22M11.7038%208.87256C11.6957%209.69308%2011.0751%2010.3121%2010.2696%2010.3027C9.50736%2010.2939%208.90878%209.64352%208.91913%208.8361C8.92902%208.04223%209.55998%207.39517%2010.3155%207.40359C11.0859%207.412%2011.7114%208.07402%2011.7038%208.87256Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_14%22%20d%3D%22M10.9725%2022.7091C10.9716%2023.5189%2010.3483%2024.1655%209.57521%2024.1575C8.81068%2024.1496%208.19097%2023.5076%208.18377%2022.7166C8.17613%2021.9087%208.81923%2021.2471%209.60129%2021.2569C10.3685%2021.2668%2010.9734%2021.9073%2010.9725%2022.7091Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_15%22%20d%3D%22M26.7892%2022.7137C26.786%2021.9058%2027.4053%2021.2578%2028.182%2021.2568C28.946%2021.2559%2029.5707%2021.8969%2029.5779%2022.6889C29.5855%2023.5047%2028.9555%2024.1625%2028.1721%2024.1579C27.4062%2024.1532%2026.7923%2023.5122%2026.7892%2022.7137Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_16%22%20d%3D%22M28.8981%2010.3022C28.1151%2010.2989%2027.5139%209.66402%2027.5166%208.84304C27.5193%208.05432%2028.1444%207.40679%2028.9071%207.40352C29.6698%207.40024%2030.3066%208.06554%2030.3053%208.86408C30.3039%209.67057%2029.6824%2010.3055%2028.8981%2010.3022Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_17%22%20d%3D%22M32.262%2027.5936C31.5617%2027.5922%2030.9915%2027.0036%2030.9874%2026.2775C30.9829%2025.5402%2031.555%2024.9488%2032.2709%2024.9507C32.9838%2024.9526%2033.5513%2025.5487%2033.5437%2026.2874C33.536%2027.0144%2032.9662%2027.5955%2032.262%2027.5936Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_18%22%20d%3D%22M3.8546%2026.2785C3.85415%2025.5323%204.41586%2024.9488%205.13406%2024.9507C5.84147%2024.9526%206.39912%2025.5295%206.40407%2026.2645C6.40857%2027.0036%205.84057%2027.5941%205.12506%2027.5936C4.42215%2027.5932%203.85505%2027.006%203.8546%2026.2785Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_19%22%20d%3D%22M26.8045%2026.2654C26.8076%2026.9971%2026.2477%2027.589%2025.547%2027.5937C24.8306%2027.5983%2024.2568%2027.013%2024.255%2026.2757C24.2532%2025.5426%2024.8113%2024.9554%2025.5151%2024.9507C26.2374%2024.9456%2026.8013%2025.5206%2026.8045%2026.2654Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_20%22%20d%3D%22M11.6877%205.29158C11.6899%204.55148%2012.2629%203.96659%2012.9788%203.97407C13.6813%203.98109%2014.2493%204.57766%2014.2439%205.30139C14.2385%206.0256%2013.6669%206.61889%2012.9698%206.6245C12.2646%206.62965%2011.6859%206.02794%2011.6877%205.29204V5.29158Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_21%22%20d%3D%22M6.2291%203.97412C6.93246%203.97506%207.49821%204.55947%207.50271%205.28882C7.50675%206.02284%206.92527%206.62876%206.22145%206.62455C5.51404%206.61988%204.93795%206.01255%204.94649%205.2804C4.95504%204.55292%205.52394%203.97319%206.2291%203.97412Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_22%22%20d%3D%22M25.3576%205.28589C25.3598%204.55374%2025.9206%203.97447%2026.6271%203.974C27.3458%203.974%2027.903%204.55655%2027.8994%205.30553C27.8958%206.03722%2027.3341%206.62163%2026.6312%206.62443C25.9251%206.62724%2025.3553%206.02833%2025.3576%205.28589Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_23%22%20d%3D%22M13.1329%2026.2565C13.1361%2027.0078%2012.5816%2027.5927%2011.8656%2027.5936C11.1623%2027.5946%2010.5979%2027.0181%2010.5853%2026.286C10.5727%2025.5547%2011.1497%2024.9502%2011.8598%2024.9507C12.5739%2024.9512%2013.1298%2025.5211%2013.1329%2026.2565Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_24%22%20d%3D%22M34.629%205.30939C34.6268%206.04248%2034.0655%206.62502%2033.3617%206.62455C32.6525%206.62455%2032.0921%206.03125%2032.0948%205.28367C32.0975%204.54731%2032.6539%203.97319%2033.3635%203.97412C34.0844%203.97506%2034.6308%204.55199%2034.6286%205.30892L34.629%205.30939Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_25%22%20d%3D%22M28.7804%2030.0641C28.1652%2030.0669%2027.6601%2029.5545%2027.6516%2028.9186C27.6426%2028.273%2028.1454%2027.7386%2028.7665%2027.7334C29.3889%2027.7288%2029.8917%2028.2519%2029.8917%2028.9032C29.8917%2029.5437%2029.3961%2030.0608%2028.7808%2030.0636L28.7804%2030.0641Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_26%22%20d%3D%22M16.4552%201.50389C17.0807%201.50623%2017.5754%202.0308%2017.5682%202.68441C17.5615%203.32025%2017.0542%203.83874%2016.4439%203.83406C15.8323%203.82939%2015.3309%203.30762%2015.3273%202.67225C15.3232%202.02659%2015.8305%201.50109%2016.4556%201.50343L16.4552%201.50389Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_27%22%20d%3D%22M23.1559%2028.9041C23.1559%2029.5498%2022.668%2030.0603%2022.0496%2030.0636C21.4254%2030.0669%2020.928%2029.5507%2020.924%2028.8952C20.9199%2028.2627%2021.4227%2027.7376%2022.0357%2027.7334C22.6621%2027.7292%2023.1568%2028.2458%2023.1564%2028.9041H23.1559Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_28%22%20d%3D%22M10.8345%202.68025C10.8318%203.32124%2010.3358%203.83552%209.71966%203.83552C9.10355%203.83552%208.58367%203.29132%208.59401%202.65641C8.60436%202.0187%209.10669%201.50488%209.71966%201.50488C10.3493%201.50488%2010.8372%202.01917%2010.8345%202.67979V2.68025Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_29%22%20d%3D%22M8.34727%2027.7333C8.96833%2027.7352%209.46887%2028.2653%209.46168%2028.9143C9.45493%2029.5562%208.95979%2030.0639%208.34142%2030.0635C7.71766%2030.0635%207.21892%2029.5361%207.22656%2028.8848C7.23376%2028.2438%207.73295%2027.7314%208.34682%2027.7333H8.34727Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_30%22%20d%3D%22M29.0386%202.67233C29.0377%202.01077%2029.5261%201.50116%2030.1571%201.5049C30.7705%201.50864%2031.2684%202.0262%2031.2715%202.66391C31.2747%203.3063%2030.7602%203.84022%2030.1427%203.83507C29.5234%203.82993%2029.0391%203.31986%2029.0382%202.67233H29.0386Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_31%22%20d%3D%22M12.3096%201.2525C12.3096%200.748036%2012.6743%200.372141%2013.1618%200.374479C13.6345%200.376817%2014.0006%200.753646%2014.0055%201.24268C14.0105%201.7378%2013.6345%202.1352%2013.1596%202.13754C12.6793%202.13987%2012.3092%201.75416%2012.3096%201.2525Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_32%22%20d%3D%22M24.4951%2030.3016C24.4982%2029.8173%2024.8702%2029.4278%2025.3347%2029.4236C25.8006%2029.4194%2026.1914%2029.8261%2026.191%2030.3152C26.1901%2030.8103%2025.8114%2031.1997%2025.3334%2031.1974C24.8531%2031.1951%2024.4919%2030.8094%2024.4951%2030.3021V30.3016Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_33%22%20d%3D%22M11.6374%2031.1541C11.1827%2031.156%2010.822%2030.7838%2010.8234%2030.3139C10.8247%2029.845%2011.1921%2029.464%2011.6374%2029.47C12.0848%2029.4761%2012.4486%2029.8618%2012.4437%2030.3252C12.4388%2030.7805%2012.0772%2031.1522%2011.6374%2031.1541Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_34%22%20d%3D%22M19.8912%200.421642C20.3589%200.422577%2020.6921%200.774159%2020.6895%201.2632C20.6868%201.72979%2020.3423%202.08885%2019.8948%202.09119C19.437%202.094%2019.0826%201.72886%2019.083%201.25431C19.0835%200.770887%2019.4239%200.420238%2019.8912%200.421174V0.421642Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_35%22%20d%3D%22M26.8856%200.421247C27.3312%200.427793%2027.6775%200.79761%2027.6726%201.26046C27.6676%201.73127%2027.3047%202.09688%2026.8491%202.09127C26.394%202.08519%2026.0441%201.70836%2026.054%201.23428C26.0639%200.75974%2026.417%200.414234%2026.8856%200.421247Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_36%22%20d%3D%22M17.7988%2030.304C17.8024%2029.8355%2018.173%2029.4606%2018.6214%2029.4713C19.0617%2029.4821%2019.4133%2029.8561%2019.4142%2030.3143C19.4151%2030.7851%2019.0545%2031.1577%2018.6007%2031.1554C18.1465%2031.1526%2017.7952%2030.78%2017.7993%2030.304H17.7988Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_37%22%20d%3D%22M23.4072%201.74753e-05C23.8308%200.00282266%2024.1631%200.343653%2024.1676%200.780794C24.1721%201.22121%2023.8254%201.58775%2023.4022%201.59102C22.9781%201.5943%2022.6368%201.2357%2022.6359%200.786404C22.6354%200.332432%2022.9642%20-0.00278771%2023.4072%201.74753e-05Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3Cpath%20id%3D%22Vector_38%22%20d%3D%22M15.0871%2031.5759C14.6531%2031.5707%2014.3257%2031.2196%2014.3311%2030.7656C14.3365%2030.3196%2014.6859%2029.9676%2015.1127%2029.9793C15.5282%2029.9905%2015.8619%2030.3481%2015.8615%2030.7811C15.8615%2031.2248%2015.5143%2031.581%2015.0871%2031.5759Z%22%20fill%3D%22%23004C45%22%2F%3E%20%3C%2Fg%3E%20%3C%2Fsvg%3E";

  function sampleBezier(t, a, b) {
    var u = 1 - t;
    return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t;
  }

  function sampleBezierDeriv(t, a, b) {
    var u = 1 - t;
    return 3 * u * u * a + 6 * u * t * (b - a) + 3 * t * t * (1 - b);
  }

  function cubicBezier(t, x1, y1, x2, y2) {
    var clamped = Math.min(1, Math.max(0, t));
    var u = clamped;
    for (var i = 0; i < 6; i += 1) {
      var x = sampleBezier(u, x1, x2) - clamped;
      var dx = sampleBezierDeriv(u, x1, x2);
      if (Math.abs(dx) < 1e-6) break;
      u -= x / dx;
    }
    return sampleBezier(u, y1, y2);
  }

  function easeInOut(t) {
    return cubicBezier(t, EASE_IN_OUT[0], EASE_IN_OUT[1], EASE_IN_OUT[2], EASE_IN_OUT[3]);
  }

  function easeOutSoft(t) {
    return cubicBezier(t, EASE_OUT_SOFT[0], EASE_OUT_SOFT[1], EASE_OUT_SOFT[2], EASE_OUT_SOFT[3]);
  }

  function smoothToward(current, target, dt, tau) {
    var a = 1 - Math.exp(-dt / Math.max(0.001, tau));
    return current + (target - current) * a;
  }

  function prefersReduced() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function isHomeView(shell, stage) {
    var onView = !shell || shell.getAttribute("data-d3-view") === "home";
    var onStage = !stage || stage.getAttribute("data-d1-stage") === "home";
    return onView && onStage;
  }

  function createFrame(thinking) {
    var t = thinking ? THINKING : LANDING;
    return {
      phase: 0,
      logoPhase: thinking ? LOGO_PHASE_LEFT : 0,
      speed: t.speed,
      amplitude: t.amplitude,
      logoOrbit: t.logoOrbit,
      logoSpin: t.logoSpin,
      swirl: t.swirl,
      targetSpeed: t.speed,
      targetAmplitude: t.amplitude,
      targetLogoOrbit: t.logoOrbit,
      targetLogoSpin: t.logoSpin,
      targetSwirl: t.swirl,
      logoScale: 1
    };
  }

  function retarget(frame, thinking) {
    var t = thinking ? THINKING : LANDING;
    frame.targetSpeed = t.speed;
    frame.targetAmplitude = t.amplitude;
    frame.targetLogoOrbit = t.logoOrbit;
    frame.targetLogoSpin = t.logoSpin;
    frame.targetSwirl = t.swirl;
    if (thinking && frame.logoOrbit < 0.35) frame.logoPhase = LOGO_PHASE_LEFT;
  }

  function logoPose(frame) {
    var orbit = frame.logoOrbit;
    var theta = frame.logoPhase;
    var x = Math.sin(theta) * orbit;
    var z = Math.cos(theta) * orbit + (1 - orbit);
    var longitude = Math.atan2(x, z);
    var opacity = 1;
    if (orbit >= 0.02) {
      opacity = z <= 0 ? 0 : Math.min(1, z / 0.18);
    }
    var warp = 0;
    if (orbit > 0.02) {
      warp = easeInOut(Math.min(1, (orbit - 0.02) / 0.78));
    }
    return { longitude: longitude, warp: warp, opacity: opacity, zIndex: z >= 0 ? 2 : 0 };
  }

  function step(frame, offsets, dt, reduced) {
    if (reduced) {
      frame.speed = 0;
      frame.amplitude = 1;
      frame.logoOrbit = 0;
      frame.logoSpin = 0;
      frame.swirl = 0;
      return { layers: BLOBS.map(restLayer), logo: { longitude: 0, warp: 0, opacity: 1, zIndex: 2 } };
    }

    frame.speed = smoothToward(frame.speed, frame.targetSpeed, dt, SMOOTH_TAU_S);
    frame.amplitude = smoothToward(frame.amplitude, frame.targetAmplitude, dt, SMOOTH_TAU_S);
    frame.swirl = smoothToward(frame.swirl, frame.targetSwirl, dt, SMOOTH_TAU_S);
    frame.logoOrbit = smoothToward(frame.logoOrbit, frame.targetLogoOrbit, dt, LOGO_ORBIT_TAU_S);
    frame.logoSpin = smoothToward(frame.logoSpin, frame.targetLogoSpin, dt, LOGO_ORBIT_TAU_S);

    if (frame.speed > 0.0005) frame.phase += dt * frame.speed * BASE_OMEGA;
    if (frame.logoSpin > 0.0005 && frame.logoOrbit > 0.01) {
      frame.logoPhase -= dt * frame.logoSpin * LOGO_OMEGA;
    }

    var swirl = frame.swirl;
    var swirlAng = frame.phase * (0.006 + 0.01 * swirl);
    var cosS = Math.cos(swirlAng);
    var sinS = Math.sin(swirlAng);
    var scaleBoost = 1 + 0.1 * swirl;
    var washX = Math.sin(frame.phase * 0.55) * ORB_SIZE * 0.055 * swirl;

    var layers = BLOBS.map(function (blob, i) {
      var off = offsets[i];
      var t1 = frame.phase * blob.period + off.phase;
      var t2 = frame.phase * blob.period * 0.67 + off.scalePhase;
      var max = blob.travel * ORB_SIZE * frame.amplitude;
      var dx = Math.sin(t1) * max * blob.ax;
      var dy = Math.cos(t1 * 0.74 + t2 * 0.2) * max * blob.ay;
      if (swirl > 0.01) {
        var rdx = dx * cosS - dy * sinS;
        var rdy = dx * sinS + dy * cosS;
        var mix = swirl * 0.12;
        dx = dx + (rdx - dx) * mix;
        dy = dy + (rdy - dy) * mix;
        dx += washX * 0.35;
      }
      var sc = 1 + Math.sin(t2) * blob.scaleAmp * frame.amplitude * scaleBoost;
      sc = Math.min(1.12, Math.max(0.92, sc));
      var breathe = 1 + swirl * 0.06 * Math.sin(t1 * 0.85 + i * 0.55);
      return {
        transform:
          "translate(" +
          (blob.homeX * ORB_SIZE + dx).toFixed(2) +
          "px, " +
          (blob.homeY * ORB_SIZE + dy).toFixed(2) +
          "px) scale(" +
          sc.toFixed(4) +
          ")",
        opacity: Number(Math.min(1, Math.max(0.4, blob.opacity * breathe)).toFixed(3))
      };
    });

    return { layers: layers, logo: logoPose(frame) };
  }

  function restLayer(blob) {
    return {
      transform:
        "translate(" +
        (blob.homeX * ORB_SIZE).toFixed(2) +
        "px, " +
        (blob.homeY * ORB_SIZE).toFixed(2) +
        "px) scale(1)",
      opacity: blob.opacity
    };
  }

  function mount(btn) {
    if (!btn || btn.getAttribute("data-d3-home-orb-ready")) return;
    btn.setAttribute("data-d3-home-orb-ready", "1");

    var RING = RING_SRC;
    var shell = document.querySelector(".d1-shell");
    var stage = btn.closest(".d1-home");
    var reduced = prefersReduced();
    var homeIntro = !reduced;
    var homeHover = false;
    var introTimer = 0;
    var raf = 0;
    var lastTs = 0;
    var thinking = homeIntro;
    var frame = createFrame(thinking);
    var offsets = BLOBS.map(function () {
      return {
        phase: Math.random() * Math.PI * 2,
        scalePhase: Math.random() * Math.PI * 2
      };
    });

    var stripsMeta = [];
    for (var s = 0; s < LOGO_STRIPS; s += 1) {
      stripsMeta.push({ i: s, angle: -LOGO_HALF_LON + (s + 0.5) * STRIP_ANGLE });
    }

    btn.innerHTML =
      '<span class="d3-home-orb__stage" aria-hidden="true">' +
      '<span class="d3-home-orb__root">' +
      '<span class="d3-home-orb__blur"></span>' +
      '<span class="d3-home-orb__logo">' +
      '<span class="d3-home-orb__pivot">' +
      '<span class="d3-home-orb__flat"></span>' +
      '<span class="d3-home-orb__strips"></span>' +
      "</span></span></span></span>";

    var root = btn.querySelector(".d3-home-orb__root");
    var blurHost = btn.querySelector(".d3-home-orb__blur");
    var logoHost = btn.querySelector(".d3-home-orb__logo");
    var pivot = btn.querySelector(".d3-home-orb__pivot");
    var flat = btn.querySelector(".d3-home-orb__flat");
    var stripsHost = btn.querySelector(".d3-home-orb__strips");
    var blobEls = [];
    var stripEls = [];
    var sliceEls = [];

    root.style.width = ORB_SIZE + "px";
    root.style.height = ORB_SIZE + "px";
    root.style.background = ORB_BASE;
    blurHost.style.filter = "blur(" + ORB_BLUR_PX + "px)";

    BLOBS.forEach(function (blob) {
      var el = document.createElement("span");
      el.className = "d3-home-orb__blob";
      var d = ORB_SIZE * blob.size;
      el.style.width = d + "px";
      el.style.height = d + "px";
      el.style.opacity = String(blob.opacity);
      el.style.background =
        "radial-gradient(circle at 50% 50%, " +
        blob.color +
        " 0%, " +
        blob.color +
        " 38%, transparent 72%)";
      el.style.transform =
        "translate(" + blob.homeX * ORB_SIZE + "px, " + blob.homeY * ORB_SIZE + "px)";
      blurHost.appendChild(el);
      blobEls.push(el);
    });

    flat.style.width = LOGO_DESIGN_W + "px";
    flat.style.height = LOGO_DESIGN_H + "px";
    flat.style.background = "#004C45";
    flat.style.webkitMaskImage = "url(" + RING + ")";
    flat.style.maskImage = "url(" + RING + ")";
    flat.style.webkitMaskSize = LOGO_DESIGN_W + "px " + LOGO_DESIGN_H + "px";
    flat.style.maskSize = LOGO_DESIGN_W + "px " + LOGO_DESIGN_H + "px";

    stripsMeta.forEach(function (strip) {
      var stripEl = document.createElement("span");
      stripEl.className = "d3-home-orb__strip";
      stripEl.style.width = FLAT_STRIP_W + "px";
      stripEl.style.height = LOGO_DESIGN_H + "px";
      stripEl.style.transform =
        "translateX(" +
        (-LOGO_DESIGN_W / 2 + (strip.i + 0.5) * FLAT_STRIP_W).toFixed(2) +
        "px) translate(-50%, -50%)";

      var sliceEl = document.createElement("span");
      sliceEl.className = "d3-home-orb__slice";
      sliceEl.style.width = LOGO_DESIGN_W + "px";
      sliceEl.style.height = LOGO_DESIGN_H + "px";
      sliceEl.style.marginLeft = -strip.i * FLAT_SLICE_W + "px";
      sliceEl.style.background = "#004C45";
      sliceEl.style.webkitMaskImage = "url(" + RING + ")";
      sliceEl.style.maskImage = "url(" + RING + ")";
      sliceEl.style.webkitMaskSize = LOGO_DESIGN_W + "px " + LOGO_DESIGN_H + "px";
      sliceEl.style.maskSize = LOGO_DESIGN_W + "px " + LOGO_DESIGN_H + "px";

      stripEl.appendChild(sliceEl);
      stripsHost.appendChild(stripEl);
      stripEls.push(stripEl);
      sliceEls.push(sliceEl);
    });

    function applyLogo(pose) {
      logoHost.style.opacity = String(pose.opacity);
      logoHost.style.zIndex = String(pose.zIndex);
      logoHost.style.perspective = pose.warp < 0.02 ? "none" : LOGO_PERSPECTIVE + "px";
      pivot.style.transform =
        "rotateY(" + pose.longitude + "rad) scale(" + frame.logoScale + ")";

      var useFlat = pose.warp < 0.02;
      flat.style.opacity = useFlat ? "1" : "0";
      flat.style.visibility = useFlat ? "visible" : "hidden";
      stripsHost.style.opacity = useFlat ? "0" : "1";
      stripsHost.style.visibility = useFlat ? "hidden" : "visible";
      if (useFlat) return;

      var t = pose.warp;
      var lift = easeOutSoft(t);
      var fan = easeInOut(t);
      var gather = easeInOut(t);
      var sizeT = easeInOut(t);
      var stripW = FLAT_STRIP_W + (WARP_STRIP_W - FLAT_STRIP_W) * sizeT;
      var markW = LOGO_DESIGN_W + (LOGO_W - LOGO_DESIGN_W) * sizeT;
      var markH = LOGO_DESIGN_H + (LOGO_H - LOGO_DESIGN_H) * sizeT;
      var sliceW = FLAT_SLICE_W + (WARP_SLICE_W - FLAT_SLICE_W) * sizeT;

      for (var i = 0; i < LOGO_STRIPS; i += 1) {
        var stripEl = stripEls[i];
        var sliceEl = sliceEls[i];
        var angle = stripsMeta[i].angle * fan;
        var z = LOGO_SPHERE_R * lift;
        var flatX = -LOGO_DESIGN_W / 2 + (i + 0.5) * FLAT_STRIP_W;
        var x = flatX * (1 - gather);
        stripEl.style.width = stripW + "px";
        stripEl.style.height = markH + "px";
        stripEl.style.transform =
          "translateX(" +
          x.toFixed(2) +
          "px) rotateY(" +
          angle +
          "rad) translateZ(" +
          z.toFixed(2) +
          "px) translate(-50%, -50%)";
        sliceEl.style.width = markW + "px";
        sliceEl.style.height = markH + "px";
        sliceEl.style.marginLeft = (-i * sliceW).toFixed(2) + "px";
        sliceEl.style.webkitMaskSize = markW + "px " + markH + "px";
        sliceEl.style.maskSize = markW + "px " + markH + "px";
      }
    }

    function apply(result) {
      result.layers.forEach(function (layer, i) {
        blobEls[i].style.transform = layer.transform;
        blobEls[i].style.opacity = String(layer.opacity);
      });
      applyLogo(result.logo);
      blurHost.style.filter =
        "blur(" + (ORB_BLUR_PX * (1 - 0.28 * frame.swirl)).toFixed(2) + "px)";
      blurHost.style.transform = "scale(" + (1.15 + 0.03 * frame.swirl).toFixed(3) + ")";
    }

    function setThinking(next) {
      if (next === thinking) return;
      thinking = next;
      retarget(frame, thinking);
    }

    function syncMode() {
      setThinking(homeIntro || homeHover);
    }

    var introPlayed = false;

    function startIntro() {
      window.clearTimeout(introTimer);
      /* One intro on first mount only — replaying the orbit on every
         Home nav felt like a goofy L→R slide in the hero. */
      if (introPlayed || reduced || !isHomeView(shell, stage)) {
        homeIntro = false;
        syncMode();
        return;
      }
      introPlayed = true;
      homeIntro = true;
      homeHover = false;
      syncMode();
      introTimer = window.setTimeout(function () {
        homeIntro = false;
        syncMode();
      }, HOME_INTRO_MS);
    }

    function tick(now) {
      if (document.visibilityState === "hidden") {
        lastTs = 0;
        raf = requestAnimationFrame(tick);
        return;
      }
      var dt = lastTs ? (now - lastTs) / 1000 : 1 / 60;
      if (dt > 0.05) dt = 0.05;
      if (dt < 0) dt = 0;
      lastTs = now;
      apply(step(frame, offsets, dt, reduced));
      raf = requestAnimationFrame(tick);
    }

    function focusComposer() {
      var input = document.querySelector('.d1-home[data-d1-stage="home"] [data-d1-input]');
      if (input) {
        input.focus();
        return;
      }
      var askbar = document.querySelector("[data-d3-askbar]");
      if (askbar) askbar.click();
    }

    btn.addEventListener("mouseenter", function () {
      homeHover = true;
      syncMode();
    });
    btn.addEventListener("mouseleave", function () {
      homeHover = false;
      syncMode();
    });
    btn.addEventListener("focus", function () {
      homeHover = true;
      syncMode();
    });
    btn.addEventListener("blur", function () {
      homeHover = false;
      syncMode();
    });
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      focusComposer();
    });

    if (shell) {
      var obs = new MutationObserver(function () {
        if (!isHomeView(shell, stage)) {
          window.clearTimeout(introTimer);
          homeIntro = false;
          homeHover = false;
          syncMode();
        }
      });
      obs.observe(shell, { attributes: true, attributeFilter: ["data-d3-view"] });
    }

    apply(step(frame, offsets, 0, reduced));
    raf = requestAnimationFrame(tick);
    startIntro();
  }

  function boot() {
    var btn = document.querySelector("[data-d3-home-orb]");
    if (btn) mount(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
