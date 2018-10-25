import React, { Component } from 'react';
import { Container, Content, Card, Body, CardItem, Text, Left, Right, Icon} from 'native-base';
import MathJax from 'react-native-mathjax';

export class Apple extends Component {
  parse = (text) => {
    let result = text.replace(/\*/g, "\\times");
    result = result.replace(/\//g, "\\div");
    result = result.replace(/\+-/g, "\\pm");
    result = result.replace(/-\+/g, "\\mp");
    const ss = result.match(/#{.+?}/g);
    if (ss != null){
      for (let s of ss){
        let k = s.match(/[^#]+/g);
        result = result.replace(s, "\\sqrt{" + k[0].slice(1, -1) + "}");
      }
    }
    const fs = result.match(/\[.+?]%\[.+?]/g);
    if (fs != null){
      for (let f of fs){
        console.log(f);
        let k = f.match(/[^%]+/g);
        result = result.replace(f, "\\frac{" + k[0].slice(1, -1) + "}{" + k[1].slice(1, -1) + "}");
      }
    }
    result = result.replace(/@|#|\$|%|&/, "");
    console.log(result);
    return result
  }

  ansify = (text) => {
    let result = text.replace(/[0-9a-w]+/g, "\\boxed{\\phantom{0}}");
    return result;
  }

  getSelection = (text) => {
    const answers = text.match(/[0-9a-w]+/g);
    const selections = [];
    for (let a of answers){
      let selection = [a];
      for (let i = 0; i < 3; i++){
        let ans = "";
        const c = "abcdefghijklmnopqrstuvw";
        for (let i = 0; i < a.length; i++){
          if (isNaN(parseInt(a[i]))){
            // str const
            ans += c[Math.floor(Math.random()*c.length)]
          } else {
            // int const
            ans += Math.floor(Math.random()*10);
          }
        }
        selection.push(ans);
        
      }
      selections.push(selection);
    }
    return selections;
  }

  getAnswer = (text) => {
    const answers = text.match(/[0-9a-w]+/g);
    return answers;
  }

  render() {
    const questions = this.props.navigation.state.params.questions;
    const question = questions[this.props.navigation.state.params.questionId];
    const item = (
      <MathJax
        // HTML content with MathJax support
        html={'$' + this.parse(question.text) + '$'}
        // MathJax config option
        mathJaxOptions={{
          messageStyle: 'none',
          extensions: [ 'tex2jax.js' ],
          jax: [ 'input/TeX', 'output/HTML-CSS' ],
          tex2jax: {
            inlineMath: [ ['$','$'], ['\\(','\\)'] ],
            displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
            processEscapes: true,
          },
          TeX: {
            extensions: ['AMSmath.js','AMSsymbols.js','noErrors.js','noUndefined.js']
          }
        }}
      />
    );
    const answer = (
      <MathJax
        // HTML content with MathJax support
        html={'$' + this.parse(this.ansify(question.answer)) + '$'}
        // MathJax config option
        mathJaxOptions={{
          messageStyle: 'none',
          extensions: [ 'tex2jax.js' ],
          jax: [ 'input/TeX', 'output/HTML-CSS' ],
          tex2jax: {
            inlineMath: [ ['$','$'], ['\\(','\\)'] ],
            displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
            processEscapes: true,
          },
          TeX: {
            extensions: ['AMSmath.js','AMSsymbols.js','noErrors.js','noUndefined.js']
          }
        }}
      />
    );
    const selection = this.getSelection(question.answer);
    const answers = this.getAnswer(question.answer);
    console.log(selection);
    console.log(answers);
    return (
      <Container>
        <Content>
          <Text>問題</Text>
          <Card>
            {item}
          </Card>
          <Text>解答</Text>
          <Card>
            {answer}
          </Card>
        </Content>
      </Container>
    );
  }
}