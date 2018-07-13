import React from 'react';

export default (props)=>{
  return(
    <div className="BioStat">
      <div className="BioStat__value">{props.main}</div>
      <div className="BioStat__label">{props.sub}</div>
    </div>
  );
}