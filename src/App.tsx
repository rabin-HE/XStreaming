import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons/index';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Provider} from 'react-redux';
import store from './store';

import HomeScreen from './pages/Home';
import CloudScreen from './pages/Cloud';
import LoginScreen from './pages/Login';
import StreamScreen from './pages/Stream';
import SettingsScreen from './pages/Settings';
import TitleDetailScreen from './pages/TitleDetail';
import DebugScreen from './pages/Debug';
import GameMapScreen from './pages/GameMap';
import GamepadDebugScreen from './pages/GamepadDebug';
import AboutScreen from './pages/About';

// Change theme: https://akveo.github.io/react-native-ui-kitten/docs/guides/branding#primary-color
import {default as theme} from '../theme.json';

import {useTranslation} from 'react-i18next';

import './i18n';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const TabIcon = (route: any, params: any) => {
  const {focused, color, size} = params;
  let iconName;
  if (route.name === 'Home') {
    iconName = focused ? 'game-controller' : 'game-controller-outline';
  } else if (route.name === 'Settings') {
    iconName = focused ? 'settings' : 'settings-outline';
  } else if (route.name === 'Cloud') {
    iconName = 'logo-xbox';
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};

function HomeTabs() {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>
          TabIcon(route, {focused, color, size}),
        tabBarActiveTintColor: '#107C10',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: t('Consoles'), title: t('Consoles')}}
      />
      <Tab.Screen
        name="Cloud"
        component={CloudScreen}
        options={{tabBarLabel: t('Xcloud'), title: t('Xcloud')}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{tabBarLabel: t('Settings'), title: t('Settings')}}
      />
    </Tab.Navigator>
  );
}

const darkTheme = {
  dark: true,
  colors: {
    primary: 'black',
    background: 'black',
    card: 'black',
    text: 'white',
    border: 'gray',
    notification: 'orange',
  },
};

function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
          <NavigationContainer theme={darkTheme}>
            <RootStack.Navigator>
              <RootStack.Group>
                <RootStack.Screen
                  name="Main"
                  component={HomeTabs}
                  options={{headerShown: false}}
                />
                <RootStack.Screen name="Login" component={LoginScreen} />
                <RootStack.Screen
                  name="Stream"
                  component={StreamScreen}
                  options={{headerShown: false}}
                />
                <RootStack.Screen name="Debug" component={DebugScreen} />
                <RootStack.Screen name="About" component={AboutScreen} />
                <RootStack.Screen name="GameMap" component={GameMapScreen} />
                <RootStack.Screen
                  name="GamepadDebug"
                  component={GamepadDebugScreen}
                />
              </RootStack.Group>

              <RootStack.Group screenOptions={{presentation: 'modal'}}>
                <RootStack.Screen
                  name="TitleDetail"
                  component={TitleDetailScreen}
                />
              </RootStack.Group>
            </RootStack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </Provider>
    </>
  );
}

export default App;
