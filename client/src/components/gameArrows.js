import React, { Component } from "react";
import "../resources/main.css";


export class GameArrows extends Component {
  setArrowsCurrentColor = () => {
    const { game } = this.props;
    let card = game.discardPile[game.discardPile.length - 1];
    let arrowurl = game.isReverse
      ? `../resources/time_reverse_arrows_${card.color}.png`
      : `../resources/time_arrows_${card.color}.png`;

    const arrowRotation = game.isReverse ? "rightRotation" : "leftRotation";
    return (
      <div id="arrowsdiv">
        <img
          src={require('../resources/time_arrows_blue.png')}
          className={arrowRotation}
          id="arrowsimg"
          alt="arrows"
        />
      </div>
    );
  };

  render() {
    const { game } = this.props;
    return game ? this.setArrowsCurrentColor() : <div />;
  }
}

export default GameArrows;
