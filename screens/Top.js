import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import {
  Spinner, Container, Header, Content, Item, Input,
} from 'native-base';

export class Top extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      questions: [],
      isShow: false,
    };
  }

  change = (text) => {
    this.setState({ text }, () => {
      if (this.state.text.length >= 3) {
        this.setState({ isShow: true });
        const roomID = this.state.text;
        const apiUrl = 'https://smat-api.herokuapp.com';
        fetch(`${apiUrl}/rooms/${roomID}/questions`)
          .then(response => response.json())
          .then((json) => {
            this.setState({ questions: json }, () => {
              this.props.navigation.navigate('BigList', {
                questions: this.state.questions,
              });
            });
          });
      }
    });
  }

  render() {
    let preloader = <Item rounded><Input autoFocus placeholder='部屋番号を入力してください。'
                                         onChangeText={this.change}
                                         value={this.state.text}
                                         keyboardType="numeric"
    /></Item>;
    if (this.state.isShow) {
      preloader = <Spinner color='blue'/>;
    }
    return (
      <View style= {{
        justifyContent: 'center', alignItems: 'center', paddingTop: 80, paddingHorizontal: 60,
      }}>
        {preloader}
      </View>
    );
  }
}
