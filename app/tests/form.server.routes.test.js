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
	Form = mongoose.model('Form'),
	Field = mongoose.model('Field'),
	FormSubmission = mongoose.model('FormSubmission'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, myForm, userSession;

/**
 * Form routes tests
 */
describe('Form Routes Unit tests', function() {

	beforeEach(function(done) {

		//Initialize Session
		userSession = new Session();

		// Create user credentials
		credentials = {
			username: 'test@test.com',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Form
		user.save(function(err) {
			if(err) done(err);
			myForm = {
				title: 'Form Title',
				language: 'english',
				admin: user._id,
				form_fields: [
					new Field({'fieldType':'textfield', 'title':'First Name', 'fieldValue': ''}),
					new Field({'fieldType':'checkbox', 'title':'nascar',      'fieldValue': ''}),
					new Field({'fieldType':'checkbox', 'title':'hockey',      'fieldValue': ''})
				]
			};

			done();
		});
	});

	describe(' > Login as user and Save a new Form', function() {
		var _user, _form;
		before('login as a user', function(done){
			userSession.post('/auth/signin')
				.send(credentials)
				.expect('Content-Type', /json/)
				.expect(200, 'Could not login user')
				.end(function(signinErr, signinRes) {

					// Handle signin error
					if (signinErr) done(signinErr);

					_user = signinRes.body;
					done();
				});
		});
		it(' > should be able to save a Form as a user', function(done){
			// Save a new Form
			userSession.post('/forms')
				.send({form: myForm})
				.expect('Content-Type', /json/)
				.expect(200, 'Could not save new Form')
				.end(function(FormSaveErr, FormSaveRes) {
					// Handle Form save error
					if (FormSaveErr) done(FormSaveErr);
					_form = FormSaveRes.body;
					done();
				});
		});
		it(' > should be able to fetch newly created form', function(done){

				// Get a list of Forms
				userSession.get('/forms/'+_form._id)
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(FormsGetErr, FormsGetRes) {
						// Handle Form save error
						if (FormsGetErr) done(FormsGetErr);

						var fetchedForm = FormsGetRes.body;
						// Set assertions
						(fetchedForm.admin).should.equal(_user._id);
						(fetchedForm.title).should.match(_form.title);

						// Call the assertion callback
						done();
				});
		});
	});

	it(' > should not be able to create a Form if not logged in', function(done) {
		userSession.post('/forms')
			.send({form: myForm})
			.expect(401)
			.end(function(FormSaveErr, FormSaveRes) {
				(FormSaveRes.body.message).should.equal('User is not logged in');
				// Call the assertion callback
				done(FormSaveErr);
			});
	});

	it(' > should not be able to get list of users\' Forms if not logged in', function(done) {
		userSession.get('/forms')
			.expect(401)
			.end(function(FormSaveErr, FormSaveRes) {
				(FormSaveRes.body.message).should.equal('User is not logged in');
				// Call the assertion callback
				done(FormSaveErr);
			});
	});

	it(' > should not be able to save a Form if no title is provided', function(done) {
		// Set Form with a invalid title field
		myForm.title = '';

		userSession.post('/auth/signin')
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Save a new Form
				userSession.post('/forms')
					.send({form: myForm})
					.expect(400)
					.end(function(FormSaveErr, FormSaveRes) {
						// Set message assertion
						(FormSaveRes.body.message).should.equal('Form Title cannot be blank');

						done();
					});
			});
	});

	it(' > should be able to update a Form if signed in', function(done) {
		userSession.post('/auth/signin')
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Save a new Form
				userSession.post('/forms')
					.send({form: myForm})
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(FormSaveErr, FormSaveRes) {
						// Handle Form save error
						if (FormSaveErr) done(FormSaveErr);

						// Update Form title
						myForm.title = 'WHY YOU GOTTA BE SO MEAN?';

						// Update an existing Form
						userSession.put('/forms/' + FormSaveRes.body._id)
							.send({form: myForm})
							.expect('Content-Type', /json/)
							.expect(200)
							.end(function(FormUpdateErr, FormUpdateRes) {
								// Handle Form update error
								if (FormUpdateErr) done(FormUpdateErr);

								// Set assertions
								(FormUpdateRes.body._id).should.equal(FormSaveRes.body._id);
								(FormUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it(' > should be able to read/get a Form if not signed in', function(done) {
		// Create new Form model instance
		var FormObj = new Form(myForm);

		// Save the Form
		FormObj.save(function(err, form) {
			if(err) done(err);

			request(app).get('/forms/' + form._id)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					if(err) done(err)

					// Set assertion
					(res.body).should.be.an.Object.with.property('title', myForm.title);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete a Form if signed in', function(done) {

		userSession.post('/auth/signin')
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Save a new Form
				userSession.post('/forms')
					.send({form: myForm})
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(FormSaveErr, FormSaveRes) {
						// Handle Form save error
						if (FormSaveErr) done(FormSaveErr);

						// Delete an existing Form
						userSession.delete('/forms/' + FormSaveRes.body._id)
							.send(myForm)
							.expect('Content-Type', /json/)
							.expect(200)
							.end(function(FormDeleteErr, FormDeleteRes) {
								// Handle Form error error
								if (FormDeleteErr) done(FormDeleteErr);

								// Set assertions
								(FormDeleteRes.body).should.exist();
								// (FormDeleteRes.body._id).should.equal(FormSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});

			});
	});

	it(' > should not be able to delete an Form if not signed in', function(done) {
		// Set Form user
		myForm.admin = user;

		// Create new Form model instance
		var FormObj = new Form(myForm);

		// Save the Form
		FormObj.save(function() {
			// Try deleting Form
			request(app).delete('/forms/' + FormObj._id)
			.expect(401)
			.end(function(FormDeleteErr, FormDeleteRes) {
				// Set message assertion
				(FormDeleteRes.body.message).should.match('User is not logged in');

				// Handle Form error error
				done(FormDeleteErr);
			});

		});
	});


	it(' > should be able to upload a PDF an Form if logged in', function(done) {
		userSession.post('/auth/signin')
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(signinErr, signinRes) {

				// Handle signin error
				if (signinErr) done(signinErr);

				var user = signinRes.body;
				var userId = user._id;

				// Save a new Form
				userSession.post('/forms')
					.send({form: myForm})
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(FormSaveErr, FormSaveRes) {
						// Handle Form save error
						if (FormSaveErr) done(FormSaveErr);

						// Get a list of Forms
						userSession.get('/forms')
							.expect('Content-Type', /json/)
							.expect(200)
							.end(function(FormsGetErr, FormsGetRes) {
								// Handle Form save error
								if (FormsGetErr) done(FormsGetErr);

								// Get Forms list
								var Forms = FormsGetRes.body;

								// Set assertions
								(Forms[0].admin).should.equal(userId);
								(Forms[0].title).should.match('Form Title');

								// Call the assertion callback
								done();
							});

					});


			});
	});

	describe('> Form Submission tests', function() {
		var FormObj, _Submission, submissionSession;

		beforeEach(function (done) {
			myForm.admin = user;
			FormObj = new Form(myForm);

			FormObj.save(function(err, form) {
				if (err) done(err);

				_Submission = {
					form_fields: [
						{'fieldType':'textfield', 'title':'First Name', 'fieldValue': 'David'},
						{'fieldType':'checkbox', 'title':'nascar',      'fieldValue': true},
						{'fieldType':'checkbox', 'title':'hockey',      'fieldValue': false}
					],
					form: form._id,
					admin: user._id,
					percentageComplete: 100,
					timeElapsed: 11.55
				};

				FormObj = form;

				//Setup test session
				submissionSession = new Session();

				done();
			});
		});

		it(' > should be able to create a Form Submission without signing in', function(done) {

			//Create Submission
			submissionSession.post('/forms/' + FormObj._id)
				.send(_Submission)
				.expect(200)
				.end(function(err, res) {

					should.not.exist(err);

					done();
				});
		});

		it(' > should be able to get Form Submissions if signed in', function(done) {
			submissionSession.post('/auth/signin')
				.send(credentials)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(signinErr, signinRes) {

					should.not.exist(signinErr);

					//Create Submission
					submissionSession.post('/forms/' + FormObj._id)
						.send(_Submission)
						.expect(200)
						.end(function(err, res) {

							should.not.exist(err);

							submissionSession.get('/forms/' + FormObj._id + '/submissions')
								.expect('Content-Type', /json/)
								.expect(200)
								.end(function(err, res) {

									// Set assertion
									should.not.exist(err);

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

					// Set assertions
					(res.body.message).should.equal('User is not logged in');

					// Call the assertion callback
					done();
				});
		});

		it(' > should not be able to delete Form Submission if not signed in', function(done) {
			var SubmissionObj = new FormSubmission(_Submission);

			SubmissionObj.save(function (err, submission) {
				should.not.exist(err);

				var submission_ids = _.pluck([submission], '_id');

				// Attempt to delete form submissions
				submissionSession.delete('/forms/' + FormObj._id + '/submissions')
					.send({deleted_submissions: submission_ids})
					.expect(401)
					.end(function(err, res) {
						
						// Set assertions
						should.not.exist(err);
						(res.body.message).should.equal('User is not logged in');

						// Call the assertion callback
						done();
					});
			});
		});

		it(' > should be able to delete Form Submission if signed in', function(done) {
			// Create new FormSubmission model instance
			var SubmissionObj = new FormSubmission(_Submission);

			SubmissionObj.save(function (err, submission) {
				should.not.exist(err);

				// Signin as user
				submissionSession.post('/auth/signin')
					.send(credentials)
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(signinErr, signinRes) {
						// Handle signin error
						if (signinErr) done(signinErr);

						var submission_ids = _.pluck([submission], '_id');

						//Delete form submissions
						submissionSession.delete('/forms/' + FormObj._id + '/submissions')
							.send({deleted_submissions: submission_ids})
							.expect(200)
							.end(function(err, res) {

								// Set assertions
								should.not.exist(err);
								(res.text).should.equal('Form submissions successfully deleted');

								// Call the assertion callback
								done();
							});
					});
			});
		});

		afterEach(function(done) {//logout current user if there is one
			FormSubmission.remove().exec(function() {
				Form.remove().exec(function (err) {
					submissionSession.destroy();
					done();
				});
			});
		});
	});

	afterEach(function(done) {
		Form.remove({}).exec(function() {
			User.remove({}).exec(function() {
				userSession.destroy();
				done();
			});
		});
	});
});
