import React, { Component } from "react";
import Home from "./components/homePage";
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
    const { socket } = this.state
    return (
      <div className="App">
          <Home socket={socket} />
      </div>      
    );
  }
}

export default App;
