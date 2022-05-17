var express = require("express");
var app = express();
var ejs = require("ejs");
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");
const conn = require("../database");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extends: false }));

router.get("/", function (req, res) {
  try {
    var sql = `select count(menu_name) as total from VOTE;`;
    conn.query(sql, (err, rows, fields) => {
      var total = rows[0].total;
      res.render(path.join(__dirname, "../views/vote.ejs"), {
        total: `(참여인원 : ${total})`,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", function (req, res) {
  try {
    var user = req.body.user;
    var choice = req.body.choice;

    var sql = `update VOTE set menu_name='${choice}' where user_name='${user}';`;
    conn.query(sql, (err, rows, fields) => {
      if (err) {
        res.send(
          "<script>alert('이미 투표를 하셨습니다.');location.href='../vote/';</script>"
        );
        console.log(err);
      } else {
        res.send(
          "<script>alert('투표 완료');location.href='../vote';</script>"
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/result", function (req, res) {
  try {
    var sql = `SELECT menu_name, COUNT(menu_name) AS cnt_menu FROM VOTE WHERE menu_name IS NOT NULL GROUP BY menu_name ;`;
    conn.query(sql, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.render(path.join(__dirname, "../views/result.ejs"), {
          rows: rows,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/order", function (req, res) {
  try {
    res.render(path.join(__dirname, "../views/menu.ejs"));
  } catch (err) {
    console.log(err);
  }
});

router.post("/order/save", function (req, res) {
  try {
    var user = req.body.user;
    var menu = req.body.menu;

    var sql = `update CHOICE set order_name='${menu}' where user_name='${user}';`;
    conn.query(sql, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send("<script>alert('저장 완료');location.href='../';</script>");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/order_list", function (req, res) {
  try {
    var sql = `select * from CHOICE;`;

    conn.query(sql, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.render(path.join(__dirname, "../views/order.ejs"), {
          rows: rows,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/reset", function (req, res) {
  try {
    var sql =
      `UPDATE VOTE SET menu_name = NULL;` +
      `UPDATE CHOICE SET order_name = NULL;`;

    conn.query(sql, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(
          "<script>alert('초기화 완료');location.href='../vote';</script>"
        );
        return 0;
      }
    });
  } catch (err) {
    console.log(err);
  }
});
//test123
module.exports = router;
