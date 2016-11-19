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

var waitUntilReady = function (elm) {
	browser.wait(function () {
		return elm.isPresent();
	},10000);
	browser.wait(function () {
		return elm.isDisplayed();
	},10000);
};

describe('Create Forms E2E Tests', function() {
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

	describe('form creation tests', function () {
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

		/*
		 * Tests for adding and /removing each available form field
		 */

		it('should be able to add, configure, and remove a short text field', function (done) {
			//Click button to add this field
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(1) div.panel-heading")).click().then(function() {
				//Click arrow to open new field's dropdown configuration form
				browser.findElement(By.css(".current-fields.container div.dropzoneContainer > div > div:nth-child(1) " +
					"span.pull-right > i.fa.fa-chevron-right")).click().then(function() {
					//Check that form to fill out section opens
					expect(browser.findElement(By.css(".current-fields.container div.dropzoneContainer > div > " +
						"div.panel.panel-default.panel-open > div.panel-collapse.in.collapse")).getCssValue("height")).not.toBe("0px");

					//Fill out section title
					var sectionTitle = browser.findElement(By.css("div.current-fields.container div.dropzoneContainer div.row.question input"));
					sectionTitle.clear();
					sectionTitle.sendKeys("Get User's Name");

					//Fill out section description
					var sectionDescription = browser.findElement(By.css(".current-fields.container div.dropzoneContainer div.row.description textarea"));
					sectionDescription.clear();
					sectionDescription.sendKeys("What is your first name?");

					//Check that live preview contains these values
					expect(browser.findElement(By.css("div.current-fields.container div.dropzoneContainer div." +
						"textfield.field > div.field-title.row-fluid > h3")).getText()).toBe("Get User's Name");

					expect(browser.findElement(By.css(".current-fields.container div.dropzoneContainer div.textfield.field > " +
						"div.col-xs-12.field-title.row-fluid > p")).getText()).toBe("What is your first name?");

					//Remove field by clicking delete button
					browser.findElement(By.css("div.current-fields.container > div:nth-child(3) " +
						"> div:nth-child(2) > div > div > div.panel-heading")).click().then(function() {
						//Todo: Check that description modification panel is removed
						done();
					});

				});
			});
		});


		it('should be able to add an email field ', function (done) {
			//Click button to add this field
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(2) div.panel-heading")).click().then(function() {
				//Click arrow to open new field's dropdown configuration form
				browser.findElement(By.css("div.current-fields.container > div:nth-child(3) > " +
					"div.col-sm-12.col-md-10.dropzoneContainer > div > div.panel.panel-default.panel-open > " +
					"div.panel-heading > h4 > a > span > div > span.pull-right > i.fa.fa-chevron-down")).click().then(function() {
					//Fill out section title
					var sectionTitle = browser.findElement(By.css("div.current-fields.container div.dropzoneContainer div.row.question input"));
					sectionTitle.clear();
					sectionTitle.sendKeys("Get User's Email");

					//Fill out section description
					var sectionDescription = browser.findElement(By.css(".current-fields.container div.dropzoneContainer div.row.description textarea"));
					sectionDescription.clear();
					sectionDescription.sendKeys("Please provide your email");

					//Check that live preview contains these values
					expect(browser.findElement(By.css("div.current-fields.container div.dropzoneContainer div." +
						"textfield.field > div.field-title.row-fluid > h3")).getText()).toBe("Get User's Email");

					expect(browser.findElement(By.css(".current-fields.container div.dropzoneContainer div.textfield.field > " +
						"div.col-xs-12.field-title.row-fluid > p")).getText()).toBe("Please provide your email");

					//Check placeholder value of live preview email input
					expect(browser.findElement(By.css(".current-fields.container > div:nth-child(3) > " +
						"div.col-sm-12.col-md-10.dropzoneContainer ul div.textfield.field.row.ng-scope > " +
						"div.col-xs-12.field-input > input")).getAttribute("placeholder")).toBe("joesmith@example.com");

					//Remove field by clicking delete button
					browser.findElement(By.css("div.col-xs-10.col-sm-8.current-fields.container > div:nth-child(3)" +
						" > div:nth-child(2) > div > div > div")).click().then(function() {
						//Todo: Check that description modification panel is removed
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
