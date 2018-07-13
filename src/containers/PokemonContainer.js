import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeSpinnerState} from '../actions/index';
import BioStats from '../components/BioStats';
import TypeRelations from '../components/TypeRelations';
import StatChart from '../components/StatChart';
import EvoChain from '../components/EvoChain';
import {typeColors} from '../scripts/helpers';

class PokemonContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      generalData:{},
      bioData: {},
      evoData: {}
    };
    this.renderBio = this.renderBio.bind(this);
    this.mainColor = this.mainColor.bind(this);
  }
  componentWillReceiveProps(nextProps){
    //If the next set of data is loaded, stop spinner
    if(nextProps.pokeData.length>0){
      console.log('hello');
      if(this.state.generalData.name!==nextProps.pokeData[0][0].data.name){
        this.props.changeSpinnerState(false);
      }
      this.setState({
        generalData:nextProps.pokeData[0][0].data,
        bioData: nextProps.pokeData[0][1][0].data,
        evoData: nextProps.pokeData[0][1][1].data,
        typeColor: this.mainColor(nextProps.pokeData[0][0].data.types)
      });
    }
  }
  mainColor(types){
    if(types.length<2){
      return typeColors[types[0].type.name];
    }else{
      return typeColors[types[1].type.name];
    }
  }
  renderBio(){
    if(this.props.spinner !== false){
      let spinnerStatus = this.props.spinner ? 'loading' : 'idle';
      return (
        <div className={`Spinner Spinner--${spinnerStatus}`}>
          <img className="Spinner__image" src={require(`../images/pokeballspinner.png`)} width="150px" alt="pokeballspinner"/>
        </div>
      )
    }else{
      var style={
        backgroundColor:this.state.typeColor
      }
      return(
        <div>
          <BioStats 
            generalData={this.state.generalData} 
            bioData={this.state.bioData}
            style = {style}
          />
          <div className="Stats">
            <TypeRelations typecolor={this.state.typeColor} generalData={this.state.generalData}/>
            <StatChart typecolor={this.state.typeColor} statsData={this.state.generalData.stats.reverse()}/>
          </div>
          <EvoChain typecolor={this.state.typeColor} evoData={this.state.evoData}/>
        </div>
      );
    }
  }
  render(){
    return(
      <div>
        {this.renderBio()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return{spinner:state.spinner, pokeData:state.pokeData}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({changeSpinnerState}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonContainer);