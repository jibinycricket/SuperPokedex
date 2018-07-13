import {START_SPINNER} from '../actions/index';

export default function(state=null, action){
  switch(action.type){
    case START_SPINNER:
      return action.payload;
    default:
      return state;
  }
}