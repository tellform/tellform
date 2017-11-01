'use strict';

// Configuring the Forms drop-down menus
angular.module('forms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'My Forms', 'forms', '', '/forms', false);
	}
]).filter('secondsToDateTime', [function() {
	return function(seconds) {
		return new Date(1970, 0, 1).setSeconds(seconds);
	};
}]).filter('formValidity', [function(){
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
					} else if(field.fieldType === 'rating'){
					    return true;
					}

				}).length;
				return valid_count - (formObj.form_fields.length - formObj.visible_form_fields.length);
			}
			return 0;
        };
}]).filter('trustSrc', ['$sce', function($sce){
        return function(formUrl){
        	return $sce.trustAsResourceUrl(formUrl);
        };
}]).config(['$provide', function ($provide){
    $provide.decorator('accordionDirective', function($delegate) {
        var directive = $delegate[0];
        directive.replace = true;
        return $delegate;
    });
}]).config(['$provide', function ($provide){
    $provide.decorator('taOptions', ['$delegate', 'taRegisterTool', '$translate', '$window', function(taOptions, taRegisterTool, $translate, $window) {
        taRegisterTool('addFieldVariable', {
            display: '<div class="dropdown" uib-dropdown is-open="isopen">\
					<div class="dropdown-toggle" ng-disabled="isDisabled()" uib-dropdown-toggle>\
						<span>{{ "ADD_A_VARIABLE" | translate }}</span>\
						<b class="caret"></b>\
					</div>\
					<ul class="dropdown-menu">\
						<li ng-repeat="field in $root.myform.form_fields" ng-click="onClickField(field._id, field.title)">\
							{{field.title}}\
						</li>\
					</ul>\
				</div>',
            onClickField: function(field_id, field_name){
            	this.$editor().wrapSelection('insertHTML', '<var class="fieldVariable tag" contenteditable="false" id="' + field_id + '">' + field_name + '</var>', true);
            },
            action: function(){
            }
        });

		return taOptions;
    }]);
}]);