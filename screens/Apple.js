import React, { Component } from 'react';
import {
  Container,
  Content,
  Card,
  Icon,
  Text,
  Button,
} from 'native-base';
import MathJax from 'react-native-mathjax';
import { Col, Grid } from 'react-native-easy-grid';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';

export class Apple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      backColor: 'white',
      answerNumber: 0,
      isInCo: true,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `問題${(navigation.state.params.questionId + 1).toString()}`,
    headerRight: (
        <HeaderButtons HeaderButtonComponent={passMeFurther => (
          <HeaderButton {...passMeFurther} iconSize={23} color="#000"/>
        )}>
          <Item title="問題一覧" onPress={() => {
            navigation.navigate('BigList');
          }}/>
        </HeaderButtons>
    ),
  });

  parse = (text) => {
    let result = text.replace(/\*/g, '\\times');
    result = result.replace(/\//g, '\\div');
    result = result.replace(/\+-/g, '\\pm');
    result = result.replace(/-\+/g, '\\mp');
    const ss = result.match(/#{.+?}/g);
    if (ss != null) {
      for (const s of ss) {
        const k = s.match(/[^#]+/g);
        result = result.replace(s, `\\sqrt{${k[0].slice(1, -1)}}`);
      }
    }
    const fs = result.match(/\[.+?]%\[.+?]/g);
    if (fs != null) {
      for (const f of fs) {
        console.log(f);
        const k = f.match(/[^%]+/g);
        result = result.replace(f, `\\frac{${k[0].slice(1, -1)}}{${k[1].slice(1, -1)}}`);
      }
    }
    result = result.replace(/@|#|\$|%|&/, '');
    console.log(result);
    return result;
  }

  ansify = (text) => {
    const result = text.replace(/[0-9a-w]+/g, '\\boxed{\\phantom{0}}');
    return result;
  }

  getSelection = (text) => {
    const answers = text.match(/[0-9a-w]+/g);
    const selections = [];
    for (const a of answers) {
      const selection = [a];
      for (let i = 0; i < 3; i++) {
        let ans = '';
        const c = 'abcdefghijklmnopqrstuvw';
        for (let i = 0; i < a.length; i++) {
          if (isNaN(parseInt(a[i]))) {
            // str const
            ans += c[Math.floor(Math.random() * c.length)];
          } else {
            // int const
            ans += Math.floor(Math.random() * 10);
          }
        }
        selection.push(ans);
      }
      selections.push(selection);
    }
    return selections;
  };

  getAnswer = (text) => {
    const answersDict = text.match(/[0-9a-w]+/g);
    return answersDict;
  }

  makeFontBigger = (text) => {
    const result = `\\Large{${text}}`;
    return result;
  }

  inCo = (answer, choice) => {
    if (this.state.isInCo === true && answer === choice) {
      this.setState({ backColor: 'green', isShow: true, answerNumber: this.state.answerNumber + 1 });
    } else if (this.state.isInCo === true && answer !== choice) {
      this.setState({
        backColor: 'red', isShow: true, isInCo: false, answerNumber: this.state.answerNumber + 1,
      });
    } else {
      this.setState({ answerNumber: this.state.answerNumber + 1 });
    }
  }

  render() {
    const questions = this.props.navigation.state.params.questions;
    const questionId = this.props.navigation.state.params.questionId;
    const question = questions[questionId];
    const item = (
      <MathJax
        html={`$${this.makeFontBigger(this.parse(question.text))}$`}
        mathJaxOptions={{
          messageStyle: 'none',
          extensions: ['tex2jax.js'],
          jax: ['input/TeX', 'output/HTML-CSS'],
          tex2jax: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
          },
          TeX: {
            extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'],
          },
        }}
      />
    );

    const dictOfAnswer = this.getAnswer(question.answer);
    const dictOfChoice = this.getSelection(question.answer);

    let dictOfAnswerForUse = dictOfAnswer;
    let dictOfChoiceForUse = dictOfChoice;

    if (this.state.answerNumber < (dictOfAnswer.length)) {
      dictOfAnswerForUse = dictOfAnswer[this.state.answerNumber];
      dictOfChoiceForUse = dictOfChoice[this.state.answerNumber];
    } else if (this.state.answerNumber === (dictOfAnswer.length)) {
      this.props.navigation.push('Details', { questions, questionId: questionId + 1 });
      dictOfAnswerForUse = '';
      dictOfChoiceForUse = '';
    }


    const answer = (
      <MathJax
        html={`$${this.makeFontBigger(this.parse(this.ansify(question.answer)))}$`}
        mathJaxOptions={{
          messageStyle: 'none',
          extensions: ['tex2jax.js'],
          jax: ['input/TeX', 'output/HTML-CSS'],
          tex2jax: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
          },
          TeX: {
            extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'],
          },
        }}
      />
    );

    return (
      <Container>
        <Content style={{ backgroundColor: this.state.backColor }}>
          <Text>問題</Text>
          <Card style={{ paddingLeft: 30, paddingTop: 30, paddingBottom: 30 }}>
            {item}
          </Card>
          <Text>解答</Text>
          <Card style={{ paddingLeft: 30, paddingTop: 30, paddingBottom: 30 }}>
            {answer}
          </Card>
          <Grid style={{ paddingTop: 100, height: 100 }}>
            <Col style={{ paddingLeft: 30 }}><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[0]); }}><Text>{dictOfChoiceForUse[0]}</Text></Button></Col>
            <Col ><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[1]); }}><Text>{dictOfChoiceForUse[1]}</Text></Button></Col>
            <Col ><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[2]); }}><Text>{dictOfChoiceForUse[2]}</Text></Button></Col>
            <Col ><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[3]); }}><Text>{dictOfChoiceForUse[3]}</Text></Button></Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}
