'use strict';

module.exports = {
	baseUrl: '127.0.0.1:3001',
	db: {
		uri: 'mongodb://localhost/formsg-test',
		options: {
			user: '',
			pass: ''
		}
	},
	port: 3001,
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'dev',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			//stream: 'access.log'
		}
	},
	app: {
		title: 'FormSG Test'
	},
	sessionCookie: {
		maxAge:  24 * 60 * 60 * 1000 // 24 hours
	},
	mailer: {
		from: 'FormSG <donotreply@form.sg>'
	}
};
