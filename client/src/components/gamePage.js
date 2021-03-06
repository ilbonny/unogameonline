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
    showDisputeButtons: false,
    currentCard: {},
    playerNum: 0    
  };

  componentDidMount = () => {
    const { socket } = this.props;
    this.startGame();
    this.diconnect();
    this.playturn();
    this.challenge();

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

  startingGame = ()=>{
    const { socket } = this.props;
    socket.emit("STARTING_GAME", {
      gameId: this.state.gameId,
      userId: this.state.userId
    });
  }

  diconnect = () => {
    const { socket } = this.props;
    socket.on("DISCONNECT", socketId => {
      this.startingGame();
    });
  };

  playturn = () => {
    const { socket } = this.props;
    socket.on("PLAYTURN", () => {
      this.startingGame();
    });
  };

  challenge = () => {
    const { socket } = this.props;
    socket.on("REQUEST_CHALLENGE", () => {
      this.startingGame();
      this.setState({showDisputeButtons : true});
    });
  };

  handleShowColorCube = (value, card, playerNum) => {
    this.setState({
      showColorCube: value,
      currentCard: card,
      playerNum: playerNum
    });
  };

  selectColor = color => {
    const { currentCard, playerNum } = this.state;
    this.setState({ showColorCube: false });
    currentCard.color = color;

    if(currentCard.value === "DrawFour"){
      this.requestChallenge(playerNum, currentCard);
    }      
    else{
      this.playerTurnExecute(playerNum, currentCard);
    }    
  };

  playerTurnExecute = (playerNum, card) => {
    const { socket } = this.props;
    const { gameId, userId } = this.state;

    socket.emit("PLAYTURNING", {
      card: card,
      num: playerNum,
      gameId: gameId,
      userId: userId
    });
  };

  requestChallenge = (playerNum, card) => {
    const { socket } = this.props;
    const { gameId, userId } = this.state;
    
    socket.emit("REQUESTING_CHALLENGE", {
      card: card,
      num: playerNum,
      gameId: gameId,
      userId: userId,
      isRequestChallenge : true
    });
  };

  challengeDrawFour = (choice)=>{
    const { socket } = this.props;
    const { game, gameId, userId } = this.state;

    let isChallenge = choice === 'yes' ? true : false;
    this.setState({showDisputeButtons : false});

    socket.emit("CHALLENGE", {
      card : game.discardPile[game.discardPile.length-1],
      gameId: gameId,
      userId: userId,
      isRequestChallenge : false,
      isChallenge : isChallenge
    });
  }

  render() {
    const { socket } = this.props;
    const { game, gameId, showColorCube, showDisputeButtons } = this.state;
    return (
      <div>
        <GameDeck socket={socket} gameId={gameId} />
        <GameCube
          showColorCube={showColorCube}
          selectColor={this.selectColor}
        />
        <GameUnoButton />
        <GameMessages game={game} />
        <GameDisputeButtons isRequestChallenge = {showDisputeButtons} challengeDrawFour={this.challengeDrawFour} /> 
        <div id="leftdiv">
          <GamePlayers
            game={game}
            position="3"
            container="cardDivContainerVertical"
            cardStyle="cardVerticalLeft"
            transform="left"
            handleShowColorCube={this.handleShowColorCube}
            playerTurnExecute={this.playerTurnExecute}
          />
        </div>
        <div id="topdiv">
          <GamePlayers
            game={game}
            position="2"
            container="cardDivContainerHorizontal"
            cardStyle="cardHorizontal"
            transform="top"
            handleShowColorCube={this.handleShowColorCube}
            playerTurnExecute={this.playerTurnExecute}
          />
        </div>
        <GameArrows game={game} />
        <GameDiscardPile game={game} />
        <div id="rightdiv">
          <GamePlayers
            game={game}
            position="1"
            container="cardDivContainerVertical"
            cardStyle="cardVerticalRight"
            transform="right"
            handleShowColorCube={this.handleShowColorCube}
            playerTurnExecute={this.playerTurnExecute}
          />
        </div>
        <div id="bottomdiv">
          <GamePlayers
            game={game}
            position="0"
            container="cardDivContainerHorizontal"
            cardStyle="cardHorizontal"
            transform="bottom"
            handleShowColorCube={this.handleShowColorCube}
            playerTurnExecute={this.playerTurnExecute}
          />
        </div>
        <GameUser game={game} />
      </div>
    );
  }
}

export default withRouter(Game);
