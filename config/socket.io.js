'use strict';

// Load the module dependencies
var config = require('./config'),
	path = require('path'),
	http = require('http'),
	socketio = require('socket.io');

// Define the Socket.io configuration method
module.exports = function (app, db) {
	var server = http.createServer(app);

	var io = socketio(config.socketPort, { transports: ['websocket', 'polling'] });
	var redis = require('socket.io-redis');
	io.adapter(redis(process.env.REDIS_HOST || { host: '127.0.0.1', port: 6379 }));

	// Add an event listener to the 'connection' event
	io.on('connection', function (socket) {
		config.getGlobbedFiles('./app/sockets/**.js').forEach(function (socketConfiguration) {
			require(path.resolve(socketConfiguration))(io, socket);
		});
	});

	return server;
};
