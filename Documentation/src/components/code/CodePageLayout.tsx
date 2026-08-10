import type { MouseEvent, ReactNode } from "react";
import { scrollToAnchor } from "../../utils/platform";

export function CodeSection({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <section className="tds-code-section" id={`code-${id}`}>
      <h3 className="tds-code-section__title">{title}</h3>
      {children}
    </section>
  );
}

export function SideContents({
  items,
  basePath,
}: {
  items: { id: string; label: string }[];
  basePath: string;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const anchor = `code-${id}`;
    const nextHash = `${basePath}#${anchor}`;

    if (window.location.hash !== nextHash) {
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}${nextHash}`);
    }

    const main = document.querySelector<HTMLElement>(".tds-preview__main");
    scrollToAnchor(main, anchor, "smooth");
  };

  return (
    <nav className="tds-code-contents" aria-label="Contents">
      <span className="tds-code-contents__title">Contents</span>
      {items.map((item) => (
        <a
          key={item.id}
          href={`${basePath}#code-${item.id}`}
          className="tds-code-contents__link"
          onClick={(event) => handleClick(event, item.id)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export function ComponentCodeLayout({
  basePath,
  navItems,
  children,
}: {
  basePath: string;
  navItems: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <div className="tds-preview__content-code">
      <div className="tds-code-layout">
        <div className="tds-code-layout__main">{children}</div>
        <SideContents items={navItems} basePath={basePath} />
      </div>
    </div>
  );
}

export type PropEntry = {
  name: string;
  description: string;
  type: string;
  required?: boolean;
  default?: string;
};

export function PropRow({ prop }: { prop: PropEntry }) {
  return (
    <div className="tds-prop-row">
      <div className="tds-prop-row__header">
        <code className="tds-prop-row__name">{prop.name}</code>
        {prop.required ? (
          <span className="tds-prop-row__badge tds-prop-row__badge--required">Required</span>
        ) : null}
        {prop.default ? (
          <span className="tds-prop-row__badge tds-prop-row__badge--default">Default</span>
        ) : null}
      </div>
      <div className="tds-prop-row__meta">
        <div className="tds-prop-row__field">
          <span className="tds-prop-row__label">Description</span>
          <span className="tds-prop-row__value">{prop.description}</span>
        </div>
        <div className="tds-prop-row__field">
          <span className="tds-prop-row__label">Values</span>
          <code className="tds-prop-row__type">{prop.type}</code>
        </div>
        {prop.default ? (
          <div className="tds-prop-row__field">
            <span className="tds-prop-row__label">Default</span>
            <code className="tds-prop-row__type">{prop.default}</code>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function PropsTable({
  title,
  description,
  props,
}: {
  title: string;
  description?: string;
  props: PropEntry[];
}) {
  return (
    <div className="tds-props-group">
      <h4 className="tds-props-group__title">{title}</h4>
      {description ? <p className="tds-props-group__desc">{description}</p> : null}
      <div className="tds-props-group__list">
        {props.map((prop) => (
          <PropRow key={prop.name} prop={prop} />
        ))}
      </div>
    </div>
  );
}
