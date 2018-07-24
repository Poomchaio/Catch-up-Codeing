import React, { Component } from 'react';
import axios from 'axios';
import GitList from '../Components/GitList';

class Code extends Component {
  state = {
    commits: [],
  };
  loadData = data => {
    this.setState({ commits: data });
  };
  componentDidMount() {
    axios
      .get('https://api.github.com/repos/poomchaio/DB-Project/commits')
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
    return <GitList commits={this.state.commits} />;
  }
}

export default Code;