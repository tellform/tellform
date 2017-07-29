(function () {
	'use strict';

	// Create the Socket.io wrapper service
	angular
		.module('core')
		.factory('Socket', Socket);

	Socket.$inject = ['$timeout', '$window'];

	function Socket($timeout, $window) {
		// Connect to Socket.io server
		function connect(url) {
			service.socket = io(url, {'transports': ['websocket', 'polling']});
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

		var service = {
			connect: connect,
			emit: emit,
			on: on,
			removeListener: removeListener,
			socket: null
		};

		connect(window.location.protocol+'//'+window.location.hostname);

		return service;

	}
}());
