'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	config = require('../../config/config'),
	fs = require('fs-extra'),
	mUtilities = require('mongoose-utilities'),
	path = require('path'),
	querystring = require('querystring'),
	nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport(config.mailer.options);

// verify connection configuration on startup
smtpTransport.verify(function(error, success) {
	if (error) {
			 console.log('Your mail configuration is incorrect', error);
	} else {
			 console.log('Mail server is ready to take our messages');
	}
});

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	var propHasLength;
	if (property) {
		propHasLength = !!property.length;
	} else {
		propHasLength = false;
	}

	return ((this.provider !== 'local' && !this.updated) || propHasLength);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * A Validation function for username
 */
var validateUsername = function(username) {
	return (username.match(/^[a-zA-Z0-9]+$/) !== null);
};


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
		unique: 'Account already exists with this email',
		required: 'Please enter your email',
		validate: {
			validator: validateLocalStrategyProperty,
			message: 'Please fill in your email'
		},
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	username: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		validate: {
			validator: validateUsername,
			message: 'Please use a valid username'
		}
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
		required: 'Provider is required',
		default: 'local'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin', 'superuser']
		}],
		default: ['user']
	},
	language: {
		type: String,
		enum: ['en', 'fr', 'es', 'it', 'de'],
		default: 'en',
		required: 'User must have a language'
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

UserSchema.virtual('displayName').get(function () {
  	return this.firstName + ' ' + this.lastName;
});

UserSchema.plugin(mUtilities.timestamp, {
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
UserSchema.methods.hashPassword = function(password) {
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

module.exports = mongoose.model('User', UserSchema);
