'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('lodash'),
	timeStampPlugin = require('../libs/timestamp.server.plugin'),
	async = require('async'),
	constants = require('../libs/constants');

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

var VisitorDataSchema = new Schema({
	socketId: {
		type: String
	},
	referrer: {
		type: String
	},
	filledOutFields: {
		type: [Schema.Types.ObjectId]
	},
	timeElapsed: {
		type: Number
	},
	isSubmitted: {
		type: Boolean
	},
	language: {
		type: String,
		enum: constants.languageTypes,
		default: 'en',
	},
	ipAddr: {
		type: String
	},
	deviceType: {
		type: String,
		enum: ['desktop', 'phone', 'tablet', 'other'],
		default: 'other'
	},
	userAgent: {
		type: String
	}
});

var formSchemaOptions = {
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
	analytics:{
		gaCode: {
			type: String
		},
		visitors: [VisitorDataSchema]
	},
	form_fields: {
		type: [FieldSchema],
		default: []
	},
	admin: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: 'Form must have an Admin'
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

	selfNotifications: {
		fromField: {
			type: String
		},
		toEmails: {
			type: String
		},
		subject: {
			type: String
		},
		htmlTemplate: {
			type: String
		},
		enabled: {
			type: Boolean,
			default: false
		}
	},

	respondentNotifications: {
		toField: {
			type: String
		},
		fromEmails: {
			type: String,
			match: [/.+\@.+\..+/, 'Please fill a valid email address']
		},
		subject: {
			type: String,
			default: 'OhMyForm: Thank you for filling out this OhMyForm'
		},
		htmlTemplate: {
			type: String,
			default: 'Hello, <br><br> We’ve received your submission. <br><br> Thank you & have a nice day!',
		},
		enabled: {
			type: Boolean,
			default: false
		}
	},

	showFooter: {
		type: Boolean,
		default: true
	},

	isLive: {
		type: Boolean,
		default: true
	},

	design: {
		colors: {
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

FormSchema.plugin(timeStampPlugin, {
	createdPath: 'created',
	modifiedPath: 'lastModified',
	useVirtual: false
});

FormSchema.pre('save', function (next) {
	if(this.form_fields && this.form_fields.length){
		this.form_fields = this.form_fields.filter(function(field){
			return !field.deletePreserved;
		});
	}
	next();
});

FormSchema.index({created: 1});

mongoose.model('Form', FormSchema);

module.exports = mongoose.model('Form');
