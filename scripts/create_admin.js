var config = require('../config/config'),
	mongoose = require('mongoose'),
  	chalk = require('chalk');

exports.run = function(app, db, cb) {

	var User = mongoose.model('User');

	var email = config.ADMIN_EMAIL || 'admin@admin.com';
	var username = config.ADMIN_USERNAME || 'admin';
	var password = config.ADMIN_PASSWORD || 'admin';

	var newUser = new User({
		firstName: 'Admin',
		lastName: 'Account',
		email: email,
		username: username,
		password: password,
		provider: 'local',
		roles: ['admin', 'user']
	});

	User.findOne({email: email}, function (err, user) {
		if (err) {
			cb(err);
		}

		if(!user){
			newUser.save(function (userErr) {
				if (userErr) {
					return cb(userErr);
				}
				console.log(chalk.green('Successfully created Admin Account'));

				cb();
			});
		} else {
			cb('User already exists!');
		}
	});
}
