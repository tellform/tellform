var soap = require('soap'),
	async = require('async'),
	demo = require('./test_headless'),
	OscarSecurity = require('./OscarSecurity');

var url_demo = 'https://secure2.oscarhost.ca/kensington/ws/DemographicService?wsdl',
	url_login = 'https://secure2.oscarhost.ca/kensington/ws/LoginService?wsdl',
	args_demo = {arg0: 0},
	args_login = {arg0: 'davieb', arg1: 'Temppass1'},
	my_hin = 9146489321;

var fakeDemo = {
		"activeCount": 1, 
		"address": "880-9650 Velit. St.",
		"alias": "",
		"anonymous": "",
		"chartNo": 200000,
		"children": "",
		"hin": 9146509343,
		"city": "Lloydminster",
		"dateJoined": new Date(),
		"dateOfBirth": "10",
		"demographicNo": 90348,
		"email": "Sed.nunc@dis.co.uk",
		"familyDoctor": "<rdohip></rdohip><rd></rd>",
		"firstName": "Uriah F.",
		"lastName": "Little",
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
	function (security_obj, callback){
		//Search by HIN for demographic number
		demo.getDemoByHIN(my_hin, function(demo_num){
			args_demo.arg0 = demo_num;
			callback(null, security_obj)
		});
	},
	function (security_obj, callback) {
		//Get demographic
		soap.createClient(url_demo, options, function(err, client) {
			client.setSecurity(new OscarSecurity(security_obj.securityId, security_obj.securityTokenKey) );

			client.getDemographic(args_demo, function (err, result) {
				if(err) callback(err);
				console.log('My Demographic:')
				console.log(result);
				callback(null, security_obj);
			});
		});
	},

	function (security_obj, callback) {
		//Add demographic
		soap.createClient(url_demo, options, function(err, client) {
			client.setSecurity(new OscarSecurity(security_obj.securityId, security_obj.securityTokenKey) );

			client.addDemographic(fakeDemo, function (err, result) {
				if(err) callback(err);
				callback(null, result);
			});
		});
	},

], function(err, result) {
	if(err) throw err;
	console.log(result);
});




