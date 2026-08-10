import type { ReactNode } from "react";

export function A11yGuide({ children }: { children: ReactNode }) {
  return (
    <div className="tds-preview__a11y-guide">
      <ul className="tds-preview__a11y-list">{children}</ul>
    </div>
  );
}

export function A11yItem({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li>
      <strong>{title}</strong>: {children}
    </li>
  );
}
