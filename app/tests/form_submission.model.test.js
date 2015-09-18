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
	activeCount: 1,
	unparsedDOB: '',
	address: '880-9650 Velit. St.',
	chartNo: '',
	city: '',
	dateJoined: Date.now(),
	dateOfBirth: '10',
	displayName: 'LITTLE, URIAH',
	email: '',
	familyDoctor: '<rdohip></rdohip><rd></rd>',
	firstName: 'Uriah F.',
	hcType: 'BC',
	hin: '',
	hsAlertCount: 0,
	lastName: 'Little',
	lastUpdateDate: Date.now(),
	lastUpdateUser: '',
	links: '',
	monthOfBirth: '05',
	officialLanguage: 'English',
	patientStatus: 'AC',
	patientStatusDate: Date.now(),
	phone: '250-',
	phone2: '',
	postal: "S4M 7T8",
	providerNo: '4',
	province: 'BC',
	rosterStatus: '',
	sex: 'M',
	sexDesc: 'Female',
	sin: '',
	spokenLanguage: 'English',
	title: 'MS.',
	yearOfBirth: '2015' 
}

/**
 * Globals
 */
var user, myForm, mySubmission;

/**
 * Unit tests
 */
describe('FormSubmission Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test1@test.com',
			username: 'test1@test.com',
			password: 'password'
		});

		user.save(function(err, _user) {
			if(err) done(err);

			myForm = new Form({
				title: 'Form Title',
				admin: _user,
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
							lookupField: '',
							updateType: 'force_add',
						},
						auth: config.oscarhost.auth,
					}
				}
			});

			done();
		});
	});

	describe('Method Save', function() {
		var myFieldMap = {};
		beforeEach(function(done){
			myFieldMap[myForm.form_fields[0]._id+''] = 'firstName';
			myFieldMap[myForm.form_fields[1]._id+''] = 'lastName';
			myFieldMap[myForm.form_fields[2]._id+''] = 'sex';
			myFieldMap[myForm.form_fields[3]._id+''] = 'unparsedDOB';
			myFieldMap[myForm.form_fields[4]._id+''] = 'phone';

			myForm.plugins.oscarhost.settings.fieldMap = myFieldMap;

			myForm.save(function(err, form){
				if(err) done(err);

				// var submission_fields = _.cloneDeep(form.toObject().form_fields);

				// var submission_fields = [
				// 	{'fieldType':'textfield', 'title':'What\'s your first name', 'fieldValue': ''},
				// 	{'fieldType':'textfield', 'title':'And your last name',  'fieldValue': ''},
				// 	{'fieldType':'radio', 	'title':'And your sex',  'fieldOptions': [{ 'option_id': 0, 'option_title': 'Male', 'option_value': 'M' }, { 'option_id': 1, 'option_title': 'Female', 'option_value': 'F' }], 'fieldValue': ''},
				// 	{'fieldType':'date', 	    'title':'When were you born?',  'fieldValue': ''},
				// 	{'fieldType':'number', 	'title':'What\'s your phone #?',  'fieldValue': ''}
				// ];

				submission_fields[0].fieldValue = 'David';
				submission_fields[1].fieldValue = 'Baldwynn'+Date.now();
				submission_fields[2].fieldValue = 'M';
				submission_fields[3].fieldValue = Date.now();
				submission_fields[4].fieldValue = 6043158008;

				mySubmission = new FormSubmission({
					admin: user, 
					form: form,
					timeElapsed: 17.55
				});

				// for(var i=0; i<submission_fields.length; i++){
				// 	mySubmission.form_fields.create(submission_fields[i]);
				// }
				done();
			});
		});

		it('should be able to save a FormSubmission without problems', function(done) {
			return mySubmission.save(function(err, submission) {
				should.not.exist(err);
				should.exist(submission.oscarDemoNum);
				done();
			});
		});

		it('should add Patient to OscarHost EMR after save');
	});

	// describe('Method Find', function(){
	// 	beforeEach(function(done){
	// 		myForm.save(function(err) {
	// 			done();
	// 		});
	// 	});
	// 	// it('should be able to findOne my form without problems', function(done) {
	// 	// 	return Form.findOne({_id: myForm._id}, function(err,form) {
	// 	// 		should.not.exist(err);
	// 	// 		should.exist(form);
	// 	// 		should.deepEqual(form.toObject(), myForm.toObject());
	// 	// 		done();
	// 	// 	});
	// 	// });
	// });

	// describe('Test FormField and Submission Logic', function() {
	// 	var new_form_fields_add1, new_form_fields_del, submission_fields, old_fields, form;

	// 	before(function(){
	// 		new_form_fields_add1 = _.clone(myForm.toObject().form_fields);
	// 		new_form_fields_add1.push(
	// 			{'fieldType':'textfield', 'title':'Last Name', 'fieldValue': ''}
	// 		);

	// 		new_form_fields_del = _.clone(myForm.toObject().form_fields);
	// 		new_form_fields_del.splice(0, 1);
		
	// 		//Create Submission
	// 		submission_fields = _.clone(myForm.toObject().form_fields);

	// 		for(var i=0; i<submission_fields.length; i++){
	// 			submission_fields[i] = new Field(submission_fields[i]);
	// 		}
	// 		submission_fields[0].fieldValue = 'David';
	// 		submission_fields[1].fieldValue = true;
	// 		submission_fields[2].fieldValue = true;

	// 		mySubmission = new FormSubmission({
	// 			form_fields: [],
	// 			admin: user, 
	// 			form: myForm,
	// 			timeElapsed: 17.55
	// 		});	
			
	// 		for(var i=0; i<submission_fields.length; i++){
	// 			mySubmission.form_fields.push(submission_fields[i]);
	// 		}	
	// 	});

	// 	beforeEach(function(done){
	// 		myForm.save(function(){
	// 			console.log(mySubmission);
	// 			mySubmission.save(function(err){
	// 				if(err) done(err);
	// 				done();
	// 			});
	// 		});
	// 	});

	// 	afterEach(function(done){
	// 		mySubmission.remove(function(){
	// 			done();
	// 		});
	// 	});

	// 	it('something', function(done){
	// 		done();
	// 	});

	// 	// it('should preserve deleted form_fields that have submissions without any problems', function(done) {

	// 	// 	old_fields = myForm.toObject().form_fields;

	// 	// 	// var expected_fields = old_fields.slice(1,3).concat(old_fields.slice(0,1));

	// 	// 	myForm.form_fields = new_form_fields_del;

	// 	// 	myForm.save(function(err, form) {

	// 	// 		should.not.exist(err);
	// 	// 		should.exist(_form);

	// 	// 		// var actual_fields = _.map(_form.toObject().form_fields, function(o){ _.omit(o, '_id')});
	// 	// 		// old_fields = _.map(old_fields, function(o){ _.omit(o, '_id')});

	// 	// 		// console.log(old_fields);
	// 	// 		should.deepEqual(JSON.stringify(_form.toObject().form_fields), JSON.stringify(old_fields), 'old form_fields not equal to newly saved form_fields');
	// 	// 		done();
	// 	// 	});
	// 	// });

	// 	// it('should delete \'preserved\' form_fields whose submissions have been removed without any problems', function(done) {

	// 	// 	myForm.form_fields = new_form_fields_del;
	// 	// 	myForm.save(function(err, form
	// 	// 		should.not.exist(err);
	// 	// 		(form.form_fields).should.be.eql(old_fields, 'old form_fields not equal to newly saved form_fields');
				
	// 	// 		//Remove submission
	// 	// 		mySubmission.remove(function(err){
	// 	// 			myForm.submissions.should.have.length(0);
	// 	// 			myForm.form_fields.should.not.containDeep(old_fields[0]);
	// 	// 		});
	// 	// 	});
	// 	// });
	// });

	afterEach(function(done) {
		Form.remove().exec(function() {
			User.remove().exec(done);
		});
	});
});
