import { ScoreGauge } from '../ScoreGauge';
import type { ScoreGaugeProps } from '../ScoreGauge';

/** Medium-risk gauge (amber). Thin wrapper that locks `risk` to "medium". */
export type ScoreGaugeMediumProps = Omit<ScoreGaugeProps, 'risk' | 'label'> & { label?: string };

export function ScoreGaugeMedium({ label = 'Medium Risk', ...rest }: ScoreGaugeMediumProps) {
  return <ScoreGauge risk="medium" label={label} {...rest} />;
}
