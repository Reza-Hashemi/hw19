var express = require("express");
var router = express.Router();
const login = require("./login");
const dashboard = require("./dashboard");
const signup = require("./signup");

router.use("/login", login);
router.use("/dashboard", dashboard);
router.use("/signup", signup);

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
