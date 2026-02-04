import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen.tsx';
import { FirstScreen } from '../screens/FirstScreen.tsx';
import { SecondScreen } from '../screens/SecondScreen.tsx';
import { DebugScreen } from '../screens/DebugScreen.tsx';

export type RootStackParamList = {
  Home: undefined;
  First: undefined;
  Second: undefined;
  Debug: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name='Home'
      component={HomeScreen}
    />
    <Tab.Screen
      name='First'
      component={FirstScreen}
    />
    <Tab.Screen
      name='Second'
      component={SecondScreen}
    />
    <Tab.Screen
      name='Debug'
      component={DebugScreen}
    />
  </Tab.Navigator>
);

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='First'
        component={FirstScreen}
      />
      <Stack.Screen
        name='Second'
        component={SecondScreen}
      />
      <Stack.Screen
        name='Debug'
        component={DebugScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
