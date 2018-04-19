import React from 'react';
import {Link} from 'react-router-dom'
import './Push.css';

const push = (props) => {
  return <Link className='push' to={props.path}>JOIN</Link>
};

export default push;
