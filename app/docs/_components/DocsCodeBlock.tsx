'use client';

import { useState } from 'react';

interface DocsCodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

export function DocsCodeBlock({ children, language }: DocsCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(typeof children === 'string' ? children : '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="relative my-6 rounded-lg border bg-muted text-sm">
      {language && (
        <div className="absolute left-3 top-2 text-xs text-muted-foreground">{language}</div>
      )}

      <button
        onClick={copyCode}
        className="absolute right-3 top-2 text-xs text-muted-foreground hover:text-foreground"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>

      <pre className="overflow-x-auto p-4 pt-8">
        <code>{children}</code>
      </pre>
    </div>
  );
}
