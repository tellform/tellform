'use strict';

var mandrill_api_key = 'AVCCf1C2dFlrNhx9Iyi_yQ';

//Use mandrill mock API_key if we are testing
// if(process.env.NODE_ENV === 'test')  mandrill_api_key = '_YNOKLgT9DGb2sgVGR66yQ';

module.exports = {
	// db: {
	//     uri: 'mongodb://localhost/local-dev',
	//     options: {
	//       user: '',
	//       pass: ''
	//     }
	// },
	sessionSecret: process.env.SESSION_SECRET || 'somethingheresecret',
};