'use strict';

// Configuring the Forms drop-down menus
angular.module('forms').filter('formValidity',
function(){
	return function(formObj){
		if(formObj && formObj.form_fields && formObj.visible_form_fields){

			//get keys
			var formKeys = Object.keys(formObj);

			//we only care about things that don't start with $
			var fieldKeys = formKeys.filter(function(key){
				return key[0] !== '$';
			});

			var fields = formObj.form_fields;

			var valid_count = fields.filter(function(field){
				if(typeof field === 'object' && field.fieldType !== 'statement' && field.fieldType !== 'rating'){
					return !!(field.fieldValue);
				}

			}).length;
			return valid_count - (formObj.form_fields.length - formObj.visible_form_fields.length);
		}
		return 0;
	};
});
