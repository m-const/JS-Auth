require("dotenv").config();

//Interface for application logging.
 //TODO: replace this with a real logging tool

function log(msg, severity ='INFO') {
 
  const timeStamp = new Date();
  console.log(`[%s] %s - %s`, severity, timeStamp, msg);
  return;
}

module.exports = {
  log
};
