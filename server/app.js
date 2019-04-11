const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const socketManager = require('./socketManager');

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
socketManager.connect(io);

app.set('port', port)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/static*", function(req, res) {
  const filePath = path.join(__dirname, `../client/build/static/${req.params[0]}`);
  res.sendFile(filePath);  
});

app.get("/", function(req, res) {
 res.sendFile(path.join(__dirname, "../client/build/index.html"));  
});


server.listen(app.get('port'), () => {
      fs.readdirSync(path.join(__dirname, "routes")).map(file => {
      require("./routes/" + file)(app);
    });
  console.log(`server on port ${app.get('port')}`);
});

io.on("disconnect", () => console.log("Client disconnected"));

module.exports = {app};