import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
          />
      </View>
    );
  }
}

class DetailsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
        title='push Home'
        onPress={() => this.props.navigation.push('Home')}
        />
      </View>
      )
  }
}

const RootStack = createStackNavigator(
{
  Home: HomeScreen,
  Details: DetailsScreen,
},
{
  initialRouteName: 'Home',
}
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
