'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('lodash');

var schemaOptions = {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
};

var LogicJumpSchema = new Schema({
	expressionString: {
		type: String,
		enum: [
			'field == static',
			'field != static',
			'field > static',
			'field >= static',
			'field <= static',
			'field < static',
			'field contains static',
			'field !contains static',
			'field begins static',
			'field !begins static',
			'field ends static',
			'field !ends static'
		]
	},
	fieldA: {
		type: Schema.Types.ObjectId,
		ref: 'FormField'
	},
	valueB: {
		type: Schema.Types.String
	},
	jumpTo: {
		type: Schema.Types.ObjectId,
		ref: 'FormField'
	}
}, schemaOptions);

/*
	IS EQUAL TO statement

	var scope = {
	 a: val1,
	 b: val2
	};

	math.eval('a == b', scope);

	IS NOT EQUAL TO statement
	var scope = {
	a: val1,
	b: val2
	};

	math.eval('a !== b', scope);

	BEGINS WITH statement

	ENDS WITH statement

	CONTAINS statement

	DOES NOT CONTAIN statement

 */

mongoose.model('LogicJump', LogicJumpSchema);

module.exports = LogicJumpSchema;
