"use strict";

let mailtrap = require("../../util/mailtrap");

let pauseTime = 100;

describe.only("Test login page with username and password", () => {

	let loginPage;
	let homePage;

	let baseURL;

	before((browser, done) => {
		baseURL = 'http://helpbase.dev:' + browser.globals.test_settings.appPort;
		browser.options.baseURL = baseURL;
		loginPage = browser.page.loginPage();
		homePage = browser.page.homePage();
		done();
	});

	after((browser, done) => {
		browser.end(() => {
			done();
		});
	});

	it("should give error, if username/email does not exist", (browser) => {
		loginPage.navigate()
			.waitForElementPresent('form.validate-form')
			.login("johnnn", "johnny")
			.waitForElementPresent(".flash")
			.assert.elementPresent("@flashError")
			.assert.containsText("@flashError", "Unknow username or e-mail")
			.api.pause(pauseTime)
			.makeScreenshot();
	});

	it("should give error, if password is incorrect", (browser) => {
		loginPage.navigate()
			.login("test", "1234567")
			.waitForElementPresent(".flash")
			.assert.elementPresent("@flashError")
			.assert.containsText("@flashError", "Unknown user or invalid password")
			.api.pause(pauseTime)
			.makeScreenshot();
	});

	it("should redirect to main, if credentials correct", (browser) => {
	loginPage.navigate()
	.login("test", "test1234")
	.api.pause(pauseTime)
	.makeScreenshot();

	homePage
	.waitForElementVisible("@title")
	.assert.containsText("@title", "Dashboard")
	.assert.urlEquals('http://polydaic.helpbase.dev:3000/#!/")
	.makeScreenshot();
	});

	it("should jump to index, after logout", (browser) => {
	// Logout
	browser.url(http://polydaic.helpbase.dev:3000 + "/logout")
	.waitForElementVisible("h1.center-align")
	.assert.urlEquals(baseURL + "/")
	.assert.elementPresent("h1.center-align")
	.pause(pauseTime)
	.makeScreenshot();
	});

});

