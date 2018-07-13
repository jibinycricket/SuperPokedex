import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPokeData} from '../actions/index';
import {changeSpinnerState} from '../actions/index';
import {pokemonList} from '../scripts/helpers';
/*
--Dropdown Component--
When the dropdown onChange value changes it sends an action to make two API calls
1. To get general pokemon data
2. To get species data, which is used to get the pokemons evolution tree
*/
class Dropdown extends Component{
  constructor(props){
    super(props);
    this.state={
			selected: 0,
    }
    this.dropdownOptions = this.dropdownOptions.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  dropdownOptions(){
  	//Returns an array of pokemon options for the dropdown
		var optionsArray = [];
		pokemonList.forEach((name, index)=>{
			optionsArray.push(<option key={`option${name}`} value={index+1}>{name}</option>);
		});

		return optionsArray;
  }

  onSelectChange(e){
  	//When the dropdown value changes, the api call action is triggered
    this.props.actions.changeSpinnerState(true);
  	this.setState({selected:e.target.value});
    this.props.actions.fetchPokeData(e.target.value);
  }

  render(){
  	return(
  		<div className="Dropdown__container">
				<select className="Dropdown__menu" value={this.state.selected} onChange={this.onSelectChange}>
					<option value="0" disabled>Select a Pokemon</option>
					{this.dropdownOptions()}
				</select>
			</div>
  	)
  }
}

function mapDispatchToProps(dispatch){
  return {
  	actions:{
	  	fetchPokeData: bindActionCreators(fetchPokeData, dispatch),
	  	changeSpinnerState: bindActionCreators(changeSpinnerState, dispatch)
	  }
  }
}

export default connect(null,mapDispatchToProps)(Dropdown);

