import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Left, Right, Icon} from 'native-base';

export class Apple extends Component {
  render() {
    const questions = this.props.navigation.state.params.questions;
    const question = [questions[this.props.navigation.state.params.questionId]];
    const nextQuestion = [questions[this.props.navigation.state.params.questionId + 1]];
    const items = question.map((c, i) => {
      return (
        <ListItem key={i} questionId={c.id} onPress={() => {this.props.navigation.navigate('BigList');}} >
          <Left>
            <Text>{c.id}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
    });
    const items1 = nextQuestion.map((c, i) => {
      return (
        <ListItem key={i} questionId={c.id} onPress={() => {this.props.navigation.navigate('BigList');}} >
          <Left>
            <Text>{c.id}</Text>
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
          <List>
            {items}
            {items1}
          </List>
        </Content>
      </Container>
    );
  }
}