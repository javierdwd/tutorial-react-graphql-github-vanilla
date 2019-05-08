import React from 'react';
import ReactionList from './ReactionList';

const Repository = ({ repository, onFetchMoreIssues }) => (
  <div>
    <p>
      <strong>In Repository: </strong>
      <a href={repository.url}>{repository.name}</a>
    </p>

    <ul>
      {repository.issues.edges.map(issue => (
        <li key={issue.node.id}>
          <a
            href={issue.node.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {issue.node.title} is <em>{ issue.node.state }</em>
          </a>

          &middot; Author:&nbsp;

          <a
            href={issue.node.author.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {issue.node.author.login}
          </a>

          { issue.node.reactions.edges.length &&
            <ReactionList reactions={
              issue.node.reactions.edges.map(reaction => reaction.node)
           } />
          }
        </li>
      ))}
    </ul>

      {
        repository.issues.pageInfo.hasNextPage && (
        <div>
          <hr />
          <button onClick={onFetchMoreIssues}>More</button>
        </div>
        )
      }
  </div>
);

export default Repository;