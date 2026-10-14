import Link from "next/link";

const DEMOS = [
  { href: "/experiments/mesh-loader", title: "Mesh loader", detail: "Animated mesh gradient with the Trulioo dots logo" },
  { href: "/experiments/orbs", title: "Thinking orbs", detail: "TruAI thinking orb states" },
  { href: "/experiments/orbs/webgl", title: "WebGL orb", detail: "Voice-driven WebGL orb" },
  { href: "/experiments/orbs/drawer", title: "TruAI panel", detail: "Black canvas with the TruAI side drawer" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#18181B] px-8 py-16 text-white">
      <p className="text-[12px] tracking-[0.08em] text-neutral-400 uppercase">Portal 2.0</p>
      <h1 className="mt-2 text-3xl font-medium">Loader</h1>
      <ul className="mt-10 flex max-w-xl flex-col gap-3">
        {DEMOS.map((demo) => (
          <li key={demo.href}>
            <Link
              href={demo.href}
              className="block rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10"
            >
              <span className="block text-[15px]">{demo.title}</span>
              <span className="mt-1 block text-[13px] text-neutral-400">{demo.detail}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
