import { useState, useEffect } from 'react';
import { fetchBanner } from '../api';
import { FetchBannerOptions } from '../types';

export const useFetchBanner = (options: FetchBannerOptions) => {
  const [html, setHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    fetchBanner(
      {
        width: options.width,
        height: options.height,
        prebidId: options.prebidId,
        onFetched: options.onFetched,
      },
      controller.signal,
    )
      .then(_html => {
        setHtml(_html);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [options.width, options.height, options.prebidId]);

  return { html, isLoading };
};
