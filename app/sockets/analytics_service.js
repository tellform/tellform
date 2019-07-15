'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('../controllers/errors.server.controller'),
	Form = mongoose.model('Form'),
	request = require('request');

// Create the chat configuration
module.exports = function (io, socket) {
	var visitorsData = {};

	var saveVisitorData = function (data, socket, cb){
		Form.findByIdAndUpdate(
		  data.formId,
      {
        $push: {
          'analytics.visitors': {
            socketId: data.socketId,
            referrer: data.referrer,
            timeElapsed: data.timeElapsed,
            isSubmitted: data.isSubmitted,
            language: data.language,
            ipAddr: '',
            deviceType: data.deviceType
          }
        }
      },
      function(err, form) {
        if (err) {
          console.error(err);
          throw new Error(errorHandler.getErrorMessage(err));
        }

        console.log('update form to', form)

        if(cb){
          return cb();
        }
		});
	};

	io.on('connection', function(current_socket) {
	  console.log('CONNECTED CLIENT');

		// a user has visited our page - add them to the visitorsData object
		current_socket.on('form-visitor-data', function(data) {
			visitorsData[current_socket.id] = data;
			visitorsData[current_socket.id].socketId = current_socket.id;
			visitorsData[current_socket.id].isSaved = false;

			console.log('received data', data);
			if (data.isSubmitted && !data.isSaved) {
				visitorsData[current_socket.id].isSaved = true;
				saveVisitorData(data, function() {
					current_socket.disconnect(true);
				});
			}
		});

		current_socket.on('disconnect', function() {
			var data = visitorsData[current_socket.id];
			if(data && !data.isSubmitted && !data.isSaved) {
				data.isSaved = true;
				saveVisitorData(data, function() {
					delete visitorsData[current_socket.id];
				});
			} else {
				delete visitorsData[current_socket.id];
			}
		});
	});
};

