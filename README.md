# Xoalt SDK

## Install

### Install dependencies

```shell
  yarn i --save react-native-device-info react-native-webview react-native-uuid
```

### Install Xoalt SDK

Copy app/XoaltSDK directory to your project

## Setup

Integrate the following code into `App.ts`

```ts
useEffect(() => {
  const xoaltListener = (event: XoaltClickEvent) => {
    // Handle events here
  };

  XoaltService.init(PREBID_PUBLISHER_ID, DISCOVERY_DOMAIN, xoaltListener);

  return () => {
    XoaltService.destroy();
  };
}, []);
```

## Using

```tsx
<XoaltView
  width={300}
  height={250}
  prebidId={PREBID_ID}
/>
```
