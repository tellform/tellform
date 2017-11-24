var config = require('../config/config'),
	mongoose = require('mongoose'),
  	chalk = require('chalk');

exports.run = function(app, db, cb) {
	console.log(chalk.green('Creating the Admin Account'));

	var User = mongoose.model('User');
	var username =  config.admin.username;
	
	var newUserObj = {
		firstName: 'Admin',
		lastName: 'Account',
		email: config.admin.email,
		username: username,
		roles: config.admin.roles
	};

	var options = {
		upsert: true,
		new: true, 
		setDefaultsOnInsert: true
	}

	User.findOneAndUpdate({username: username}, newUserObj, options, function (err, currUser1) {
		if (err) {
			return cb(err);
		}

		if(!currUser1){
			return cb(new Error('Couldn\'t create admin account'))
		} else {

			currUser1.password = config.admin.password;
			currUser1.save(function(err, currUser2){
				if (err) {
					return cb(err);
				}

				console.log(chalk.green('Successfully created/updated Admin Account'));
				return cb();
			});
		}
	});
}
