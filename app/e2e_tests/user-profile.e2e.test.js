"use strict";

var should = require('should'),
	mongoose = require('mongoose');

var user, myForm;

// Create user credentials
var credentials = {
	email: 'testoeoeoee'+Math.floor(10000%Math.random()*100000)+'@test.com',
	username: 'tesoeeo'+Math.floor(10000%Math.random()*100000),
	password: 'passwordeoeo'
};

describe('User Profile E2E Tests', function() {
	var Form = mongoose.model('Form'),
		Field = mongoose.model('Field'),
		User = mongoose.model('User');

	this.timeout(50000);
	before(function async() {
		return new Promise(function(resolve, reject) {

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
			user.save(function (err) {
				should.not.exist(err);
				if (err) return reject(err);

				myForm = new Form({
					title: 'Form Title',
					language: 'en',
					admin: user.id,
					form_fields: [
						new Field({'fieldType':'textfield', 'title':'First Name', 'fieldValue': ''}),
						new Field({'fieldType':'checkbox', 'title':'nascar',      'fieldValue': ''}),
						new Field({'fieldType':'checkbox', 'title':'hockey',      'fieldValue': ''})
					]
				});

				myForm.save(function(err){
					if (err) return reject(err);
					resolve();
				});
			});
		});
	});

	describe('Edit Profile Tests', function () {
		before(function () {
			browser.url('http://tellform.dev:3001');

			browser.waitForExist('button.btn.btn-signup.btn-rounded.btn-block', 5000);
			browser.getUrl().should.equal('http://tellform.dev:3001/#!/signin');
			var title = browser.getTitle();
			title.should.equal('TellForm Test');

			var siginButtonText = browser.getText('button.btn.btn-signup.btn-rounded.btn-block');
			siginButtonText.should.equal('SIGN IN');

			browser.setValue('input#username', credentials.email);
			browser.setValue('input#password', credentials.password);

			browser.click('button.btn.btn-signup.btn-rounded.btn-block');

			browser.waitForExist('h3.text-center.forms-list-title', 10000);
			browser.getText('h3.text-center.forms-list-title').should.equal('My Forms');
			browser.getUrl().should.equal('http://tellform.dev:3001/#!/forms');

		});

		it('should be able to display edit profile view', function () {
			browser.click('li.dropdown');
			browser.click('a#edit-profile');
			browser.waitForExist('.col-xs-offset-1.col-xs-10.text-center', 5000);
			browser.getText('.col-xs-offset-1.col-xs-10.text-center').should.equal('Edit your profile');
		});

		it('should be able to save valid profile', function () {
			browser.setValue('input#firstName', 'Sample First Name');
			browser.setValue('input#lastName', 'Sample Last Name');

			browser.click('button[type="submit"].btn.btn-signup');

			browser.waitForVisible('.text-center.text-success', 5000);
			browser.isVisible('.text-center.text-danger').should.be.false;

			browser.getValue('input#firstName').should.equal('Sample First Name');
			browser.getValue('input#lastName').should.equal('Sample Last Name');
		});

		it('should be not be able to save invalid profile', function () {
			browser.setValue('input#email', 'aoeuaoeu');

			browser.click('button[type="submit"].btn.btn-signup');

			browser.waitForVisible('input#email.ng-invalid', 5000);
		});
	});

	describe('Change Password Tests', function () {

		it('should be able to display change password view', function () {
			browser.click('li.dropdown');
			browser.click('a#edit-password');
			browser.waitForExist('h3.col-md-12.text-center', 5000);
			browser.getText('h3.col-md-12.text-center').should.equal('Change your password');
		});

		it('should not be able to change password if current password is incorrect', function () {
			browser.setValue('input#currentPassword', 'aoeuoeu');

			browser.setValue('input#newPassword', 'nttntntn');
			browser.setValue('input#verifyPassword', 'nttntntn');

			browser.click('button[type="submit"]');

			browser.waitForExist('.text-center.text-danger', 5000);
			browser.getText('.text-center.text-danger').should.equal('Current password is incorrect');
		});

		it('should not be able to change password if current password is correct', function () {
			browser.setValue('input#currentPassword', credentials.password);

			browser.setValue('input#newPassword', 'nttntntn');
			browser.setValue('input#verifyPassword', 'nttntntn');

			browser.click('button[type="submit"]');

			browser.waitForExist('.text-center.text-success', 5000);
		});
	});

	after(function async() {
		return new Promise(function(resolve, reject) {
			User.remove({}).exec(function(err){
				if (err) return reject(err);
				resolve();
			});
		});
	});
});
