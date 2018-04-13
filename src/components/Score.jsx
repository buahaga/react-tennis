import React from 'react';

const score = (props) => {
  return (
    <div className={props.className}>{props.children}</div>
  )
};

export default score;
