const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const path = require("path");
var bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(port, (req, res) => {
  fs.readdirSync(path.join(__dirname, "routes")).map(file => {
    require("./routes/" + file)(app);
  });

  console.log(`server listening on port: ${port}`);
  
});

module.exports = app;
