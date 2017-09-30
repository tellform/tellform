'use strict';

module.exports = {
	baseUrl: process.env.BASE_URL || 'http://localhost:5000',
	port: process.env.PORT || 5000,
	db: {
		uri: 'mongodb://'+( process.env.DB_PORT_27017_TCP_ADDR || process.env.DB_HOST || '0.0.0.0') +'/formsg',
		options: {
			user: '',
			pass: ''
		}
	},
	log: {
        // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
        format: 'combined',
        // Stream defaults to process.stdout
        // Uncomment to enable logging to a log on the file system
        fileLogger: {
            directoryPath: process.cwd(),
            fileName: 'app.log',
            maxsize: 10485760,
            maxFiles: 2,
            json: false
        }
    },
	mailer: {
		from: 'FormSG <donotreply@form.sg>'
	}
};
