var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/main.html");
});
app.get("/lunchvote", function (req, res) {
  res.sendFile(__dirname + "/lunchvote.html");
});
app.get("/menu", function (req, res) {
  res.sendFile(__dirname + "/menu.html");
});

app.listen(3000, () => console.log("Port 3000 start!!"));
