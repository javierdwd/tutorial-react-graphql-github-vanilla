import React from 'react';

import Form from './components/Form';
import Organization from './components/Organization';
import { getIssuesOfRepository } from './api';

const TITLE = 'React GraphQL Github Client';

const resolveIssuesQuery = queryResult => {
  const update = {
    errors: queryResult.data.errors,
    organization: null
  };

  if(!update.errors) {
    update.organization = queryResult.data.data.organization;
  }

  return update;
};

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
    try {
      const queryResult = await getIssuesOfRepository(path, cursor);

      this.setState(await resolveIssuesQuery(queryResult));
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