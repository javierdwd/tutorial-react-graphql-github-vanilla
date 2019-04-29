import { GITHUB_ACCESS_TOKEN } from './data';
import React from 'react';
import axios from  'axios';

import Form from './components/Form';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${GITHUB_ACCESS_TOKEN}`,
  },
});

const TITLE = 'React GraphQL Github Client';

class App extends React.Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
  };

  componentDidMount = () => {

  };

  handleFormSubmit = () => {

  };

  handleFormChange = event => {
    this.setState({
      path: event.target.value
    });
  };

  render() {
    const { path } = this.state;

    return (
      <div>
        <h1>{ TITLE }</h1>

        <Form
          onSubmit={this.handleFormSubmit}
          onChange={this.handleFormChange}
          value={path}
        />

        <hr />
      </div>
    )
  }
}

export default App;