'use strict';

angular.module('forms').directive('configureFormDirective', ['$rootScope', '$filter', '$state',
    function ($rootScope, $filter, $state) {
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

                $scope.$evalAsync(function() {
                    angular.element('.tag')
                });

                $scope.languages = ['en', 'fr', 'es', 'it', 'de'];

                $scope.langCodeToWord = {
                    'en': 'English',
                    'fr': 'Français',
                    'es': 'Español',
                    'it': 'Italiàno',
                    'de': 'Deutsch'
                };

                $scope.wordToLangCode = {
                    'English': 'en',
                    'Français': 'fr',
                    'Español': 'es',
                    'Italiàno': 'it',
                    'Deutsch': 'de'
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
            }
        };
    }
]);
