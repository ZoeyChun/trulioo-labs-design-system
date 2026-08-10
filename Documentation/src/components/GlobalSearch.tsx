import {
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  describeSearchMatch,
  groupSearchResults,
  searchPreview,
  type SearchResult,
} from "../hooks/usePreviewSearch";
import { searchShortcutLabel } from "../utils/platform";

type GlobalSearchProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  /** When true, renders inline hero variant instead of modal. */
  variant?: "modal" | "hero";
  onOpen?: () => void;
};

type ResultRow =
  | { type: "header"; key: string; section: string }
  | { type: "option"; key: string; result: SearchResult; index: number };

function buildResultRows(results: SearchResult[]): ResultRow[] {
  const rows: ResultRow[] = [];
  let index = 0;

  for (const group of groupSearchResults(results)) {
    rows.push({ type: "header", key: `header-${group.section}`, section: group.section });
    for (const result of group.items) {
      rows.push({
        type: "option",
        key: result.item.id,
        result,
        index: index++,
      });
    }
  }

  return rows;
}

function scrollOptionIntoView(list: HTMLElement, option: HTMLElement) {
  const optionTop = option.offsetTop;
  const optionBottom = optionTop + option.offsetHeight;
  const viewTop = list.scrollTop;
  const viewBottom = viewTop + list.clientHeight;

  if (optionTop < viewTop) {
    list.scrollTop = optionTop;
  } else if (optionBottom > viewBottom) {
    list.scrollTop = optionBottom - list.clientHeight;
  }
}

export function GlobalSearch({
  open,
  onClose,
  onNavigate,
  variant = "modal",
}: GlobalSearchProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const keyboardNavRef = useRef(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(
    () => searchPreview(deferredQuery, 14),
    [deferredQuery]
  );

  const flatResults = useMemo(() => results.map((r) => r.item), [results]);
  const flatResultsRef = useRef(flatResults);
  flatResultsRef.current = flatResults;

  const resultRows = useMemo(() => buildResultRows(results), [results]);
  const dropdownOpen = variant === "hero" ? query.length > 0 : open;

  const setHighlightIndex = useCallback((index: number) => {
    const maxIndex = Math.max(0, flatResultsRef.current.length - 1);
    const next = flatResultsRef.current.length === 0 ? 0 : Math.max(0, Math.min(index, maxIndex));
    activeIndexRef.current = next;
    setActiveIndex(next);
  }, []);

  const moveHighlight = useCallback(
    (delta: number) => {
      const count = flatResultsRef.current.length;
      if (count === 0) return;
      keyboardNavRef.current = true;
      setHighlightIndex(activeIndexRef.current + delta);
    },
    [setHighlightIndex]
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      activeIndexRef.current = 0;
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useLayoutEffect(() => {
    const count = flatResults.length;
    if (count === 0) {
      if (activeIndexRef.current !== 0) {
        activeIndexRef.current = 0;
        setActiveIndex(0);
      }
      return;
    }
    if (activeIndexRef.current > count - 1) {
      const clamped = count - 1;
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
    }
  }, [flatResults]);

  useLayoutEffect(() => {
    if (!dropdownOpen || !listRef.current || flatResults.length === 0) return;
    const option = listRef.current.querySelector<HTMLElement>(
      `[data-result-index="${activeIndexRef.current}"]`
    );
    if (option) scrollOptionIntoView(listRef.current, option);
  }, [activeIndex, dropdownOpen, flatResults]);

  const resultMeta = (result: SearchResult) => {
    const alias = describeSearchMatch(result, query);
    return alias ? `${result.item.category} · ${alias}` : result.item.category;
  };

  const selectResult = useCallback(
    (index: number) => {
      const item = flatResultsRef.current[index];
      if (!item) return;
      onNavigate(item.path);
      onClose();
      setQuery("");
      activeIndexRef.current = 0;
      setActiveIndex(0);
    },
    [onNavigate, onClose]
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    activeIndexRef.current = 0;
    setActiveIndex(0);
    keyboardNavRef.current = false;
  };

  const handleListPointerMove = () => {
    keyboardNavRef.current = false;
  };

  const handleOptionMouseEnter = (index: number) => {
    if (keyboardNavRef.current) return;
    setHighlightIndex(index);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      if (!dropdownOpen || flatResultsRef.current.length === 0) return;
      e.preventDefault();
      e.stopPropagation();
      moveHighlight(1);
      return;
    }

    if (e.key === "ArrowUp") {
      if (!dropdownOpen || flatResultsRef.current.length === 0) return;
      e.preventDefault();
      e.stopPropagation();
      moveHighlight(-1);
      return;
    }

    if (e.key === "Enter") {
      if (flatResultsRef.current.length === 0) return;
      e.preventDefault();
      selectResult(activeIndexRef.current);
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  useEffect(() => {
    if (variant !== "hero") return;
    const onPointerDown = (event: MouseEvent) => {
      const root = inputRef.current?.closest(".tds-preview__hero-search");
      if (root && !root.contains(event.target as Node)) {
        setQuery("");
        activeIndexRef.current = 0;
        setActiveIndex(0);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [variant]);

  const renderResults = (optionIdPrefix: string, showDescription = false) => {
    if (flatResults.length === 0) {
      return (
        <p className="tds-preview__search-empty">No results for &ldquo;{query}&rdquo;</p>
      );
    }

    return resultRows.map((row) => {
      if (row.type === "header") {
        return (
          <p key={row.key} className="tds-preview__search-group-label">
            {row.section}
          </p>
        );
      }

      const { item } = row.result;
      const idx = row.index;
      const isActive = idx === activeIndex;

      return (
        <button
          key={row.key}
          id={`${optionIdPrefix}-${idx}`}
          type="button"
          role="option"
          data-result-index={idx}
          aria-selected={isActive}
          className={`tds-preview__search-result${isActive ? " is-active" : ""}`}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => selectResult(idx)}
          onMouseEnter={() => handleOptionMouseEnter(idx)}
        >
          <span className="tds-preview__search-result-title">{item.title}</span>
          {showDescription ? (
            <span className="tds-preview__search-result-desc">{item.description}</span>
          ) : null}
          <span className="tds-preview__search-result-meta">{resultMeta(row.result)}</span>
        </button>
      );
    });
  };

  if (variant === "hero") {
    return (
      <div className={`tds-preview__hero-search${query.length > 0 ? " is-open" : ""}`}>
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
            type="text"
            className="tds-preview__hero-search-input"
            placeholder="Search components, tokens, guides…"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            role="combobox"
            aria-expanded={dropdownOpen}
            aria-controls={`${inputId}-listbox`}
            aria-autocomplete="list"
            aria-activedescendant={
              dropdownOpen && flatResults[activeIndex]
                ? `${inputId}-option-${activeIndex}`
                : undefined
            }
          />
          <kbd className="tds-preview__search-kbd" aria-hidden="true">
            {searchShortcutLabel()}
          </kbd>
        </div>

        {query.length > 0 && (
          <div
            ref={listRef}
            id={`${inputId}-listbox`}
            className="tds-preview__hero-search-results"
            role="listbox"
            onMouseMove={handleListPointerMove}
            onPointerMove={handleListPointerMove}
          >
            {renderResults(`${inputId}-option`)}
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
            type="text"
            className="tds-preview__search-modal-input"
            placeholder="Search components, tokens, guides…"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            role="combobox"
            aria-expanded={dropdownOpen}
            aria-controls={`${inputId}-modal-listbox`}
            aria-autocomplete="list"
            aria-activedescendant={
              dropdownOpen && flatResults[activeIndex]
                ? `${inputId}-modal-option-${activeIndex}`
                : undefined
            }
          />
          <kbd className="tds-preview__search-kbd">Esc</kbd>
        </div>

        <div
          ref={listRef}
          id={`${inputId}-modal-listbox`}
          className="tds-preview__search-modal-results"
          role="listbox"
          onMouseMove={handleListPointerMove}
          onPointerMove={handleListPointerMove}
        >
          {query.length === 0 ? (
            <p className="tds-preview__search-hint">
              Try &ldquo;toggle&rdquo;, &ldquo;modal&rdquo;, &ldquo;dropdown&rdquo;, or &ldquo;table&rdquo;
            </p>
          ) : (
            renderResults(`${inputId}-modal-option`, true)
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
