'use strict';

// Configuring the Forms drop-down menus
angular.module('forms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'My Forms', 'forms', '', '/forms', false);
	}
])
/*.filter('highlight', function() {
    function escapeRegexp(queryToEscape) {
        return ('' + queryToEscape).replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    return function(matchItem, query) {
        return query && matchItem ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<span class="ui-select-highlight">$&</span>') : matchItem;
    };
})*/
.filter('formValidity',
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
}).config(['$provide', function ($provide){
    $provide.decorator('accordionDirective', function($delegate) { 
        var directive = $delegate[0];
        directive.replace = true;
        return $delegate;
    });
}]);
