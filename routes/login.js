const bcrypt = require("bcryptjs/dist/bcrypt");
var express = require("express");
var router = express.Router();
const blogger = require("../models/blogger");

router.get("/", (req, res) => {
  if (req.session.user && req.cookies.blogger_sid) {
    res.redirect("/dashboard");
  } else {
    res.render("login", { msg: null });
  }
});

router.post("/", async (req, res) => {
  
  try {
    const user = await blogger.findOne({
      username: req.body.username,
    });
    if (user) {
      const password = req.body.password;
      const result = bcrypt.compare(password, user.password);
      if (result) {
        req.session.user = user;
      res.redirect("/dashboard");
      }
      
    } else {
      return res.render("login", { msg: "username or password is wrong" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
