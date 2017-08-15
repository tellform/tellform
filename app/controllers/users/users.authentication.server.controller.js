'use strict';

/**
 * Module dependencies.
 */
var errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	config = require('../../../config/config'),
	User = mongoose.model('User'),
	tokgen = require('../../libs/tokenGenerator');


var nev = require('email-verification')(mongoose);

// NEV setup and configuration ================
var config_nev = function () {

	nev.configure({
	    persistentUserModel: User,
	    tempUserCollection: config.tempUserCollection,
        emailAndUsernameUnique: true,
	    expirationTime: 86400,  // 24 hours

	    verificationURL: config.baseUrl+'/#!/verify/${URL}',
	    transportOptions: config.mailer.options,
	    verifyMailOptions: {
	        from: config.mailer.from,
	        subject: 'Confirm your account',
	        html: '<p>Please verify your account by clicking <a href="http://${URL}">this link</a>. If you are unable to do so, copy and ' +
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
	console.log(req.user);
	nev.confirmTempUser(req.params.token, function(err, user) {
	    console.log(err);
	    if(err) {
		return res.status(500).send( {message: err } );
	    }
	    else if (user){
	        return res.status(200).send('User successfully verified');
	    }
	    // redirect to resend verification email
	    else return res.status(400).send( {message: 'Verification token is invalid or has expired'} );
	});
};

exports.resendVerificationEmail = function(req, res, next){
	nev.resendVerificationEmail(req.body.email, function(err, userFound) {
		if(err) {
			console.log(errorHandler.getErrorMessage(err));
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

	// Add missing user fields
	user.provider = 'local';
	// Then save the temporary user
	nev.createTempUser(user, function (err, existingPersistentUser, newTempUser) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}


		// new user created
		if (newTempUser) {
			var URL = newTempUser[nev.options.URLFieldName];
			nev.sendVerificationEmail(user.email, URL, function (sendEmailErr, info) {
				if (sendEmailErr) {

					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				}
				return res.status(200).send('An email has been sent to you. Please check it to verify your account.');
			});
		} else {
            console.log(err);
			return res.status(400).send({message: 'Error: User already exists!'});
		}
	});
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
			user.password = null;
			user.salt = null;
			user.provider = null;

			req.login(user, function(loginErr) {
				if (loginErr) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(loginErr)
					});
				}
				return res.json(user);
			});
		}
	})(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
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
						var newUser = new User({
							firstName: providerUserProfile.firstName,
							lastName: providerUserProfile.lastName,
							username: availableUsername,
							displayName: providerUserProfile.displayName,
							email: providerUserProfile.email,
							provider: providerUserProfile.provider,
							providerData: providerUserProfile.providerData
						});

						// And save the user
						newUser.save(function(userSaveErr) {
							return done(userSaveErr, user);
						});
					});
				}
				return done(err, user);
			}
		});
	} else {
		// User is already logged in, join the provider data to the existing user
		var user = req.user;

		// Check if user exists, is not signed in using this provider, and doesn't have that provider data already configured
		if (user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
			// Add the provider data to the additional provider data field
			if (!user.additionalProvidersData) {
				user.additionalProvidersData = {};
			}
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
