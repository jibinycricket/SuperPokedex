import React from 'react';
import PropTypes from 'prop-types';
import BioStat from './BioStat';
import PokeImage from './PokeImage';
/*--BioStats--
Contains BioStat component that renders species, height, weight after values are converted into Imperial units
*/
const BioStats = (props) => {
  function convertHeightToFeet(meters){
    const raw_height = meters*.1*3.28084;
    var feet = Math.floor(raw_height);
    const inches = Math.round(raw_height % 1 * 12);
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
    <div className="Bio">
      <h1 className="Bio__name" style={props.style}>{(props.generalData.name).toUpperCase()}</h1>
      <div className="Bio__info-container">
        <div className="Bio__image-container">
          <PokeImage idNum={props.generalData.id} name={props.generalData.name} />
          <div className="Bio__number">{addZerosToId(props.generalData.id)}</div>
        </div>
        <div className="Bio__text-container">
          <div className="Bio__stats">
            <BioStat main={props.bioData.genera[2].genus.toUpperCase()} sub="SPECIES" />
            <BioStat main={convertHeightToFeet(props.generalData.height)} sub="HEIGHT" />
            <BioStat main={convertWeightToLbs(props.generalData.weight)} sub="WEIGHT" />
          </div>
          <div className="Bio__fun-fact">
            {englishFlavorText()}
          </div>
        </div>
      </div>
    </div>
  );
}

BioStats.propTypes = {
  generalData: PropTypes.object.isRequired,
  bioData: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired
}

export default BioStats;