import React from 'react';

const wait = (props) => {
  let style = {
    display: props.display
  }
  return (
    <div className={props.className} style={style}>
      PLEASE WAIT
    </div>
  )
};

export default wait;
