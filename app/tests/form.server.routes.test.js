'use strict';

var should = require('should'),
	app = require('../../server'),
	Session = require('supertest-session'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Form = mongoose.model('Form'),
	Field = mongoose.model('Field');

/**
 * Globals
 */
var credentials, user, myForm, userSession;

/**
 * Form routes tests
 */
describe('Form Routes Unit tests', function() {

	beforeEach(function(done) {

		// Create user credentials
		credentials = {
			username: 'test',
            email: 'test@test.com',
			password: 'password'
		};

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
				]
			};

            //Initialize Session
            userSession = Session(app);

			done();
		});
	});

	it(' > should be able to upload a PDF to Form if signed in', function(done) {
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
				var userId = user._id;

				// Save a new Form
				userSession.post('/forms')
					.send({form: myForm})
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(FormSaveErr, FormSaveRes) {
						// Handle Form save error
						if (FormSaveErr) {
							return done(FormSaveErr);
						}
					
						// Get a list of Forms
						userSession.get('/forms')
							.expect('Content-Type', /json/)
							.expect(200)
							.end(function(FormsGetErr, FormsGetRes) {
                                				// Handle Form save error
								if (FormsGetErr) {
									return done(FormsGetErr);
								}
							
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

	it(' > should not be able to save a Form if no title is provided', function(done) {
		// Set Form with a invalid title field
		myForm.title = '';

		userSession.post('/auth/signin')
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(signinErr, signinRes) {
				should.not.exist(signinErr);

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
				if (signinErr) {
					return done(signinErr);
				}
			
				// Save a new Form
				userSession.post('/forms')
					.send({form: myForm})
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(FormSaveErr, FormSaveRes) {
						// Handle Form save error
						if (FormSaveErr) return done(FormSaveErr);

						// Update Form title
						myForm.title = 'WHY YOU GOTTA BE SO MEAN?';

						// Update an existing Form
						userSession.put('/forms/' + FormSaveRes.body._id)
							.send({form: myForm})
							.expect('Content-Type', /json/)
							.expect(200)
							.end(function(FormUpdateErr, FormUpdateRes) {
								// Handle Form update error
								if (FormUpdateErr) {
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
	});

	it(' > should be able to read/get a Form if not signed in', function(done) {
		// Create new Form model instance
		var FormObj = new Form(myForm);

		// Save the Form
		FormObj.save(function(err, form) {
			if(err) return done(err);

			userSession.get('/forms/' + form._id)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					if(err) {
						return done(err)
					}
				
					// Set assertion
					(res.body).should.be.an.Object.with.property('title', myForm.title);

					// Call the assertion callback
					done();
				});
		});
	});

	it(' > should be able to delete a Form if signed in', function(done) {

		userSession.post('/auth/signin')
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) {
					return done(signinErr);
				}
			
				// Save a new Form
				userSession.post('/forms')
					.send({form: myForm})
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(FormSaveErr, FormSaveRes) {
						// Handle Form save error
						if (FormSaveErr) {
							return done(FormSaveErr);
						}
					
						// Delete an existing Form
						userSession.delete('/forms/' + FormSaveRes.body._id)
							.send(myForm)
							.expect('Content-Type', /json/)
							.expect(200)
							.end(function(FormDeleteErr, FormDeleteRes) {
								// Handle Form error error
								if (FormDeleteErr) return done(FormDeleteErr);

								// Set assertions
								should.exist(FormDeleteRes.body);
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
			userSession.delete('/forms/' + FormObj._id)
				.expect(401)
				.end(function(FormDeleteErr, FormDeleteRes) {
					// Handle Form error error
					done(FormDeleteErr);
				});

		});
	});


    describe(' > Login and Save a new Form >', function() {
		var _user, _form, _userSession = Session(app);
		it('should be able to login as user', function(done){
			_userSession.post('/auth/signin')
				.send(credentials)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(signinErr, signinRes) {

					// Handle signin error
					if (signinErr) { 
						return done(signinErr);
					}

					_user = signinRes.body;
                    // Save a new Form
                    _userSession.post('/forms')
                        .send({form: myForm})
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(FormSaveErr, FormSaveRes) {
                            // Handle Form save error
                            if (FormSaveErr) {
				    return done(FormSaveErr);
			    }
			    
                            _form = FormSaveRes.body;

                            // Get a list of Forms
                            _userSession.get('/forms/'+_form._id)
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function(FormsGetErr, FormsGetRes) {
                                    // Handle Form save error
                                    if (FormsGetErr) {
					    return done(FormsGetErr);
				    }

                                    var fetchedForm = FormsGetRes.body;
                                    // Set assertions
                                    (fetchedForm.admin._id).should.equal(_user._id);
                                    (fetchedForm.title).should.match(_form.title);

                                    // Call the assertion callback
                                    done();
                                });
                        });
                });
    });
    after('should be able to signout user', function(done){
        userSession.get('/auth/signout')
            .end(function(signoutErr, signoutRes) {

			// Handle signout error
			if (signoutErr) {
				return done(signoutErr);
			}
                    _userSession.destroy();
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
