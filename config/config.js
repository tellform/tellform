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
}else {
	module.exports = exports;
}


/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {

	var files = gruntFile.expand(globPatterns);
	if (removeRoot) {
		files = files.map(function(file) {
			return file.replace(removeRoot, '');
		});
	}

	return files;
};

module.exports.removeRootDir = function(files, root) {
	return files.map(function(file) {
		return file.replace(path.join(process.cwd(),root), '');
	});
};

/**
 * Get the app's bower dependencies
 */
module.exports.getBowerJSAssets = function() {
	return this.removeRootDir(minBowerFiles('**/**.js'), 'public/');
};
module.exports.getBowerCSSAssets = function() {
	return this.removeRootDir(minBowerFiles('**/**.css'), 'public/');
};
module.exports.getBowerOtherAssets = function() {
	return this.removeRootDir(minBowerFiles('**/!(*.js|*.css|*.less)'), 'public/');
};

/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptAssets = function(includeTests) {
	var output = this.getGlobbedFiles(this.assets.js, 'public/');

	// To include tests
	if (includeTests) {
		output = _.union(output, this.getGlobbedFiles(this.assets.tests));
	}

	return output;
};

/**
 * Get the modules CSS files
 */
module.exports.getCSSAssets = function() {
	var output = this.getGlobbedFiles(this.assets.css, 'public/');
	return output;
};
