'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('lodash'),
	mUtilities = require('mongoose-utilities'),
	async = require('async'),
	Random = require('random-js'),
	mt = Random.engines.mt19937();

mt.autoSeed();

//Mongoose Models
var FieldSchema = require('./form_field.server.model.js');

var ButtonSchema = new Schema({
	url: {
		type: String,
		match: [/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/],
	},
	action: String,
	text: String,
	bgColor: {
		type: String,
		match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
		default: '#5bc0de'
	},
	color: {
		type: String,
		match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
		default: '#ffffff'
	}
});

var formSchemaOptions = {
	id: false,
	toJSON: {
		virtuals: true
	}
};

/**
 * Form Schema
 */
var FormSchema = new Schema({
	title: {
		type: String,
		trim: true,
		required: 'Form Title cannot be blank'
	},
	language: {
		type: String,
		enum: ['en', 'fr', 'es', 'it', 'de'],
		default: 'en',
		required: 'Form must have a language'
	},

	form_fields: [FieldSchema],

	admin: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: 'Form must have an Admin'
	},

	emails: {
		type: [{
			type: String,
			trim: true,
			match: [/.+\@.+\..+/, 'Please fill a valid email address']
		}],
		required: true,	// must have at least one element
		get: v => v.join(),
		set: v => _.isString(v)? v.split(",") : v
	},

	startPage: {
		showStart:{
			type: Boolean,
			default: false
		},
		introTitle:{
			type: String,
			default: 'Welcome to Form'
		},
		introParagraph:{
			type: String
		},
        introButtonText:{
            type: String,
            default: 'Start'
        },
		buttons:[ButtonSchema]
	},
	endPage: {
		showEnd:{
			type: Boolean,
			default: false
		},
		title:{
			type: String,
			default: 'Thank you for filling out the form'
		},
		paragraph:{
			type: String
		},
		buttonText:{
			type: String,
			default: 'Go back to Form'
		},
		buttons:[ButtonSchema]
	},

	hideFooter: {
		type: Boolean,
		default: false
	},
	isLive: {
		type: Boolean,
		default: true
	},
	design: {
		colors:{
			backgroundColor: {
				type: String,
				match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
				default: '#fff'
			},
			questionColor: {
				type: String,
				match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
				default: '#333'
			},
			answerColor: {
				type: String,
				match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
				default: '#333'
			},
			buttonColor: {
				type: String,
				match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
			    default: '#fff'
            },
            buttonTextColor: {
                type: String,
                match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/],
                default: '#333'
            }
		},
		font: String
	}
}, formSchemaOptions);

FormSchema.methods.getMainFields = function () {
    var form = {
        _id: this._id,
        title: this.title,
        isLive: this.isLive
    };
    return form;
};

FormSchema.plugin(mUtilities.timestamp, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
});

FormSchema.pre('save', function (next) {
	switch(this.language){
		case 'spanish':
			this.language = 'es';
			break;
		case 'french':
			this.language = 'fr';
			break;
		case 'italian':
			this.language = 'it';
			break;
		case 'german':
			this.language = 'de';
			break;
		default:
			this.language = 'en';
			break;
	}
	next();
});

module.exports = mongoose.model('Form', FormSchema);
