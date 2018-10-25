import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Top } from './screens/Top';
import { Qlist } from './screens/Qlist'
import { Apple } from './screens/Apple'

const RootStack = createStackNavigator(
  {
    Home: Top,
    BigList: Qlist,
    Details: Apple,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
