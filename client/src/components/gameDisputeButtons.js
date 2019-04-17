import React, { Component } from "react";
import "../resources/main.css";

export class GameDisputeButtons extends Component {
  challengeDrawFour = e => {
    this.props.challengeDrawFour(e.target.id)
  };

  render() {
    const { isRequestChallenge } = this.props;
    return isRequestChallenge ? (
       <div id="disputeButtons">
        <button
          id="yes"
          type="button"
          className="btn btn-outline-primary"
          onClick={this.challengeDrawFour}>
          Yes
        </button>
        <button
          id='no'
          type="button"
          className="btn btn-outline-secondary"
          onClick={this.challengeDrawFour}>
          No
        </button>
      </div>) : (
      <div />
    );
  }
}
export default GameDisputeButtons;
