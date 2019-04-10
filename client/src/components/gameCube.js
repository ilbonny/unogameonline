import React, { Component } from "react";
import "../resources/main.css";

export class GameCube extends Component {

selectColor  = (color)=>{

}

  render() {
    return (
      <div id="cubediv">
        <img
          src="../resources/cubeblue.png"
          alt="cubeblue"
          onClick={this.selectColor("blue")}
        />
        <img
          src="../resources/cubegreen.png"
          alt="cubegreen"
          onClick={this.selectColor("green")}
        />
        <img
          src="../resources/cubered.png"
          alt="cubered"
          onClick={this.selectColor("red")}
        />
        <img
          src="../resources/cubeyellow.png"
          alt="cubeyellow"
          onClick={this.selectColor("yellow")}
        />
      </div>
    );
  }
}

export default GameCube;
