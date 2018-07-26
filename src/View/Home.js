import React, { Component } from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';
import { Flex, Box, BackgroundImage } from 'rebass';

import Text from '../Components/Text/Text';
import imgSrc from '../Components/ImageMock';
import styled from '../../node_modules/styled-components';
import firebase from '../Components/firebase';
const BgContainer = styled(Flex)`
  min-height: 100%;
`;

class Home extends Component {
  state = {
    redirect: false,
    displayName: '',
    passcode: '',
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };
  handleSubmit = () => {
    this.firebaseRef.set({
      [this.state.passcode]: this.state.displayName ? this.state.displayName : 'Anonymous',
    });
    this.setState({ redirect: true });
  };

  componentDidMount() {
    this.firebaseRef = firebase.database().ref('/users');

    this.firebaseCallback = this.firebaseRef.on('value', snap => {
      const questions = snap.val();
      this.setState({ questions: questions });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off('value', this.firebaseCallback);
  }

  render() {
    if (this.state.redirect) {
      this.props.history.push({
        pathname: '/main/qa/',
        state: {
          user: { displayName: this.state.displayName, passcode: this.state.passcode, imgSrc },
        },
      });
    }
    return (
      <BgContainer mt="12%" alignItems="center" justifyContent="center">
        <Box p={5} width={600} bg="white">
          <Flex alignItems="center" justifyContent="center">
            <Text fontSize="54px" fontWeight="900">
              WELCOME
            </Text>
            <Box m={3} />
            <Box w={50}>
              <BackgroundImage
                ratio={1}
                src="https://cdn.icon-icons.com/icons2/508/PNG/512/happy_smiley_icon-icons.com_49910.png"
              />
            </Box>
          </Flex>
          <Form onSubmit={this.handleSubmit}>
            <Flex my={4}>
              <Box w={1 / 3} alignSelf="center">
                <Text fontSize="20px" fontWeight="600">
                  PASSCODE :
                </Text>
              </Box>
              <Box w={2 / 3} mr={3}>
                <Form.Input
                  value={this.state.passcode}
                  placeholder="Passcode"
                  onChange={e => this.handleChange('passcode', e.target.value)}
                />
              </Box>
            </Flex>
            <Flex my={4}>
              <Box w={1 / 3} alignSelf="center">
                <Text fontSize="20px" fontWeight="600">
                  DISPLAY NAME :
                </Text>
              </Box>
              <Box w={2 / 3} mr={3}>
                <Form.Input
                  value={this.state.displayName}
                  placeholder="Display name"
                  onChange={e => this.handleChange('displayName', e.target.value)}
                />
              </Box>
            </Flex>
            <Flex justifyContent="flex-end" mt={2}>
              <Button animated type="submit" size="big" primary>
                <Button.Content visible>
                  <Text color="white">START LEARNING !!</Text>
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Flex>
          </Form>
        </Box>
      </BgContainer>
    );
  }
}

export default Home;
