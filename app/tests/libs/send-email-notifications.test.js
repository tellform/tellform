'use strict';

/**
 * Module dependencies.
 */
const emailNotifications = require('../../libs/send-email-notifications'),
	constants = require('../../libs/constants'),
	mockTransport = require("nodemailer").createTransport("Stub"),
	config = require('../../../config/config');

/**
 * Globals
 */
const validFormFields = [
	{fieldType:'textfield', title:'First Name', fieldValue: 'John Smith', deletePreserved: false, globalId:'56340745f59a6fc9e22028e9'},
    {fieldType:'link', title:'Your Website',      fieldValue: 'https://johnsmith.me', deletePreserved: false, globalId:'5c9e22028e907634f45f59a6'},
    {fieldType:'number', title:'Your Age',      fieldValue: 45, deletePreserved: false, globalId:'56e90745f5934fc9e22028a6'}
];

const validFieldDict = {
	'56340745f59a6fc9e22028e9': 'John Smith',
	'5c9e22028e907634f45f59a6': 'https://johnsmith.me',
	'56e90745f5934fc9e22028a6': 45
};

const invalidFormFields = [
	{fieldType:'textfield', title:'First Name', fieldValue: 'John Smith', deletePreserved: false},
    {fieldType:'link', title:'Your Website', deletePreserved: false, _id:'5c9e22028e907634f45f59a6'},
    {fieldType:'number', title:'Your Age'}
];

const htmlTemplate = '<p><var class="tag" id="field:56340745f59a6fc9e22028e9">First Name</var> \
	<br><var class="tag" id="field:5c9e22028e907634f45f59a6">Your Website</var> \
	<br><var class="tag" id="field:56e90745f5934fc9e22028a6">Your Age</var></p>';

const renderedTemplate = '<p>John Smith \
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
		it('should properly render a template given a valid field dict', function() {
			var actualRenderedTemplate = emailNotifications.parseTemplate(htmlTemplate, validFieldDict, constants.varFormat).replace((/  |\r\n|\n|\r|\t/gm),'');
			actualRenderedTemplate.should.equal(renderedTemplate.replace((/  |\r\n|\n|\r|\t/gm),''));
		});
	});

	describe('Method replaceTemplateVal', function() {
		it('should properly replace a template var in a valid template', function() {
			var expectedHtml = '<p>John Smith \
				<br><var class="tag" id="field:5c9e22028e907634f45f59a6">Your Website</var> \
				<br><var class="tag" id="field:56e90745f5934fc9e22028a6">Your Age</var></p>';

			var actualRenderedTemplate = emailNotifications.replaceTemplateVal('56340745f59a6fc9e22028e9', validFieldDict['56340745f59a6fc9e22028e9'], htmlTemplate, constants.varFormat).replace((/  |\r\n|\n|\r|\t/gm),'');
			actualRenderedTemplate.should.equal(expectedHtml.replace((/  |\r\n|\n|\r|\t/gm),''));
		});
	});

	describe('Method send', function() {
		this.timeout(10000);
		const emailSettings = {
			fromEmails: 'somewhere@somewhere.com',
			toEmails: 'there@there.com',
			subject: 'Hello <var class="tag" id="field:56340745f59a6fc9e22028e9">First Name</var>!',
			htmlTemplate: htmlTemplate
		};

		const emailTemplateVars = validFieldDict;
		const varFormat = constants.varFormat;

		it('should properly replace a template var in a valid template', function(done) {
			emailNotifications.send(emailSettings, emailTemplateVars, mockTransport, varFormat, function(err){
				should.not.exist(err);
				done();
			});
		});
	});
});
