import React, { Component } from "react";
import "../resources/main.css";
import axios from "axios";
import { routes } from "../config/serverRoutes";

export class Home extends Component {
  state = {
    username: "",
    players: [],
    playerHub: {},
    isNewUser: true,
    user: {},
    show: true
  };

  componentDidMount = () => {
    this.reloadUsers();
  };

  //componentWillUnmount() {
  //  socket.off("get_data");
  //  socket.off("change_data");
  //}

  reloadUsers = () => {
    const { socket } = this.props;
    socket.on("RELOAD_USERS", players => {
      this.setState({ players: players });
      console.log(players);
    });
  };

  handleChangeValue = e => {
    let username = e.target.value;
    this.setState({ username: username });
  };

  addPlayer = () => {
    var user = {
      username: this.state.username,
      connectionHubId: this.props.socket.id,
      isAutomatic: false
    };
    this.callAddUser(user);
  };

  addAutomaticPlayer = () => {
    var user = {
      username:
        "P_" + Math.random().toString(36).substr(2, 9),
      connectionHubId: "",
      isAutomatic: true
    };
    this.callAddUser(user);
  };

  callAddUser = user => {
    const { socket } = this.props;
    axios
      .post(routes().users + "/add", user)
      .then(e => {
        this.user = e.data;
        socket.emit("RELOADING_USERS");
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const { username, players } = this.state;
    const listPlayers = players ? (
      players.map((player, index) => {
        return (
          <tr key={index}>
            <td>{player.username}</td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td>
          <h3>Waiting for players...</h3>
        </td>
      </tr>
    );

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
        <div className="row marginBottom20">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Player</th>
              </tr>
            </thead>
            <tbody>{listPlayers}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Home;
