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
	async = require('async'),
	config = require('../../config/config'),
	FormSubmission = require('../models/form_submission.server.model.js');

var exampleDemo = {
	address: '880-9650 Velit. St.',
	city: '',
	dateOfBirth: '10',
	email: 'polydaic@gmail.com',
	firstName: 'Test User',
	hin: '',
	lastName: 'AddDemographic',
	lastUpdateDate: '2014-10-01 00:00:00',
	monthOfBirth: '05',
	officialLanguage: 'English',
	phone: '250-222-2222',
	phone2: '',
	postal: 'S4M 7T8',
	province: 'BC',
	sex: 'F',
	sexDesc: 'Female',
	sin: '',
	spokenLanguage: 'English',
	title: 'MS.',
	yearOfBirth: '2015'
};


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

_.mixin({
	deepOmit: function(obj, iteratee, context) {
		var r = _.omit(obj, iteratee, context);

		_.each(r, function(val, key) {
			if (typeof(val) === 'object')
				r[key] = _.deepOmit(val, iteratee, context);
		});

		return r;
	}
});


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
			email: 'test1@test.com',
			username: 'test1',
			password: 'password',
			provider: 'local'
		});

		user.save(function(err) {
			if(err){
				done(err);
				return;
			}
			myForm = new Form({
				title: 'Form Title1',
				admin: user._id,
				language: 'en',
				form_fields: [
					{'fieldType':'textfield', 	'title':'What\'s your first name', 	'fieldValue': ''},
					{'fieldType':'textfield', 	'title':'And your last name',  		'fieldValue': ''},
					{'fieldType':'radio', 		'title':'And your sex',  			'fieldOptions': [{ 'option_id': 0, 'option_title': 'Male', 'option_value': 'M' }, { 'option_id': 1, 'option_title': 'Female', 'option_value': 'F' }], 'fieldValue': ''},
					{'fieldType':'date', 	    'title':'When were you born?',  	'fieldValue': ''},
					{'fieldType':'number', 		'title':'What\'s your phone #?',  	'fieldValue': ''}
				]
			});

			myForm.save(function(err, form){
				if(err){
					return done(err);
				}

				var submissionFields = _.clone(myForm.form_fields);
				for(var z=0; z<submissionFields.length; z++){
					submissionFields[z] = _.extend(myForm.form_fields[z], sampleSubmission[z]);
				}

				mySubmission = new FormSubmission({
					admin: user._id,
					form: myForm._id,
					timeElapsed: 17.55,
					form_fields: submissionFields
				});

				done();
			});
		});
	});

	describe('Method Save', function() {
		this.timeout(15000);
		var oscar_demo_num;

		beforeEach(function(done){

			var myFieldMap = {};

			myForm.save(function(err, form){
				if(err) done(err);
				else done();
			});
		});

		it('should be able to save a FormSubmission without problems', function(done) {
			 mySubmission.save(function(err, submission) {
				should.not.exist(err);
				should.exist(submission);
				done();
			});
		});
	});

	describe('Method Find', function(){
		beforeEach(function(done){
			mySubmission.save(function(err) {
				done();
			});
		});
		it('should be able to findOne FormSubmission without problems', function(done) {
			 FormSubmission.findOne({_id: mySubmission._id}).exec(function(err,submission) {
				should.not.exist(err);
				should.exist(submission);
				should.deepEqual(submission.toObject(), mySubmission.toObject());
				done();
			});
		});

		it('should be able to find FormSubmission by $elemMatch on form_fields id', function(done){
			 FormSubmission.findOne({ form: myForm.id, form_fields: {$elemMatch: {_id: myForm.form_fields[0]._id} }  })
				.exec(function(err, submission){
					should.not.exist(err);
					should.exist(submission);
					should.deepEqual(submission.toObject(), mySubmission.toObject());
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
