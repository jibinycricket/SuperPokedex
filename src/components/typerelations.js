import React from 'react';
import TypeRelation from './typerelation';

/*
--Type Relations Component--
Uses the Pokemon Types and finds its weakness/resistance/immunity 
to other pokemon types.

Passes all relational element data to the TypeRelation component which renders the different elements with its relation label
*/
export default (props)=>{
  const weakness = {
    normal: ['fighting'],
    fighting: ['flying','psychic','fairy'],
    flying: ['rock','electric','ice'],
    poison:['ground', 'psychic'],
    ground:['water','grass','ice'],
    rock:['fighting','ground','steel','water','grass'],
    bug:['flying','rock','fire'],
    ghost:['ghost','dark'],
    steel:['fighting','ground','fire'],
    fire:['ground','rock','water'],
    water:['grass','electric'],
    grass:['flying','poison','bug','fire','ice'],
    electric:['ground'],
    psychic:['bug','ghost','dark'],
    ice:['fighting','rock','steel','fire'],
    dragon:['ice','dragon','fairy'],
    dark:['fighting','bug','fairy'],
    fairy:['poison','steel']
  }

  const resistance = {
    normal: [],
    fighting:['rock','bug','dark'],
    flying:['fighting','bug','grass'],
    poison:['fighting','poison','bug','grass','fairy'],
    ground:['poison'],
    rock:['normal','flying','poison','fire'],
    bug:['fighting','ground','grass'],
    ghost:['poison','bug'],
    steel:['normal','flying','rock','bug','steel','grass','psychic','ice','dragon','fairy'],
    fire:['bug','steel','fire','grass','ice','fairy'],
    water:['steel','fire','water','ice'],
    grass:['ground','water','grass','electric'],
    electric:['flying','steel','electric'],
    psychic:['fighting','psychic'],
    ice:['ice'],
    dragon:['fire','water','grass','electric'],
    dark:['ghost','dark'],
    fairy:['fighting','bug','dark']
  }

  const immunity = {
    normal:[],
    fighting:[],
    flying:['ground'],
    poison:[],
    ground:['electric'],
    rock:[],
    bug:[],
    ghost:['normal','fighting'],
    steel:['poison'],
    fire:[],
    water:[],
    grass:[],
    electric:[],
    psychic:[],
    ice:[],
    dragon:[],
    dark:['psychic'],
    fairy:['dragon']
  }
  
  const abbreviation = {
    normal:"NRM",
    fighting:"FGT",
    flying:"FLY",
    poison:"PSN",
    ground:"GND",
    rock:"RCK",
    bug:"BUG",
    ghost:"GST",
    steel:"STL",
    fire:"FIR",
    water:"WTR",
    grass:"GRS",
    electric:"ELC",
    psychic:"PSY",
    ice:"ICE",
    dragon:"DRG",
    dark:"DRK",
    fairy:"FRY"
  }
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
        const elemAbrev = abbreviation[element];
        if(elements.indexOf(elemAbrev)===-1 && elements.length<3){
          elements.push(elemAbrev);
        }
      });
    });
    
    return elements;
  }

  function renderMainType(data){
    var style = {
      backgroundColor: props.typecolor
    };
    if(data.length<2){
      return (
        <div style={style} className="main-type">
          <div className="type-name">{data[0].type.name.toUpperCase()}</div>
          <div className="type-label">TYPE</div>
        </div>
      );
    }else{
      return (
        <div style={style} className="main-type">
          <div className="type-name">{`${data[0].type.name.toUpperCase()}/${data[1].type.name.toUpperCase()}`}</div>
          <div className="type-label">TYPE</div>
        </div>
      );
    }
  }

  return(
    <div className="types-column">
      {renderMainType(props.generalData.types)}
      <TypeRelation elements={typeRelationElements(props.generalData.types, weakness)} label="WEAKNESS"/>
      <TypeRelation elements={typeRelationElements(props.generalData.types, resistance)} label="RESISTANCE"/>
      <TypeRelation elements={typeRelationElements(props.generalData.types, immunity)} label="IMMUNITY"/>
    </div>
  ) 
}

