"use strict";

var should = require('should'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

var credentials, user;

describe('Login E2E Tests', function() {
	beforeEach(function async() {
		return new Promise(function(resolve, reject) {
			// Create user credentials
			credentials = {
				email: 'testoeoeoeeo243423e@test.com',
				username: 'tesoeeote234234ooe',
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

	it('should be able to show login page', function () {
		browser.url('http://tellform.dev:3001');
		var title = browser.getTitle();
		title.should.equal('TellForm Test');

		var siginButtonText = browser.getText('button.btn.btn-signup.btn-rounded.btn-block')
		siginButtonText.should.equal('SIGN IN');
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
