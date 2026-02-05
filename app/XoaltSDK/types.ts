export type XoaltClickEvent = {
  url: string;
  prebidId: string;
};

export type XoaltViewProps = {
  width: number;
  height: number;
  prebidId: string;
  onFetched?: OnFetchedCallback;
};

export type OnFetchedCallback = (request: string, response: string | 'FAILED') => void;

export interface FetchBannerOptions {
  /** Ширина рекламногобаннера */
  width: number;
  /** Высота рекламного баннера */
  height: number;
  /** ID пребида */
  prebidId: string;
  /** Callback, который вызывается при получении рекламного баннера */
  onFetched?: OnFetchedCallback;
}

export type FetchBannerResponse = Promise<string | null>;
