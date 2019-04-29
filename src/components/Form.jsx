import React from 'react';

class From extends React.Component {
  render() {
    const { onSubmit, onChange, value } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <label htmlFor="url">
          Show open issues for https://github.com/
        </label>
        <input
          id="url"
          type="text"
          value={value}
          onChange={onChange}
          style={{ width: '300px' }}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default From;