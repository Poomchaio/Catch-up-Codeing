import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from './Components/Header';
import Code from './View/Code';
import QuestionFeed from './View/QuestionFeed';

export default class Main extends Component {
  state = {
    user: {
      displayName: 'Anonymous',
      passcode: '',
      imgSrc: '',
    },
  };

  componentDidMount() {
    const locationState = this.props.location.state;
    if (locationState) {
      const { user } = locationState;
      if (user) {
        this.setState({
          user: {
            displayName: user.displayName ? user.displayName : 'Anonymous',
            imgSrc: user.imgSrc ? user.imgSrc : 'https://assets.skooldio.com/icon/face10_b.svg',
            passcode: user.passcode ? user.passcode : '000',
          },
        });
      }
    }
  }
  render() {
    const { user } = this.state;
    if (!user) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <Header isLogin user={user} pathName={this.props.location.pathname} />
        <Route path="/main/qa" component={() => <QuestionFeed user={user} />} />
        <Route path="/main/code" component={() => <Code user={user} />} />
      </Fragment>
    );
  }
}
