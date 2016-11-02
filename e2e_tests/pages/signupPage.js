"use strict";

let commands = {
	signup(name, email, password, company_name, company_subdomain) {
		return this
			.waitForElementVisible('@emailField', 10000)
			.assert.elementPresent("@nameField")
			.assert.elementPresent("@emailField")
			.assert.elementPresent("@companyNameField")
			.assert.elementPresent("@companySubdomainField")
			.assert.elementPresent("@passwordField")
			.setValue("@nameField", name)
			.setValue("@emailField", email)
			.setValue("@passwordField", password)
			.setValue("@companyNameField", company_name)
			.setValue("@companySubdomainField", company_subdomain)
			.makeScreenshot()
			.click("@submitButton");
	}
};

module.exports = {
	url() {
		return this.client.api.options.baseURL + "/signup";
	},

	commands: [commands],

	elements: {
		title: "form header",
		nameField: "form #name",
		companySubdomainField: "form #company_subdomain",
		companyNameField: "form #company_name",
		emailField: "form #email",
		passwordField: "form #password",
		submitButton: "form [type=submit]",

		flashError: ".flash .alert-danger div",
		flashInfo: ".flash .alert-success div"
	}

}
