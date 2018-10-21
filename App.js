import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
        <Container>
          <Header />
          <Content>
            <Button rounded light>
              <Text>Light</Text>
            </Button>
            <Button rounded>
              <Text>Primary</Text>
            </Button>
            <Button rounded success>
              <Text>Success</Text>
            </Button>
            <Button rounded info>
              <Text>Info</Text>
            </Button>
            <Button rounded warning>
              <Text>Warning</Text>
            </Button>
            <Button rounded danger>
              <Text>Danger</Text>
            </Button>
            <Button rounded dark>
              <Text>Dark</Text>
            </Button>
          </Content>
        </Container>
    );
  }
}
