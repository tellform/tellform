(function () {
	'use strict';

	// Create the Socket.io wrapper service
	angular
		.module('core')
		.factory('Socket', Socket);

	Socket.$inject = ['$timeout', '$window'];

	function Socket($timeout, $window) {
		var service = {
			connect: connect,
			emit: emit,
			on: on,
			removeListener: removeListener,
			socket: null
		};

		console.log('https://'+window.location.hostname+':'+$window.socketPort);
		connect('https://'+window.location.hostname+':'+$window.socketPort);

		return service;

		// Connect to Socket.io server
		function connect(url) {
			service.socket = io();
		}

		// Wrap the Socket.io 'emit' method
		function emit(eventName, data) {
			if (service.socket) {
				service.socket.emit(eventName, data);
			}
		}

		// Wrap the Socket.io 'on' method
		function on(eventName, callback) {
			if (service.socket) {
				service.socket.on(eventName, function (data) {
					$timeout(function () {
						callback(data);
					});
				});
			}
		}

		// Wrap the Socket.io 'removeListener' method
		function removeListener(eventName) {
			if (service.socket) {
				service.socket.removeListener(eventName);
			}
		}
	}
}());
