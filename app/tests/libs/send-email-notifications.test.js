'use strict';

/**
 * Module dependencies.
 */
var emailNotifications = require('../../libs/send-email-notifications'),
	constants = require('../../libs/constants');

/**
 * Globals
 */
var validFormFields = [
	{fieldType:'textfield', title:'First Name', fieldValue: 'John Smith', deletePreserved: false, _id:'56340745f59a6fc9e22028e9'},
    {fieldType:'link', title:'Your Website',      fieldValue: 'https://johnsmith.me', deletePreserved: false, _id:'5c9e22028e907634f45f59a6'},
    {fieldType:'number', title:'Your Age',      fieldValue: 45, deletePreserved: false, _id:'56e90745f5934fc9e22028a6'}
];

var validFieldDict = {
	'56340745f59a6fc9e22028e9': 'John Smith',
	'5c9e22028e907634f45f59a6': 'https://johnsmith.me',
	'56e90745f5934fc9e22028a6': 45
};

var invalidFormFields = [
	{fieldType:'textfield', title:'First Name', fieldValue: 'John Smith', deletePreserved: false},
    {fieldType:'link', title:'Your Website', deletePreserved: false, _id:'5c9e22028e907634f45f59a6'},
    {fieldType:'number', title:'Your Age'}
];

var htmlTemplate = '<p><var class="tag" id="field:56340745f59a6fc9e22028e9">First Name</var> \
	<br><var class="tag" id="field:5c9e22028e907634f45f59a6">Your Website</var> \
	<br><var class="tag" id="field:56e90745f5934fc9e22028a6">Your Age</var></p>';

var renderedTemplate = '<p>John Smith \
	<br>https://johnsmith.me \
	<br>45</p>';

/**
 * Unit tests
 */
describe('Send Email Notification Unit Tests', function() {

	describe('Method createFieldDict', function() {
		it('should be return a fieldDict from valid form fields', function() {
			var actualFieldDict = emailNotifications.createFieldDict(validFormFields);
			actualFieldDict.should.deepEqual(validFieldDict);
		});

		it('should return empty object if form fields are invalid or empty ', function() {
			var actualFieldDict = emailNotifications.createFieldDict(invalidFormFields);
			actualFieldDict.should.be.empty();
		});
	});

	describe('Method parseTemplate', function(){
		it('should be properly render a template given a valid field dict', function() {
			var actualRenderedTemplate = parseTemplate(htmlTemplate, validFieldDict, constants.varFormat);
			actualRenderedTemplate.should.equal(renderedTemplate);
		});
	});

	describe('Method replaceTemplateVal', function() {
	});

	describe('Method send', function() {
	});
});
