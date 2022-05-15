const express = require("express");
const app = express();
var path = require("path");
const bodyParser = require("body-parser");

//router
const voteRouter = require("./routes/vote.js");

//routes
app.use("/vote", voteRouter);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

//미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: false }));

//페이지 이동
app.get("/", function (req, res) {
  res.render(__dirname + "/views/main.ejs");
});

app.listen(3000, () => console.log("Server Start!"));
