'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Form = mongoose.model('Form'),
	_ = require('lodash'),
	FormSubmission = mongoose.model('FormSubmission');

/**
 * Globals
 */
var user, myForm, mySubmission, FormFDF;

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
			myForm = new Form({
				title: 'Form Title',
				admin: user,
				language: 'english',
				form_fields: [
					{'fieldType':'textfield', 'title':'First Name', 'fieldValue': ''},
					{'fieldType':'checkbox', 'title':'nascar',      'fieldValue': ''},
					{'fieldType':'checkbox', 'title':'hockey',      'fieldValue': ''}
				]
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return myForm.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without title', function(done) {
			myForm.title = '';

			return myForm.save(function(err) {
				should.exist(err);
				should.equal(err.errors.title.message, 'Title cannot be blank');
				done();
			});
		});
	});

	describe('Test FormField and Submission Logic', function() {
		var new_form_fields_add1, new_form_fields_del, submission_fields, old_fields;

		before(function(done){
			new_form_fields_add1 = _.clone(myForm.form_fields);
			new_form_fields_add1.push(
				{'fieldType':'textfield', 'title':'Last Name', 'fieldValue': ''}
			);

			new_form_fields_del = _.clone(myForm.form_fields);
			new_form_fields_del.splice(0, 1);
		
			submission_fields = _.clone(myForm.toObject().form_fields);
			submission_fields[0].fieldValue = 'David';
			submission_fields[1].fieldValue = true;
			submission_fields[2].fieldValue = true;

			mySubmission = new FormSubmission({
				form_fields: submission_fields,
				admin: user, 
				form: myForm,
				timeElapsed: 17.55
			});

			mySubmission.save(function(){
				done();
			});
		});

		after(function(done){
			mySubmission.remove(function(){
				done();
			});
		});

		beforeEach(function(done){
			old_fields = myForm.toObject().form_fields;
			// console.log(old_fields);
			done();
		});

		it('should preserve deleted form_fields that have submissions without any problems', function(done) {

			var expected_fields = old_fields.slice(1,3).concat(old_fields.slice(0,1));

			// console.log(old_fields);

			myForm.form_fields = new_form_fields_del;
			return myForm.save(function(err, form) {
				should.not.exist(err);
				var actual_fields = form.toObject().form_fields;
				// console.log(actual_fields);

				should.deepEqual(form.toObject().form_fields, expected_fields, 'old form_fields not equal to newly saved form_fields');
				done();
			});
		});

		// it('should delete \'preseved\' form_fields whose submissions have been removed without any problems', function(done) {

		// 	myForm.form_fields = new_form_fields_del;
		// 	myForm.save(function(err, form) {
		// 		should.not.exist(err);
		// 		(form.form_fields).should.be.eql(old_fields, 'old form_fields not equal to newly saved form_fields');
				
		// 		//Remove submission
		// 		mySubmission.remove(function(err){
		// 			myForm.submissions.should.have.length(0);
		// 			myForm.form_fields.should.not.containDeep(old_fields[0]);
		// 		});
		// 	});
		// });

	});

	describe('Method generateFDFTemplate', function() {
		beforeEach(function(done){
			FormFDF = {
				'First Name': '',
				'nascar': '',
				'hockey': ''
			};
			done();
		});

		it('should be able to generate a FDF template without any problems', function(done) {
			var fdfTemplate = myForm.generateFDFTemplate();
			(fdfTemplate).should.be.eql(FormFDF);
			done();
		});
	});

	afterEach(function(done) {
		Form.remove().exec(function() {
			User.remove().exec(done);
		});
	});
});
