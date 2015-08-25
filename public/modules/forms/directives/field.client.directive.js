'use strict';

// coffeescript's for in loop
var __indexOf = [].indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
    }
    return -1;
};

angular.module('forms').directive('fieldDirective', ['$templateCache', '$http', '$compile', '$rootScope', 
    function($templateCache, $http, $compile, $rootScope) {

    
    var getTemplateUrl = function(field) {

        var type = field.fieldType;
        var templateUrl = 'modules/forms/views/directiveViews/field/';
        var supported_fields = [
            'textfield',
            'email',
            'textarea',
            'checkbox',
            'date',
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
            templateUrl += type + '.html';
        }
        var template = $templateCache.get(templateUrl);
        return template;
    };

    var linker = function(scope, element) {

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
        //DAVID: TODO: Make natural language processing work
        //Set only if we have a natural lang processing field
        // else if(scope.field.fieldType === 'natural'){
        //     scope.field.fieldMatchValue = '';

        //     //Fires when field is changed
        //     scope.$watch('scope.field', function(newField, oldField) {
                
        //     });
        // }
        
        // GET template content from path
        var template = getTemplateUrl(scope.field);
        // $http.get(templateUrl).success(function(data) {
            element.html(template);
            $compile(element.contents())(scope);
        // });
    };

    return {
        template: '<div>{{field.title}}</div>',
        restrict: 'E',
        scope: {
            field: '=',
            required: '&'
        },
        link: linker
    };
}]);