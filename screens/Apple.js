import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Left, Right, Icon} from 'native-base';
import MathJax from 'react-native-mathjax';

export class Apple extends Component {
  render() {
    const questions = this.props.navigation.state.params.questions;
    const question = [questions[this.props.navigation.state.params.questionId]];
    const nextQuestion = [questions[this.props.navigation.state.params.questionId + 1]];
    const items = question.map((c, i) => {
      return (
        <MathJax
          // HTML content with MathJax support
          html={'$\\sqrt{2}$'}
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
    });
    return (
      <Container>
        <Content>
          {items}
        </Content>
      </Container>
    );
  }
}