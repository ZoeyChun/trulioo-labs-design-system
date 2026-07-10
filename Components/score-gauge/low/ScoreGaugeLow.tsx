import { ScoreGauge } from '../ScoreGauge';
import type { ScoreGaugeProps } from '../ScoreGauge';

/** Low-risk gauge (green). Thin wrapper that locks `risk` to "low". */
export type ScoreGaugeLowProps = Omit<ScoreGaugeProps, 'risk' | 'label'> & { label?: string };

export function ScoreGaugeLow({ label = 'Low Risk', ...rest }: ScoreGaugeLowProps) {
  return <ScoreGauge risk="low" label={label} {...rest} />;
}
