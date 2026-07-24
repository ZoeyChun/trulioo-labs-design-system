import { ChapterHeader } from "./ChapterHeader";
import type { PreviewSection } from "../data/sections";

type ContentPanelProps = {
  section: PreviewSection;
  active: boolean;
};

export function ContentPanel({ section, active }: ContentPanelProps) {
  const html = section.html.replace(/\.\.\/\.\.\/assets\//g, "/assets/");

  return (
    <div
      className={`tds-preview__panel${active ? " is-active" : ""}`}
      role="tabpanel"
      id={section.id}
      aria-labelledby={`tab-${section.id}`}
      hidden={!active}
    >
      <ChapterHeader title={section.title} desc={section.desc} />
      <div
        className="tds-preview__demos"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
