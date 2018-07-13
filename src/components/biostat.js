import React from 'react';

export default (props)=>{
  return(
    <div className="physical-stat">
      <div className="main">{props.main}</div>
      <div className="sub">{props.sub}</div>
    </div>
  );
}