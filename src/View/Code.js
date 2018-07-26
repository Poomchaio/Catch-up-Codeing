import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Commit from '../Components/Commit';

class Code extends Component {
  state = {
    commits: [],
  };
  loadData = data => {
    this.setState({ commits: data });
  };
  componentDidMount() {
    axios
      .get('https://api.github.com/repos/Poomchaio/SideMenu/commits')
      .then(response => {
        const data = response.data.map(commitDetail => {
          const { sha, commit, html_url } = commitDetail;
          return { sha, commit, html_url };
        });
        this.loadData(data);
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }
  render() {
    if (!this.props.user.passcode) {
      return <Redirect to="/" />;
    }
    return <Commit commits={this.state.commits} />;
  }
}

export default Code;
