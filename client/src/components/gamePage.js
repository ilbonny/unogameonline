import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from 'query-string'
import _ from 'lodash'
import "../resources/main.css";
import "../resources/cards.css";

export class Game extends Component {
  state = {
    game: {},
    gameId: '',
    userId: '',
    player1: {},
    player2: {},
    player3: {},
    player4: {},
    countDiscard: 1,
    showColorCube: false,
    currentCard: {},
    playerNum: 0,
    showDisputeButtons: false,
    arrowurl: "",
    arrowRotation: "",
    gameHub: {}
  };

  componentDidMount = () => {
    const { socket } = this.props;
    this.reloadGame();

    var params = queryString.parse(this.props.location.search);
    this.setState({gameId:params.game, userId:params.player});
    
    socket.emit("STARTING_GAME",{ gameId :params.game, userId : params.player});
  };

  reloadGame = () =>{
    const { socket } = this.props;
    socket.on("START_GAME", game => {
      this.setState({ game: game });
      console.log(game)
    });
  }

  selectColor  = (color)=>{

  }

  declareUno = ()=>{

  }

  challengeDrawFour = (choice)=>{

  }

  createPlayerCard = (position, container, cardStyle, transform)=>{
    const {players} = this.state.game;
    const findPlayer = _.find(players, (player) =>{return player.position === position});
    
    if(findPlayer === undefined) return;
    
    return findPlayer.hand.map((card, index) =>{
        return  (
          <div className={container} key={index} >
             <div className={cardStyle + ' '+ card.value + '_' + card.color } 
               style={this.setTransformCard(transform, index, findPlayer.hand.length)} >
             </div>
          </div>
          )
        });
  } 
  
  setTransformCard = (transform, index, count)=>{
    let result = {};
    switch (transform) {
      case 'bottom':
          result = this.transformCard(index, count, 0);
          return {
            transform: `rotate(${result.deg}deg)`,
            left: result.start + "px",
            top: result.space + "px"
          }    
      case 'right':
          result = this.transformCard(index, count, 90);
          return {
            transform: `rotate(${result.deg * -1}deg)`,
            left: result.space + "px",
            top: result.start + "px"
          }   
      case 'top':
          result = this.transformCard(index, count, 0);
          return {
            transform: `rotate(${result.deg * -1}deg)`,
            left: result.start + "px",
            bottom: result.space + "px"
          }   
      case 'left':
          result = this.transformCard(index, count, 90);
          return {
            transform: `rotate(${result.deg}deg)`,
            right: result.space + "px",
            top: result.start + "px"
          }
      default:
        break;    
    }
  }

  setTransformCardLeft = (tranform, index, count) => {
    var result = this.transformCard(index, count, 90);
    return {
      transform: `rotate(${result.deg}"deg")`,
      right: result.space + "px",
      top: result.start + "px"
    }
  }

  isOdd = (num)=> {
    return num % 2;
  }

  transformCard = (index, count, angle) => {
    index = index + 1;

    if (!this.isOdd(count)) {
        count = count + 1;
    }

    var middle = count / 2;
    var start = index * 50 - middle * 10;
    var space = Math.abs(index - middle) * 5;
    var deg = (index - middle) * 5 + angle;

    return { start: start, space: space, deg : deg } 
  }

  render() {   

    return (
      <div>
        <div id="deckdiv">
            <img src={require('../resources/deck.jpg')} alt='deck'/>
        </div>
        <div id="cubediv">
            <img src={require('../resources/cubeblue.png')} alt='cubeblue' onClick={this.selectColor('blue')} />
            <img src={require('../resources/cubegreen.png')} alt='cubegreen' onClick={this.selectColor('green')} />
            <img src={require('../resources/cubered.png')} alt='cubered' onClick={this.selectColor('red')}/>
            <img src={require('../resources/cubeyellow.png')} alt='cubeyellow' onClick={this.selectColor('yellow')} />
        </div>
        <div id="unobuttondiv">
            <img src={require('../resources/buttonUno.png')} alt='buttonUno' onClick={this.declareUno()} />
        </div>
        <div id="messagediv">
            <p id="messagep">{this.state.game.message}</p>
        </div>
        <div id="disputeButtons">
            <button type="button" className="btn btn-outline-primary" onClick={this.challengeDrawFour(true)}>Yes</button>
            <button type="button" className="btn btn-outline-secondary" onClick={this.challengeDrawFour(false)}>No</button>
        </div>     
        <div id="leftdiv">
            {this.createPlayerCard(4,'cardDivContainerVertical','cardVerticalLeft', 'left')}
        </div>   
        <div id="topdiv">
            {this.createPlayerCard(3, 'cardDivContainerHorizontal','cardHorizontal', 'top')}            
        </div>
        <div id="arrowsdiv">
           
        </div>
        <div id="rightdiv">
            {this.createPlayerCard(2, 'cardDivContainerVertical','cardVerticalRight','right')}
        </div>
        <div id="bottomdiv">
            {this.createPlayerCard(1, 'cardDivContainerHorizontal','cardHorizontal','bottom')}
        </div>
    </div>
    );
  }
}

export default withRouter(Game);
