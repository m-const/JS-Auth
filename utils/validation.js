require("dotenv").config();
const log = require("../utils/logger.js").log;


//Interface for validation of passed values

function validateParam(param, method = "string") {
  if (!param ?? false) {
    return false;
  }
  if (!method ?? false) {
    return false;
  }
  switch (method) {
    case "string": {
      //verify that param is a string and trim any white space
      if (typeof param == "string") return true;

      return false;
    }
    case "scope": {
      //verify that param is a valid scope string

      //TODO: Make the scope string user customizable
      //allow scope strings, white space delimited

      const scopeStringRegex = new RegExp(
        /^(?:[\x21\x23-\x5B\x5D-\x7E]{3,7}\.[\x21\x23-\x5B\x5D-\x7E]{3,7}\.[\x21\x23-\x5B\x5D-\x7E]{1,2} ?)*$/
      );

      if (scopeStringRegex.test(param)) return true;

      return false;
    }
case "URI":{
    //ensure valid absolute URI

    //Regex Credit: http://jmrware.com/articles/2009/uri_regexp/URI_regex.html
    const re_js_rfc3986_absolute_URI = new RegExp(/^[A-Za-z][A-Za-z0-9+\-.]*:(?:\/\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\.[A-Za-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\?(?:[A-Za-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9A-Fa-f]{2})*)?$/);
    

      if (re_js_rfc3986_absolute_URI.test(param)) return true;

      return false;
}
    default: {
      //the provided validation method is not defined
      log(
        `Provided validation method (${method}) is not defined in: ${__filename}`,
        "WARN"
      );
      return false;
    }
  }
}

module.exports = {
  validateParam,
};
