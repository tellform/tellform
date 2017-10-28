'use strict';

/**
 * Module dependencies.
 */
var errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	config = require('../../../config/config'),
	User = mongoose.model('User'),
	tokgen = require('../../libs/tokenGenerator'),
	fs = require('fs'),
	i18n = require('i18n'),
	async = require('async'),
	pug = require('pug');

var nev = require('email-verification')(mongoose);

// NEV setup and configuration ================
var config_nev = function () {

	nev.configure({

		verifyMailOptions: {
	        from: config.mailer.from
	    },

	    confirmMailOptions: {
	        from: config.mailer.from
	    },

	    persistentUserModel: User,
	    tempUserCollection: config.tempUserCollection,
        emailAndUsernameUnique: true,
	    expirationTime: 86400,  // 24 hours

	    verificationURL: config.baseUrl+'/#!/verify/${URL}',
	    transportOptions: config.mailer.options,
	    
	    verifySendMailCallback: function(err, info) {
	      if (err) {
	        throw err;
	      }
	    }

	}, function(err, options){
		if(err) {
			throw err;
		}
	});

	nev.generateTempUserModel(User, function(err){
		if(err) {
			throw err;
		}
	});
};

config_nev();

exports.validateVerificationToken = function(req, res){

	const fn = pug.compileFile(__dirname + "/../../views/welcome.email.view.pug");
	var renderedHtml = fn(res.locals);

    var emailTemplate = {
        subject: i18n.__('WELCOME_EMAIL_SUBJECT', config.app.title),
        html: renderedHtml,
        text: i18n.__('WELCOME_EMAIL_TEXT')
    };

	nev.confirmTempUser(req.params.token, emailTemplate, function(err, user) {
	    if(err) {
			return res.status(500).send( {message: err } );
	    } else if (user){
	        return res.status(200).send('User successfully verified');
	    }
	    // redirect to resend verification email
	    else {
	    	return res.status(400).send( {message: 'Verification token is invalid or has expired'} );
	    } 
	});
};

exports.resendVerificationEmail = function(req, res, next){
	const fn = pug.compileFile(__dirname + "/../../views/verification.email.view.pug");
	var renderedHtml = fn(res.locals);

	var emailTemplate = {
        subject: i18n.__('VERIFICATION_EMAIL_SUBJECT'),
        html: renderedHtml,
        text: i18n.__('VERIFICATION_EMAIL_TEXT')
    };

	nev.resendVerificationEmail(req.body.email, emailTemplate, function(err, userFound) {
		if(err) {
			return res.status(500).send( {message: errorHandler.getErrorMessage(err)  } );
	    }

	    if (userFound){
	        res.status(200).send('Verification email successfully Re-Sent');
	    }else {
	        // user hasn't been found yet
	        res.status(400).send( {message: 'Error: User has not been registered yet'} );
	    }
	});
};

/**
 * Signup
 */
exports.signup = function(req, res) {
	// For security measures we remove the roles from the req.body object
	delete req.body.roles;

	// Init Variables
	var user = new User(req.body);

	// Set language to visitor's language
	user.language = req.cookies['userLang'];

	// Add missing user fields
	user.provider = 'local';

	if(req.body.password.length < 4){
		return res.status(400).send({
			message: 'Password must be at least 4 characters long'
		});
	}
	
	// Then save the temporary user
	nev.createTempUser(user, function (err, existingPersistentUser, newTempUser) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		// new user created
		if (newTempUser) {
			const fn = pug.compileFile(__dirname + "/../../views/verification.email.view.pug");
			var renderedHtml = fn(res.locals);

			var URL = newTempUser[nev.options.URLFieldName];
			var emailTemplate = {
		        subject: i18n.__('VERIFICATION_EMAIL_SUBJECT'),
		        html: renderedHtml,
		        text: i18n.__('VERIFICATION_EMAIL_TEXT')
		    };

			nev.sendVerificationEmail(user.email, URL, emailTemplate, function (sendEmailErr, info) {
				if (sendEmailErr) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				}
				return res.status(200).send('An email has been sent to you. Please check it to verify your account.');
			});
		} else {
			return res.status(400).send({message: 'User with username/email already exists!'});
		}
	});
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	console.log(req.body);
	if(req.body.password.length < 4){
		return res.status(400).send({
			message: 'Password must be at least 4 characters long'
		});
	}

	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			// Remove sensitive data before login
			user.password = null;
			user.salt = null;
			user.provider = null;

			req.login(user, function(loginErr) {
				if (loginErr) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(loginErr)
					});
				}

				res.cookie('langCookie', user.language, { maxAge: 90000, httpOnly: true });
				return res.json(user);
			});
		}
	})(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	if(req.cookies.hasOwnProperty('userLang')){
		res.destroyCookie('userLang');
	}
	req.logout();
	return res.status(200).send('You have successfully logged out.');
};

/* Generate API Key for User */
exports.generateAPIKey = function(req, res) {
	if (!req.isAuthenticated()){
		return res.status(400).send({
			message: 'User is not Authorized'
		});
	}

	User.findById(req.user.id)
		.exec( function(err, user) {
			if (err) {
				return res.status(400).send(err);
			}

			if (!user) {
				return res.status(400).send({
					message: 'User does not Exist'
				});
			}

			user.apiKey = tokgen();

			user.save(function(userSaveErr, _user) {
				if (userSaveErr) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(userSaveErr)
					});
				}

				var newUser = _user.toObject();
				delete newUser.salt;
				delete newUser.__v;
				delete newUser.passwordHash;
				delete newUser.provider;

				return res.json(newUser);
			});

		});
};
