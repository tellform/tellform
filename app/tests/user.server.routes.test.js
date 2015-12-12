// 'use strict';

// var should = require('should'),
// 	_ = require('lodash'),
// 	app = require('../../server'),
// 	request = require('supertest'),
// 	Session = require('supertest-session')({
// 		app: app
// 	}),
// 	mongoose = require('mongoose'),
// 	User = mongoose.model('User'),
// 	config = require('../../config/config'),
// 	tmpUser = mongoose.model(config.tempUserCollection),
// 	agent = request.agent(app),
// 	url = require('url');

// var mailosaur = require('mailosaur')(config.mailosaur.key),
// 	mailbox = new mailosaur.Mailbox(config.mailosaur.mailbox_id);

// var mandrill = require('node-mandrill')(config.mailer.options.auth.pass);

// /**
//  * Globals
//  */
// var credentials, _User, _Session;

// /**
//  * Form routes tests
//  */
// describe('User CRUD tests', function() {
// 	this.timeout(15000);
// 	var userSession;

// 	beforeEach(function() {
// 		//Initialize Session
// 		userSession = new Session();

// 		// Create user credentials
// 		credentials = {
// 			username: 'be1e58fb@mailosaur.in',
// 			password: 'password'
// 		};

// 		//Create a new user
// 		_User = {
// 			firstName: 'Full',
// 			lastName: 'Name',
// 			email: credentials.username,
// 			username: credentials.username,
// 			password: credentials.password,
// 			provider: 'local'
// 		};
// 	});

// 	describe(' > Create, Verify and Activate a User > ', function() {
// 		var username = 'testActiveAccount1.be1e58fb@mailosaur.in';
// 		var link, _tmpUser, activateToken;
// 		this.timeout(15000);

// 		it('should be able to create a temporary (non-activated) User', function(done) {
// 			_User.email = _User.username = username;
// 			userSession.post('/auth/signup')
// 				.send(_User)
// 				.expect(200, 'An email has been sent to you. Please check it to verify your account.')
// 				.end(function(FormSaveErr, FormSaveRes) {
// 					// Handle error
// 					if (FormSaveErr) return done(FormSaveErr);

// 					tmpUser.findOne({username: _User.username}, function (err, user) {
// 						should.not.exist(err);
// 						should.exist(user);
// 						_tmpUser = user;

// 						_User.username.should.equal(user.username);
// 						_User.firstName.should.equal(user.firstName);
// 						_User.lastName.should.equal(user.lastName);
// 						activateToken = user.GENERATED_VERIFYING_URL;

// 						done();
// 					});

// 					// 	// mandrill('/messages/search', {
// 					// 	//     query: "subject:Confirm",
// 					// 	//     senders: [
// 					// 	//         "test@forms.polydaic.com"
// 					// 	//     ],
// 					// 	//        limit: 1
// 					// 	// }, function(error, emails) {
// 					// 	//     if (error) console.log( JSON.stringify(error) );

// 					// 	//     var confirmation_email = emails[0];

// 					// 	// 	mandrill('/messages/content', {
// 					// 	// 	    id: confirmation_email._id
// 					// 	// 	}, function(error, email) {
// 					// 	// 	    if (error) console.log( JSON.stringify(error) );

// 					// 	// 	    // console.log(email);
// 					// 	// 	    var link = _(email.text.split('\n')).reverse().value()[1];
// 					// 	// 	    console.log(link);
// 					// 	// 	    activateToken = _(url.parse(link).hash.split('/')).reverse().value()[0];
// 					// 	// 	    console.log('actual   activateToken: '+ activateToken);
// 					// 	// 	    console.log('expected activateToken: ' + user.GENERATED_VERIFYING_URL);

// 					// 	// 	    done();

// 					// 	// 	});
// 					// 	// });

// 					// 	// mailbox.getEmails(function(err, _emails) {
// 					// 	// 	if(err) done(err);

// 					// 	// 	var emails = _emails;

// 					// 	// 	console.log('mailbox.getEmails:');
// 					// 	// 	console.log(emails[0].text.links);

// 					// 	// 	var link = emails[0].text.links[0].href;
// 					// 	// 	activateToken = _(url.parse(link).hash.split('/')).reverse().value()[0];
// 					// 	// 	console.log('actual   activateToken: '+ activateToken);
// 					// 	// 	console.log('expected activateToken: ' + user.GENERATED_VERIFYING_URL);
// 					// 	// 	(activateToken).should.equal(user.GENERATED_VERIFYING_URL);

// 					// 	// 	done();
// 					// 	// });
// 					// });
// 				});
// 		});
	
// 		it('should be able to verify a User Account', function(done) {
// 			console.log('activateToken: '+activateToken);
// 			userSession.get('/auth/verify/'+activateToken)
// 				.expect(200)
// 				.end(function(VerifyErr, VerifyRes) {
// 					// Handle error
// 					if (VerifyErr) return done(VerifyErr);
// 					(VerifyRes.text).should.equal('User successfully verified');
// 					done();
// 				});
// 		});

// 		it('should be able to login and logout a verified User Account', function(done) {
// 			userSession.post('/auth/signin')
// 				.send(credentials)
// 				.expect('Content-Type', /json/)
// 				.expect(200)
// 				.end(function(signinErr, signinRes) {
// 					// Handle signin error
// 					if (signinErr) return done(signinErr);

// 					var user = signinRes.body;
// 					(user.username).should.equal(credentials.username);

// 					userSession.get('/auth/signout')
// 						.expect(200)
// 						.end(function(signoutErr, signoutRes) {

// 							// Handle signout error
// 							if (signoutErr) return done(signoutErr);

// 							(signoutRes.text).should.equal('Successfully logged out');

// 							done();
// 						});
// 				});
// 		});
// 	});

// 	it(' > should be able to reset a User\'s password');

// 	it(' > should be able to delete a User account without any problems');

// 	afterEach(function(done) {
// 		User.remove().exec(function () {
// 			tmpUser.remove().exec(function(){
// 				// mailbox.deleteAllEmail(function (err, body) {
// 					// if(err) throw err;
// 					userSession.destroy();
// 					done();
// 				// });
// 			});
// 		});
// 	});
// });
