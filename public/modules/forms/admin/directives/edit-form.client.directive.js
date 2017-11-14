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
        		var newField;

				//Setup UI-Sortable
				$scope.sortableOptions = {
					appendTo: '.dropzone',
				    //helper: 'clone',
					forceHelperSize: true,
					forcePlaceholderSize: true,
					update: function(e, ui) {
                        $scope.update(false, $scope.myform, true, false, function(err){
						});
					},
				};

				/*
				 ** EditModal Functions
				 */
				$scope.openEditModal = function(curr_field, isEdit, field_index){
					$scope.editFieldModal = $uibModal.open({
						animation: true,
						templateUrl: 'editFieldModal.html',
						windowClass: 'edit-modal-window',
						scope: $scope,
						controller:  function($uibModalInstance, $scope) {
							var fieldOptionsToString = function(){
								if(!$scope.field.fieldOptions){
									return '';
								}

								return $scope.field.fieldOptions.map(function(fieldOption){
								    return fieldOption.option_value;
								}).join('\n');
							}

							$scope.field = curr_field;
							$scope.isEdit = isEdit;
							$scope.options = {
								isEdit: isEdit,
								fieldOptionsString: fieldOptionsToString()
							}

							var stringToFieldOptions = function(fieldOptionsString){
								var values = fieldOptionsString.split('\n');
								var fieldOptions = [];
								for(var i=0; i < values.length; i++){
									fieldOptions.push({
										option_value: values[i]
									});
								}

								return fieldOptions;
							}

							$scope.$watch('options.fieldOptionsString', function(newVal, oldVal){
								if(newVal !== oldVal){
									$scope.field.fieldOptions = stringToFieldOptions(newVal);
								}
							});

							// decides whether field options block will be shown (true for dropdown and radio fields)
							$scope.showListOptions = function () {
								if($scope.field.fieldType === 'dropdown' || $scope.field.fieldType === 'radio'){
									return true;
								}
								return false;
							};

							// decides whether field options block will be shown (true for rating fields)
							$scope.showRatingOptions = function (){
								if($scope.field.fieldType === 'rating'){
									return true;
								}
								return false;
							};

							$scope.validShapes = [
								'Heart',
								'Star',
								'thumbs-up',
								'thumbs-down',
								'Circle',
								'Square',
								'Check Circle',
								'Smile Outlined',
								'Hourglass',
								'bell',
								'Paper Plane',
								'Comment',
								'Trash'
							];

							//Name to Font-Awesome Conversion Map
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

							if($scope.field.fieldType === 'dropdown' || $scope.field.fieldType === 'radio'){
								
							}

							$scope.saveField = function(){
								if($scope.options.isEdit){
									$scope.myform.form_fields[field_index] = $scope.field;
								} else {
									$scope.myform.form_fields.push(curr_field);
								}

								$scope.$parent.update(false, $scope.$parent.myform, true, true, function(){
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
				 ** EditStartPageModal Functions
				 */
				$scope.openEditStartPageModal = function(){
					$scope.editStartPageModal = $uibModal.open({
						animation: true,
						templateUrl: 'editStartPageModal.html',
						windowClass: 'edit-modal-window',
						controller:  function($uibModalInstance, $scope) {

							/*
							 **  startPage Button Methods
							 */

							$scope.showButtons = false;
							$scope.lastButtonID = 0;

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

							$scope.saveStartPage = function(){
								$scope.$parent.update(false, $scope.$parent.myform, true, true, function(){
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
				 ** EditEndPageModal Functions
				 */
				$scope.openEditEndPageModal = function(){
					$scope.editEndPageModal = $uibModal.open({
						animation: true,
						templateUrl: 'editEndPageModal.html',
						windowClass: 'edit-modal-window',
						controller:  function($uibModalInstance, $scope) {

							/*
							 **  startPage Button Methods
							 */

							$scope.showButtons = false;
							$scope.lastButtonID = 0;

							// add new Button to the startPage
							$scope.addButton = function(){

								var newButton = {};
								newButton.bgColor = '#ddd';
								newButton.color = '#ffffff';
								newButton.text = 'Button';
								newButton._id = Math.floor(100000*Math.random());

								$scope.myform.endPage.buttons.push(newButton);
							};

							// delete particular Button from startPage
							$scope.deleteButton = function(button){
								var currID;
								for(var i = 0; i < $scope.myform.endPage.buttons.length; i++){

									currID = $scope.myform.endPage.buttons[i]._id;

									if(currID === button._id){
										$scope.myform.endPage.buttons.splice(i, 1);
										break;
									}
								}
							};

							$scope.saveEndPage = function(){
								$scope.$parent.update(false, $scope.$parent.myform, true, true, function(){
									$uibModalInstance.close();
								});
							};
							$scope.cancel = function(){
								$uibModalInstance.close();
							};
						}
					});
				};


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
                $scope.addNewField = function(fieldType){
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
                    newField = {
                        title: fieldTitle,
                        fieldType: fieldType,
                        fieldValue: '',
                        required: true,
                        disabled: false,
                        deletePreserved: false,
						logicJump: {},
                    };

					if(fieldType === 'rating'){
						newField.ratingOptions = {
							steps: 5,
							shape: 'Heart'
						};
						newField.fieldValue = 0;
					}

					$scope.openEditModal(newField, false, $scope.myform.form_fields.length);
                };

                // Delete particular field on button click
                $scope.deleteField = function (field_index) {
                    $scope.myform.form_fields.splice(field_index, 1);
					$scope.update(false, $scope.myform, false, true, null);
                };

                $scope.duplicateField = function(field_index){
                    var currField = angular.copy($scope.myform.form_fields[field_index]);
                    currField._id = 'cloned'+_.uniqueId();
                    currField.title += ' copy';

                    //Insert field at selected index
                    $scope.myform.form_fields.push(currField);
					$scope.update(false, $scope.myform, false, true, null);
                };

				//Populate AddField with all available form field types
				$scope.addField = {};
				$scope.addField.types = FormFields.types;

				$scope.addField.types.forEach(function(type){
					type.lastAddedID = 1;
					return type;
				});

			}
        };
    }
]);
