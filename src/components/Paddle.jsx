import React from 'react';

const paddle = (props) => {
  let style = {
    left: props.left + 'px'
  }
  return <div className={props.className} style={style}></div>
};

export default paddle;
