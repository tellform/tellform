var mongoose = require('mongoose'),
	Agency = require('../app/models/agency.server.model.js'),
	fs = require('fs'),
	chalk = require('chalk');

exports.loadAgency = function(cb) {
	Agency.count(function(err, count) {
		if (!err && count === 0) {
			var agencyJson = './data/agency.json';

			if (fs.existsSync(agencyJson)) {
				var file = fs.readFileSync(agencyJson, 'utf8');
				agencyData = JSON.parse(file);

				for (let data of agencyData) {
					agency = new Agency(data);
					agency.save(function(err) {
						if (err) {
							return cb(err);
						}
					});
				}

				console.log(chalk.green('Successfully pre-load agency data.'));
				cb();
			}
		}
	});
}
