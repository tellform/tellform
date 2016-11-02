"use strict";

let fs = require("fs");
let path = require("path");

module.exports.command = function(title) {
	//console.log(this);
	let prefix = this.currentTest.module + '/' + this.currentTest.name + (title ? ("-" + title) : "");
	prefix = prefix.replace(/\s/g, '-').replace(/"|'/g, '');
	let baseFilePath = path.join(this.screenshotsPath, prefix);

	let idx = 2;
	let filePath = baseFilePath + ".png";
	while (fs.existsSync(filePath)) 
		filePath = baseFilePath + "_" + (idx++) + ".png";

	this.saveScreenshot(filePath);
	return this;
}