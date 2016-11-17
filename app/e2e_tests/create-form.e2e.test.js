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

		it('should be able to add a short text field', function () {
			//Click button to add this field
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(1) div.panel-heading")).click();

			browser.findElement(By.css(".current-fields.container div.dropzoneContainer > div > div:nth-child(1) " +
				"span.pull-right > i.fa.fa-chevron-right")).click();

			//check that form to fill out section opens
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

		});

		it('should be able to remove this short text field', function () {
			//Click trash button for this section
			browser.findElement(By.css("div.current-fields.container > div:nth-child(3) " +
				"> div:nth-child(2) > div > div > div.panel-heading")).click();
			//Check that description modification panel is removed
		});

		it('should be able to add an email field ', function () {
			//Click button to add this field
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(2) div.panel-heading")).click();

			//Click button to expand configuration panel
			browser.findElement(By.css("div.current-fields.container > div:nth-child(3) > " +
				"div.col-sm-12.col-md-10.dropzoneContainer > div > div.panel.panel-default.panel-open > " +
				"div.panel-heading > h4 > a > span > div > span.pull-right > i.fa.fa-chevron-down")).click();

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
		});

		it('should be able to remove this email field', function () {
			//Click trash button for this section
			browser.findElement(By.css("div.col-xs-10.col-sm-8.current-fields.container > div:nth-child(3)" +
				" > div:nth-child(2) > div > div > div")).click();
			//Check that description modification panel is removed

		});

		it('should be able to add a multiple choice field', function () {
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(3) div.panel-heading")).click();

			//Click button to expand configuration panel
			browser.findElement(By.css("div.col-xs-10.col-sm-8.current-fields.container > div:nth-child(1) > div > " +
				"div > div.panel-heading.accordion-toggle.collapsed > h4 > span > i.fa.fa-chevron-right")).click();

			//Fill out section title
			var sectionTitle = browser.findElement(By.css("div.col-xs-10.col-sm-8.current-fields.container > " +
				"div:nth-child(3) > div.col-sm-12.col-md-10.dropzoneContainer > div > " +
				"div.panel.panel-default.panel-open > div.panel-collapse.in.collapse > div > div > div.row.question " +
				"> div.col-md-8.col-sm-12 > input"));
			sectionTitle.clear();
			sectionTitle.sendKeys("What is your favourite food?");

			//Fill out section description
			var sectionDescription = browser.findElement(By.css("div.col-xs-10.col-sm-8.current-fields.container > " +
				"div:nth-child(3) > div.col-sm-12.col-md-10.dropzoneContainer > div > " +
				"div.panel.panel-default.panel-open > div.panel-collapse.in.collapse > div > div > div.row.description " +
				"> div.col-md-8.col-sm-12 > textarea"));
			sectionDescription.clear();
			sectionDescription.sendKeys("Please select your favourite food");

			//Set up two options
			var addOptionButton = browser.findElement(By.css("div.col-xs-10.col-sm-8.current-fields.container > " +
				"div:nth-child(3) > div.col-sm-12.col-md-10.dropzoneContainer > div > " +
				"div.panel.panel-default.panel-open > div.panel-collapse.in.collapse > div > div > " +
				"div.row.options.ng-scope > div.col-md-8.col-xs-12 > div:nth-child(2) > button"));
			addOptionButton.click();

			var optionOne = browser.findElement(By.css("div.col-xs-10.col-sm-8.current-fields.container > " +
				"div:nth-child(3) > div.col-sm-12.col-md-10.dropzoneContainer > div > " +
				"div.panel.panel-default.panel-open > div.panel-collapse.in.collapse > div > div > " +
				"div.row.options.ng-scope > div.col-md-8.col-xs-12 > div:nth-child(1) > input"));
			optionOne.clear();
			optionOne.sendKeys("Hamburgers");
			var optionTwo = browser.findElement(By.css("div.col-xs-10.col-sm-8.current-fields.container > " +
				"div:nth-child(3) > div.col-sm-12.col-md-10.dropzoneContainer > div > " +
				"div.panel.panel-default.panel-open > div.panel-collapse.in.collapse > div > div > " +
				"div.row.options.ng-scope > div.col-md-8.col-xs-12 > div:nth-child(2) > input"));
			optionTwo.clear();
			optionTwo.sendKeys("Pasta");

			//Check that live preview contains these values
			expect(browser.findElement(By.css("div.col-xs-10.col-sm-8.current-fields.container > div:nth-child(3) > " +
				"div.col-sm-12.col-md-10.dropzoneContainer > div > div.panel.panel-default.panel-open > " +
				"div.panel-collapse.in.collapse > div > div > div.row.hidden-sm.hidden-xs > ul > field-directive > d" +
				"iv > div.col-xs-12.field-title > h3")).getText()).toBe("What is your favourite food?");

			expect(browser.findElement(By.css(".current-fields.container div.dropzoneContainer div.textfield.field > " +
				"div.col-xs-12.field-title.row-fluid > p")).getText()).toBe("Please select your favourite food");

			expect(browser.findElement(By.css("div.col-xs-10.col-sm-8.current-fields.container > div:nth-child(3) > " +
				"div.col-sm-12.col-md-10.dropzoneContainer > div > div.panel.panel-default.panel-open > " +
				"div.panel-collapse.in.collapse > div > div > div.row.hidden-sm.hidden-xs > ul > field-directive > " +
				"div > div.col-xs-12.field-input > div:nth-child(1) > label > span")).getText()).toBe("Hamburgers");

			expect(browser.findElement(By.css("div.col-xs-10.col-sm-8.current-fields.container > div:nth-child(3) > " +
				"div.col-sm-12.col-md-10.dropzoneContainer > div > div.panel.panel-default.panel-open > " +
				"div.panel-collapse.in.collapse > div > div > div.row.hidden-sm.hidden-xs > ul > field-directive > " +
				"div > div.col-xs-12.field-input > div:nth-child(2) > label > span")).getText()).toBe("Pasta");

		});

		it('should be able to remove this multiple choice field', function () {
			//Click trash button for this section
			browser.findElement(By.css("div.col-xs-10.col-sm-8.current-fields.container > div:nth-child(3) > " +
				"div:nth-child(2) > div > div > div")).click();
			//Check that description modification panel is removed
		});

		it('should be able to add a dropdown field', function () {
			//browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(4) div.panel-heading"))
		});

		it('should be able to remove this dropdown field', function () {

		});

		/*it('should be able to add a date field', function () {
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(5) div.panel-heading"))
		});

		it('should be able to remove this date field', function () {

		});

		it('should be able to add a paragraph text field', function () {
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(6) div.panel-heading"))
		});

		it('should be able to remove this paragraph text field', function () {

		});

		it('should be able to add a yes/no field', function () {
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(7) div.panel-heading"))
		});

		it('should be able to remove this yes/no field', function () {

		});

		it('should be able to add a legal field', function () {
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(8) div.panel-heading"))
		});

		it('should be able to remove this legal field', function () {

		});

		it('should be able to add a rating field', function () {
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(9) div.panel-heading"))
		});

		it('should be able to remove this rating field', function () {

		});

		it('should be able to add a link field', function () {
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(10) div.panel-heading"))
		});

		it('should be able to remove this link field', function () {

		});

		it('should be able to add a numbers field', function () {
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(11) div.panel-heading"))
		});

		it('should be able to remove this numbers field', function () {

		});

		it('should be able to add a statement field', function () {
			browser.findElement(By.css(".add-field > div.panel-group > div:nth-child(12) div.panel-heading"))
		});

		it('should be able to remove this statement field', function () {

		});*/
	});

	afterAll(function(done) {
		User.remove({}).exec(function(err){
			if (err) return done(err);
			done();
		});
	});
});
