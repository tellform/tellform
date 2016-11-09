'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Globals
 */
var user, user2;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			username: 'test',
			email: 'test@test.com',
			password: 'password',
			provider: 'local'
		});
		user2 = new User({
			firstName: 'Full',
			lastName: 'Name',
			username: 'test',
			email: 'test@test.com',
			password: 'password',
			provider: 'local'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			user.save(done);
		});

		it('should fail to save an existing user again', function(done) {
			user.save(function() {
				user2.save(function(err) {
					should.exist(err);
					done();
				});
			});
		});

		it('should be able to show an error when try to save without username', function(done) {
			user.username = '';
			user.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	describe('Method findUniqueUsername', function() {
		beforeEach(function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0);
				user.save(done);
			});
		});

		it('should be able to find unique version of existing username without problems', function(done) {
			User.findUniqueUsername(user.username, null, function (availableUsername) {
				availableUsername.should.not.equal(user.username);
				done();
			});
		});

	});

	afterEach(function(done) {
		User.remove().exec(done);
	});
});
