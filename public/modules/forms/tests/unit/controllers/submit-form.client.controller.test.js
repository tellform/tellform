'use strict';

(function() {
    // Forms Controller Spec
    describe('SubmitForm Controller Tests', function() {
        // Initialize global variables
        var SubmitFormController,
            createSubmitFormController,
            scope,
            $httpBackend,
            $stateParams,
            $location,
            $state,
            vm;

        var sampleUser = {
            firstName: 'Full',
            lastName: 'Name',
            email: 'test@test.com',
            username: 'test@test.com',
            password: 'password',
            provider: 'local',
            roles: ['user'],
            _id: 'ed873933b1f1dea0ce12fab9'
        };

        var sampleForm = {
            title: 'Form Title',
            admin: 'ed873933b1f1dea0ce12fab9',
            language: 'english',
            form_fields: [
                {'fieldType':'textfield', 'title':'First Name', 'fieldValue': '', 'deletePreserved': false},
                {'fieldType':'checkbox', 'title':'nascar',      'fieldValue': '', 'deletePreserved': false},
                {'fieldType':'checkbox', 'title':'hockey',      'fieldValue': '', 'deletePreserved': false}
            ],
            isLive: false,
            _id: '525a8422f6d0f87f0e407a33',
            visible_form_fields: [
                {'fieldType':'textfield', 'title':'First Name', 'fieldValue': '', 'deletePreserved': false},
                {'fieldType':'checkbox', 'title':'nascar',      'fieldValue': '', 'deletePreserved': false},
                {'fieldType':'checkbox', 'title':'hockey',      'fieldValue': '', 'deletePreserved': false}
            ]
        };

        // Load the main application module
        beforeEach(function(){
            module('view-form'),
            module(ApplicationConfiguration.applicationModuleName)
        });
        beforeEach(module('module-templates'));
        beforeEach(module('stateMock'));

        //Mock Users Service
        beforeEach(module(function($provide) {
            $provide.service('myForm', function($q) {
                var deferred = $q.defer();
                deferred.resolve(sampleForm);

                return deferred.promise;
            });
        }));

        //Mock Authentication Service
        beforeEach(module(function($provide) {
            $provide.service('Auth', function() {
                return {
                    ensureHasCurrentUser: function() {
                        return sampleUser;
                    },
                    isAuthenticated: function() {
                        return true;
                    },
                    getUserState: function() {
                        return true;
                    }
                };
            });
        }));

        //Mock Users Service
        beforeEach(module(function($provide) {
            $provide.service('User', function($q) {
                return {
                    getCurrent: function() {
                        var deferred = $q.defer();
                        deferred.resolve( JSON.stringify(sampleUser) );
                        return deferred.promise;
                    },
                    login: function(credentials) {
                        var deferred = $q.defer();
                        if( credentials.password === sampleUser.password && credentials.username === sampleUser.username){
                            deferred.resolve( JSON.stringify(sampleUser) );
                        }else {
                            deferred.resolve('Error: User could not be loggedin');
                        }

                        return deferred.promise;
                    },
                    logout: function() {
                        var deferred = $q.defer();
                        deferred.resolve(null);
                        return deferred.promise;
                    },
                    signup: function(credentials) {
                        var deferred = $q.defer();
                        if( credentials.password === sampleUser.password && credentials.username === sampleUser.username){
                            deferred.resolve( JSON.stringify(sampleUser) );
                        }else {
                            deferred.resolve('Error: User could not be signed up');
                        }

                        return deferred.promise;
                    }
                };
            });
        }));


        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function($controller, $rootScope, _$state_, _$location_, _$stateParams_, _$httpBackend_, CurrentForm) {
            // Set a new global scope
            scope = $rootScope.$new();

            //Set CurrentForm
            CurrentForm.setForm(sampleForm);

            // Point global variables to injected services
            $stateParams = _$stateParams_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;
            $state = _$state_;

            $httpBackend.whenGET('/users/me/').respond('');

            // Initialize the Forms controller.
            createSubmitFormController = function(){
                return $controller('SubmitFormController', { $scope: scope });
            };

            vm = createSubmitFormController();
        }));

        /*

        //FIX ME: Need to get thi sto work with view-form dependency
        it('on controller instantiation it should populate $scope.myform with current Form', inject(function() {

            //var controller = createSubmitFormController();

            console.log(vm);
            $stateParams.formId = '525a8422f6d0f87f0e407a33';

            // Set GET response
            $httpBackend.expectGET(/^(\/forms\/)([0-9a-fA-F]{24})$/).respond(200, sampleForm);

            // Test scope value
            expect( scope.myform  ).toEqualData(sampleForm);
            expect( scope.hideNav ).toEqual(false);
        }));

        */
    });
}());
