'use strict';

angular.module('forms').directive('configureFormDirective', ['$rootScope', '$filter',
    function ($rootScope, $filter) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/configure-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'='
            },
            controller: function($scope){
                $scope.languages = $rootScope.languages;
                $scope.resetForm = $rootScope.resetForm;
                $scope.update = $rootScope.update;

                $scope.configureTabs = [
                    {
                        heading: $filter('translate')('GENERAL_TAB'),
                        route: 'viewForm.configure.general'
                    },
                    {
                        heading: $filter('translate')('SELF_NOTIFICATIONS_TAB'),
                        route: 'viewForm.configure.self_notifications'
                    },
                    {
                        heading: $filter('translate')('RESPONDENT_NOTIFICATIONS_TAB'),
                        route: 'viewForm.configure.respondent_notifications'
                    }
                ];

                $scope.go = function(route){
                    $state.go(route);
                };
            }
        };
    }
]);
