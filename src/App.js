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
    this.onFetchFromGitHub(this.state.path);
  };

  handleFormSubmit = event => {
    this.onFetchFromGitHub(this.state.path);

    event.preventDefault();
  };

  handleFormChange = event => {
    this.setState({
      path: event.target.value
    });
  };

  onFetchFromGitHub = async (path, cursor) => {
    const [organization, repository] = path.split('/');

    try {
      const result = await axiosGitHubGraphQL.post('', {
        query: GET_ISSUES_OF_REPOSITORY,
        variables: {
          organization,
          repository,
          cursor
        }
      });

      const update = {
        errors: result.data.errors,
        organization: null
      };

      if(!update.errors) {
        update.organization = result.data.data.organization;
      }

      this.setState(update);
    } catch (error) {
      console.log(error);
    }
  };

  onFetchMoreIssues = () => {
    const {
      endCursor,
    } = this.state.organization.repository.issues.pageInfo;

    this.onFetchFromGitHub(this.state.path, endCursor);
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
          <Organization
            organization={organization}
            errors={errors}
            onFetchMoreIssues={this.onFetchMoreIssues}
          />
        ) : (
          <p>Cargando información...</p>
        )}
      </div>
    )
  }
}

export default App;