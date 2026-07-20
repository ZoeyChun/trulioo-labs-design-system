type ChapterHeaderProps = {
  title: string;
  desc: string;
  eyebrow?: string;
};

export function ChapterHeader({
  title,
  desc,
  eyebrow = "Component family",
}: ChapterHeaderProps) {
  return (
    <header className="tds-preview__chapter-header">
      <p className="tds-preview__chapter-eyebrow">{eyebrow}</p>
      <h1 className="tds-preview__chapter-title">{title}</h1>
      <p className="tds-preview__chapter-desc">{desc}</p>
    </header>
  );
}
