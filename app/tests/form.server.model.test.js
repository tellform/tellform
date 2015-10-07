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
describe('Form Model Unit Tests:', function() {

	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		user.save(function() {
			myForm = new Form({
				title: 'Form Title',
				admin: user,
				language: 'english',
				form_fields: [
					{'fieldType':'textfield', title:'First Name', 'fieldValue': ''},
					{'fieldType':'checkbox',  title:'nascar',     'fieldValue': ''},
					{'fieldType':'checkbox',  title:'hockey',     'fieldValue': ''}
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

	afterEach(function(done) {
		Form.remove().exec(function() {
			User.remove().exec(done);
		});
	});
});
