'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('../controllers/errors.server.controller'),
	Form = mongoose.model('Form');

// Create the chat configuration
module.exports = function (io, socket) {
	var visitorsData = {};

	var saveVisitorData = function (data, cb){

		Form.findById(data.formId, function(err, form) {
			if (err) {
				console.log(err);
				throw new Error(errorHandler.getErrorMessage(err));
			}

			var newVisitor = {
				referrer: data.referrer,
				lastActiveField: data.lastActiveField,
				timeElapsed: data.timeElapsed,
				isSubmitted: data.isSubmitted,
				language: data.language,
				ipAddr: data.ipAddr,
				deviceType: data.deviceType
			};

			form.analytics.visitors.push(newVisitor);

			form.save(function (formSaveErr) {
				if (err) {
					console.error(err);
					throw new Error(errorHandler.getErrorMessage(formSaveErr));
				}

				delete visitorsData[socket.id];

				if(cb){
					return cb();
				}
			});
		});

	};

	io.on('connection', function(current_socket) {

		// a user has visited our page - add them to the visitorsData object
		current_socket.on('form-visitor-data', function(data) {
				current_socket.id = data.formId;
				visitorsData[current_socket.id] = data;
				visitorsData[current_socket.id].isSaved = false;
				if (data.isSubmitted) {
					saveVisitorData(data, function () {
						visitorsData[current_socket.id].isSaved = true;
					});
				}
		});

		current_socket.on('disconnect', function() {
			var data = visitorsData[current_socket.id];
			if(data && !data.isSubmitted && !data.isSaved) {
				data.isSaved = true;
				saveVisitorData(data);
			}
		});
	});
};
