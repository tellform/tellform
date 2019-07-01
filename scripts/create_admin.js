var config = require('../config/config'),
	mongoose = require('mongoose'),
  	chalk = require('chalk');

exports.run = function(app, db, cb) {

	var User = mongoose.model('User');
	var email = config.admin.email || 'admin@admin.com';
	
	var newUser = new User({
		firstName: 'Admin',
		lastName: 'Account',
		email: email,
		username: config.admin.username || 'root',
		password: config.admin.password || 'root',
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
