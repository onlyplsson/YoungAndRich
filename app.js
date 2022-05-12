const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//router
const voteRouter = require("./routes/vote.js");

//routes
app.use("/vote", voteRouter);

//미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: false }));

//페이지 이동
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/main.html");
});

app.listen(3000, () => console.log("Server Start!"));
