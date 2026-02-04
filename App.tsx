import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './app/navigation/RootNavigator.tsx';
import { navigate, navigationRef } from './app/navigation/NavigationService.ts';
import { XoaltClickEvent, XoaltService } from './app/XoaltSDK';

function App() {
  useEffect(() => {
    const xoaltListener = (event: XoaltClickEvent) => {
      switch (event.prebidId) {
        case '33958': {
          navigate('Second');
          break;
        }
        case '33962': {
          navigate('Home');
          break;
        }
      }
    };

    XoaltService.init('0689a263-318d-448b-a3d4-b02e8a709d9d', 'https://h.xoalt.com', xoaltListener);

    return () => {
      XoaltService.destroy();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
