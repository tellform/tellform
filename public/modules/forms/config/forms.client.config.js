'use strict';

// Configuring the Forms drop-down menus
angular.module('forms').run(['Menus',
  function(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'My Forms', 'forms', '', '/forms', false);
  }
]).filter('addFieldNumber',
  function() {
    return function(fields) {
      if (fields) {
        var non_response_fields = 0;

        fields.forEach(function(field, index) {
          if (field.fieldType !== 'section' && field.fieldType !== 'statement') {
            field.field_number = (index + 1) - non_response_fields;
          } else {
            non_response_fields++;
          }
        });
      }
      return fields;
    };
  }).filter('answeredFields',
  function() {
    return function(fields) {
      var answered_fields;

      if (fields) {
        answered_fields = fields.filter(function(field) {
          return (field.fieldType !== 'yes_no' && field.fieldType !== 'number' && !!(field.fieldValue)) ||
            (field.fieldType === 'yes_no' && field.fieldValue != undefined) ||
            (field.fieldType === 'number' && (!!(field.fieldValue) || field.fieldValue === 0));
        });
      }
      return answered_fields;
    };
  }).filter('mandatoryFields',
  function() {
    return function(fields) {
      var mandatory_fields;

      if (fields) {
        mandatory_fields = fields.filter(function(field) {
          return field.required;
        });
      }
      return mandatory_fields;
    };
  }).filter('responseFields',
  function() {
    return function(fields) {
      var response_fields;

      if (fields) {
        response_fields = fields.filter(function(field) {
          return field.fieldType !== 'section' && field.fieldType !== 'statement';
        });
      }
      return response_fields;
    };
  }).filter('fieldById',
  function() {
    return function(fields, id) {
      var found_fields;

      if (fields) {
        found_fields = fields.filter(function(field) {
          return field._id == id;
        });
      }

      var found_field = found_fields ? found_fields[0] : undefined;
      return found_field;
    };
  }).config(['$provide', function($provide) {
  $provide.decorator('accordionDirective', function($delegate) {
    var directive = $delegate[0];
    directive.replace = true;
    return $delegate;
  });
}]);
