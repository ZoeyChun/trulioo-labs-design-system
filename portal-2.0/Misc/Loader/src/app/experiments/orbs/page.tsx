import type { Metadata } from "next";
import { OrbShowcase } from "./showcase";

export const metadata: Metadata = {
  title: "Thinking orbs",
  description: "Nine hand-tuned TruAI thinking orb states at chat-avatar and inline sizes.",
};

export default function OrbsPage() {
  return <OrbShowcase />;
}
