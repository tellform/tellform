'use strict';

angular.module('forms').directive('validateDate', function($timeout) {
  return {
    restrict: "A",
    require: 'ngModel',
    priority: 2,
    scope: {
      ngRequired: "=",
    },
    link: function($scope, $elem, $attrs, ngModel) {
      var validator = null;

      $timeout(function() {
        if (!validator) {
          validator = ngModel.$validators.uiDateValidator;
        }

        ngModel.$validators.uiDateValidator = function uiDateValidator(modelValue, viewValue) {
          if (viewValue || $scope.ngRequired) {
            return validator(modelValue, viewValue);
          } else {
            return true;
          }
        };

        ngModel.$validate();
      }, 500);
    }
  }
});
