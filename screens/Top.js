import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { View, TextInput, Text } from 'react-native';

export class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      questions: [],
      isShow: false
    };
  }

  change = (text) => {
    this.setState({text: text}, () => {
      if (this.state.text.length >= 3){
        this.setState({isShow: true});
        const roomID =  this.state.text;
        const apiUrl = "https://smat-api.herokuapp.com"
        fetch(apiUrl + "/rooms/" + roomID + "/questions")
          .then(response => response.json())
          .then(json => {
            this.setState({questions: json}, () => {
              this.props.navigation.navigate('BigList', {
                questions: this.state.questions
              });
            })
          })
      }
    });
  }

  render() {
    let preloader = <TextInput style={{height: 40, width: 80, borderColor: 'gray', borderWidth: 1}}
                               onChangeText={this.change}
                               value={this.state.text}
                               keyboardType="numeric"
    />;
    if (this.state.isShow){
      preloader = <Text>読み込み中...</Text>
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {preloader}
      </View>
    );
  }
}