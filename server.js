require('dotenv').config();
const log = require('./utils/logger.js').log;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = process.env.MONGOURI;//require("./config/setup").MongoURI;

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify : false })
  .then(() => log("MongoDB Connected..."))
  .catch((err) => console.error(err));

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
//ROUTES
app.use("/", require("./routes/authorization"));

//Start the server
const serverPort = process.env.PORT || 5000
app.listen(serverPort,log(`Server Started on PORT: ${serverPort}`))
