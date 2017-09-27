'use strict';

angular.module('forms').directive('editFormDirective', ['$rootScope', 'FormFields', 'Rating', '$uibModal', '$timeout',
    function ($rootScope, FormFields, Rating, $uibModal, $timeout) {
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
                        $scope.update(false, $scope.myform, false, function(err){
						});
					},
				};

				/*
				 ** EditModal Functions
				 */
				$scope.openEditModal = function(curr_field){
					$scope.editFieldModal = $uibModal.open({
						animation: true,
						templateUrl: 'editFieldModal.html',
						windowClass: 'edit-modal-window',
						controller:  function($uibModalInstance, $scope) {
              var reader = new FileReader();

							$scope.field = curr_field;
							$scope.showLogicJump = false;

              if (curr_field.fieldOptionsFromFile) {
              	curr_field.fileOptions = curr_field.fieldOptions;

              	curr_field.manualOptions = [];
              	curr_field.manualOptions.push('Option 1');
              } else {
              	curr_field.manualOptions = curr_field.fieldOptions;
              }

							// decides whether field options block will be shown
							$scope.showAddOptions = function (field){
								if(field.fieldType === 'dropdown' || field.fieldType === 'checkbox' || field.fieldType === 'radio'){
									return true;
								} else {
									return false;
								}
							};

							// add new option to the field
							$scope.addOption = function(currField){
								if(currField.fieldType === 'checkbox' || currField.fieldType === 'dropdown' || currField.fieldType === 'radio'){
									if (!currField.manualOptions) {
										currField.manualOptions = [];
									}

									var lastOptionID = currField.manualOptions.length + 1;
									currField.manualOptions.push('Option ' + lastOptionID);
								}
							};

							// delete particular option
							$scope.deleteOption = function (currField, option){
								if(currField.fieldType === 'checkbox' || currField.fieldType === 'dropdown' || currField.fieldType === 'radio'){
									for (var i = 0; i < currField.manualOptions.length; i++) {
										if (currField.manualOptions[i] === option) {
											currField.manualOptions.splice(i, 1);
											break;
										}
									}
								}
							};

              $scope.loadOptions = function(currField, files) {
              	if (currField.fieldType === 'dropdown') {
              		var optionsFile = files[0];
              		currField.fieldOptionsFile = optionsFile.name;
              		currField.loadProgress = 0;

              		reader.onload = function(e) {
              			var fileContent = e.target.result;
              			var options = fileContent.split('\n').map(option => option.trim());
              			var uniq_options = [...new Set(options)];

              			currField.fileOptions = [];

              			for (let option of uniq_options) {
              				if (option) {
              					currField.fileOptions.push(option);
              				}
              			}

              			var progress = document.querySelector('.load-file-progress');
              			progress.classList.remove('active');
              		}

              		reader.onprogress = function(e) {
              			$timeout(function() {
              				if (e && e.lengthComputable) {
              					currField.loadProgress = Math.round((e.loaded * 100) / e.total);
              				}
              			}, 10);
              		};

              		reader.readAsText(optionsFile);
              	}
              };

              $scope.rating_shapes = Rating.shapes;

							// decides whether rating block will be shown
							$scope.showRatingOptions = function (field){
								if(field.fieldType === 'rating'){
									return true;
								} else {
									return false;
								}
							};

							$scope.saveField = function() {
								if (curr_field.fieldOptionsFromFile) {
									curr_field.fieldOptions = curr_field.fileOptions;
								} else {
									curr_field.fieldOptionsFile = '';
									curr_field.fieldOptions = curr_field.manualOptions;
								}

								// Have to insert back at same spot if it is an edit
								var indexToInsert = -1;

								// Remove duplicate first
								if (curr_field.globalId != undefined) {
									for (var i = 0; i < $scope.myform.form_fields.length; i++) {
										var field = $scope.myform.form_fields[i];
										if (field.globalId == curr_field.globalId) {
											$scope.myform.form_fields.splice(i, 1);
											indexToInsert = i;
										}
									}
								}
								if (indexToInsert >= 0) {
									$scope.myform.form_fields.splice(indexToInsert, 0, curr_field);
								} else {
									$scope.myform.form_fields.push(curr_field);
								}
								$scope.$parent.update(false, $scope.$parent.myform, true, function(){
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
								newButton.bgColor = '#ccc';
								newButton.color = 'white';
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
								$scope.$parent.update(false, $scope.$parent.myform, true, function(){
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
								$scope.$parent.update(false, $scope.$parent.myform, true, function(){
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
                $scope.addNewField = function(modifyForm, fieldType){
                    // increment lastAddedID counter
                    $scope.addField.lastAddedID++;
                    var fieldTitle = $scope.addField.types.find(f => f.name === fieldType).value;

                    newField = {
                        title: fieldTitle,
                        fieldType: fieldType,
                        fieldValue: '',
                        required: true,
                        disabled: false,
                        deletePreserved: false,
						logicJump: {}
                    };

					if(fieldType === 'rating'){
						newField.ratingOptions = {
							steps: 5,
							shape: 'Heart'
						};
						newField.fieldValue = 0;
					}

					if ($scope.showAddOptions(newField)) {
						newField.fieldOptions = [];
						newField.fieldOptions.push('Option 1');
						newField.fieldOptionsFromFile = false;
						newField.loadProgress = 0;
					}

                    if(modifyForm){
						//Add newField to form_fields array
                        $scope.myform.form_fields.push(newField);
                    }

					$scope.openEditModal(newField);
                };

				// decides whether field options block will be shown
				$scope.showAddOptions = function (field){
					if(field.fieldType === 'dropdown' || field.fieldType === 'checkbox' || field.fieldType === 'radio'){
						return true;
					} else {
						return false;
					}
				};

				// decides whether rating block will be shown
				$scope.showRatingOptions = function (field){
					if(field.fieldType === 'rating'){
						return true;
					} else {
						return false;
					}
				};

                // Delete particular field on button click
                $scope.deleteField = function (field_index) {
                    $scope.myform.form_fields.splice(field_index, 1);
					$scope.update(false, $scope.myform, true, null);
                };

                $scope.duplicateField = function(field_index){
                    var currField = _.cloneDeep($scope.myform.form_fields[field_index]);
                    currField._id = 'cloned'+_.uniqueId();
                    currField.title += ' copy';

                    //Insert field at selected index
                    $scope.myform.form_fields.splice(field_index+1, 0, currField);
					$scope.update(false, $scope.myform, true, null);
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
