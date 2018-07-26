import React, { Component } from 'react';
import { Feed, Icon, Button } from 'semantic-ui-react';
import { Flex, Box, Input, Image, Text as RText } from 'rebass';
import styled from 'styled-components';

import AnswerItem from './AnswerItem';
import Text from './Text/Text';
import ConfirmModal from './ConfirmModal';
import firebase from './firebase';

const GrayFlex = styled(Flex)`
  border: 1px solid rgb(224, 225, 226);
  border-radius: 6px;
`;
class FeedItem extends Component {
  state = {
    text: '',
    answers: [],
    expand: false,
    open: false,
  };

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  handleLike = questionId => {
    this.props.handleLike(2);
  };
  handleLike = () => {
    const questionId = this.props.id;
    const countLike = this.props.likes ? Object.keys(this.props.likes).length : 0;
    this.props.firebase
      .child(questionId)
      .child('likes')
      .push({
        [this.props.passcode]: 1,
      });
  };

  handleUnlike = () => {
    const questionId = this.props.id;
    const likes = this.props.likes;
    let likeId = '';
    Object.keys(likes).map(key => {
      const like = likes[key];
      Object.keys(like).map(element => {
        if (element == this.props.passcode) {
          likeId = key;
        }
      });
    });
    this.props.firebase
      .child(questionId)
      .child('likes')
      .child(likeId)
      .remove();
  };

  handleAnswer = () => {
    const user = this.props.user;
    const countAnswer = this.props.answers ? Object.keys(this.props.answers).length : 0;
    const questionId = this.props.id;
    this.props.firebase
      .child(questionId)
      .child('answers')
      .child(countAnswer)
      .set({
        user,
        answer: this.state.text,
      });
    this.setState({ text: '' });
  };

  handleKeyEvent = e => {
    if (e.key == 'Enter') {
      this.handleAnswer();
    }
  };

  handleTextAnswer = e => {
    this.setState({ text: e.target.value });
  };

  componentDidMount() {
    const { answers } = this.props;
    this.setState({ answers: answers || [] });
  }

  handleExpand = () => {
    this.setState({ expand: !this.state.expand });
  };

  handleDeleteQuestion = () => {
    const questionId = this.props.id;
    this.props.firebase.child(questionId).remove();
    this.handleCloseModal();
  };

  render() {
    const { user, question, section, likes, answers = [], sections, passcode } = this.props;
    const { expand } = this.state;
    const sectionText = section == 0 ? 'General' : `Section ${section}`;
    let liked = false;
    const likeArray = likes
      ? Object.keys(likes).map(key => {
          Object.keys(likes[key]).map(element => {
            if (element == passcode) {
              liked = true;
            }
          });

          return likes[key];
        })
      : [];

    return (
      <Feed.Event style={{ borderBottom: '1px solid #eaeaea', marginBottom: '24px' }}>
        <Box width={80} pr={2}>
          <Image src={user.imgSrc} />
        </Box>
        <Feed.Content width={1}>
          <Feed.Summary>
            <Feed.User>
              <Text primary>{user.displayName}</Text>
            </Feed.User>
            <Feed.Date>{sectionText}</Feed.Date>
            <Button compact basic size="mini" floated="right" onClick={this.handleExpand}>
              <Icon name={expand ? 'chevron up' : 'chevron down'} />
              {expand ? 'Hide ans' : 'Show ans'}
            </Button>
            <Button
              basic
              compact
              size="mini"
              icon="trash"
              floated="right"
              onClick={() => this.setState({ open: true })}
            />
            <ConfirmModal
              open={this.state.open}
              onClose={this.handleCloseModal}
              onConfirm={this.handleDeleteQuestion}
            />
          </Feed.Summary>
          <RText p={2} fontWeight="bold" fontSize={18} children={question} fontFamily="Lato" />

          <Feed.Meta>
            <Feed.Like>
              {liked ? (
                <Button compact basic size="mini" onClick={this.handleUnlike}>
                  <Icon name="like" color="red" />
                  {likeArray.length} Likes
                </Button>
              ) : (
                <Button compact basic size="mini" onClick={this.handleLike}>
                  <Icon name="like" />
                  {likeArray.length} Likes
                </Button>
              )}
            </Feed.Like>
          </Feed.Meta>
          <Box m={2} />
          <GrayFlex alignItems="baseline">
            <Input
              type="text"
              placeholder="Answer here !"
              onChange={this.handleTextAnswer}
              value={this.state.text}
              onKeyUp={this.handleKeyEvent}
            />
            <Button type="submit" icon="send" onClick={this.handleAnswer} />
          </GrayFlex>
          {expand && (
            <Feed>
              {answers.map(({ user, answer }) => <AnswerItem user={user} answer={answer} />)}
            </Feed>
          )}
          <Box m={4} />
        </Feed.Content>
      </Feed.Event>
    );
  }
}

export default FeedItem;
