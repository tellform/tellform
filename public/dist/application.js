'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'NodeForm';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'ngRaven', 'cgBusy'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Permission Constants
angular.module(ApplicationConfiguration.applicationModuleName).constant('APP_PERMISSIONS', {
  viewAdminSettings: 'viewAdminSettings',
  editAdminSettings: 'editAdminSettings',
  editForm: 'editForm',
  viewPrivateForm: 'viewPrivateForm',
});
//User Role constants
angular.module(ApplicationConfiguration.applicationModuleName).constant('USER_ROLES', {
  admin: 'admin',
  normal: 'user',
  superuser: 'superuser',
});

angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', 'Auth', '$state', '$stateParams',
    function($rootScope, Auth, $state, $stateParams) {

	    $rootScope.$state = $state;
	    $rootScope.$stateParams = $stateParams;

	    // add previous state property
	    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
	        $state.previous = fromState;

	        //Redirect to listForms if user is authenticated
        	if(toState.name === 'home' || toState.name === 'signin' || toState.name === 'resendVerifyEmail' || toState.name === 'verify' || toState.name === 'signup' || toState.name === 'signup-success'){
        		if(Auth.isAuthenticated()){
        			event.preventDefault(); // stop current execution
        			$state.go('listForms'); // go to listForms page
        		}
        	}
	        //Redirect to 'home' route if user is not authenticated
        	else if(toState.name !== 'access_denied' && !Auth.isAuthenticated() ){
        		event.preventDefault(); // stop current execution
        		$state.go('home'); // go to listForms page
        	}
	        
	    });

    }
]);

//Page access/authorization logic
angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', 'Auth', 'User', 'Authorizer', '$state', '$stateParams',
  function($rootScope, Auth, User, Authorizer, $state, $stateParams) {
		$rootScope.$on('$stateChangeStart', function(event, next) {
			var authenticator, permissions, user;
			permissions = next && next.data && next.data.permissions ? next.data.permissions : null;

			Auth.ensureHasCurrentUser(User);
			user = Auth.currentUser;

		    if(user){
			  	authenticator = new Authorizer(user);
			  	console.log('access denied: '+!authenticator.canAccess(permissions));

			  	if( (permissions !== null) && !authenticator.canAccess(permissions) ){
			    	event.preventDefault();
		    		console.log('access denied');
		      		$state.go('access_denied');
				}
			}
		});
}]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core', ['users']);

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('forms', ['ngFileUpload', 'colorpicker.module', 'ui.date', 'ui.sortable', 'angular-input-stars', 'users']);
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider, Authorization) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});

		// $urlRouterProvider.otherwise( function($injector) {
		//   var $state = $injector.get('$state');
		//   $state.go('home');
		// });

	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$rootScope', '$scope', 'Menus', '$state', 'Auth', 'User',
	function ($rootScope, $scope, Menus, $state, Auth, User) {
		$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);
	    $scope.authentication = $rootScope.authentication = Auth;

		$rootScope.languages = $scope.languages = ['english', 'french', 'spanish'];

		$scope.isCollapsed = false;
		$rootScope.hideNav = false;
		$scope.menu = Menus.getMenu('topbar');

	    $scope.signout = function() {
		    var promise = User.logout();
			promise.then(function() {
				Auth.logout();
				Auth.ensureHasCurrentUser(User);
				$scope.user = $rootScope.user = null;
				$state.go('home');
			}, 
			function(reason) {
			  	console.log('Logout Failed: ' + reason);
			});
	    };

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$scope.isCollapsed = false;
			$rootScope.hideNav = false;
			if ( angular.isDefined( toState.data ) ) {

				if ( angular.isDefined( toState.data.hideNav ) ) {
		        	$rootScope.hideNav = toState.data.hideNav;
		        }
		    }
		});

	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$rootScope', '$scope', 'User', 'Auth', '$state',
	function($rootScope, $scope, User, Auth, $state) {
		$scope = $rootScope;
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							console.log(this.roles[roleIndex]);
							console.log( this.roles[roleIndex] === user.roles[userRoleIndex]);
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar', false, ['*']);

		//Adding the bottombar menu for the Form-Footer view
		this.addMenu('bottombar', false, ['*']);
	}
]);
'use strict';

// Configuring the Forms drop-down menus
angular.module('forms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'My Forms', 'forms', '', '/forms', false);
	}
]).filter('formValidity',
    function(){
        return function(formObj){
        	if(formObj && formObj.form_fields && formObj.visible_form_fields){
        		
				//get keys
				var formKeys = Object.keys(formObj);

				//we only care about things that don't start with $
				var fieldKeys = formKeys.filter(function(key){
					return key[0] !== '$';
				});

				var fields = formObj.form_fields;
				// fieldKeys.map(function(key){
				//   return formObj[key];
				// });

				var valid_count = fields.filter(function(field){
					if(typeof field === 'object'){
					    return !!(field.fieldValue);
					}
				}).length;
				return valid_count - (formObj.form_fields.length - formObj.visible_form_fields.length);
			}
			return 0;
        };
}).config(['$provide', function ($provide){
    $provide.decorator('accordionDirective', ["$delegate", function($delegate) { 
        var directive = $delegate[0];
        directive.replace = true;
        return $delegate;
    }]);
}]);
'use strict';

// Setting up route
angular.module('forms').config(['$stateProvider',
	
	function($stateProvider) {
		// Forms state routing
		$stateProvider.
		state('listForms', {
			url: '/forms',
			templateUrl: 'modules/forms/views/list-forms.client.view.html',
			data: {
				permissions: [ 'editForm' ]
			}
  		}).
  		state('submitForm', {
			url: '/forms/:formId',
			templateUrl: 'modules/forms/views/submit-form.client.view.html',
			data: {
				hideNav: true,
			},
			resolve: {
				Forms: 'Forms',
		        myForm: ["Forms", "$stateParams", function (Forms, $stateParams) {
		            return Forms.get({formId: $stateParams.formId}).$promise;
		        }],
			},
			controller: 'SubmitFormController'
		}).
		state('viewForm', {
			url: '/forms/:formId/admin',
			templateUrl: 'modules/forms/views/admin-form.client.view.html',
			data: {
				permissions: [ 'editForm' ]
			},
			resolve: {
				Forms: 'Forms',
		        myForm: ["Forms", "$stateParams", function (Forms, $stateParams) {
		            return Forms.get({formId: $stateParams.formId}).$promise;
		        }],
			},
			controller: 'AdminFormController'
		});	

	}
]);
'use strict';

// Forms controller
angular.module('forms').controller('AdminFormController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$modal', 'myForm',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http, $modal, myForm) {

        $scope = $rootScope;

        $scope.myform = myForm;
        $rootScope.saveInProgress = false;
        CurrentForm.setForm($scope.myform);

        // console.log($scope.myform);

        // Find a specific Form
        $scope.findOne = function(){
            Forms.get({
                formId: $stateParams.formId
            }, function(form){
                CurrentForm.setForm(form);
                $scope.myform = form;
                $scope.myform._id = $stateParams.formId;
            }, function(err){
                console.error('Could not fetch form');
                console.error(err);
            });
        };

        $scope.setForm = function(form){
            $scope.myform = form;
        };
        $rootScope.resetForm = function(){
            $scope.myform = Forms.get({
                formId: $stateParams.formId
            });
        };

        /* 
        ** DeleteModal Functions 
        */
        $scope.openDeleteModal = function(){
            $scope.deleteModal = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'myModalContent.html',
              controller: 'AdminFormController',
            });
        };
        $scope.cancelDeleteModal = function(){
            if($scope.deleteModal){
                $scope.deleteModal.dismiss('cancel');
            }
        };

        // Remove existing Form
        $scope.removeCurrentForm = function() {
            if($scope.deleteModal && $scope.deleteModal.opened){

                $scope.deleteModal.close();
            
                var form_id = $scope.myform._id;
                if(!form_id) throw new Error('Error - removeCurrentForm(): $scope.myform._id does not exist');
        
                $http.delete('/forms/'+form_id)
                    .success(function(data, status, headers){
                        console.log('form deleted successfully');

                        $state.go('listForms', {}, {reload: true}); 

                    }).error(function(error){
                        console.log('ERROR: Form could not be deleted.');
                        console.error(error);
                    });
            }
        };

        // Update existing Form
        $scope.update = $rootScope.update = function(updateImmediately, cb){

            var continueUpdate = true;
            if(!updateImmediately){
                continueUpdate = !$rootScope.saveInProgress;
            }
            
            //Update form if we **are not currently updating** or if **shouldUpdateNow flag is set**
            if(continueUpdate){
                // console.log('begin updating form');
                var err = null;

                if(!updateImmediately){ $rootScope.saveInProgress = true; }

                $scope.updatePromise = $http.put('/forms/'+$scope.myform._id, {form: $scope.myform})
                    .then(function(response){
                        $rootScope.myform = $scope.myform = response.data;
                        // console.log(response.data);
                    }).catch(function(response){
                        console.log('Error occured during form UPDATE.\n');
                        // console.log(response.data);
                        err = response.data;
                    }).finally(function() { 
                        // console.log('finished updating');
                        if(!updateImmediately){$rootScope.saveInProgress = false; }

                        if( (typeof cb) === 'function'){
                            cb(err); 
                        }
                    });
            }
        };


	}
]);
'use strict';

// Forms controller
angular.module('forms').controller('ListFormsController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http) {
        
        $scope = $rootScope;
        $scope.forms = {};
        $scope.showCreateModal = false;

        // Return all user's Forms
        $scope.findAll = function() {
            Forms.query(function(_forms){
                $scope.myforms = _forms;
            });
        };

        //Modal functions
        $scope.openCreateModal = function(){
            if(!$scope.showCreateModal){
                $scope.showCreateModal = true;
            }
        };
        $scope.closeCreateModal = function(){
            if($scope.showCreateModal){
                $scope.showCreateModal = false;
            }
        };

        $scope.setForm = function (form) {
            $scope.myform = form;
        };
        $scope.goToWithId = function(route, id) {
            $state.go(route, {'formId': id}, {reload: true});
        };

        $scope.duplicate = function(form_index){
            var form = _.clone($scope.myforms[form_index]);
            form._id = '';
            
            $http.post('/forms', {form: form})
                .success(function(data, status, headers){
                    console.log('form duplicated');
                    $scope.myforms.splice(form_index+1, 0, data);
                    console.log($scope.myforms[3]._id);
                }).error(function(errorResponse){
                    console.log(errorResponse);
                    if(errorResponse == null) $scope.error = errorResponse.data.message;
                });
        }

        // Create new Form
        $scope.createNew = function(){
            console.log($scope.forms.createForm);

            var form = {};
            form.title = $scope.forms.createForm.title.$modelValue;
            form.language = $scope.forms.createForm.language.$modelValue;

            if($scope.forms.createForm.$valid && $scope.forms.createForm.$dirty){
                $http.post('/forms', {form: form})
                .success(function(data, status, headers){
                    console.log('new form created');

                    // Redirect after save 
                    $scope.goToWithId('viewForm', data._id+'');
                }).error(function(errorResponse){
                    console.error(errorResponse);
                    $scope.error = errorResponse.data.message;
                });
            }
        };

        $scope.removeForm = function(form_index) {
            if(form_index >= $scope.myforms.length || form_index < 0){
                throw new Error('Error: form_index in removeForm() must be between 0 and '+$scope.myforms.length-1);
            }

            $http.delete('/forms/'+$scope.myforms[form_index]._id)
                .success(function(data, status, headers){
                    console.log('form deleted successfully');
                    
                    $scope.myforms.splice(form_index, 1);

                }).error(function(error){
                    console.log('ERROR: Form could not be deleted.');
                    console.error(error);
                });
        };
    }
]);
'use strict';

// Forms controller
angular.module('forms').controller('SubmitFormController', ['$scope', '$rootScope', '$stateParams', '$state', 'Forms', 'CurrentForm', 'Auth', 'myForm',
	function($scope, $rootScope, $stateParams, $state, Forms, CurrentForm, Auth, myForm) {
		$scope.authentication = Auth;
		$scope.myform = myForm;

		if(!$scope.myform.isLive){
			// Show navbar if form is not public AND user IS loggedin
			if($scope.authentication.isAuthenticated()){
				$scope.hideNav = $rootScope.hideNav = false;
			}
			// Redirect if  form is not public user IS NOT loggedin
			else {
				$scope.hideNav = $rootScope.hideNav = true;
				$state.go('access_denied');
			}
		}else{
			$scope.hideNav = $rootScope.hideNav = true;
		}

	}
]);
'use strict';

_.mixin({ removeDateFields : function(o){
  var clone = _.clone(o);
  for(var i=0; i<clone.length; i++){
    _.each(clone[i], function(v,k){
      // console.log('key: '+k);
      if(k === 'lastModified' || k === 'created'){
        delete clone[i][k];
      }
    });
  }
  return clone;
}});

angular.module('forms').directive('autoSaveForm', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  
  return {
    require: ['^form'],
    restrict: 'AE',
    link: function($scope, $element, $attrs, $ctrls) {

      //DAVID: TODO: Do we really need to check if our directive element is ready everytime
      angular.element(document).ready(function() {
      
        var $formCtrl = $ctrls[0],
            savePromise = null;

        $rootScope.finishedRender = false;
        $scope.$on('editFormFields Started', function(ngRepeatFinishedEvent) {
            $rootScope.finishedRender = false;
          });
        $scope.$on('editFormFields Finished', function(ngRepeatFinishedEvent) {
          $rootScope.finishedRender = true;
        });

        $scope.anyDirtyAndTouched = function(form){
          var propCount = 0;
          for(var prop in form) {
            if(form.hasOwnProperty(prop) && prop[0] !== '$') {
              propCount++;
              if(form[prop].$touched && form[prop].$dirty) {
                return true;
              }
            }
          }
          return false;
        };

        var debounceSave = function () {
          $rootScope.saveInProgress = true;
          $rootScope[$attrs.autoSaveCallback](true,
            function(err){
              if(!err){
                console.log('\n\nForm data persisted -- setting pristine flag');
                $formCtrl.$setPristine(); 
              }else{
                console.error('Error form data NOT persisted');
                console.error(err);
              }
            }); 
        };

        //Update/Save Form if any Form fields are Dirty and Touched
        $scope.$watch(function(newValue, oldValue) {
          // console.log($scope);
          console.log($scope.editForm);
          if($rootScope.finishedRender && $scope.anyDirtyAndTouched($scope.editForm) && !$rootScope.saveInProgress){
            console.log('Form saving started');
            debounceSave();
          }
        });

        //Autosave Form when model (specificed in $attrs.autoSaveWatch) changes
        $scope.$watch($attrs.autoSaveWatch, function(newValue, oldValue) {

          newValue = angular.copy(newValue);
          oldValue = angular.copy(oldValue);

          newValue.form_fields = _.removeDateFields(newValue.form_fields);
          oldValue.form_fields = _.removeDateFields(oldValue.form_fields);

          var changedFields = !_.isEqual(oldValue.form_fields,newValue.form_fields) || !_.isEqual(oldValue.startPage, newValue.startPage);

          var changedFieldMap = !!oldValue.plugins.oscarhost.settings.fieldMap && !_.isEqual(oldValue.plugins.oscarhost.settings.fieldMap,newValue.plugins.oscarhost.settings.fieldMap);
          if( (!newValue && !oldValue) || !oldValue ){
            return;
          }
          
          // console.log('Autosaving');
          // console.log('\n\n----------');
          // console.log('!$dirty: '+ !$formCtrl.$dirty );
          // console.log('changedFields: '+changedFields);
          // console.log('changedFieldMap: '+changedFieldMap);
          // console.log('finishedRender: '+$rootScope.finishedRender);
          // console.log('!saveInProgress: '+!$rootScope.saveInProgress);
          // console.log('newValue: '+newValue);
          // console.log('oldValue: '+oldValue);
          // console.log(oldValue.form_fields);
          // console.log(newValue.form_fields);
          if(oldValue.form_fields.length === 0) $rootScope.finishedRender = true

          //Save form ONLY IF rendering is finished, form_fields have been changed AND currently not save in progress
          if( $rootScope.finishedRender && ((changedFields && !$formCtrl.$dirty) || changedFieldMap)  && !$rootScope.saveInProgress) {

            // console.log('saving form now');
            if(savePromise) {
              $timeout.cancel(savePromise);
              savePromise = null;
            }

            savePromise = $timeout(function() {   
              // console.log('Saving Form');
              debounceSave();           
            }); 
          }
          //If we are finished rendering then form saving should be finished
          else if($rootScope.finishedRender && $rootScope.saveInProgress){
            $rootScope.saveInProgress = false;
          }

        }, true);



      });

    }
  };
  
}]);

'use strict';

angular.module('forms').directive('configureFormDirective', ['$rootScope', '$http', 'Upload', '$timeout', 'TimeCounter', 'Auth', 'FormFields', 'CurrentForm',
    function ($rootScope, $http, Upload, $timeout, TimeCounter, Auth, FormFields, CurrentForm) {
        return {
            templateUrl: 'modules/forms/views/directiveViews/form/configure-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'=',
                user:'=',
                pdfFields:'@',
                formFields:'@'
            },
            controller: ["$scope", function($scope){
                console.log($scope.myform);
                if( CurrentForm.getForm().plugins){
                    if(CurrentForm.getForm().plugins.oscarhost.baseUrl) $scope.oscarhostAPI = true;
                }else{
                    $scope.oscarhostAPI = false;
                }
                $scope.log = '';
                $scope.pdfLoading = false;
                $scope.languages = $rootScope.languages;
                
                this._current_upload = null;
                $scope.resetForm = $rootScope.resetForm;
                $scope.update = $rootScope.update;

                this._unbindedPdfFields = $scope.pdfFields;

                //DAVID: TODO: finish this so we can create a Form.pdfFieldMap
                // $scope.getUnbindedPdfFields = function(fieldType){
                //     this._unbindedPdfFields = $scope.pdfFields
                // }

                //PDF Functions
                $scope.cancelUpload = function(){
                    this._current_upload.abort();
                    $scope.pdfLoading = false;
                    $scope.removePDF();
                };

                $scope.removePDF = function(){
                    $scope.myform.pdf = null;
                    $scope.myform.isGenerated = false;
                    $scope.myform.autofillPDFs = false;

                    console.log('form.pdf: '+$scope.myform.pdf+' REMOVED');
                };

                $scope.uploadPDF = function(files) {
                    console.log(files)

                    if (files && files.length) {
                        // for (var i = 0; i < files.length; i++) {
                        var file = files[0];
                        console.log(file);

                        this._current_upload = Upload.upload({
                            url: '/upload/pdf',
                            fields: {
                                'user': $scope.user,
                                'form': $scope.myform
                            },
                            file: file
                        }).progress(function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            $scope.log = 'progress: ' + progressPercentage + '% ' +
                                        evt.config.file.name + '\n' + $scope.log;
                                        
                            $scope.pdfLoading = true;
                        }).success(function (data, status, headers, config) {
                            $scope.log = 'file ' + data.originalname + ' uploaded as '+ data.name +'. JSON: ' + JSON.stringify(data) + '\n' + $scope.log;
                            $scope.myform.pdf = angular.fromJson(angular.toJson(data));

                            console.log($scope.myform.pdf);

                            $scope.pdfLoading = false;

                            console.log($scope.log);
                            if(!$scope.$$phase && !$scope.$digest){
                                $scope.$apply();
                            }
                        }).error(function(err){
                            $scope.pdfLoading = false;
                            console.log('Error occured during upload.\n');
                            console.log(err);
                        });
                    }
                };

            }]
        };
    }
]);
'use strict';

angular.module('forms').directive('editFormDirective', ['$rootScope', '$q', '$http', '$timeout', 'TimeCounter', 'Auth', 'FormFields',
    function ($rootScope, $q, $http, $timeout, TimeCounter, Auth, FormFields) {
        return {
            templateUrl: 'modules/forms/views/directiveViews/form/edit-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'=',
            },
            controller: ["$scope", function($scope){
                var field_ids = _($scope.myform.form_fields).pluck('_id');
                for(var i=0; i<field_ids.length; i++){
                    $scope.myform.plugins.oscarhost.settings.fieldMap[field_ids[i]] = null;
                }
                /*
                **  Initialize scope with variables
                */
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

                //Many-to-many Select for Mapping OscarhostFields -> FormFields
                $scope.oscarFieldsLeft = function(field_id){

                    if($scope.myform && $scope.myform.plugins.oscarhost.settings.validFields.length > 0){
                        if(!$scope.myform.plugins.oscarhost.settings.fieldMap) $scope.myform.plugins.oscarhost.settings.fieldMap = {};

                        var oscarhostFields = $scope.myform.plugins.oscarhost.settings.validFields;
                        var currentFields = _($scope.myform.plugins.oscarhost.settings.fieldMap).invert().keys().value();

                        if( $scope.myform.plugins.oscarhost.settings.fieldMap.hasOwnProperty(field_id) ){
                            currentFields = _(currentFields).difference($scope.myform.plugins.oscarhost.settings.fieldMap[field_id]);
                        } 

                        // console.log($scope.myform.plugins.oscarhost.settings.fieldMap);
                        //Get all oscarhostFields that haven't been mapped to a formfield
                        return _(oscarhostFields).difference(currentFields).value();
                    }
                    return [];
                };

                /*
                ** FormFields (ui-sortable) drag-and-drop configuration
                */
                $scope.dropzone = {
                    handle: ' .handle'  
                };

                // $scope.draggable = {
                //     connectWith: ".dropzone",
                //     start: function (e, ui) {
                //         // $scope.$apply(function() {
                //         //   $scope.dragging = true
                //         // });
                //         $('.dropzone').sortable('refresh');
                //     },
                //     update: function (e, ui) {
                //         var isInDropzone = $(e.target).parentsUntil('.panel-group').hasClass('dropzone');

                //         console.log('isInDropzone: '+isInDropzone);
                //         //Disable drag and drop if we aren't in dropzone
                //         if(!isInDropzone){
                //             ui.item.sortable.cancel();
                //         }
                //     },
                //     stop: function (e, ui) {
                //         var isInDropzone = $(e.target).parentsUntil('.panel-group').hasClass('dropzone');

                //         //Disable drag and drop if we aren't in dropzone
                //         if(isInDropzone){
                //             console.log($(e.target));
                //         }
                        
                //         // if (ui.item.sortable.droptarget === undefined) {
                //         //     $scope.$apply($scope.dragging = false);
                //         //     return;
                //         // }else if (ui.item.sortable.droptarget[0].classList[0] === "dropzone") {
                //         //     // run code when item is dropped in the dropzone
                //         //     $scope.$apply($scope.dragging = false);
                //         // }else{
                //         //   // $scope.$apply($scope.dragging = false);
                //         // }
                //         // console.log('has class .dropzone :'+);
                //         // if ($(e.target).hasClass('dropzone') && ui.item.sortable.droptarget && e.target != ui.item.sortable.droptarget[0] ) {
                //         //     // restore original types
                //         //     $scope.addField.types = FormFields.types;
                //         // }
                      
                        
                //     }
                // };


                /*
                **  Field CRUD Methods
                */
                // Add a new field
                $scope.addNewField = function(modifyForm, fieldType){

                    // incr field_id counter
                    $scope.addField.lastAddedID++;
                    var fieldTitle;

                    for(var i = 0; i < $scope.addField.types.length; i++){
                        if($scope.addField.types[i].name === fieldType){ 
                            $scope.addField.types[i].lastAddedID++;
                            fieldTitle = $scope.addField.types[i].value+$scope.addField.types[i].lastAddedID;  
                            break;
                        }
                    }
                    var newField = {
                        title: fieldTitle,
                        fieldType: fieldType,
                        fieldValue: '',
                        required: true,
                        disabled: false,
                        deletePreserved: false
                    };
                    // console.log('\n\n---------\nAdded field CLIENT');
                    // console.log(newField);
                    // newField._id = _.uniqueId();
                    
                    // put newField into fields array
                    if(modifyForm){
                        $scope.myform.form_fields.push(newField);
                    }
                    return newField;    
                };

                // Delete particular field on button click
                $scope.deleteField = function (field_index){
                    console.log(field_index);
                    //Delete field from field map
                    var currFieldId = $scope.myform.form_fields[field_index]._id
                    if($scope.myform.plugins.oscarhost.baseUrl) delete $scope.myform.plugins.oscarhost.settings.fieldMap[currFieldId];

                    //Delete field
                    $scope.myform.form_fields.splice(field_index, 1);
                };
                $scope.duplicateField = function (field_index){
                    var currField = $scope.myform.form_fields[field_index];  

                    //Insert field at selected index
                    $scope.myform.form_fields.splice(field_index+1, 0, currField);
                };


                /*
                **  startPage Button Methods
                */

                // add new Button to the startPage/EndPage
                $scope.addButton = function(){

                    var newButton = {};
                    newButton.bgColor = '#ddd';
                    newButton.color = '#ffffff';
                    newButton.text = 'Button';
                    newButton._id = _.uniqueId();

                    $scope.myform.startPage.buttons.push(newButton);
                };

                // delete particular Button
                $scope.deleteButton = function(button){
                    // var hashKey = _.chain(button.$$hashKey).words().last().parseInt().value();
                    var currID;
                    for(var i = 0; i < $scope.myform.startPage.buttons.length; i++){
                        // var currHashKey = _.chain($scope.myform.startPage.buttons[i].$$hashKey).words().last().parseInt().value();
                        currID = $scope.myform.startPage.buttons[i]._id;
                        console.log(currID);

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
                $scope.addOption = function (field){
                    if(!field.fieldOptions) field.fieldOptions = [];

                    var lastOptionID = 0;

                    if(field.fieldOptions[field.fieldOptions.length-1]){
                        lastOptionID = field.fieldOptions[field.fieldOptions.length-1].option_id;
                    }

                    // new option's id
                    var option_id = lastOptionID + 1;

                    var newOption = {
                        'option_id' : option_id,
                        'option_value' : 'Option ' + option_id,
                    };

                    // put new option into fieldOptions array
                    field.fieldOptions.push(newOption);
                };

                // delete particular option
                $scope.deleteOption = function (field, option){
                    for(var i = 0; i < field.fieldOptions.length; i++){
                        if(field.fieldOptions[i].option_id === option.option_id){
                            field.fieldOptions.splice(i, 1);
                            break;
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

            }],
  
        };
    }
]);
'use strict';

angular.module('forms').directive('editSubmissionsFormDirective', ['$rootScope', '$http', 'Upload', '$timeout', 'TimeCounter', 'Auth', 'FormFields',
    function ($rootScope, $http, Upload, $timeout, TimeCounter, Auth, FormFields) {
        return {
            templateUrl: 'modules/forms/views/directiveViews/form/edit-submissions-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'=',
                user:'='
            },
            controller: ["$scope", function($scope){
                $scope.table = {
                    masterChecker: false,
                    rows: []
                };

                /*
                ** Table Functions
                */
                $scope.isAtLeastOneChecked = function(){
                    for(var i=0; i<$scope.table.rows.length; i++){
                        if($scope.table.rows[i].selected) return true;
                    }
                    return false;
                };
                $scope.toggleAllCheckers = function(){
                    for(var i=0; i<$scope.table.rows.length; i++){
                        $scope.table.rows[i].selected = $scope.table.masterChecker;
                    }
                };
                $scope.toggleObjSelection = function($event, description) {
                    $event.stopPropagation();
                };
                $scope.rowClicked = function(row_index) {
                   $scope.table.rows[row_index].selected = !$scope.table.rows[row_index].selected;
                };

                /*
                * Form Submission Methods
                */

                //Fetch and display submissions of Form
                $scope.initFormSubmissions = function(){
                    $http.get('/forms/'+$scope.myform._id+'/submissions')
                        .success(function(data, status, headers){

                            var _tmpSubFormFields,
                                defaultFormFields = _.cloneDeep($scope.myform.form_fields);


                            //Iterate through form's submissions
                            for(var i=0; i<data.length; i++){
                                _tmpSubFormFields = _.merge(defaultFormFields, data[i].form_fields);
                                data[i].form_fields = _tmpSubFormFields;
                                data[i].selected = false;
                            }

                            $scope.table.rows = data;

                            // console.log('form submissions successfully fetched');
                            // console.log( JSON.parse(JSON.stringify($scope.submissions)) ) ;
                            // console.log( JSON.parse(JSON.stringify($scope.myform.form_fields)) );
                        })
                        .error(function(err){
                            console.error('Could not fetch form submissions.\nError: '+err);
                        });            
    
                };  

                //Delete selected submissions of Form
                $scope.deleteSelectedSubmissions = function(){

                    var delete_ids = _.chain($scope.table.rows).filter(function(row){
                        return !!row.selected;
                    }).pluck('_id').value();

                    $http({ url: '/forms/'+$scope.myform._id+'/submissions', 
                            method: 'DELETE',
                            data: {deleted_submissions: delete_ids},
                            headers: {'Content-Type': 'application/json;charset=utf-8'}
                        }).success(function(data, status, headers){
                            //Remove deleted ids from table
                            var tmpArray = [];
                            for(var i=0; i<$scope.table.rows.length; i++){
                                if(!$scope.table.rows[i].selected){
                                    tmpArray.push($scope.table.rows[i]);
                                }
                            }
                            $scope.table.rows = tmpArray;
                        })
                        .error(function(err){
                            console.log('Could not delete form submissions.\nError: ');
                            console.log(err);
                            console.error = err;
                        });      
                };

                //Export selected submissions of Form
                $scope.exportSubmissions = function(type){
                    var fileMIMETypeMap = {
                        'xls': 'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'json': 'json',
                        'csv': 'csv',
                    };

                    var blob = new Blob([document.getElementById('table-submission-data').innerHTM], {
                            type: 'application/'+fileMIMETypeMap[type]+';charset=utf-8'
                    });
                    saveAs(blob, $scope.myform.title+'_sumbissions_export_'+Date.now()+'.'+type);
                };

            }]
        };
    }
]);
'use strict';

angular.module('forms').directive('fieldIconDirective', ["$http", "$compile", function($http, $compile) {
    
    return {
        template: '<i class="{{typeIcon}}"></i>',
        restrict: 'E',
        scope: {
            typeName: '@'
        },
        controller: ["$scope", function($scope){
        	var iconTypeMap = {
				'textfield': 'fa fa-pencil-square-o',
				'dropdown': 'fa fa-th-list',
				'date': 'fa fa-calendar',
				'checkbox': 'fa fa-check-square-o',
				'radio': 'fa fa-dot-circle-o',
				'email': 'fa fa-envelope-o',
				'textarea': 'fa fa-pencil-square',
				'legal': 'fa fa-legal',
				'file': 'fa fa-cloud-upload',
				'rating': 'fa fa-star-half-o',
				'link': 'fa fa-link',
				'scale': 'fa fa-sliders',
				'stripe': 'fa fa-credit-card',
				'statement': 'fa fa-quote-left',
				'yes_no': 'fa fa-toggle-on',
				'number': 'fa fa-slack'
			};
			$scope.typeIcon = iconTypeMap[$scope.typeName];
        }],

    };
}]);
'use strict';

// coffeescript's for in loop
var __indexOf = [].indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
    }
    return -1;
};

angular.module('forms').directive('fieldDirective', ['$templateCache', '$http', '$compile', '$rootScope', 
    function($templateCache, $http, $compile, $rootScope) {

    
    var getTemplateUrl = function(field) {
        console.log(field.validFieldTypes);
        var type = field.fieldType;
        var templateUrl = 'modules/forms/views/directiveViews/field/';
        var supported_fields = [
            'textfield',
            'email',
            'textarea',
            'checkbox',
            'date',
            'link',
            'dropdown',
            'hidden',
            'password',
            'radio',
            'legal',
            'statement',
            'rating',
            'yes_no',
            'number',
            'natural'
        ];
        if (__indexOf.call(supported_fields, type) >= 0) {
            templateUrl = templateUrl+type+'.html';
        }
        return templateUrl;
    };

    var linker = function(scope, element) {

        scope.setActiveField = $rootScope.setActiveField;
        //Set format only if field is a date
        if(scope.field.fieldType === 'date'){
            scope.dateOptions = {
                changeYear: true,
                changeMonth: true,
                altFormat: 'mm/dd/yyyy',
                yearRange: '1900:-0',   
                defaultDate: 0,
            };
        }

        // GET template content from path
        var templateUrl = getTemplateUrl(scope.field);
        $http.get(templateUrl).success(function(data) {
            element.html(data).show();
            $compile(element.contents())(scope);
        });
    };

    return {
        template: '<div>{{field.title}}</div>',
        restrict: 'E',
        scope: {
            field: '=',
            required: '&',
            design: '='
        },
        link: linker
    };
}]);
'use strict';

angular.module('forms').directive('onFinishRender', ["$rootScope", "$timeout", function ($rootScope, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            // $rootScope.$broadcast(' Started');

            //Don't do anything if we don't have a ng-repeat on the current element
            if(!element.attr('ng-repeat')){
                return;
            }

            var broadcastMessage = attrs.onFinishRender || 'ngRepeat';

            if(scope.$first && !scope.$last) {
                scope.$evalAsync(function () {
                    // console.log(Date.now());
                    $rootScope.$broadcast(broadcastMessage+' Started');
                });
            }else if(scope.$last) {
            	scope.$evalAsync(function () {
                    // element.ready(function () {
                        console.log(broadcastMessage+'Finished');
                        // console.log(Date.now());
                	    $rootScope.$broadcast(broadcastMessage+' Finished');
                    // });
                });
            }
        }
    };
}]);

'use strict';

angular.module('forms').directive('submitFormDirective', ['$http', '$timeout', 'TimeCounter', 'Auth', '$filter', '$rootScope',
    function ($http, $timeout, TimeCounter, Auth, $filter, $rootScope) {
        return {
            templateUrl: 'modules/forms/views/directiveViews/form/submit-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'='
            },
            controller: ["$scope", function($scope){
                angular.element(document).ready(function() {
                    $scope.error = '';
                    $scope.selected = null;
                    $scope.submitted = false;

                    TimeCounter.startClock()

                    $scope.exitStartPage = function(){
                        $scope.myform.startPage.showStart = false;
                    }
                    $rootScope.setActiveField = function (field_id) {
                        $scope.selected = field_id;
                    };
                    $scope.hideOverlay = function (){
                        $scope.selected = null;
                    };

                    $scope.submit = function(){
                        var _timeElapsed = TimeCounter.stopClock();

                        var form = _.cloneDeep($scope.myform);
                        form.timeElapsed = _timeElapsed;

                        // console.log('percentageComplete: '+$filter('formValidity')($scope.myform)/$scope.myform.visible_form_fields.length*100+'%');
                        form.percentageComplete = $filter('formValidity')($scope.myform)/$scope.myform.visible_form_fields.length*100;
                        console.log(form.percentageComplete)
                        delete form.visible_form_fields;

                        $scope.authentication = Auth;

                        $scope.submitPromise = $http.post('/forms/'+$scope.myform._id, form)
                            .success(function(data, status, headers){
                                console.log('form submitted successfully');
                                $scope.myform.submitted = true;
                            })
                            .error(function(error){
                                console.log(error);
                                $scope.error = error.message;
                            });
                    };

                    $scope.reloadForm = function(){
                        //Reset Timer
                        TimeCounter.stopClock();
                        TimeCounter.startClock();

                        //Reset Form
                        $scope.myform.submitted = false;
                        $scope.myform.form_fields = _.chain($scope.myform.form_fields).map(function(field){
                                field.fieldValue = '';
                                return field;
                            }).value();
                    };
                });

            }]
        };
    }
]);
'use strict';

//Forms service used for communicating with the forms REST endpoints
angular.module('forms').service('CurrentForm',
	function(){

		//Private variables
		var _form = {};

		//Public Methods
		this.getForm = function() {
	        return _form;
	    };
	    this.setForm = function(form) {
	        _form = form;
	    };
    }
);
'use strict';

//TODO: DAVID: URGENT: Make this a $resource that fetches valid field types from server
angular.module('forms').service('FormFields', [
	function() {
		this.types = [
		    {
		        name : 'textfield',
		        value : 'Short Text'
		    },
		    {
		        name : 'email',
		        value : 'Email'
		    },
		    {
		        name : 'radio',
		        value : 'Multiple Choice'
		    },
		    {
		        name : 'dropdown',
		        value : 'Dropdown'
		    },
		    {
		        name : 'date',
		        value : 'Date'
		    },
		    {
		        name : 'textarea',
		        value : 'Paragraph Text'
		    },
		    {
		        name : 'checkbox',
		        value : 'Checkbox'
		    },
		    {
		        name : 'yes_no',
		        value : 'Yes/No'
		    },
		    {
		        name : 'legal',
		        value : 'Legal'
		    },
		    // {
		    //     name : 'sig',
		    //     value : 'Signature'
		    // },
		    // {
		    //     name : 'file',
		    //     value : 'File Upload'
		    // },
		    {
		        name : 'rating',
		        value : 'Rating'
		    },
		    {
		        name : 'link',
		        value : 'Link'
		    },
		    {
		        name : 'number',
		        value : 'Numbers'
		    },
		    // {
		    //     name : 'scale',
		    //     value : 'Opinion Scale'
		    // },
		    // {
		    //     name : 'stripe',
		    //     value : 'Payment' 
		    // },
		    {
		        name : 'statement',
		        value : 'Statement' 
		    },
		    // {
		    //     name : 'natural',
		    //     value : 'Natural Language Input' 
		    // },
		];
	}
		
]);
'use strict';

//Forms service used for communicating with the forms REST endpoints
angular.module('forms').factory('Forms', ['$resource',
	function($resource) {
		return $resource('/forms/:formId', {
			formId: '@_id'
		}, {
			'query' : {
				method: 'GET', 
				isArray: true,
				//DAVID: TODO: Do we really need to get visible_form_fields for a Query?
				// transformResponse: function(data, header) {
				// 	var forms = angular.fromJson(data);
				// 	angular.forEach(forms, function(form, idx) {
				// 		form.visible_form_fields = _.filter(form.form_fields, function(field){
				// 			return (field.deletePreserved === false);
				// 		});
				// 	});
		  //         return forms;
		  //       }
			},
			'get' : {
				method: 'GET', 
				transformResponse: function(data, header) {
		          	var form = angular.fromJson(data);
		          	console.log(form);
		          	
		            form.visible_form_fields = _.filter(form.form_fields, function(field){
		            	return (field.deletePreserved === false);
		            });
		          	return form;
		        }
			},
			'update': {
				method: 'PUT'
			},
			'save': {
				method: 'POST'
			}
		});
	}
]);
'use strict';

//Submissions service used for communicating with the forms REST endpoints
angular.module('forms').factory('Submissions', ['$resource',
	function($resource) {
		return $resource('forms/:formID/submissions/:submissionId', {
			submissionId: '@_id',
			formId: '@_id'
		}, {
			'query' : {
				method: 'GET', 
				isArray: true,
			},
			'update': {
				method: 'PUT'
			},
			'save': {
				method: 'POST'
			}
		});
	}
]);
'use strict';

angular.module('forms').service('TimeCounter', [
	function(){
		var _startTime, _endTime, that=this;

		this.timeSpent = 0;

		this.startClock = function(){
			_startTime = Date.now();
			// console.log('Clock Started');
		};

		this.stopClock = function(){
			_endTime = Date.now();
			that.timeSpent = Math.abs(_endTime.valueOf() - _startTime.valueOf())/1000;
			// console.log('Clock Ended');
			return that.timeSpent;
		};

	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
    $httpProvider.interceptors.push(["$q", "$location", function($q, $location) {
      return {
        responseError: function(response) {
          // console.log($location.path());
          if( $location.path() !== '/users/me' && response.config){
            if(response.config.url !== '/users/me'){
              console.log('intercepted rejection of ', response.config.url, response.status);
              if (response.status === 401) {
                // save the current location so that login can redirect back
                $location.nextAfterLogin = $location.path();
                $location.path('/signin');
              }else if(response.status === 403){
                $location.path('/access_denied');
              }
            }

          }
          return $q.reject(response);
        }
      };
    }]);
}]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {

	var checkLoggedin = function($q, $timeout, $state, User, Auth) {
      var deferred = $q.defer();

      // console.log(Auth.ensureHasCurrentUser(User));

      if (Auth.currentUser && Auth.currentUser.email) {
        $timeout(deferred.resolve);
      }
      else {
        Auth.currentUser = User.getCurrent(function() {
          Auth.login();
          $timeout(deferred.resolve());
        },
        function() {
          Auth.logout();
          $timeout(deferred.reject());
          $state.go('sigin', {reload: true});
        });
      }

      return deferred.promise;
    };
    checkLoggedin.$inject = ["$q", "$timeout", "$state", "User", "Auth"];

	// Users state routing
	$stateProvider.
		state('profile', {
			resolve: {
          		loggedin: checkLoggedin
        	},
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			resolve: {
	          	loggedin: checkLoggedin
	        },
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			resolve: {
	          	loggedin: checkLoggedin
	        },
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).

		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signup-success', {
			url: '/signup-success',
			templateUrl: 'modules/users/views/authentication/signup-success.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('access_denied', {
			url: '/access_denied',
			templateUrl: 'modules/users/views/authentication/access-denied.client.view.html'
		}).
		
		state('resendVerifyEmail', {
			url: '/verify',
			templateUrl: 'modules/users/views/verify/resend-verify-email.client.view.html'
		}).
		state('verify', {
			url: '/verify/:token',
			templateUrl: 'modules/users/views/verify/verify-account.client.view.html'
		}).

		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$location', '$state', '$rootScope', 'User', 'Auth',
	function($scope, $location, $state, $rootScope, User, Auth) {

		$scope = $rootScope;
		$scope.credentials = {};
		$scope.error = '';

	    $scope.signin = function() {
			User.login($scope.credentials).then(
				function(response) {
					Auth.login(response);
					$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);

					if($state.previous.name !== 'home' && $state.previous.name !== 'verify' && $state.previous.name !== ''){
						$state.go($state.previous.name);
					}else{
						$state.go('listForms');
					}
				},
				function(error) {
					$rootScope.user = Auth.ensureHasCurrentUser(User);
					$scope.user = $rootScope.user;

					$scope.error = error;
					console.log('loginError: '+error);
				}
			);
	    };

	    $scope.signup = function() {
	        User.signup($scope.credentials).then(
		        function(response) {
		        	console.log('signup-success');
		        	$state.go('signup-success');
		        },
		        function(error) {
		        	console.log('Error: ');
		        	console.log(error);
					if(error) {
						$scope.error = error;
						console.log(error);
					}else {
						console.log('No response received');
					}
		        }
		    );
	    };

 	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$state', 'User',
	function($scope, $stateParams, $state, User) {
		
		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			User.askForPasswordReset($scope.credentials).then(
				function(response){
					$scope.success = response.message;
					$scope.credentials = null;
				},
				function(error){
					$scope.error = error;
					$scope.credentials = null;
				}
			);
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;
			User.resetPassword($scope.passwordDetails, $stateParams.token).then(
				function(response){
					// If successful show success message and clear form
					$scope.success = response.message;
					$scope.passwordDetails = null;

					// And redirect to the index page
					$state.go('reset-success');
				},
				function(error){
					$scope.error = error.message || error;
					$scope.passwordDetails = null;
				}
			);
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$rootScope', '$http', '$state', 'Users',
	function($scope, $rootScope, $http, $state, Users) {
		$scope.user = $rootScope.user;

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}
			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					$scope.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

	}
]);
'use strict';

angular.module('users').controller('VerifyController', ['$scope', '$state', '$rootScope', 'User', 'Auth', '$stateParams',
	function($scope, $state, $rootScope, User, Auth, $stateParams) {

		$scope.isReset = false;
		$scope.credentials = {};
		

		// Submit forgotten password account id
		$scope.resendVerifyEmail = function() {
			console.log($scope.credentials.email);
			User.resendVerifyEmail($scope.credentials.email).then(
				function(response){
					$scope.success = response.message;
					$scope.credentials = null;
					$scope.isResetSent = true;
				},
				function(error){
					$scope.error = error;
					$scope.credentials = null;
					$scope.isReset = false;
				}
			);
		};

		//Validate Verification Token
		$scope.validateVerifyToken = function() {
			if($stateParams.token){
				console.log($stateParams.token);
				User.validateVerifyToken($stateParams.token).then(
					function(response){
						console.log('Success: '+response.message);
						$scope.success = response.message;
						$scope.isReset = true;
						$scope.credentials = null;
					},
					function(error){
						console.log('Error: '+error.message);
						$scope.isReset = false;
						$scope.error = error;
						$scope.credentials = null;
					}
				);
			}
		};
	}
]);
'use strict';

angular.module('users').factory('Auth', ['$window', 
  function($window) {

    var userState = {
      isLoggedIn: false
    };

    var service = {
      _currentUser: null,
      get currentUser(){
        return this._currentUser;
      },

      // Note: we can't make the User a dependency of Auth
      // because that would create a circular dependency
      // Auth <- $http <- $resource <- LoopBackResource <- User <- Auth
      ensureHasCurrentUser: function(User) {
        if (service._currentUser && service._currentUser.username) {
          console.log('Using local current user.');
          // console.log(service._currentUser);
          return service._currentUser;
        } 
        else if ($window.user){
          console.log('Using cached current user.');
          // console.log($window.user);
          service._currentUser = $window.user;
          return service._currentUser;
        }
        else{
          console.log('Fetching current user from the server.');
          User.getCurrent().then(function(user) {
            // success
            service._currentUser = user;
            userState.isLoggedIn = true; 
            $window.user = service._currentUser;
            return service._currentUser;         
          },
          function(response) {
            userState.isLoggedIn = false;
            service._currentUser = null;
            $window.user = null;
            console.log('User.getCurrent() err', response);
            return null;
          });
        }
      },

      isAuthenticated: function() {
        return !!service._currentUser;
      },

      getUserState: function() {
        return userState;
      },

      login: function(new_user) {
        userState.isLoggedIn = true;
        service._currentUser = new_user;
      },

      logout: function() {
        $window.user = null;
        userState.isLoggedIn = false;
        service._currentUser = null;
      },
    };
    return service;
    
  }
]);

'use strict';

angular.module('users').service('Authorizer', ["APP_PERMISSIONS", "USER_ROLES", function(APP_PERMISSIONS, USER_ROLES) {
  return function(user) {
    return {
      canAccess: function(permissions) {
        var i, len, permission;
        if (!angular.isArray(permissions)) {
          permissions = [permissions];
        }
        for (i = 0, len = permissions.length; i < len; i++) {
          permission = permissions[i];
          if (APP_PERMISSIONS[permission] === null) {
            throw 'Bad permission value';
          }
          if (user && user.roles) {
            switch (permission) {
              case APP_PERMISSIONS.viewAdminSettings:
              case APP_PERMISSIONS.editAdminSettings:
                return user.roles.indexOf(USER_ROLES.admin) > -1;
              case APP_PERMISSIONS.viewPrivateForm:
              case APP_PERMISSIONS.editForm:
                return user.roles.indexOf(USER_ROLES.admin) > -1 || user.roles.indexOf(USER_ROLES.normal) > -1;
            }
          } else {
            return false;
          }
        }

        return false;
      }
    };
  };
}]);
'use strict';

angular.module('users').factory('User', ['$window', '$q', '$timeout', '$http', '$state',
  function($window, $q, $timeout, $http, $state) {

    var userService = {
      getCurrent: function() {
      	var deferred = $q.defer();

      	$http.get('/users/me')
    		  .success(function(response) {
    		    deferred.resolve(response);
    		  })
    		  .error(function() {
    		    deferred.reject('User\'s session has expired');
    		  });

        return deferred.promise;
      },
      login: function(credentials) {

        var deferred = $q.defer();
        $http.post('/auth/signin', credentials).success(function(response) {
            deferred.resolve(response);
          }).error(function(error) {
            deferred.reject(error.message || error);
          });

        return deferred.promise;
      },
      logout: function() { 

        var deferred = $q.defer();
        $http.get('/auth/signout').success(function(response) {
          deferred.resolve(null);
        }).error(function(error) {
          deferred.reject(error.message || error);
        });

        return deferred.promise;
      },
      signup: function(credentials) { 

        var deferred = $q.defer();
        $http.post('/auth/signup', credentials).success(function(response) {
          // If successful we assign the response to the global user model
          deferred.resolve(response);
        }).error(function(error) {
          deferred.reject(error.message || error);
        });

        return deferred.promise;
      },

      resendVerifyEmail: function(_email) { 

        var deferred = $q.defer();
        $http.post('/auth/verify', {email: _email}).success(function(response) {
          deferred.resolve(response);
        }).error(function(error) {
          deferred.reject(error.message || error);
        });

        return deferred.promise;
      },

      validateVerifyToken: function(token) { 

        //DAVID: TODO: The valid length of a token should somehow be linked to server config values
        //DAVID: TODO: SEMI-URGENT: Should we even be doing this?
        var validTokenRe = /^([A-Za-z0-9]{48})$/g;
        if( !validTokenRe.test(token) ) throw new Error('Error token: '+token+' is not a valid verification token');

        var deferred = $q.defer();
        $http.get('/auth/verify/'+token).success(function(response) {
          deferred.resolve(response);
        }).error(function(error) {
          deferred.reject(error);
        });

        return deferred.promise;
      },

      resetPassword: function(passwordDetails, token) {

        var deferred = $q.defer();
        $http.get('/auth/password/'+token, passwordDetails).success(function(response) {
          deferred.resolve();
        }).error(function(error) {
          deferred.reject(error.message || error);
        });

        return deferred.promise;
      },

      // Submit forgotten password account id
      askForPasswordReset: function(credentials) {

        var deferred = $q.defer();
        $http.post('/auth/forgot', credentials).success(function(response) {
          // Show user success message and clear form
          deferred.resolve(response);
        }).error(function(error) {
          // Show user error message
          deferred.reject(error.message || error);
        });

        return deferred.promise;
      },

    };

    return userService;
   
  }
]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);