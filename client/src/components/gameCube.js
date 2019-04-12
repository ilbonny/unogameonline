import React, { Component } from "react";
import "../resources/main.css";

export class GameCube extends Component {
  selectColor = (e) => {
    this.props.selectColor(e.target.id);
  };

  render() {
    const { showColorCube } = this.props;
    return showColorCube ? (
      <div id="cubediv">
        <img
          src={require("../resources/cubeblue.png")}
          alt="cubeblue"
          onClick={this.selectColor}
          id='Blue'
        />
        <img
          src={require("../resources/cubegreen.png")}
          alt="cubegreen"
          onClick={this.selectColor}
          id='Green'
        />
        <img
          src={require("../resources/cubered.png")}
          alt="cubered"
          onClick={this.selectColor}
          id='Red'
        />
        <img
          src={require("../resources/cubeyellow.png")}
          alt="cubeyellow"
          onClick={this.selectColor}
          id='Yellow'
        />
      </div>
    ) : (
      <div />
    );
  }
}

export default GameCube;
