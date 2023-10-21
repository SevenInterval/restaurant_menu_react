const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

//mongodb connection
const mongoUrl = "mongodb+srv://ridvanozturk94:RID123van.@cluster0.rlcso9m.mongodb.net/restaurant_menu?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

mongoose.set(`strictQuery`, true);

module.exports = {
  mongoose
}