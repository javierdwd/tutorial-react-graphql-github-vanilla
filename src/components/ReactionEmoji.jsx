import React from 'react';

const ReactionEmoji = ({ code }) => {
  const emojis = new Map();

  emojis.set('thumbs_up', '👍');
  emojis.set('thumbs_down', '👎');
  emojis.set('laugh', '😄');
  emojis.set('hooray', '🎉');
  emojis.set('confused', '😕');
  emojis.set('heart', '❤️');
  emojis.set('rocket', '🚀');
  emojis.set('eyes', '👀');

  return <span title={code.replace('_', ' ')}>{emojis.has(code) ? emojis.get(code) : code}</span>
};

export default ReactionEmoji;