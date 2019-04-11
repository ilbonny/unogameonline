import React, { Component } from "react";
import "../resources/main.css";

export class GameDeck extends Component {
  drawDeck = () => {
    const {socket, gameId} = this.props;
    socket.emit("DRAWING_DECK", {
      gameId: gameId
    });
  };

  render() {
    return (
      <div id="deckdiv">
        <img src={require('../resources/deck.jpg')} alt="deck" onClick={this.drawDeck} />
      </div>
    );
  }
}
export default GameDeck;
