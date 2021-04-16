//https://tools.ietf.org/html/rfc6749#section-4.1

//Authorization Endpoint

//This endpoint handles two types
/*
   The authorization code grant type is used to obtain both access
   tokens and refresh tokens and is optimized for confidential clients.
   Since this is a redirection-based flow, the client must be capable of
   interacting with the resource owner's user-agent (typically a web
   browser) and capable of receiving incoming requests (via redirection)
   from the authorization server.

     +----------+
     | Resource |
     |   Owner  |
     |          |
     +----------+
          ^
          |
         (B)
     +----|-----+          Client Identifier      +---------------+
     |         -+----(A)-- & Redirection URI ---->|               |
     |  User-   |                                 | Authorization |
     |  Agent  -+----(B)-- User authenticates --->|     Server    |
     |          |                                 |               |
     |         -+----(C)-- Authorization Code ---<|               |
     +-|----|---+                                 +---------------+
       |    |                                         ^      v
      (A)  (C)                                        |      |
       |    |                                         |      |
       ^    v                                         |      |
     +---------+                                      |      |
     |         |>---(D)-- Authorization Code ---------'      |
     |  Client |          & Redirection URI                  |
     |         |                                             |
     |         |<---(E)----- Access Token -------------------'
     +---------+       (w/ Optional Refresh Token)

   Note: The lines illustrating steps (A), (B), and (C) are broken into
   two parts as they pass through the user-agent.

*/

/* Valid Request - Authorization Code Grant Type:
The client constructs the request URI by adding the following
   parameters to the query component of the authorization endpoint URI
   using the "application/x-www-form-urlencoded" format, per Appendix B:

   response_type
         REQUIRED.  Value MUST be set to "code".

   client_id
         REQUIRED.  The client identifier as described in Section 2.2.

   redirect_uri
         OPTIONAL.  As described in Section 3.1.2.

   scope
         OPTIONAL.  The scope of the access request as described by
         Section 3.3.

   state
         RECOMMENDED.  An opaque value used by the client to maintain
         state between the request and callback.  The authorization
         server includes this value when redirecting the user-agent back
         to the client.  The parameter SHOULD be used for preventing
         cross-site request forgery as described in Section 10.12.

*/

require("dotenv").config();

const express = require("express");
const log = require("../utils/logger.js").log;
const error = require("../utils/error.js").error;
const validateParam = require("../utils/validation.js").validateParam;
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

//validate client ID
const AuthorizedClients = require("../models/authorizedClients");
function authorizeClientID(client_id, redirect_uri = "", scope, state) {
  AuthorizedClients.findOne({ email: email.toUpperCase() }).then((user) => {
  });
}

const router = express.Router();
//TODO: move this to a HC method and refactor
router.get("/healthcheck", (req, res) => {
  
const mongoStatus = (mongoose.connection.readyState === 1) ? "Connected" : "Unavailable";

  const responseObject = {
      "PORT:":process.env.PORT,
      "Mongo DB Status:" : mongoStatus
  }


  res
  .status(200)
  .json(responseObject)
  .end();
return;
});

router.post("/authorization", (req, res) => {
  //TODO: make response type extendable to allow for a registered extension value as described by Section 8.4.
  //get the required Params
  ({ response_type, client_id, redirect_uri, scope, state } = req.body);
  //validate the Provided Params
  let isValidRequest = true;

  // response_type

  // Response type MUST be one of "code"  or "token"
  const validTypes = RegExp(/^(code|token){1}$/);
  const responseTypeCheck = validTypes.exec(response_type);
  if (responseTypeCheck == null) {
    isValidRequest = false;
    log(`response_type was invalid. Provided: "${response_type}"`);
  }

  //client_id
  if (validateParam(client_id) === false) {
    isValidRequest = false;
    log(`client_id was invalid. Provided: "${client_id}"`);
  }

  //redirect_uri
  if (validateParam(redirect_uri, "URI") === false) {
    isValidRequest = false;
    log(`redirect_uri was invalid. Provided: "${redirect_uri}"`);
  }

  //scope
  if (validateParam(scope, "scope") === false) {
    isValidRequest = false;
    log(`scope was invalid. Provided: "${scope}"`);
  }

  //state
  if (validateParam(state) === false) {
    isValidRequest = false;
    log(`scope was invalid. Provided: "${state}"`);
  }

  //see if any of the request params failed validation
  if (!isValidRequest) {
    // Return a 400 and invalid_request message
    res
      .status(400)
      .set("Content-Type", "application/x-www-form-urlencoded")
      .json(error("invalid_request", client_id ?? "unknown client"))
      .end();
    return;
  }

  if (response_type === "code") {
    //Authorization Code Grant

    //Authorize the client ID
    responseObject = "code"; //authorizeClientID(client_id,redirect_uri,scope,state);

    //return the response
    res
      .status(200)
      .set("Content-Type", "application/x-www-form-urlencoded")
      .json(responseObject)
      .end();
    return;
  }
  if (response_type === "token") {
    // implicit grant

    //Authorize the client ID
    responseObject = "token"; //authorizeClientID(client_id,redirect_uri,scope,state);

    //return the response
    res
      .status(200)
      .set("Content-Type", "application/x-www-form-urlencoded")
      .json(responseObject)
      .end();
    return;
  }
});

module.exports = router;
