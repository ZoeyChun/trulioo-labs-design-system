/// <reference types="vite/client" />

/* Safari still ships the prefixed Fullscreen API, which lib.dom.d.ts omits. */
interface HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
}

interface Document {
  webkitExitFullscreen?: () => Promise<void>;
}
