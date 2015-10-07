'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Form = mongoose.model('Form'),
	Field = mongoose.model('Field'),
	_ = require('lodash'),
	config = require('../../config/config'),
	FormSubmission = mongoose.model('FormSubmission');

var exampleDemo = { 
	address: '880-9650 Velit. St.',
	city: '',
	dateOfBirth: '10',
	displayName: 'Test User',
	email: 'polydaic@gmail.com',
	firstName: 'Test User',
	hin: '',
	lastName: 'AddDemographic',
	lastUpdateDate: Date.now(),
	monthOfBirth: '05',
	officialLanguage: 'English',
	phone: '250-222-2222',
	phone2: '',
	postal: "S4M 7T8",
	province: 'BC',
	sex: 'F',
	sexDesc: 'Female',
	sin: '',
	spokenLanguage: 'English',
	title: 'MS.',
	yearOfBirth: '2015' 
}


var sampleFormFields = [
	{'fieldType':'textfield', 'title':'What\'s your first name', 'fieldValue': ''},
	{'fieldType':'textfield', 'title':'And your last name',  'fieldValue': ''},
	{'fieldType':'radio', 	'title':'And your sex',  'fieldOptions': [{ 'option_id': 0, 'option_title': 'Male', 'option_value': 'M' }, { 'option_id': 1, 'option_title': 'Female', 'option_value': 'F' }], 'fieldValue': ''},
	{'fieldType':'date', 	    'title':'When were you born?',  'fieldValue': ''},
	{'fieldType':'number', 	'title':'What\'s your phone #?',  'fieldValue': ''}
];

var sampleSubmission = [
	{'fieldType':'textfield', 'title':'What\'s your first name', 'fieldValue': 'David'},
	{'fieldType':'textfield', 'title':'And your last name',  'fieldValue': 'Baldwynn'},
	{'fieldType':'radio', 	'title':'And your sex',  'fieldValue': 'M', 'fieldOptions': [{ 'option_id': 0, 'option_title': 'Male', 'option_value': 'M' }, { 'option_id': 1, 'option_title': 'Female', 'option_value': 'F' }]},
	{'fieldType':'date', 	    'title':'When were you born?',  'fieldValue': 'Tue Oct 06 2015 15:17:48 GMT-0700 (PDT)'},
	{'fieldType':'number', 	'title':'What\'s your phone #?',  'fieldValue': '6043158008'}
];


/**
 * Globals
 */
var user, myForm, mySubmission;

/**
 * Unit tests
 */
describe('FormSubmission Model Unit Tests:', function() {
	this.timeout(15000);
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test1@test.com'+Date.now(),
			username: 'test1@test.com'+Date.now(),
			password: 'password',
			provider: 'local'
		});

		user.save(function(err) {
			if(err){
				console.log(err.errors);
				done(err);
			} 
			myForm = new Form({
				title: 'Form Title1',
				admin: user,
				language: 'english',
				form_fields: [
					{'fieldType':'textfield', 	'title':'What\'s your first name', 	'fieldValue': ''},
					{'fieldType':'textfield', 	'title':'And your last name',  		'fieldValue': ''},
					{'fieldType':'radio', 		'title':'And your sex',  			'fieldOptions': [{ 'option_id': 0, 'option_title': 'Male', 'option_value': 'M' }, { 'option_id': 1, 'option_title': 'Female', 'option_value': 'F' }], 'fieldValue': ''},
					{'fieldType':'date', 	    'title':'When were you born?',  	'fieldValue': ''},
					{'fieldType':'number', 		'title':'What\'s your phone #?',  	'fieldValue': ''},
				], 
				plugins: {
					oscarhost: {
						baseUrl: config.oscarhost.baseUrl,
						settings: {
							updateType: 'force_add',
						},
						auth: config.oscarhost.auth,
					}
				}
			});

			myForm.save(function(err, form){
				if(err){
					console.log(err.errors);
					done(err);
				}

				var submissionFields = _.clone(myForm.form_fields);
				for(var z=0; z<submissionFields.length; z++){
					submissionFields[z] = _.extend(myForm.form_fields[z], sampleSubmission[z]);
				}
				
				mySubmission = new FormSubmission({
					admin: user, 
					form: myForm,
					timeElapsed: 17.55,
					form_fields: submissionFields
				});
				
				done();
			});
		});
	});

	describe('Method Save', function() {
		
		beforeEach(function(done){

			var myFieldMap = {};
			myFieldMap[myForm.form_fields[0]._id+''] = 'firstName';
			myFieldMap[myForm.form_fields[1]._id+''] = 'lastName';
			myFieldMap[myForm.form_fields[2]._id+''] = 'sex';
			myFieldMap[myForm.form_fields[3]._id+''] = 'unparsedDOB';
			myFieldMap[myForm.form_fields[4]._id+''] = 'phone';

			myForm.plugins.oscarhost.settings.fieldMap = myFieldMap;

			myForm.save(function(err, form){
				if(err) done(err);
				done();
			});
		});

		it('should be able to save a FormSubmission without problems', function(done) {
			return mySubmission.save(function(err, submission) {
				if(err) done(err);
				should.not.exist(err);
				should.exist(submission);
				should.exist(submission.oscarDemoNum);
				done();
			});
		});

		it('should add Patient to OscarHost EMR after save');
	});

	describe('Method Find', function(){
		beforeEach(function(done){
			mySubmission.save(function(err) {
				done();
			});
		});
		it('should be able to findOne FormSubmission without problems', function(done) {
			return FormSubmission.findOne({_id: mySubmission._id}, function(err,submission) {
				should.not.exist(err);
				should.exist(submission);
				should.deepEqual(submission.toObject(), mySubmission.toObject());
				done();
			});
		});

		it('should be able to find FormSubmission by $elemMatch on form_fields id', function(done){
			return FormSubmission.findOne({ form: myForm._id, admin: user, form_fields: {$elemMatch: {_id: myForm.form_fields[0]._id} }  })
				.exec(function(err, submission){
					should.not.exist(err);
					should.exist(submission);
					should.deepEqual(submission.toObject(), mySubmission.toObject());
					done();
				});
		});
	});

	describe('Test FormField and Submission Logic', function() {
		var new_form_fields_add1, new_form_fields_del;

		beforeEach(function(done){
			new_form_fields_add1 = _.clone(myForm.toObject().form_fields);
			new_form_fields_add1.push(
				{'fieldType':'textfield', 'title':'Last Name', 'fieldValue': ''}
			);
		
			//Create Submission
			
			mySubmission = new FormSubmission({
				form_fields: sampleSubmission,
				admin: user, 
				form: myForm,
				timeElapsed: 17.55
			});	

			mySubmission.save(function(err){
				if(err) done(err);
				done();
			});
			
		});
		
		it('should preserve deleted form_fields that have submissions without any problems', function(done) {

			var old_fields = myForm.toObject().form_fields;
			var new_form_fields = _.clone(myForm.toObject().form_fields);
			new_form_fields.splice(0, 1);

			myForm.form_fields = new_form_fields;

			myForm.save(function(err, _form) {

				should.not.exist(err);
				should.exist(_form);

				// var actual_fields = _.map(_form.toObject().form_fields, function(o){ _.omit(o, '_id')});
				// old_fields = _.map(old_fields, function(o){ _.omit(o, '_id')});

				// console.log(old_fields);
				should.deepEqual(JSON.stringify(_form.toObject().form_fields), JSON.stringify(old_fields), 'old form_fields not equal to newly saved form_fields');
				done();
			});
		});
		

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

		
		afterEach(function(done){
			mySubmission.remove(function(){
				done();
			});
		});
	});

	describe('Submission of Form should add Patient to OscarHost', function() {
		before(function(done){
			myForm.form_fields = [
				new Field({'fieldType':'textfield', 'title':'What\'s your first name', 'fieldValue': ''}),
				new Field({'fieldType':'textfield', 'title':'And your last name',  'fieldValue': ''}),
				new Field({'fieldType':'radio', 	'title':'And your sex',  'fieldOptions': [{ 'option_id': 0, 'option_title': 'Male', 'option_value': 'M' }, { 'option_id': 1, 'option_title': 'Female', 'option_value': 'F' }], 'fieldValue': ''}),
				new Field({'fieldType':'date', 	    'title':'When were you born?',  'fieldValue': ''}),
				new Field({'fieldType':'number', 	'title':'What\'s your phone #?',  'fieldValue': ''}),
			];
			var myFieldMap = {};
			myFieldMap[myForm.form_fields[0]._id] = 'firstName';
			myFieldMap[myForm.form_fields[1]._id] = 'lastName';
			myFieldMap[myForm.form_fields[2]._id] = 'sex';
			myFieldMap[myForm.form_fields[3]._id] = 'unparsedDOB';
			myFieldMap[myForm.form_fields[4]._id] = 'phone';

			myForm.plugins.oscarhost = {
				baseUrl: config.oscarhost.baseUrl,
				settings: {
					updateType: 'force_add',
					fieldMap: myFieldMap,
				},
				auth: config.oscarhost.auth,
			};

			myForm.save(function(err, form){
				if(err) done(err);

				var submission_fields = _.clone(myForm.toObject().form_fields);
				submission_fields[0].fieldValue = 'David';
				submission_fields[1].fieldValue = 'Baldwynn'+Date.now();
				submission_fields[2].fieldValue = 'M';
				submission_fields[3].fieldValue = Date.now();
				submission_fields[4].fieldValue = 6043158008;

				mySubmission = new FormSubmission({
					form_fields: submission_fields,
					admin: form.admin, 
					form: form,
					timeElapsed: 17.55
				});
				done();
			});
		});
		it('should be able to submit a valid form without problems', function(done) {
			mySubmission.save(function(err, submission) {
				should.not.exist(err);
				should.exist(submission.oscarDemoNum);
				done();
			});
		});
	});

	afterEach(function(done) {
		Form.remove().exec(function() {
			User.remove().exec(function() {
				FormSubmission.remove().exec(done);
			});
		});
	});
});
