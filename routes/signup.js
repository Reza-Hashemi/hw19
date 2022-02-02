var express = require("express");
var router = express.Router();
const blogger = require("../models/blogger");
const validate = require("../tools/bloggerValidation");
const bcrypt = require('bcryptjs');
router.get("/", (req, res) => {
  if (req.session.user && req.cookies.blogger_sid) {
    res.redirect("/dashboard");
  } else {
    res.render("signup", { msg: null });
  }
});
router.post("/", (req, res) => {
 
  if (
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.username ||
    !req.body.password ||
    !req.body.phone
  ) {
    return res.render("signup", { msg: "fill the inputs" });
  }

  if (req.body.password.length < 8) {
    return res.render("signup", { msg: "password is no aceptable" });
  }

  blogger.findOne({ username: req.body.username.trim() }, (err, existUser) => {
    if (err) {
      return res.render("signup", { msg: "username is not acceptable" });
    }

    if (existUser) {
      return res.render("signup", { msg: "username already token" });
    }
    bcrypt.genSalt(10, function(err,salt){
      if(err) return res.render('signup', {msg: "somthing wrong"})
      bcrypt.hash(req.body.password, salt, function(err, hash){
        if(err) return res.render('signup', {msg: "somthing wrong"})
        const NEW_BLOGGER = new blogger({
          username: req.body.username,
          lastname: req.body.lastname,
          firstname: req.body.firstname,
          password:hash,
          phone: req.body.phone,
          gender: req.body.gender,
        });
    
        NEW_BLOGGER.save((err, user) => {
          if (err) {
            return res.render("signup", { msg: err.message });
          }
    
          res.redirect("/login");
        });
      })
    })  
   
  });
});

module.exports = router;
