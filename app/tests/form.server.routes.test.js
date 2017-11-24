'use strict';

var should = require('should'),
	lodash = require('lodash'),
	app = require('../../server'),
	request = require('supertest'),
	Session = require('supertest-session'),
	mongoose = require('mongoose'),
	User = require('../models/user.server.model.js'),
	Form = require('../models/form.server.model.js'),
	FormSubmission = require('../models/form_submission.server.model.js'),
	Field = mongoose.model('Field'),
	async = require('async'),
	_ = require('lodash');

function omitDeep(collection, excludeKeys) {

  function omitFn(value) {

    if (value && typeof value === 'object') {
      excludeKeys.forEach((key) => {
        delete value[key];
      });
    }
  }

  return _.cloneDeepWith(collection, omitFn);
}

/**
 * Globals
 */
var user, myForm, userSession;

// Create user credentials
var credentials = {
	username: 'aeokjqjqkqaeoaoe',
	email: 'aeoaekjqjqqjkoeoa@test.com',
	password: 'password'
};

var sampleVisitorData = [{
	socketId: 'ntneooe8989eotnoeeo',
	referrer: 'http://google.com',
	timeElapsed: 89898989,
	isSubmitted: true,
	language:  'en',
	ipAddr: '192.168.1.1',
	deviceType: 'desktop',
	userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
	filledOutFields: []
}];

/**
 * Form routes tests
 */
describe('Form Routes Unit tests', function() {

	beforeEach(function(done) {
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
			should.not.exist(err);
			myForm = {
				title: 'Form Title',
				language: 'en',
				admin: user.id,
				form_fields: [
					new Field({'fieldType':'textfield', 'title':'First Name', 'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'nascar',      'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'hockey',      'fieldValue': ''})
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

	it(' > should be able to read/get a live Form if not signed in', function(done) {
		// Create new Form model instance
		var FormObj = new Form(myForm);

		// Save the Form
		FormObj.save(function(err, form) {
			if(err) return done(err);

			userSession.get('/forms/' + form._id + '/render')
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

	it(' > should be able to read/get a non-live Form if not signed in', function(done) {
		// Create new Form model instance
		var FormObj = new Form(myForm);
		FormObj.isLive = false;

		// Save the Form
		FormObj.save(function(err, form) {
			if(err) return done(err);

			userSession.get('/forms/' + form._id + '/render')
				.expect(401, {message: 'Form is Not Public'})
				.end(function(err, res) {
					done(err);
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

		it(' > should not be able to create a Form if body is empty', function(done) {
			loginSession.post('/forms')
				.send({form: null})
				.expect(400, {'message':'Invalid Input'})
				.end(function(FormSaveErr, FormSaveRes) {
					// Call the assertion callback
					done(FormSaveErr);
				});
		});

		it(' > should not be able to save a Form if no title is provided', function(done) {
			// Set Form with a invalid title field
			myForm.title = '';

			// Save a new Form
			authenticatedSession.post('/forms')
				.send({form: myForm})
				.expect(500)
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

		it(' > should be able to create a Form if form_fields are undefined', function(done) {
			myForm.analytics = null;
			myForm.form_fields = null;

			loginSession.post('/forms')
				.send({form: myForm})
				.expect(200)
				.end(function(FormSaveErr, FormSaveRes) {
					// Call the assertion callback
					done(FormSaveErr);
				});
		});

		it(' > should be able to update a Form if signed in and Form is valid', function(done) {

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
					myForm.title = 'WHY YOU GOTTA BE SO FORMULAIC?';

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
							(FormUpdateRes.body.title).should.match(myForm.title);

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

		it(' > should be able to save new form while logged in', function(done){
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

		it(' > should be able to get list of users\' forms sorted by date created while logged in', function(done) {
			var myForm1 = {
				title: 'First Form',
				language: 'en',
				admin: user.id,
				form_fields: [
					new Field({'fieldType':'textfield', 'title':'First Name', 'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'nascar',      'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'hockey',      'fieldValue': ''})
				],
				isLive: true
			};

			var myForm2 = {
				title: 'Second Form',
				language: 'en',
				admin: user.id,
				form_fields: [
					new Field({'fieldType':'textfield', 'title':'Last Name', 'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'formula one',      'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'football',      'fieldValue': ''})
				],
				isLive: true
			};

			var FormObj1 = new Form(myForm1);
			var FormObj2 = new Form(myForm2);

			async.waterfall([
			    function(callback) {
			        FormObj1.save(function(err){
			        	callback(err);
			        });
			    },
			    function(callback) {
			        FormObj2.save(function(err){
			        	callback(err);
			        });
			    },
			    function(callback) {
			        loginSession.get('/forms')
					.expect(200)
					.end(function(err, res) {
						res.body.length.should.equal(2);
						res.body[0].title.should.equal('Second Form');
						res.body[1].title.should.equal('First Form');

						// Call the assertion callback
						callback(err);
					});
			    }
			], function (err) {
			    done(err);
			});
		});

		it(' > should preserve visitor data when updating a Form', function(done) {
			// Create new Form model instance

			var formObject = {
				title: 'First Form',
				language: 'en',
				admin: user.id,
				form_fields: [
					new Field({'fieldType':'textfield', 'title':'First Name', 'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'nascar',      'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'hockey',      'fieldValue': ''})
				],
				isLive: true,
				analytics: {
					gaCode: '',
					visitors: sampleVisitorData
				}
			};

			var formUpdateObject = {
				title: 'Second Form',
				language: 'en',
				admin: user.id,
				form_fields: [
					new Field({'fieldType':'textfield', 'title':'Last Name', 'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'formula one',      'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'football',      'fieldValue': ''})
				],
				isLive: true
			};

			var CurrentForm = new Form(formObject);

			// Save the Form
			CurrentForm.save(function(err, form) {
				if(err) return done(err);

				loginSession.put('/forms/' + form.id)
					.send({ form: formUpdateObject })
					.expect(200)
					.end(function(err, res) {

						should.not.exist(err);

						Form.findById(form.id, function (FormFindErr, UpdatedForm){
							should.not.exist(FormFindErr);
							should.exist(UpdatedForm);

							var updatedFormObj = UpdatedForm.toJSON();
							var oldFormObj = CurrentForm.toJSON();

							updatedFormObj.analytics.should.deepEqual(oldFormObj.analytics);

							done(FormFindErr);
						});
					});
			});
		});

		it(' > shouldn\'t allow a user to change the id when updating a form', function(done) {
			// Create new Form model instance

			var formObject = {
				title: 'First Form',
				language: 'en',
				admin: user.id,
				form_fields: [
					new Field({'fieldType':'textfield', 'title':'First Name', 'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'nascar',      'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'hockey',      'fieldValue': ''})
				],
				isLive: true
			};

			var formUpdateObject = {
				id: mongoose.Types.ObjectId(),
				title: 'First Form',
				language: 'en',
				admin: user.id,
				form_fields: [
					new Field({'fieldType':'textfield', 'title':'Last Name', 'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'formula one',      'fieldValue': ''}),
					new Field({'fieldType':'legal', 'title':'football',      'fieldValue': ''})
				],
				isLive: true
			};

			var CurrentForm = new Form(formObject);

			// Save the Form
			CurrentForm.save(function(err, InitialForm) {
				if(err) return done(err);

				loginSession.put('/forms/' + InitialForm.id)
					.send({ form: formUpdateObject })
					.expect(200)
					.end(function(err, OldForm) {
						should.not.exist(err);

						Form.findById(InitialForm.id, function (FormFindErr, UpdatedForm){
							should.not.exist(FormFindErr);
							should.exist(UpdatedForm);

							var updatedFormObj = UpdatedForm.toJSON();
							var oldFormObj = InitialForm.toJSON();

							updatedFormObj = omitDeep('lastModified');
							oldFormObj = omitDeep('lastModified');

							updatedFormObj.should.deepEqual(oldFormObj);

							done(FormFindErr);
						});
					});
			});
		});

		afterEach('should be able to signout user', function(done){
			authenticatedSession.get('/auth/signout')
				.expect(200)
				.end(function(signoutErr, signoutRes) {
					// Handle signout error
					if (signoutErr) {
						return done(signoutErr);
					}
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
