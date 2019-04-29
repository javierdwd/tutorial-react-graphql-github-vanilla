import React from 'react';

const Repository = ({ repository }) => (
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
            <ul>
              {issue.node.reactions.edges.map(reaction => (
                <li key={reaction.node.id}><small>{reaction.node.content}</small></li>
              ))}
            </ul>
          }
        </li>
      ))}
    </ul>
  </div>
);

export default Repository;