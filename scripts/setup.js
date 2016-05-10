#!/usr/bin/env node

/**
 * Module dependencies.
 */
process.env.NODE_ENV = 'production';

var init = require('../config/init')(),
	config = require('../config/config'),
	mongoose = require('mongoose'),
	inquirer = require('inquirer'),
	envfile = require('envfile'),
	fs = require('fs-extra'),
	chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

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

var nodemailer_providers = [
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

var questions = [
	{
		type: 'confirm',
		name: 'shouldContinue',
		message: 'Do you wish to configure your deployment now?'
	},
	{
		type: 'input',
		name: 'APP_NAME',
		message: 'What do you want to name your TellForm deployment?'
	},
	{
		type: 'input',
		name: 'APP_DESC',
		message: 'Describe your project (for SEO)'
	},
	{
		type: 'input',
		name: 'APP_KEYWORDS',
		message: 'What keywords are relevant to your project (seperate by commas)'
	},
	{
		type: 'confirm',
		name: 'SIGNUP_DISABLED',
		message: 'Do you want to disable signups?',
		default: false
	},
	{
		type: 'list',
		name: 'MAILER_SERVICE_PROVIDER',
		message: 'What email service provider are you using?',
		choices: nodemailer_providers
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
	},
	{
		type: 'input',
		name: 'BASE_URL',
		message: 'What is the url your TellForm will be hosted at?',
		default: '127.0.0.1'
	},
	{
		type: 'input',
		name: 'PORT',
		message: 'What port should the TellForm server run on?',
		default: '3000'
	},
	{
		type: 'input',
		name: 'GOOGLE_ANALYTICS_ID',
		message: 'What is your Google Analytics Tag?'
	},
	{
		type: 'input',
		name: 'email',
		message: 'What should be the email for your admin account?'
	},
	{
		type: 'password',
		name: 'password',
		message: 'What should be the password for your admin account?'
	}
];

console.log(chalk.green('\n\nHi, welcome to TellForm Setup'));

console.log(chalk.green('This will only run the first time you run TellForm\n--------------------------------------------------\n\n'));

inquirer.prompt([questions[0]]).then(function (confirmAns) {
	if(confirmAns['shouldContinue']) {

		inquirer.prompt(questions.slice(1)).then(function (answers) {
			answers['NODE_ENV'] = 'production';

			var email = answers['email'];
			var pass = answers['password'];
			delete answers['email'];
			delete answers['password'];

			envfile.stringify(answers, function (err, str) {
				fs.outputFile('..//.env', str, function(err){
					if (err) return console.error(chalk.red(err));
					console.log(chalk.green('Successfully created .env file'));
				});
				user = new User({
					firstName: 'Admin',
					lastName: 'Account',
					email: email,
					username: email,
					password: pass,
					provider: 'local',
					roles: ['admin', 'user']
				});

				user.save(function (err) {
					if (err) return console.error(chalk.red(err));
					console.log(chalk.green('Successfully created user'));
					delete email;
					delete pass;
				});
			});
		});
	} else {
		console.log(chalk.green('Have fun using TellForm!'));
	}
});
