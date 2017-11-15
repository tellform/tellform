'use strict';

angular.module('forms').directive('configureFormDirective', ['$rootScope', '$filter', '$state', '$translate', '$timeout', '$window',
    function ($rootScope, $filter, $state, $translate, $timeout, $window) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/configure-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'='
            },
            controller: function($scope){
                $rootScope.myform = $scope.myform;
                $scope.languages = $rootScope.languages;
                $scope.resetForm = $rootScope.resetForm;
                $scope.update = $rootScope.update;

                Quill.register('modules/placeholder', PlaceholderModule.default(Quill))
                $scope.customModules = {
                    placeholder: {
                        placeholders: $scope.myform.visible_form_fields.map(function(field){
                            return {
                                id: field.globalId,
                                label: field.title
                            };
                        }),
                        className: 'placeholder-tag',
                        delimiters: ['', '']
                    }
                };

                $scope.configureTabs = [
                    {
                        heading: $filter('translate')('GENERAL_TAB'),
                        route: 'viewForm.configure.general',
                        active: false
                    },
                    {
                        heading: $filter('translate')('SELF_NOTIFICATIONS_TAB'),
                        route: 'viewForm.configure.self_notifications',
                        active: false
                    },
                    {
                        heading: $filter('translate')('RESPONDENT_NOTIFICATIONS_TAB'),
                        route: 'viewForm.configure.respondent_notifications',
                        active: false
                    }
                ];

                $scope.emailFields = $scope.myform.form_fields.filter(function(field){
                    return field.fieldType === 'email';
                });

                $scope.formHasEmailField = ($scope.emailFields.length > 0);

                $scope.go = function(tab){
                    tab.active = true;
                    $state.go(tab.route);
                };

                function setActiveTab() {
                    $scope.configureTabs.forEach(function(tab) {
                        tab.active = ($state.current.name === tab.route);
                    });
                }

                setActiveTab();

                $scope.$on("$stateChangeSuccess", setActiveTab());

                $scope.$on('$viewContentLoaded', function ($evt, data) {
                    console.log('hello');
                    $timeout(function(){
                        if(!$('.ql-picker.ql-placeholder > span.ql-picker-label').attr('data-before')){
                            $('.ql-picker.ql-placeholder > span.ql-picker-label').attr('data-before', $translate.instant('ADD_VARIABLE_BUTTON'));
                        }
                    }, 500);
                    console.log($('.ql-picker.ql-placeholder > span.ql-picker-label'));
                });
            }
        };
    }
]);
