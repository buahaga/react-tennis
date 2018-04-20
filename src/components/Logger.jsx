import React from 'react';
import { withLastLocation } from 'react-router-last-location';

const Logger = ({ lastLocation }) => {
  let style = {
    position: 'absolute',
    top: '500px',
    width: '250px',
    padding: '20px',
    background: 'red',
  }

  return (
  <div className='logger' style={style} >{JSON.stringify(lastLocation)}</div>
)};


export default withLastLocation(Logger);
