/*
"use strict";

var should = require('should'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

var credentials, user;

describe('Login E2E Tests', function() {
	this.timeout(50000);
	beforeEach(function async() {
		return new Promise(function(resolve, reject) {

			// Create user credentials
			credentials = {
				email: 'testoeoeoee'+Math.floor(1000%Math.random()*1000)+'@test.com',
				username: 'tesoeeo'+Math.floor(1000%Math.random()*1000),
				password: 'passwordeoeo'
			};

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
				if (err) return reject(err);
				resolve();
			});
		});
	});

	it('should be able to login with valid credentials', function () {
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

	it('should be not able to login with invalid credentials', function () {
		browser.url('http://tellform.dev:3001');

		browser.waitForExist('button.btn.btn-signup.btn-rounded.btn-block', 5000);
		browser.getUrl().should.equal('http://tellform.dev:3001/#!/signin');
		var title = browser.getTitle();
		title.should.equal('TellForm Test');

		var siginButtonText = browser.getText('button.btn.btn-signup.btn-rounded.btn-block');
		siginButtonText.should.equal('SIGN IN');

		browser.setValue('input#username', 'aoeuaoeu');
		browser.setValue('input#password', 'aoeuaoeu');

		browser.click('button.btn.btn-signup.btn-rounded.btn-block');

		browser.waitForExist('.text-center.text-danger', 10000);
		browser.getText('.text-center.text-danger').should.equal('Error: Unknown user or invalid password');
		browser.getUrl().should.equal('http://tellform.dev:3001/#!/signin');
	});

	it('should be not able to login with no credentials', function () {
		browser.url('http://tellform.dev:3001');

		browser.waitForExist('button.btn.btn-signup.btn-rounded.btn-block', 5000);
		browser.getUrl().should.equal('http://tellform.dev:3001/#!/signin');
		var title = browser.getTitle();
		title.should.equal('TellForm Test');

		var siginButtonText = browser.getText('button.btn.btn-signup.btn-rounded.btn-block');
		siginButtonText.should.equal('SIGN IN');

		browser.setValue('input#username', '');
		browser.setValue('input#password', '');

		browser.click('button.btn.btn-signup.btn-rounded.btn-block');

		browser.getUrl().should.equal('http://tellform.dev:3001/#!/signin');
	});

	afterEach(function async() {
		return new Promise(function(resolve, reject) {
			User.remove({}).exec(function(err){
				if (err) return reject(err);
				resolve();
			});
		});
	});
});
*/
