'use strict';

//FIXME: Should find an appropriate place for this
//Setting up jsep
jsep.addBinaryOp('contains', 10);
jsep.addBinaryOp('!contains', 10);
jsep.addBinaryOp('begins', 10);
jsep.addBinaryOp('!begins', 10);
jsep.addBinaryOp('ends', 10);
jsep.addBinaryOp('!ends', 10);

angular.module('view-form').directive('submitFormDirective', ['$http', 'TimeCounter', '$filter', '$rootScope', 'SendVisitorData',
    function ($http, TimeCounter, $filter, $rootScope, SendVisitorData) {
        return {
            templateUrl: 'form_modules/forms/base/views/directiveViews/form/submit-form.client.view.html',
			restrict: 'E',
            scope: {
                myform:'='
            },
            controller: function($document, $window, $scope){
		        $scope.noscroll = false;
                $scope.forms = {};
				TimeCounter.restartClock();

		var form_fields_count = $scope.myform.visible_form_fields.filter(function(field){
                    if(field.fieldType === 'statement'){
                        return false;
                    }
                    return true;
                }).length;

		var nb_valid = $filter('formValidity')($scope.myform);
		$scope.translateAdvancementData = {
			done: nb_valid,
			total: form_fields_count,
			answers_not_completed: form_fields_count - nb_valid
		};

                $scope.reloadForm = function(){
                    //Reset Form
                    $scope.myform.submitted = false;
                    $scope.myform.form_fields = _.chain($scope.myform.visible_form_fields).map(function(field){
                            field.fieldValue = '';
                            return field;
                        }).value();

					$scope.loading = false;
                    $scope.error = '';

                    $scope.selected = {
                        _id: '',
                        index: 0
                    };
                    $scope.setActiveField($scope.myform.visible_form_fields[0]._id, 0, false);

                    //Reset Timer
                    TimeCounter.restartClock();
                };

				//Fire event when window is scrolled
				$window.onscroll = function(){
            		$scope.scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
					var elemBox = document.getElementsByClassName('activeField')[0].getBoundingClientRect();
					$scope.fieldTop = elemBox.top;
					$scope.fieldBottom = elemBox.bottom;

                    //console.log($scope.forms.myForm);
					var field_id;
					var field_index;

                    if(!$scope.noscroll){
                        //Focus on submit button
                        if( $scope.selected.index === $scope.myform.visible_form_fields.length-1 && $scope.fieldBottom < 200){
                            field_index = $scope.selected.index+1;
                            field_id = 'submit_field';
                            $scope.setActiveField(field_id, field_index, false);
                        }
                        //Focus on field above submit button
                        else if($scope.selected.index === $scope.myform.visible_form_fields.length){
                            if($scope.fieldTop > 200){
                                field_index = $scope.selected.index-1;
                                field_id = $scope.myform.visible_form_fields[field_index]._id;
                                $scope.setActiveField(field_id, field_index, false);
                            }
                        }else if( $scope.fieldBottom < 0){
                            field_index = $scope.selected.index+1;
                            field_id = $scope.myform.visible_form_fields[field_index]._id;
                            $scope.setActiveField(field_id, field_index, false);
                        }else if ( $scope.selected.index !== 0 && $scope.fieldTop > 0) {
                            field_index = $scope.selected.index-1;
                            field_id = $scope.myform.visible_form_fields[field_index]._id;
                            $scope.setActiveField(field_id, field_index, false);
                        }
                        //console.log('$scope.selected.index: '+$scope.selected.index);
					    //console.log('scroll pos: '+$scope.scrollPos+' fieldTop: '+$scope.fieldTop+' fieldBottom: '+$scope.fieldBottom);
            		    $scope.$apply();
                    }
        		};

                /*
                ** Field Controls
                */
				var evaluateLogicJump = function(field){
					var logicJump = field.logicJump;

					if (logicJump.expressionString && logicJump.valueB && field.fieldValue) {
						var parse_tree = jsep(logicJump.expressionString);
						var left, right;

						if(parse_tree.left.name === 'field'){
							left = field.fieldValue;
							right = logicJump.valueB;
						} else {
							left = logicJump.valueB;
							right = field.fieldValue;
						}

						if(field.fieldType === 'number' || field.fieldType === 'scale' || field.fieldType === 'rating'){
							switch(parse_tree.operator) {
								case '==':
									return (parseInt(left) === parseInt(right));
								case '!==':
									return (parseInt(left) !== parseInt(right));
								case '>':
									return (parseInt(left) > parseInt(right));
								case '>=':
									return (parseInt(left) > parseInt(right));
								case '<':
									return (parseInt(left) < parseInt(right));
								case '<=':
									return (parseInt(left) <= parseInt(right));
								default:
									return false;
							}
						} else {
							switch(parse_tree.operator) {
								case '==':
									return (left === right);
								case '!==':
									return (left !== right);
								case 'contains':
									return (left.indexOf(right) > -1);
								case '!contains':
                  /* jshint -W018 */
									return !(left.indexOf(right) > -1);
								case 'begins':
									return left.startsWith(right);
								case '!begins':
									return !left.startsWith(right);
								case 'ends':
									return left.endsWith(right);
								case '!ends':
									return left.endsWith(right);
								default:
									return false;
							}
						}
					}
				};

				var getActiveField = function(){
					if($scope.selected === null){
						console.error('current active field is null');
						throw new Error('current active field is null');
					}

					if($scope.selected._id === 'submit_field') {
						return $scope.myform.form_fields.length - 1;
					}
					return $scope.selected.index;

				};

                $scope.setActiveField = $rootScope.setActiveField = function(field_id, field_index, animateScroll) {
                    if($scope.selected === null || $scope.selected._id === field_id){
						//console.log('not scrolling');
						//console.log($scope.selected);
						return;
		    		}
                    //console.log('field_id: '+field_id);
                    //console.log('field_index: '+field_index);
                    //console.log($scope.selected);

                    $scope.selected._id = field_id;
                    $scope.selected.index = field_index;
					if(!field_index){
						for(var i=0; i<$scope.myform.visible_form_fields.length; i++){
							var currField = $scope.myform.visible_form_fields[i];
							if(field_id === currField._id){
								$scope.selected.index = i;
								break;
							}
						}
					}

					var nb_valid = $filter('formValidity')($scope.myform);
					$scope.translateAdvancementData = {
						done: nb_valid,
						total: form_fields_count,
						answers_not_completed: form_fields_count - nb_valid
					};

                    if(animateScroll){
                        $scope.noscroll=true;
                        setTimeout(function() {
                            $document.scrollToElement(angular.element('.activeField'), -10, 200).then(function() {
								$scope.noscroll = false;
								setTimeout(function() {
									if (document.querySelectorAll('.activeField .focusOn').length) {
										//Handle default case
										document.querySelectorAll('.activeField .focusOn')[0].focus();
									} else if(document.querySelectorAll('.activeField input').length) {
										//Handle case for rating input
										document.querySelectorAll('.activeField input')[0].focus();
									} else {
										//Handle case for dropdown input
										document.querySelectorAll('.activeField .selectize-input')[0].focus();
									}
								});
                            });
                        });
                    }else {
						setTimeout(function() {
							if (document.querySelectorAll('.activeField .focusOn')[0]) {
								//FIXME: DAVID: Figure out how to set focus without scroll movement in HTML Dom
								document.querySelectorAll('.activeField .focusOn')[0].focus();
							} else {
								document.querySelectorAll('.activeField input')[0].focus();
							}
						});
					}

					SendVisitorData.send($scope.myform, getActiveField(), TimeCounter.getTimeElapsed());
                };

                $rootScope.nextField = $scope.nextField = function(){
					var currField = $scope.myform.visible_form_fields[$scope.selected.index];

					if($scope.selected && $scope.selected.index > -1){
						//Jump to logicJump's destination if it is true
						if(currField.logicJump && evaluateLogicJump(currField)){
							$rootScope.setActiveField(currField.logicJump.jumpTo, null, true);
						} else {
							var selected_index, selected_id;
							if($scope.selected.index < $scope.myform.visible_form_fields.length-1){
								selected_index = $scope.selected.index+1;
								selected_id = $scope.myform.visible_form_fields[selected_index]._id;
								$rootScope.setActiveField(selected_id, selected_index, true);
							} else if($scope.selected.index === $scope.myform.visible_form_fields.length-1) {
								selected_index = $scope.selected.index+1;
								selected_id = 'submit_field';
								$rootScope.setActiveField(selected_id, selected_index, true);
							}
						}
					}

                };

                $rootScope.prevField = $scope.prevField = function(){
                    if($scope.selected.index > 0){
                        var selected_index = $scope.selected.index - 1;
                        var selected_id = $scope.myform.visible_form_fields[selected_index]._id;
                        $scope.setActiveField(selected_id, selected_index, true);
                    }
                };

                /*
                ** Form Display Functions
                */
                $scope.exitStartPage = function(){
                    $scope.myform.startPage.showStart = false;
                    if($scope.myform.visible_form_fields.length > 0){
                        $scope.selected._id = $scope.myform.visible_form_fields[0]._id;
                    }
                };

				$rootScope.goToInvalid = $scope.goToInvalid = function() {
					document.querySelectorAll('.ng-invalid.focusOn')[0].focus();
				};

				var getDeviceData = function(){
					var md = new MobileDetect(window.navigator.userAgent);
					var deviceType = 'other';

					if (md.tablet()){
						deviceType = 'tablet';
					} else if (md.mobile()) {
						deviceType = 'mobile';
					} else if (!md.is('bot')) {
						deviceType = 'desktop';
					}

					return {
						type: deviceType,
						name: window.navigator.platform
					};
				};

				var getIpAndGeo = function(){
					//Get Ip Address and GeoLocation Data
					$.ajaxSetup( { 'async': false } );
					var geoData = $.getJSON('https://freegeoip.net/json/').responseJSON;
					$.ajaxSetup( { 'async': true } );

					if(!geoData || !geoData.ip){
						geoData = {
							ip: 'Adblocker'
						};
					}

					return {
						ipAddr: geoData.ip,
						geoLocation: {
							City: geoData.city,
							Country: geoData.country_name
						}
					};
				};

				$rootScope.submitForm = $scope.submitForm = function() {

					var _timeElapsed = TimeCounter.stopClock();
					$scope.loading = true;

					var form = _.cloneDeep($scope.myform);

					var deviceData = getDeviceData();
					form.device = deviceData;

					var geoData = getIpAndGeo();
					form.ipAddr = geoData.ipAddr;
					form.geoLocation = geoData.geoLocation;
					console.log(geoData);

					form.timeElapsed = _timeElapsed;
					form.percentageComplete = $filter('formValidity')($scope.myform) / $scope.myform.visible_form_fields.length * 100;
					delete form.visible_form_fields;

					for(var i=0; i < $scope.myform.form_fields.length; i++){
						if($scope.myform.form_fields[i].fieldType === 'dropdown' && !$scope.myform.form_fields[i].deletePreserved){
							$scope.myform.form_fields[i].fieldValue = $scope.myform.form_fields[i].fieldValue.option_value;
						}
					}

					setTimeout(function () {
						$scope.submitPromise = $http.post('/forms/' + $scope.myform._id, form)
							.success(function (data, status) {
								$scope.myform.submitted = true;
								$scope.loading = false;
								SendVisitorData.send($scope.myform, getActiveField(), _timeElapsed);
							})
							.error(function (error) {
								$scope.loading = false;
								console.error(error);
								$scope.error = error.message;
							});
					}, 500);
                };

                //Reload our form
		$scope.reloadForm();
            }
        };
    }
]);
