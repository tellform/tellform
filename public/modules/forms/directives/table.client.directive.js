'use strict';

angular.module('forms').directive('tableDirective', ['$http', '$timeout', 'Auth',
    function ($http, $timeout, Auth) {
        return {
            templateUrl: './modules/forms/views/directiveViews/table/table.html',
            restrict: 'E',
            scope: {
                rows:'=',
                extras:'=',
            },
            controller: function($scope){

                $scope.toggleChecker = function(checked) {
                    var rows = $scope.gridOptions.$gridScope.renderedRows,
                        allChecked = true;

                    for (var r = 0; r < rows.length; r++) {
                        if (rows[r].entity.checker !== true) {
                            allChecked = false;
                            break;
                        }
                    }

                    $scope.gridOptions.$gridScope.checker = allChecked;
                };



            },

        };
    }
]);