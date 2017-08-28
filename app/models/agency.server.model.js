'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mUtilities = require('mongoose-utilities'),
	_ = require('lodash');

/**
 * Agency Schema
 */
var AgencySchema = new Schema({
	shortName: {
		type: String,
		required: true,
		trim: true
	},
	fullName: {
		type: String,
		required: true,
		trim: true
	},
	emailDomain: {
		type: [{
			type: String,
			trim: true,
			match: [/.+\..+/, 'Please fill a valid email domain.']
		}],
		required: true, // must have at least one element
		get: v => v.join(),
		set: v => _.isString(v) ? v.split(",") : v
	},
	lastModified: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	}
});

AgencySchema.plugin(mUtilities.timestamp, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
});

module.exports = mongoose.model('Agency', AgencySchema);
