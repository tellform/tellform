'use strict';

// Configuring the Forms drop-down menus
angular.module('forms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'My Forms', 'forms', '', '/forms', false);
	}
]).run(['$rootScope', '$state', 
	function($rootScope, $state) {
    	$rootScope.$on('$stateChangeStart', function(evt, to, params) {
	      	if (to.redirectTo) {
	       		evt.preventDefault();
	        	$state.go(to.redirectTo, params)
	      	}
	    });
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
    $provide.decorator('taOptions', ['$delegate', 'taRegisterTool', '$translate', '$window', 'taSelection', function(taOptions, taRegisterTool, $translate, $window, taSelection) {
        taRegisterTool('insertField', {
            display: '<div uib-dropdown is-open="isopen">\
					<div class="btn btn-default" ng-disabled="isDisabled()" uib-dropdown-toggle>\
						<span>{{ "ADD_VARIABLE_BUTTON" | translate }}</span>\
						<b class="caret"></b>\
					</div>\
					<ul class="dropdown-menu" uib-dropdown-menu>\
						<li ng-repeat="field in $root.myform.form_fields" ng-click="onClickField(field.globalId, field.title)">\
							<a> {{field.title}} </a>\
						</li>\
					</ul>\
				</div>',
			class: 'btn-group',
            onClickField: function(field_id, field_name){
            	if (taSelection.getSelectionElement().tagName && (taSelection.getSelectionElement().tagName.toLowerCase() === 'var' || taSelection.getSelectionElement().tagName.toLowerCase() === 'a')) {
                    // due to differences in implementation between FireFox and Chrome, we must move the
                    // insertion point past the <a> element, otherwise FireFox inserts inside the <a>
                    // With this change, both FireFox and Chrome behave the same way!
                    taSelection.setSelectionAfterElement(taSelection.getSelectionElement());
                }
            	this.$editor().wrapSelection('insertHTML', ' <var class="tag field-' + field_id + '" contenteditable="false">' + field_name + '</var> ', true);
            },
            action: function(){
            }
        });

        taOptions.defaultTagAttributes['var'] = {
        	'contenteditable': 'false'
        };

		return taOptions;
    }]);
}]);