"use client";

import dynamic from "next/dynamic";

const OrbDemo = dynamic(() => import("./demo"), {
  ssr: false,
  loading: () => <main className="h-dvh w-full bg-white" />,
});

export default function OrbPage() {
  return <OrbDemo />;
}
