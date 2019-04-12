import React, { Component } from "react";
import "../resources/main.css";

export class GameArrows extends Component {
  setArrowsCurrentColor = () => {
    const { game } = this.props;
    let card = game.discardPile[game.discardPile.length - 1];
    let arrowurl = this.selectArrowImage(card.color, game.isReverse);
    const arrowRotation = game.isReverse ? "rightRotation" : "leftRotation";
    return (
      <div id="arrowsdiv">
        <img
          src={arrowurl}
          className={arrowRotation}
          id="arrowsimg"
          alt="arrows"
        />
      </div>
    );
  };

  selectArrowImage = (color, isReverse) => {
    const arrowblue = require("../resources/time_arrows_blue.png");
    const arrowreverseblue = require("../resources/time_reverse_arrows_blue.png");
    const arrowgreen = require("../resources/time_arrows_green.png");
    const arrowreversegreen = require("../resources/time_reverse_arrows_green.png");
    const arrowred = require("../resources/time_arrows_red.png");
    const arrowreversered = require("../resources/time_reverse_arrows_red.png");
    const arrowyellow = require("../resources/time_arrows_yellow.png");
    const arrowreverseyellow = require("../resources/time_reverse_arrows_yellow.png");

    if (isReverse) {
      switch (color) {
        case "Red":
          return arrowreversered;
        case "Blue":
          return arrowreverseblue;
        case "Yellow":
          return arrowreverseyellow;
        case "Green":
          return arrowreversegreen;
        default:
          break;
      }
    } else {
      switch (color) {
        case "Red":
          return arrowred;
        case "Blue":
          return arrowblue;
        case "Yellow":
          return arrowyellow;
        case "Green":
          return arrowgreen;
        default:
          break;
      }
    }
  };

  render() {
    const { game } = this.props;
    return game ? this.setArrowsCurrentColor() : <div />;
  }
}

export default GameArrows;
