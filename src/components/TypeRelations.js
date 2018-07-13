import React from 'react';
import PropTypes from 'prop-types';
import TypeRelation from './TypeRelation';
import {typeWeakness, typeResistance, typeImmunity, typeAbbreviation} from '../scripts/helpers.js';
/*
--Type Relations Component--
Uses the Pokemon Types and finds its weakness/resistance/immunity 
to other pokemon types.

Passes all relational element data to the TypeRelation component which renders the different elements with its relation label
*/
const TypeRelations = (props)=>{  
  function getTypes(data){
    //Retrieves the element types of the pokemon and returns it in an array
    var pokeTypes = [];
    if(data.length<2){
      pokeTypes.push(data[0].type.name);
    }else{
      pokeTypes.push(data[0].type.name);
      pokeTypes.push(data[1].type.name);
    }
    return pokeTypes;
  }

  function typeRelationElements(data, relation){
    //Uses each pokeType in the types array and pushes the abbreviated element values from the relation(weakness/resistance/immunity) object to the elements array
    //If an element is shared between two pokeTypes only one instance of the element is pushed to the array
    var types = getTypes(data);
    var elements = []
    types.forEach((type)=>{
      relation[type].forEach((element, index)=>{
        const elemAbrev = typeAbbreviation[element];
        if(elements.indexOf(elemAbrev)===-1 && elements.length<3){
          elements.push(elemAbrev);
        }
      });
    });
    
    return elements;
  }

  function getTypeName(pokeData){
    if(pokeData.length<2){
      return pokeData[0].type.name.toUpperCase();
    }
    return `${pokeData[0].type.name.toUpperCase()}/${pokeData[1].type.name.toUpperCase()}`
  }

  function renderMainType(data){
    var style = { backgroundColor: props.typecolor };
    return (
      <div style={style} className="MainType">
        <div className="MainType__value">{getTypeName(data)}</div>
        <div className="MainType__label">TYPE</div>
      </div>
    );
  }

  return(
    <div className="TypeRelations">
      {renderMainType(props.generalData.types)}
      <TypeRelation elements={typeRelationElements(props.generalData.types, typeWeakness)} label="WEAKNESS" />
      <TypeRelation elements={typeRelationElements(props.generalData.types, typeResistance)} label="RESISTANCE" />
      <TypeRelation elements={typeRelationElements(props.generalData.types, typeImmunity)} label="IMMUNITY" />
    </div>
  ) 
}

TypeRelations.propTypes = {
  generalData: PropTypes.object.isRequired,
  typecolor: PropTypes.string.isRequired
}

export default TypeRelations;