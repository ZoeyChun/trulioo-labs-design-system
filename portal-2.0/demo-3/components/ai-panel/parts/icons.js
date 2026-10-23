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
    /* Expand to full canvas — opposing diagonal arrows out */
    expand:
      '<svg class="d3-fa-line" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M9.5 2.5H13.5V6.5M6.5 13.5H2.5V9.5M13.5 2.5 9 7M2.5 13.5 7 9"/></svg>',
    /* Exit full canvas — minimize arrows (Figma) */
    collapse:
      '<svg class="d3-fa-line" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M14.875 1.34375L10.6562 5.5625H13.3438C13.75 5.5625 14.0938 5.90625 14.0938 6.3125C14.0938 6.71875 13.75 7.0625 13.3438 7.0625H8.84375C8.40625 7.0625 8.09375 6.71875 8.09375 6.3125V1.8125C8.09375 1.40625 8.40625 1.0625 8.84375 1.0625C9.25 1.0625 9.59375 1.40625 9.59375 1.8125V4.5L13.8125 0.28125C14.0938 0 14.5625 0 14.875 0.28125C15.1562 0.5625 15.1562 1.0625 14.875 1.34375ZM0.3125 13.7812L4.53125 9.5625H1.8125C1.40625 9.5625 1.0625 9.21875 1.0625 8.8125C1.0625 8.40625 1.40625 8.0625 1.8125 8.0625H6.3125C6.75 8.0625 7.0625 8.40625 7.0625 8.8125V13.3125C7.0625 13.7188 6.75 14.0625 6.3125 14.0625C5.90625 14.0625 5.5625 13.7188 5.5625 13.3125V10.625L1.34375 14.8438C1.0625 15.125 0.59375 15.125 0.3125 14.8438C0 14.5625 0 14.0625 0.3125 13.7812Z" fill="currentColor"/></svg>',
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
