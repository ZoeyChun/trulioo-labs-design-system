import type { Metadata } from "next";
import localFont from "next/font/local";
import { OrbLab } from "./orb-lab";

const tobias = localFont({
  src: "../fonts/Tobias-Regular.otf",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "TruAI panel",
  description: "Black canvas with the TruAI side drawer.",
};

export default function DrawerPage() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black">
      <OrbLab displayClassName={tobias.className} />
    </main>
  );
}
