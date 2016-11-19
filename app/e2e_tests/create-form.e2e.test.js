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

function clear(elem, length) {
	length = length || 100;
	var backspaceSeries = '';
	for (var i = 0; i < length; i++) {
		backspaceSeries += protractor.Key.BACK_SPACE;
	}
	elem.sendKeys(backspaceSeries);
}

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

		it('should be able to add a short text field', function (done) {
			//Click button to add this field
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(1) div.panel-heading")).click().then(function(){

				browser.findElement(By.css(".current-fields.container div.dropzoneContainer > div > div:nth-child(1) " +
					"span.pull-right > i.fa.fa-chevron-right")).click().then(function(){


					//check that form to fill out section opens
					expect(browser.findElement(By.css(".current-fields.container div.dropzoneContainer > div > " +
						"div.panel.panel-default.panel-open > div.panel-collapse.in.collapse")).getCssValue("height")).not.toBe("0px");

					//Fill out section title
					var sectionTitle = browser.findElement(By.css("div.current-fields.container div.dropzoneContainer div.row.question input"));
					sectionTitle.getAttribute('value').then(function (text) {
						var len = text.length;
						var backspaceSeries = Array(len+1).join(protractor.Key.BACK_SPACE);
						sectionTitle.sendKeys(backspaceSeries+"Get User's Name").then(function(){

							//Check that live preview contains these values
							expect(browser.findElement(By.css("span.col-xs-10")).getText()).toBe("Get User's Name *");

							done();
						});
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
