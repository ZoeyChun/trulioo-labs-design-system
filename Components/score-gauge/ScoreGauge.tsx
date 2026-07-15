import { useEffect, useRef, useState } from 'react';

export type RiskLevel = 'high' | 'medium' | 'low';

export interface ScoreGaugeProps {
  /** 0–100. Drives both the number and how far the arc fills. */
  score: number;
  /** Risk tier — controls color scheme. */
  risk: RiskLevel;
  /** Label shown in the badge pill, e.g. "High Risk". */
  label: string;
  /** Increment to replay the entry animation. */
  animationKey?: number;
}

// ── Geometry (derived from Figma SVGs, viewBox 0 0 227 180) ──────────────────
const SVG_W     = 227;
const SVG_H     = 180;
const CX        = 113.526;
const CY        = 121.53;
const R_OUTER   = 95.53;        // outer edge of track
const R_INNER   = 76.43;        // inner edge of track
const R_DARK    = R_OUTER - 5;  // inner edge of 5-px accent ring (= 90.53)
const POINTER_R = 73;           // straddles the arc inner edge: tip half over the band (gauge), base half over the interior (background)

// Gauge arc: 160° → 380° (= 20°), clockwise sweep of 220°
const START_DEG = 160;
const SWEEP_DEG = 220;

// ── DS color tokens (exact values from Trulioo-ADS---2026) ───────────────────
const TRACK_COLOR   = '#f4f6f4'; // --surface-neutral-02
const POINTER_COLOR = '#004c45'; // --interactive-default (constant across all tiers)
const NUMBER_COLOR  = '#172d2d'; // --text-default

const PALETTE: Record<RiskLevel, { fill: string; border: string; tagText: string }> = {
  // fill = --surface-*, border = --border-*, tagText = --text-*
  high:   { fill: '#fff1f1', border: '#db2b2b', tagText: '#ba151d' }, // negative
  medium: { fill: '#fff4db', border: '#d8a13b', tagText: '#775516' }, // intermediate
  low:    { fill: '#eaf7f0', border: '#6fb38a', tagText: '#166534' }, // positive
};

// DS --font-family
const FONT_STACK = "'Inter', sans-serif";

// ── Helpers ───────────────────────────────────────────────────────────────────
const toRad = (d: number) => (d * Math.PI) / 180;

function polar(angleDeg: number, r: number): [number, number] {
  const a = toRad(angleDeg);
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

/** Filled annular sector from startDeg → endDeg (clockwise). */
function sectorPath(startDeg: number, endDeg: number, rOuter: number, rInner: number): string {
  const sweep = ((endDeg - startDeg) + 360) % 360;
  if (sweep < 0.05) return '';
  const lg = sweep > 180 ? 1 : 0;
  const [osx, osy] = polar(startDeg, rOuter);
  const [oex, oey] = polar(endDeg,   rOuter);
  const [iex, iey] = polar(endDeg,   rInner);
  const [isx, isy] = polar(startDeg, rInner);
  return (
    `M ${osx} ${osy} ` +
    `A ${rOuter} ${rOuter} 0 ${lg} 1 ${oex} ${oey} ` +
    `L ${iex} ${iey} ` +
    `A ${rInner} ${rInner} 0 ${lg} 0 ${isx} ${isy} Z`
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ScoreGauge({ score, risk, label, animationKey = 0 }: ScoreGaugeProps) {
  const [animVal, setAnimVal] = useState(0);
  const rafRef = useRef<number>(0);
  const t0Ref  = useRef<number | null>(null);
  const DURATION = 1400;

  useEffect(() => {
    setAnimVal(0);
    t0Ref.current = null;
    const tick = (now: number) => {
      if (t0Ref.current === null) t0Ref.current = now;
      const raw   = Math.min((now - t0Ref.current) / DURATION, 1);
      const eased = 1 - Math.pow(1 - raw, 4); // ease-out quart
      setAnimVal(score * eased);
      if (raw < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [score, animationKey]);

  const pal      = PALETTE[risk];
  const fillEnd  = START_DEG + (animVal / 100) * SWEEP_DEG;
  const showFill = animVal > 0.3;

  const trackPath     = sectorPath(START_DEG, START_DEG + SWEEP_DEG, R_OUTER, R_INNER);
  const fillLightPath = sectorPath(START_DEG, fillEnd,               R_OUTER, R_INNER);
  const fillDarkPath  = sectorPath(START_DEG, fillEnd,               R_OUTER, R_DARK);

  const [px, py] = polar(fillEnd, POINTER_R);
  const ptrRot   = fillEnd + 90; // tip points outward toward the arc edge

  return (
    <div style={cardStyle}>
      <svg
        width={SVG_W}
        height={SVG_H}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* Track */}
        <path d={trackPath} fill={TRACK_COLOR} />

        {showFill && <>
          {/* Light fill — full track width */}
          <path d={fillLightPath} fill={pal.fill} />
          {/* Accent ring — outer 5 px */}
          <path d={fillDarkPath}  fill={pal.border} />
          {/* Pointer — white backing (kept elongated as the outline) + equilateral dark-green core on top */}
          <polygon
            points="0,-12 8.5,6.5 -8.5,6.5"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth={4}
            strokeLinejoin="round"
            transform={`translate(${px},${py}) rotate(${ptrRot})`}
          />
          <polygon
            points="0,-7 7,5.5 -7,5.5"
            fill={POINTER_COLOR}
            strokeLinejoin="round"
            transform={`translate(${px},${py}) rotate(${ptrRot})`}
          />
        </>}

        {/* Score number — Numbers/xl: Inter Regular 64 */}
        <text
          x={CX} y={101}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: 64,
            fontWeight: 400,
            fill: NUMBER_COLOR,
            fontFamily: FONT_STACK,
            letterSpacing: 0,
          }}
        >
          {Math.round(animVal)}
        </text>

        {/* Badge — Tag component, medium size (positive | intermediate | negative) */}
        <foreignObject x={CX - 70} y={125} width={140} height={30} overflow="visible">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <span style={tagStyle(pal)}>{label}</span>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  borderRadius: 16, // --radius-section
  padding: '18px 18px 20px',
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 4px 20px rgba(36,48,47,0.10)',
};

/** Tag pill — DS Tag component, medium size (Inter Medium 500, 12px / 16px). */
function tagStyle(pal: { fill: string; border: string; tagText: string }): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    background: pal.fill,             // --surface-*
    border: `1px solid ${pal.border}`, // --border-*
    color: pal.tagText,              // --text-*
    borderRadius: 9999,              // --radius-badge
    padding: '4px 8px',
    fontSize: 12,
    fontWeight: 510,                 // --font-weight-figma
    fontVariationSettings: "'wght' 510",
    fontFamily: FONT_STACK,
    whiteSpace: 'nowrap',
    lineHeight: '16px',
  };
}
