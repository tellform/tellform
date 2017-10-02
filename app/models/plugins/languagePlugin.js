'use strict';

const constants = require('../../libs/constants'),
	config = require('../../../config/config');

module.exports = exports = function lastModifiedPlugin (schema, options) {
  	schema.add({
  		language: {
			type: String,
			enum: constants.languageTypes,
			default: config.defaultLanguage,
			required: options.required || 'Must be a valid language'
		}
  	});

	schema.pre('save', function (next) {
		var currWord = this.language;

		//English is the default backup language
		this.language = 'en';
		if(constants.wordToLangCode.has(currWord)){
			this.language = constants.wordToLangCode[currWord];
		} 
		next();
	});
};