import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import uuid from 'react-native-uuid';
import WebView from 'react-native-webview';
import { XoaltService } from './XoaltService.ts';
import { OnFetchedCallback, XoaltViewProps } from './types.ts';

const fetchBanner = async (
  width: number,
  height: number,
  prebidId: string,
  onFetched?: OnFetchedCallback,
) => {
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

export function XoaltView(props: XoaltViewProps) {
  const window = Dimensions.get('window');

  const [html, setHtml] = React.useState(null);
  const [layoutWidth, setLayoutWidth] = React.useState<number>(0);

  const injected = React.useMemo(
    () => `
    (function() {
      var meta = document.querySelector('meta[name="viewport"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'viewport';
        document.head.appendChild(meta);
      }
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';

      document.documentElement.style.height = '100%';
      document.body.style.margin = '0';
      document.body.style.height = '100%';
      document.body.style.position = 'relative';
      document.body.style.overflow = 'hidden';

      var NATIVE_W = ${props.width};
      var NATIVE_H = ${props.height};

      var fit = document.getElementById('__xoalt_fit');
      if (!fit) {
        fit = document.createElement('div');
        fit.id = '__xoalt_fit';
        fit.style.width = NATIVE_W + 'px';
        fit.style.height = NATIVE_H + 'px';
        fit.style.position = 'absolute';
        fit.style.left = '50%';
        fit.style.top = '50%';
        fit.style.transformOrigin = 'left center';
        document.body.appendChild(fit);

        var nodes = Array.from(document.body.childNodes).filter(function(n){ return n !== fit; });
        nodes.forEach(function(n){ fit.appendChild(n); });
      }

      function applyScale() {
        var vw = document.documentElement.clientWidth || window.innerWidth;
        var vh = document.documentElement.clientHeight || window.innerHeight;
        var s = Math.min(vw / NATIVE_W, vh / NATIVE_H);

        fit.style.transform = 'translate(-50%, -50%) scale(' + s + ')';
      }

      window.addEventListener('resize', applyScale);
      applyScale();
      setTimeout(applyScale, 100);
      setTimeout(applyScale, 300);
      setTimeout(applyScale, 800);
    })();
    true;
  `,
    [props.width, props.height],
  );

  useEffect(() => {
    fetchBanner(props.width, props.height, props.prebidId, props.onFetched).then(_html => {
      setHtml(_html);
    });
  }, [props.width, props.height, props.prebidId]);

  const handleNavigation = (request: any) => {
    const url = request.url;
    if (url.startsWith(XoaltService.getDiscoveryDomain())) {
      XoaltService.onClickBanner({ url, prebidId: props.prebidId });

      return false;
    }

    return true;
  };

  const handleOpenWindow = (event: any) => {
    const url = event.nativeEvent.targetUrl as string;
    if (url.startsWith(XoaltService.getDiscoveryDomain())) {
      XoaltService.onClickBanner({ url, prebidId: props.prebidId });

      return false;
    }
  };

  if (!html) {
    return null;
  }

  const scale =
    (0.9 *
      Math.round(
        (10 * Math.min(...[layoutWidth, window.width, window.height])) /
          Math.max(props.width, props.height),
      )) /
    10;
  console.log(layoutWidth, window.width, window.height, scale);

  return (
    <View
      style={styles.container}
      onLayout={event => {
        const { width: w } = event.nativeEvent.layout;
        setLayoutWidth(w);
      }}
    >
      <WebView
        style={{
          ...styles.webView,
          width: props.width * scale,
          height: props.height * scale,
        }}
        originWhitelist={['*']}
        source={{ html, baseUrl: '' }}
        userAgent={'XoaltSDK/1.0 (ReactNative)'}
        onShouldStartLoadWithRequest={handleNavigation}
        onOpenWindow={handleOpenWindow}
        automaticallyAdjustContentInsets={false}
        injectedJavaScript={injected}
        scalesPageToFit={false}
        javaScriptEnabled
        contentMode='mobile'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  webView: { flex: 1 },
});
