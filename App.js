import React, { Component } from 'react';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import { Button } from 'native-base';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import { Top } from './screens/Top';
import { Qlist } from './screens/Qlist';
import { Apple } from './screens/Apple';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Top,
      navigationOptions: ({ navigation }) => ({
        title: '入室せよ',
        gesturesEnabled: false,
      }),
    },

    BigList: {
      screen: Qlist,
      navigationOptions: ({ navigation }) => ({
        title: '問題一覧',
        gesturesEnabled: false,
        headerLeft: null,
      }),
    },

    Details: {
      screen: Apple,
      // Optional: Override the `navigationOptions` for the screen
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        headerLeft: null,
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default class App extends Component {

  render() {
    return <RootStack />;
  }
}
