import {combineReducers} from 'redux';
import PokeDataReducer from './reducer_pokedata';
import SpinReducer from './reducer_spinner';

const rootReducer = combineReducers({
  pokeData:PokeDataReducer,
  spinner:SpinReducer
});

export default rootReducer;