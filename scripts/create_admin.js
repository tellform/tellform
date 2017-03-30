var init = require('../config/init')(),
	config = require('../config/config'),
	mongoose = require('mongoose'),
  	chalk = require('chalk'),
	fs = require('fs-extra');

// Bootstrap db connection
var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});
mongoose.connection.on('error', function(err) {
	console.error(chalk.red('MongoDB connection error: ' + err));
	process.exit(-1);
});

// Init the express application
var app = require('../config/express')(db);

// Bootstrap passport config
require('../config/passport')();

var User = mongoose.model('User');
require('../app/models/user.server.model.js');

var email = process.env.ADMIN_EMAIL;
var username = process.env.ADMIN_USERNAME;
var password = process.env.ADMIN_PASSWORD;

user = new User({
  firstName: 'Admin',
  lastName: 'Account',
  email: email,
  username: username,
  password: password,
  provider: 'local',
  roles: ['admin', 'user']
});

user.save(function (err) {
  if (err) return console.error(chalk.red(err));
  console.log(chalk.green('Successfully created user'));
  delete email;
  delete password;
  delete username;

  process.exit(1);
});
