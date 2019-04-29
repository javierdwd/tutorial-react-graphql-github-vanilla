import { GITHUB_ACCESS_TOKEN } from './data';
import React from 'react';
import axios from  'axios';

import { GET_ISSUES_OF_REPOSITORY } from './Query';
import Form from './components/Form';
import Organization from './components/Organization';

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
    organization: null,
    errors: null,
  };

  componentDidMount = () => {
    this.onFetchFromGitHub();
  };

  handleFormSubmit = () => {

  };

  handleFormChange = event => {
    this.setState({
      path: event.target.value
    });
  };

  onFetchFromGitHub = async () => {
    try {
      const result = await axiosGitHubGraphQL.post('', {
        query: GET_ISSUES_OF_REPOSITORY
      });

      this.setState({errors: result.data.errors});

      if(!this.state.errors) {
        this.setState({ organization: result.data.data.organization })
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { path, organization, errors } = this.state;

    return (
      <div>
        <h1>{ TITLE }</h1>

        <Form
          onSubmit={this.handleFormSubmit}
          onChange={this.handleFormChange}
          value={path}
        />

        <hr />

        {organization || errors ? (
          <Organization organization={organization} errors={errors} />
        ) : (
          <p>Cargando información...</p>
        )}
      </div>
    )
  }
}

export default App;