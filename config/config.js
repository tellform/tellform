'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	glob = require('glob'),
	bowerFiles = require('main-bower-files'),
	path = require('path'),
	fs = require('fs');

var exists = require('path-exists').sync;

var minBowerFiles = function(type){
    return bowerFiles(type).map( function(path, index, arr) {
      var newPath = path.replace(/.([^.]+)$/g, '.min.$1');
      return exists( newPath ) ? newPath : path;
    });
}
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
	// For context switching
	var _this = this;

	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			var files = glob.sync(globPatterns);
			if (removeRoot) {
				files = files.map(function(file) {
					return file.replace(removeRoot, '');
				});
			}

			output = _.union(output, files);
		}
	}

	return output;
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
