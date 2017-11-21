#!/usr/bin/env node

/**
 * Module dependencies.
 */
process.env.NODE_ENV = 'production';

var config = require('../config/config'),
	mongoose = require('mongoose'),
	inquirer = require('inquirer'),
	envfile = require('envfile'),
	fs = require('fs-extra'),
	chalk = require('chalk'),
	_ = require('lodash');

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
require('../config/express')(db);

// Bootstrap passport config
require('../config/passport')();

var User = mongoose.model('User');
require('../app/models/user.server.model.js');

var nodemailer_providers = [
	'Custom Mailserver',
	'1und1',
	'AOL',
	'DebugMail.io',
	'DynectEmail',
	'FastMail',
	'GandiMail',
	'Gmail',
	'Godaddy',
	'GodaddyAsia',
	'GodaddyEurope',
	'hot.ee',
	'Hotmail',
	'iCloud',
	'mail.ee',
	'Mail.ru',
	'Mailgun',
	'Mailjet',
	'Mandrill',
	'Naver',
	'OpenMailBox',
	'Postmark',
	'QQ',
	'QQex',
	'SendCloud',
	'SendGrid',
	'SES',
	'SES-US-EAST-1',
	'SES-US-WEST-1',
	'SES-EU-WEST-1',
	'Sparkpost',
	'Yahoo',
	'Yandex',
	'Zoho'
];

var replaceENVQuestion = 	{
	type: 'confirm',
	name: 'replaceENVFile',
	message: 'An older .env file already exists. Do you want to replace it?',
	default: false
};

var questionsPart1 = [
	{
		type: 'list',
		name: 'NODE_ENV',
		message: 'What mode do you want to run TellForm in?',
		choices: ['development', 'production', 'test'],
		default: 'development'
	},
	{
		type: 'input',
		name: 'APP_NAME',
		message: 'What do you want to name your TellForm deployment?'
	},
	{
		type: 'input',
		name: 'APP_DESC',
		message: 'Describe your project (for SEO)  (optional)'
	},
	{
		type: 'confirm',
		name: 'SIGNUP_DISABLED',
		message: 'Do you want to disable signups?',
		default: false
	},
	{
		type: 'confirm',
		name: 'SUBDOMAINS_DISABLED',
		message: 'Do you want to disable subdomains? (i.e. are you using a custom domain)'
	},
	{
		type: 'list',
		name: 'MAILER_SERVICE_PROVIDER',
		message: 'What email service provider are you using?',
		choices: nodemailer_providers
	}
]

var mailerWellKnownQuestions = [
	{
		type: 'input',
		name: 'MAILER_EMAIL_ID',
		message: 'What is your SMTP username?'
	},
	{
		type: 'password',
		name: 'MAILER_PASSWORD',
		message: 'What is your SMTP password?'
	},
	{
		type: 'input',
		name: 'MAILER_FROM',
		message: 'What do you want the default "from" email address to be?'
	}
];

var mailerCustomQuestions = [
	{
		type: 'input',
		name: 'MAILER_SMTP_HOST',
		message: 'What is your SMTP server url?'
	},
	{
		type: 'input',
		name: 'MAILER_SMTP_PORT',
		message: 'What is your SMTP server port?'
	},
	{
		type: 'confirm',
		name: 'MAILER_SMTP_SECURE',
		message: 'Is your SMTP server using SSL/TLS?'
	},
	{
		type: 'input',
		name: 'MAILER_SMTP_HOST',
		message: 'What is your SMTP host domain?'
	},
	{
		type: 'input',
		name: 'MAILER_EMAIL_ID',
		message: 'What is your SMTP username?'
	},
	{
		type: 'password',
		name: 'MAILER_PASSWORD',
		message: 'What is your SMTP password?'
	},
	{
		type: 'input',
		name: 'MAILER_FROM',
		message: 'What do you want the default "from" email address to be?'
	}
];

var questionsPart2 = [
	{
		type: 'input',
		name: 'MONGODB_URI',
		message: 'What is the URI of your Mongo database?',
		default: 'mongodb://localhost/mean'
	},
	{
		type: 'input',
		name: 'MONGODB_URI',
		message: 'What is the URI of your Redis installation?',
		default: 'redis://127.0.0.1:6379'
	},
	{
		type: 'input',
		name: 'BASE_URL',
		message: 'What is the (root) url your TellForm will be hosted at?',
		default: 'localhost'
	},
	{
		type: 'input',
		name: 'PORT',
		message: 'What port should the TellForm server run on?',
		default: '3000'
	},
	{
		type: 'input',
		name: 'email',
		message: 'What should be the email for your admin account?'
	},
	{
		type: 'input',
		name: 'username',
		message: 'What should be the username for your admin account?'
	},
	{
		type: 'password',
		name: 'password',
		message: 'What should be the password for your admin account?'
	}
];

var exitProcess = function() {
	console.log(chalk.green('Have fun using TellForm!'));
	process.exit(1);
}

var removeENVFile = function(){
	fs.unlinkSync('./\.env')
}

var createENVFile = function() {
	inquirer.prompt(questionsPart1).then(function (answersPart1) {
		var nextQuestions = mailerWellKnownQuestions.concat(questionsPart2);
		if(answersPart1['MAILER_SERVICE_PROVIDER'] === 'Custom Mailserver'){
			 nextQuestions = mailerCustomQuestions.concat(questionsPart2);
		}

		inquirer.prompt(nextQuestions).then(function (answersPart2) {
			var answers = _.extend(answersPart1, answersPart2);
			answers = _.mapValues(answers, function(val){
				if(_.isBoolean(val)){
					return val ? 'TRUE' : 'FALSE';
				}
				return val;
			});

			var email = answers['email'];
			var username = answers['username'];
			var pass = answers['password'];
			delete answers['email'];
			delete answers['password'];

			envfile.stringify(answers, function (err, str) {
        try {
				  fs.outputFileSync('./\.env', str);
        } catch (fileErr) {
			    return console.error(chalk.red(fileErr));
			  }

		    console.log(chalk.green('Successfully created .env file'));

				user = new User({
					firstName: 'Admin',
					lastName: 'Account',
					email: email,
					username: username,
					password: pass,
					provider: 'local',
					roles: ['admin', 'user']
				});

				user.save(function (userSaveErr) {
					if (err) {
						return console.error(chalk.red(userSaveErr));
					}

					console.log(chalk.green('Successfully created user'));

					exitProcess();
				});
			});
		});
	});
}

console.log(chalk.green('\n\nWelcome to TellForm Setup'));

console.log(chalk.green('You should only need to run this script the first time you run TellForm\n------------------------------------------------------------------------\n\n'));

if(fs.existsSync('./\.env')) {
	inquirer.prompt([replaceENVQuestion]).then(function (envAnswer) {
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
