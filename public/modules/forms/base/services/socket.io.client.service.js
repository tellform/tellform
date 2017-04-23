(function () {
	'use strict';


	function Socket($timeout, $window) {
		
		var service;
		
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
		
		service = {
			connect: connect,
			emit: emit,
			on: on,
			removeListener: removeListener,
			socket: null
		};

		var url = '';
		if($window.socketPort && $window.socketUrl){
			url = $window.socketUrl + ':' + $window.socketPort;
		} else if ($window.socketUrl && !$window.socketUrl){
			url = $window.socketUrl;
		} else if ($window.socketPort){
			url = window.location.protocol+'//'+window.location.hostname + ':' + $window.socketPort;
		} else {
			url = window.location.protocol+'//'+window.location.hostname;
		}
		connect(url);

		return service;
	}
	
	// Create the Socket.io wrapper service
	angular.module('forms')
		.factory('Socket', Socket);

	Socket.$inject = ['$timeout', '$window'];

}());
