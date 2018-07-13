import React from 'react';
import PropTypes from 'prop-types';

const BioStat = (props)=>{
  return(
    <div className="BioStat">
      <div className="BioStat__value">{props.main}</div>
      <div className="BioStat__label">{props.sub}</div>
    </div>
  );
}

BioStat.propTypes = {
  main: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired
}

export default BioStat;