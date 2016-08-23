'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('lodash'),
	math = require('mathjs');

/**
 * Calculate a 32 bit FNV-1a hash
 * Found here: https://gist.github.com/vaiorabbit/5657561
 * Ref.: http://isthe.com/chongo/tech/comp/fnv/
 *
 * @param {string} str the input value
 * @param {boolean} [asString=false] set to true to return the hash value as
 *     8-digit hex string instead of an integer
 * @param {integer} [seed] optionally pass the hash of the previous chunk
 * @returns {integer | string}
 */
function hashFnv32a(str, asString, seed) {
	/*jshint bitwise:false */
	var i, l,
		hval = (seed === undefined) ? 0x811c9dc5 : seed;

	for (i = 0, l = str.length; i < l; i++) {
		hval ^= str.charCodeAt(i);
		hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	}
	if( asString ){
		// Convert to 8 digit hex string
		return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
	}
	return hval >>> 0;
}

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
			'a == b',
			'a !== b'
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

LogicJumpSchema.virtual('result').get(function () {
	if (this.expressionString && this.fieldA.fieldValue && this.valueB) {
		var valA = hashFnv32a(String(this.fieldA.fieldValue));
		var valB = hashFnv32a(String(this.valueB));
		var scope = {
			'a': valA,
			'b': valB
		};
		return math.eval(this.expressionString, scope);

	} else {
		return null;
	}
});

mongoose.model('LogicJump', LogicJumpSchema);

module.exports = LogicJumpSchema;
