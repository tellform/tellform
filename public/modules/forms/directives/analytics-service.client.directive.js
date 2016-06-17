(function () {
	'use strict';

	// Create the SendVisitorData service
	angular
		.module('forms')
		.factory('SendVisitorData', SendVisitorData);

	SendVisitorData.$inject = ['Socket', '$state', '$http', 'deviceDetector'];

	function SendVisitorData(Socket, $state, $http) {

		// Create a controller method for sending visitor data
		function send(form, lastActiveIndex, timeElapsed, deviceDetector) {
			// Create a new message object
			var visitorData = {
				referrer: document.referrer,
				isSubmitted: form.submitted,
				formId: form._id,
				lastActiveField: form.form_fields[lastActiveIndex]._id,
				timeElapsed: timeElapsed,
				//@TODO @FIXME: David: Need to make this get the language from the HTTP Header instead
				language: window.navigator.userLanguage || window.navigator.language
			};

			$http.get('http://jsonip.com/').success(function(response) {
					visitorData.ipAddr = response['ip']+'';
				}).error(function(error) {
					console.error('Could not get users\'s ip');
					visitorData.ipAddr = '';
				}).finally(function(){
					visitorData.userAgent = deviceDetector.raw;

					if(deviceDetector.isTablet()) {
						visitorData.deviceType = 'tablet';
					}else if(deviceDetector.isMobile()){
						visitorData.deviceType = 'phone';
					}else {
						visitorData.deviceType = 'desktop';
					}
					Socket.emit('form-visitor-data', visitorData);

				});

		}

		function init(){
			// Make sure the Socket is connected
			if (!Socket.socket) {
				Socket.connect();
			}
		}

		var service = {
			send: send
		};

		init();
		return service;

	}
}());

