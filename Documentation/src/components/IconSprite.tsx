const ICONS: Record<string, string> = {
  overview:
    '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 8v4"/><circle cx="12" cy="16" r=".5" fill="currentColor" stroke="none"/>',
  migration:
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 3v12M8 11l4 4 4-4"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M5 21h14"/>',
  buttons:
    '<rect fill="none" stroke="currentColor" stroke-width="2" x="2" y="7" width="20" height="10" rx="2"/>',
  inputs:
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M7 22h1a4 4 0 0 0 4-4v-1"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M7 2h1a4 4 0 0 1 4 4v1"/>',
  controls:
    '<rect fill="none" stroke="currentColor" stroke-width="2" x="2" y="6" width="20" height="12" rx="6"/><circle cx="8" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="2"/>',
  tags:
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" stroke="none"/>',
  navigation:
    '<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 3v18"/>',
  disclosure:
    '<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 9h18"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m9 15 3 3 3-3"/>',
  data:
    '<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" x="3" y="3" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 9h18M3 15h18M12 3v18"/>',
  typography:
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 7V4h16v3"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 20h6"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 4v16"/>',
  tokens:
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S13 7 12 2c-1 5-2 6.4-4 8.5S5 17 5 15a7 7 0 0 0 7 7z"/>',
  tracker:
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 19V5"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10 19V9"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 19v-6"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M22 19V11"/>',
  "section-getting-started":
    '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m12 8 3 3-3 3"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 12H6"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 5V3"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 21v-2"/>',
  "section-foundations":
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 2 3 7l9 5 9-5-9-5Z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m3 12 9 5 9-5"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m3 17 9 5 9-5"/>',
  "section-components":
    '<rect fill="none" stroke="currentColor" stroke-width="2" x="3" y="3" width="8" height="8" rx="1.5"/><rect fill="none" stroke="currentColor" stroke-width="2" x="13" y="3" width="8" height="8" rx="1.5"/><rect fill="none" stroke="currentColor" stroke-width="2" x="3" y="13" width="8" height="8" rx="1.5"/><rect fill="none" stroke="currentColor" stroke-width="2" x="13" y="13" width="8" height="8" rx="1.5"/>',
  "section-content":
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M14 2v5h5"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 13h6"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 17h4"/>',
  default:
    '<rect fill="none" stroke="currentColor" stroke-width="2" x="4" y="4" width="16" height="16" rx="3"/>',
};

export function NavIcon({ name }: { name: string }) {
  const glyph = ICONS[name] ?? ICONS.default;
  return (
    <svg
      className="tds-preview__nav-glyph"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: glyph }}
    />
  );
}

export function IconSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="tds-preview__icon-sprite"
      aria-hidden="true"
      focusable="false"
    >
      {Object.entries(ICONS).map(([id, content]) => (
        <symbol
          key={id}
          id={`pr-i-${id}`}
          viewBox="0 0 24 24"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ))}
    </svg>
  );
}
