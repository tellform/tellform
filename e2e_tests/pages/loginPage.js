"use strict";

let commands = {
	login(username, password) {
		return this
			.waitForElementVisible('@usernameField', 10000)
			.assert.elementPresent("@usernameField")
			.assert.elementPresent("@passwordField")
			.setValue("@usernameField", username)
			.setValue("@passwordField", password)
			.makeScreenshot()
			.click("@submitButton");
	}
};

module.exports = {
	url() {
		return this.client.api.options.baseURL + "/login";
	},

	commands: [commands],

	elements: {
		formImage: ".row > .col > img.responsive-image",
		usernameField: "form #username",
		passwordField: "form #password",
		submitButton: "form [type=submit]",

		flashError: ".flash .alert-danger div",
		flashInfo: ".flash .alert-success div"
	}

}
