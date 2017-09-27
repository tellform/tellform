'use strict';

// To fix angular-input-stars error
var __indexOf = [].indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
    }
    return -1;
};

angular.module('forms').directive('fieldDirective', ['$compile', '$rootScope', '$templateCache', 'FormFields',
  function($compile, $rootScope, $templateCache, FormFields) {

    var getTemplateUrl = function(fieldType) {
      var templateUrl = 'modules/forms/base/views/directiveViews/field/';

      var supported_field = FormFields.types.filter(function(field) {
        return field.name === fieldType;
      });

      if (supported_field.length > 0) {
        templateUrl = templateUrl + fieldType + '.html';
      }
      return $templateCache.get(templateUrl);
    };

    return {
      template: '<div>{{field.title}}</div>',
      restrict: 'E',
      scope: {
        field: '=',
        required: '&',
        forms: '='
      },
      link: function(scope, element) {
        var fieldType = scope.field.fieldType;
        scope.setActiveField = $rootScope.setActiveField;

        scope.getFieldOptions = function() {
          if (!scope.field.fileOptions && !scope.field.manualOptions) {
            return scope.field.fieldOptions;
          } else {
            if (scope.field.fieldOptionsFromFile) {
              return scope.field.fileOptions;
            } else {
              return scope.field.manualOptions;
            }
          }
        };

        //Set format only if field is a date
        if (fieldType === 'number' || fieldType === 'textfield' || fieldType === 'email' || fieldType === 'link') {
          switch (fieldType) {
            case 'textfield':
              scope.input_type = 'text';
              break;
            case 'email':
              scope.input_type = 'email';
              scope.placeholder = 'joesmith@example.com';
              break;
            case 'number':
              scope.input_type = 'number';
              break;
            default:
              scope.input_type = 'url';
              scope.placeholder = 'http://example.com';
              break;
          }
          fieldType = 'textfield';
        } else if (fieldType === 'date') {
          scope.dateOptions = {
            changeYear: true,
            changeMonth: true,
            dateFormat: 'dd M yy',
            yearRange: '1900:+0'
          };
        } else if (fieldType === 'yes_no') {
          scope.field.fieldValue = undefined;
        } else if (fieldType === 'rating') {
          scope.field.fieldValue = 0;
        } else if (fieldType === 'dropdown') {
          scope.getFieldOptions();
        } else if (fieldType === 'radio') {
          scope.field.fieldValue = scope.field.fieldOptions[0];
        } else if (fieldType === 'legal') {
          scope.field.fieldValue = 'true';
        }

        var template = getTemplateUrl(fieldType);
        element.html(template).show();
        var output = $compile(element.contents())(scope);
      }
    };
  }
]);
