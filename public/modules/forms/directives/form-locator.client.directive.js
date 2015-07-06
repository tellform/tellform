'use strict';
angular.module('forms').directive('formLocator', function() {
    return {
      link: function(scope) {
        scope.$emit('formLocator');
      }
    }
});