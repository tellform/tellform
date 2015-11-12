'use strict';

// coffeescript's for in loop
var __indexOf = [].indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
    }
    return -1;
};

angular.module('forms').directive('fieldDirective', ['$http', '$compile', '$rootScope', 
    function($http, $compile, $rootScope) {

    
    var getTemplateUrl = function(field) {
        var type = field.fieldType;
        var templateUrl = 'modules/forms/views/directiveViews/field/';
        var supported_fields = [
            'textfield',
            'email',
            'textarea',
            'checkbox',
            'date',
            'link',
            'dropdown',
            'hidden',
            'password',
            'radio',
            'legal',
            'statement',
            'rating',
            'yes_no',
            'number',
            'natural'
        ];
        if (__indexOf.call(supported_fields, type) >= 0) {
            templateUrl = templateUrl+type+'.html';
        }
        return templateUrl;
    };

    return {
        template: '<div>{{field.title}}</div>',
        restrict: 'E',
        scope: {
            field: '=',
            required: '&',
            design: '=',
            index: '=',
        },
        link: function(scope, element) {
            scope.setActiveField = $rootScope.setActiveField;
            
            //Set format only if field is a date
            if(scope.field.fieldType === 'date'){
                scope.dateOptions = {
                    changeYear: true,
                    changeMonth: true,
                    altFormat: 'mm/dd/yyyy',
                    yearRange: '1900:-0',   
                    defaultDate: 0,
                };
            }

            // GET template content from path
            var templateUrl = getTemplateUrl(scope.field);
            $http.get(templateUrl).success(function(data) {
                element.html(data).show();
                $compile(element.contents())(scope);
            });
        },
    };
}]);