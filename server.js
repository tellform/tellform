
'use strict';
/**
 * Module dependencies.
 */
var fs = require('fs')
var https = require('https')

require('dotenv').config({path: './.env'});

if(!process.env.NODE_ENV){
    process.env.NODE_ENV = 'development';
}

var pkey = fs.readFileSync('/etc/letsencrypt/live/register.earlybird.camp/privkey.pem')
var cert = fs.readFileSync('/etc/letsencrypt/live/register.earlybird.camp/fullchain.pem')


require('events').EventEmitter.prototype._maxListeners = 0;

var config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk'),
	nodemailer = require('nodemailer');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

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
console.log("GOT PAST MONGOOSE")
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
if (process.env.CREATE_ADMIN_ACCOUNT === 'TRUE') {
	var create_admin = require('./scripts/create_admin');

	create_admin.run(app, db, function(err){
		if(err){
			console.error(chalk.red('Could not create Admin Account: ' + err));
		}
	});
}


// Bootstrap passport config
require('./config/passport')();
console.log("Got past passport!")
// Start the app by listening on <port>
app.listen(80, () => console.log("Listening"));
console.log("Got past Listen1")

//https.createServer({key: pkey, cert: cert}, app).listen(config.port, () => {
//    console.log('Listening on 443')
//})

console.log("GOT PAST LISTEN");
// Expose app
exports = module.exports = app;

// Logging initialization
console.log('--');
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
console.log(chalk.green('Database:\t\t\t' + config.db.uri));
if (process.env.NODE_ENV === 'secure') {
	console.log(chalk.green('HTTPs:\t\t\t\ton'));
}
console.log('--');

process.on('uncaughtException', function (err) {
	console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);
	process.exit(1);
});
