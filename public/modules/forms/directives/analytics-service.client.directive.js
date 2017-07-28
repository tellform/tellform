(function () {
	'use strict';
	//Dummy Service for Previewing Form
	function SendVisitorData() {

		// Create a controller method for sending visitor data
		function send(form, lastActiveIndex) {

		}

		function init(){
		}

		var service = {
			send: send
		};

		init();
		return service;

	}
	// Create the SendVisitorData service
	angular
		.module('forms')
		.factory('SendVisitorData', SendVisitorData);

	SendVisitorData.$inject = [];
}());

