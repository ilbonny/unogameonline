import React, { Component } from "react";
import "../resources/main.css";

export class GameCube extends Component {

selectColor  = (color)=>{

}

  render() {
    return (
      <div id="cubediv">
        <img
          src={require('../resources/cubeblue.png')}
          alt="cubeblue"
          onClick={this.selectColor("blue")}
        />
        <img
          src={require('../resources/cubegreen.png')}
          alt="cubegreen"
          onClick={this.selectColor("green")}
        />
        <img
          src={require('../resources/cubered.png')}
          alt="cubered"
          onClick={this.selectColor("red")}
        />
        <img
          src={require('../resources/cubeyellow.png')}
          alt="cubeyellow"
          onClick={this.selectColor("yellow")}
        />
      </div>
    );
  }
}

export default GameCube;
