/**
 * ScoreGaugeDemo.tsx — usage reference
 *
 * Shows three risk tiers side-by-side with a Replay Animation button.
 * Replace the hard-coded SCENARIOS array with your real API data.
 */

import { useState } from 'react';
import { ScoreGauge } from './ScoreGauge';
import type { RiskLevel } from './ScoreGauge';

// ── Example: mapping from API response shape to gauge props ──────────────────
// If your API returns strings like "HIGH_RISK", "MEDIUM_RISK", "LOW_RISK":
const riskMap: Record<string, RiskLevel> = {
  HIGH_RISK:   'high',
  MEDIUM_RISK: 'medium',
  LOW_RISK:    'low',
};

// ── Static demo scenarios (replace with real data) ───────────────────────────
const SCENARIOS: Array<{ score: number; risk: RiskLevel; label: string }> = [
  { score: 92, risk: 'low',    label: 'Low Risk' },
  { score: 50, risk: 'medium', label: 'Medium Risk' },
  { score: 8,  risk: 'high',   label: 'High Risk' },
];

// ── Dynamic usage example (uncomment when wiring to real data) ───────────────
// const result = useApiResult(); // your hook
// const gauge = {
//   score: result.score,
//   risk:  riskMap[result.riskLevel],
//   label: result.riskLabel,
// };

export default function ScoreGaugeDemo() {
  const [animKey, setAnimKey] = useState(0);

  return (
    <div style={pageStyle}>
      <div style={rowStyle}>
        {SCENARIOS.map((s) => (
          <ScoreGauge
            key={s.risk}
            score={s.score}
            risk={s.risk}
            label={s.label}
            animationKey={animKey}
          />
        ))}
      </div>

      <button style={btnStyle} onClick={() => setAnimKey((k) => k + 1)}>
        Replay Animation
      </button>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'SF Pro', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: '#1A2322',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 32,
  padding: 40,
  fontFamily: FONT_STACK,
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 20,
};

const btnStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.25)',
  color: '#A0B0AF',
  borderRadius: 8,
  padding: '10px 24px',
  fontSize: 14,
  fontFamily: FONT_STACK,
  cursor: 'pointer',
  letterSpacing: '0.02em',
};

// Export riskMap so consumers can import it alongside the component
export { riskMap };
