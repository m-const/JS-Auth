require('dotenv').config();
const log = require('./utils/logger.js').log;
const express = require("express");
const app = express();


app.use(express.json())

//ROUTES
app.use("/", require("./routes/methods"));

//Start the server
const serverPort = process.env.PORT || 5000
app.listen(serverPort,log(`Server Started on PORT: ${serverPort}`))