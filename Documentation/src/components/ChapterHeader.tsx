type ChapterHeaderProps = {
  title: string;
  desc: string;
  eyebrow?: string;
  alternativeNames?: string[];
};

export function ChapterHeader({
  title,
  desc,
  eyebrow = "Component family",
  alternativeNames,
}: ChapterHeaderProps) {
  return (
    <header className="tds-preview__chapter-header">
      <p className="tds-preview__chapter-eyebrow">{eyebrow}</p>
      <h1 className="tds-preview__chapter-title">{title}</h1>
      {alternativeNames && alternativeNames.length > 0 ? (
        <p className="tds-preview__chapter-alt-names">
          <span className="tds-preview__chapter-alt-names-label">Common alternative names</span>
          <span className="tds-preview__chapter-alt-names-values">
            {alternativeNames.join(", ")}
          </span>
        </p>
      ) : null}
      {desc.includes("<") ? (
        <p
          className="tds-preview__chapter-desc"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      ) : (
        <p className="tds-preview__chapter-desc">{desc}</p>
      )}
    </header>
  );
}
