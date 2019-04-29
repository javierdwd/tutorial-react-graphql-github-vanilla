import React from 'react';

const Organization = ({ organization }) => (
  <div>
    <p>
      <strong>Issues from Organization: </strong>
      <a href={organization.url} target="_blank">{organization.name}</a>
    </p>
  </div>
);

export default Organization;