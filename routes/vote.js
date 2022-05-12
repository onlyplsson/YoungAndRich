var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");
const conn = require("../database");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extends: false }));

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../" + "/vote.html"));
});

router.post("/", function (req, res) {
  try {
    var user = req.body.user;
    var choice = req.body.choice;

    var sql = `insert into VOTE values ('${user}', '${choice}');`;

    conn.query(sql, (err, rows, fields) => {
      if (err) {
        res.status(400).send({ err });
        return 0;
      }
      console.log(rows);
    });
    var sql = `select menu_name, count(menu_name) from VOTE group by menu_name;`;
    conn.query(sql, (err, rows, fields) => {
      if (err) {
        res.status(400).send({ err });
        return 0;
      }
      res.send(rows);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
