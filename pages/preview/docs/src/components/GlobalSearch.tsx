import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  groupSearchResults,
  searchPreview,
  type SearchResult,
} from "../hooks/usePreviewSearch";

type GlobalSearchProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  /** When true, renders inline hero variant instead of modal. */
  variant?: "modal" | "hero";
  onOpen?: () => void;
};

export function GlobalSearch({
  open,
  onClose,
  onNavigate,
  variant = "modal",
  onOpen,
}: GlobalSearchProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setResults(searchPreview(query, 14));
    setActiveIndex(0);
  }, [query]);

  const flatResults = results.map((r) => r.item);
  const grouped = groupSearchResults(results);

  const selectResult = useCallback(
    (index: number) => {
      const item = flatResults[index];
      if (!item) return;
      onNavigate(item.path);
      onClose();
      setQuery("");
    },
    [flatResults, onNavigate, onClose]
  );

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectResult(activeIndex);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current || flatResults.length === 0) return;
    const active = listRef.current.querySelector(".is-active");
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, flatResults.length]);

  if (variant === "hero") {
    return (
      <div className="tds-preview__hero-search">
        <label htmlFor={inputId} className="tds-preview__hero-search-label">
          Search components, tokens, and guides
        </label>
        <div className="tds-preview__hero-search-box">
          <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            className="tds-preview__hero-search-input"
            placeholder="Search components, tokens, guides…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => onOpen?.()}
            onKeyDown={onKeyDown}
            autoComplete="off"
            role="combobox"
            aria-expanded={query.length > 0}
            aria-controls={`${inputId}-listbox`}
            aria-autocomplete="list"
          />
          <kbd className="tds-preview__search-kbd" aria-hidden="true">
            ⌘K
          </kbd>
        </div>

        {query.length > 0 && (
          <div
            ref={listRef}
            id={`${inputId}-listbox`}
            className="tds-preview__hero-search-results"
            role="listbox"
          >
            {flatResults.length === 0 ? (
              <p className="tds-preview__search-empty">No results for &ldquo;{query}&rdquo;</p>
            ) : (
              grouped.map((group) => (
                <div key={group.section} className="tds-preview__search-group">
                  <p className="tds-preview__search-group-label">{group.section}</p>
                  {group.items.map(({ item }) => {
                    const idx = flatResults.indexOf(item);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="option"
                        aria-selected={idx === activeIndex}
                        className={`tds-preview__search-result${idx === activeIndex ? " is-active" : ""}`}
                        onClick={() => selectResult(idx)}
                        onMouseEnter={() => setActiveIndex(idx)}
                      >
                        <span className="tds-preview__search-result-title">{item.title}</span>
                        <span className="tds-preview__search-result-meta">{item.category}</span>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  if (!open) return null;

  return (
    <div className="tds-preview__search-overlay" role="presentation" onClick={onClose}>
      <div
        className="tds-preview__search-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tds-preview__search-modal-input-wrap">
          <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            className="tds-preview__search-modal-input"
            placeholder="Search components, tokens, guides…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            role="combobox"
            aria-expanded
            aria-controls={`${inputId}-modal-listbox`}
          />
          <kbd className="tds-preview__search-kbd">Esc</kbd>
        </div>

        <div
          ref={listRef}
          id={`${inputId}-modal-listbox`}
          className="tds-preview__search-modal-results"
          role="listbox"
        >
          {query.length === 0 ? (
            <p className="tds-preview__search-hint">
              Try &ldquo;button&rdquo;, &ldquo;dialog&rdquo;, or &ldquo;token&rdquo;
            </p>
          ) : flatResults.length === 0 ? (
            <p className="tds-preview__search-empty">No results for &ldquo;{query}&rdquo;</p>
          ) : (
            grouped.map((group) => (
              <div key={group.section} className="tds-preview__search-group">
                <p className="tds-preview__search-group-label">{group.section}</p>
                {group.items.map(({ item }) => {
                  const idx = flatResults.indexOf(item);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={idx === activeIndex}
                      className={`tds-preview__search-result${idx === activeIndex ? " is-active" : ""}`}
                      onClick={() => selectResult(idx)}
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      <span className="tds-preview__search-result-title">{item.title}</span>
                      <span className="tds-preview__search-result-desc">{item.description}</span>
                      <span className="tds-preview__search-result-meta">{item.category}</span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/** Hook for Cmd+K / Ctrl+K global shortcut. */
export function useGlobalSearchShortcut(onOpen: () => void) {
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpen]);
}
