"use strict";

var	mongoose = require('mongoose');

var credentials, user;

describe('Login E2E Tests', function() {
	var User = mongoose.model('User');

	beforeEach(function(done) {

		// Create user credentials
		credentials = {
			email: 'testoeoeoee'+Math.floor(1000%Math.random()*1000)+'@test.com',
			username: 'tesoeeo'+Math.floor(1000%Math.random()*1000),
			password: 'passwordeoeo'
		};

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
			done()
		});
	});

	it('should be able to login with valid email and password', function (done) {
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

	it('should be able to login with valid username and password', function (done) {
		browser.get('http://tellform.dev:3001').then(function(){

			expect(browser.getCurrentUrl()).toBe('http://tellform.dev:3001/#!/signin');

			expect(browser.findElement(By.css('button.btn.btn-signup.btn-rounded.btn-block')).getText()).toBe('SIGN IN');

			browser.findElement(By.css('input#username')).sendKeys(credentials.username);
			browser.findElement(By.css('input#password')).sendKeys(credentials.password);

			browser.findElement(By.css('button.btn.btn-signup.btn-rounded.btn-block')).click().then(function(){
				expect(browser.findElement(By.css('h3.text-center.forms-list-title')).getText()).toBe('My Forms');
				expect(browser.getCurrentUrl()).toBe('http://tellform.dev:3001/#!/forms');
				done();
			});
		});
	});

	it('should be not able to login with invalid credentials', function (done) {
		browser.get('http://tellform.dev:3001').then(function(){

			expect(browser.getCurrentUrl()).toBe('http://tellform.dev:3001/#!/signin');

			expect(browser.findElement(By.css('button.btn.btn-signup.btn-rounded.btn-block')).getText()).toBe('SIGN IN');

			browser.findElement(By.css('input#username')).sendKeys('aoeuaoeu');
			browser.findElement(By.css('input#password')).sendKeys('aoeuaoeu');

			browser.findElement(By.css('button.btn.btn-signup.btn-rounded.btn-block')).click().then(function(){
				expect(browser.findElement(By.css('button.btn.btn-signup.btn-rounded.btn-block')).getText()).toBe('SIGN IN');
				expect(browser.getCurrentUrl()).not.toBe('http://tellform.dev:3001/#!/forms');
				done();
			});
		});
	});

	it('should be not able to login with no credentials', function (done) {
		browser.get('http://tellform.dev:3001').then(function(){

			expect(browser.getCurrentUrl()).toBe('http://tellform.dev:3001/#!/signin');

			expect(browser.findElement(By.css('button.btn.btn-signup.btn-rounded.btn-block')).getText()).toBe('SIGN IN');

			browser.findElement(By.css('input#username')).sendKeys('');
			browser.findElement(By.css('input#password')).sendKeys('');

			browser.findElement(By.css('button.btn.btn-signup.btn-rounded.btn-block')).click().then(function(){
				expect(browser.findElement(By.css('button.btn.btn-signup.btn-rounded.btn-block')).getText()).toBe('SIGN IN');
				expect(browser.getCurrentUrl()).not.toBe('http://tellform.dev:3001/#!/forms');
				done();
			});
		});
	});

	it('should output the coverage object.', function() {
		browser.driver.executeScript("return __coverage__;").then(function(val) {
			fs.writeFileSync("e2e_coverage/coverageE2E.json", JSON.stringify(val));
		});
	});

	afterEach(function (done) {
		User.remove({}).exec(function(err){
			if (err) return done(err);
			done();
		});
	});
});
