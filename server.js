'use strict';

/**
 * Module dependencies.
 */
var	mongoose = require('mongoose'),
	chalk = require('chalk'),
	nodemailer = require('nodemailer');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */
var bootstrap = function() {
	//Don't check .env file if we are in travis-ci
	if(!process.env.TRAVIS) {
		require('dotenv').config({path: './.env'});
	}
	
	if(!process.env.NODE_ENV) {
	    process.env.NODE_ENV = 'development';
	}

	var config = require('./config/config');

	// Bootstrap db connection
	var db = mongoose.connect(config.db.uri, config.db.options, function (err) {
		if (err) {
			console.error(chalk.red('Could not connect to MongoDB!'));
			console.log(chalk.red(err));
		}
	});
	mongoose.connection.on('error', function (err) {
		console.error(chalk.red('MongoDB connection error: ' + err));
		process.exit(-1);
	});

	const smtpTransport = nodemailer.createTransport(config.mailer.options);

	// verify connection configuration on startup
	smtpTransport.verify(function(error, success) {
		if (error) {
				 console.error(chalk.red('Your mail configuration is incorrect: ' + error));
				 process.exit(-1);
		}
	});

	// Init the express application
	var app = require('./config/express')(db);

	//Create admin account
	if (process.env.CREATE_ADMIN_ACCOUNT === 'TRUE' && process.env.NODE_ENV !== 'test') {
		var create_admin = require('./scripts/create_admin');

		create_admin.run(app, db, function(err){
			if(err){
				console.error(chalk.red('Could not create Admin Account: ' + err));
			}
		});
	}

	// Bootstrap passport config
	require('./config/passport')();

	// Start the app by listening on <port>
	app.listen(config.port);

	// Logging initialization
	console.log('--');
	console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
	console.log(chalk.green('Port:\t\t\t\t' + config.port));
	console.log(chalk.green('Database:\t\t\t' + config.db.uri));
	console.log('--');

	process.on('uncaughtException', function (err) {
		console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
		console.error(err.stack);
		process.exit(1);
	});

	return app;
}

// To maintain backwards compatibility, run bootstrap when called as a file
if(require.main === module) {
	bootstrap();
} else {
	module.exports = bootstrap();
}