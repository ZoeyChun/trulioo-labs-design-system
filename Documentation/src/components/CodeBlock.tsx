import { useCallback, useState } from "react";

type CodeBlockProps = {
  code: string;
};

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <div className="tds-code-block">
      <div className="tds-code-block__toolbar">
        <button
          type="button"
          className="tds-code-block__copy"
          onClick={() => void handleCopy()}
          aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="tds-code-block__pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
