"use strict";

let mailtrap = require("../../util/mailtrap");
let fakerator = require("fakerator")();

let pauseTime = 100;

let user = fakerator.entity.user();
let company = fakerator.entity.company();
user.name = user.firstName + " " + user.lastName;

describe("Test signup page with password", () => {

	let loginPage;
	let signupPage;
	let homePage;

	let baseURL;

	before((browser, done) => {
		baseURL = 'http://helpbase.dev:' + browser.globals.test_settings.appPort;
		browser.options.baseURL = baseURL;
		signupPage = browser.page.signupPage();
		loginPage = browser.page.loginPage();
		homePage = browser.page.homePage();
		done();
	});

	after((browser, done) => {
		browser.end(() => {
			done();
		});
	});

	it("should give error, if password is too short", (browser) => {
		signupPage.navigate()
			.signup(user.name, user.email, "123", company.name, "abcd")
			.waitForElementPresent(".flash")
			.assert.elementPresent("@flashError")
			.assert.containsText("@flashError", "Password must be at least 6 characters long!")
			.api.pause(pauseTime)
			.makeScreenshot();
	});

	it("should accept signup, if every data is good", (browser) => {
		signupPage.navigate()
			.signup(user.name, user.email, user.password, company.name, "abcd")
			.waitForElementPresent(".flash")
			.assert.elementPresent("@flashInfo")
			.assert.containsText("@flashInfo", "Please check your email to verify your account. Thanks for signing up!")
			.api.pause(pauseTime)
			.assert.urlEquals(loginPage.url)
			.makeScreenshot();

		browser
			.pause(1000) // Wait for email received
			.perform(function(browser, done) {
				//console.log("Check mailbox...");

				let re = /verify\/(\w+)/g;
				mailtrap.getTokenFromMessage(user.email, re, function(err, token, message) {
					if (err)
						throw new Error(err);

					// Delete message
					mailtrap.deleteMessage(null, message.id);

					//console.log("Open verify link: " + baseURL + "/verify/" + token);
					browser.url(baseURL + "/verify/" + token);

					return done();
				});

				return this;
			})
			.pause(pauseTime);

		// Check the user redirected to main app
		homePage
			.waitForElementVisible('@usernameField')
			.assert.urlEquals(loginPage.url)
			.makeScreenshot();

	});

});
