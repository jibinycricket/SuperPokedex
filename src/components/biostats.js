import React from 'react';
import BioStat from './biostat';
import PokeImage from './pokeimage';
/*--BioStats--
Contains BioStat component that renders species, height, weight after values are converted into Imperial units
*/
export default (props)=>{
  function convertHeightToFeet(meters){
    const raw_height = meters*.1*3.28084;
    var feet = Math.floor(raw_height);
    const inches = Math.round(raw_height%1 * 12);
    if(inches === 12){
      feet+=1;
      return feet+"'"
    }else{
      return `${feet}' ${inches}"`
    }
  }

  function convertWeightToLbs(kg){
    const raw_weight = (kg*.1*2.20462).toFixed(1);
    return `${raw_weight} lbs`;
  }

  function addZerosToId(number){
    if(number.toString().length === 1){
      return "00"+number;
    }else if(number.toString().length === 2){
      return "0"+number;
    }else{
      return number;
    }
  }
  function englishFlavorText(){
    let flavorTexts = props.bioData.flavor_text_entries;
    let flavorText = '';
    for( let i = 0; i < flavorTexts.length; i++ ){
      if(flavorTexts[i].language.name === 'en'){
        flavorText = flavorTexts[i].flavor_text;
        break;
      }
    }
    return flavorText;
  }
  return(
    <div className="bio">
      <div className="img-column">
        <PokeImage idNum={props.generalData.id} name={props.generalData.name}/>
        <div className="poke-num">{addZerosToId(props.generalData.id)}</div>
      </div>
      <div className="text-column">
        <div className="physical-stats">
          <BioStat main={props.bioData.genera[2].genus.toUpperCase()} sub="SPECIES"/>
          <BioStat main={convertHeightToFeet(props.generalData.height)} sub="HEIGHT"/>
          <BioStat main={convertWeightToLbs(props.generalData.weight)} sub="WEIGHT"/>
        </div>
        <div className="fun-fact">
          {englishFlavorText()}
        </div>
      </div>
    </div>
  );
}