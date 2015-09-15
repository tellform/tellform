// 'use strict';

// angular.module('forms').directive('entryPage', ['$templateCache', '$http', '$compile', '$rootScope', 
//     function($templateCache, $http, $compile, $rootScope) {
//         var getTemplateUrl = function(type) {

//             var templateUrl = 'modules/forms/views/directiveViews/entryPage/';
//             var supported_pages = [
//                 'welcome',
//                 'thankyou'
//             ];
//             if (__indexOf.call(supported_pages, type) >= 0) {
//                 templateUrl += type + '.html';
//             }
//             var template = $templateCache.get(templateUrl);
//             return template;
//         };
//         return {
//             restrict: 'E',
//             template: '<div>Start Page</div>',
//             scope: {
//                 'pageData': '=',
//                 'pageType': '&'
//             },
//             link: function(scope, element) {

//                 // console.log(attrs);
//                 console.log('scope.pageData');
//                 // console.log(scope);
//                 scope.exitStartPage = function() {
//                     // console.log(scope.pageData);
//                     // if(attrs.pageData.showStart) attrs.pageData.showStart = false;
//                 };

//                 var template = getTemplateUrl(scope.pageType);
//                 element.html(template);
//                 $compile(element.contents())(scope);  
//             },
//             controller: function($scope){
//                 console.log('entryPage Controller');
//                 console.log($scope.pageData);
//                 // $scope.exitStartPage = function() {
//                 //     if($scope.pageData.showStart) scope.pageData.showStart = false;
//                 // };
//             }
//         };
// }]);