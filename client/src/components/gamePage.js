import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import "../resources/main.css";
import "../resources/cards.css";
import GameDeck from "./gameDeck";
import GameCube from "./gameCube";
import GameMessages from "./gameMessages";
import GameUnoButton from "./gameUnoButton";
import GameDisputeButtons from "./gameDisputeButtons";
import GameDiscardPile from "./gameDiscardPile";
import GameArrows from "./gameArrows";
import GamePlayers from "./gamePlayers";
import GameUser from "./gameUser";

export class Game extends Component {
  state = {
    game: null,
    gameId: "",
    userId: "",
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
    this.startGame();
    this.diconnect();
    this.playturn();

    var params = queryString.parse(this.props.location.search);
    this.setState({ gameId: params.game, userId: params.player });

    socket.emit("STARTING_GAME", {
      gameId: params.game,
      userId: params.player
    });
  };

  startGame = () => {
    const { socket } = this.props;
    socket.on("START_GAME", game => {
      this.setState({ game: game });
      console.log(game);
    });
  };

  diconnect = ()=>{
    const { socket } = this.props;
    socket.on("DISCONNECT", socketId => {
        console.log(socketId)
    });
  }

  playturn = ()=>{
    const { socket } = this.props;
    socket.on("PLAYTURN", () => {
      socket.emit("STARTING_GAME", {
        gameId: this.state.gameId,
        userId: this.state.userId
      });
    });
  }

  render() {
    const { socket } = this.props;
    const {game, userId, gameId} = this.state;
    return (
      <div>
        <GameDeck socket={socket} gameId={gameId}/>
        <GameCube />
        <GameUnoButton />
        <GameMessages game={game} />
        {/* <GameDisputeButtons /> */}
        <div id="leftdiv">
          <GamePlayers
            socket = {socket}
            game={game}
            position="3"
            container="cardDivContainerVertical"
            cardStyle="cardVerticalLeft"
            transform="left"
            userId = {userId}
            gameId = {gameId} 
          />
        </div>
        <div id="topdiv">
          <GamePlayers
          socket = {socket}
            game={game}
            position="2"
            container="cardDivContainerHorizontal"
            cardStyle="cardHorizontal"
            transform="top"
            userId = {userId}
            gameId = {gameId} 
          />
        </div>
        <GameArrows game={game} />
        <GameDiscardPile game={game} />
        <div id="rightdiv">
          <GamePlayers
          socket = {socket}
            game={game}
            position="1"
            container="cardDivContainerVertical"
            cardStyle="cardVerticalRight"
            transform="right"
            userId = {userId}
            gameId = {gameId} 
            
          />
        </div>
        <div id="bottomdiv">
          <GamePlayers
          socket = {socket}
            game={game}
            position="0"
            container="cardDivContainerHorizontal"
            cardStyle="cardHorizontal"
            transform="bottom"
            userId = {userId}
            gameId = {gameId} 
          />
        </div>
        <GameUser game={game} />
      </div>
    );
  }
}

export default withRouter(Game);
