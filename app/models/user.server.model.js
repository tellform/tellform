'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	config = require('../../config/config'),
	fs = require('fs-extra'),
	path = require('path');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	},
	email: {
		type: String,
		trim: true,
		unique: 'Account already exists with this email',
		required: 'Please enter your email',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	username: {
		type: String,
		unique: true,
		required: false,
		trim: true
	},
	passwordHash: {
		type: String,
		default: '',
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
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
		enum: ['english', 'french', 'spanish'],
		default: 'english',
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
	token: String
});

UserSchema.virtual('displayName').get(function () {
  	return this.firstName + ' ' + this.lastName;
});


//Create folder for user's pdfs
UserSchema.pre('save', function (next) {
	this.username = this.email;
	if(process.env.NODE_ENV === 'development'){
		var newDestination = path.join(config.pdfUploadPath, this.username.replace(/ /g,'')),
			stat = null;

		try {
	        stat = fs.statSync(newDestination);
	    } catch (err) {
	        fs.mkdirSync(newDestination);
	    }
	    if (stat && !stat.isDirectory()) {
	    	// console.log('Directory cannot be created');
	        next( new Error('Directory cannot be created because an inode of a different type exists at "' + newDestination + '"') );
	    }else{
	    	next();
	    }
	}	
    next();
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


// UserSchema.pre('save', function(next) {
// 	if (this.password && this.password.length > 6) {
// 		this.salt = crypto.randomBytes(16).toString('base64');
// 		this.password = this.hashPassword(this.password);
// 	}

// 	next();
// });


/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	//Generate salt if it doesn't exist yet
	if(!this.salt){
		this.salt = crypto.randomBytes(64).toString('base64');
	}

	if (password) {
		return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 128).toString('base64');
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
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
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
