module.exports = {
	sampleUser: {
		"_id": "598cb79e43859500277bc804",
		"lastModified": "2017-10-06T05:36:28.394Z",
		"email": "test@test.com",
		"username": "test1234",
		"salt": null,
		"__v": 0,
		"resetPasswordExpires": "2017-10-06T06:36:28.391Z",
		"resetPasswordToken": "2d95c01d79fb06c73691577cd82e5cce2ff616f1",
		"created": "2017-08-10T19:44:30.601Z",
		"language": "en",
		"roles": ["user"],
		"provider": "local",
		"passwordHash": null,
		"lastName": "Full",
		"firstName": "Name"
	},

	sampleForm1: {
		"_id": "59d25a9d413a7a3106878556",
		"lastModified": "2017-10-19T00:46:24.056Z",
		"title": "Form Title",
		"created": "2017-10-02T15:26:21.221Z",
		"admin": this.sampleUser,
		"design": {
			"colors": {
				"buttonTextColor": "#333",
				"buttonColor": "#fff",
				"answerColor": "#333",
				"questionColor": "#333",
				"backgroundColor": "#fff"
			}
		},
		"isLive": true,
		"hideFooter": false,
		"endPage": {
			"buttons": [],
			"buttonText": "Go back to Form",
			"title": "Thank you for filling out the form",
			"showEnd": false
		},
		"startPage": {
			"buttons": [],
			"introButtonText": "Start",
			"introTitle": "Welcome to Form",
			"showStart": false
		},
		"submissions": [],
		"form_fields": [{
			"globalId": "hSsZT02ICgcdvLTrbwCyYjl19qG9gQdAzO7ZDF2Esj4",
			"lastModified": "2017-10-19T00:46:24.053Z",
			"title": "First Name",
			"fieldType": "textfield",
			"fieldValue": "",
			"logicJump": {
				"expressionString": "field == static",
				"jumpTo": "59e7f5d242a56fca5bf79365",
				"valueB": "hello",
				"_id": "59e7f5c442a56fca5bf7935e",
				"enabled": true,
				"id": "59e7f5c442a56fca5bf7935e"
			},
			"_id": "59e7f5c442a56fca5bf7935d",
			"created": "2017-10-19T00:45:56.855Z",
			"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
			"deletePreserved": false,
			"disabled": false,
			"required": true,
			"fieldOptions": [],
			"description": "",
			"isSubmission": false
		}, {
			"globalId": "N2DthDVEJfXvNU4JsYyax6PrCbHzump8QTnyc1hnAVR",
			"lastModified": "2017-10-19T00:46:24.054Z",
			"title": "nascar",
			"fieldType": "checkbox",
			"fieldValue": "",
			"logicJump": {
				"_id": "59e7f5c842a56fca5bf79361",
				"enabled": false,
				"id": "59e7f5c842a56fca5bf79361"
			},
			"_id": "59e7f5c842a56fca5bf79360",
			"created": "2017-10-19T00:46:00.484Z",
			"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
			"deletePreserved": false,
			"disabled": false,
			"required": true,
			"fieldOptions": [],
			"description": "",
			"isSubmission": false
		}, {
			"globalId": "7vnFgEhKCZWwb6rR29Lat7mePmBK05fDTashc3modje",
			"lastModified": "2017-10-19T00:46:24.055Z",
			"title": "hockey",
			"fieldType": "checkbox",
			"fieldValue": "",
			"logicJump": {
				"_id": "59e7f5d242a56fca5bf79366",
				"enabled": false,
				"id": "59e7f5d242a56fca5bf79366"
			},
			"_id": "59e7f5d242a56fca5bf79365",
			"created": "2017-10-19T00:46:10.619Z",
			"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
			"deletePreserved": false,
			"disabled": false,
			"required": true,
			"fieldOptions": [],
			"description": "",
			"isSubmission": false
		}],
		"analytics": {
			"visitors": [],
			"fields": [{
				"field": {
					"globalId": "hSsZT02ICgcdvLTrbwCyYjl19qG9gQdAzO7ZDF2Esj4",
					"lastModified": "2017-10-19T00:46:24.053Z",
					"title": "Short Text3",
					"fieldType": "textfield",
					"fieldValue": "",
					"logicJump": {
						"expressionString": "field == static",
						"jumpTo": "59e7f5d242a56fca5bf79365",
						"valueB": "hello",
						"_id": "59e7f5c442a56fca5bf7935e",
						"enabled": true,
						"id": "59e7f5c442a56fca5bf7935e"
					},
					"_id": "59e7f5c442a56fca5bf7935d",
					"created": "2017-10-19T00:45:56.855Z",
					"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
					"deletePreserved": false,
					"disabled": false,
					"required": true,
					"fieldOptions": [],
					"description": "",
					"isSubmission": false
				},
				"dropoffRate": 0,
				"continueRate": 0,
				"totalViews": 0,
				"responses": 0,
				"dropoffViews": 0
			}, {
				"field": {
					"globalId": "N2DthDVEJfXvNU4JsYyax6PrCbHzump8QTnyc1hnAVR",
					"lastModified": "2017-10-19T00:46:24.054Z",
					"title": "Short Text4",
					"fieldType": "textfield",
					"fieldValue": "",
					"logicJump": {
						"_id": "59e7f5c842a56fca5bf79361",
						"enabled": false,
						"id": "59e7f5c842a56fca5bf79361"
					},
					"_id": "59e7f5c842a56fca5bf79360",
					"created": "2017-10-19T00:46:00.484Z",
					"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
					"deletePreserved": false,
					"disabled": false,
					"required": true,
					"fieldOptions": [],
					"description": "",
					"isSubmission": false
				},
				"dropoffRate": 0,
				"continueRate": 0,
				"totalViews": 0,
				"responses": 0,
				"dropoffViews": 0
			}, {
				"field": {
					"globalId": "7vnFgEhKCZWwb6rR29Lat7mePmBK05fDTashc3modje",
					"lastModified": "2017-10-19T00:46:24.055Z",
					"title": "Short Text5",
					"fieldType": "textfield",
					"fieldValue": "",
					"logicJump": {
						"_id": "59e7f5d242a56fca5bf79366",
						"enabled": false,
						"id": "59e7f5d242a56fca5bf79366"
					},
					"_id": "59e7f5d242a56fca5bf79365",
					"created": "2017-10-19T00:46:10.619Z",
					"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
					"deletePreserved": false,
					"disabled": false,
					"required": true,
					"fieldOptions": [],
					"description": "",
					"isSubmission": false
				},
				"dropoffRate": 0,
				"continueRate": 0,
				"totalViews": 0,
				"responses": 0,
				"dropoffViews": 0
			}],
			"conversionRate": 0,
			"submissions": 0,
			"views": 0
		},
		"language": "en",
		"id": "59d25a9d413a7a3106878556"
	},

	sampleForm2: {
		"_id": "52f6d0f87f5a407a384220e3",
		"lastModified": "2017-10-19T00:46:24.056Z",
		"title": "Form Title2",
		"created": "2017-10-02T15:26:21.221Z",
		"admin": this.sampleUser,
		"design": {
			"colors": {
				"buttonTextColor": "#333",
				"buttonColor": "#fff",
				"answerColor": "#333",
				"questionColor": "#333",
				"backgroundColor": "#fff"
			}
		},
		"isLive": true,
		"hideFooter": false,
		"endPage": {
			"buttons": [],
			"buttonText": "Go back to Form",
			"title": "Thank you for filling out the form",
			"showEnd": false
		},
		"startPage": {
			"buttons": [],
			"introButtonText": "Start",
			"introTitle": "Welcome to Form",
			"showStart": false
		},
		"submissions": [],
		"form_fields": [{
			"globalId": "hSsZT02ICgcdvLTrbwCyYjl19qG9gQdAzO7ZDF2Esj4",
			"lastModified": "2017-10-19T00:46:24.053Z",
			"title": "First Name",
			"fieldType": "textfield",
			"fieldValue": "",
			"logicJump": {
				"expressionString": "field == static",
				"jumpTo": "59e7f5d242a56fca5bf79365",
				"valueB": "hello",
				"_id": "59e7f5c442a56fca5bf7935e",
				"enabled": true,
				"id": "59e7f5c442a56fca5bf7935e"
			},
			"_id": "59e7f5c442a56fca5bf7935d",
			"created": "2017-10-19T00:45:56.855Z",
			"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
			"deletePreserved": false,
			"disabled": false,
			"required": true,
			"fieldOptions": [],
			"description": "",
			"isSubmission": false
		}, {
			"globalId": "N2DthDVEJfXvNU4JsYyax6PrCbHzump8QTnyc1hnAVR",
			"lastModified": "2017-10-19T00:46:24.054Z",
			"title": "nascar",
			"fieldType": "checkbox",
			"fieldValue": "",
			"logicJump": {
				"_id": "59e7f5c842a56fca5bf79361",
				"enabled": false,
				"id": "59e7f5c842a56fca5bf79361"
			},
			"_id": "59e7f5c842a56fca5bf79360",
			"created": "2017-10-19T00:46:00.484Z",
			"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
			"deletePreserved": false,
			"disabled": false,
			"required": true,
			"fieldOptions": [],
			"description": "",
			"isSubmission": false
		}, {
			"globalId": "7vnFgEhKCZWwb6rR29Lat7mePmBK05fDTashc3modje",
			"lastModified": "2017-10-19T00:46:24.055Z",
			"title": "hockey",
			"fieldType": "checkbox",
			"fieldValue": "",
			"logicJump": {
				"_id": "59e7f5d242a56fca5bf79366",
				"enabled": false,
				"id": "59e7f5d242a56fca5bf79366"
			},
			"_id": "59e7f5d242a56fca5bf79365",
			"created": "2017-10-19T00:46:10.619Z",
			"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
			"deletePreserved": false,
			"disabled": false,
			"required": true,
			"fieldOptions": [],
			"description": "",
			"isSubmission": false
		}],
		"analytics": {
			"visitors": [],
			"fields": [{
				"field": {
					"globalId": "hSsZT02ICgcdvLTrbwCyYjl19qG9gQdAzO7ZDF2Esj4",
					"lastModified": "2017-10-19T00:46:24.053Z",
					"title": "Short Text3",
					"fieldType": "textfield",
					"fieldValue": "",
					"logicJump": {
						"expressionString": "field == static",
						"jumpTo": "59e7f5d242a56fca5bf79365",
						"valueB": "hello",
						"_id": "59e7f5c442a56fca5bf7935e",
						"enabled": true,
						"id": "59e7f5c442a56fca5bf7935e"
					},
					"_id": "59e7f5c442a56fca5bf7935d",
					"created": "2017-10-19T00:45:56.855Z",
					"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
					"deletePreserved": false,
					"disabled": false,
					"required": true,
					"fieldOptions": [],
					"description": "",
					"isSubmission": false
				},
				"dropoffRate": 0,
				"continueRate": 0,
				"totalViews": 0,
				"responses": 0,
				"dropoffViews": 0
			}, {
				"field": {
					"globalId": "N2DthDVEJfXvNU4JsYyax6PrCbHzump8QTnyc1hnAVR",
					"lastModified": "2017-10-19T00:46:24.054Z",
					"title": "Short Text4",
					"fieldType": "textfield",
					"fieldValue": "",
					"logicJump": {
						"_id": "59e7f5c842a56fca5bf79361",
						"enabled": false,
						"id": "59e7f5c842a56fca5bf79361"
					},
					"_id": "59e7f5c842a56fca5bf79360",
					"created": "2017-10-19T00:46:00.484Z",
					"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
					"deletePreserved": false,
					"disabled": false,
					"required": true,
					"fieldOptions": [],
					"description": "",
					"isSubmission": false
				},
				"dropoffRate": 0,
				"continueRate": 0,
				"totalViews": 0,
				"responses": 0,
				"dropoffViews": 0
			}, {
				"field": {
					"globalId": "7vnFgEhKCZWwb6rR29Lat7mePmBK05fDTashc3modje",
					"lastModified": "2017-10-19T00:46:24.055Z",
					"title": "Short Text5",
					"fieldType": "textfield",
					"fieldValue": "",
					"logicJump": {
						"_id": "59e7f5d242a56fca5bf79366",
						"enabled": false,
						"id": "59e7f5d242a56fca5bf79366"
					},
					"_id": "59e7f5d242a56fca5bf79365",
					"created": "2017-10-19T00:46:10.619Z",
					"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
					"deletePreserved": false,
					"disabled": false,
					"required": true,
					"fieldOptions": [],
					"description": "",
					"isSubmission": false
				},
				"dropoffRate": 0,
				"continueRate": 0,
				"totalViews": 0,
				"responses": 0,
				"dropoffViews": 0
			}],
			"conversionRate": 0,
			"submissions": 0,
			"views": 0
		},
		"language": "en",
		"id": "59d25a9d413a7a3106878556"
	},

	sampleForm3: {
		"_id": "2fab9ed873937f0e1dea0ce1",
		"lastModified": "2017-10-19T00:46:24.056Z",
		"title": "Form Title3",
		"created": "2017-10-02T15:26:21.221Z",
		"admin": this.sampleUser,
		"design": {
			"colors": {
				"buttonTextColor": "#333",
				"buttonColor": "#fff",
				"answerColor": "#333",
				"questionColor": "#333",
				"backgroundColor": "#fff"
			}
		},
		"isLive": true,
		"hideFooter": false,
		"endPage": {
			"buttons": [],
			"buttonText": "Go back to Form",
			"title": "Thank you for filling out the form",
			"showEnd": false
		},
		"startPage": {
			"buttons": [],
			"introButtonText": "Start",
			"introTitle": "Welcome to Form",
			"showStart": false
		},
		"submissions": [],
		"form_fields": [{
			"globalId": "hSsZT02ICgcdvLTrbwCyYjl19qG9gQdAzO7ZDF2Esj4",
			"lastModified": "2017-10-19T00:46:24.053Z",
			"title": "First Name",
			"fieldType": "textfield",
			"fieldValue": "",
			"logicJump": {
				"expressionString": "field == static",
				"jumpTo": "59e7f5d242a56fca5bf79365",
				"valueB": "hello",
				"_id": "59e7f5c442a56fca5bf7935e",
				"enabled": true,
				"id": "59e7f5c442a56fca5bf7935e"
			},
			"_id": "59e7f5c442a56fca5bf7935d",
			"created": "2017-10-19T00:45:56.855Z",
			"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
			"deletePreserved": false,
			"disabled": false,
			"required": true,
			"fieldOptions": [],
			"description": "",
			"isSubmission": false
		}, {
			"globalId": "N2DthDVEJfXvNU4JsYyax6PrCbHzump8QTnyc1hnAVR",
			"lastModified": "2017-10-19T00:46:24.054Z",
			"title": "nascar",
			"fieldType": "checkbox",
			"fieldValue": "",
			"logicJump": {
				"_id": "59e7f5c842a56fca5bf79361",
				"enabled": false,
				"id": "59e7f5c842a56fca5bf79361"
			},
			"_id": "59e7f5c842a56fca5bf79360",
			"created": "2017-10-19T00:46:00.484Z",
			"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
			"deletePreserved": false,
			"disabled": false,
			"required": true,
			"fieldOptions": [],
			"description": "",
			"isSubmission": false
		}, {
			"globalId": "7vnFgEhKCZWwb6rR29Lat7mePmBK05fDTashc3modje",
			"lastModified": "2017-10-19T00:46:24.055Z",
			"title": "hockey",
			"fieldType": "checkbox",
			"fieldValue": "",
			"logicJump": {
				"_id": "59e7f5d242a56fca5bf79366",
				"enabled": false,
				"id": "59e7f5d242a56fca5bf79366"
			},
			"_id": "59e7f5d242a56fca5bf79365",
			"created": "2017-10-19T00:46:10.619Z",
			"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
			"deletePreserved": false,
			"disabled": false,
			"required": true,
			"fieldOptions": [],
			"description": "",
			"isSubmission": false
		}],
		"analytics": {
			"visitors": [],
			"fields": [{
				"field": {
					"globalId": "hSsZT02ICgcdvLTrbwCyYjl19qG9gQdAzO7ZDF2Esj4",
					"lastModified": "2017-10-19T00:46:24.053Z",
					"title": "Short Text3",
					"fieldType": "textfield",
					"fieldValue": "",
					"logicJump": {
						"expressionString": "field == static",
						"jumpTo": "59e7f5d242a56fca5bf79365",
						"valueB": "hello",
						"_id": "59e7f5c442a56fca5bf7935e",
						"enabled": true,
						"id": "59e7f5c442a56fca5bf7935e"
					},
					"_id": "59e7f5c442a56fca5bf7935d",
					"created": "2017-10-19T00:45:56.855Z",
					"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
					"deletePreserved": false,
					"disabled": false,
					"required": true,
					"fieldOptions": [],
					"description": "",
					"isSubmission": false
				},
				"dropoffRate": 0,
				"continueRate": 0,
				"totalViews": 0,
				"responses": 0,
				"dropoffViews": 0
			}, {
				"field": {
					"globalId": "N2DthDVEJfXvNU4JsYyax6PrCbHzump8QTnyc1hnAVR",
					"lastModified": "2017-10-19T00:46:24.054Z",
					"title": "Short Text4",
					"fieldType": "textfield",
					"fieldValue": "",
					"logicJump": {
						"_id": "59e7f5c842a56fca5bf79361",
						"enabled": false,
						"id": "59e7f5c842a56fca5bf79361"
					},
					"_id": "59e7f5c842a56fca5bf79360",
					"created": "2017-10-19T00:46:00.484Z",
					"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
					"deletePreserved": false,
					"disabled": false,
					"required": true,
					"fieldOptions": [],
					"description": "",
					"isSubmission": false
				},
				"dropoffRate": 0,
				"continueRate": 0,
				"totalViews": 0,
				"responses": 0,
				"dropoffViews": 0
			}, {
				"field": {
					"globalId": "7vnFgEhKCZWwb6rR29Lat7mePmBK05fDTashc3modje",
					"lastModified": "2017-10-19T00:46:24.055Z",
					"title": "Short Text5",
					"fieldType": "textfield",
					"fieldValue": "",
					"logicJump": {
						"_id": "59e7f5d242a56fca5bf79366",
						"enabled": false,
						"id": "59e7f5d242a56fca5bf79366"
					},
					"_id": "59e7f5d242a56fca5bf79365",
					"created": "2017-10-19T00:46:10.619Z",
					"validFieldTypes": ["textfield", "date", "email", "link", "legal", "url", "textarea", "statement", "welcome", "thankyou", "file", "dropdown", "scale", "rating", "radio", "checkbox", "hidden", "yes_no", "natural", "stripe", "number"],
					"deletePreserved": false,
					"disabled": false,
					"required": true,
					"fieldOptions": [],
					"description": "",
					"isSubmission": false
				},
				"dropoffRate": 0,
				"continueRate": 0,
				"totalViews": 0,
				"responses": 0,
				"dropoffViews": 0
			}],
			"conversionRate": 0,
			"submissions": 0,
			"views": 0
		},
		"language": "en",
		"id": "59d25a9d413a7a3106878556"
	},

	sampleFormList: [this.sampleForm1, this.sampleForm2, this.sampleForm3],
}