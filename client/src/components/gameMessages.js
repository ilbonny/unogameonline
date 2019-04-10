import React, { Component } from "react";
import "../resources/main.css";

export class GameMessages extends Component {
  render() {
    const { game } = this.props;
    return game ? (
      <div id="messagediv">
        <p id="messagep">{game.message}</p>
      </div>
    ) : (
      <div />
    );
  }
}

export default GameMessages;
