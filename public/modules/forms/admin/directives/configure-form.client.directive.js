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
                $scope.languages = $rootScope.languages;
                $scope.resetForm = $rootScope.resetForm;
                $scope.update = $rootScope.update;

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
