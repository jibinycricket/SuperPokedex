import {FETCH_POKEDATA} from '../actions/index';

export default function(state=[], action){
  switch(action.type){
    case FETCH_POKEDATA:
      return [action.payload];
    default:
      return state;
  }
}