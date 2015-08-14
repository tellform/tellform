var soap = require('soap'),
	request = require('request'),
	async = require('async'),
	OscarSecurity = require('./OscarSecurity');


var url_login = 'http://someurl.com/ws?wsdl',
	url_demo = 'http://someurl.com/ws?wsdl',
	args_demo = {arg0: 12351235},
	args_login = {arg0: 'mylogin', arg1: 'mypassword'};

var options = {
    ignoredNamespaces: {
        namespaces: ['targetNamespace', 'typedNamespace'],
        override: true
    }
}

async.waterfall([
	function (callback) {	
		soap.createClient(url_login, options, function(err, client) {
			client.login(args_login, function (err, result) {
				if(err) callback(err);
				callback(null, result.return);
			});

		});
	},
	function (security_obj, callback) {

		console.log(security_obj);

		soap.createClient(url_demo, options, function(err, client) {
			client.setSecurity(new OscarSecurity(security_obj.securityId, security_obj.securityTokenKey) );

			client.getDemographic(args_demo, function (err, result) {
				if(err) callback(err);
				console.log(result);
				callback(null, 'DemographicService');
			});

		});
	}
], function(err, result) {
	if(err) throw err;

	console.log(result);
});




