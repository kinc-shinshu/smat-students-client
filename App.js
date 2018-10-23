import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: ''
    };
  }

  change = (text) => {
    this.setState({text: text}, () => {
      if (this.state.text.length >= 3){
        this.props.navigation.navigate('Details', {
          roomId: this.state.text
        });
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.change}
          value={this.state.text}
          keyboardType="numeric"
        />
      </View>
    );
  }
}

class DetailsScreen extends Component {
  render() {
    const params = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>room: { params.roomId }</Text>
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
