"use strict";

let TokenGenerator = require("uuid-token-generator");
let tokgen = new TokenGenerator(256, TokenGenerator.BASE62);

module.exports = function() {
	return tokgen.generate();
};
