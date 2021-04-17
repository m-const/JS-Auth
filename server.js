require('dotenv').config();
const log = require('./utils/logger.js').log;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = process.env.MONGOURI;

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify : false })
  .then(() => log("MongoDB Connected..."))
  .catch((err) => log(err,"ERROR"));
  
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
//ROUTES
app.use("/", require("./routes/authorization"));
app.use("/healthcheck", require("./routes/healthcheck"));
//Start the server

const serverPort = process.env.PORT || 5000
app.listen(serverPort,log(`Server Started on PORT: ${serverPort}`))
