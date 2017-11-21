var constants = require('../app/libs/constants');

var createRegexValidator = function(regex){
	return function(value) {
		var isValid = new RegExp(regex, 'g').test(value);

		if(!isValid){
			return 'Please enter a valid email'
		} else {
			return true;
		}
	}
}

var validateEmail = createRegexValidator(constants.regex.email);
var validateUsername = createRegexValidator(constants.regex.username);

module.exports = {
		replaceENVQuestion: {
			type: 'confirm',
			name: 'replaceENVFile',
			message: 'An older .env file already exists. Do you want to replace it?',
			default: false
		},

		questionsPart1: [
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
				choices:  [
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
				]
			}
		],

		mailerWellKnownQuestions: [
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
		],

		mailerCustomQuestions: [
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
				message: 'What do you want the default "from" email address to be?',
				validate: validateEmail
			}
		],

		questionsPart2: [
			{
				type: 'input',
				name: 'MONGODB_URI',
				message: 'What is the URI of your Mongo database?',
				default: 'mongodb://localhost/mean'
			},
			{
				type: 'input',
				name: 'REDIS_URL',
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
				message: 'What should be the email for your admin account?',
				validate: validateEmail
			},
			{
				type: 'input',
				name: 'username',
				message: 'What should be the username for your admin account?',
				validate: validateUsername
			},
			{
				type: 'password',
				name: 'password',
				message: 'What should be the password for your admin account?'
			}
		]
};