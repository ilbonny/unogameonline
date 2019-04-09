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

  createPlayerCard = (position, cardStyle)=>{
    const {players} = this.state.game;
    const findPlayer = _.find(players, (player) =>{return player.position === position});
    
    if(findPlayer === undefined) return;

    return findPlayer.hand.map((card, index) =>{
        return  (<div className={cardStyle} key={index} style={this.setTransformCardLeft(index, findPlayer.hand.length)} className={card.value + '_' + card.color}></div>)});
  }  

  setTransformCardLeft = (index, count) => {
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
            <div className="cardDivContainerVertical">
                {this.createPlayerCard(4, 'cardVerticalLeft')}
            </div>
        </div>   
        <div id="topdiv">
            <div className="cardDivContainerHorizontal">
                {this.createPlayerCard(3, 'cardHorizontal')}
            </div>
        </div>
        <div id="arrowsdiv">
           
        </div>
        <div id="rightdiv">
            <div className="cardDivContainerVertical">
                {this.createPlayerCard(2, 'cardVerticalRight')}
            </div>
        </div>
        <div id="bottomdiv">
            <div className="cardDivContainerHorizontal">
                {this.createPlayerCard(1, 'cardHorizontal')}
            </div>            
        </div>
    </div>
    );
  }
}

export default withRouter(Game);
