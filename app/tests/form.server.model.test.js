'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Form = mongoose.model('Form');

/**
 * Globals
 */
var user, Form, 
FormFDF;

/**
 * Unit tests
 */
describe('Form Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			Form = new Form({
				title: 'Form Title',
				admin: user,
				form_fields: [{'title':'Short Text2','fieldType':'textfield','fieldValue':'','disabled':false},{'disabled':false,'created':1435952663586,'fieldValue':'','fieldFlags':'0','fieldType':'checkbox','title':'nascar'},{'disabled':false,'created':1435952663586,'fieldValue':'','fieldFlags':'0','fieldType':'checkbox','title':'hockey'}]
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return Form.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without title', function(done) {
			Form.title = '';

			return Form.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	describe('Method generateFDFTemplate', function() {
		it('should be able to generate one that is correct', function(done) {
			return Form.generateFDFTemplate(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without title', function(done) {
			Form.title = '';

			return Form.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		Form.remove().exec(function() {
			User.remove().exec(done);
		});
	});
});
