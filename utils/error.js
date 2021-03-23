//Common library for compliant error response
// https://tools.ietf.org/html/rfc6749#section-4.1.2.1
/*
Error Response

   If the request fails due to a missing, invalid, or mismatching
   redirection URI, or if the client identifier is missing or invalid,
   the authorization server SHOULD inform the resource owner of the
   error and MUST NOT automatically redirect the user-agent to the
   invalid redirection URI.

   If the resource owner denies the access request or if the request
   fails for reasons other than a missing or invalid redirection URI,
   the authorization server informs the client by adding the following
   parameters to the query component of the redirection URI using the
   "application/x-www-form-urlencoded" format, per Appendix B:

   error
         REQUIRED.  A single ASCII [USASCII] error code from the
         following:

         invalid_request
               The request is missing a required parameter, includes an
               invalid parameter value, includes a parameter more than
               once, or is otherwise malformed.

         unauthorized_client
               The client is not authorized to request an authorization
               code using this method.

         access_denied
               The resource owner or authorization server denied the
               request.

         unsupported_response_type
               The authorization server does not support obtaining an
               authorization code using this method.

         invalid_scope
               The requested scope is invalid, unknown, or malformed.

         server_error
               The authorization server encountered an unexpected
               condition that prevented it from fulfilling the request.
               (This error code is needed because a 500 Internal Server
               Error HTTP status code cannot be returned to the client
               via an HTTP redirect.)

         temporarily_unavailable
               The authorization server is currently unable to handle
               the request due to a temporary overloading or maintenance
               of the server.  (This error code is needed because a 503
               Service Unavailable HTTP status code cannot be returned
               to the client via an HTTP redirect.)

         Values for the "error" parameter MUST NOT include characters
         outside the set %x20-21 / %x23-5B / %x5D-7E.

   error_description
         OPTIONAL.  Human-readable ASCII [USASCII] text providing
         additional information, used to assist the client developer in
         understanding the error that occurred.
         Values for the "error_description" parameter MUST NOT include
         characters outside the set %x20-21 / %x23-5B / %x5D-7E.

   error_uri
         OPTIONAL.  A URI identifying a human-readable web page with
         information about the error, used to provide the client
         developer with additional information about the error.
         Values for the "error_uri" parameter MUST conform to the
         URI-reference syntax and thus MUST NOT include characters
         outside the set %x21 / %x23-5B / %x5D-7E.

   state
         REQUIRED if a "state" parameter was present in the client
         authorization request.  The exact value received from the
         client.

   For example, the authorization server redirects the user-agent by
   sending the following HTTP response:

    HTTP/1.1 302 Found
   Location: https://client.example.com/cb?error=access_denied&state=xyz */

const log = require("../utils/logger.js").log;

function error(
  errorSTR,
  traceability = "",
  error_uri = "",
  state = ""
) {
  //state must be passed through
  //TODO: error_uri logic/routing
  //traceability is only passed through for logging - this should be a helpful string for determining why an error response was given when reviewing logs - ex. client_id
  var errorCode;
  var errorDescription ;
  switch (errorSTR) {
    
    case "invalid_request":
       errorCode = "invalid_request";
       errorDescription =
        "The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.";
      break;
    case "unauthorized_client":
       errorCode = "unauthorized_client";
       errorDescription =
        "The client is not authorized to request an authorization code using this method.";
      break;
    case "access_denied":
       errorCode = "access_denied";
       errorDescription =
        "The resource owner or authorization server denied the request.";
      break;

    case "unsupported_response_type":
       errorCode = "unsupported_response_type";
       errorDescription =
        "The authorization server does not support obtaining an authorization code using this method.";
      break;
    case "invalid_scope":
       errorCode = "invalid_scope";
       errorDescription =
        "The requested scope is invalid, unknown, or malformed.";
      break;
    case "server_error":
       errorCode = "server_error";
       errorDescription =
        "The authorization server encountered an unexpected condition that prevented it from fulfilling the request.";
      break;
    case "temporarily_unavailable":
       errorCode = "temporarily_unavailable";
       errorDescription =
        "The authorization server is currently unable to handle the request due to a temporary overloading or maintenance of the server.";
      break;

    default:
      log(
        `Invalid error response code. Traceability: ${traceability}`,
        "ERROR"
      );
  }

  const errorResponseObject = {
    error: errorCode,
    error_description: errorDescription,
    error_uri: error_uri,
    state: state,
  };
  log(
    `${errorResponseObject.error} ${errorResponseObject.error_uri} ${errorResponseObject.state} Traceability: ${traceability}`,
    "INFO"
  );
  return errorResponseObject;
}

module.exports = {
  error,
};
