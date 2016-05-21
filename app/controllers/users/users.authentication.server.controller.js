'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	async = require('async'),
	config = require('../../../config/config'),
	nodemailer = require('nodemailer'),
	crypto = require('crypto'),
	User = mongoose.model('User');

var nev = require('email-verification')(mongoose);

// NEV setup and configuration ================
var config_nev = function () {

	var User = require('../../models/user.server.model');

	nev.configure({
	    persistentUserModel: User,
	    tempUserCollection: config.tempUserCollection,
	    expirationTime: 1800,  // 30 minutes

	    verificationURL: config.baseUrl+'/#!/verify/${URL}',
	    transportOptions: config.mailer.options,
	    verifyMailOptions: {
	        from: config.mailer.from,
	        subject: 'Confirm your account',
	        html: '<p>Please verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
	                'paste the following link into your browser:</p><p>${URL}</p>',
	        text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
	    },

	    confirmMailOptions: {
	        from: config.mailer.from,
	        subject: 'Account successfully verified!',
	        html: '<p>Your account has been successfully verified.</p>',
	        text: 'Your account has been successfully verified.'
	    },
	    verifySendMailCallback: function(err, info) {
	      if (err) {
	        throw err;
	      } else {
	        console.log(info);
	      }
	    }

	}, function(err, options){
		if(err) throw err;
		nev.generateTempUserModel(User);
	});
};

config_nev();

var smtpTransport = nodemailer.createTransport(config.mailer.options);

exports.validateVerificationToken = function(req, res){
	nev.confirmTempUser(req.params.token, function(err, user) {
	    if(err) {
			console.log(errorHandler.getErrorMessage(err));
			return res.status(500).send( {message: errorHandler.getErrorMessage(err) } );
	    }
	    else if (user){
	        return res.status(200).send('User successfully verified');
	    }else {
	        // redirect to resend verification email
	        return res.status(400).send( {message: 'Verification token is invalid or has expired'} );
	    }
	});
};

exports.resendVerificationEmail = function(req, res, next){
	nev.resendVerificationEmail(req.body.email, function(err, userFound) {
		if(err) {
			console.log(errorHandler.getErrorMessage(err));
			return res.status(500).send( {message: errorHandler.getErrorMessage(err)  } );
	    }

	    if (userFound){
	    	console.log('hello');
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
	if (req.body) {
		delete req.body.roles;
		console.log(req.body);

		// Init Variables
		var user = new User(req.body);

		// Add missing user fields
		user.provider = 'local';
		user.username = user.email;

		// Then save the temporary user
		nev.createTempUser(user, function (err, newTempUser) {

			if (err) {
				console.log('Error: ');
				console.log(err);
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {

				// new user created
				if (newTempUser) {
					nev.registerTempUser(newTempUser, function (err) {
						if (err) {
							console.log('Error: ');
							console.log(err);
							return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
							});
						} else {
							return res.status(200).send('An email has been sent to you. Please check it to verify your account.');
						}
					});
				} else {
					console.log('Error: User already exists!');
					return res.status(400).send({message: 'Error: User already exists!'});
				}
			}
		});
	} else {
		res.status(500).send('Incomplete Data');
	}
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;
			user.provider = undefined;

			req.login(user, function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					return res.json(user);
				}
			});
		}
	})(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	//res.redirect('/');
	return res.status(200).send('You have successfully logged out.');

};

/**
 * OAuth callback
 */
exports.oauthCallback = function(strategy) {
	return function(req, res, next) {
		passport.authenticate(strategy, function(err, user, redirectURL) {
			if (err || !user) {
				return res.redirect('/#!/signin');
			}
			req.login(user, function(err) {
				if (err) {
					return res.redirect('/#!/signin');
				}

				return res.redirect(redirectURL || '/');
			});
		})(req, res, next);
	};
};

/**
 * Helper function to save or update a OAuth user profile
 */
exports.saveOAuthUserProfile = function(req, providerUserProfile, done) {
	if (!req.user) {
		// Define a search query fields
		var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
		var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;

		// Define main provider search query
		var mainProviderSearchQuery = {};
		mainProviderSearchQuery.provider = providerUserProfile.provider;
		mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

		// Define additional provider search query
		var additionalProviderSearchQuery = {};
		additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

		// Define a search query to find existing user with current provider profile
		var searchQuery = {
			$or: [mainProviderSearchQuery, additionalProviderSearchQuery]
		};

		User.findOne(searchQuery, function(err, user) {
			if (err) {
				return done(err);
			} else {
				if (!user) {
					var possibleUsername = providerUserProfile.username || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '');

					User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
						user = new User({
							firstName: providerUserProfile.firstName,
							lastName: providerUserProfile.lastName,
							username: availableUsername,
							displayName: providerUserProfile.displayName,
							email: providerUserProfile.email,
							provider: providerUserProfile.provider,
							providerData: providerUserProfile.providerData
						});

						// And save the user
						user.save(function(err) {
							return done(err, user);
						});
					});
				} else {
					return done(err, user);
				}
			}
		});
	} else {
		// User is already logged in, join the provider data to the existing user
		var user = req.user;

		// Check if user exists, is not signed in using this provider, and doesn't have that provider data already configured
		if (user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
			// Add the provider data to the additional provider data field
			if (!user.additionalProvidersData) user.additionalProvidersData = {};
			user.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;

			// Then tell mongoose that we've updated the additionalProvidersData field
			user.markModified('additionalProvidersData');

			// And save the user
			user.save(function(err) {
				return done(err, user, '/#!/settings/accounts');
			});
		} else {
			return done(new Error('User is already connected using this provider'), user);
		}
	}
};

/**
 * Remove OAuth provider
 */
exports.removeOAuthProvider = function(req, res, next) {
	var user = req.user;
	var provider = req.param('provider');

	if (user && provider) {
		// Delete the additional provider
		if (user.additionalProvidersData[provider]) {
			delete user.additionalProvidersData[provider];

			// Then tell mongoose that we've updated the additionalProvidersData field
			user.markModified('additionalProvidersData');
		}

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	}
};
