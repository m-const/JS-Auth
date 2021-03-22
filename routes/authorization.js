//https://tools.ietf.org/html/rfc6749#section-3.1

// 3.1.  Authorization Endpoint

/*    The authorization endpoint is used to interact with the resource
   owner and obtain an authorization grant.  The authorization server
   MUST first verify the identity of the resource owner.  The way in
   which the authorization server authenticates the resource owner
   (e.g., username and password login, session cookies) is beyond the
   scope of this specification. */

/*    The means through which the client obtains the location of the
   authorization endpoint are beyond the scope of this specification,
   but the location is typically provided in the service documentation. */

/*    The endpoint URI MAY include an "application/x-www-form-urlencoded"
   formatted (per Appendix B) query component ([RFC3986] Section 3.4),
   which MUST be retained when adding additional query parameters.  The
   endpoint URI MUST NOT include a fragment component. */

/*    Since requests to the authorization endpoint result in user
   authentication and the transmission of clear-text credentials (in the
   HTTP response), the authorization server MUST require the use of TLS
   as described in Section 1.6 when sending requests to the
   authorization endpoint. */

/*    The authorization server MUST support the use of the HTTP "GET"
   method [RFC2616] for the authorization endpoint and MAY support the
   use of the "POST" method as well. */

/*    Parameters sent without a value MUST be treated as if they were
   omitted from the request.  The authorization server MUST ignore
   unrecognized request parameters.  Request and response parameters
   MUST NOT be included more than once. */

//3.1.1.  Response Type

/*    The authorization endpoint is used by the authorization code grant
   type and implicit grant type flows.  The client informs the
   authorization server of the desired grant type using the following
   parameter: */

/*    response_type
         REQUIRED.  The value MUST be one of "code" for requesting an
         authorization code as described by Section 4.1.1, "token" for
         requesting an access token (implicit grant) as described by
         Section 4.2.1, or a registered extension value as described by
         Section 8.4. */

/*    Extension response types MAY contain a space-delimited (%x20) list of
   values, where the order of values does not matter (e.g., response
   type "a b" is the same as "b a").  The meaning of such composite
   response types is defined by their respective specifications. */

/*    If an authorization request is missing the "response_type" parameter,
   or if the response type is not understood, the authorization server
   MUST return an error response as described in Section 4.1.2.1. */

//3.1.2.  Redirection Endpoint

/*    After completing its interaction with the resource owner, the
   authorization server directs the resource owner's user-agent back to
   the client.  The authorization server redirects the user-agent to the
   client's redirection endpoint previously established with the
   authorization server during the client registration process or when
   making the authorization request. */

/*    The redirection endpoint URI MUST be an absolute URI as defined by
   [RFC3986] Section 4.3.  The endpoint URI MAY include an
   "application/x-www-form-urlencoded" formatted (per Appendix B) query
   component ([RFC3986] Section 3.4), which MUST be retained when adding
   additional query parameters.  The endpoint URI MUST NOT include a
   fragment component.
 */
//3.1.2.1.  Endpoint Request Confidentiality

/*    The redirection endpoint SHOULD require the use of TLS as described
   in Section 1.6 when the requested response type is "code" or "token",
   or when the redirection request will result in the transmission of
   sensitive credentials over an open network.  This specification does
   not mandate the use of TLS because at the time of this writing,
   requiring clients to deploy TLS is a significant hurdle for many
   client developers.  If TLS is not available, the authorization server
   SHOULD warn the resource owner about the insecure endpoint prior to
   redirection (e.g., display a message during the authorization
   request).
 */
/*    Lack of transport-layer security can have a severe impact on the
   security of the client and the protected resources it is authorized
   to access.  The use of transport-layer security is particularly
   critical when the authorization process is used as a form of
   delegated end-user authentication by the client (e.g., third-party
   sign-in service). */

//3.1.2.2.  Registration Requirements

/*    The authorization server MUST require the following clients to
   register their redirection endpoint:

   o  Public clients.

   o  Confidential clients utilizing the implicit grant type.

   The authorization server SHOULD require all clients to register their
   redirection endpoint prior to utilizing the authorization endpoint. */

/*    The authorization server SHOULD require the client to provide the
   complete redirection URI (the client MAY use the "state" request
   parameter to achieve per-request customization).  If requiring the
   registration of the complete redirection URI is not possible, the
   authorization server SHOULD require the registration of the URI
   scheme, authority, and path (allowing the client to dynamically vary
   only the query component of the redirection URI when requesting
   authorization). */

/*    The authorization server MAY allow the client to register multiple
   redirection endpoints. */

  /*  Lack of a redirection URI registration requirement can enable an
   attacker to use the authorization endpoint as an open redirector as
   described in Section 10.15. */

//3.1.2.3.  Dynamic Configuration

/*    If multiple redirection URIs have been registered, if only part of
   the redirection URI has been registered, or if no redirection URI has
   been registered, the client MUST include a redirection URI with the
   authorization request using the "redirect_uri" request parameter. */

/*    When a redirection URI is included in an authorization request, the
   authorization server MUST compare and match the value received
   against at least one of the registered redirection URIs (or URI
   components) as defined in [RFC3986] Section 6, if any redirection
   URIs were registered.  If the client registration included the full
   redirection URI, the authorization server MUST compare the two URIs
   using simple string comparison as defined in [RFC3986] Section 6.2.1. */

//3.1.2.4.  Invalid Endpoint

/*    If an authorization request fails validation due to a missing,
   invalid, or mismatching redirection URI, the authorization server
   SHOULD inform the resource owner of the error and MUST NOT
   automatically redirect the user-agent to the invalid redirection URI. */

//3.1.2.5.  Endpoint Content

/*    The redirection request to the client's endpoint typically results in
   an HTML document response, processed by the user-agent.  If the HTML
   response is served directly as the result of the redirection request,
   any script included in the HTML document will execute with full
   access to the redirection URI and the credentials it contains. */
/* 
   The client SHOULD NOT include any third-party scripts (e.g., third-
   party analytics, social plug-ins, ad networks) in the redirection
   endpoint response.  Instead, it SHOULD extract the credentials from
   the URI and redirect the user-agent again to another endpoint without
   exposing the credentials (in the URI or elsewhere).  If third-party
   scripts are included, the client MUST ensure that its own scripts
   (used to extract and remove the credentials from the URI) will
   execute first. */

   require("dotenv").config();


const express = require("express");
const log = require("../utils/logger.js").log;
const error = require("../utils/error.js").error;
const jwt = require("jsonwebtoken");

const router = express.Router();




router.post('/authorization',(req, res) => {
    
  res.sendStatus(200);
});