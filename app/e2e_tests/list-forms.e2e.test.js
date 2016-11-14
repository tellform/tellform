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

describe('List Forms E2E Tests', function() {
	var Form = mongoose.model('Form'),
		Field = mongoose.model('Field'),
		User = mongoose.model('User');

	beforeAll(function (done) {

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
				if (err) return done(err);
				done();
			});
		});
	});

	describe('authenticated tests', function () {
		beforeAll(function (done) {
			browser.get('http://tellform.dev:3001').then(function(){

				expect(browser.getCurrentUrl()).toBe('http://tellform.dev:3001/#!/signin');

				expect(browser.findElement(By.css('button.btn.btn-signup.btn-rounded.btn-block')).getText()).toBe('SIGN IN');

				browser.findElement(By.css('input#username')).sendKeys(credentials.email);
				browser.findElement(By.css('input#password')).sendKeys(credentials.password);

				browser.findElement(By.css('button.btn.btn-signup.btn-rounded.btn-block')).click().then(function(){
					expect(browser.findElement(By.css('h3.text-center.forms-list-title')).getText()).toBe('My Forms');
					expect(browser.getCurrentUrl()).toBe('http://tellform.dev:3001/#!/forms');
					done();
				});
			});
		});

		it('should be able to display forms in list view', function () {
			expect(browser.findElement(By.css('h4.list-group-item-heading:first-child')).getText()).toBe('Form Title');
		});

		it('should be able to duplicate a form', function (done) {
			browser.findElement(By.css('.fa.fa-files-o')).click().then(function(){
				expect(browser.findElement(By.css('h4.list-group-item-heading')).getText()).toEqual('Form Title');
				done();
			});
		});

		it('should be able to open the admin panel of a form', function (done) {
			browser.findElement(By.css('a.title-row.col-xs-12')).click().then(function(){
				expect(browser.getCurrentUrl()).not.toBe('http://tellform.dev:3001/#!/forms');
				expect(browser.findElement(By.css('h1.hidden-sm.hidden-xs')).getText()).toBe('Form Title');
				done();
			});
		});

		it('should be able to create a new form', function (done) {

			browser.findElement(By.css('.navbar-header a.navbar-brand')).click().then(function(){
				expect(browser.getCurrentUrl()).toBe('http://tellform.dev:3001/#!/forms');

				browser.findElement(By.css('.form-item.create-new')).click().then(function() {
					expect(browser.getCurrentUrl()).toBe('http://tellform.dev:3001/#!/forms');

					browser.findElement(By.css('.create-new .title-row input')).sendKeys('Example Form');

					browser.findElement(By.css('.create-new .submit.row .btn')).click().then(function(){
						expect(browser.getCurrentUrl()).not.toBe('http://tellform.dev:3001/#!/forms');
						expect(browser.findElement(By.css('h1.hidden-sm.hidden-xs')).getText()).toBe('Example Form');
						done();
					});
				});

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
