var express = require("express");
const { Mongoose } = require("mongoose");
var router = express.Router();
const blogger = require("../models/blogger");
const validate = require("../tools/bloggerValidation");

router.get("/", (req, res) => {
  if (req.session.user && req.cookies.blogger_sid) {
    const user = req.session.user;
    res.render("dashboard", { user });
  } else {
    res.redirect("/login");
  }
});

router.post("/", async (req, res) => {
 
  try {
    let user = false;
    if (req.body.username != req.session.user.username) {
      user = await blogger.findOne(req.body.username);
    }
    if (!user) {
      const newUser = await blogger.findByIdAndUpdate(
        req.session.user._id,
        req.body,
        { new: true }
      );
      req.session.user = newUser;
      res.redirect("/dashboard");
    } else {
      res.redirect("/dashboard");
    }
  } catch (error) {
    res.send(error);
  }
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("blogger_sid");
  res.redirect("/");
});

router.get('/deleteblogger',async (req,res)=>{
  if(req.session.user && req.cookies.blogger_sid){
    const userID = req.session.user._id;
    try {
      await blogger.findByIdAndDelete(userID);
      res.redirect('/dashboard/logout')
    } catch (error) {
      
    }
  }else{
    res.redirect('/')
  }
})

module.exports = router;
