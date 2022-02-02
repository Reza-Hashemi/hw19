const validator = require("validator");

function validate(req) {
  if (
    req.body.firstname &&
    req.body.lastname &&
    req.body.userName &&
    req.body.password &&
    validator.isStrongPassword(req.body.password) &&
    validator.isMobilePhone(req.body.phone, "fa-IR")
  ) {
    return true;
  }
  return false;
}

module.exports = validate;
