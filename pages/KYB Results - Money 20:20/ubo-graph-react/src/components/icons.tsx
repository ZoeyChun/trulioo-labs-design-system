/* Solid 640-grid glyphs matching the icon set in assets/icons. */

export function PersonIcon() {
  return (
    <svg viewBox="0 0 640 640" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
      />
    </svg>
  );
}

export function BuildingIcon() {
  return (
    <svg viewBox="0 0 640 640" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M160 64C124.7 64 96 92.7 96 128L96 512C96 547.3 124.7 576 160 576L240 576L240 448C240 430.3 254.3 416 272 416L368 416C385.7 416 400 430.3 400 448L400 576L480 576C515.3 576 544 547.3 544 512L544 128C544 92.7 515.3 64 480 64L160 64zM176 160L208 160C216.8 160 224 167.2 224 176L224 208C224 216.8 216.8 224 208 224L176 224C167.2 224 160 216.8 160 208L160 176C160 167.2 167.2 160 176 160zM304 160L336 160C344.8 160 352 167.2 352 176L352 208C352 216.8 344.8 224 336 224L304 224C295.2 224 288 216.8 288 208L288 176C288 167.2 295.2 160 304 160zM432 160L464 160C472.8 160 480 167.2 480 176L480 208C480 216.8 472.8 224 464 224L432 224C423.2 224 416 216.8 416 208L416 176C416 167.2 423.2 160 432 160zM160 304C160 295.2 167.2 288 176 288L208 288C216.8 288 224 295.2 224 304L224 336C224 344.8 216.8 352 208 352L176 352C167.2 352 160 344.8 160 336L160 304zM304 288L336 288C344.8 288 352 295.2 352 304L352 336C352 344.8 344.8 352 336 352L304 352C295.2 352 288 344.8 288 336L288 304C288 295.2 295.2 288 304 288zM416 304C416 295.2 423.2 288 432 288L464 288C472.8 288 480 295.2 480 304L480 336C480 344.8 472.8 352 464 352L432 352C423.2 352 416 344.8 416 336L416 304z"
      />
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
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8.7 3.1a.7.7 0 0 0-1.4 0V7.3H3.1a.7.7 0 0 0 0 1.4H7.3v4.2a.7.7 0 0 0 1.4 0V8.7h4.2a.7.7 0 0 0 0-1.4H8.7V3.1z" />
    </svg>
  );
}

export function ZoomOutIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3.1 7.3h9.8a.7.7 0 0 1 0 1.4H3.1a.7.7 0 0 1 0-1.4z" />
    </svg>
  );
}

/** Four corner brackets, drawn as filled L shapes rather than strokes. */
export function FullscreenEnterIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M2.6 2.6h4v1.3H3.9v2.7H2.6V2.6z" />
      <path d="M13.4 2.6v4h-1.3V3.9H9.4V2.6h4z" />
      <path d="M13.4 13.4h-4v-1.3h2.7V9.4h1.3v4z" />
      <path d="M2.6 13.4v-4h1.3v2.7h2.7v1.3h-4z" />
    </svg>
  );
}

export function FullscreenExitIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M6.6 6.6h-4V5.3h2.7V2.6h1.3v4z" />
      <path d="M9.4 6.6v-4h1.3v2.7h2.7v1.3h-4z" />
      <path d="M9.4 9.4h4v1.3h-2.7v2.7H9.4v-4z" />
      <path d="M6.6 9.4v4H5.3v-2.7H2.6V9.4h4z" />
    </svg>
  );
}

/** Circular arrow, so "reset view" is not mistaken for the fullscreen brackets. */
export function ResetViewIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M11.6 3.71A5.6 5.6 0 1 1 6.085 2.738L6.495 3.865A4.4 4.4 0 1 0 10.828 4.63z" />
      <path d="M5.709 1.704 8.545 2.48 6.871 4.899z" />
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
        d="M8.42188 1.82617L9.625 1.375L10.0762 0.150391C10.1191 0.0644531 10.2051 0 10.3125 0C10.4199 0 10.5059 0.0644531 10.5488 0.150391L11 1.375L12.2246 1.82617C12.3105 1.86914 12.375 1.95508 12.375 2.0625C12.375 2.16992 12.3105 2.25586 12.2246 2.29883L11 2.75L10.5488 3.97461C10.5059 4.06055 10.4199 4.125 10.3125 4.125C10.2051 4.125 10.1191 4.06055 10.0762 3.97461L9.625 2.75L8.42188 2.29883C8.31445 2.25586 8.25 2.16992 8.25 2.0625C8.25 1.95508 8.31445 1.86914 8.42188 1.82617ZM4.44727 2.25586H4.42578L5.58594 4.72656L8.05664 5.88672C8.16406 5.92969 8.25 6.05859 8.25 6.1875C8.25 6.31641 8.16406 6.44531 8.05664 6.50977L5.58594 7.64844L4.42578 10.1191C4.38281 10.2266 4.25391 10.3125 4.125 10.3125C3.99609 10.3125 3.86719 10.2266 3.80273 10.1191L2.66406 7.64844L0.193359 6.50977C0.0859375 6.44531 0 6.31641 0 6.1875C0 6.05859 0.0859375 5.92969 0.193359 5.86523L2.66406 4.72656L3.82422 2.25586C3.86719 2.14844 3.99609 2.0625 4.125 2.0625C4.25391 2.0625 4.38281 2.14844 4.44727 2.25586ZM8.9375 9.625L9.38867 8.42188C9.43164 8.31445 9.51758 8.25 9.625 8.25C9.73242 8.25 9.81836 8.31445 9.86133 8.42188L10.3125 9.625L11.5371 10.0762C11.623 10.1191 11.6875 10.2051 11.6875 10.3125C11.6875 10.4199 11.623 10.5059 11.5371 10.5488L10.3125 11L9.86133 12.2246C9.81836 12.3105 9.73242 12.375 9.625 12.375C9.51758 12.375 9.43164 12.3105 9.38867 12.2246L8.9375 11L7.73438 10.5488C7.62695 10.5059 7.5625 10.4199 7.5625 10.3125C7.5625 10.2051 7.62695 10.1191 7.73438 10.0762L8.9375 9.625Z"
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
