import type { Metadata } from "next";
import { TruAIBubbleDemo } from "./demo";

export const metadata: Metadata = {
  title: "TruAI collapsed bubble",
  description: "Collapsed TruAI status bubble with animated mesh orb.",
};

export default function TruAIBubblePage() {
  return <TruAIBubbleDemo />;
}
