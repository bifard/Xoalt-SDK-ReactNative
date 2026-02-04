import { ViewProps } from 'react-native';

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
