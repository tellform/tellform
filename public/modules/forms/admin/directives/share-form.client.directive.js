'use strict';

angular.module('forms').directive('shareFormDirective', ['$rootScope', '$translate',
    function ($rootScope, $translate) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/share-form.client.view.html',
            restrict: 'E',
            scope: {
                actualformurl:'='
            },
            controller: function($scope){
                $scope.actualFormURL = $scope.actualformurl;


                $scope.fullScreen = "<iframe id='iframe' src='{{actualFormURL}}' style='width:100%;height:500px;'></iframe>"+
                                    "<div style='font-family: Sans-Serif;font-size: 12px;color: #999;opacity: 0.5; padding-top: 5px;'>"+
                                        $translate.instant('POWERED_BY')+
                                        "<a href='https://www.tellform.com' style='color: #999' target='_blank'>TellForm</a>"+
                                    "</div>";
            }
        };
    }
]);