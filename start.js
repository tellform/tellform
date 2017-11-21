var fs = require('fs'),
	setup = require('./scripts/setup'),
	server = require('./server');

//Set this to infinity to increase server capacity
require('events').EventEmitter.prototype._maxListeners = 0;
	

//Run setup script if no .env file is detected
if(process.stdout.isTTY) {
	setup.checkENVAndRunSetup(function() {
		server.bootstrap();
	});
} else {
	server.bootstrap();
}
