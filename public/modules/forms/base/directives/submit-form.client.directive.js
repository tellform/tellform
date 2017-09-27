'use strict';


angular.module('forms').directive('formDirective', ['$http', '$filter', '$rootScope', 'Auth',
  function($http, $filter, $rootScope, Auth) {
    return {
      templateUrl: 'modules/forms/base/views/directiveViews/form/form.client.view.html',
      restrict: 'E',
      scope: {
        myform: '='
      },
      controller: function($document, $window, $scope) {
        $scope.authentication = $rootScope.authentication;
        $scope.myform.form_fields = $filter('addFieldNumber')($scope.myform.form_fields);

        $scope.response_fields = $filter('responseFields')($scope.myform.form_fields);
        var response_fields_count = $scope.response_fields.length;
        var mandatory_count = $filter('mandatoryFields')($scope.response_fields).length;

        $scope.calculateAdvancement = function() {
          var answered_fields = $filter('answeredFields')($scope.response_fields);
          var answered_count = answered_fields.length;
          var mandatory_answered_count = $filter('mandatoryFields')(answered_fields).length;
          var need_completed_count = mandatory_count - mandatory_answered_count;

          return {
            done: answered_count,
            total: response_fields_count,
            questions_not_completed: need_completed_count
          }
        };

        $scope.reloadForm = function() {
          //Reset Form
          $scope.myform.submitted = false;
          $scope.myform.form_fields = _.chain($scope.myform.form_fields).map(function(field) {
            field.fieldValue = '';
            return field;
          }).value();

          $scope.loading = false;
          $scope.error = '';

          $scope.selected = {
            _id: '',
            index: 1
          };
          initFocus();
        };

        /*
         ** Field Controls
         */
        var initFocus = function() {
          if ($scope.response_fields.length) {
            var active_field = $scope.response_fields[0]
            $scope.setActiveField(active_field, true);
            focusActiveField(active_field);
          }
        }

        var focusActiveField = function(active_field) {
          setTimeout(function() {
            var active_element = angular.element('#' + active_field._id);

            if (active_field.fieldType === 'dropdown') {
              var uiSelect = active_element.controller('uiSelect');
              uiSelect.focusser[0].focus();
              uiSelect.open = true;
              uiSelect.activate();
            } else {
              active_element.focus();
            }
          });
        }

        $scope.setActiveField = $rootScope.setActiveField = function(field, animateScroll) {
          $scope.selected._id = field._id;
          $scope.selected.index = field.field_number;

          if (animateScroll) {
            setTimeout(function() {
              $document.scrollToElement(angular.element('.activeField'), -10, 200).then(function() {
                focusActiveField(field);
              });
            }, 200);
          }
        };

        $rootScope.nextField = $scope.nextField = function() {
          if ($scope.selected.index < response_fields_count) {
            var selected_field = $scope.response_fields[$scope.selected.index];
            $rootScope.setActiveField(selected_field, true);
          }
        };

        $rootScope.prevField = $scope.prevField = function() {
          if ($scope.selected.index > 1) {
            var selected_field = $scope.response_fields[$scope.selected.index - 2];
            $scope.setActiveField(selected_field, true);
          }
        };

        /*
         ** Form Display Functions
         */
        $scope.exitStartPage = function() {
          $scope.myform.startPage.showStart = false;
          if ($scope.myform.form_fields.length > 0) {
            initFocus();
          }
        };

        $rootScope.goToInvalid = $scope.goToInvalid = function() {
          var invalid_element = angular.element('.field-input .ng-invalid')[0];
          var invalid_field = $filter('fieldById')($scope.response_fields, invalid_element.id);

          if (invalid_field) {
            $rootScope.setActiveField(invalid_field, true);
          }
        };

        $rootScope.submitForm = $scope.submitForm = function(cb) {
          $scope.button_clicked = true;

          var form = _.cloneDeep($scope.myform);

          setTimeout(function() {
            $scope.submitPromise = $http.post('/forms/' + $scope.myform.admin.agency.shortName + '/' + $scope.myform._id + '/submissions', form)
              .success(function(data, status, headers) {
                $scope.myform.submitted = true;
                $scope.button_clicked = false;
                if (cb) {
                  cb();
                }
              })
              .error(function(error) {
                $scope.button_clicked = false;
                console.error(error);
                $scope.error = error.message;
                if (cb) {
                  cb(error);
                }
              });
          }, 500);
        };

        //Reload our form
        $scope.reloadForm();
      }
    };
  }
]);
