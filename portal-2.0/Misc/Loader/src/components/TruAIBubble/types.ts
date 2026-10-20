import type { ReactNode } from "react";

export type TruAIState = "idle" | "thinking" | "acting" | "completed" | "needs-attention";

export interface TruAIBubbleProps {
  state: TruAIState;
  /** Max 2 words. Dev-warned when longer. */
  actingLabel?: string;
  actingIcon?: ReactNode;
  /** Hold duration in completed before returning to idle. Default 1500. */
  completedHoldMs?: number;
  onCompletedEnd?: () => void;
  className?: string;
}
