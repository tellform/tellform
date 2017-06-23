'use strict';

var TokenGenerator = require('uuid-token-generator');
var tokgen = new TokenGenerator(256, TokenGenerator.BASE62);

module.exports = function() {
	return tokgen.generate();
};
