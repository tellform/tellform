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
var user, myForm, mySubmission;

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
			var _form = myForm;
			_form.title = '';

			return _form.save(function(err) {
				should.exist(err);
				should.equal(err.errors.title.message, 'Form Title cannot be blank');
				done();
			});
		});
	});

	describe('Method Find', function(){
		beforeEach(function(done){
			myForm.save(function(err) {
				done();
			});
		});
		it('should be able to findOne my form without problems', function(done) {
			return Form.findOne({_id: myForm._id}, function(err,form) {
				should.not.exist(err);
				should.exist(form);
				should.deepEqual(form.toObject(), myForm.toObject());
				done();
			});
		});
	});


	describe('Test FormField and Submission Logic', function() {
		var new_form_fields_add1, new_form_fields_del, submission_fields, old_fields, form;

		before(function(){
			new_form_fields_add1 = _.clone(myForm.toObject().form_fields);
			new_form_fields_add1.push(
				{'fieldType':'textfield', 'title':'Last Name', 'fieldValue': ''}
			);

			new_form_fields_del = _.clone(myForm.toObject().form_fields);
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
			
		});

		beforeEach(function(done){
			myForm.save(function(){
				mySubmission.save(function(){
					done();
				});
			});
		});

		afterEach(function(done){
			mySubmission.remove(function(){
				done();
			});
		});

		// it('should preserve deleted form_fields that have submissions without any problems', function(done) {

		// 	old_fields = myForm.toObject().form_fields;
		// 	// console.log(old_fields);

		// 	// var expected_fields = old_fields.slice(1,3).concat(old_fields.slice(0,1));

		// 	myForm.form_fields = new_form_fields_del;

		// 	myForm.save(function(err, _form) {

		// 		should.not.exist(err);
		// 		should.exist(_form);

		// 		// var actual_fields = _.map(_form.toObject().form_fields, function(o){ _.omit(o, '_id')});
		// 		// old_fields = _.map(old_fields, function(o){ _.omit(o, '_id')});

		// 		// console.log(old_fields);
		// 		should.deepEqual(JSON.stringify(_form.toObject().form_fields), JSON.stringify(old_fields), 'old form_fields not equal to newly saved form_fields');
		// 		done();
		// 	});
		// });

		// it('should delete \'preserved\' form_fields whose submissions have been removed without any problems', function(done) {

		// 	myForm.form_fields = new_form_fields_del;
		// 	myForm.save(function(err, form
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

	// describe('Method generateFDFTemplate', function() {
	// 	var FormFDF;
	// 	before(function(done){
	// 		return myForm.save(function(err, form){
				
	// 			FormFDF = {
	// 				'First Name': '',
	// 				'nascar': '',
	// 				'hockey': ''
	// 			};
	// 			done();
	// 		});
	// 	});

	// 	it('should be able to generate a FDF template without any problems', function() {
	// 		var fdfTemplate = myForm.generateFDFTemplate();
	// 		(fdfTemplate).should.be.eql(FormFDF);
	// 	});
	// });

	afterEach(function(done) {
		Form.remove({}, function() {
			User.remove().exec(done);
		});
	});
});
