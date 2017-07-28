'use strict';


angular.module('forms').directive('submitFormDirective', ['$http', 'TimeCounter', '$filter', '$rootScope', 'Auth', 'SendVisitorData',
    function ($http, TimeCounter, $filter, $rootScope, Auth, SendVisitorData) {
        return {
            templateUrl: 'modules/forms/base/views/directiveViews/form/submit-form.client.view.html',
			restrict: 'E',
            scope: {
                myform:'='
            },
            controller: function($document, $window, $scope){
                $scope.authentication = $rootScope.authentication;
		        $scope.noscroll = false;
                $scope.forms = {};

				var form_fields_count = $scope.myform.visible_form_fields.filter(function(field){
                    if(field.fieldType === 'statement' || field.fieldType === 'rating'){
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

                    //console.log($scope.selected);
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
				var getActiveField = function(){
					if($scope.selected === null){
						console.error('current active field is null');
						throw new Error('current active field is null');
					}

					if($scope.selected._id === 'submit_field') {
						return $scope.myform.form_fields.length - 1;
					} else {
						return $scope.selected.index;
					}
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
                    } else {
						setTimeout(function() {
							if (document.querySelectorAll('.activeField .focusOn')[0] !== undefined) {
								//FIXME: DAVID: Figure out how to set focus without scroll movement in HTML Dom
								document.querySelectorAll('.activeField .focusOn')[0].focus();
							} else if(document.querySelectorAll('.activeField input')[0] !== undefined) {
								document.querySelectorAll('.activeField input')[0].focus();
							}
						});
					}


                };

                $rootScope.nextField = $scope.nextField = function(){
                    //console.log('nextfield');
                    //console.log($scope.selected.index);
					//console.log($scope.myform.visible_form_fields.length-1);
					var selected_index, selected_id;
					if($scope.selected.index < $scope.myform.visible_form_fields.length-1){
                        selected_index = $scope.selected.index+1;
                        selected_id = $scope.myform.visible_form_fields[selected_index]._id;
                        $rootScope.setActiveField(selected_id, selected_index, true);
                    } else if($scope.selected.index === $scope.myform.visible_form_fields.length-1) {
						//console.log('Second last element');
						selected_index = $scope.selected.index+1;
						selected_id = 'submit_field';
						$rootScope.setActiveField(selected_id, selected_index, true);
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

				$rootScope.submitForm = $scope.submitForm = function(cb) {

					var _timeElapsed = TimeCounter.stopClock();
					$scope.loading = true;

					var form = _.cloneDeep($scope.myform);

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
							.success(function (data, status, headers) {
								$scope.myform.submitted = true;
								$scope.loading = false;
								SendVisitorData.send($scope.myform, getActiveField(), _timeElapsed);
								if(cb){
									cb();
								}
							})
							.error(function (error) {
								$scope.loading = false;
								console.error(error);
								$scope.error = error.message;
								if(cb){
									cb(error);
								}
							});
					}, 500);
                };

                //Reload our form
				$scope.reloadForm();
            }
        };
    }
]);
