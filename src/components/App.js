import React, { Component } from 'react';
import Dropdown from '../containers/dropdown';
import PokemonContainer from '../containers/pokemonContainer';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dropdown/>
        <PokemonContainer/>
      </div>
    );
  }
}

export default App;
