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
	url = require('url');

var mailosaur = require('mailosaur')(config.mailosaur.key),
	mailbox = new mailosaur.Mailbox(config.mailosaur.mailbox_id);

/**
 * Globals
 */
var credentials, _User, _Session;

/**
 * Form routes tests
 */
describe('User CRUD tests', function() {
	this.timeout(10000);
	var userSession;

	beforeEach(function(done) {
		//Initialize Session
		userSession = new Session();

		// Create user credentials
		credentials = {
			username: 'be1e58fb@mailosaur.in',
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

		done();

	});



	describe('create, activate and confirm a User Account', function () {
		var username = 'testActiveAccount.be1e58fb@mailosaur.in';
		var link, activateToken;

		it('should be able to create a temporary (non-activated) User', function(done) {
			_User.email = _User.username = username;
			userSession.post('/auth/signup')
				.send(_User)
				.expect(200)
				.end(function(FormSaveErr, FormSaveRes) {
					(FormSaveRes.text).should.equal('An email has been sent to you. Please check it to verify your account.');
		
					// setTimeout(function() {			
						tmpUser.findOne({username: _User.username}, function (err, user) {
							should.not.exist(err);
							should.exist(user);

							_User.username.should.equal(user.username);
							_User.firstName.should.equal(user.firstName);
							_User.lastName.should.equal(user.lastName);

							mailbox.getEmails(function(err, _emails) {
								if(err) done(err);
								var emails = _emails;

								console.log('mailbox.getEmails:');
								for(var i=0; i<emails.length; i++){
									console.log(emails[i].text.links);
								}

								var link = emails[0].text.links[0].href;
								var activateToken = url.parse(link).hash.split('/').slice(-1)[0];

								activateToken.should.equal(user.GENERATED_VERIFYING_URL);

								done();
							});
						});
					// }, 1000);
				});
		});

		// it('should be able to activate/verify a User Account', function(done) {
		// _User.email = _User.username = username;
		// 	mailbox.getEmails(function(err, _emails) {
		// 		if(err) done(err);
		// 		var emails = _emails;

		// 		console.log('mailbox.getEmails:');
		// 		console.log(emails[0].text.links);

		// 		link = emails[0].text.links[0].href;
		// 		activateToken = url.parse(link).hash.split('/').slice(-1)[0];

		// 		userSession.get('/auth/verify/'+activateToken)
		// 			.expect(200, 'User successfully verified')
		// 			.end(function(VerifyErr, VerifyRes) {
		// 				should.not.exist(VerifyErr);
		// 				done();
		// 			});
		// 	});

		// });

		// it('should receive confirmation email after activating a User Account', function(done) {
		// _User.email = _User.username = username;
		// 	mailbox.getEmails(function(err, _emails) {
		// 		if(err) done(err);
		// 		var emails = _emails;

		// 		console.log('mailbox.getEmails:');
		// 		console.log(emails[0].text.links);

		// 		var link = emails[0].text.links[0].href;
		// 		var activateToken = url.parse(link).hash.split('/').slice(-1)[0];

		// 		userSession.get('/auth/verify/'+activateToken)
		// 			.expect(200, 'User successfully verified')
		// 			.end(function(VerifyErr, VerifyRes) {
		// 				should.not.exist(VerifyErr);
		// 				done();
		// 			});
		// 	});
		// });

	});

	afterEach(function(done) {
		User.remove().exec(function () {
			tmpUser.remove().exec(function(){
				// mailbox.deleteAllEmail(function (err, body) {
					// if(err) done(err);
					userSession.destroy();
					done();
				// });
			});
		});
	});
});
