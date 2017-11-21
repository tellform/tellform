#!/usr/bin/env node

/**
 * Module dependencies.
 */

var	mongoose = require('mongoose'),
	inquirer = require('inquirer'),
	envfile = require('envfile'),
	fs = require('fs-extra'),
	chalk = require('chalk'),
	constants = require('./setup_constants'),
	_ = require('lodash');

var exitProcess = function() {
	console.log(chalk.green('TellForm has been successfully setup'));
	console.log(chalk.green('Have fun using TellForm!'));
	process.exit(1);
}

var removeENVFile = function() {
	fs.unlinkSync('./\.env')
}

var createOrUpdateAdminUser = function(username, email, password, cb){
	//Command Line Bootstrapping Code
	if (require.main === module) {
		var config = require('../config/config');

		// Bootstrap db connection
		var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
			if (err) {
				console.error(chalk.red('Could not connect to MongoDB!'));
				return cb(new Error(err));
			}
		});
		mongoose.connection.on('error', function(err) {
			return cb(new Error('MongoDB connection error: ' + err));
		});

		// Init the express application
		require('../config/express')(db);

		// Bootstrap passport config
		require('../config/passport')();
	}

	var User = require('../app/models/user.server.model.js');

	var updateObj = {
		firstName: 'Admin',
		lastName: 'Account',
		username: username,
		email: email,
		password: pass,
		provider: 'local',
		roles: ['admin', 'user']
	}

	var options = {
		upsert: true,
		new: true, 
		setDefaultsOnInsert: true
	}

	User.findOneAndUpdate({ username: username }, updateObj, options, function (err, result) {
		if (err) {
			return cb(err);
		}

		if(!result){
			return cb(new Error('Admin User could not be created'));
		}

		delete pass;
		delete email;
		delete username;

		console.log(chalk.green('Successfully created user'));

		cb();
	});

}

var createENVFile = function() {
	inquirer.prompt(constants.questionsPart1).then(function (answersPart1) {
		var nextQuestions = constants.mailerWellKnownQuestions.concat(constants.questionsPart2);
		if(answersPart1['MAILER_SERVICE_PROVIDER'] === 'Custom Mailserver'){
			nextQuestions = constants.mailerCustomQuestions.concat(constants.questionsPart2);
		}

		inquirer.prompt(nextQuestions).then(function (answersPart2) {
			var answers = _.chain(anwsersPart1)._extend(answersPart2).mapValues(function(val){
				if(_.isBoolean(val)){
					return val ? 'TRUE' : 'FALSE';
				}
				return val;
			}).values();

			var email = answers['email'];
			var username = answers['username'];
			var pass = answers['password'];
			delete answers['email'];
		  	delete answers['username'];
			delete answers['password'];

			envfile.stringify(answers, function (err, str) {
	        try {
				fs.outputFileSync('./\.env', str);
	        } catch (fileErr) {
				console.error(chalk.red(fileErr));
				process.exit(-1);
			}	

  			console.log(chalk.green('Successfully created .env file'));

				createOrUpdateAdminUser(username, email, pass, function(err){
					if(err) {
						console.error(chalk.red(err.message));
						process.exit(-1);
					}

					exitProcess();
				});
				
			});
		});
	});
}

var runSetup = function(){
	console.log(chalk.green('\n\nWelcome to TellForm Setup'));

	console.log(chalk.green('You should only need to run this script the first time you run TellForm\n------------------------------------------------------------------------\n\n'));

	if(fs.existsSync('./\.env') && require.main === module) {
		inquirer.prompt([constants.replaceENVQuestion]).then(function (envAnswer) {
			if (envAnswer['replaceENVFile']) {
				removeENVFile();
				createENVFile();
			} else {
				exitProcess();
			}
		});
	} else {
		createENVFile();
	}
}

module.exports.runSetup = runSetup;

if(require.main === module) {
	runSetup();
}
