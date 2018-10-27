import React, { Component } from 'react';
import {
  Container,
  Content,
  Card,
  Icon,
  Text,
  Button,
  Grid,
  Col
} from 'native-base';
import MathJax from 'react-native-mathjax';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';

export class Apple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      backColor: 'white',
      inputNumber: 0,
      answerNumber: -1,
      isInCo: true,
      qId: this.props.navigation.state.params.qId,
      j: this.props.navigation.state.params.j,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `問題${(navigation.state.params.questionId + 1).toString()}`,
    headerRight: (
        <HeaderButtons HeaderButtonComponent={passMeFurther => (
          <HeaderButton {...passMeFurther} iconSize={23} color="#000"/>
        )}>
          <Item title="問題一覧" onPress={() => {
            navigation.navigate('BigList', {
              qId: navigation.state.params.qId,
              j: navigation.state.params.j,
            });
          }}/>
        </HeaderButtons>
    ),
  });

  parse = (text) => {
    let result = text.replace(/\*/g, '\\times');
    result = result.replace(/\//g, '\\div');
    result = result.replace(/\+-/g, '\\pm');
    result = result.replace(/-\+/g, '\\mp');

    // parse sqrt
    const ss = result.match(/#{.+?}/g);
    if (ss != null) {
      ss.forEach((elem) => {
        result = result.replace(elem, `\\sqrt{${elem.match(/[^#]+/g)[0].slice(1, -1)}}`);
      });
    }

    // parse frac
    const fs = result.match(/\[.+?]%\[.+?]/g);
    if (fs != null) {
      fs.forEach((elem) => {
        const k = elem.match(/[^%]+/g);
        result = result.replace(elem, `\\frac{${k[0].slice(1, -1)}}{${k[1].slice(1, -1)}}`);
      });
    }
    result = result.replace(/@|#|\$|%|&/, '');
    return result;
  }

  ansify = (text) => {
    const result = text.replace(/[0-9a-w]+/g, '\\boxed{\\phantom{0}}');
    return result;
  }

  getSelection = (text) => {
    const answers = text.match(/[0-9a-w]+/g);
    const selections = [];
    answers.forEach((a) => {
      const selection = [a];
      for (let i = 0; i < 3; i++) {
        let ans = '';
        const c = 'abcdefghijklmnopqrstuvw';
        for (let j = 0; j < a.length; j++) {
          if (Number.isNaN(parseFloat(a[j]))) {
            // str const
            ans += c[Math.floor(Math.random() * c.length)];
          } else {
            // int const
            ans += Math.floor(Math.random() * 10);
          }
        }
        selection.sort();
        selection.push(ans);
      }
      selections.push(selection);
    });
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

  inCo = (answer, choice, ansNum) => {
    this.setState({ answerNumber: ansNum });
    if (this.state.isInCo === true && answer === choice && this.state.answerNumber !== this.state.inputNumber) {
      this.setState({ backColor: 'green', isShow: true, inputNumber: this.state.inputNumber + 1 });
    } else if (this.state.isInCo === true && answer === choice && this.state.answerNumber === this.state.inputNumber) {
      if (typeof (this.state.qId) === 'undefined' || typeof (this.state.j) === 'undefined') {
        const nowqId = [];
        const nowj = [];
        const newqId = nowqId.concat(this.props.navigation.state.params.questionId);
        const newj = nowj.concat(1);
        this.setState({
          backColor: 'green', isShow: true, inputNumber: this.state.inputNumber + 1, qId: newqId, j: newj,
        });
      } else {
        const nowqId = this.state.qId;
        const nowj = this.state.j;
        const newqId = nowqId.concat(this.props.navigation.state.params.questionId);
        const newj = nowj.concat(1);
        this.setState({
          backColor: 'green', isShow: true, inputNumber: this.state.inputNumber + 1, qId: newqId, j: newj,
        });
      }
    } else if (this.state.isInCo === true && answer !== choice) {
      if (typeof (this.state.qId) === 'undefined' || typeof (this.state.j) === 'undefined') {
        const nowqId = [];
        const nowj = [];
        const newqId = nowqId.concat(this.props.navigation.state.params.questionId);
        const newj = nowj.concat(0);
        this.setState({
          backColor: 'red', isShow: true, isInCo: false, inputNumber: this.state.inputNumber + 1, qId: newqId, j: newj,
        });
      } else {
        const nowqId = this.state.qId;
        const nowj = this.state.j;
        const newqId = nowqId.concat(this.props.navigation.state.params.questionId);
        const newj = nowj.concat(0);
        this.setState({
          backColor: 'red', isShow: true, isInCo: false, inputNumber: this.state.inputNumber + 1, qId: newqId, j: newj,
        });
      }
    } else {
      this.setState({ inputNumber: this.state.inputNumber + 1 });
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

    let finishButton = (
      <Text></Text>
    );

    let buttonForBug = (
      <Text></Text>
    );

    let dictOfAnswerForUse = dictOfAnswer;
    let dictOfChoiceForUse = dictOfChoice;
    const ansNum = dictOfAnswer.length;

    if (this.state.inputNumber < (dictOfAnswer.length)) {
      dictOfAnswerForUse = dictOfAnswer[this.state.inputNumber];
      dictOfChoiceForUse = dictOfChoice[this.state.inputNumber];
      buttonForBug = (
        <Grid style={{ paddingTop: 100, height: 100 }}>
          <Col style={{ paddingLeft: 30 }}><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[0], ansNum); }} ><Text>{dictOfChoiceForUse[0]}</Text></Button></Col>
          <Col ><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[1], ansNum); }}><Text>{dictOfChoiceForUse[1]}</Text></Button></Col>
          <Col ><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[2], ansNum); }}><Text>{dictOfChoiceForUse[2]}</Text></Button></Col>
          <Col ><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[3], ansNum); }}><Text>{dictOfChoiceForUse[3]}</Text></Button></Col>
        </Grid>
      )
    } else if (this.state.inputNumber === dictOfAnswer.length && this.state.qId.length === questions.length) {
      dictOfAnswerForUse = '';
      dictOfChoiceForUse = '';
      finishButton = (
        <Button full info style={{ height: 100 }}>
        <Text>結果提出</Text>
        </Button>
      );
      buttonForBug = (
        <Grid style={{ paddingTop: 100, height: 100 }}>
          <Col style={{ paddingLeft: 30 }}><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[0], ansNum); }} ><Text>{dictOfChoiceForUse[0]}</Text></Button></Col>
          <Col ><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[1], ansNum); }}><Text>{dictOfChoiceForUse[1]}</Text></Button></Col>
          <Col ><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[2], ansNum); }}><Text>{dictOfChoiceForUse[2]}</Text></Button></Col>
          <Col ><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[3], ansNum); }}><Text>{dictOfChoiceForUse[3]}</Text></Button></Col>
        </Grid>
      )
    } else if (this.state.inputNumber === dictOfAnswer.length && this.state.qId.length !== questions.length && questionId < questions.length - 1) {
      this.props.navigation.push('Details', {
        questions, questionId: questionId + 1, qId: this.state.qId, j: this.state.j,
      });
      buttonForBug = (
        <Grid style={{ paddingTop: 100, height: 100 }}>
          <Col style={{ paddingLeft: 30 }}><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[0], ansNum); }} ><Text>{dictOfChoiceForUse[0]}</Text></Button></Col>
          <Col ><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[1], ansNum); }}><Text>{dictOfChoiceForUse[1]}</Text></Button></Col>
          <Col ><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[2], ansNum); }}><Text>{dictOfChoiceForUse[2]}</Text></Button></Col>
          <Col ><Button large info onPress={() => { this.inCo(dictOfAnswerForUse, dictOfChoiceForUse[3], ansNum); }}><Text>{dictOfChoiceForUse[3]}</Text></Button></Col>
        </Grid>
      )
    } else if (this.state.inputNumber === dictOfAnswer.length && this.state.qId.length !== questions.length && questionId === questions.length - 1) {
      buttonForBug = (
        <Button full info style={{ paddingTop: 100, height: 100 }}>
          <Text>他の問題を答えてください</Text>
        </Button>
      );
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
          {buttonForBug}
          {finishButton}
        </Content>
      </Container>
    );
  }
}
