import { ScoreGauge } from '../ScoreGauge';
import type { ScoreGaugeProps } from '../ScoreGauge';

/** High-risk gauge (red). Thin wrapper that locks `risk` to "high". */
export type ScoreGaugeHighProps = Omit<ScoreGaugeProps, 'risk' | 'label'> & { label?: string };

export function ScoreGaugeHigh({ label = 'High Risk', ...rest }: ScoreGaugeHighProps) {
  return <ScoreGauge risk="high" label={label} {...rest} />;
}
