'use strict';

/**
 * Module dependencies.
 */
const should = require('should'),
	emailNotifications = require('../../libs/send-email-notifications'),
	mockTransport = require('nodemailer').createTransport({
            jsonTransport: true
        }),
	config = require('../../../config/config');

/**
 * Globals
 */
const validFormFields = [
	{fieldType:'textfield', title:'First Name', fieldValue: 'John Smith', deletePreserved: false, id:'56340745f59a6fc9e22028e9'},
    {fieldType:'link', title:'Your Website',      fieldValue: 'https://johnsmith.me', deletePreserved: false, id:'5c9e22028e907634f45f59a6'},
    {fieldType:'number', title:'Your Age',      fieldValue: 45, deletePreserved: false, id:'56e90745f5934fc9e22028a6'}
];

const validFieldDict = {
	'56340745f59a6fc9e22028e9': 'John Smith',
	'5c9e22028e907634f45f59a6': 'https://johnsmith.me',
	'56e90745f5934fc9e22028a6': '45'
};

const invalidFormFields = [
	{fieldType:'textfield', title:'First Name', fieldValue: 'John Smith', deletePreserved: false},
    {fieldType:'link', title:'Your Website', deletePreserved: false, _id:'5c9e22028e907634f45f59a6'},
    {fieldType:'number', title:'Your Age'}
];

const htmlTemplate = '<p><span class="placeholder-tag" data-id="56340745f59a6fc9e22028e9">First Name</span>'+
	'<br><span class="placeholder-tag" data-id="5c9e22028e907634f45f59a6">Your Website</span>'+
	'<br><span class="placeholder-tag" data-id="56e90745f5934fc9e22028a6">Your Age</span></p>';

const renderedTemplate = '<!DOCTYPE html><html><head></head><body><p>John Smith<br>https://johnsmith.me<br>45</p></body></html>';

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
			var actualRenderedTemplate = emailNotifications.parseTemplate(htmlTemplate, validFieldDict, false).replace((/  |\r\n|\n|\r|\t/gm),'');
			actualRenderedTemplate.should.equal(renderedTemplate.replace((/  |\r\n|\n|\r|\t/gm),''));
		});
	});

	describe('Method send', function() {
		this.timeout(10000);
		const emailSettings = {
			fromEmails: 'somewhere@somewhere.com',
			toEmails: 'there@there.com',
			subject: 'Hello <span class="placeholder-tag" data-id="56340745f59a6fc9e22028e9">First Name</span>!',
			htmlTemplate: htmlTemplate
		};

		const emailTemplateVars = validFieldDict;

		it('should properly replace a template var in a valid template', function(done) {
			emailNotifications.send(emailSettings, emailTemplateVars, mockTransport, function(err){
				should.not.exist(err);
				done();
			});
		});
	});
});
