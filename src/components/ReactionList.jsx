import React from 'react';
import ReactionEmoji from './ReactionEmoji';

const ReactionList = (props) => {
  const listStyle = {
    listStyleType: 'none',
    margin: '.4rem 0 .8rem',
    padding: '0'
  };
  const itemStyle = {
    display: 'inline-block',
    marginRight: '.6rem'
  };

  return (
    <ul style={listStyle}>
      {props.reactions.map(reaction => (
        <li key={reaction.id} style={itemStyle}><ReactionEmoji code={reaction.content.toLowerCase()} /></li>
      ))}
    </ul>
  );
};

export default ReactionList;