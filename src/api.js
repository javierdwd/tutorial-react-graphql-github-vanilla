import axios from  'axios';

import { GITHUB_ACCESS_TOKEN } from './data';
import { GET_ISSUES_OF_REPOSITORY } from './Query';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${GITHUB_ACCESS_TOKEN}`,
  },
});

export const getIssuesOfRepository = async (path, cursor) => {
  const [organization, repository] = path.split('/');

  return await axiosGitHubGraphQL.post('', {
    query: GET_ISSUES_OF_REPOSITORY,
    variables: {
      organization,
      repository,
      cursor
    }
  });
};