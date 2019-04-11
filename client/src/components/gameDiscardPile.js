import React, { Component } from "react";
import "../resources/main.css";
import "../resources/cards.css";
const _ = require("lodash");

export class GameDiscardPile extends Component {
  createDiscardPile = () => {
    const { discardPile } = this.props.game;

    return discardPile.map((card, index) => {
      return (
        <div className="cardDivContainerMiddle" key={index}>
          <div
            className={"cardHorizontal " + card.value + "_" + card.color}
            style={this.setMiddleCard(card, index)}
          />
        </div>
      );
    });
  };

  setMiddleCard = (card, index) => {
    const game = this.props.game;
    if (index === 0) return;

    let player = _.find(game.players, player => {
      return player.position === card.playerDiscard;
    });
    let indPlayer = game.players.indexOf(player);

    let deg = ((index * 10 + index) * 10) % 360;
    let animation = "";

    switch (indPlayer) {
      case 0:
        animation = "bottomToCenter";
        break;
      case 1:
        animation = "rightToCenter";
        break;
      case 2:
        animation = "topToCenter";
        break;
      case 3:
        animation = "leftToCenter";
        break;
      default:
        break;
    }
    return {
      transform: `rotate(${deg}deg)`,
      animationName: animation,
      animationDuration: "0.7s"
    };
  };

  render() {
    const { game } = this.props;
    return game ? (
      <div id="middlediv">{this.createDiscardPile()}</div>
    ) : (
      <div />
    );
  }
}
export default GameDiscardPile;
