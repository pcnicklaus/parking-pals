import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import NeedPalScreen from './screens/NeedPalScreen';
import MapScreen from './screens/MapScreen';

class App extends React.Component {


  render() {
    const MainNavigator = TabNavigator({
      needPal: { screen: NeedPalScreen },
      map: { screen: MapScreen },
    }, {
      navigationOptions: {
        tabBar: { visible: false }
      },
      lazyLoad: true
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
