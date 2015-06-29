'use strict';

//Forms service used for communicating with the forms REST endpoints
angular.module('forms').service('CurrentForm', ['Forms', 
	function(Forms){

		//Private variables
		var _form = {};

		//Public Methods
		this.getForm = function() {
	        return _form;
	    };
	    this.setForm = function(form) {
	        _form = form;
	    };
    }
]);