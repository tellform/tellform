"use strict";

var crypto = require('crypto'), 
    passwordDigest = require('soap/lib/utils').passwordDigest;

function WSSecurity(username, password) {
  this._username = username;
  this._password = password;
}

WSSecurity.prototype.toXML = function() {
  var password = "<wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">" + this._password + "</wsse:Password>";

  return  "<wsse:Security xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\" soap:mustUnderstand=\"1\">" +
            "<wsse:UsernameToken xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\" wsu:Id=\"UsernameToken-1\">" +
              "<wsse:Username>" + this._username + "</wsse:Username>" +
              password +
            "</wsse:UsernameToken>" +
          "</wsse:Security>";

};

module.exports = WSSecurity;
