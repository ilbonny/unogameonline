import React, { Component } from "react";
import "../resources/main.css";
import axios from "axios";
import { routes } from '../config/serverRoutes'
import socketIo from "socket.io-client";

const socket = socketIo('http://localhost:5000');

export class Home extends Component {
  state = {
    username: "",
    players: [],
    playerHub: {},
    isNewUser: true,
    user: {},
    show: true
  };

  componentDidMount =()=>{   
    socket.on("RELOAD_USERS", (players)=>{
        this.setState({ players: players });
        console.log(players);
    })
  }

  //componentWillUnmount() {
  //  socket.off("get_data");
  //  socket.off("change_data");
  //}

  handleChangeValue = e => {
    let username = e.target.value;
    this.setState({ username: username });
  };

  addPlayer = () => {
    var user = {
      username: this.state.username,
      connectionHubId: socket.id,
      isAutomatic: false
    };
    this.callAddUser(user);
  };

  addAutomaticPlayer = () => {
    var user = {
      username: "P_" + Math.random().toString(36).substr(2, 9),
      connectionHubId: "",
      isAutomatic: true
    };
    this.callAddUser(user);
  };

  callAddUser = user => {
    axios
      .post(routes().users + "/add", user)
      .then(e => {
        this.user = e.data;
        socket.emit("RELOAD_USERS");
        //this.playerHub.server.startGame();
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const { username } = this.state;

    return (
      <div className="container">
        <div className="row marginBottom20">
          <h1>Uno Game</h1>
        </div>
        <div className="row marginBottom20">
          <div>
            <div className="form-group">
              <label>User Name</label>
              <input
                className="form-control"
                id="username"
                value={username}
                onChange={this.handleChangeValue}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.addPlayer}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="row marginBottom20">
          <button type="submit" className="btn btn-info">
            Add Automatic Player
          </button>
        </div>
        <div className="row marginBottom20 colorGreen">
          <h3>Waiting for players...</h3>
        </div>
        <div className="row marginBottom20">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Player</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Home;
