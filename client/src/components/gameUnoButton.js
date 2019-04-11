import React, { Component } from "react";
import "../resources/main.css";

export class GameUnoButton extends Component {
  declareUno = () => {};

  render() {
    return (
      <div id="unobuttondiv">
        <img
          src={require('../resources/buttonUno.png')}
          alt="buttonUno"
          onClick={this.declareUno()}
        />
      </div>
    );
  }
}
export default GameUnoButton;
