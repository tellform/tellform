"use strict";

let commands = {
	logout() {
		return this
			.client.api.url("http://"+ this.client.api.options.baseURL + this.client.options.appPort + "/logout")
			.waitForElementVisible(".page h1");
	}
};

module.exports = {
	url(subdomain) {
		console.log('http://'+subdomain + '.helpbase.dev:' +  this.client.options.appPort + "/#!/");
		return 'http://'+subdomain + '.helpbase.dev:' +  this.client.options.appPort + "/#!/";
	},

	commands: [commands],

	elements: {
		title: "h2.title.align-left"
	}
}
