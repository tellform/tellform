/*
"use strict";
 */

var mongoose = require('mongoose');

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

	beforeAll(function(done) {
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

			if (err) return done(err);

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
				if (err) done(err);
				done();
			});
		});
	});

	describe('Edit Profile Tests', function () {
		beforeAll(function (done) {
			browser.get('http://tellform.dev:3001').then(function () {

				expect(browser.getCurrentUrl()).toBe('http://tellform.dev:3001/#!/signin');

				expect(browser.findElement(By.css('button.btn.btn-signup.btn-rounded.btn-block')).getText()).toBe('SIGN IN');

				browser.findElement(By.css('input#username')).sendKeys(credentials.email);
				browser.findElement(By.css('input#password')).sendKeys(credentials.password);

				browser.findElement(By.css('button.btn.btn-signup.btn-rounded.btn-block')).click().then(function () {
					expect(browser.findElement(By.css('h3.text-center.forms-list-title')).getText()).toBe('My Forms');
					expect(browser.getCurrentUrl()).toBe('http://tellform.dev:3001/#!/forms');
					done();
				});
			});
		});

		it('should be able to display edit profile view', function (done) {
			browser.findElement(By.css('li.dropdown')).click();
			browser.findElement(By.css('a#edit-profile')).click().then(function(){
				expect(browser.findElement(By.css('.col-xs-offset-1.col-xs-10.text-center')).getText()).toBe('Edit your profile');
				done();
			});
		});

		it('should be able to save valid profile', function (done) {
			browser.findElement(By.css('input#firstName')).clear();
			browser.findElement(By.css('input#lastName')).clear();

			browser.findElement(By.css('input#firstName')).sendKeys('Sample First Name');
			browser.findElement(By.css('input#lastName')).sendKeys('Sample Last Name');

			browser.findElement(By.css('button[type="submit"]')).click().then(function(){
				expect(browser.findElement(By.css('input#firstName')).getAttribute('value')).toBe('Sample First Name');
				expect(browser.findElement(By.css('input#lastName')).getAttribute('value')).toBe('Sample Last Name');
				done();
			});
		});

		it('should be not be able to save invalid profile', function (done) {

			browser.findElement(By.css('input#email')).clear();
			browser.findElement(By.css('input#email')).sendKeys('aoeuaoeu');

			browser.findElement(By.css('button[type="submit"].btn.btn-signup')).click().then(function(){
				expect(element.all(By.css('input#email.ng-invalid')).count()).toEqual(1);
				done();
			});
		});
	});

	describe('Change Password Tests', function () {

		it('should be able to display change password view', function (done) {
			browser.findElement(By.css('li.dropdown')).click().then(function(){
				browser.findElement(By.css('a#edit-password')).click().then(function(){
					expect(element.all(By.css('h3.col-md-12.text-center')).getText()).toEqual(['Change your password']);
					done();
				});
			});
		});

		it('should not be able to change password if current password is incorrect', function (done) {
			browser.findElement(By.css('input#currentPassword')).sendKeys('aoeuoeu');

			browser.findElement(By.css('input#newPassword')).sendKeys('nttntntn');
			browser.findElement(By.css('input#verifyPassword')).sendKeys('nttntntn');

			browser.findElement(By.css('button[type="submit"]')).click().then(function(){
				expect(browser.findElement(By.css('.text-center.text-danger')).getText()).toBe('Current password is incorrect');
				done();
			});
		});

		it('should not be able to change password if current password is correct', function (done) {
			browser.findElement(By.css('input#currentPassword')).sendKeys(credentials.password);

			browser.findElement(By.css('input#newPassword')).sendKeys('nttntntn');
			browser.findElement(By.css('input#verifyPassword')).sendKeys('nttntntn');

			browser.findElement(By.css('button[type="submit"]')).click().then(function(){
				expect(element.all(By.css('.text-center.text-success')).count()).toEqual(1);
				done();
			});
		});
	});

	afterAll(function(done) {
		User.remove({}).exec(function(err){
			if (err) return done(err);
			done();
		});
	});
});

