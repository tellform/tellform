'use strict';


/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	config = require('../../config/config'),
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
				isSubmitted: data.isSubmitted
			};

			form.analytics.visitors.push(newVisitor);

			form.save(function (err) {
				if (err) {
					console.log(err);
					throw new Error(errorHandler.getErrorMessage(err));
				}
				console.log('\n\nVisitor data successfully added!');

				delete visitorsData[socket.id];

				if(cb) cb();
			});
		});

		socket.disconnect(0);
	};

	io.on('connection', function(socket) {


		// a user has visited our page - add them to the visitorsData object
		socket.on('form-visitor-data', function(data) {
			
				console.log('\n\nuser has visited our page');

				visitorsData[socket.id] = data;

				console.log(data);

				if (data.isSubmitted) {
					saveVisitorData(data, function () {
						console.log('\n\n user submitted form');

						socket.disconnect(0);
					});
				}
		});

		socket.on('disconnect', function() {
			var data = visitorsData[socket.id];

			if(data){
				if(!data.isSubmitted) {
					saveVisitorData(data);
				}
			}
		});
	});
};
