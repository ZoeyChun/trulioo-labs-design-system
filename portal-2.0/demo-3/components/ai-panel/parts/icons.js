/**
 * Inline SVG icons used by AI panel parts.
 */
(function (global) {
  "use strict";

  var ns = (global.D3AiPanel = global.D3AiPanel || {});

  ns.icons = {
    back:
      '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10 3 5 8l5 5"/></svg>',
    close:
      '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="m4 4 8 8M12 4l-8 8"/></svg>',
    /* New chat — square with a pencil (compose) */
    newChat:
      '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M7.5 2.75h-3A1.75 1.75 0 0 0 2.75 4.5v7a1.75 1.75 0 0 0 1.75 1.75h7a1.75 1.75 0 0 0 1.75-1.75v-3M11.9 2.1a1.15 1.15 0 0 1 1.63 1.63L8 9.25 5.75 9.75l.5-2.25L11.9 2.1Z"/></svg>',
    /* Minimize panel — rounded frame with its lower bar split off, a chevron down in the upper part */
    minimize:
      '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="3" width="10" height="10" rx="1.75" stroke="currentColor" stroke-width="1.5"/><path stroke="currentColor" stroke-width="1.5" d="M3 9.25h10"/><path stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" d="m6.4 5.4 1.6 1.5 1.6-1.5"/></svg>',
    /* Expand to full canvas — opposing diagonal arrows out */
    expand:
      '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M9.5 2.5H13.5V6.5M6.5 13.5H2.5V9.5M13.5 2.5 9 7M2.5 13.5 7 9"/></svg>',
    /* Exit full canvas — minimize arrows (Figma) */
    collapse:
      '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M13.5 6.5H9.5V2.5M2.5 9.5H6.5V13.5M9.5 6.5 14 2M6.5 9.5 2 14"/></svg>',
    arrow:
      '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M3 8h10m0 0-3.5-3.5M13 8l-3.5 3.5"/></svg>',
    plus:
      '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M8 3v10M3 8h10"/></svg>',
    mic:
      '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8 1.75a2.25 2.25 0 0 0-2.25 2.25v4a2.25 2.25 0 1 0 4.5 0v-4A2.25 2.25 0 0 0 8 1.75Zm-4.5 6.5a4.5 4.5 0 0 0 9 0M8 12.25V14.5"/></svg>',
    send:
      '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8 13V3m0 0L4.5 6.5M8 3l3.5 3.5"/></svg>',
  };
})(typeof window !== "undefined" ? window : this);
