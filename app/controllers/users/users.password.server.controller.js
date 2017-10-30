'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	config = require('../../../config/config'),
	nodemailer = require('nodemailer'),
	async = require('async'),
	crypto = require('crypto'),
	pug = require('pug');

var smtpTransport = nodemailer.createTransport(config.mailer.options);

/**
 * Forgot for reset password (forgot POST)
 */
exports.forgot = function(req, res) {
	async.waterfall([
		// Generate random token
		function(done) {
			crypto.randomBytes(20, function(err, buffer) {
				var token = buffer.toString('hex');
				done(err, token);
			});
		},
		// Lookup user by username
		function(token, done) {
			if (req.body.username) {
				User.findOne({
					$or: [
						{'username': req.body.username.toLowerCase()},
						{'email': req.body.username}
					]
				}, '-salt -password', function(err, user) {
					if(err){
						return res.status(500).send({
							message: err.message
						});
					}
					if (!user) {
						var tempUserModel = mongoose.model(config.tempUserCollection);
						tempUserModel.findOne({
							$or: [
								{'username': req.body.username.toLowerCase()},
								{'email': req.body.username}
							]
						}).lean().exec(function(err, user) {
							if(err){
								return res.status(500).send({
									message: err.message
								});
							}
							if(!user){
								return res.status(400).send({
									message: 'No account with that username or email has been found'
								});	
							}

							return res.status(400).send({
								message: 'The account associated with this email has not been activated yet'
							});
						});
					} else {
						user.resetPasswordToken = token;
						user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

						user.save(function(err) {
							done(err, token, user);
						});
					}
				});
			} else {
				return res.status(400).send({
					message: 'Username field must not be blank'
				});
			}
		},
		function(token, user, done) {
			const fn = pug.compileFile(__dirname + "/../../views/templates/reset-password-email.server.view.pug");
			res.locals['url'] = 'http://' + req.headers.host + '/auth/reset/' + token;
			
			var renderedHtml = fn(res.locals);
			done(null, renderedHtml, user);
		},
		// If valid email, send reset email using service
		function(emailHTML, user, done) {
			var mailOptions = {
				to: user.email,
				from: config.mailer.from,
				subject: 'Password Reset',
				html: emailHTML
			};

            var userEmail = user.email;
			var user = userEmail.split('@')[0];
			var domain = userEmail.split('@')[1];

			var obfuscatedUser = user.substring(0, 1) + user.substring(1).replace(/./g, '*');
			var domainName = domain.split('.')[0];
			var tld = domain.split('.')[1];

			var obfuscatedDomainName = domainName.replace(/./g, '*');
			var obfuscatedEmail = obfuscatedUser + '@' + obfuscatedDomainName + '.' + tld;

			smtpTransport.sendMail(mailOptions, function(err) {
				done(err, obfuscatedEmail);
			});
		}
	], function(err, obfuscatedEmail) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: 'Couldn\'t send reset password email due to internal server errors. Please contact support at team@tellform.com.'
			});
		} else {
			return res.send({
				message: 'An email has been sent to ' + obfuscatedEmail + ' with further instructions.'
			});
		}
	});
};

/**
 * Reset password GET from email token
 */
exports.validateResetToken = function(req, res) {
	User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: {
			$gt: Date.now()
		}
	}, function(err, user) {
		if(err){
			return res.status(500).send({
				message: err.message
			});
		}
		if (!user) {
			return res.redirect(400, '/#!/password/reset/invalid');
		}
		
		res.redirect('/#!/password/reset/' + req.params.token);
	});
};

/**
 * Reset password POST from email token
 */
exports.reset = function(req, res, next) {
	if(req.body.newPassword.length < 4){
		return res.status(400).send({
			message: 'Password must be at least 4 characters long'
		});
	}

	if(req.body.newPassword !== req.body.verifyPassword){
		return res.status(400).send({
			message: 'Passwords do not match'
		});
	}

	// Init Variables
	var passwordDetails = req.body;
	async.waterfall([
		function(done) {
			User.findOne({
				resetPasswordToken: req.params.token,
				resetPasswordExpires: {
					$gt: Date.now()
				}
			}, function(err, user) {
				if (!err && user) {
					user.password = passwordDetails.newPassword;
					user.resetPasswordToken = null;
					user.resetPasswordExpires = null;

					user.save(function(err, savedUser) {
						if (err) {
							done(err, null);
						}
						done(null, savedUser);
					});
				} else {
					done('invalid_reset_token', null);
				}
			});
		},
		function(user, done) {
			const fn = pug.compileFile(__dirname + "/../../views/templates/reset-password-confirm-email.server.view.pug");
			var renderedHtml = fn(res.locals);
			done(null, renderedHtml, user);
		},
		// If valid email, send reset email using service
		function(emailHTML, user, done) {
			var mailOptions = {
				to: user.email,
				from: config.mailer.from,
				subject: 'Your password has been changed',
				html: emailHTML
			};

			smtpTransport.sendMail(mailOptions, function(err) {
				done(err);
			});
		}
	], function(err) {
		if (err) {
			if(err === 'invalid_reset_token'){
				return res.status(400).send({
					message: 'Password reset token is invalid or has expired.'
				});
			}

			return res.status(500).send({
				message: err.message || err
			});
		}

		res.json({
			message: 'Successfully changed your password!'
		});
	});
};

/**
 * Change Password
 */
exports.changePassword = function(req, res) {
	// Init Variables
	var passwordDetails = req.body;

	if (req.user) {
		if (passwordDetails.newPassword) {
			User.findById(req.user.id, function(err, user) {
				if (!err && user) {
					if (user.authenticate(passwordDetails.currentPassword)) {
						if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
							user.password = passwordDetails.newPassword;

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
											res.send({
												message: 'Password changed successfully'
											});
										}
									});
								}
							});
						} else {
							res.status(400).send({
								message: 'Passwords do not match'
							});
						}
					} else {
						res.status(400).send({
							message: 'Current password is incorrect'
						});
					}
				} else {
					res.status(400).send({
						message: 'User is not found'
					});
				}
			});
		} else {
			res.status(400).send({
				message: 'Please provide a new password'
			});
		}
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};
