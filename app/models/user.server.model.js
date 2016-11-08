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
	config = require('../../config/config'),
	nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport(config.mailer.options);


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
 * User Schema
 */
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: '',
		/*validate: {
			validator: validateLocalStrategyProperty,
			message: 'Please fill in your first name'
		}*/
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		/*validate: {
			validator: validateLocalStrategyProperty,
			message: 'Please fill in your last name'
		}*/
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
		required: false,
		lowercase: true,
		trim: true
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
	},
});

UserSchema.virtual('displayName').get(function () {
  	return this.firstName + ' ' + this.lastName;
});

UserSchema.plugin(mUtilities.timestamp, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
});

/*
UserSchema.pre('find', function (next) {

	//Change username if it is still the user's email
	if (this.username === this.email) {
		var emailUsername = this.email.split('@')[0];
		this.username = querystring.stringify({query: emailUsername});

		var mailOptions = {
			from: '"TellForm Support" <noreply@tellform.com>', // sender address
			to: this.email, // list of receivers
			subject: 'Your TellForm Username has Changed', // Subject line
			text: 'Due to upgrades, your TellForm username has change from ' + this.email + ' to ' + this.username + '. Please use your new username to login.\n Using your old username will not work.\n We apologize for the inconvenience,\n - the TellForm team', // plaintext body
		};
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				return console.error(error);
			}
			console.log('Username change message sent: ' + info.response);
		});
	}
});*/

UserSchema.pre('save', function (next) {

	//Change username if it is still the user's email
	if(this.username === this.email){
		var emailUsername = this.email.split('@')[0];
		this.username = querystring.stringify({ query: emailUsername });

		var mailOptions = {
			from: '"TellForm Support" <noreply@tellform.com>', // sender address
			to: this.email, // list of receivers
			subject: 'Your TellForm Username has Changed', // Subject line
			text: 'Due to upgrades, your TellForm username has change from ' + this.email + ' to ' + this.username + '. Please use your new username to login.\n Using your old username will not work.\n We apologize for the inconvenience,\n - the TellForm team', // plaintext body
		};
		smtpTransport.sendMail(mailOptions, function(error, info){
			if(error){
				return console.error(error);
			}
			console.log('Username change message sent: ' + info.response);
		});
	}

	//Create folder for user's pdfs
	if(process.env.NODE_ENV === 'local-development'){
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

module.exports = mongoose.model('User', UserSchema);
