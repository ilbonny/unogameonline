const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const socketManager = require('./socketManager');

const port = process.env.PORT || 5000;
const app = express()
const server = http.createServer(app)
const io = socketIo(server);

io.on('connection', socketManager)

app.set('port', port)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(app.get('port'), () => {
      fs.readdirSync(path.join(__dirname, "routes")).map(file => {
      require("./routes/" + file)(app);
    });
  console.log(`server on port ${app.get('port')}`);
});

io.on("disconnect", () => console.log("Client disconnected"));

module.exports = app;