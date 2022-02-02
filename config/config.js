const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/hw18final")
  .then(() => console.log("mongodb connected successfully."))
  .catch((err) => console.log(err));