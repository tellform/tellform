'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	config = require('../../config/config'),
	timeStampPlugin = require('../libs/timestamp.server.plugin'),
	path = require('path'),
	querystring = require('querystring'),
	constants = require('../libs/constants');

/**
 * User Schema
 */
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: ''
	},
	lastName: {
		type: String,
		trim: true,
		default: ''
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: 'Account already exists with this email',
		match: [constants.regex.email, 'Please fill a valid email address'],
		required: [true, 'Email is required']
	},
	username: {
		type: String,
		unique: true,
		lowercase: true,
		match: [constants.regex.username, 'Username can only contain alphanumeric characters and \'-\''],
		required: [true, 'Username is required']
	},
	passwordHash: {
		type: String,
		default: ''
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		default: 'local'
	},
	roles: {
		type: [{
			type: String,
			enum: constants.userRoleTypes
		}],
		default: ['user']
	},
	language: {
		type: String,
		enum: constants.languageTypes,
		default: 'en',
	},
	lastModified: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},

	/* For reset password */
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	},
	token: String,
	apiKey: {
		type: String,
		unique: true,
		index: true,
		sparse: true
	}
});

UserSchema.plugin(timeStampPlugin, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.virtual('password').set(function (password) {
  this.passwordHash = this.hashPassword(password);
});
UserSchema.virtual('password').get(function () {
  return this.passwordHash;
});


/**
 * Create instance method for hashing a password
 */
UserSchema.statics.hashPassword = UserSchema.methods.hashPassword = function(password) {
  var encoding = 'base64';
  var iterations = 10000;
  var keylen = 128;
  var size = 64;
  var digest = 'SHA1';

	//Generate salt if it doesn't exist yet
	if(!this.salt){
		this.salt = crypto.randomBytes(size).toString(encoding);
	}

	if (password) {
		return crypto.pbkdf2Sync(password, new Buffer(this.salt, encoding), iterations, keylen, digest).toString(encoding);
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				return callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		}
		return callback(null);
	});
};

/**
 * Function to check if user has Admin priviledges
 */
UserSchema.methods.isAdmin = function() {
	if(this.roles.indexOf('admin') !== -1){
		return true;
	}
	return false;
};

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');