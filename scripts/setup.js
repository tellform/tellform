#!/usr/bin/env node

/**
 * Module dependencies.
 */
process.env.NODE_ENV = 'production';

var  config = require('../config/config'),
	mongoose = require('mongoose'),
	inquirer = require('inquirer'),
	envfile = require('envfile'),
	fs = require('fs-extra'),
	chalk = require('chalk');

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

var bool_options = [
	"TRUE",
	"FALSE"
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
		message: 'Describe your project (for SEO)  (optional)'
	},
	{
		type: 'input',
		name: 'APP_KEYWORDS',
		message: 'What keywords are relevant to your project (seperate by commas)  (optional)'
	},
	{
		type: 'confirm',
		name: 'SIGNUP_DISABLED',
		message: 'Do you want to disable signups?',
		default: false
	},
	{
		type: 'list',
		name: 'SUBDOMAINS_DISABLED',
		message: 'Do you want to have subdomains? (i.e. are you using a custom domain)',
		choices: bool_options
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
		name: 'GOOGLE_ANALYTICS_ID',
		message: 'What is your Google Analytics Tag? (optional)'
	},
	{
		type: 'input',
		name: 'RAVEN_DSN',
		message: 'What is your Private Raven DSN key? (optional)'
	},
	{
		type: 'input',
		name: 'PRERENDER_TOKEN',
		message: 'What is your Prerender.io token? (optional)'
	},
	{
		type: 'input',
		name: 'COVERALLS_REPO_TOKEN',
		message: 'What is your Coveralls.io token? (optional)'
	},
	{
		type: 'input',
		name: 'COVERALLS_REPO_TOKEN',
		message: 'What is your reCAPTCHA token? (optional)'
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

if(!fs.existsSync('./\.env')) {
	console.log(chalk.green('\n\nHi, welcome to TellForm Setup'));

	console.log(chalk.green('You should only run this the first time you run TellForm\n--------------------------------------------------\n\n'));

	inquirer.prompt([questions[0]]).then(function (confirmAns) {
		if (confirmAns['shouldContinue']) {

			inquirer.prompt(questions.slice(1)).then(function (answers) {
				answers['NODE_ENV'] = 'production';

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

						console.log(chalk.green('Have fun using TellForm!'));
						process.exit(1);
					});
				});
			});
		} else {
			console.log(chalk.green('Have fun using TellForm!'));
      process.exit(1);
		}
	});
} else {
	console.log(chalk.red('You already have a .env file'));
	process.exit(1);
}
