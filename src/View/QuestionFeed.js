import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';
import { Flex, Box, Divider } from 'rebass';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import QuestionForm from '../Components/QuestionForm';
import QuestionFilter from '../Components/QuestionFilter';
import FeedItem from '../Components/FeedItem';
import firebase from '../Components/firebase';
import imgSrc from '../Components/ImageMock';

const filterData = (items, filter, user) => {
  let filterItem = items;
  if (filter.section) filterItem = filterItem.filter(item => filter.section === item.section);
  // if (filter.postByUser) filterItem = filterItem.filter(item => user.displayName === item.user);
  if (filter.keyword)
    filterItem = filterItem.filter(item => item.question.indexOf(filter.keyword) >= 0);
  return filterItem;
};
class QuestionFeed extends Component {
  static propTypes = {
    user: PropTypes.shape({
      passcode: PropTypes.string,
      displayName: PropTypes.string,
      imgSrc: PropTypes.string,
    }).isRequired,
  };
  state = {
    questions: [],
    filter: {},
    sections: [
      { key: 'all', text: 'All sections', value: 0 },
      { key: '1', text: 'section 1', value: 1 },
      { key: '2', text: 'section 2', value: 2 },
      { key: '3', text: 'section 3', value: 3 },
    ],
  };

  componentDidMount() {
    this.firebaseRef = firebase.database().ref('/post');

    this.firebaseCallback = this.firebaseRef.on('value', snap => {
      const questions = snap.val();
      this.setState({ questions: questions });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off('value', this.firebaseCallback);
  }

  handleFormSubmit = newItem => {
    const { user } = this.props;

    this.firebaseRef.push({
      ...newItem,
      user,
    });
  };

  handleFilter = newFilter => {
    this.setState({
      filter: newFilter,
    });
  };
  render() {
    const { user, imgSrc, passcode } = this.props;

    const { questions, filter, sections } = this.state;
    const questionArray = questions
      ? Object.keys(questions).map(function(key) {
          return { ...questions[key], id: key };
        })
      : [];
    const filteredFeedItem = filterData(questionArray, filter, user);
    if (user) {
      return <Redirect to="/" />;
    }
    return (
      <Flex flexWrap="wrap" my="2%" mx="5%" justifyContent="center">
        <Box width={1} mb={3}>
          <QuestionForm
            imgSrc={user.imgSrc}
            sections={sections}
            handleFormSubmit={this.handleFormSubmit}
          />
          <Box m={4} />
          <Divider borderColor="#eaeaea" />
        </Box>
        <Box width={[1, 1 / 5]} mb={3}>
          <QuestionFilter sections={sections} handleFilter={this.handleFilter} />
        </Box>
        <Box width={[1, 3 / 5]} pl={3}>
          <Feed>
            {questionArray.map(e => {
              return (
                <FeedItem
                  sections={sections}
                  firebase={this.firebaseRef}
                  answers={e.answers}
                  passcode={passcode}
                  likes={e.likes}
                  {...e}
                />
              );
            })}
          </Feed>
        </Box>
      </Flex>
    );
  }
}

export default QuestionFeed;
