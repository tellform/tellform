/*"use strict";

let mailtrap = require("../../util/mailtrap");

let pauseTime = 100;

describe("Test forgot page", () => {

	let forgotPage;
	let resetPage;
	let homePage;
	let loginPage;

	let baseURL;

	before((browser, done) => {
		baseURL = 'http://localhost:' + browser.globals.test_settings.appPort;
		browser.options.baseURL = baseURL;

		forgotPage = browser.page.forgotPage();
		resetPage = browser.page.resetPage();
		homePage = browser.page.homePage();
		loginPage = browser.page.loginPage();
		done();
	});

	after((browser, done) => {
		browser.end(() => {
			done();
		});
	});

	it("should give error, if email is not found", (browser) => {
		forgotPage.navigate()
			.submit("chuck.norris@notfound.me")
			.waitForElementPresent(".flash")
			.assert.elementPresent("@flashError")
			.assert.containsText("@flashError", "The email address chuck.norris@notfound.me is not associated with any account.")
			.api.pause(pauseTime)
			.makeScreenshot();
	});

	it("should send rest email, if email is correct", (browser) => {
		forgotPage.navigate()
			.submit("test@boilerplate-app.com")
			.waitForElementPresent(".flash")
			.assert.elementPresent("@flashInfo")
			.assert.containsText("@flashInfo", "An email has been sent to test@boilerplate-app.com with further instructions.")
			.api.pause(pauseTime)
			.makeScreenshot();

		browser
			.pause(1000) // Wait for email received
			.perform(function(browser, done) {
				console.log("Check mailbox...");

				let re = /reset\/(\w+)/g;
				mailtrap.getTokenFromMessage("test@boilerplate-app.com", re, function(err, token, message) {
					if (err)
						throw new Error(err);

					// Delete message
					mailtrap.deleteMessage(null, message.id);

					console.log("Open reset link: " + baseURL + "/reset/" + token);
					browser.url(baseURL + "/reset/" + token);

					return done();
				});

				return this;
			})
			.pause(pauseTime);

		// Try to reset password
		resetPage
			.waitForElementVisible("@passwordField")

			// password is too short
			.submit("123", "123")
			.waitForElementPresent(".flash")
			.assert.elementPresent("@flashError")
			.assert.containsText("@flashError", "Password must be at least 6 characters long!")
			.api.pause(pauseTime)
			.makeScreenshot()

		resetPage
			// invalid confirm password
			.submit("newPassword", "otherConfirmPassword")
			.waitForElementPresent(".flash")
			.assert.elementPresent("@flashError")
			.assert.containsText("@flashError", "Passwords must match.")
			.api.pause(pauseTime)
			.makeScreenshot()

		resetPage
			// correct new password
			.submit("newPassword", "newPassword")
			.api.pause(pauseTime)

		// Check we logged in automatically
		homePage
			.waitForElementVisible("@title")
			.assert.urlEquals(homePage.url)
			.assert.containsText("@title", "Home")
			.makeScreenshot();

		// Logout
		homePage
			.logout()

		// Login with the new password
		loginPage.navigate()
			.login("test", "newPassword");

		homePage
			.waitForElementVisible("@title")
			.assert.urlEquals(homePage.url)
			.assert.containsText("@title", "Home")
			.makeScreenshot();


	});


});
*/
