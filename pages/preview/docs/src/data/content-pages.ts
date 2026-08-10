export type ContentPageId =
  | "component-content"
  | "writing-guidelines"
  | "vocabulary"
  | "voice-and-tone";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type ContentPageData = {
  id: ContentPageId;
  title: string;
  description: string;
  blocks: ContentBlock[];
};

export const CONTENT_PAGES: ContentPageData[] = [
  {
    id: "component-content",
    title: "Component Content",
    description: "Guidelines for writing labels, helper text, and in-component copy.",
    blocks: [
      {
        type: "paragraph",
        text: "Component content covers the words inside UI elements: button labels, field placeholders, validation messages, and empty states. Keep copy short, action-oriented, and consistent with the vocabulary list.",
      },
      { type: "heading", text: "Principles" },
      {
        type: "list",
        items: [
          "Use sentence case for labels and buttons.",
          "Lead with the verb for primary actions (Verify identity, Save changes).",
          "Match error messages to the field they describe.",
          "Avoid jargon unless the audience expects it (KYB, UBO).",
        ],
      },
    ],
  },
  {
    id: "writing-guidelines",
    title: "Writing Guidelines",
    description: "Voice, structure, and formatting rules for product UI copy.",
    blocks: [
      {
        type: "paragraph",
        text: "Trulioo product copy should be clear, confident, and calm. Prefer plain language over marketing tone in flows where users complete verification tasks.",
      },
      { type: "heading", text: "Formatting" },
      {
        type: "list",
        items: [
          "Sentence case for headings in product UI.",
          "No trailing periods on button labels or menu items.",
          "Use numerals for counts and steps (Step 2 of 4).",
          "Spell out acronyms on first use in standalone help text.",
        ],
      },
    ],
  },
  {
    id: "vocabulary",
    title: "Vocabulary",
    description: "Preferred terms and words to avoid across the product.",
    blocks: [
      { type: "heading", text: "Use" },
      {
        type: "list",
        items: ["Verify", "Business", "Owner", "Document", "Review", "Submit"],
      },
      { type: "heading", text: "Avoid" },
      {
        type: "list",
        items: ["Validate (prefer Verify)", "Client (prefer Business)", "Upload doc (prefer Upload document)"],
      },
    ],
  },
  {
    id: "voice-and-tone",
    title: "Voice and Tone",
    description: "How Trulioo should sound in different contexts.",
    blocks: [
      {
        type: "paragraph",
        text: "Voice stays consistent; tone adapts to context. Default voice is professional, direct, and supportive, especially in compliance-heavy flows.",
      },
      { type: "heading", text: "Tone by context" },
      {
        type: "list",
        items: [
          "Onboarding: welcoming, concise, reassuring.",
          "Errors: factual, specific, no blame.",
          "Success: brief confirmation, next step if relevant.",
          "Empty states: explain what belongs here and how to add it.",
        ],
      },
    ],
  },
];

export function findContentPage(id: ContentPageId): ContentPageData | undefined {
  return CONTENT_PAGES.find((page) => page.id === id);
}
