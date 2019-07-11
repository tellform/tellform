'use strict';

var should = require('should'),
	app = require('../../server'),
	Session = require('supertest-session'),
	mongoose = require('mongoose'),
	User = require('../models/user.server.model.js'),
	config = require('../../config/config'),
	tmpUser = mongoose.model(config.tempUserCollection),
	async = require('async');

/**
 * Globals
 */
var credentials, _User, userSession;

/**
 * Form routes tests
 */
describe('User CRUD tests', function() {
	before(function() {
		// Create user credentials
		credentials = {
			email: 'test099@test.com',
			username: 'test099',
			password: 'password3223'
		};

		//Create a new user
		_User = {
			email: credentials.email,
			username: credentials.username,
			password: credentials.password,
			firstName: 'John',
			lastName: 'Smith'
		};

        //Initialize Session
        userSession = Session(app);
	});

	describe(' > Create, Verify and Activate a User > ', function() {
		this.timeout(10000);
		it('should be able to create and activate a User', function(done) {
			async.waterfall([
			    function(callback) {
			        userSession.post('/auth/signup')
						.send(_User)
						.expect(200)
						.end(function(err) {
							callback(err);
						});
			    },
			    function(callback) {
			        tmpUser.findOne({username: _User.username})
			        	.lean() 
			        	.exec(function (err, user) {
                        should.exist(user);

                        _User.username.should.equal(user.username);
                        _User.firstName.should.equal(user.firstName);
                        _User.lastName.should.equal(user.lastName);
                        callback(err, user.GENERATED_VERIFYING_URL);
                    });
			    },
			    function(activateToken, callback) {
                    userSession.get('/auth/verify/' + activateToken)
                        .expect(200)
                        .end(function(err, res) {
                            (res.text).should.equal('User successfully verified');
                            callback(err);
                        });
			    },
			    function(callback) {
			    	userSession.post('/auth/signin')
			            .send(credentials)
			            .expect('Content-Type', /json/)
			            .expect(200)
			            .end(function(err, res) {			    
			                (res.body.username).should.equal(credentials.username);
			                callback(err);
			            });
			    },
			    function(callback) {
			    	userSession.get('/auth/signout')
	                    .expect(200)
	                    .end(function(err, res) {
	                        (res.text).should.equal('You have successfully logged out.');
	                        callback(err);
	                    });
			    },
			    function(callback) {
			    	User.findOne({ username: _User.username })
			    		.lean()
			    		.exec(function(err, user){
			    			should.exist(user);
			    			callback(err);
			    		});
			    }
			], function (err) {
			    done(err);
			});         
		});

		after(function(done){
			User.remove().exec(done);
		});
	});

	describe(' > Reset Password > ', function(){
		this.timeout(10000);
		beforeEach(function(done){
			var UserObj = new User(_User);
			UserObj.save(function(err){
				done(err);
			});
		});

		it('should be able to reset password of a created User with a valid passwordResetToken', function(done) {
			var changedPassword = 'password1234';
			var resetPasswordToken;

			async.waterfall([
			    function(callback) {
			        userSession.post('/auth/forgot')
						.send({ username: _User.username })
						.expect(200)
						.end(function(err) {
							callback(err);
						});
			    },
			    function(callback) {
			        User.findOne({ username: _User.username })
			        	.lean()
			        	.exec(function(err, user){
			        		if(err){
			        			callback(err);
			        		}
			        		callback(null, user.resetPasswordToken);
						});
			    },
			    function(resetPasswordToken, callback) {
			        userSession.get('/auth/reset/' + resetPasswordToken)
						.expect(302)
						.end(function(err) {
							callback(err, resetPasswordToken);
						});
			    },
			    function(resetPasswordToken, callback) {
			    	userSession.post('/auth/reset/' + resetPasswordToken)
			    		.send({
			    			newPassword: changedPassword,
			    			verifyPassword: changedPassword
			    		})
						.expect(200)
						.end(function(err, res) {
							callback(err, resetPasswordToken);
						});
			    },
			    function(resetPasswordToken, callback) {
			    	User.findOne({ username: _User.username })
			    		.exec(function(err, user){
			    			should.exist(user);
			    			user.authenticate(changedPassword).should.be.true();
			    			should.not.exist(user.resetPasswordToken);

			    			callback(err);
			    		});
			    }
			], function (err, result) {
				credentials.password = changedPassword;
				done(err);
			});
		});

		it('should be not able to reset password of a created User with a invalid passwordResetToken', function(done) {
			var changedPassword = 'password4321';
			var resetPasswordToken = 'thisIsNotAValidToken';

			async.waterfall([
			    function(callback) {
			        userSession.post('/auth/forgot')
						.send({ username: credentials.username })
						.expect(200)
						.end(function(err, res) {
							callback(err);
						});
			    },
			    function(callback) {
			        userSession.get('/auth/reset/' + resetPasswordToken)
						.expect(400)
						.end(function(err) {
							callback(err);
						});
			    },
			    function(callback) {
			    	userSession.post('/auth/reset/' + resetPasswordToken)
			    		.send({
			    			newPassword: changedPassword,
			    			verifyPassword: changedPassword
			    		})
						.expect(400)
						.end(function(err, res) {
							callback(err);
						});
			    },
			    function(callback) {
			    	User.findOne({ username: _User.username })
			    		.exec(function(err, user){
			    			should.exist(user);
			    			user.authenticate(changedPassword).should.be.false();
			    			callback(err);
			    		});
			    }
			], function (err, result) {
				done(err);
			});
		});

		afterEach(function(done){
			User.remove({ username: credentials.username }).exec(done);
		});
	});

	describe(' > User Profile Changes > ', function(){
		var profileSession = new Session(app);

		this.timeout(10000);
		beforeEach(function(done){
			var UserObj = new User(_User);
			UserObj.save(function(err, user){
				done(err);
			});
		});

		it('should be able to change password when logged in', function(done) {
			var changedPassword = 'aVeryBadPassword';

			async.waterfall([
			    function(callback) {
			        userSession.post('/auth/signin')
						.send({
							username: _User.username,
							password: _User.password
						})
						.expect(200)
						.end(function(err, res) {
							callback(err);
						});
			    },
			    function(callback) {
			        userSession.post('/users/password')
			        	.send({
			        		currentPassword: _User.password,
			    			newPassword: changedPassword,
			    			verifyPassword: changedPassword
			    		})
						.expect(200)
						.end(function(err, res) {
							callback(err);
						});
			    },
			    function(callback) {
			    	User.findOne({ username: _User.username })
			    		.exec(function(err, user){
			    			user.authenticate(changedPassword).should.be.true();
			    			callback(err);
			    		});
			    }
			], function (err) {
				done(err);
			});
		});

		it('should be able to update user when logged in', function(done) {
			var newUser = {};
	    	newUser.firstName = 'goodnight';
	    	newUser.lastName = 'everyone';

	    	newUser.email = 'grcg@gcrc.com';
	    	newUser.username = 'grcg';

			async.waterfall([
			    function(callback) {
			        userSession.post('/auth/signin')
						.send({
							username: _User.username,
							password: _User.password
						})
						.expect(200)
						.end(function(err, res) {
							callback(err);
						});
			    },
			    function(callback) {
			        userSession.put('/users')
			        	.send(newUser)
						.expect(200)
						.end(function(err, res) {
							callback(err);
						});
			    },
			    function(callback) {
			    	User.findOne({ username: newUser.username })
			    		.exec(function(err, user){
			    			user.firstName.should.equal(newUser.firstName);
			    			user.lastName.should.equal(newUser.lastName);
			    			user.email.should.equal(newUser.email);
			    			user.username.should.equal(newUser.username);
			    			callback(err);
			    		});
			    }
			], function (err) {
				done(err);
			});
		});

		it('should be able to fetch user when logged in', function(done) {
			async.waterfall([
			    function(callback) {
			        userSession.post('/auth/signin')
						.send({
							username: _User.username,
							password: _User.password
						})
						.expect(200)
						.end(function(err, res) {
							callback(err);
						});
			    },
			    function(callback) {
			        userSession.get('/users/me')
						.expect(200)
						.end(function(err, res) {
							var user = res.body;
							user.firstName.should.equal(_User.firstName);
			    			user.lastName.should.equal(_User.lastName);
			    			user.email.should.equal(_User.email);
			    			user.username.should.equal(_User.username);
							callback(err);
						});
			    }
			], function (err) {
				done(err);
			});
		});

		afterEach(function(done){
			userSession.get('/auth/signout')
                .end(function(err, res) {
        			User.remove().exec(done);
                });
		});
	});

	describe(' > User API > ', function(){
		var apiKey;

		this.timeout(10000);
		before(function(done){
			var UserObj = new User(_User);
			UserObj.save(function(err, user){
				done(err);
			});
		});

		it('should be able to request API Key', function(done) {
			async.waterfall([
			    function(callback) {
			        userSession.post('/auth/signin')
						.send({
							username: _User.username,
							password: _User.password
						})
						.expect(200)
						.end(function(err, res) {
							callback(err);
						});
			    },
			    function(callback) {
			        userSession.get('/auth/genkey')
						.expect(200)
						.end(function(err, res) {
							apiKey = res.body.apiKey;
							callback(err);
						});
			    },
			    function(callback) {
			    	userSession.get('/auth/signout')
						.expect(200)
						.end(function(err, res) {
							callback(err);
						});
			    },
			    function(callback) {
			        userSession.get('/users/me?apikey=' + apiKey)
						.expect(200)
						.end(function(err, res) {
							var user = res.body;

							user.firstName.should.equal(_User.firstName);
			    			user.lastName.should.equal(_User.lastName);
			    			user.email.should.equal(_User.email);
			    			user.username.should.equal(_User.username);
							callback(err);
						});
			    },
			], function (err) {
				done(err);
			});
		});

		it('should be able to update user with API key', function(done) {
			var newUser = {};
	    	newUser.firstName = 'goodnight';
	    	newUser.lastName = 'everyone';

	    	newUser.email = 'grcg@gcrc.com';
	    	newUser.username = 'grcg';

			async.waterfall([
			    function(callback) {
			        userSession.put('/users?apikey=' + apiKey)
			        	.send(newUser)
						.expect(200)
						.end(function(err, res) {
							callback(err);
						});
			    },
			    function(callback) {
			    	User.findOne({ username: newUser.username })
			    		.exec(function(err, user){
			    			user.firstName.should.equal(newUser.firstName);
			    			user.lastName.should.equal(newUser.lastName);
			    			user.email.should.equal(newUser.email);
			    			user.username.should.equal(newUser.username);
			    			callback(err);
			    		});
			    }
			], function (err) {
				done(err);
			});
		});

		after(function(done){
			User.remove().exec(done);
		});
	});

	after(function(done) {
		User.remove().exec(function () {
			tmpUser.remove().exec(function(){
				userSession.destroy();
				done();
			});
		});
	});
});
