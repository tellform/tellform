"use strict";

let commands = {
	submit(password, confirm) {
		return this
			.waitForElementVisible('@passwordField', 10000)
			.assert.containsText("@title", "NEW PASSWORD")
			.assert.elementPresent("@passwordField")
			.assert.elementPresent("@confirmField")
			.setValue("@passwordField", password)
			.setValue("@confirmField", confirm)
			.makeScreenshot()
			.click("@submitButton");
	}
};

module.exports = {
	url() {
		return this.client.api.options.baseURL + "/reset";
	},

	commands: [commands],

	elements: {
		title: "form header",
		passwordField: "form #password",
		confirmField: "form #confirm",
		submitButton: "form [type=submit]",

		flashError: ".flash .alert-danger div",
		flashInfo: ".flash .alert-success div"
		
	}

}