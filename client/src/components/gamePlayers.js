import React, { Component } from "react";
import { routes } from "../config/serverRoutes";
import axios from "axios";
import "../resources/main.css";
import "../resources/cards.css";

export class GamePlayers extends Component {
  selectCard = (playerNum, card) => {
    const { game } = this.props;
    if (game.currentPlayer.position !== playerNum) return;
   
    if (card.Value === "Wild" || card.Value === "DrawFour") {
      // this.showColorCube = true;
      //   // this.playerNum = playerNum;
      //   // this.currentCard = card;
      //   return;
    }

    this.playerTurnExecute(playerNum, card, false);
  };

  playerTurnExecute = (playerNum, card, isChallenge) => {
    const { gameId, userId} = this.props;
    axios
      .post(routes().game +"/playerturn", {
        card: card,
        num: playerNum,
        gameId: gameId,
        userId: userId,
        isChallenge
      })
      .then(e => {
        //this.gameHub.server.reloadGame(this.gameId);
      })
      .catch(e => {
        console.log(e);
      });
  };

  createPlayerCard = () => {
    const { game, position, container, cardStyle, transform } = this.props;
    const { players } = game;

    if (players === undefined) return;

    const findPlayer = players[position];

    return findPlayer.hand.map((card, index) => {
      return (
        <div className={container} key={index} onClick={()=>this.selectCard(findPlayer.position, card)}>
          <div
            className={cardStyle + " " + card.value + "_" + card.color}
            style={this.setTransformCard(transform,index, findPlayer.hand.length)}            
          />
        </div>
      );
    });
  };

  setTransformCard = (transform, index, count) => {
    let result = {};
    switch (transform) {
      case "bottom":
        result = this.transformCard(index, count, 0);
        return {
          transform: `rotate(${result.deg}deg)`,
          left: result.start + "px",
          top: result.space + "px"
        };
      case "right":
        result = this.transformCard(index, count, 90);
        return {
          transform: `rotate(${result.deg * -1}deg)`,
          left: result.space + "px",
          top: result.start + "px"
        };
      case "top":
        result = this.transformCard(index, count, 0);
        return {
          transform: `rotate(${result.deg * -1}deg)`,
          left: result.start + "px",
          bottom: result.space + "px"
        };
      case "left":
        result = this.transformCard(index, count, 90);
        return {
          transform: `rotate(${result.deg}deg)`,
          right: result.space + "px",
          top: result.start + "px"
        };
      default:
        break;
    }
  };

  isOdd = num => {
    return num % 2;
  };

  transformCard = (index, count, angle) => {
    index = index + 1;

    if (!this.isOdd(count)) {
      count = count + 1;
    }

    var middle = count / 2;
    var start = index * 50 - middle * 10;
    var space = Math.abs(index - middle) * 5;
    var deg = (index - middle) * 5 + angle;

    return { start: start, space: space, deg: deg };
  };

  render() {
    const { game } = this.props;
    return game ? this.createPlayerCard() : <div />;
  }
}

export default GamePlayers;
