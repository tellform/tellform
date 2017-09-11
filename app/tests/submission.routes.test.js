'use strict';

var should = require('should'),
	_ = require('lodash'),
	app = require('../../server'),
	request = require('supertest'),
	Session = require('supertest-session'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Form = mongoose.model('Form'),
	Field = mongoose.model('Field'),
	Submission = mongoose.model('Submission'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user;

/**
 * Form routes tests
 */
describe('Submission Routes Unit tests', function() {
	var FormObj, _Submission, submissionSession;

	beforeEach(function(done) {

		// Create user credentials
		credentials = {
			email: 	  'test@test.com',
			username: 'test',
			password: 'password'
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
		user.save(function(err) {
			if(err) return done(err);
			FormObj = new Form({
				title: 'Form Title',
				language: 'en',
				admin: user._id,
				form_fields: [
					new Field({'fieldType':'textfield', 'title':'First Name', 'fieldValue': ''}),
					new Field({'fieldType':'checkbox', 'title':'nascar',      'fieldValue': ''}),
					new Field({'fieldType':'checkbox', 'title':'hockey',      'fieldValue': ''})
				]
			});

			FormObj.save(function(formSaveErr, form) {
				if (formSaveErr) done(formSaveErr);

				_Submission = {
					form: form._id
				};

				FormObj = form;

				//Initialize Session
				submissionSession = Session(app);

				done();
			});
		});
	});


	it(' > should be able to create a Submission without signing in', function(done) {

		//Create Submission
		submissionSession.post('/forms/' + FormObj._id + '/submissions')
			.send(_Submission)
			.expect(200)
			.end(function(err, res) {

				should.not.exist(err);

				done();
			});
	});

	it(' > should be able to get Submissions if signed in', function(done) {
		//Create Submission
		submissionSession.post('/forms/' + FormObj._id + '/submissions')
			.send(_Submission)
			.expect(200)
			.end(function(err, res) {

				should.not.exist(err);

				submissionSession.post('/auth/signin')
					.send(credentials)
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(signinErr, signinRes) {

						should.not.exist(signinErr);

						submissionSession.get('/forms/' + FormObj._id + '/submissions')
							.expect('Content-Type', /json/)
							.expect(200)
							.end(function(submissionErr, res) {

								// Set assertion
								should.not.exist(submissionErr);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it(' > should be able to delete Submission if signed in', function(done) {
		// Create new Submission model instance
		var SubmissionObj = new Submission(_Submission);

		SubmissionObj.save(function (err, submission) {
			should.not.exist(err);

			// Sign n as user
			submissionSession.post('/auth/signin')
				.send(credentials)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(signinErr, signinRes) {
					// Handle signin error
					should.not.exist(signinErr);

					var submission_ids = _.map([submission], '_id');

					//Delete submissions
					submissionSession.delete('/forms/' + FormObj._id + '/submissions')
						.send({deleted_submissions: submission_ids})
						.expect(200)
						.end(function(submissionErr, res) {

							// Set assertions
							should.not.exist(submissionErr);
							(res.text).should.equal('Submissions successfully deleted');

							// Call the assertion callback
							done();
						});
				});
		});
	});

	it(' > should not be able to get Submissions if not signed in', function(done) {
		// Attempt to fetch submissions
		submissionSession.get('/forms/' + FormObj._id + '/submissions')
			.expect(401)
			.end(function(err, res) {
				should.not.exist(err);

				// Call the assertion callback
				done();
			});

	});

	it(' > should not be able to delete Submission if not signed in', function(done) {
		var SubmissionObj = new Submission(_Submission);

		SubmissionObj.save(function (err, submission) {
			should.not.exist(err);

			var submission_ids = _.map([submission], '_id');

			// Attempt to delete form submissions
			submissionSession.delete('/forms/' + FormObj._id + '/submissions')
				.send({deleted_submissions: submission_ids})
				.expect(401)
				.end(function (submissionErr, res) {

					// Set assertions
					should.not.exist(submissionErr);

					// Call the assertion callback
					done();
				});
		});
	});

	afterEach(function(done) {//logout current user if there is one
		Submission.remove().exec(function() {
			Form.remove().exec(function (err) {
				User.remove({}).exec(function() {
					submissionSession.destroy();
					done();
				});
			});
		});
	});


});
