const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const bloggerSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 30,
      required: [true, "First name is required"],
    },
    lastname: {
      type: String,
      minlength: 3,
      maxlength: 30,
      trim: true,
      required: [true, "Last name is required"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minlength: [8, "invalid password"],
    },
    username: {
      type: String,
      trim: true,
      minlength: [3, "invalid username"],
      required: [true, "Username is required"],
      unique: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not supported",
      },
      default: "none",
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: (number) => {
        validator.isMobilePhone(number, "fa-IR");
      },
    },
    role: {
      type: String,
      enum: ["admin", "blogger"],
      default: "blogger",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// 
bloggerSchema.pre('save', function(next) {
  // console.log('pre save');

  let user = this._doc;
  if (this.isNew || this.isModified('password')) {
      bcrypt.genSalt(10, function(err, salt) {
          if (err) return next(err);
          bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) return next(err);
  
              user.password = hash;
  
              next();
          });
      });
  } else {
      next()
  }
 
});

bloggerSchema.post('save', function(doc, next) {


  next()
});
module.exports = mongoose.model("blogger", bloggerSchema);
