import React, { Component } from "react";
import "../resources/main.css";
import "../resources/cards.css";
import { isRegExp } from "util";

export class GameDiscardPile extends Component {
  createDiscardPile = () => {
    const { discardPile } = this.props.game;

    return discardPile.map((card, index) => {
      return (
        <div className="cardDivContainerMiddle" key={index}>
          <div
            className={'cardHorizontal ' + card.value + '_' + card.color}
            style={this.setMiddleCard(card, index)}            
          />
        </div>
      );
    });
  };

  setMiddleCard = (card, index) => {
    if (index === 0) return;

    var deg = ((index * 10 + index) * 10) % 360;
    var animation = "";
    switch (card.playerDiscard) {
      case this.player1.Position:
        animation = "bottomToCenter";
        break;
      case this.player2.Position:
        animation = "rightToCenter";
        break;
      case this.player3.Position:
        animation = "topToCenter";
        break;
      case this.player4.Position:
        animation = "leftToCenter";
        break;
    }
    return {
      transform: `rotate(${deg}"deg")`,
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
