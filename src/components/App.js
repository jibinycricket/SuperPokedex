import React, { Component } from 'react';
import Dropdown from '../containers/Dropdown';
import PokemonContainer from '../containers/PokemonContainer';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dropdown />
        <PokemonContainer />
      </div>
    );
  }
}

export default App;
