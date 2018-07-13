import React from 'react';
import PokeImage from './pokeimage';

export default (props)=>{
  var fontstyle = {
    color:props.typecolor
  };

  var bgstyle = {
    backgroundColor:props.typecolor,
    color: "white"
  }

  function verifyEvolutionCondition(evolution_details){
    let reqArray = [];
    console.log(evolution_details);
    if(evolution_details.item!==null){
      if(evolution_details.trigger.name === "use-item"){
        reqArray.push(
          <div className="req-sprite" key={evolution_details.item.name}>
            <img 
                src={require(`../images/req_sprites/${evolution_details.item.name}.png`)}
                title={`Use ${evolution_details.item.name}`} 
                alt={`${evolution_details.item.name} sprite`}
            />
          </div>
        )
      }
    }


    //By Level
    if(evolution_details.min_level!==null){
      reqArray.push(
        <div 
          className="evolve-level" 
          key={`evolvesat${evolution_details.min_level}`} 
          style={fontstyle}
        >
          <span className="lvl-label">LVL</span>
          <span className="evolved-label">{evolution_details.min_level}</span>
        </div>
      );
    }

    //By Time of Day
    if(evolution_details.time_of_day!==null){
      if(evolution_details.time_of_day==='night'){
        reqArray.push(<div className="req-sprite" key="night"><img src={require(`../images/req_sprites/night.png`)} title="Evolves on level up at night" alt="moon sprite"/></div>);
      }else if(evolution_details.time_of_day==='day'){
        reqArray.push(<div className="req-sprite" key="day"><img src={require(`../images/req_sprites/day.png`)}  title="Evolves on level up during the day" alt="sun sprite"/></div>);
      }
    }

    if(evolution_details.min_happiness!==null && evolution_details.time_of_day===""){
      reqArray.push(<div className="req-s-sprite" key="happiness"><img src={require(`../images/req_sprites/happiness.png`)} title="Evolves on level up after max happiness" alt={`heart sprite`}/></div>);
    }

    //By Trade
    if(evolution_details.trigger.name === "trade"){
      if(evolution_details.held_item!==null){//By Trade with Item
        var heldItem = evolution_details.held_item.name;
        reqArray.push(<div className="req-sprite" key={heldItem}><img src={require(`../images/req_sprites/${heldItem}.png`)} title={`trade while holding ${heldItem}`} alt={`${heldItem} sprite`}/></div>);
      }else{
        reqArray.push(<div className="req-s-sprite" key="trade"><img src={require(`../images/req_sprites/trade.png`)} title="Evolves when traded" alt="trade sprite"/></div>);
      }
    }
    
    //By Max Beauty
    if(evolution_details.min_beauty!==null){
      reqArray.push(<div className="req-sprite" key="max-beauty">max beauty</div>);
    }

    if(evolution_details.location){
      if(evolution_details.location.name==="eterna-forest"){
        reqArray.push(<div className="req-sprite" key="moss-rock"><img src={require(`../images/req_sprites/moss-rock.png`)}  title="Level around moss rock" alt="moss rock sprite"/></div>);
      }else{
        reqArray.push(<div className="req-sprite" key="ice-rock"><img src={require(`../images/req_sprites/ice-rock.jpg`)}  title="Level around ice rock" alt="ice rock sprite"/></div>);
      }
    }

    if(evolution_details.known_move_type){
      reqArray.push(<div className="req-sprite" key="fairy-move"><img src={require(`../images/req_sprites/fairy.png`)}  title="Level while knowing a fairy move" alt="fairy sprite"/></div>);
    }
    return reqArray;
  }


function sortEvoChainData(pokeObject){
  let pokeArray = [];
  if(pokeObject.evolves_to.length>0){
    pokeArray.push(pokeObject.species.url.split('/')[6]);
    if(pokeObject.evolution_details.length>0){
      var condition = verifyEvolutionCondition(pokeObject.evolution_details[0])
      pokeArray.push(condition);
    }else{
      pokeArray.push(0);
    }
    for(let i = 0;i<pokeObject.evolves_to.length;i++){
      pokeArray=pokeArray.concat(sortEvoChainData(pokeObject.evolves_to[i]));
    }
  }else{
    pokeArray.push(pokeObject.species.url.split('/')[6]);
    if(pokeObject.evolution_details[0]!=null){
      condition = verifyEvolutionCondition(pokeObject.evolution_details[0])
      pokeArray.push(condition);
    }
  }
  return pokeArray;
}

  function renderEvoChain(array){
    let imageArray=[];
    //Every Even is a pokemon, every odd is how it evolves
    for(let i=0;i<array.length;i+=2){
      if(i!==0){
        imageArray.push(<div className="poke-req" key={`evochain${i}evoreq`}>{array[i+1]}</div>)
      }
      imageArray.push(<PokeImage key={`evochain${i}sprite`} idNum={array[i]}/>);
    }
    return imageArray;
  }
  var evoArray = sortEvoChainData(props.evoData.chain);

  return(
    <div className="evo-chain-container">
      <div style={bgstyle} className="evo-chain-section-title">EVOLUTION</div>
      <div style={bgstyle} className="evo-chain-thin-line"></div>
      <div className="evo-chain">{renderEvoChain(evoArray)}</div>
    </div>);
}