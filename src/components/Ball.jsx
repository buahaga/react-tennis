import React from 'react';
import './Ball.css';

const ball = (props) => {
  let style = {
    top: props.top + 'px',
    left: props.left + 'px',
  }
  return (
    <div className="ball" style={style}></div>
  )
};

export default ball;
