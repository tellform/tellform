var fs = require('fs'),
	setup = require('./scripts/setup');

//Set this to infinity to increase server capacity
require('events').EventEmitter.prototype._maxListeners = 0;
	

//Run setup script if no .env file is detected
if(process.stdout.isTTY) {
	setup.checkENVAndRunSetup(function() {
		require('./server');
	});
} else {
	require('./server');
}
