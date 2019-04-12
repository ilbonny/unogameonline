import React, { Component } from "react";
import "../resources/main.css";
import "../resources/cards.css";

export class GamePlayers extends Component {
  selectCard = (playerNum, card) => {
    const { game } = this.props;
    if (game.currentPlayer.position !== playerNum) return;
   
    if (card.value === "Wild" || card.value === "DrawFour") {
      var newCard = {
        color : '',
        value : card.value,
        score : card.score        
      }
      this.props.handleShowColorCube(true, newCard, playerNum);
      return;
    }

    if(game.currentTurn.card.color === card.color 
        || (game.currentTurn.card.color !== card.color && game.currentTurn.card.value === card.value)){
          this.props.playerTurnExecute(playerNum, card, false);
        }        
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
