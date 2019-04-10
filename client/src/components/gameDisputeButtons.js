import React, { Component } from "react";
import "../resources/main.css";

export class GameDisputeButtons extends Component {
  challengeDrawFour = choice => {};

  render() {
    return (
      <div id="disputeButtons">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={this.challengeDrawFour(true)}
        >
          Yes
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={this.challengeDrawFour(false)}
        >
          No
        </button>
      </div>
    );
  }
}
export default GameDisputeButtons;
