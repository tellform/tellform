'use strict';

var should = require('should'),
	lodash = require('lodash'),
	app = require('../../server'),
	request = require('supertest'),
	session = require('supertest-session'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Form = mongoose.model('Form'),
	Field = mongoose.model('Field'),
	FormSubmission = mongoose.model('FormSubmission'),
	agent = request.agent(app);


/**
 * Form routes tests
 */
describe('Form Routes Unit tests', function() {
	/**
	 * Globals
	 */
	var credentials, user, myForm, userSession = null;

	beforeEach(function(done) {

		//Initialize Session
		userSession = session(app);

		// Create user credentials
		credentials = {
			username: 'test1@test.com',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test1@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Form
		user.save(function(err) {
			should.not.exist(err);
			myForm = {
				title: 'Form Title',
				language: 'english',
				admin: user.lodashid,
				formlodashfields: [
					new Field({'fieldType':'textfield', 'title':'First Name', 'fieldValue': ''}),
					new Field({'fieldType':'checkbox', 'title':'nascar',      'fieldValue': ''}),
					new Field({'fieldType':'checkbox', 'title':'hockey',      'fieldValue': ''})
				]
			};

			done();
		});
	});

	// describe(' > Login and Save a new Form >', function() {
	// 	var lodashuser, lodashform;
	// 	before(function(done){
	// 		userSession.post('/auth/signin')
	// 			.send(credentials)
	// 			.expect('Content-Type', /json/)
	// 			.expect(200, 'Could not login user')
	// 			.end(function(signinErr, signinRes) {

	// 				// Handle signin error
	// 				if (signinErr) return done(signinErr);

	// 				lodashuser = signinRes.body;
	// 				done();
	// 			});
	// 	});
	// 	it(' > should be able to save a Form as a user', function(done){
	// 		// Save a new Form
	// 		userSession.post('/forms')
	// 			.send({form: myForm})
	// 			.expect('Content-Type', /json/)
	// 			.expect(200, 'Could not save new Form')
	// 			.end(function(FormSaveErr, FormSaveRes) {
	// 				// Handle Form save error
	// 				if (FormSaveErr) return done(FormSaveErr);
	// 				lodashform = FormSaveRes.body;
	// 				done();
	// 			});
	// 	});
	// 	it(' > should be able to fetch newly created form', function(done){

	// 			// Get a list of Forms
	// 			userSession.get('/forms/'+lodashform.lodashid)
	// 				.expect('Content-Type', /json/)
	// 				.expect(200)
	// 				.end(function(FormsGetErr, FormsGetRes) {
	// 					// Handle Form save error
	// 					if (FormsGetErr) return done(FormsGetErr);

	// 					var fetchedForm = FormsGetRes.body;
	// 					// Set assertions
	// 					(fetchedForm.admin).should.equal(lodashuser.lodashid);
	// 					(fetchedForm.title).should.match(lodashform.title);

	// 					// Call the assertion callback
	// 					done();
	// 			});
	// 	});
	// 	after(function(done){
	// 		userSession.get('/auth/signout')
	// 			.end(function(signoutErr, signoutRes) {

	// 				// Handle signout error
	// 				if (signoutErr) return done(signoutErr);
	// 				userSession.destroy();
	// 				done();
	// 			});
	// 	});
	// });

	// it(' > should not be able to create a Form if not logged in', function(done) {
	// 	agent.post('/forms')
	// 		.send({form: myForm})
	// 		.expect(401)
	// 		.end(function(FormSaveErr, FormSaveRes) {
	// 			(FormSaveRes.body.message).should.equal('User is not logged in');
	// 			// Call the assertion callback
	// 			done(FormSaveErr);
	// 		});
	// });

	// it(' > should not be able to get list of users\' Forms if not logged in', function(done) {
	// 	agent.get('/forms')
	// 		.expect(401)
	// 		.end(function(FormSaveErr, FormSaveRes) {
	// 			(FormSaveRes.body.message).should.equal('User is not logged in');
	// 			// Call the assertion callback
	// 			done(FormSaveErr);
	// 		});
	// });

	it(' > should not be able to save a Form if no title is provided', function(done) {
		// Set Form with a invalid title field
		myForm.title = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(signinErr, signinRes) {
				should.not.exist(signinErr);

				// Handle signin error
				if (signinErr) {
					console.log(signinErr);
					return done(signinErr);
				}
				done();
				// Save a new Form
				// userSession.post('/forms')
				// 	.send({form: myForm})
				// 	.expect(400)
				// 	.end(function(FormSaveErr, FormSaveRes) {
				// 		// Set message assertion
				// 		(FormSaveRes.body.message).should.equal('Form Title cannot be blank');

				// 		done();
				// 	});
			});
	});

	// it(' > should be able to update a Form if signed in', function(done) {
	// 	userSession.post('/auth/signin')
	// 		.send(credentials)
	// 		.expect('Content-Type', /json/)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) return done(signinErr);

	// 			// Save a new Form
	// 			userSession.post('/forms')
	// 				.send({form: myForm})
	// 				.expect('Content-Type', /json/)
	// 				.expect(200)
	// 				.end(function(FormSaveErr, FormSaveRes) {
	// 					// Handle Form save error
	// 					if (FormSaveErr) return done(FormSaveErr);

	// 					// Update Form title
	// 					myForm.title = 'WHY YOU GOTTA BE SO MEAN?';

	// 					// Update an existing Form
	// 					userSession.put('/forms/' + FormSaveRes.body.lodashid)
	// 						.send({form: myForm})
	// 						.expect('Content-Type', /json/)
	// 						.expect(200)
	// 						.end(function(FormUpdateErr, FormUpdateRes) {
	// 							// Handle Form update error
	// 							if (FormUpdateErr) done(FormUpdateErr);

	// 							// Set assertions
	// 							(FormUpdateRes.body.lodashid).should.equal(FormSaveRes.body.lodashid);
	// 							(FormUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it(' > should be able to read/get a Form if not signed in', function(done) {
	// 	// Create new Form model instance
	// 	var FormObj = new Form(myForm);

	// 	// Save the Form
	// 	FormObj.save(function(err, form) {
	// 		if(err) return done(err);

	// 		agent.get('/forms/' + form.lodashid)
	// 			.expect('Content-Type', /json/)
	// 			.expect(200)
	// 			.end(function(err, res) {
	// 				if(err) return done(err)

	// 				// Set assertion
	// 				(res.body).should.be.an.Object.with.property('title', myForm.title);

	// 				// Call the assertion callback
	// 				done();
	// 			});
	// 	});
	// });

	// it(' > should be able to delete a Form if signed in', function(done) {

	// 	userSession.post('/auth/signin')
	// 		.send(credentials)
	// 		.expect('Content-Type', /json/)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) return done(signinErr);

	// 			// Save a new Form
	// 			userSession.post('/forms')
	// 				.send({form: myForm})
	// 				.expect('Content-Type', /json/)
	// 				.expect(200)
	// 				.end(function(FormSaveErr, FormSaveRes) {
	// 					// Handle Form save error
	// 					if (FormSaveErr) return done(FormSaveErr);

	// 					// Delete an existing Form
	// 					userSession.delete('/forms/' + FormSaveRes.body.lodashid)
	// 						.send(myForm)
	// 						.expect('Content-Type', /json/)
	// 						.expect(200)
	// 						.end(function(FormDeleteErr, FormDeleteRes) {
	// 							// Handle Form error error
	// 							if (FormDeleteErr) return done(FormDeleteErr);

	// 							// Set assertions
	// 							(FormDeleteRes.body).should.exist();
	// 							// (FormDeleteRes.body.lodashid).should.equal(FormSaveRes.body.lodashid);

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});

	// 		});
	// });

	// it(' > should not be able to delete an Form if not signed in', function(done) {
	// 	// Set Form user
	// 	myForm.admin = user;

	// 	// Create new Form model instance
	// 	var FormObj = new Form(myForm);

	// 	// Save the Form
	// 	FormObj.save(function() {
	// 		// Try deleting Form
	// 		agent.delete('/forms/' + FormObj.lodashid)
	// 			.expect(401)
	// 			.end(function(FormDeleteErr, FormDeleteRes) {
	// 				// Set message assertion
	// 				(FormDeleteRes.body.message).should.match('User is not logged in');

	// 				// Handle Form error error
	// 				done(FormDeleteErr);
	// 			});

	// 	});
	// });

	// it(' > should be able to upload a PDF an Form if logged in', function(done) {
	// 	userSession.post('/auth/signin')
	// 		.send(credentials)
	// 		.expect('Content-Type', /json/)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {

	// 			// Handle signin error
	// 			if (signinErr) return done(signinErr);

	// 			var user = signinRes.body;
	// 			var userId = user.lodashid;

	// 			// Save a new Form
	// 			userSession.post('/forms')
	// 				.send({form: myForm})
	// 				.expect('Content-Type', /json/)
	// 				.expect(200)
	// 				.end(function(FormSaveErr, FormSaveRes) {
	// 					// Handle Form save error
	// 					if (FormSaveErr) return done(FormSaveErr);

	// 					// Get a list of Forms
	// 					userSession.get('/forms')
	// 						.expect('Content-Type', /json/)
	// 						.expect(200)
	// 						.end(function(FormsGetErr, FormsGetRes) {
	// 							// Handle Form save error
	// 							if (FormsGetErr) return done(FormsGetErr);

	// 							// Get Forms list
	// 							var Forms = FormsGetRes.body;

	// 							// Set assertions
	// 							(Forms[0].admin).should.equal(userId);
	// 							(Forms[0].title).should.match('Form Title');

	// 							// Call the assertion callback
	// 							done();
	// 						});

	// 				});

	// 		});
	// });

	afterEach(function(done) {
		Form.remove({}).exec(function() {
			// Field.remove({}).exec(function(){
				User.remove({}).exec(function() {
					userSession.destroy();
					done();
				});
			// });
		});
	});
});
