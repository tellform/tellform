'use strict';

var should = require('should'),
	_ = require('lodash'),
	app = require('../../server'),
	request = require('supertest'),
	Session = require('supertest-session')({
		app: app
	}),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	config = require('../../config/config'),
	tmpUser = mongoose.model(config.tempUserCollection),
	agent = request.agent(app),
	mailosaur = require('mailosaur')(config.mailosaur.key),
    mailbox = new mailosaur.Mailbox(config.mailosaur.mailbox_id);

/**
 * Globals
 */
var credentials, _User, _Session;

/**
 * Form routes tests
 */
describe('User CRUD tests', function() {

	var userSession;

	beforeEach(function(done) {
		//Initialize Session
		userSession = new Session();

		// Create user credentials
		credentials = {
			username: 'test@test.com',
			password: 'password'
		};

		// Create a new user
		_User = {
			firstName: 'Full',
			lastName: 'Name',
			email: credentials.username,
			username: credentials.username,
			password: credentials.password,
		};
		console.info('config.mailosaur.mailbox_id: '+config.mailosaur.mailbox_id)

		done();

	});


	it('should be able to create a temporary (non-activated) User', function(done) {
		userSession.post('/auth/signup')
			.send(_User)
			.expect(200)
			.end(function(FormSaveErr, FormSaveRes) {
				(FormSaveRes.text).should.equal('An email has been sent to you. Please check it to verify your account.');
				
				tmpUser.findOne({username: _User.username}, function (err, user) {
					should.not.exist(err);
					should.exist(user);

					console.log(user);

					(_User.username).shoud.equal(user.username);
					(_User.firstName).shoud.equal(user.firstName);
					(_User.lastName).shoud.equal(user.lastName);

					// Call the assertion callback
					done();
				});
			});
	});

	it('should be able to create and activate/verify a User Account', function(done) {
		credentials.username = _User.email = _User.username = 'testUserCreation.be1e58fb@mailosaur.in';
		 
		userSession.post('/auth/signup')
			.send(_User)
			.expect(200)
			.end(function(FormSaveErr, FormSaveRes) {
				should.not.exist(FormSaveErr);
				(FormSaveRes.text).should.equal('An email has been sent to you. Please check it to verify your account.');
				
				mailbox.getEmails(_User.email,
					function(err, emails) {
						should.not.exist(err);
						email = emails[0];

						console.log(email);
						done();
						// userSession.get('/auth/verify/'+token)
						// 	.send(_User)
						// 	.expect(200, 'User successfully verified')
						// 	.end(function (VerifyErr, VerifyRes) {
						// 		should.not.exist(VerifyErr);

						// 	});
					}
				);

			});
	});

	afterEach(function(done) {
		User.remove().exec(function () {
			tmpUser.remove().exec(function(){
				mailbox.deleteAllEmail(function (err, body) {
					console.log(err);
					userSession.destroy();
				});
			});
		});
	});
});
