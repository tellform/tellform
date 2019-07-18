'use strict';

angular.module('forms').directive('shareFormDirective', ['$rootScope', '$translate', '$state',
    function ($rootScope, $translate, $state) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/share-form.client.view.html',
            restrict: 'E',
            scope: {
                actualformurl:'='
            },
            controller: function($scope){
                $scope.actualFormURL = $scope.actualformurl;

                $scope.isCopied = false;
                $scope.onCopySuccess = function(){
                    $scope.isCopied = true;
                }

                $scope.embedCode = "<iframe id='iframe' src='" + $scope.actualFormURL + "' style='width:100%;height:500px;'></iframe>"+
                                    "<div style='font-family: Sans-Serif;font-size: 12px;color: #999;opacity: 0.5; padding-top: 5px;'>"+
                                        $translate.instant('POWERED_BY')+
                                        "<a href='https://www.ohmyform.com' style='color: #999' target='_blank'>OhMyForm</a>"+
                                    "</div>";

                /* Tab Routing Logic */
                $scope.shareTabs = [
                    {
                        heading: $translate.instant('SHARE_YOUR_FORM'),
                        route: 'viewForm.share.share_form',
                        active: false
                    },
                    {
                        heading: $translate.instant('EMBED_YOUR_FORM'),
                        route: 'viewForm.share.embed_form',
                        active: false
                    }
                ];

                $scope.go = function(tab){
                    $scope.isCopied = false;
                    tab.active = true;
                    $state.go(tab.route);
                };

                function setActiveTab() {
                    $scope.shareTabs.forEach(function(tab) {
                        tab.active = ($state.current.name === tab.route);
                    });
                }

                setActiveTab();

                $scope.$on("$stateChangeSuccess", setActiveTab());

            }
        };
    }
]);
