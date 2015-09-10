var request = require('request'),
	async = require('async'),
	jsdom = require('jsdom-compat'),
	url = require('url');


var url_base = 'https://secure11.oscarhost.ca/'
	url_login_crsf = url_base+'kensington',
	url_login = url_base+'kensington/login.do',
	url_demo = url_base+'demographic/demographiccontrol.jsp';

var args_searchDemo = {'search_mode': 'search_hin', 'keyword': '', 'orderby': 'last_name,first_name', 'dboperation': 'search_titlename', 'limit1': 0, 'limit2': 10, 'displaymode': 'Search', 'ptstatus': 'active', 'fromMessenger': 'false'},
	args_login = {'authenticity_token': '', 'username': 'kensington', 'password': 'Temppass4', 'pin': 6448, 'commit': 'Login'};
/*
var args_updateDemo = 
{
	'demographic_no':189164,
	'last_name':'TEST1',
	'first_name':'ACCOUNT1',
	'title':'MR',
	'official_lang':'English',
	'spoken_lang':'English',
	'address':'500 Somewhere Ave',
	'city':'TEST CITY',
	'province':'BC',
	'postal':'V6V262',
	'phone':'604-123-4333',
	'hPhoneExt':''
	'hPhoneExtOrig':'',
	'phone2':'',
	'wPhoneExt':'',
	'wPhoneExtOrig':'',
	'demo_cell':6041118888,
	'demo_cellOrig':6041118888,
	'countryOfOrigin':'AT',
	'email':'someone@tsnstnhs.com',
	'myOscarUserName':''
	'newsletter':'No',
	'sin':'',
	'year_of_birth':1994,
	'month_of_birth':06,
	'date_of_birth':15,
	'age':21,
	'sex':'M',
	'hin':9146509343,
	'ver':'',
	'eff_date_year':2015,
	'eff_date_month':05,
	'eff_date_date':01,
	'hc_renew_date_year':'',
	'hc_renew_date_month':'',
	'hc_renew_date_date':'',
	'hc_type':'BC',
	'cytolNum':'',
	'cytolNumOrig':'',
	'provider_no':'',
	'resident':'',
	'midwife':'',
	'nurse':'',
	'r_doctor':'',
	'r_doctor_ohip':'',
	'initial_rosterstatus':'',
	'roster_status':''
	'roster_date_year':'',
	'roster_date_month':'',
	'roster_date_day':'',
	'roster_termination_date_year':'',
	'roster_termination_date_month':'',
	'roster_termination_date_day':'',
	'roster_termination_reason':'',
	'initial_patientstatus':'AC',
	'patient_status':'AC',
	'patientstatus_date_year':2015,
	'patientstatus_date_month':09,
	'patientstatus_date_day':10,
	'chart_no':''
	'wlId':''
	'list_id':0,
	'waiting_list_note':''
	'waiting_list_referral_date':''
	'date_joined_year':2015,
	'date_joined_month':09,
	'date_joined_date':10,
	'end_date_year':2016,
	'end_date_month':09,
	'end_date_date':10,
	'rxInteractionWarningLevelOrig':0,
	'rxInteractionWarningLevel':0,
	'alert':'',
	'notes':'',
	'dboperation':'update_record'
	'displaymode':'Update Record'
};

var _processDemo = function(newDemographic){

};
*/

module.exports.getDemoByHIN = function (hin, cb){
	var cookieJar = request.jar(),
		responseHeaders;

	async.waterfall([
		function (callback) {	
			request.get({url: url_login, jar: cookieJar}, function (err, httpResponse, body) {
				if (err) {
					callback(err, 'Error in HTTP POST of Login');
				}
				jsdom.env(
				  body,
				  function (err, window) {
				  	if (err) {
						callback(err, 'Error in Getting AuthenticityToken');
					}
				    args_login.authenticity_token = window.document.querySelector('input[name="authenticity_token"]').value;
				    callback();
				  }
				);
			});
		},
		function (callback) {	
			request.post({url: url_login, jar: cookieJar, form: args_login}, function (err, httpResponse, body) {
				if (err) {
					callback(err, 'Error in HTTP POST of Login');
				}
				responseHeaders = httpResponse.toJSON().headers;
				callback();
			});
		},
		function (callback) {
			var urlTemplate = url.parse(url_demo);
			args_searchDemo.keyword = hin+'';
			urlTemplate.query = args_searchDemo;

			var compiledSearchUrl = urlTemplate.format();

			request.get({url: compiledSearchUrl, jar: cookieJar, header: responseHeaders}, function (err, httpResponse, body) {
				if (err) {
					callback(err, 'Error in HTTP Get of Search');
				}
				jsdom.env(
					body,
					["http://code.jquery.com/jquery.js"],
					function (err, window) {
						if(err){
							callback(err);
						}	  
						console.log(body);	
		    			//var demogp_number = window.document.querySelectorAll("li > .demoIdSearch > a[title='Master Demo File']")[0].innerText;
		    			//demogp_number = parseInt(demogp_number, 10);
		    			callback(null, 8);
					}
				);

			});
		}
	], function(err, result) {
		if(err) throw err;
		if( (typeof result) != 'number'){
			throw new Error('Demographic number not captured');
		}

		cb(result);
	});
};
/*
module.exports.updateDemo = function (newDemo){
	async.waterfall([
		function (callback) {	
			request.get({url: url_login, jar: cookieJar}, function (err, httpResponse, body) {
				if (err) {
					callback(err, 'Error in HTTP POST of Login');
				}
				jsdom.env(
				  body,
				  function (err, window) {
				  	if (err) {
						callback(err, 'Error in Getting AuthenticityToken');
					}
				    args_login.authenticity_token = window.document.querySelector('input[name="authenticity_token"]').value;
				    callback();
				  }
				);
			});
		},
		function (callback) {	
			request.post({url: url_login, jar: cookieJar, form: args_login}, function (err, httpResponse, body) {
				if (err) {
					callback(err, 'Error in HTTP POST of Login');
				}
				responseHeaders = httpResponse.toJSON().headers;
				callback();
			});
		},
		function (callback) {
			var urlTemplate = url.parse(url_demo);
			urlTemplate.query = args_search;

			var compiledSearchUrl = urlTemplate.format();

			request.get({url: urlSearchStr, jar: cookieJar, header: responseHeaders}, function (err, httpResponse, body) {
				if (err) {
					callback(err, 'Error in HTTP Get of Search');
				}
				jsdom.env(
					body,
					function (err, window) {
						if(err){
							callback(err);
						}	    			
		    			var urlDemo = 
		    			callback(null, demogp_number);
					}
				);

			});
		}
	], function(err, result) {
		if(err) throw err;
		if( (typeof result) != 'number'){
			throw new Error('Demographic number not captured');
		}

		cb(result);
	});
};
*/