(function () {
	'use strict';

	// Create the SendVisitorData service
	angular
		.module('view-form')
		.factory('SendVisitorData', SendVisitorData);

	SendVisitorData.$inject = ['Socket', '$state'];

	function SendVisitorData(Socket, $state) {

		// Create a controller method for sending visitor data
		function send(form, lastActiveIndex, timeElapsed) {

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

			$.ajaxSetup( { 'async': false } );
			var geoData = $.getJSON('https://freegeoip.net/json/').responseJSON;
			$.ajaxSetup( { 'async': true } );

			if(!geoData){
				geoData = {
					ip: '',
					city: '',
					country_name: ''
				};
			}

			// Create a new message object
			var visitorData = {
				referrer: document.referrer,
				isSubmitted: form.submitted,
				formId: form._id,
				lastActiveField: form.form_fields[lastActiveIndex]._id,
				timeElapsed: timeElapsed,
				language: lang,
				deviceType: deviceType,
				ipAddr: geoData.ip,
				geoLocation: {
					city: geoData.city,
					country: geoData.country_name
				}
			};
			Socket.emit('form-visitor-data', visitorData);
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

