'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'medform';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'ngRaven'];

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

	        //Redirect home to listForms if user is authenticated
	        if(toState.name === 'home'){
	        	if(Auth.isAuthenticated()){
	        		event.preventDefault(); // stop current execution
            		$state.go('listForms'); // go to login
	        	}
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

			  // console.log('Permissions');
			  // console.log(permissions);

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
ApplicationConfiguration.registerModule('forms', ['ngFileUpload', 'ui.date', 'ui.sortable', 'users']);
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

angular.module('core').controller('HeaderController', ['$rootScope','$scope','Menus', '$state', 'Auth', 'User',
	function ($rootScope, $scope, Menus, $state, Auth, User) {
		$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);
	    $scope.authentication = $rootScope.authentication = Auth;
		$rootScope.languages = $scope.languages = ['english', 'french', 'spanish'];

		$scope.isCollapsed = false;
		$scope.hideNav = false;
		$scope.menu = Menus.getMenu('topbar');

	    $scope.signout = function() {
		    var promise = User.logout();
			promise.then(function() {
				Auth.logout();
				// Auth.ensureHasCurrentUser(null);
				$rootScope.user = null;
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
			$scope.hideNav = false;
			if ( angular.isDefined( toState.data ) ) {

				if ( angular.isDefined( toState.data.hideNav ) ) {
		        	$scope.hideNav = toState.data.hideNav;
		        }
		    }
		});

		// Principal.identity().then(function(user){
		// 	$rootScope.user = user;
		// 	console.log('topbar')
		// 	console.log($scope.user);
		// },
		// function(error){
		// 	console.log(error);
		// }).then(function(){
			// $scope.signout = function() {
			// 	$http.get('/auth/signout').success(function(response) {
		 //          $state.go('home');
		 //        }).error(function(error) {
		 //          $scope.error = (error.message || error);
		 //        });
        		
   			//  			Principal.signout().then(
			// 		function(result){
			// 			$state.go('home');
			// 		},
			// 		function(error){
			// 			$scope.error = (error.message || error);
			// 		}
			// 	);
			 	// if( angular.isDefined(response_obj.error) ){
				// 	$scope.error = response_obj.error;
				// } else{
				// 	$state.go('home');
				// }

			// };

		// });

	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$rootScope', '$scope', 'User', 'Auth', '$state',
	function($rootScope, $scope, User, Auth, $state) {
		$scope = $rootScope;

		$scope.user = Auth.ensureHasCurrentUser(User);
	    $scope.authentication = Auth;

	    // if($scope.authentication.isAuthenticated()){
	    	// $state.go('listForms');
	    // }

	}
]);
// 'use strict';

// /**
//  * @ngdoc function
//  * @name medform.controller:IndexCtrl
//  * @description
//  * # IndexCtrl
//  * Controller of core
//  */
// angular.module('medform').controller('IndexCtrl', function ($scope, $rootScope, $location, User, Auth, $state) {
//     $rootScope.user = Auth.ensureHasCurrentUser(User);
//     // $rootScope.user = Auth.getUserState(User).user;
//     $rootScope.authentication = Auth;

//     $scope.signout = function() {
//       User.logout(function() {
//         Auth.logout();
//         $rootScope.user = null;
//         $state.go('home');
//         // $scope.$apply();
//       });
//     };


//   });

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
  		}).
		state('viewForm', {
			url: '/forms/:formId/admin',
			templateUrl: 'modules/forms/views/view-form.client.view.html',
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
angular.module('forms').controller('SubmitFormController', ['$scope', '$stateParams', '$state', 'Forms', 'CurrentForm',
	function($scope, $stateParams, $state, Forms, CurrentForm) {
		
		$scope.form = Forms.get({
			formId: $stateParams.formId
		});
		CurrentForm.setForm($scope.form);
	}
]);
'use strict';

// submissions controller
angular.module('forms').controller('ViewSubmissionController', ['$scope', '$stateParams', '$state', 'Submissions','$http',
	function($scope, $stateParams, $state, Submissions, $http) {
		$scope.submissionId = undefined;		

		// Return all form's submissions
		$scope.findAll = function() {
			$scope.submissions = Submissions.query({
				formId: $stateParams.formId
			});
		};

		// Find a specific submission
		$scope.findOne = function() {
			$scope.submission = Submissions.get({
				submissionId: $scope.submissionId,
				formId: $stateParams.formId
			});
		};

        
        // Remove existing submission
        $scope.remove = function(submission) {
            if (!submission) {
            	submission = $scope.submission;
            }
            $http.delete('/forms/'+$stateParams.formId+'/submissions/'+submission._id).
            success(function(data, status, headers){
                console.log('submission deleted successfully');
                alert('submission deleted..');
            });
        };
	}
]);
'use strict';

// Forms controller
angular.module('forms').controller('ViewFormController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm','$http',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http) {

        $scope = $rootScope;
        $scope.myform = CurrentForm.getForm();
        $scope.saveInProgress = false;
        $scope.viewSubmissions = false;
        $scope.showCreateModal = false;
        $scope.table = {
            masterChecker: true,
            rows: []
        };

        // Return all user's Forms
        $scope.findAll = function() {
            $scope.myforms = Forms.query();
        };

        // Find a specific Form
        $scope.findOne = function() {
            $scope.myform = Forms.get({
                formId: $stateParams.formId
            });
            CurrentForm.setForm($scope.myform);
        };

        $scope.goToWithId = function(route, id) {
            $state.go(route, {'formId': id}, {reload: true});
        };



        $scope.setForm = function (form) {
            $scope.myform = form;
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

        /*
        * Table Functions
        */
        $scope.isAtLeastOneChecked = function(){
            console.log('isAtLeastOneChecked');
            for(var i=0; i<$scope.table.rows.length; i++){
                if($scope.table.rows[i].selected) return true;
            }
            return false;
        };
        $scope.toggleAllCheckers = function(){
            console.log('toggleAllCheckers');
            for(var i=0; i<$scope.table.rows.length; i++){
                $scope.table.rows[i].selected = $scope.table.masterChecker;
            }
        };
        $scope.toggleObjSelection = function($event, description) {
            $event.stopPropagation();
        };
        $scope.rowClicked = function(obj) {
           obj.selected = !obj.selected;
        };

        /*
        * Form Submission Methods
        */
        //Delete selected submissions of Form
        $scope.deleteSelectedSubmissions = function(){
            // console.log('deleteSelectedSubmissions');
            var delete_ids = _.chain($scope.table.rows).filter(function(row){
                return !!row.selected;
            }).pluck('_id').value();
            console.log(delete_ids);

            $http({ url: '/forms/'+$scope.myform._id+'/submissions', 
                    method: 'DELETE',
                    data: {deleted_submissions: delete_ids},
                    headers: {"Content-Type": "application/json;charset=utf-8"}
                }).success(function(data, status, headers){
                    //Remove deleted ids from table
                    for(var i=0; i<$scope.table.rows.length; i++){
                        if($scope.table.rows[i].selected){
                            $scope.table.rows.splice(i, 1);
                        }
                    }
                })
                .error(function(err){
                    console.log('Could not delete form submissions.\nError: ');
                    console.log(err);
                    console.error = err;
                });      
        };
        //Fetch and display submissions of Form
        $scope.showSubmissions = function(){
        	$scope.viewSubmissions = true;

            $http.get('/forms/'+$scope.myform._id+'/submissions')
                .success(function(data, status, headers){
                    // console.log(data[0].form_fields);

                    var _data = [];
                    for(var i=0; i<data.length; i++){

                        var _tmpSubFormFields = JSON.parse(JSON.stringify($scope.myform.form_fields));

                        for(var x=0; x<_tmpSubFormFields.length; x++){

                            var currField__id = _tmpSubFormFields[x]._id,
                                currField;

                            _.find(data[i].form_fields, function(fieldItem, fieldIdx){ 
                                if(fieldItem._id === currField__id){ 
                                    currField = fieldItem; 
                                    // console.log(fieldItem.fieldValue);
                                    return true;
                                }
                            });

                            if(currField !== undefined){
                                _tmpSubFormFields[x].fieldValue = currField.fieldValue;
                                _tmpSubFormFields[x].$$hashKey = currField.$$hashKey;
                            }else {
                                _tmpSubFormFields[x].fieldValue = '';
                            }

                        }

                        _data[i] = data[i];
                        _data[i].form_fields = _tmpSubFormFields;
                    }

                    // console.log(JSON.stringify(_data));
                    $scope.submissions = _data;
                    $scope.table.rows = _data;
                    if(!$scope.$$phase && !$scope.$digest){
                        $scope.$apply();
                    }
                    // console.log('form submissions successfully fetched');
                    // console.log( JSON.parse(JSON.stringify($scope.submissions)) ) ;
                    // console.log( JSON.parse(JSON.stringify($scope.myform.form_fields)) );
                })
                .error(function(err){
                    console.log('Could not fetch form submissions.\nError: '+err);
                });            
        };
        //hide submissions of Form
        $scope.hideSubmissions = function(){
        	$scope.viewSubmissions = false;
        };

        // Remove existing Form
        $scope.remove = function(form_id) {
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
                        $state.go('listForms');
                    }
                    if($scope.myforms.length > 0){
                        $scope.myforms = _.filter($scope.myforms, function(myform){
                            return myform._id !== form._id; 
                        });
                    }

                }).error(function(error){
                    console.log('ERROR: Form could not be deleted.');
                    console.error(error);
                });
        };

        // Create new Form
        $scope.createNew = function(){
            var form = {};
            form.title = $scope.myform.name.$modelValue;
            form.language = $scope.myform.language.$modelValue;
            console.log(form);
            $scope.showCreateModal = true;

            console.log($scope.myform);
            if($scope.myform.$valid && $scope.myform.$dirty){
                $http.post('/forms', {form: form})
                .success(function(data, status, headers){
                    console.log('form created');

                    // Clear form fields
                   $scope.myform = {};
                    // Redirect after save 
                    $scope.goToWithId('viewForm', data._id+'');
                }).error(function(errorResponse){
                    console.log(errorResponse);
                    $scope.error = errorResponse.data.message;
                });
            }
        };


        // Update existing Form
        $scope.update = $rootScope.update = function(cb) {
            if(!$rootScope.saveInProgress){

                $rootScope.saveInProgress = true;
                // console.log('begin updating form');
                var err = null;

                $http.put('/forms/'+$scope.myform._id, {form: $scope.myform})
                    .then(function(response){
                        $rootScope.myform = $scope.myform = response.data;
                        console.log(response.data);
                        if(!$scope.$digest){
                            $scope.$apply();
                        }
                    }).catch(function(response){
                        console.log('Error occured during form UPDATE.\n');
                        console.log(response.data);
                        err = response.data;
                    }).finally(function() { 
                        // console.log('finished updating');
                        $rootScope.saveInProgress = false;
                        cb(err);
                    });
            }
        };

        $rootScope.resetForm = function(){
            $scope.myform = Forms.get({
                formId: $stateParams.formId
            });
        };

	}
]);
'use strict';

angular.module('forms').directive('autoSaveForm', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  
  return {
    require: ['^form'],
    // scope: {
    //     callback: '&autoSaveCallback'
    // },
    link: function($scope, $element, $attrs, $ctrls) {

      if($rootScope.watchCount === undefined){
        $rootScope.watchCount = 0;
      }

      var difference = function(array){
        var rest = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));

        var containsEquals = function(obj, target) {
          if (obj === null) return false;
          return _.any(obj, function(value) {
            return _.isEqual(value, target);
          });
        };

        return _.filter(array, function(value){ return !containsEquals(rest, value); });
      };

      var $formCtrl = $ctrls[0];
      var savePromise = null;
      $scope.finishedRender = false;
      var expression = $attrs.autoSaveForm || 'true';

      $scope.$on('ngRepeatStarted', function(ngRepeatFinishedEvent) {
        // $scope.finishedRender = false;
        $rootScope.watchCount = 0;
      });
      $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        $scope.finishedRender = true;
      });

      $scope.$watch('myform.form_fields', function(newValue, oldValue) {
        console.log('watchCount: '+$rootScope.watchCount);
        if(difference(oldValue,newValue).length === 0 || oldValue === undefined){
          return;
        }

        // console.log('\n\n----------\n$dirty: '+( $formCtrl.$dirty ) );
        // console.log('form_fields changed: '+difference(oldValue,newValue).length );
        // console.log('$valid: '+$formCtrl.$valid);
        // console.log('finishedRender: '+$scope.finishedRender);
        console.log('saveInProgress: '+$rootScope.saveInProgress);
          
        if($scope.finishedRender && ($formCtrl.$dirty || difference(oldValue,newValue).length !== 0) && !$rootScope.saveInProgress) {
          $rootScope.watchCount++;
         
          if($rootScope.watchCount === 1) {
            
            if(savePromise) {
              $timeout.cancel(savePromise);
            }

            savePromise = $timeout(function() {
              savePromise = null;

              $rootScope[$attrs.autoSaveCallback](
                function(err){
                  if(!err){
                    console.log('Form data persisted -- setting pristine flag');
                    console.log('\n\n---------\nUpdate form CLIENT');
                    console.log(Date.now());
                    $rootScope.watchCount = 0;
                    $formCtrl.$setPristine();  
                  }else{
                    console.log('Error form data NOT persisted');
                    console.log(err);
                  }
                });
            
            });

          }
        }else{
          return;
        }
        
      }, true);
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

angular.module('forms').directive('configureFormDirective', ['$rootScope', '$http', 'Upload', '$timeout', 'timeCounter', 'Auth', 'FormFields',
    function ($rootScope, $http, Upload, $timeout, timeCounter, Auth, FormFields) {
        return {
            controller: function($scope){
                $scope.log = '';
                $scope.pdfLoading = false;
                $scope.languages = $rootScope.languages;
                
                var _current_upload = null;
                $scope.resetForm = $rootScope.resetForm;
                $scope.update = $rootScope.update;

                var _unbindedPdfFields = $scope.pdfFields;

                //DAVID: TODO: finish this so we can create a Form.pdfFieldMap
                // $scope.getUnbindedPdfFields = function(fieldType){
                //     _unbindedPdfFields = $scope.pdfFields
                // }

                //PDF Functions
                $scope.cancelUpload = function(){
                    _current_upload.abort();
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

                    if (files && files.length) {
                        // for (var i = 0; i < files.length; i++) {
                        var file = files[0];
                        console.log(file);

                        _current_upload = Upload.upload({
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

            },
            templateUrl: './modules/forms/views/directiveViews/form/configure-form.html',
            restrict: 'E',
            scope: {
                myform:'=',
                user:'=',
                pdfFields:'@',
                formFields:'@'
            }
        };
    }
]);
'use strict';

angular.module('forms').directive('editFormDirective', ['$rootScope', '$q', '$http', '$timeout', 'timeCounter', 'Auth', 'FormFields',
    function ($rootScope, $q, $http, $timeout, timeCounter, Auth, FormFields) {
        return {
            templateUrl: './modules/forms/views/directiveViews/form/edit-form.html',
            restrict: 'E',
            scope: {
                myform:'=',
                user:'='
            },
            controller: function($scope){
                //Populate local scope with rootScope methods/variables
                $scope.update = $rootScope.update;

                /*
                ** FormFields (ui-sortable) drag-and-drop configuration
                */
                $scope.dropzone = {
                    handle: ' .handle'  
                }

                console.log($scope.myform);

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
                //         //     $scope.addField.types = FormFields.fields;
                //         // }
                      
                        
                //     }
                // };


                //Populate AddField with all available form field types
                $scope.addField = {};
                $scope.addField.types = FormFields.fields;

                $scope.addField.types.forEach(function(type){
                    type.lastAddedID = 1;
                    return type;
                });

                // accordion settings
                $scope.accordion = {};
                $scope.accordion.oneAtATime = true;

                // Add a new field
                $scope.addNewField = function(fieldType){

                    // incr field_id counter
                    $scope.addField.lastAddedID++;
                    var fieldTitle;

                    for(var i = 0; i < $scope.addField.types.length; i++){
                        // console.log($scope.addField.types[i].name === fieldType);
                        if($scope.addField.types[i].name === fieldType){ 
                            $scope.addField.types[i].lastAddedID++;
                            // console.log($scope.addField.types[i].lastAddedID);
                            fieldTitle = $scope.addField.types[i].value+$scope.addField.types[i].lastAddedID;  
                            break;
                        }
                    }
                    var newField = {
                        'title' : fieldTitle,
                        'fieldType' : fieldType,
                        'fieldValue' : '',
                        'required' : true,
                        'disabled' : false,
                    };

                    // put newField into fields array
                    $scope.myform.form_fields.unshift(newField);
                    // console.log('\n\n---------\nAdded field CLIENT');
                    // console.log(Date.now());
                    // console.log($scope.myform.form_fields.length);
                };

                // deletes particular field on button click
                $scope.deleteField = function (hashKey){
                    // console.log($scope.myform.form_fields);
                    for(var i = 0; i < $scope.myform.form_fields.length; i++){
                        // console.log($scope.myform.form_fields[i].$$hashKey === hashKey);
                        if($scope.myform.form_fields[i].$$hashKey === hashKey){
                            $scope.myform.form_fields.splice(i, 1);                      
                            break;
                        }
                    }
                };
                $scope.duplicateField = function (field, field_index){
                    for(var i = 0; i < $scope.myform.form_fields.length; i++){
                        if($scope.myform.form_fields[i].field_id === field.field_id){
                            $scope.addNewField($scope.myform.form_fields[i].fieldType);
                            break;
                        }
                    }
                };

                // add new option to the field
                $scope.addOption = function (field){
                    if(!field.fieldOptions) field.fieldOptions = [];

                    var lastOptionID = 0;

                    if(field.fieldOptions[field.fieldOptions.length-1])
                        lastOptionID = field.fieldOptions[field.fieldOptions.length-1].option_id;

                    // new option's id
                    var option_id = lastOptionID + 1;

                    var newOption = {
                        'option_id' : option_id,
                        'option_title' : 'Option ' + option_id,
                        'option_value' : option_id
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
                    if(field.fieldType === 'dropdown' || field.fieldType === 'checkbox' || field.fieldType === 'scale' || field.fieldType === 'rating' || field.fieldType === 'radio'){
                        return true;
                    } else {
                        return false;
                    }
                };

            },
  
        };
    }
]);
'use strict';

angular.module('forms').directive('fieldIconDirective', function($http, $compile) {
    
    return {
        templateUrl: './modules/forms/views/directiveViews/form/fieldIcon.html',
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
			}
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

angular.module('forms').directive('fieldDirective', function($http, $compile) {

    
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
            'legal'
        ];
        if (__indexOf.call(supported_fields, type) >= 0) {
            return templateUrl += type + '.html';
        }
    };

    var linker = function(scope, element) {
        // scope.field.required = scope.required;

        //Set format only if field is a date
        if(scope.field.fieldType === 'date'){
            scope.dateOptions = {
                changeYear: true,
                changeMonth: true,
                altFormat: "mm/dd/yyyy",
                yearRange: '1900:-0',   
                defaultDate: 0,
            };
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
});
'use strict';
angular.module('forms').directive('formLocator', function() {
    return {
      link: function(scope) {
        scope.$emit('formLocator');
      }
    };
});
'use strict';

angular.module('forms').directive('onFinishRender', function ($rootScope, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$first === true) {
                $timeout(function () {
                    $rootScope.$broadcast('ngRepeatStarted');
                }, 500);
            }
            if (scope.$last === true) {
            	$timeout(function () {
            		// console.log('ngRepeatFinished')
                	$rootScope.$broadcast('ngRepeatFinished');
                }, 500);
            }
        }
    };
});

'use strict';

angular.module('forms').directive('formDirective', ['$http', '$timeout', 'timeCounter', 'Auth',
    function ($http, $timeout, timeCounter, Auth) {
        return {
            controller: function($scope){
                timeCounter.startClock();

                $scope.submit = function(){
                    var _timeElapsed = timeCounter.stopClock();
                    $scope.form.timeElapsed = _timeElapsed;

                    // console.log($scope.form.timeElapsed);
                    $scope.authentication = Auth;
                    console.log($scope.authentication.isAuthenticated());

                    $http.post('/forms/'+$scope.form._id,$scope.form).
                    success(function(data, status, headers){
                        console.log('form submitted successfully');
                        alert('Form submitted..');
                        $scope.form.submitted = true;
                    })
                    .error(function(error){
                        console.log(error);
                    });
                };

                $scope.reloadForm = function(){
                    $scope.form.submitted = false;
                    $scope.form.form_fields = _.chain($scope.form.form_fields).map(function(field){
                        field.fieldValue = '';
                        return field;
                    }).value();
                }

            },
            templateUrl: './modules/forms/views/directiveViews/form/submit-form.html',
            restrict: 'E',
            scope: {
                form:'='
            }
        };
    }
]);
'use strict';

angular.module('forms').directive('tableDirective', ['$http', '$timeout', 'Auth',
    function ($http, $timeout, Auth) {
        return {
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
            templateUrl: './modules/forms/views/directiveViews/table/table.html',
            restrict: 'E',
            scope: {
                rows:'=',
                extras:'=',
            }
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
		        value : 'Dropdown List'
		    },
		    {
		        name : 'date',
		        value : 'Date'
		    },
		    {
		        name : 'textarea',
		        value : 'Long Text'
		    },
		    {
		        name : 'checkbox',
		        value : 'Checkbox'
		    },
		    {
		        name : 'legal',
		        value : 'Legal'
		    },
		    {
		        name : 'file',
		        value : 'File Upload'
		    },
		    {
		        name : 'rating',
		        value : 'Rating'
		    },
		    {
		        name : 'link',
		        value : 'Link'
		    },
		    {
		        name : 'scale',
		        value : 'Opinion Scale'
		    },
		    {
		        name : 'stripe',
		        value : 'Payment' 
		    },
		    {
		        name : 'statement',
		        value : 'Statement' 
		    },
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
		            console.log(form);
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
          if( $location.path() !== '/verify' && $location.path() !== '/users/me' && $location.path() !== '/' && $location.path() !== '/signup' && response.config){

            console.log('intercepted rejection of ', response.config.url, response.status);
            if (response.status === 401) {
              // save the current location so that login can redirect back
              $location.nextAfterLogin = $location.path();
              $location.path('/signin');
            }else if(response.status === 403){
              $location.path('/access_denied');
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

		// If user is signed in then redirect back home
		if ($scope.authentication.isAuthenticated()) $state.go('home');

	    $scope.signin = function() {
			Auth.currentUser = User.login($scope.credentials).then(
				function(response) {
					Auth.login(response);
					$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);

					if($state.previous.name !== 'home' && $state.previous.name !== ''){
						$state.go($state.previous.name);
					}else{
						$state.go('home');
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
		if ($scope.authentication.isAuthenticated()) $state.go('home');

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
		if($rootScope.authetication.isAuthenticated){
			$state.go('home');
		}

		$scope.isReset = false;

		// Submit forgotten password account id
		$scope.resendVerifyEmail = function() {
			User.resendVerifyEmail($scope.email).then(
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
		}
	}
]);
'use strict';

angular.module('users').factory('Auth',  function($window) {
    var userState =
    {
      isLoggedIn: false
    };

    var service = {
      currentUser: null,

      // Note: we can't make the User a dependency of Auth
      // because that would create a circular dependency
      // Auth <- $http <- $resource <- LoopBackResource <- User <- Auth
      ensureHasCurrentUser: function(User) {
        if (service.currentUser && service.currentUser.displayName) {
          // console.log('Using local current user.');
          // console.log(service.currentUser);
          return service.currentUser;
        } 
        else if ($window.user){
          // console.log('Using cached current user.');
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

      resendVerifyEmail: function(email) { 
        var deferred = $q.defer();
        $http.post('/auth/verify/', {email: email}).success(function(response) {
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