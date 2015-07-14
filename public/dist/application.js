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
angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {

	    $rootScope.$state = $state;
	    $rootScope.$stateParams = $stateParams;

	    // add previous state property
	    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
	    	console.log(fromState);
	        $state.previous = fromState;

	        //Redirect home to listForms if user is authenticated
	        if(toState.name === 'home'){
	        	if($rootScope.authentication.isAuthenticated()){
	        		event.preventDefault(); // stop current execution
            		$state.go('listForms'); // go to login
	        	}
	        }
	    });

    }
]);

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
ApplicationConfiguration.registerModule('forms', ['ngFileUpload', 'users']);
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

// Configuring the Articles module
angular.module('forms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'My Forms', 'forms', '', '/forms', false);
	}
]).filter('formValidity',
    function(){

        return function(formObj){
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
			return valid_count;
        };
});
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
		state('createForm', {
			url: '/forms/create',
			templateUrl: 'modules/forms/views/create-form.client.view.html',
		}).
		state('viewForm', {
			url: '/forms/:formId/admin',
			templateUrl: 'modules/forms/views/view-form.client.view.html',
		}).		
		state('viewPublicForm', {
			url: '/forms/:formId',
			templateUrl: 'modules/forms/views/view-public-form.client.view.html',
			data: {
				hideNav: true,
				hideFooter: false
			},
		}).
		state('editForm', {
			url: '/forms/:formId/edit',
			templateUrl: 'modules/forms/views/create-form.client.view.html',
		});
	}
]);
'use strict';

angular.module('forms').controller('EditFormController', ['$scope', '$state', '$rootScope', 'Upload', '$stateParams', 'FormFields', 'Forms', 'CurrentForm', '$modal', '$location', '$http',
    function ($scope, $state, $rootScope, Upload, $stateParams, FormFields, Forms, CurrentForm, $modal, $location, $http) {
        $scope.form = {};
        $scope.isNewForm = false;
        $scope.log = '';
        $scope.pdfLoading = false;
        var _current_upload = null;

        // Get current form if it exists, or create new one
        if($stateParams.formId){
            Forms.get({ formId: $stateParams.formId}, function(form){
                $scope.form = angular.fromJson(angular.toJson(form));
                console.log($scope.form);
            });
        } else {
            $scope.form.form_fields = [];
            $scope.isNewForm = true;
        }

        //PDF Functions
        $scope.cancelUpload = function(){
            _current_upload.abort();
            $scope.pdfLoading = false;
            $scope.removePDF();
        };

        $scope.removePDF = function(){
            $scope.form.pdf = null;
            $scope.form.isGenerated = false;
            $scope.form.autofillPDFs = false;

            console.log('form.pdf: '+$scope.form.pdf+' REMOVED');
        };

        $scope.uploadPDF = function(files) {

            if (files && files.length) {
                // for (var i = 0; i < files.length; i++) {
                var file = files[0];
                _current_upload = Upload.upload({
                    url: '/upload/pdf',
                    fields: {
                        'user': $scope.user,
                        'form': $scope.form
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                    $scope.pdfLoading = true;
                }).success(function (data, status, headers, config) {
                    $scope.log = 'file ' + data.originalname + ' uploaded as '+ data.name +'. JSON: ' + JSON.stringify(data) + '\n' + $scope.log;
                    console.log($scope.form.pdf);
                    $scope.form.pdf = angular.fromJson(angular.toJson(data));
                    $scope.pdfLoading = false;

                    console.log($scope.log);
                    console.log('$scope.pdf: '+$scope.form.pdf.name);
                    if(!$scope.$$phase){
                        $scope.$apply();
                    }
                }).error(function(err){
                    $scope.pdfLoading = false;
                    console.log('Error occured during upload.\n');
                    console.log(err);
                });
                // }
            }
        };

        $rootScope.goToWithId = function(route, id) {
            $state.go(route, {'formId': id}, {reload: true});
        };

        // Create new Form
        $rootScope.createOrUpdate = function() {

            if($scope.isNewForm){
                // Create new Form object
                var form = new Forms($scope.form);

                $http.post('/forms', {form: $scope.form})
                .success(function(data, status, headers){
                    console.log('form created');

                    // Clear form fields
                    $scope.form = {};
                    // Redirect after save 
                    $scope.goToWithId('viewForm', $scope.form._id);
                }).error(function(errorResponse){
                    console.log(errorResponse);
                    $scope.error = errorResponse;
                });
            } else{
                $scope.update();
            }
        };

        // Update existing Form
        $rootScope.update = function() {
            var form = new Forms($scope.form);
            console.log('update form');
            console.log($scope.form);

            $http.put('/forms/'+$scope.form._id, {form: $scope.form})
            .success(function(data, status, headers){
                console.log('form updated successfully');
                $scope.goToWithId('viewForm', $scope.form._id);
            }).error(function(err){
                console.log('Error occured during form UPDATE.\n');
                console.log(err);
            });
            // form.$update({formId: $scope.form._id}, function(response) {
            //     console.log('form successfully updated');
            //     $scope.goToWithId('viewForm', response._id);
            // }, function(errorResponse) {
            //     console.log(errorResponse.data.message);
            //     $scope.error = errorResponse.data.message;
            // });
        };
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

		// Principal.identity().then(function(user){
  //           $scope.authentication.user = user;
  //       }).then(function(){
		

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

            
		// });
	}
]);
'use strict';

// Forms controller
angular.module('forms').controller('ViewFormController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm','$http',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http) {

        
        $scope.myform = CurrentForm.getForm();
        $scope.submissions = undefined;
        $scope.viewSubmissions = false;
        $scope.showCreateModal = false;
        $scope.table = {
            masterChecker: true,
            rows: []
        };

        $scope.setForm = function (form) {
            $scope.myForm = form;
        };

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

        //Create new form
        $scope.createNew = function(){
            var form = {};
            form.title = $scope.myForm.name.$modelValue;
            form.language = $scope.myForm.language.$modelValue;
            console.log(form);
            $scope.showCreateModal = true;

            console.log($scope.myForm);
            if($scope.myForm.$valid && $scope.myForm.$dirty){
                $http.post('/forms', {form: form})
                .success(function(data, status, headers){
                    console.log('form created');

                    // Clear form fields
                   $scope.myForm = {};
                    // Redirect after save 
                    $scope.goToWithId('viewForm', $scope.myform._id);
                }).error(function(errorResponse){
                    console.log(errorResponse);
                    // $scope.error = errorResponse.data.message;
                });
            }
        };

        $scope.saveInProgress = false;
        $scope.update = function() {
            if(!$scope.saveInProgress){
                $scope.saveInProgress = true;

                console.log('start update()');

                $http.put('/forms/'+$scope.myform._id, {form: $scope.myform})
                    .then(function(response){
                        console.log('form updated successfully');
                        console.log('$scope.saveInProgress: '+$scope.saveInProgress);
                        // $rootScope.goToWithId('viewForm', $scope.myform._id);
                    }).catch(function(response){
                        console.log('Error occured during form UPDATE.\n');
                        console.log(response.data);
                    }).finally(function() { 
                        $scope.saveInProgress = false; 
                    });
            }
        };

        //Table Functions
        $scope.toggleAllCheckers = function(){
            console.log('toggleAllCheckers');
            for(var i=0; i<$scope.table.rows.length; i++){
                $scope.table.rows[i].selected = $scope.table.masterChecker;
            }
        };
        $scope.toggleObjSelection = function($event, description) {
            $event.stopPropagation();
           console.log('checkbox clicked');
       };

       $scope.rowClicked = function(obj) {
           console.log('row clicked');
           obj.selected = !obj.selected;
       };

        //show submissions of Form
        $scope.showSubmissions = function(){
        	$scope.viewSubmissions = true;
            if(!$scope.table.rows.length){
                $http.get('/forms/'+$scope.myform._id+'/submissions')
                    .success(function(data, status, headers){
                        console.log(data);
                        $scope.submissions = data;
                        $scope.table.rows = data; 
                        console.log('form submissions successfully fetched');
                    })
                    .error(function(err){
                        console.log('Could not fetch form submissions.\nError: '+err);
                    });            
            } else if(!$scope.submissions.length){
                $http.get('/forms/'+$scope.myform._id+'/submissions')
                    .success(function(data, status, headers){
                        $scope.submissions = data;
                        $scope.table.rows = data;
                        console.log($scope.table.rows);
                        console.log('form submissions successfully fetched');
                    })
                    .error(function(err){
                        console.log('Could not fetch form submissions.\nError: '+err);
                    });
            }
            console.log($scope.submissions);
        };

        //hide submissions of Form
        $scope.hideSubmissions = function(){
        	$scope.viewSubmissions = false;
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

        $scope.goToWithId = function(route, id) {
            $state.go(route, {'formId': id}, {reload: true});
        };

        // Create new Form
        $rootScope.createOrUpdate = function() {
            if($scope.isNewForm){
                // Create new Form object
                var form = new Forms($scope.myform);

                $http.post('/forms', {form: $scope.myform})
                .success(function(data, status, headers){
                    console.log('form created');

                    // Clear form fields
                    $scope.myform = {};
                    // Redirect after save 
                    $scope.goToWithId('viewForm', $scope.myform._id);
                }).error(function(errorResponse){
                    console.log(errorResponse.data.message);
                    $scope.error = errorResponse.data.message;
                });
            } else{
                $rootScope.update();
            }
        };

        // $rootScope.saveInProgress = false;

        var saveFinished = function() { 
            $rootScope.saveInProgress = false; 
            console.log('update form');
        };

        // Update existing Form
        $rootScope.update = function() {

            $rootScope.saveInProgress = true;
            console.log('update form');

            $http.put('/forms/'+$scope.myform._id, {form: $scope.myform})
                .then(function(response){
                    console.log('form updated successfully');
                }).catch(function(response){
                    console.log('Error occured during form UPDATE.\n');
                    console.log(response.data);
                }).finally(function() { 
                    $rootScope.saveInProgress = false; 
                    console.log('update form');
                });
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
    link: function($scope, $element, $attrs, $ctrls) {

      if(!$rootScope.watchCount === undefined){
        $rootScope.watchCount = 0;
      }
      var difference = function(array){
        var rest = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));

        var containsEquals = function(obj, target) {
          if (obj == null) return false;
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
        $scope.finishedRender = false;
        $rootScope.watchCount = 0;
      });
      $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        $scope.finishedRender = true;
      });

      $scope.$watch('myform.form_fields', function(newValue, oldValue) {

        if(difference(oldValue,newValue).length === 0 || oldValue === undefined){
          return;
        }

        // console.log('\n\n-------\n$pristine: '+( $formCtrl.$pristine ) );
        // console.log('$dirty: '+( $formCtrl.$dirty ) );
        // console.log('form_fields changed: '+difference(oldValue.form_fields,newValue.form_fields).length );
        // console.log('$valid: '+$formCtrl.$valid);
        // console.log('finishedRender: '+$scope.finishedRender);
        // console.log('saveInProgress: '+$scope.saveInProgress);
          
        if($scope.finishedRender && ($formCtrl.$dirty || difference(oldValue,newValue).length !== 0) ) {
          $rootScope.watchCount++;
          if($rootScope.watchCount === 1) {
            
            if(savePromise) {
              $timeout.cancel(savePromise);
            }

            savePromise = $timeout(function() {
              savePromise = null;

              // Still valid?
              // if($formCtrl.$valid) {
              if($scope.$eval(expression) !== false) {
                console.log('Form data persisted -- setting pristine flag');
                $formCtrl.$setPristine();  
              }
              // }
            
            });
          }
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
    			// console.log('aoeuaoeu');
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

angular.module('forms').directive('configureFormDirective', ['$rootScope','$http', '$timeout', 'timeCounter', 'Auth', 'FormFields',
    function ($rootScope, $http, $timeout, timeCounter, Auth, FormFields) {
        return {
            controller: function($scope){
                $scope.log = '';
                $scope.pdfLoading = false;
                $scope.languages = $rootScope.languages;
                var _current_upload = null;
                $scope.createOrUpdate = $rootScope.createOrUpdate;
                $scope.resetForm = $rootScope.resetForm;

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
                            console.log($scope.myform.pdf);
                            $scope.myform.pdf = angular.fromJson(angular.toJson(data));
                            $scope.pdfLoading = false;

                            console.log($scope.log);
                            console.log('$scope.pdf: '+$scope.myform.pdf.name);
                            if(!$scope.$$phase){
                                $scope.$apply();
                            }
                        }).error(function(err){
                            $scope.pdfLoading = false;
                            console.log('Error occured during upload.\n');
                            console.log(err);
                        });
                        // }
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
                            console.log($scope.addField.types[i].lastAddedID);
                            fieldTitle = $scope.addField.types[i].value+$scope.addField.types[i].lastAddedID;  
                            break;
                        }
                    }
                    var newField = {
                        'title' : fieldTitle,
                        'fieldType' : fieldType,
                        'fieldValue' : '',
                        'required' : true,
                        'disabled' : false
                    };

                    // put newField into fields array
                    $scope.myform.form_fields.unshift(newField);
                    console.log($scope.myform.form_fields.length);
                };

                // deletes particular field on button click
                $scope.deleteField = function (hashKey){
                    console.log($scope.myform.form_fields);
                    for(var i = 0; i < $scope.myform.form_fields.length; i++){
                        console.log($scope.myform.form_fields[i].$$hashKey === hashKey);
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
                    if(!field.field_options)
                        field.field_options = [];

                    var lastOptionID = 0;

                    if(field.field_options[field.field_options.length-1])
                        lastOptionID = field.field_options[field.field_options.length-1].option_id;

                    // new option's id
                    var option_id = lastOptionID + 1;

                    var newOption = {
                        'option_id' : option_id,
                        'option_title' : 'Option ' + option_id,
                        'option_value' : option_id
                    };

                    // put new option into field_options array
                    field.field_options.push(newOption);
                };

                // delete particular option
                $scope.deleteOption = function (field, option){
                    for(var i = 0; i < field.field_options.length; i++){
                        if(field.field_options[i].option_id === option.option_id){
                            field.field_options.splice(i, 1);
                            break;
                        }
                    }
                };

                // decides whether field options block will be shown (true for dropdown and radio fields)
                $scope.showAddOptions = function (field){
                    if(field.fieldType == 'dropdown' || field.fieldType == 'checkbox' || field.fieldType == 'scale' || field.fieldType == 'rating' || field.fieldType == 'radio')
                        return true;
                    else
                        return false;
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
				"textfield": "fa fa-pencil-square-o",
				"dropdown": "fa fa-th-list",
				"date": "fa fa-calendar",
				"checkbox": "fa fa-check-square-o",
				"radio": "fa fa-dot-circle-o",
				"email": "fa fa-envelope-o",
				"textarea": "fa fa-pencil-square",
				"legal": "fa fa-legal",
				"file": "fa fa-cloud-upload",
				"rating": "fa fa-star-half-o",
				"link": "fa fa-link",
				"scale": "fa fa-sliders",
				"stripe": "fa fa-credit-card",
				"statement": "fa fa-quote-left",
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
            'radio'
        ];
        if (__indexOf.call(supported_fields, type) >= 0) {
            return templateUrl += type + '.html';
        }
    };

    var linker = function(scope, element) {
        scope.field.required = scope.required;
        
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
    }
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

                $scope.cancel = function(){
                    alert('Form canceled..');
                };

            },
            templateUrl: './modules/forms/views/directiveViews/form/form.html',
            restrict: 'E',
            scope: {
                form:'='
            }
        };
    }
]);
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
    }
});

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
          if( $location.path() !== '/users/me' && $location.path() !== '/'){

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
			// parent: 'restricted',
			// data: {
			// 	roles: ['user', 'admin'],
			// },
			resolve: {
          		loggedin: checkLoggedin
        	},
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			// resolve: {
			// 	checkLoggedin: Authorization.authorize
			// },
			// parent: 'restricted',
			// data: {
			// 	roles: ['user', 'admin'],
			// },
			resolve: {
	          	loggedin: checkLoggedin
	        },
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			// parent: 'restricted',
			// data: {
			// 	roles: ['user', 'admin'],
			// },
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
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('access_denied', {
			url: '/access_denied',
			templateUrl: 'modules/users/views/authentication/access-denied.client.view.html'
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
    	// console.log("signin");
    	// console.log($scope.credentials);
		Auth.currentUser = User.login($scope.credentials).then(
			function(response) {
				Auth.login(response);
				$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);

				if($state.previous.name !== 'home'){
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
        User.save($scope.registration,
        function() {
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


	// 	$scope.signup = function() {
	// 		Principal.signup($scope.credentials).then(
	// 			function(result){
	// 				$state.go('home');
	// 			},
	// 			function(rejection_reason){
	// 				$scope.error = rejection_reason;
	// 			}
	// 		);
	// 		// $http.post('/auth/signup', $scope.credentials).success(function(response) {
	// 		// 	// If successful we assign the response to the global user model
	// 		// 	$scope.authentication.user = response;
	// 		// 	Principal.authenticate(response);

	// 		// 	// And redirect to the index page
	// 		// 	$location.path('/');
	// 		// }).error(function(response) {
	// 		// 	$scope.error = response.message;
	// 		// });
	// 	};

	// 	$scope.signin = function() {
	// 		console.log('signin');

	// 		Principal.signin($scope.credentials).then(
	// 			function(result){
	// 				$state.go('home');
	// 			},
	// 			function(rejection_reason){
	// 				$scope.error = rejection_reason;
	// 			}
	// 		);
	// 		// var response_obj = Principal.signin($scope.credentials);
	// 		// if( angular.isDefined(response_obj.error) ){
	// 		// 	$scope.error = response_obj.error;
	// 		// 	$location.path('/signin');
	// 		// } else{
	// 		// 	$location.path('/');
	// 		// }
	// 		// $http.post('/auth/signin', $scope.credentials).success(function(response) {
	// 		// 	// If successful we assign the response to the global user model
	// 		// 	$scope.authentication.user = response;
	// 		// 	Principal.authenticate(response);

	// 		// 	// And redirect to the index page
	// 		// 	$location.path('/');
	// 		// }).error(function(response) {
	// 		// 	Principal.authenticate(null);
	// 		// 	$scope.error = response.message;
	// 		// });
	// 	};
	// }
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

angular.module('users')
  .factory('Auth',  function($window) {
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

// 'use strict';

// angular.module('users').factory('Authorization', ['$rootScope', '$http', '$q', '$state', 'Principal',
//   function($rootScope, $http, $q, $state, Principal) {
//     var service = {
//       authorize: function(){
//         var deferred = $q.defer();
//         $http.get('/user/me').success(function(response) {
            

//             //user is logged in
//             if(response.data !== null){
//               deferred.resolve();
//             }else {
//               $rootScope.message = 'You need to log in.';
//               deferred.reject();
//               $state.go('/login');
//             }
            
//         });
//         return deferred.promise();
//       }
//     };
//     return service;
//       // this.authorize = function() {
//       //   return Principal.identity().then(function(){   
//       //     var isAuthenticated = Principal.isAuthenticated();
//       //     if( angular.isDefined($rootScope.toState.data) ){ 
//       //       // if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
//       //         if (!isAuthenticated){ //$location.path('/access_denied'); // user is signed in but not authorized for desired state
//       //           // console.log('isAuthenticated: '+isAuthenticated);

//       //         // else {
//       //           // user is not authenticated. so the state they wanted before you
//       //           // send them to the signin state, so you can return them when you're done
//       //           $rootScope.returnToState = $rootScope.toState;
//       //           $rootScope.returnToStateParams = $rootScope.toStateParams;

//       //           // now, send them to the signin state so they can log in
//       //           $location.path('/signin');
//       //         }
//       //       // }
//       //     }
//       //   });
//       // };
//   }
// ]);
// 'use strict';

// angular.module('users').factory('AuthenticationService', function($http, $timeout, $q) {
//   var error;
//   var service = {
//       // Information about the current user
//       currentUser: null,

//       login: function(credentials) {
//           var login = $http.post('/auth/signin', credentials);
//           login.success(function(data) {
//               service.currentUser = data.user;
//               // $flash.clear();
//           }).error(function(error) {
//               error = error.error ? error.error : error;
//               console.error(error.message || error);
//           });
//           return login;
//       },

//       logout: function() {
//           var logout = $http.get('/auth/logout');
//           logout.success(function() {
//               service.currentUser = null;
//               console.log("You've successfully logged out");
//           });
//           return logout;
//       },

//       signup: function(credentials) { 
//         var signup = $http.post('/auth/signup', credentials)
//         signup.success(function(response) {
//             console.log("You've successfully created an account");
//         }).error(function(response) {
//             error = error.error ? error.error : error;
//             console.error(error.message || error);
//         });

//         return signup;
//       },

//       // Ask the backend to see if a user is already authenticated -
//       // this may be from a previous session.
//       identity: function() {
//           if (service.isAuthenticated()) {
//               return $q.when(service.currentUser);
//           } else {
//               return $http.get('/user/me').then(function(response) {
//                   service.currentUser = response.data.user;
//                   return service.currentUser;
//               });
//           }
//       },

//       // Is the current user authenticated?
//       isAuthenticated: function() {
//           return !!service.currentUser;
//       },

//       isInRole: function(role) {
//         return service.isAuthenticated() (service.currentUser.roles.indexOf(role) !== -1);
//       },

//       isInAnyRole: function(roles) {
//         if ( !service.isAuthenticated() || !service.currentUser.roles) return false;
//         var roles = service.currentUser.roles;

//         for (var i = 0; i < roles.length; i++) {
//           if (this.isInRole(roles[i])) return true;
//         }

//         return false;
//       },

//   };
//   return service;
// });

// // .factory('Principal', ['$window', '$http', '$q', '$timeout', '$state',
// //   function($window, $http, $q, $timeout, $state) {
// //     var _identity,
// //       _authenticated = false;

// //     return {
// //       isIdentityResolved: function() {
// //         return angular.isDefined(_identity);
// //       },
// //       isAuthenticated: function() {
// //         return _authenticated;
// //       },
//       // isInRole: function(role) {
//       //   if (!_authenticated || !_identity.roles) return false;

//       //   return _identity.roles.indexOf(role) !== -1;
//       // },
//       // isInAnyRole: function(roles) {
//       //   if (!_authenticated || !_identity.roles) return false;

//       //   for (var i = 0; i < roles.length; i++) {
//       //     if (this.isInRole(roles[i])) return true;
//       //   }

//       //   return false;
//       // },
// //       authenticate: function(user) {
// //         _identity = user;
// //         _authenticated = (user !== null);
        
// //         // for this demo, we'll store the identity in localStorage. For you, it could be a cookie, sessionStorage, whatever
// //         if (user) $window.user = user;
// //         else $window.user = null;
// //       },
// //       signin: function(credentials) {

// //         var deferred = $q.defer();
// //         var self = this;
// //         $http.post('/auth/signin', credentials).success(function(response) {
// //             // If successful we assign the response to the global user model
// //             self.authenticate(response);
// //             deferred.resolve(response);
// //           }).error(function(response) {
// //             _authenticated = false;
// //             deferred.reject({ error: response.message });
// //           });
// //           return deferred.promise;
// //       },
// //       signup: function(credentials) { 

// //         var deferred = $q.defer();

// //         $http.post('/auth/signup', credentials).success(function(response) {
// //           // If successful we assign the response to the global user model
// //           deferred.resolve(response);
// //         }).error(function(response) {

// //           deferred.reject({ error: response.message });
// //         });

// //         return deferred.promise;
// //       },
// //       signout: function() { 
// //         var deferred = $q.defer();
// //         $http.get('/auth/signout').success(function(response) {
// //           // If successful we assign the response to the global user model
// //           deferred.resolve({});
// //         }).error(function(response) {
// //           deferred.reject({ error: response.message });
// //         });

// //         _authenticated = false;
// //         _identity = undefined;

// //         return deferred.promise;
// //       },
// //       identity: function() {
// //         var self = this;

// //         var deferred = $q.defer();

// //         // check and see if we have retrieved the user data from the server. if we have, reuse it by immediately resolving
// //         if (angular.isDefined(_identity)) {

// //           deferred.resolve(_identity);
// //           return deferred.promise;
// //         }else if($window.user){
// //           // console.log($window.user);
// //           // self.authenticate($window.user);
// //           // var user = $window.user;
// //           _identity = $window.user;
// //           self.authenticate(_identity);
// //           deferred.resolve(_identity);

// //           return deferred.promise;
// //         }else {

// //         	// otherwise, retrieve the user data from the server, update the user object, and then resolve.
// //           $http.get('/users/me', { ignoreErrors: true })
// //       		  .success(function(response) {
// //       		    self.authenticate(response);
// //               $window.user = response;
// //       		    deferred.resolve(_identity);
// //       		  })
// //       		  .error(function() {
// //       		    _identity = null;
// //       		    _authenticated = false;
// //               $window.user = null;
// //       		    $state.path('signin');
// //       		    deferred.resolve(_identity);
// //       		  });
 
// //           return deferred.promise;
// //         }
// //       },
// //       getUser: function(){
// //         this.identity(false).then( function(user){
// //           return user;
// //         });
// //       }
// //     };
   
// //   }
// // ]);

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