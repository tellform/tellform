'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	gruntFile = require('grunt').file,
	bowerFiles = require('main-bower-files'),
	path = require('path'),
	fs = require('fs');

var exists = require('path-exists').sync;

var minBowerFiles = function(type){
    return bowerFiles(type).map( function(path, index, arr) {
      var newPath = path.replace(/.([^.]+)$/g, '.min.$1');
      return exists( newPath ) ? newPath : path;
    });
};
/**
 * Load app configurations
 */
 var exports = _.extend(
		require('./env/all'),
		require('./env/' + process.env.NODE_ENV) || {}
	);

//Load keys from api_keys.js if file exists
if( fs.existsSync('./config/env/api_keys.js') ){
	module.exports = _.extend(
		exports,
		require('./env/api_keys')
	);
} else {
	module.exports = exports;
}


/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(globPatterns, removeRoot, addRoot) {

	var files = gruntFile.expand(globPatterns);
	if (removeRoot) {
		files = files.map(function(file) {
			if(addRoot) return file.replace(removeRoot, addRoot);
			return file.replace(removeRoot, '');
		});
	}

	return files;
};

module.exports.removeRootDir = function(files, removeRoot, addRoot) {
	return files.map(function(file) {
		if (addRoot) return file.replace(path.join(process.cwd(), removeRoot), addRoot);
		return file.replace(path.join(process.cwd(), removeRoot), '');
	});
};

/**
 * Get the app's bower dependencies
 */
module.exports.getBowerJSAssets = function() {
	return this.removeRootDir(minBowerFiles('**/**.js'), 'public/', 'static/');
};
module.exports.getBowerCSSAssets = function() {
	return this.removeRootDir(minBowerFiles('**/**.css'), 'public/', 'static/');
};
module.exports.getBowerOtherAssets = function() {
	return this.removeRootDir(minBowerFiles('**/!(*.js|*.css|*.less)'), 'public/', 'static/');
};

/**
 * Helper Function for getJavascriptAssets and getFormJavaScriptAssets
 */
module.exports._getAssets = function(includeTests, isFormJS){
	var unit_tests, js_assets;

	if(isFormJS) {
		js_assets = this.assets.form_js;
		unit_tests = this.assets.form_unit_tests;
	} else {
		js_assets = this.assets.js;
		unit_tests = this.assets.unit_tests;
	}

	var output = this.getGlobbedFiles(js_assets, 'public/', 'static/');

	// To include tests
	if (includeTests) {
		output = _.union(output, this.getGlobbedFiles(unit_tests));
	}

	return output;
};

/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptAssets = function(includeTests) {
	return this._getAssets(includeTests, false);
};

/**
 * Get the modules Form JavaScript files
 */
module.exports.getFormJavaScriptAssets = function(includeTests) {
	return this._getAssets(includeTests, true);
};

/**
 * Get the modules CSS files
 */
module.exports.getCSSAssets = function() {
	var output = this.getGlobbedFiles(this.assets.css, 'public/', 'static/');
	return output;
};
