import React from 'react';
import PropTypes from 'prop-types';
import {relationColors} from '../scripts/helpers';

const TypeRelation = (props)=>{
  /*
  --TypeRelation Component--
  Renders Relational Set of Elements
  Props: Elements, Label
  */
  function renderRelation(elements){
    //Renders each individual element
    let text = [];
    elements.forEach( element => {
      let style={
        backgroundColor:relationColors[element]
      }
      text.push(<div style={style} className="TypeRelation__element" key={element+props.label}>{element}</div>);
    });
    return text;
  }

  if(props.elements.length>0){
    return(
      <div className="TypeRelation__set">
        {renderRelation(props.elements)}
        <div className="TypeRelation__label">{props.label}</div>
      </div>
    ); 
  }else{
    return null
  }
}

TypeRelation.propTypes = {
  elements:PropTypes.array.isRequired,
  label: PropTypes.string.isRequired
}

export default TypeRelation;