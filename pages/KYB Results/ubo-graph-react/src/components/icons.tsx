export function PersonIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <circle cx="8" cy="5.5" r="2.25" />
      <path d="M3.5 13.5c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" />
    </svg>
  );
}

export function BuildingIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <path d="M3 13.5V4.5l5-2.5 5 2.5v9" />
      <path d="M6.5 13.5v-4h3v4" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <circle cx="7" cy="7" r="4.25" />
      <path d="M10.5 10.5 13 13" />
    </svg>
  );
}

export function FilterIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M2.5 4h11M4.5 8h7M6.5 12h3" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function ZoomInIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8 3.5v9M3.5 8h9" />
    </svg>
  );
}

export function ZoomOutIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3.5 8h9" />
    </svg>
  );
}

export function FullscreenEnterIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <path d="M2.5 6.5V3.5h3M10.5 2.5h3v3M13.5 10.5v3h-3M5.5 13.5h-3v-3" />
    </svg>
  );
}

export function FullscreenExitIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <path d="M6.5 2.5H3.5v3M10.5 2.5h3v3M13.5 10.5v3h-3M5.5 13.5h-3v-3" />
    </svg>
  );
}

export function FitIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <path d="M6 2.5H3.5v2.5M10 2.5h2.5V5M10 13.5h2.5V11M6 13.5H3.5V11" />
    </svg>
  );
}

export function WarningIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <path d="M8 2.5 14 13.5H2L8 2.5z" />
      <path d="M8 6.5v3.5" strokeLinecap="round" />
      <circle cx="8" cy="11.75" r=".6" fill="currentColor" />
    </svg>
  );
}

export function SparkleIcon() {
  return (
    <svg className="icon" viewBox="0 0 12.375 12.375" fill="none" aria-hidden="true">
      <path
        d="M8.42188 1.82617L9.625 1.375L10.0762 0.150391C10.1191 0.0644531 10.2051 0 10.3125 0C10.4199 0 10.5059 0.0644531 10.5488 0.150391L11 1.375L12.2246 1.82617C12.3105 1.86914 12.375 1.95508 12.375 2.0625C12.375 2.16992 12.3105 2.25586 12.2246 2.29883L11 2.75L10.5488 3.97461C10.5059 4.06055 10.4199 4.125 10.3125 4.125C10.2051 4.125 10.1191 4.06055 10.0762 3.97461L9.625 2.75L8.42188 2.29883C8.31445 2.25586 8.25 2.16992 8.25 2.0625C8.25 1.95508 8.31445 1.86914 8.42188 1.82617Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function graphIcon(type?: string) {
  return type === "person" ? <PersonIcon /> : <BuildingIcon />;
}
