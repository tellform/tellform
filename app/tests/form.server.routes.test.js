'use strict';
process.env.NODE_ENV = 'test';

var should = require('should'),
	lodash = require('lodash'),
	app = require('../../server'),
	request = require('supertest'),
	Session = require('supertest-session'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Form = mongoose.model('Form'),
	Field = mongoose.model('Field'),
	FormSubmission = mongoose.model('FormSubmission');

/**
 * Globals
 */
var user, myForm, userSession;

// Create user credentials
var credentials = {
	username: 'test1234',
	email: 'test1234@test.com',
	password: 'password'
};

/**
 * Form routes tests
 */
describe('Form Routes Unit tests', function() {

	beforeEach(function(done) {

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: credentials.email,
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Form
		user.save(function(err) {
			should.not.exist(err);
			myForm = {
				title: 'Form Title',
				language: 'en',
				admin: user.id,
				form_fields: [
					new Field({'fieldType':'textfield', 'title':'First Name', 'fieldValue': ''}),
					new Field({'fieldType':'checkbox', 'title':'nascar',      'fieldValue': ''}),
					new Field({'fieldType':'checkbox', 'title':'hockey',      'fieldValue': ''})
				],
				isLive: true
			};

			//Initialize Session
			userSession = Session(app);

			done();
		});
	});

	it(' > should not be able to create a Form if not logged in', function(done) {
		userSession.post('/forms')
			.send({form: myForm})
			.expect(401)
			.end(function(FormSaveErr, FormSaveRes) {
				// Call the assertion callback
				done(FormSaveErr);
			});
	});

	it(' > should not be able to get list of users\' Forms if not logged in', function(done) {
		userSession.get('/forms')
			.expect(401)
			.end(function(FormSaveErr, FormSaveRes) {
				// Call the assertion callback
				done(FormSaveErr);
			});
	});

	it(' > should be able to read/get a Form if not signed in', function(done) {
		// Create new Form model instance
		var FormObj = new Form(myForm);

		// Save the Form
		FormObj.save(function(err, form) {
			if(err) return done(err);

			userSession.get('/subdomain/' + credentials.username + '/forms/' + form._id + '/render')
				.expect(200)
				.end(function(err, res) {
					if(err) return done(err)

					// Set assertion
					(res.body).should.be.an.Object.with.property('title', myForm.title);

					// Call the assertion callback
					done();
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
			userSession.delete('/forms/' + FormObj._id)
				.expect(401)
				.end(function(FormDeleteErr, FormDeleteRes) {

					// Handle Form error error
					done(FormDeleteErr);
				});

		});
	});

	describe(' > Login as User', function() {
		//Initialize Session
		var authenticatedSession;
		var loginSession = Session(app);

		beforeEach(function(done) {
			loginSession.post('/auth/signin')
				.send(credentials)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(signinErr, signinRes) {
					if(signinErr) {
						return done(signinErr);
					}

					authenticatedSession = loginSession;
					return done();
				});
		});

		it(' > should not be able to save a Form if no title is provided', function(done) {
			// Set Form with a invalid title field
			myForm.title = '';

			// Save a new Form
			authenticatedSession.post('/forms')
				.send({form: myForm})
				.expect(405)
				.end(function(FormSaveErr, FormSaveRes) {
					// Handle Form save error
					if (FormSaveErr) {
						return done(FormSaveErr);
					}

					// Set message assertion
					(FormSaveRes.body.message).should.equal('Form Title cannot be blank');

					done();
				});

		});

		it(' > should be able to update a Form if signed in', function(done) {

			// Save a new Form
			loginSession.post('/forms')
				.send({form: myForm})
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(FormSaveErr, FormSaveRes) {
					// Handle Form save error
					if (FormSaveErr) {
						return done(FormSaveErr);
					}

					// Update Form title
					myForm.title = 'WHY YOU GOTTA BE SO MEAN?';

					// Update an existing Form
					loginSession.put('/forms/' + FormSaveRes.body._id)
						.send({form: myForm})
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(FormUpdateErr, FormUpdateRes) {
							// Handle Form update error
							if (FormUpdateErr){
								done(FormUpdateErr);
							}

							// Set assertions
							(FormUpdateRes.body._id).should.equal(FormSaveRes.body._id);
							(FormUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

							// Call the assertion callback
							done();
						});
				});

		});

		it(' > should be able to delete a Form if signed in', function(done) {

			// Save a new Form
			loginSession.post('/forms')
				.send({form: myForm})
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(FormSaveErr, FormSaveRes) {
					// Handle Form save error
					if (FormSaveErr) {
						return done(FormSaveErr);
					}

					// Delete an existing Form
					loginSession.delete('/forms/' + FormSaveRes.body._id)
						.send(myForm)
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(FormDeleteErr, FormDeleteRes) {
							// Handle Form error error
							if (FormDeleteErr) {
								return done(FormDeleteErr);
							}

							// Set assertions
							should.exist(FormDeleteRes.body);
							(FormDeleteRes.body._id).should.equal(FormSaveRes.body._id);

							// Call the assertion callback
							done();
						});
				});

		});

		it('should be able to save new form while logged in', function(done){
			// Save a new Form
			authenticatedSession.post('/forms')
				.send({form: myForm})
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(FormSaveErr, FormSaveRes) {
					// Handle Form save error
					if (FormSaveErr) return done(FormSaveErr);
					var _form = FormSaveRes.body;

					// Get a list of Forms
					authenticatedSession.get('/forms/'+_form._id)
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(FormsGetErr, FormsGetRes) {
							// Handle Form save error
							if (FormsGetErr) return done(FormsGetErr);

							var fetchedForm = FormsGetRes.body;
							// Set assertions
							(fetchedForm.admin.email).should.equal(user.email);
							(fetchedForm.title).should.match(_form.title);

							// Call the assertion callback
							done();
						});
				});
		});

		afterEach('should be able to signout user', function(done){
			authenticatedSession.get('/auth/signout')
				.expect(200)
				.end(function(signoutErr, signoutRes) {
					// Handle signout error
					if (signoutErr) return done(signoutErr);
					authenticatedSession.destroy();
					done();
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
