'use strict';

module.exports = {
	baseUrl: process.env.BASE_URL || process.env.HEROKU_APP_NAME + '.herokuapp.com' || 'tellform.com',
	db: {
		uri: process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || '127.0.0.1') + '/mean',
	},
	port: process.env.PORT || 5000,
	socketUrl: process.env.SOCKET_URL || 'ws.tellform.com',
	socketPortExternallyVisible: (process.env.SOCKET_PORT_EXTERN_VISIBLE === 'TRUE' || !process.env.SOCKET_PORT_EXTERN_VISIBLE), //socketPortExternallyVisible set to true in production config by default
	socketPort: process.env.SOCKET_PORT || 20523,
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
    sessionCookie: {
		secure: false,
		maxAge:  24 * 60 * 60 * 1000, // 24 hours
		domain: process.env.BASE_URL || '.tellform.com'
	},
	assets: {
		bower_js: 'public/dist/vendor.min.js',
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js',
		form_js: 'public/dist/form-application.min.js'
	}
};
