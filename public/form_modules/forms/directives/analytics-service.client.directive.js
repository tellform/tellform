(function () {
	'use strict';

	// Create the SendVisitorData service
	angular
		.module('view-form')
		.factory('SendVisitorData', SendVisitorData);

	SendVisitorData.$inject = ['Socket', '$state'];

	function SendVisitorData(Socket, $state) {

		// Create a controller method for sending visitor data
		function send(form, lastActiveId, timeElapsed) {

			var lang = window.navigator.userLanguage || window.navigator.language;
			lang = lang.slice(0,2);

			var userAgentString = navigator.userAgent;
			var md = new MobileDetect(userAgentString);
			var deviceType = 'other';

			if (md.tablet()){
				deviceType = 'tablet';
			} else if (md.mobile()) {
			 	deviceType = 'mobile';
			} else if (!md.is('bot')) {
				deviceType = 'desktop';
			}

			// Create a new message object
			var visitorData = {
				referrer: document.referrer,
				isSubmitted: form.submitted,
				formId: form._id,
				lastActiveField: lastActiveId,
				timeElapsed: timeElapsed,
				language: lang,
				deviceType: deviceType,
				ipAddr: null,
				geoLocation: null
			};

			Socket.emit('form-visitor-data', visitorData);
		}

		function init(){
			// Make sure the Socket is connected
			if (!Socket.socket) {
				Socket.connect();
			}
			
			Socket.on('disconnect', function(){
				Socket.connect();
			});
		}

		var service = {
			send: send
		};

		init();
		return service;

	}
}());

