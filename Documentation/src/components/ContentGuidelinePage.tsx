import { ChapterHeader } from "./ChapterHeader";
import { findContentPage, type ContentBlock, type ContentPageId } from "../data/content-pages";

type ContentGuidelinePageProps = {
  pageId: ContentPageId;
  active: boolean;
};

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={index} className="tds-preview__content-text">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 key={index} className="tds-preview__content-heading">
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul key={index} className="tds-preview__content-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
  }
}

export function ContentGuidelinePage({ pageId, active }: ContentGuidelinePageProps) {
  const page = findContentPage(pageId);
  if (!page || !active) return null;

  return (
    <div className="tds-preview__panel is-active" role="tabpanel" id={pageId}>
      <ChapterHeader eyebrow="Content" title={page.title} desc={page.description} />

      <div className="tds-preview__content-page">
        <div className="tds-preview__section-card tds-preview__content-body">
          {page.blocks.map((block, index) => renderBlock(block, index))}
        </div>
      </div>
    </div>
  );
}
