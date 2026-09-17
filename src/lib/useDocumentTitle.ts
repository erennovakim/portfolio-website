import { useEffect } from 'react';

const DEFAULT_TITLE = 'Eren Nova Kim — Product Designer';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Eren Nova Kim` : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}
