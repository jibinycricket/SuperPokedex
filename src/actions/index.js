import axios from 'axios';
export const FETCH_POKEDATA = 'FETCH_POKEDATA';
export const START_SPINNER = 'START_SPINNER';

export function fetchPokeData(number){
  function getPokeData(number){
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
    return axios.get(url);
  }

  function getDescriptionData(number){
    const url = `https://pokeapi.co/api/v2/pokemon-species/${number}/`;
    return axios.get(url).then((response)=>{
      return axios.all([response, axios.get(response.data.evolution_chain.url)]);
    });
  }

  var request = axios.all([getPokeData(number),getDescriptionData(number)]).then(axios.spread((poke,species)=>{
    return [poke, species];
  }));

  return{
    type: FETCH_POKEDATA,
    payload: request
  }
}

export function changeSpinnerState(spin){
  return{
    type: START_SPINNER,
    payload: spin
  }
}


