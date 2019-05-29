import React, { useReducer, useEffect } from 'react';

import Form from './components/Form';
import Organization from './components/Organization';
import { getIssuesOfRepository } from './api';

const TITLE = 'React GraphQL Github Client';

const resolveIssuesQuery = (queryResult, cursor) => state => {
  const { data, errors } = queryResult.data;

  const update = {
    errors: errors,
    organization: null
  };

  if(!update.errors) {
    update.organization = data.organization;
  }

  if(!cursor) {
    return update;
  }

  const { edges: oldIssues} = state.organization.repository.issues;
  const { edges: newIssues } = data.organization.repository.issues;

  const updatedIssues = [...oldIssues, ...newIssues];

  update.organization.repository.issues.edges = updatedIssues;

  return update;
};

const stateReducer = (state, newState) => ({
  ...state,
  ...newState
});

const App = () => {
  const [state, setState] = useReducer(stateReducer, {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
    organization: null,
    errors: null
  });

  const onFetchFromGitHub = async (path, cursor) => {
    try {
      const queryResult = await getIssuesOfRepository(path, cursor);

      setState(await resolveIssuesQuery(queryResult, cursor)(state));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = event => {
    onFetchFromGitHub(state.path);

    event.preventDefault();
  };

  const handleFormChange = event => {
    setState({
      path: event.target.value
    });
  };

  const onFetchMoreIssues = () => {
    const {
      endCursor,
    } = state.organization.repository.issues.pageInfo;

    onFetchFromGitHub(state.path, endCursor);
  };

  useEffect(() => {
    onFetchFromGitHub(state.path);
  }, []);

  return (
    <div>
      <h1>{ TITLE }</h1>

      <Form
        onSubmit={handleFormSubmit}
        onChange={handleFormChange}
        value={state.path}
      />

      <hr />

      {state.organization || state.errors ? (
        <Organization
          organization={state.organization}
          errors={state.errors}
          onFetchMoreIssues={onFetchMoreIssues}
        />
      ) : (
        <p>Cargando información...</p>
      )}
    </div>
  );
};

export default App;