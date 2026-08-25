import { useEffect, useState, useCallback } from "react";

/**
 * Fetch-with-fallback: calls `fetcher`, and if it fails (backend endpoint
 * not ready / network error), falls back to `fallbackData` and surfaces a
 * soft, dismissible notice instead of a hard error screen.
 *
 * Usage: const { data, loading, error, reload } = useApi(() => propertyApi.list(), demoProperties, { deps: [] })
 */
export function useApi(fetcher, fallbackData, { deps = [], transform, fallbackNotice } = {}) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    fetcher()
      .then((res) => {
        const value = transform ? transform(res) : res;
        setData(value ?? fallbackData);
        setUsingFallback(false);
      })
      .catch(() => {
        setData(fallbackData);
        setUsingFallback(true);
        setError(fallbackNotice || "Live data isn't available right now, so we're showing example data instead.");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, usingFallback, reload: load, setData };
}
