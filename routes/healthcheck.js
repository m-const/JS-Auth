require("dotenv").config();
const log = require("../utils/logger.js").log;
const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");
const redis = require("redis");
const redisClient = redis.createClient({
  port: process.env.REDISPORT,
  host: process.env.REDISHOST,
  user: process.env.REDISUSER,
  password: process.env.REDISPASS,
  retry_strategy: function (options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
});
redisClient.on("error", function (error) {
  log(error, "ERROR");
});

router.get("/", (req, res) => {
  const mongoStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Unavailable";
  const redisStatus = redisClient.connected ? "Connected" : "Unavailable";
  const responseObject = {
    "Application PORT:": process.env.PORT,
    "Mongo DB Status:": mongoStatus,
    "REDIS Status": redisStatus,
  };
  res.status(200).json(responseObject).end();
  return;
});

module.exports = router;
