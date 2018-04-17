import React from 'react';

const score = (props) => {
  return (
    <div className={props.className}>
      You have to make "3" or "-3" to win this Game!<br />
      <span>{props.children}</span>
  </div>
  )
};

export default score;
