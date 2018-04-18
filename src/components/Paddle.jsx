import React from 'react';
import './Paddle.css';

const paddle = (props) => {
  let style = {
    top: props.top + 'px',
    left: props.left + 'px'
  }
  return <div className="paddle" style={style}></div>
};

export default paddle;
