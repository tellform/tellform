'use strict';

var should = require('should'),
	app = require('../../server'),
	Session = require('supertest-session'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	config = require('../../config/config'),
	tmpUser = mongoose.model(config.tempUserCollection);

/**
 * Globals
 */
var credentials, _User, activateToken, userSession;

/**
 * Form routes tests
 */
describe('User CRUD tests', function() {
	this.timeout(30000);

	beforeEach(function() {
		// Create user credentials
		credentials = {
			email: 'test732@test.com',
			username: 'test732',
			password: 'password3223'
		};

		//Create a new user
		_User = {
			email: credentials.email,
			username: credentials.username,
			password: credentials.password
		};

        //Initialize Session
        userSession = Session(app);
	});

	it(' > Create, Verify and Activate a User > ', function() {

		it('should be able to create a temporary (non-activated) User', function(done) {
			userSession.post('/auth/signup')
				.send(_User)
				.expect(200)
				.end(function(FormSaveErr) {
					console.log('CREATING USER');
					// Handle error
					should.not.exist(FormSaveErr);

                    tmpUser.findOne({username: _User.username}, function (err, user) {
                        should.not.exist(err);
                        should.exist(user);

                        _User.username.should.equal(user.username);
                        _User.firstName.should.equal(user.firstName);
                        _User.lastName.should.equal(user.lastName);
                        activateToken = user.GENERATED_VERIFYING_URL;

                        userSession.get('/auth/verify/'+activateToken)
                            .expect(200)
                            .end(function(VerifyErr, VerifyRes) {
                                // Handle error
                                if (VerifyErr) {
					return done(VerifyErr);
				}

                                (VerifyRes.text).should.equal('User successfully verified');

                                userSession.post('/auth/signin')
                                    .send(credentials)
                                    .expect('Content-Type', /json/)
                                    .expect(200)
                                    .end(function(signinErr, signinRes) {
                                        // Handle signin error
                                        if (signinErr) {
						return done(signinErr);
					}

                                        var user = signinRes.body;
                                        (user.username).should.equal(credentials.username);

                                        userSession.get('/auth/signout')
                                            .expect(200)
                                            .end(function(signoutErr, signoutRes) {

                                                // Handle signout error
                                                if (signoutErr) {
													return done(signoutErr);
												}

                                                (signoutRes.text).should.equal('You have successfully logged out.');

                                                done();
                                            });
                                    });
                            });
                    });
				});
		});

	});

	afterEach(function(done) {
		User.remove().exec(function () {
			tmpUser.remove().exec(function(){
				userSession.destroy();
				done();
			});
		});
	});
});
