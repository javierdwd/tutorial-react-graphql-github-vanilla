import React from 'react';

const Organization = ({ organization, errors }) => {
  if(errors) {
    return (
      <p>
        <strong>Something went wrong: </strong>
        {errors.map(error => error.message).join(' ')}
      </p>
    );
  }

  return (
    <div>
      <p>
        <strong>Issues from Organization: </strong>
        <a
          href={organization.url}
          target="_blank"
          rel="noopener noreferrer"
        >{organization.name}</a>
      </p>
    </div>
  )
};

export default Organization;