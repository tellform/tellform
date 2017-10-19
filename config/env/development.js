'use strict';

module.exports = {
	baseUrl: process.env.BASE_URL || 'http://localhost:5000',
	port: process.env.PORT || 5000,
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://'+( process.env.DB_PORT_27017_TCP_ADDR || '127.0.0.1') +'/mean',
		options: {
			user: '',
			pass: ''
		}
	},
    log: {
        // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
        format: 'dev',
        // Stream defaults to process.stdout
        // Uncomment to enable logging to a log on the file system
    },
	mailer: {
		from: process.env.MAILER_FROM || 'no-reply@tellform.com',
		options: process.env.MAILER_SMTP_HOST ? { //Uses custom SMTP if MAILER_SMTP_HOST is set
			host: process.env.MAILER_SMTP_HOST || '',
			port: process.env.MAILER_SMTP_PORT || 465,
			secure: process.env.MAILER_SMTP_SECURE || true,
			auth: {
				user: process.env.MAILER_EMAIL_ID || '',
				pass: process.env.MAILER_PASSWORD || ''
			}
		} : {
			service: process.env.MAILER_SERVICE_PROVIDER || '',
			auth: {
				user: process.env.MAILER_EMAIL_ID || '',
				pass: process.env.MAILER_PASSWORD || ''
			}
		}
	}
};
