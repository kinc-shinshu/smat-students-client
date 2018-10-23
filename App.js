import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';


class forQuestions extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: []
    }
    const roomID =  this.props.navigation.state.params.roomId ;
    const apiUrl = "https://smat-api.herokuapp.com"
    fetch(apiUrl + "/rooms/" + roomID + "/questions")
      .then(response => response.json())
      .then(json => {
        this.setState({questions: json});
      })
  }
  render() {
    const items = this.state.questions.map((c, i) => {
      return (
        <ListItem key={i} questionId={c.id}>
        <Left>
        <Text>{c.text}</Text>
      </Left>
      <Right>
      <Icon name="arrow-forward" />
        </Right>
        </ListItem>
    );
    });
    return (
      <Container>
        <Content>
          <Text>問題のタイトル</Text>
          <List>
            {items}
          </List>
        </Content>
      </Container>
  );
  }
}


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
        <TextInput style={{height: 40, width: 80, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.change}
          value={this.state.text}
          keyboardType="numeric"
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: forQuestions,
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
