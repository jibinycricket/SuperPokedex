import React from 'react';

export default (props)=>{
  /*
  --TypeRelation Component--
  Renders Relational Set of Elements
  Props: Elements, Label
  */
  const colors = {
    NRM: '#BDC3C7',
    FGT: '#A95747',
    FLY: '#78A3FF',
    PSN:'#AA5DA1',
    GND:'#ECCA57',
    RCK:'#CEBD72',
    BUG:'#C2D21F',
    GST:'#7874D4',
    STL:'#C4C2DB',
    FIR:'#FA5645',
    WTR:'#56AEFF',
    GRS:'#8DD851',
    ELC:'#FDE53E',
    PSY:'#F662B1',
    ICE:'#96F1FF',
    DRG:'#8975FF',
    DRK:'#8D6955',
    FRY:'#F8ADFF'
  }
  function renderRelation(elements){
    //Renders each individual element

    var text = [];
    elements.forEach((element)=>{
      var style={
        backgroundColor:colors[element]
      }
      text.push(<div style={style} className="element" key={element+props.label}>{element}</div>);
    });
    return text;
  }

  if(props.elements.length>0){
    return(
      <div className="type-relation-set">
        {renderRelation(props.elements)}
        <div className="label">{props.label}</div>
      </div>
    ); 
  }else{
    return null
  }
}