angular.module('angular-input-stars', [])

    .directive('inputStars', ['$rootScope', function ($rootScope) {

        var directive = {

            restrict: 'EA',
            replace: true,
            template: '<ul ng-class="listClass">' +
            '<li ng-touch="paintStars($index)" ng-mouseenter="paintStars($index, true)" ng-mouseleave="unpaintStars($index, false)" ng-repeat="item in items track by $index">' +
            '<i  ng-class="getClass($index)" ng-click="setValue($index, $event)"></i>' +
            '</li>' +
            '</ul>',
            require: 'ngModel',
            scope: true,

            link: link

        };

        return directive;

        function link(scope, element, attrs, ngModelCtrl) {

            scope.items = new Array(+attrs.max);

            var emptyIcon = attrs.iconEmpty || 'fa-star-o';
            var iconHover = attrs.iconHover || 'angular-input-stars-hover';
            var fullIcon = attrs.iconFull || 'fa-star';
            var iconBase = attrs.iconBase || 'fa fa-fw';
            scope.listClass = attrs.listClass || 'angular-input-stars';
            scope.readonly  = ! (attrs.readonly === undefined);

            ngModelCtrl.$render = function () {

                scope.last_value = ngModelCtrl.$viewValue || 0;

            };

            scope.getClass = function (index) {

                return index >= scope.last_value ? iconBase + ' ' + emptyIcon : iconBase + ' ' + fullIcon + ' active ';

            };

            scope.unpaintStars = function ($index, hover) {

                scope.paintStars(scope.last_value - 1, hover);

            };

            scope.paintStars = function ($index, hover) {

                //ignore painting, if readonly
                if (scope.readonly) {
                    return;
                }
                var items = element.find('li').find('i');

                for (var index = 0; index < items.length; index++) {

                    var $star = angular.element(items[index]);

                    if ($index >= index) {
                        
                        $star.removeClass(emptyIcon);
                        $star.addClass(fullIcon);
                        $star.addClass('active');
                        $star.addClass(iconHover);

                    } else {

                        $star.removeClass(fullIcon);
                        $star.removeClass('active');
                        $star.removeClass(iconHover);
                        $star.addClass(emptyIcon);

                    }
                }

                !hover && items.removeClass(iconHover);

            };

            scope.setValue = function (index, e) {

                //ignore painting
                if (scope.readonly) {
                    return;
                }
                var star = e.target;

                if (e.pageX < star.getBoundingClientRect().left + star.offsetWidth / 2) {
                    scope.last_value = index + 1;
                } else {
                    scope.last_value = index + 1;
                }

                ngModelCtrl.$setViewValue(scope.last_value);
                
                //Execute custom trigger function if there is one
                if(attrs.onStarClick){
			$rootScope.$eval(attrs.onStarClick);
                }

            };

        }

    }]);
