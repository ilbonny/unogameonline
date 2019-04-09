import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/homePage";
import Game from "./components/gamePage";
import io from "socket.io-client";

const socketUrl = "http://localhost:5000"

class App extends Component {
  state = {
    socket : null
  };

  componentWillMount() {
		this.initSocket()
  }
  
  initSocket = ()=>{
		const socket = io(socketUrl)

		socket.on('connect', ()=>{
			console.log("Connected");
		})
		
		this.setState({socket})
  }
  
  render() {
    const { socket } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => <Home socket={socket} />} />
            <Route path="/game" render={() => <Game socket={socket} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
