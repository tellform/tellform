'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'medform';
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

			  	if( (permissions !== null) && !authenticator.canAccess(permissions) ){
			    	event.preventDefault();
		    		console.log('access denied')
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
ApplicationConfiguration.registerModule('forms', ['ngFileUpload', 'ui.date', 'ui.sortable', 'angular-input-stars', 'users']);
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
    $provide.decorator('accordionDirective', function($delegate) { 
        var directive = $delegate[0];
        directive.replace = true;
        return $delegate;
    });
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
		state('viewForm', {
			url: '/forms/:formId/admin',
			templateUrl: 'modules/forms/views/admin-form.client.view.html',
			data: {
				permissions: [ 'editForm' ]
			}
		}).		
		state('viewPublicForm', {
			url: '/forms/:formId',
			templateUrl: 'modules/forms/views/view-public-form.client.view.html',
			data: {
				hideNav: true,
			},
		});
	}
]);
'use strict';

// Forms controller
angular.module('forms').controller('AdminFormController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$modal',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http, $modal) {

        var deleteModal;
        $scope = $rootScope;

        $scope.myform = CurrentForm.getForm();
        $rootScope.saveInProgress = false;

        // Find a specific Form
        $scope.findOne = function() {
            $scope.myform = Forms.get({
                formId: $stateParams.formId
            });
            CurrentForm.setForm($scope.myform);
        };

        $scope.setForm = function (form) {
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
        $scope.openDeleteModal = function() {

            deleteModal = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'myModalContent.html',
              controller: 'AdminFormController',
            });
        };
        $scope.cancelDeleteModal = function(){
            if(deleteModal){
                deleteModal.dismiss('cancel');
            }
        };

        // Remove existing Form
        $scope.remove = function(form_id) {
            if(deleteModal && deleteModal.opened){

                deleteModal.close();
            
                var form = {};
                if(!form_id){
                    form = CurrentForm.getForm();
                    if(!form) form = $scope.myform;
                }else {
                    form._id = form_id;
                }
        
                $http.delete('/forms/'+form._id)
                    .success(function(data, status, headers){
                        console.log('form deleted successfully');

                        if(!form_id){
                            $state.go('listForms', {}, {reload: true}); 
                        }
                        if($scope.myforms.length > 0){
                            $scope.myforms = _.filter($scope.myforms, function(myform){
                                return myform._id !== form._id; 
                            });
                        }

                    }).error(function(error){
                        console.log('ERROR: Form could not be deleted.');
                        console.error(error);
                    }).finally(function(){

                    });
            }
        };


        // Update existing Form
        $scope.update = $rootScope.update = function(immediate, cb) {
            // console.log('immediate: '+immediate);
            var continueUpdate = true;
            if(immediate){
               continueUpdate = !$rootScope.saveInProgress;
            }
            
            if(continueUpdate){
                console.log('begin updating form');
                var err = null;

                if(immediate){ $rootScope.saveInProgress = true; }

                $scope.updatePromise = $http.put('/forms/'+$scope.myform._id, {form: $scope.myform})
                    .then(function(response){
                        $rootScope.myform = $scope.myform = response.data;
                        console.log(response.data);
                    }).catch(function(response){
                        console.log('Error occured during form UPDATE.\n');
                        console.log(response.data);
                        err = response.data;
                    }).finally(function() { 
                        console.log('finished updating');
                        if(immediate){$rootScope.saveInProgress = false; }
                        cb(err); 
                    });
            }
        };

	}
]);
'use strict';

// Forms controller
angular.module('forms').controller('ListFormsController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm','$http',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http) {
        
        $scope = $rootScope;
        $rootScope.showCreateModal = false;

        // Return all user's Forms
        $scope.findAll = function() {
            Forms.query(function(_forms){
                $scope.myforms = _forms;
            });
        };

        //Modal functions
        $scope.openCreateModal = function(){
            if(!$rootScope.showCreateModal){
                $rootScope.showCreateModal = true;
            }
        };
        $scope.closeCreateModal = function(){
            if($rootScope.showCreateModal){
                $rootScope.showCreateModal = false;
            }
        };

        $scope.setForm = function (form) {
            $scope.myform = form;
        };
        $scope.goToWithId = function(route, id) {
            $state.go(route, {'formId': id}, {reload: true});
        };

        $scope.duplicate = function(form, form_index){
            delete form._id;
            
            $http.post('/forms', {form: form})
                .success(function(data, status, headers){
                    console.log('form duplicated');
                    $scope.myforms.splice(form_index, 0, data);
                }).error(function(errorResponse){
                    console.log(errorResponse);
                    $scope.error = errorResponse.data.message;
                });
        }

        // Create new Form
        $scope.createNew = function(){
            var form = {};
            form.title = $scope.myform.name.$modelValue;
            form.language = $scope.myform.language.$modelValue;
            // console.log(form);
            $rootScope.showCreateModal = true;

            // console.log($scope.myform);
            if($scope.myform.$valid && $scope.myform.$dirty){
                $http.post('/forms', {form: form})
                .success(function(data, status, headers){
                    console.log('form created');

                    // Redirect after save 
                    $scope.goToWithId('viewForm', data._id+'');
                }).error(function(errorResponse){
                    console.log(errorResponse);
                    $scope.error = errorResponse.data.message;
                });
            }
        };

        $scope.removeFromList = function(deleted_form_id) {

            console.log('Remove existing form');
    
            $http.delete('/forms/'+deleted_form_id)
                .success(function(data, status, headers){
                    console.log('form deleted successfully');
                    
                    if($scope.myforms.length > 0){
                        $scope.myforms = _.filter($scope.myforms, function(myform){
                            return myform._id !== deleted_form_id; 
                        });
                    }

                }).error(function(error){
                    console.log('ERROR: Form could not be deleted.');
                    console.error(error);
                });
        };
    }
]);
'use strict';

// Forms controller
angular.module('forms').controller('SubmitFormController', ['$scope', '$rootScope', '$stateParams', '$state', 'Forms', 'CurrentForm',
	function($scope, $rootScope, $stateParams, $state, Forms, CurrentForm) {
	

		Forms.get({
			formId: $stateParams.formId
		}).$promise.then(
		//success
		function(form){
			$scope.myform = form;

			// Show navbar if form is not public AND user is loggedin
			if(!$scope.myform.isLive && $rootScope.authentication.isAuthenticated()){
				$rootScope.hideNav = false;
			}else if(!$scope.myform.isLive){
				$state.go('access_denied');
			}
			console.log('$rootScope.hideNav: '+$rootScope.hideNav);
			console.log('$scope.form.isLive: '+$scope.myform.isLive);
		},
		//error
        function( error ){
        	$scope.error = error.message;
        	console.log('ERROR: '+error.message);
        	$state.go('access_denied');
        });

	}
]);
'use strict';

angular.module('forms').directive('autoSaveForm', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  
  return {
    require: ['^form'],
    restrict: 'AE',
    controller: function ($scope) {
      
    },
    link: function($scope, $element, $attrs, $ctrls) {
      angular.element(document).ready(function() {
      
        var $formCtrl = $ctrls[0],
            savePromise = null;

        $rootScope.finishedRender = false;
        $scope.$on('editFormFieldsStarted', function(ngRepeatFinishedEvent) {
            $rootScope.finishedRender = false;
          });
        $scope.$on('editFormFieldsFinished', function(ngRepeatFinishedEvent) {
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
          $rootScope[$attrs.autoSaveCallback](false,
            function(err){
              if(!err){
                console.log('\n\nForm data persisted -- setting pristine flag');
                // console.log('\n\n---------\nUpdate form CLIENT');
                // console.log(Date.now());
                $formCtrl.$setPristine(); 
              }else{
                console.error('Error form data NOT persisted');
                console.error(err);
              }
            }); 
        };


        $scope.$watch(function(newValue, oldValue) {
          if($scope.anyDirtyAndTouched($scope.editForm) && !$rootScope.saveInProgress){
            debounceSave();
          }
        });

        //Autosave Form when model (specificed in $attrs.autoSaveWatch) changes
        $scope.$watch($attrs.autoSaveWatch, function(newValue, oldValue) {

          var changedFields = !_.isEqual(oldValue,newValue);
          if( (!newValue && !oldValue) || !oldValue ){
            return;
          }

          // console.log('\n\n----------');
          // console.log('$dirty: '+ $formCtrl.$dirty );
          // console.log('changedFields: '+changedFields);
          // console.log('finishedRender: '+$rootScope.finishedRender);
          // console.log('saveInProgress: '+$rootScope.saveInProgress);
          // console.log('newValue: '+newValue);
          // console.log('oldValue: '+oldValue);

          //Save form ONLY IF rendering is finished, form_fields have been change AND currently not save in progress
          if($rootScope.finishedRender && (changedFields && !$formCtrl.$dirty) && !$rootScope.saveInProgress) {

            if(savePromise) {
              $timeout.cancel(savePromise);
              savePromise = null;
            }

            savePromise = $timeout(function() {   
              console.log('Saving Form');
              debounceSave();           
            }); 
          }else if($rootScope.finishedRender && $rootScope.saveInProgress){
            $rootScope.saveInProgress = false;
          }

        }, true);



      });

    }
  };
  
}]);

'use strict';

angular.module('forms').directive('changeFocus', function() {
  return {
  	scope:{
		focusDownId: '@',
		focusUpId: '@',
  	},
    link: function(scope, elem, attrs) {
    	// console.log('aoeuaoeuaoeuaou');
    	scope.focusUp = function(){
    		if(!scope.$first) {
    			console.log('focusUp');
    	        elem[0].previousElementSibling.find('input').focus();
            }
            scope.apply();
    	};
    	scope.focusDown = function(){
    		if(!scope.$last) {
	            elem[0].nextElementSibling.focus();
            }
            scope.apply();
    	};

    	//Bind 'focus-down' click event to given dom element
	    angular.element('#' + scope.focusDownId).bind('click', function() {
	      scope.focusDown();
	    });

    	//Bind 'focus-up' click event to given dom element
	    angular.element('#' + scope.focusUpId).bind('click', function() {
	      scope.focusUp();
	    });
    }
  };
});
'use strict';

angular.module('forms').directive('fieldIconDirective', function($http, $compile) {
    
    return {
        template: '<i class="{{typeIcon}}"></i>',
        restrict: 'E',
        scope: {
            typeName: '@'
        },
        controller: function($scope){
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
        },

    };
});
'use strict';

// coffeescript's for in loop
var __indexOf = [].indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
    }
    return -1;
};

angular.module('forms').directive('fieldDirective', ['$http', '$compile', '$rootScope', 
    function($http, $compile, $rootScope) {

    
    var getTemplateUrl = function(field) {

        var type = field.fieldType;
        var templateUrl = './modules/forms/views/directiveViews/field/';
        var supported_fields = [
            'textfield',
            'email',
            'textarea',
            'checkbox',
            'date',
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
            return templateUrl += type + '.html';
        }
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
        //Set only if we have a natural lang processing field
        else if(scope.field.fieldType === 'natural'){
            scope.field.fieldMatchValue = '';

            //Fires when field is changed
            scope.$watch('scope.field', function(newField, oldField) {
                
            });
        }
        
        // GET template content from path
        var templateUrl = getTemplateUrl(scope.field);
        $http.get(templateUrl).success(function(data) {
            element.html(data);
            $compile(element.contents())(scope);
        });
    };

    return {
        template: '<div>{{field.title}}</div>',
        restrict: 'E',
        scope: {
            field: '=',
            required: '&'
        },
        link: linker
    };
}]);
'use strict';

angular.module('forms').directive('onFinishRender', function ($rootScope, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            //Don't do anything if we don't have a ng-repeat on the current element
            if(!element.attr('ng-repeat')){
                return;
            }

            var broadcastMessage = attrs.onFinishRender || 'ngRepeat';
             
            if(!scope.$last) {
                $timeout(function () {
                    // console.log(broadcastMessage+'Started');
                    $rootScope.$broadcast(broadcastMessage+'Started');
                });
            }else if(scope.$last) {
            	$timeout(function () {
                    element.ready(function () {
                        // console.log(broadcastMessage+'Finished');
                	    $rootScope.$broadcast(broadcastMessage+'Finished');
                    });
                });
            }
        }
    };
});

'use strict';

angular.module('forms').directive('formDirective', ['$http', '$timeout', 'timeCounter', 'Auth', '$filter', '$rootScope',
    function ($http, $timeout, timeCounter, Auth, $filter, $rootScope) {
        return {
            templateUrl: './modules/forms/views/directiveViews/form/submit-form.client.view.html',
            restrict: 'E',
            scope: {
                form:'='
            },
            controller: function($scope){
                angular.element(document).ready(function() {

                    $scope.selected = null;
                    timeCounter.startClock()

                    $rootScope.setActiveField = function (field_id) {
                        console.log('form field clicked: '+field_id);
                        $scope.selected = field_id;
                        console.log($scope.selected);
                    };
                    $scope.hideOverlay = function (){
                        $scope.selected = null;
                        console.log($scope.myForm);
                    };

                    $scope.submit = function(){
                        var _timeElapsed = timeCounter.stopClock();
                        $scope.form.timeElapsed = _timeElapsed;

                        // console.log('percentageComplete: '+$filter('formValidity')($scope.form)/$scope.form.visible_form_fields.length*100+'%');
                        $scope.form.percentageComplete = $filter('formValidity')($scope.form)/$scope.form.visible_form_fields.length*100;
                        console.log($scope.form.percentageComplete);
                        // delete $scope.form.visible_form_fields;

                        $scope.authentication = Auth;

                        $scope.submitPromise = $http.post('/forms/'+$scope.form._id,$scope.form)
                            .success(function(data, status, headers){
                                console.log('form submitted successfully');
                                // alert('Form submitted..');
                                $scope.form.submitted = true;
                            })
                            .error(function(error){
                                console.log(error);
                                $scope.error = error.message;
                            });
                    };


                    $scope.exitStartPage = function () {
                        $scope.form.startPage.showStart = false;
                    };

                    $scope.reloadForm = function(){
                        timeCounter.stopClock();
                        timeCounter.startClock();
                        $scope.form.submitted = false;
                        $scope.form.form_fields = _.chain($scope.form.form_fields).map(function(field){
                            field.fieldValue = '';
                            return field;
                        }).value();
                    };
                });

            }
        };
    }
]);
'use strict';

angular.module('forms').directive('tableDirective', ['$http', '$timeout', 'Auth',
    function ($http, $timeout, Auth) {
        return {
            templateUrl: './modules/forms/views/directiveViews/table/table.html',
            restrict: 'E',
            scope: {
                rows:'=',
                extras:'=',
            },
            controller: function($scope){

                $scope.toggleChecker = function(checked) {
                    var rows = $scope.gridOptions.$gridScope.renderedRows,
                        allChecked = true;

                    for (var r = 0; r < rows.length; r++) {
                        if (rows[r].entity.checker !== true) {
                            allChecked = false;
                            break;
                        }
                    }

                    $scope.gridOptions.$gridScope.checker = allChecked;
                };



            },

        };
    }
]);
'use strict';

//Forms service used for communicating with the forms REST endpoints
angular.module('forms').service('CurrentForm', ['Forms', 
	function(Forms){

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
]);
'use strict';

angular.module('forms').service('FormFields', [
	function() {
		this.fields = [
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
		return $resource('forms/:formId', {
			formId: '@_id'
		}, {
			'query' : {
				method: 'GET', 
				isArray: true,
				transformResponse: function(data, header) {
		          var forms = angular.fromJson(data);
		          angular.forEach(forms, function(form, idx) {
		            form.visible_form_fields = _.filter(form.form_fields, function(field){
		            	return field.deletePreserved === false;
		            }); //<-- replace each item with an instance of the resource object
		          });
		          return forms;
		        }
			},
			'get' : {
				method: 'GET', 
				transformResponse: function(data, header) {
		          	var form = angular.fromJson(data);
		          	
		            form.visible_form_fields = _.filter(form.form_fields, function(field){
		            	return field.deletePreserved === false;
		            }); //<-- replace each item with an instance of the resource object
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

angular.module('forms').service('timeCounter', [
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
    $httpProvider.interceptors.push(function($q, $location) {
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
    });
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
		$scope.error = null;

	    $scope.signin = function() {
			User.login($scope.credentials).then(
				function(response) {
					// console.log(response);
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
	          if(error) {
	            $scope.error = error;
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

		//If user is signed in then redirect back home
		// if ($scope.authentication.isAuthenticated()) $state.go('home');

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
			console.log($scope.user);
			// If user is not signed in then redirect back home
			if (!$scope.user) $state.go('home');

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

		// });
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

angular.module('users').factory('Auth',  function($window) {
    var userState = {
      isLoggedIn: false
    };

    var service = {
      currentUser: null,

      // Note: we can't make the User a dependency of Auth
      // because that would create a circular dependency
      // Auth <- $http <- $resource <- LoopBackResource <- User <- Auth
      ensureHasCurrentUser: function(User) {
        if (service.currentUser && service.currentUser.username) {
          console.log('Using local current user.');
          // console.log(service.currentUser);
          return service.currentUser;
        } 
        else if ($window.user){
          console.log('Using cached current user.');
          // console.log($window.user);
          service.currentUser = $window.user;
          return service.currentUser;
        }
        else{
          console.log('Fetching current user from the server.');
          User.getCurrent().then(function(user) {
            // success
            service.currentUser = user;
            userState.isLoggedIn = true; 
            $window.user = service.currentUser;
            return service.currentUser;         
          },
          function(response) {
            userState.isLoggedIn = false;
            service.currentUser = null;
            $window.user = null;
            console.log('User.getCurrent() err', response);
            return null;
          });
        }
      },

      isAuthenticated: function() {
        return !!service.currentUser;
      },

      getUserState: function() {
        return userState;
      },

      login: function(new_user) {
        userState.isLoggedIn = true;
        service.currentUser = new_user;
      },

      logout: function() {
        $window.user = null;
        userState.isLoggedIn = false;
        service.currentUser = null;
      },
    };
    return service;
  });

'use strict';

angular.module('users').service('Authorizer', function(APP_PERMISSIONS, USER_ROLES) {
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
});
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
        $http.post('/auth/verify/', {email: _email}).success(function(response) {
          deferred.resolve(response);
        }).error(function(error) {
          deferred.reject(error.message || error);
        });

        return deferred.promise;
      },

      validateVerifyToken: function(token) { 
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