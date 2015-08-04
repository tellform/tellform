// var mongoose = require('mongoose'),
// 	Schema = mongoose.Schema,
// 	shortid = require('shortid');

// var ObjectId = Schema.ObjectId;

// var BaseSchema = function() {
//   Schema.apply(this, arguments);

//   this.add({
//     created: {
// 		type: Date,
// 		default: Date.now
// 	},
// 	lastModified: {
// 		type: Date,
// 	},
// 	_id: {
// 	    type: String,
// 	    unique: true,
// 	    'default': shortid.generate
// 	},
//   });
// }