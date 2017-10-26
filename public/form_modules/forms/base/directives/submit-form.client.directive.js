'use strict';

//FIXME: Should find an appropriate place for this
//Setting up jsep
jsep.addBinaryOp('contains', 10);
jsep.addBinaryOp('!contains', 10);
jsep.addBinaryOp('begins', 10);
jsep.addBinaryOp('!begins', 10);
jsep.addBinaryOp('ends', 10);
jsep.addBinaryOp('!ends', 10);

angular.module('view-form').directive('submitFormDirective', ['$http', 'TimeCounter', '$filter', '$rootScope', 'SendVisitorData', '$translate', '$timeout',
    function ($http, TimeCounter, $filter, $rootScope, SendVisitorData, $translate, $timeout) {
        return {
            templateUrl: 'form_modules/forms/base/views/directiveViews/form/submit-form.client.view.html',
			restrict: 'E',
            scope: {
                myform:'=',
                ispreview: '=',
                ctrl: '='
            },
            controller: function($document, $window, $scope){
		        var NOSCROLL = false;
		        var FORM_ACTION_ID = 'submit_field';
		        var FIELDS_HIDDEN = false;
                $scope.forms = {};
                
				//Don't start timer if we are looking at a design preview
                if($scope.ispreview){
                    TimeCounter.restartClock();
                }

				var visible_form_fields_count = $scope.ctrl.visible_form_fields.filter(function(field){
		            return field.fieldType !== 'statement';
		        }).length;

				var nb_valid = $filter('formValidity')($scope.myform);
				$scope.translateAdvancementData = {
					done: nb_valid,
					total: visible_form_fields_count,
					answers_not_completed: visible_form_fields_count - nb_valid
				};

                $scope.reloadForm = function(){
                    //Reset Form
                    $scope.myform.submitted = false;
                    $scope.ctrl.visible_form_fields = _.chain($scope.ctrl.visible_form_fields).map(function(field){
                        field.fieldValue = '';
                        return field;
                    }).value();

					$scope.loading = false;
                    $scope.error = '';

                    $scope.selected = {
                        _id: '',
                        index: 0
                    };
                    $scope.setActiveField($scope.ctrl.visible_form_fields[0]._id, 0, false);

                    //Reset Timer
                    TimeCounter.restartClock();
                };

            	angular.element('.submission-form').ready(function(){
             		//Reload our form
					$scope.reloadForm();
                });

                /*
                ** Field Controls
                */
				var evaluateLogicJump = function(field){
					var logicJump = field.logicJump;

					if(logicJump.enabled){
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
					}
				};

				var getActiveField = function(){
					if($scope.selected === null){
						console.error('current active field is null');
						throw new Error('current active field is null');
					}

					if($scope.selected._id === FORM_ACTION_ID) {
						return $scope.ctrl.visible_form_fields.length - 1;
					}
					return $scope.selected.index;
				};

				$scope.isActiveField = function(field){
					if($scope.selected._id === field._id) {
						return true
					}
					return false;
				};

				var hideFieldsFromIndex = function(index){
					for(var i=index; i < $scope.ctrl.visible_form_fields.length; i++){
						$scope.ctrl.visible_form_fields[i].deletePreserved = true;
					}
				}

				var showFieldsFromIndex = function(index){
					for(var i=index; i < $scope.ctrl.visible_form_fields; i++){
						$scope.ctrl.visible_form_fields[i].deletePreserved = false;
					}
				}

                $scope.setActiveField = $rootScope.setActiveField = function(field_id, field_index, animateScroll) {
                    if($scope.selected === null || (!field_id && field_index === null) )  {
                    	return;
                    }

                    if(!field_id){
	    				field_id = $scope.ctrl.visible_form_fields[field_index]._id;
					} else if(field_index === null){
						field_index = 0;
						for(var i=0; i < $scope.ctrl.visible_form_fields.length; i++){
							var curr_field = $scope.ctrl.visible_form_fields[i];
							if(curr_field['_id'] == field_id){
								field_index = i;
								break;
							}
						}
					}

					if($scope.selected._id === field_id){
						return;
		    		}

                    //Required Field Validation Handling
                    var selected_index = $scope.selected.index;
                    var curr_field = $scope.ctrl.visible_form_fields[selected_index];
                    if(curr_field.required === true){
                    	if($scope.forms.myForm && $scope.forms.myForm[curr_field.fieldType + '' + selected_index].$valid === false && !FIELDS_HIDDEN){

                    		var hideIndex = selected_index;
                    		if(selected_index == 0) hideIndex++;
                    		hideFieldsFromIndex(hideIndex);

	        		       	FIELDS_HIDDEN = true;
                    		$scope.selected._id = field_id;
	                    	$scope.selected.index = field_index;

                    		return;
                    	} else if ($scope.forms.myForm && $scope.forms.myForm[curr_field.fieldType + '' + selected_index].$valid === true && FIELDS_HIDDEN) {
	                    	console.log("made it!");
            	 			showFieldsFromIndex(selected_index);
            				FIELDS_HIDDEN = false;
            				return 1;
                    	} else if($scope.FIELDS_HIDDEN){
                    		return;
                    	}
                    }

    				console.log("$scope.ctrl.visible_form_fields[1].deletePreserved: "+$scope.ctrl.visible_form_fields[1].deletePreserved);

                    $scope.selected._id = field_id;
                    $scope.selected.index = field_index;

					var nb_valid = $filter('formValidity')($scope.myform);
					$scope.translateAdvancementData = {
						done: nb_valid,
						total: visible_form_fields_count,
						answers_not_completed: visible_form_fields_count - nb_valid
					};

                    if(animateScroll){
                        NOSCROLL=true;
                        setTimeout(function() {
                            $document.scrollToElement(angular.element('.activeField'), -10, 200).then(function() {
								NOSCROLL = false;
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
                    } else {
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
                    }
                };

                $scope.$watch('selected.index', function(oldValue, newValue){
                	if(oldValue !== newValue && newValue < $scope.ctrl.visible_form_fields.length){
        		        //Only send analytics data if form has not been submitted
						if(!$scope.myform.submitted){
							console.log('SendVisitorData.send()');
							SendVisitorData.send($scope.myform, newValue, TimeCounter.getTimeElapsed());
						}
                	}
                });

                //Fire event when window is scrolled
				$window.onscroll = function(){
                    if(!NOSCROLL || $scope.FIELDS_HIDDEN){

						var scrollTop = $(window).scrollTop();
						var elemBox = document.getElementsByClassName('activeField')[0].getBoundingClientRect();
						var fieldTop = elemBox.top;
						var fieldBottom = elemBox.bottom;

						var field_id, field_index;
						var elemHeight = $('.activeField').height();

						var submitSectionHeight = $('.form-actions').height();
						var maxScrollTop = $(document).height() - $(window).height();
						var fieldWrapperHeight = $('form_fields').height();

						var selector = 'form > .field-directive:nth-of-type(' + String($scope.ctrl.visible_form_fields.length - 1)+ ')'
						var fieldDirectiveHeight = $(selector).height()
						var scrollPosition = maxScrollTop - submitSectionHeight - fieldDirectiveHeight*1.2;

						var fractionToJump = 0.9;

                    	//Focus on field above submit form button
                        if($scope.selected.index === $scope.ctrl.visible_form_fields.length){
                            if(scrollTop < scrollPosition){
                                field_index = $scope.selected.index-1;
                                $scope.setActiveField(null, field_index, false);
                            }
                        }

                        //Focus on submit form button
                        else if($scope.selected.index === $scope.ctrl.visible_form_fields.length-1 && scrollTop > scrollPosition){
                            field_index = $scope.selected.index+1;
                            $scope.setActiveField(FORM_ACTION_ID, field_index, false);
                        }
                        
                        //If we scrolled bellow the current field, move to next field
                        else if(fieldBottom < elemHeight * fractionToJump && $scope.selected.index < $scope.ctrl.visible_form_fields.length-1 ){
                            field_index = $scope.selected.index+1;
                            $scope.setActiveField(null, field_index, false);
                        } 
                        //If we scrolled above the current field, move to prev field
                        else if ( $scope.selected.index !== 0 && fieldTop > elemHeight * fractionToJump) {
                            field_index = $scope.selected.index-1;
                            $scope.setActiveField(null, field_index, false);
                        }
                    }

                    $scope.$apply();
        		};

                $rootScope.nextField = $scope.nextField = function(){
					if($scope.selected && $scope.selected.index > -1){

						if($scope.selected._id !== FORM_ACTION_ID){
							var curr_field = $scope.ctrl.visible_form_fields[$scope.selected.index];
						
							var retVal = null;
							//Jump to logicJump's destination if it is true
							if(curr_field.logicJump && curr_field.logicJump.jumpTo && evaluateLogicJump(curr_field)){
								retVal = $scope.setActiveField(curr_field.logicJump.jumpTo, null, true);
							} else if($scope.selected.index < $scope.ctrl.visible_form_fields.length-1){
								retVal = $scope.setActiveField(null, $scope.selected.index+1, true);
							} else {
								retVal = $scope.setActiveField(FORM_ACTION_ID, null, true);
							}

							if(retVal === 1){
								$scope.$apply();
								return $scope.nextField();
							}
							return;
						}
					}
					return $scope.setActiveField(null, 0, true);
                };

                $rootScope.prevField = $scope.prevField = function(){
                	console.log('prevField');
                	console.log($scope.selected);
                	var selected_index = $scope.selected.index - 1;
                    if($scope.selected.index > 0){
                        $scope.setActiveField(null, selected_index, true);
                    }
                };

                $rootScope.goToInvalid = $scope.goToInvalid = function() {
					var field_id = $('.row.field-directive .ng-invalid.focusOn, .row.field-directive .ng-untouched.focusOn:not(.ng-valid)').first().parents('.row.field-directive').first().attr('data-id');
					$scope.setActiveField(field_id, null, true);
				};

                /*
                ** Form Display Functions
                */
                $scope.exitStartPage = function(){
                    $scope.myform.startPage.showStart = false;
                    if($scope.ctrl.visible_form_fields.length > 0){
                        $scope.selected._id = $scope.ctrl.visible_form_fields[0]._id;
                    }
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

				var getFromVisibleFormFields = function(globalId){
					for(var i=0; i<$scope.ctrl.visible_form_fields.length; i++){
						if( $scope.ctrl.visible_form_fields[i].globalId === globalId ){
							return $scope.ctrl.visible_form_fields[i];
						}
					}
					return null;
				}

				$rootScope.submitForm = $scope.submitForm = function() {
					if($scope.forms.myForm.$invalid){
						$scope.goToInvalid();
						return;
					}

					var _timeElapsed = TimeCounter.stopClock();
					$scope.loading = true;

					var form = _.cloneDeep($scope.myform);

					var deviceData = getDeviceData();
					form.device = deviceData;

					var geoData = getIpAndGeo();
					form.ipAddr = geoData.ipAddr;
					form.geoLocation = geoData.geoLocation;

					form.timeElapsed = _timeElapsed;
					form.percentageComplete = $filter('formValidity')($scope.myform) / $scope.ctrl.visible_form_fields.length * 100;
					delete form.endPage
					delete form.isLive
					delete form.provider
					delete form.startPage
					delete form.visible_form_fields;
					delete form.analytics;
					delete form.design;
					delete form.submissions;
					delete form.submitted;
					for(var i=0; i < $scope.myform.form_fields.length; i++){

						visible_form_field = getFromVisibleFormFields( $scope.myform.form_fields[i].globalId);
						if(visible_form_field){	
							$scope.myform.form_fields[i].fieldValue = visible_form_field;
							if($scope.myform.form_fields[i].fieldType === 'dropdown' && !$scope.myform.form_fields[i].deletePreserved){
								$scope.myform.form_fields[i].fieldValue = $scope.myform.form_fields[i].fieldValue.option_value;
							}
						} else {
							$scope.myform.form_fields[i].fieldValue = '';
						}

						//Get rid of unnessecary attributes for each form field
						delete form.form_fields[i].submissionId;
            			delete form.form_fields[i].disabled;
            			delete form.form_fields[i].ratingOptions;
           				delete form.form_fields[i].fieldOptions;
            			delete form.form_fields[i].logicJump;
            			delete form.form_fields[i].description;
            			delete form.form_fields[i].validFieldTypes;
            			delete form.form_fields[i].fieldType;	
					}

					setTimeout(function () {
						$scope.submitPromise = $http.post('/forms/' + $scope.myform._id, form)
							.success(function (data, status) {
								$scope.myform.submitted = true;
								$scope.loading = false;
								SendVisitorData.send(form, getActiveField(), _timeElapsed);
							})
							.error(function (error) {
								$scope.loading = false;
								console.error(error);
								$scope.error = error.message;
							});
					}, 500);
                };
            }
        };
    }
]);
