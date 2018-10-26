import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Left, Right, Icon} from 'native-base';

export class Qlist extends Component {
  static navigationOptions = {
    title: '問題一覧',
  };

  render() {
    const questions = this.props.navigation.state.params.questions;
    const items = questions.map((c, i) => {
      return (
        <ListItem key={i} questionId={c.id} onPress={() => {this.props.navigation.navigate('Details', {questions: questions, questionId:i})}}>
          <Left>
            <Text>問題{i + 1}</Text>
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
          </List>
        </Content>
      </Container>
    );
  }
}