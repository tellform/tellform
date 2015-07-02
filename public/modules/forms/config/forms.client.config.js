'use strict';

// Configuring the Articles module
angular.module('forms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Forms', 'forms', 'dropdown', '/forms(/create)?');
		Menus.addSubMenuItem('topbar', 'forms', 'List Forms', 'forms');
		Menus.addSubMenuItem('topbar', 'forms', 'Create Form', 'forms/create');
	}
]).filter('formValidity',
    function(){

        return function(formObj){
			//get keys
			var formKeys = Object.keys(formObj);

			//we only care about things that don't start with $
			var fieldKeys = formKeys.filter(function(key){
			return key[0] !== '$';
			});

			var fields = formObj.form_fields;
			// fieldKeys.map(function(key){
			//   return formObj[key];
			// });

			var valid_count = fields.filter(function(field){
				if(typeof field === 'object'){
				    return !!(field.fieldValue);
				}
			}).length;
			return valid_count;
        };
});