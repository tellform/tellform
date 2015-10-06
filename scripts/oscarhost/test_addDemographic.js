var soap = require('soap'),
	async = require('async'),
	demo = require('./test_headless'),
	OscarSecurity = require('./OscarSecurity');

var url_demo = 'https://secure2.oscarhost.ca/kensington/ws/DemographicService?wsdl',
	url_login = 'https://secure2.oscarhost.ca/kensington/ws/LoginService?wsdl',
	args_demo = {arg0: 0},
	args_login = {arg0: 'username', arg1: 'password'},
	my_hin = 1234123123;

var fakeDemo = {
		"activeCount": 1, 
		"address": "880-9650 Velit. St.",
		"alias": "",
		"anonymous": "",
		"chartNo": "",
		"children":"",
		"citizenship":"Canadian",
		"city": "Lloydminster",
		"dateJoined": new Date(),
		"dateOfBirth": "10",
		"demographicNo": 90348,
		"email": "Sed.nunc@dis.co.uk",
		"firstName": "Uriah F.",
		"hin": 9146509343,
		"lastName": "Little",
		"lastUpdateDate": new Date(),
		"monthOfBirth": "05",
		"officialLanguage": "English",
		"phone": "(306) 872-3210",
		"phone2": "(306) 556-8264",
		"providerNo": 4,
		"province": "SK",
		"sex": "F",
		"spokenLanguage": "English",
		"postal": "S4M 7T8",
		"yearOfBirth": "2015"
	};

var exampleDemo = { 
	activeCount: 1,
	address: '880-9650 Velit. St.',
	chartNo: '',
	city: '',
	dateJoined: Date.now(),
	dateOfBirth: '10',
	displayName: 'LITTLE, URIAH',
	email: '',
	familyDoctor: '<rdohip></rdohip><rd></rd>',
	firstName: 'Uriah F.',
	hcType: 'BC',
	hin: '',
	hsAlertCount: 0,
	lastName: 'Little',
	lastUpdateDate: Date.now(),
	lastUpdateUser: '',
	links: '',
	monthOfBirth: '05',
	officialLanguage: 'English',
	patientStatus: 'AC',
	patientStatusDate: Date.now(),
	phone: '250-',
	phone2: '',
	postal: "S4M 7T8",
	providerNo: '4',
	province: 'BC',
	rosterStatus: '',
	sex: 'M',
	sexDesc: 'Female',
	sin: '',
	spokenLanguage: 'English',
	title: 'MS.',
	yearOfBirth: '2015' }

var options = {
    ignoredNamespaces: {
        namespaces: ['targetNamespace', 'typedNamespace'],
        override: true
    }
}

async.waterfall([
	function (callback) {	
		//Authenticate with API
		soap.createClient(url_login, options, function(err, client) {
			client.login(args_login, function (err, result) {
				if(err) callback(err);
				callback(null, result.return);
			});
		});
	},

	function (security_obj, callback) {
		//Add demographic
		soap.createClient(url_demo, options, function(err, client) {
			client.setSecurity(new OscarSecurity(security_obj.securityId, security_obj.securityTokenKey) );

			client.addDemographic({ arg0: exampleDemo }, function (err, result) {
				if(err) callback(err);
				console.log(client.describe());
				callback(null, result);
			});
		});
	},

], function(err, result) {
	if(err) throw err;
	console.log(result);
});




