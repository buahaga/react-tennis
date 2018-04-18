import React from 'react';
import './Score.css';

const score = (props) => {
  return (
    <div className="score">
      You have to make "3" or "-3" to win this Game!<br />
      <span>{props.children}</span>
  </div>
  )
};

export default score;
