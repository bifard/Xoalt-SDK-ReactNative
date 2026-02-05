import DeviceInfo from 'react-native-device-info';
import uuid from 'react-native-uuid';
import { FetchBannerResponse, FetchBannerOptions } from './types';
import { XoaltService } from './XoaltService';

export const fetchBanner = async (
  { width, height, prebidId, onFetched }: FetchBannerOptions,
  signal?: AbortSignal | undefined,
): FetchBannerResponse => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const id = uuid.v4();

  const raw = {
    id,
    imp: [
      {
        id: uuid.v4(),
        instl: 0,
        clickbrowser: 1,
        secure: 1,
        banner: { format: [{ w: width, h: height }] },
        ext: { prebid: { storedrequest: { id: prebidId } } },
      },
    ],
    app: {
      name: DeviceInfo.getApplicationName(),
      bundle: DeviceInfo.getBundleId(),
      ver: `${DeviceInfo.getVersion()}:${DeviceInfo.getBuildNumber()}`,
      publisher: { id: XoaltService.getPublisherId() },
      ext: {
        data: { page: ['home'] },
        prebid: { source: 'prebid-mobile', version: '' },
      },
    },
    device: {
      ua: 'XoaltSDK/1.0 (ReactNative)',
      os: DeviceInfo.getSystemName(),
      ifa: DeviceInfo.getUniqueIdSync(),
    },
    regs: { ext: { gdpr: 0 } },
    user: {},
    source: { tid: id },
    ext: {
      prebid: {
        storedrequest: { id: XoaltService.getPublisherId() },
        cache: { bids: {} },
        targeting: {},
      },
    },
  };

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(raw),
    signal,
  };

  try {
    const response = await fetch('https://hb.xoalt.com/x-simb/', requestOptions);
    const result = await response.json();

    if (onFetched) {
      onFetched(JSON.stringify(requestOptions, null, 2), JSON.stringify(result, null, 2));
    }

    const seatBid = result.seatbid[0];

    if (!seatBid) {
      return null;
    }

    const bid = seatBid.bid[0];

    if (!bid) {
      return null;
    }

    return bid.adm;
  } catch (err) {
    if (onFetched) {
      onFetched(JSON.stringify(requestOptions, null, 2), 'FAILED');
    }

    return null;
  }
};
