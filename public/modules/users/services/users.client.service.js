'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource', 'USERS_URL',
	function($resource, USERS_URL) {
		return $resource(USERS_URL, {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);