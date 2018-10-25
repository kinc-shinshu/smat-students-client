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
    return (
      <Container>
        <Content>
          <Card>
            {item}
          </Card>
        </Content>
      </Container>
    );
  }
}