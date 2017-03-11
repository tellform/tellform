'use strict';

angular.module('forms').directive('editFormDirective', ['$rootScope', 'FormFields', '$uibModal',
    function ($rootScope, FormFields, $uibModal) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/edit-form.client.view.html',
            restrict: 'E',
			transclude: true,
            scope: {
               myform:'='
            },
            controller: function($scope){

                /*
                **  Initialize scope with variables
                */
				//Setup UI-Sortable
				$scope.sortableOptions = {
					appendTo: '.dropzone',
					helper: 'clone',
					forceHelperSize: true,
					forcePlaceholderSize: true,
					update: function(e, ui) {
						$scope.update(false, $scope.myform, false, false, function(err){
							if(!err) $scope.myform.form_fields.push(newField);
						});
					},
					start: function(e, ui) {
						console.log(ui.item);
						console.log(ui.placeholder);
					}
				};

				/*
				 ** EditModal Functions
				 */
				$scope.openEditModal = function(curr_field){
					$scope.editFieldModal = $uibModal.open({
						animation: true,
						templateUrl: 'editFieldModal.html',
						windowClass: 'edit-field-modal-window',
						controller:  function($uibModalInstance, $scope) {
							$scope.field = curr_field;
							$scope.showLogicJump = false;

							$scope.saveField = function(){

								$scope.myform.form_fields.push(curr_field);
								$scope.$parent.update(false, $scope.$parent.myform, false, true, function(){
									$uibModalInstance.close();
								});
							};
							$scope.cancel = function(){
								$uibModalInstance.close();
							};
						}
					});
				};

				/*
				**  Setup Angular-Input-Star Shape Dropdown
				 */
				//Populate Name to Font-awesomeName Conversion Map
				$scope.select2FA = {
					'Heart': 'Heart',
					'Star': 'Star',
					'thumbs-up': 'Thumbs Up',
					'thumbs-down':'Thumbs Down',
					'Circle': 'Circle',
					'Square':'Square',
					'Check Circle': 'Checkmark',
					'Smile Outlined': 'Smile',
					'Hourglass': 'Hourglass',
					'bell': 'Bell',
					'Paper Plane': 'Paper Plane',
					'Comment': 'Chat Bubble',
					'Trash': 'Trash Can'
				};

                //Populate AddField with all available form field types
                $scope.addField = {};
                $scope.addField.types = FormFields.types;

                $scope.addField.types.forEach(function(type){
                    type.lastAddedID = 1;
                    return type;
                });

                $scope.lastButtonID = 0;

                // Accordion settings
                $scope.accordion = {};
                $scope.accordion.oneAtATime = true;

                //Populate local scope with rootScope methods/variables
                $scope.update = $rootScope.update;

                /*
                ** FormFields (ui-sortable) drag-and-drop configuration
                */
				$scope.dropzone = {
					handle: '.handle',
					containment: '.dropzoneContainer',
					cursor: 'grabbing'
				};

                /*
                **  Field CRUD Methods
                */
                // Add a new field
                $scope.addNewField = function(modifyForm, fieldType){
                    // increment lastAddedID counter
                    $scope.addField.lastAddedID++;
                    var fieldTitle = fieldType;

                    for(var i = 0; i < $scope.addField.types.length; i++){
                        if($scope.addField.types[i].name === fieldType){
                            $scope.addField.types[i].lastAddedID++;
                            fieldTitle = $scope.addField.types[i].value+$scope.addField.types[i].lastAddedID;
                            break;
                        }
                    }
                    var newField = {
                        title: fieldTitle + ' ' + $scope.myform.form_fields.length+1,
                        fieldType: fieldType,
                        fieldValue: '0',
                        required: true,
                        disabled: false,
                        deletePreserved: false,
						logicJump: {}
                    };

					if(fieldType === 'rating'){
						newField.ratingOptions = {
							steps: 1,
							shape: 'Heart'
						}
					}

					if($scope.showAddOptions(newField)){
						newField.fieldOptions = [];
						newField.fieldOptions.push({
							'option_id' : Math.floor(100000*Math.random()), //Generate pseudo-random option id
							'option_title' : 'Option 0',
							'option_value' : 'Option 0'
						});
					}

                    if(modifyForm){
						//Add newField to form_fields array
                        $scope.myform.form_fields.push(newField);
                    }

					$scope.openEditModal(newField);
                };

                // Delete particular field on button click
                $scope.deleteField = function (field_index) {
                    $scope.myform.form_fields.splice(field_index, 1);
                };

                $scope.duplicateField = function (field_index){
                    var currField = _.cloneDeep($scope.myform.form_fields[field_index]);
                    currField._id = 'cloned'+_.uniqueId();
                    currField.title += ' copy';

                    //Insert field at selected index
                    $scope.myform.form_fields.splice(field_index+1, 0, currField);
                };


                /*
                **  startPage Button Methods
                */

                // add new Button to the startPage
                $scope.addButton = function(){

                    var newButton = {};
                    newButton.bgColor = '#ddd';
                    newButton.color = '#ffffff';
                    newButton.text = 'Button';
                    newButton._id = Math.floor(100000*Math.random());

                    $scope.myform.startPage.buttons.push(newButton);
                };

                // delete particular Button from startPage
                $scope.deleteButton = function(button){
                    var currID;
                    for(var i = 0; i < $scope.myform.startPage.buttons.length; i++){

                        currID = $scope.myform.startPage.buttons[i]._id;

                        if(currID === button._id){
                            $scope.myform.startPage.buttons.splice(i, 1);
                            break;
                        }
                    }
                };


                /*
                **  Field Option Methods
                */

                // add new option to the field
                $scope.addOption = function(field_index){
                    var currField = $scope.myform.form_fields[field_index];
					if(currField.fieldType === 'checkbox' || currField.fieldType === 'dropdown' || currField.fieldType === 'radio'){
                        if(!currField.fieldOptions){
							$scope.myform.form_fields[field_index].fieldOptions = [];
						}

						var lastOptionID = $scope.myform.form_fields[field_index].fieldOptions.length+1;

                        // new option's id

                        var newOption = {
                            'option_id' : Math.floor(100000*Math.random()),
                            'option_title' : 'Option '+lastOptionID,
                            'option_value' : 'Option ' +lastOptionID
                        };

                        // put new option into fieldOptions array
                        $scope.myform.form_fields[field_index].fieldOptions.push(newOption);
                    }
                };

                // delete particular option
                $scope.deleteOption = function (field_index, option){
                    var currField = $scope.myform.form_fields[field_index];

                    if(currField.fieldType === 'checkbox' || currField.fieldType === 'dropdown' || currField.fieldType === 'radio'){
                        for(var i = 0; i < currField.fieldOptions.length; i++){
                            if(currField.fieldOptions[i].option_id === option.option_id){

                                $scope.myform.form_fields[field_index].fieldOptions.splice(i, 1);
                                break;

                            }
                        }
                    }
                };

                // decides whether field options block will be shown (true for dropdown and radio fields)
                $scope.showAddOptions = function (field){
                    if(field.fieldType === 'dropdown' || field.fieldType === 'checkbox' || field.fieldType === 'radio'){
                        return true;
                    } else {
                        return false;
                    }
                };

				// decides whether field options block will be shown (true for dropdown and radio fields)
				$scope.showRatingOptions = function (field){
					if(field.fieldType === 'rating'){
						return true;
					} else {
						return false;
					}
				};
			}
        };
    }
]);
