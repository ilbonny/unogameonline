import React, { Component } from "react";
import "../resources/main.css";

export class GameUser extends Component {
  createUsers = () => {
    const { game } = this.props;
    const { players } = game;
    return (
      <div>
        <div
          id="playerBottom" style={this.setBgStylePlayer(players[0].position)}        >
          <img src="../resources/Player.png" height="150" alt="userimg" />
          <div className="playerName">{players[0].user.username}</div>
        </div>
        <div
          id="playerRight" style={this.setBgStylePlayer(players[1].position)}>
          <img src="../resources/Player.png" height="150" alt="userimg" />
          <div className="playerName">{players[1].user.username}</div>
        </div>
        <div id="playerTop" style={this.setBgStylePlayer(players[2].position)}>
          <img src="../resources/Player.png" height="150" alt="userimg" />
          <div className="playerName">{players[2].user.username}</div>
        </div>
        <div id="playerLeft" style={this.setBgStylePlayer(players[3].position)}>
          <img src="../resources/Player.png" height="150" alt="userimg" />
          <div className="playerName">{players[3].user.username}</div>
        </div>
      </div>
    );
  };

  setBgStylePlayer = num => {
    const { game } = this.props;
    return game.currentPlayer != null && game.currentPlayer.position === num
         ? { backgroundColor:'lightgreen' }
         : {};
  };

  render() {
    const { game } = this.props;
    return game ? this.createUsers() : <div />;
  }
}

export default GameUser;