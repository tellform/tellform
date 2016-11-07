"use strict";

var should = require('should'),
	mongoose = require('mongoose');

var user, myForm;

// Create user credentials
var credentials = {
	email: 'testoeoeoee'+Math.floor(10000%Math.random()*100000)+'@test.com',
	username: 'tesoeeo'+Math.floor(10000%Math.random()*100000),
	password: 'passwordeoeo'
};

describe('Login E2E Tests', function() {
	var Form = mongoose.model('Form'),
		Field = mongoose.model('Field'),
		User = mongoose.model('User');

	this.timeout(50000);
	before(function async() {
		return new Promise(function(resolve, reject) {

			// Create a new user
			user = new User({
				firstName: 'Full',
				lastName: 'Name',
				email: credentials.email,
				username: credentials.username,
				password: credentials.password,
				provider: 'local'
			});

			// Save a user to the test db and create new Form
			user.save(function (err) {
				should.not.exist(err);
				if (err) return reject(err);

				myForm = new Form({
					title: 'Form Title',
					language: 'en',
					admin: user.id,
					form_fields: [
						new Field({'fieldType':'textfield', 'title':'First Name', 'fieldValue': ''}),
						new Field({'fieldType':'checkbox', 'title':'nascar',      'fieldValue': ''}),
						new Field({'fieldType':'checkbox', 'title':'hockey',      'fieldValue': ''})
					]
				});

				myForm.save(function(err){
					if (err) return reject(err);
					resolve();
				});
			});
		});
	});

	describe('authenticated tests', function () {
		before(function () {
			browser.url('http://tellform.dev:3001');

			browser.waitForExist('button.btn.btn-signup.btn-rounded.btn-block', 5000);
			browser.getUrl().should.equal('http://tellform.dev:3001/#!/signin');
			var title = browser.getTitle();
			title.should.equal('TellForm Test');

			var siginButtonText = browser.getText('button.btn.btn-signup.btn-rounded.btn-block');
			siginButtonText.should.equal('SIGN IN');

			browser.setValue('input#username', credentials.email);
			browser.setValue('input#password', credentials.password);

			browser.click('button.btn.btn-signup.btn-rounded.btn-block');

			browser.waitForExist('h3.text-center.forms-list-title', 10000);
			browser.getText('h3.text-center.forms-list-title').should.equal('My Forms');
			browser.getUrl().should.equal('http://tellform.dev:3001/#!/forms');
		});

		it('should be able to display forms in list view', function () {
			browser.getText('h4.list-group-item-heading:first-child').should.equal('Form Title');

			var numForms = browser.elements('.form-item.container').value.length;
			should.equal(numForms, 1);
		});

		it('should be able to duplicate a form', function () {
			var duplicateButton = browser.element('.fa.fa-files-o');
			duplicateButton.click();

			browser.waitUntil(function () {
				return browser.elements('.form-item.container').value.length === 2;
			}, 5000, 'expected number of forms to be \'2\' after 5s');

			var formNames = browser.getText('h4.list-group-item-heading');
			should.deepEqual(formNames, ['Form Title', 'Form Title']);
		});

		it('should be able to delete a form', function () {
			var deleteButton = browser.element('.fa.fa-trash-o');
			deleteButton.click();

			browser.waitUntil(function () {
				return browser.elements('.form-item.container').value.length === 1;
			}, 5000, 'expected number of forms to be \'2\' after 5s');

			var formNames = browser.getText('h4.list-group-item-heading');
			should.equal(formNames, 'Form Title');
		});

		it('should be able to open the admin panel of a form', function () {
			browser.click('a.title-row.col-xs-12');

			browser.waitUntil(function () {
				return browser.getUrl() !== 'http://tellform.dev:3001/#!/forms' && browser.isExisting('h2.hidden-md.hidden-lg');
			}, 5000, 'expected form admin panel to open after 5s');

			var titleExists = ( browser.getText('h1.hidden-sm.hidden-xs') === 'Form Title' || browser.getText('h2.hidden-md.hidden-lg') === 'Form Title');
			titleExists.should.be.true();
		});

		it('should be able to create a new form', function () {
			browser.click('.navbar-header a.navbar-brand');

			browser.waitUntil(function () {
				return browser.getUrl() === 'http://tellform.dev:3001/#!/forms'
			}, 5000, 'expected form list view to open after 5s');

			browser.click('.form-item.create-new');
			browser.isVisible('.form-item.create-new.new-form');

			browser.setValue('.create-new .title-row input', 'New Form');
			browser.click('.create-new .submit.row .btn');

			browser.waitUntil(function () {
				return browser.getUrl() !== 'http://tellform.dev:3001/#!/forms' && browser.isExisting('h2.hidden-md.hidden-lg');
			}, 5000, 'expected form admin panel to open after 5s');

			var titleExists = ( browser.getText('h1.hidden-sm.hidden-xs') === 'New Form' || browser.getText('h2.hidden-md.hidden-lg') === 'New Form');
			titleExists.should.be.true();
		});
	});

	after(function async() {
		return new Promise(function(resolve, reject) {
			User.remove({}).exec(function(err){
				if (err) return reject(err);
				resolve();
			});
		});
	});
});
