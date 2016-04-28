
angular.module('NodeForm', [
    'duScroll', 'ui.select', 'cgBusy', 'ngSanitize', 'vButton', 'ngResource',
    'ui.router', 'ui.bootstrap', 'ui.utils', 'ngRaven'
]);
angular.module('forms', ['ngResource', 'NodeForm.templates']);
angular.module('NodeForm').requires.push('forms');

angular.module('forms').factory('Auth', [
  function() {
    var service = {
      _currentUser: null,
      get currentUser(){
        return this._currentUser;
      },
      ensureHasCurrentUser: function() {
        return null;
      },
      isAuthenticated: function() {
        return false;
      },
      getUserState: function() {
        return '';
      },
      login: function() {
      },
      logout: function() {
      },
    };
    return service;
  }
]);
angular.module('forms').factory('$state', [function() {
    return {
        go: function() {}
    };
}]);
angular.module('forms').factory('myForm', ['Forms', function(Forms) {
    var form = window.form;
    form.visible_form_fields = _.filter(form.form_fields, function(field){
    	return (field.deletePreserved === false);
    });
    return form;
}]);
angular.module('forms').constant('FORM_URL', '/form/:formId');


angular.element(document).ready(function() {
	//Then init the app
	angular.bootstrap(document, ['forms']);
});
