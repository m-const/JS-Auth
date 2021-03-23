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
const jwt = require("jsonwebtoken");


function authorizeClientID (client_id,redirect_uri="",scope,state){

}


const router = express.Router();

router.post("/authorization", (req, res) => {
  const responseType = req.body.response_type;
  //TODO: make this extendable to allow for a registered extension value as described by Section 8.4.

  //MUST be one of "code"  or "token"
  const validResponseTypes = ["code", "token"];
  if (validResponseTypes.includes(responseType)) {
  let responseObject;
   switch (responseType) {
    
      case "code":
         //Authorization Code Grant

         //Validate required parameters are present


         //Validate the client ID
         responseObject = authorizeClientID();

      break;

   }
  res.status(200).set("Content-Type","application/x-www-form-urlencoded").json(responseObject)
  }else{
          res.status(400).set("Content-Type","application/x-www-form-urlencoded").json(error("invalid_request"))
    }

});

module.exports = router;
