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
	FormSubmission = mongoose.model('FormSubmission'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user;

/**
 * Form routes tests
 */
describe('Form Submission Routes Unit tests', function() {
	var FormObj, _Submission, submissionSession, _SubmissionBody;

	beforeEach(function(done) {

		// Create user credentials
		credentials = {
			email: 	  'test423@test.com',
			username: 'test534',
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
			if(err) {
				return done(err);
			}

			FormObj = new Form({
				title: 'Form Title',
				language: 'en',
				admin: user._id,
				form_fields: [
					new Field({'fieldType':'textfield', 'title':'First Name', 'fieldValue': ''}),
					new Field({'fieldType':'checkbox', 'title':'nascar',      'fieldValue': ''}),
					new Field({'fieldType':'checkbox', 'title':'hockey',      'fieldValue': ''})
				],
				selfNotifications: {
					fromField: mongoose.Types.ObjectId(),
					toEmails: 'john@smith.com',
					subject: 'Hello there',
					htmlTemplate: '<p> A form was submitted </p>',
					enabled: true
				},

				respondentNotifications: {
					toField: mongoose.Types.ObjectId(),
					fromEmails: 'john@smith.com',
					subject: 'Tellform: Thank you for filling out this TellForm',
					htmlTemplate:'Hello, <br><br> We’ve received your submission. <br><br> Thank you & have a nice day!',
					enabled: true
				}
			});

			FormObj.save(function(formSaveErr, form) {
				if (formSaveErr) done(formSaveErr);

				_Submission = {
					form: form._id,
					form_fields: [
						{'fieldType':'textfield', 	'title':'First Name', 	'fieldValue': 'David', 	_id: '', isSubmission: false, deletePreserved: false},
						{'fieldType':'checkbox', 	'title':'nascar',      	'fieldValue': true, 	_id: '', isSubmission: false, deletePreserved: true},
						{'fieldType':'checkbox', 	'title':'hockey',      	'fieldValue': false, 	_id: '', isSubmission: false, deletePreserved: false}
					],
					percentageComplete: 100,
					timeElapsed: 11.55,
					ipAddr: '123.233.232.232',
					geoLocation: {
						Country: 'Canada',
						City: 'Vancouver'
					},
					device:{
						type: 'Mobile',
						name: 'iPhone'
					}
				};

				_SubmissionBody ={
					_id: form._id,
					form_fields: [
						{'fieldType':'textfield', 	'title':'First Name', 	'fieldValue': 'David', 	_id: '', isSubmission: false, deletePreserved: false},
						{'fieldType':'checkbox', 	'title':'nascar',      	'fieldValue': true, 	_id: '', isSubmission: false, deletePreserved: true},
						{'fieldType':'checkbox', 	'title':'hockey',      	'fieldValue': false, 	_id: '', isSubmission: false, deletePreserved: false}
					],
					percentageComplete: 100,
					timeElapsed: 11.55,
					ipAddr: '123.233.232.232',
					geoLocation: {
						Country: 'Canada',
						City: 'Vancouver'
					},
					device:{
						type: 'Mobile',
						name: 'iPhone'
					}
				};

				FormObj = form;

				//Initialize Session
				submissionSession = Session(app);

				done();
			});
		});
	});


	it(' > should be able to create a Form Submission without signing in', function(done) {

		//Create Submission
		submissionSession.post('/forms/' + FormObj._id)
			.send(_SubmissionBody)
			.expect(200)
			.end(function(err, res) {

				should.not.exist(err);
				done();
			});
	});

	it(' > should be able to get Form Submissions if signed in', function(done) {
		//Create Submission
		submissionSession.post('/forms/' + FormObj._id)
			.send(_SubmissionBody)
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

	it(' > should be able to delete Form Submission if signed in', function(done) {
		// Create new FormSubmission model instance
		var SubmissionObj = new FormSubmission(_Submission);

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

					//Delete form submissions
					submissionSession.delete('/forms/' + FormObj._id + '/submissions')
						.send({deleted_submissions: submission_ids})
						.expect(200)
						.end(function(submissionErr, res) {

							// Set assertions
							should.not.exist(submissionErr);
							(res.text).should.equal('Form submissions successfully deleted');

							// Call the assertion callback
							done();
						});
				});
		});
	});

	it(' > should not be able to get Form Submissions if not signed in', function(done) {
		// Attempt to fetch form submissions
		submissionSession.get('/forms/' + FormObj._id + '/submissions')
			.expect(401)
			.end(function(err, res) {
				should.not.exist(err);

				// Call the assertion callback
				done();
			});

	});

	it(' > should not be able to delete Form Submission if not signed in', function(done) {
		var SubmissionObj = new FormSubmission(_Submission);

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
		FormSubmission.remove().exec(function() {
			Form.remove().exec(function (err) {
				User.remove({}).exec(function() {
					submissionSession.destroy();
					done();
				});
			});
		});
	});
});
