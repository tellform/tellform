'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'NodeForm';
	var applicationModuleVendorDependencies = ['duScroll', 'ui.select', 'ngSanitize', 'vButton', 'ngResource', 'TellForm.templates', 'ui.router', 'ui.bootstrap', 'ui.utils', 'pascalprecht.translate'];

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
  viewPrivateForm: 'viewPrivateForm'
});

//User Role constants
angular.module(ApplicationConfiguration.applicationModuleName).constant('USER_ROLES', {
  admin: 'admin',
  normal: 'user',
  superuser: 'superuser'
});

//form url
angular.module(ApplicationConfiguration.applicationModuleName).constant('FORM_URL', '/forms/:formId');

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
ApplicationConfiguration.registerModule('forms', [
	'ngFileUpload', 'ui.router.tabs', 'ui.date', 'ui.sortable',
	'angular-input-stars', 'users', 'ngclipboard'
]);//, 'colorpicker.module' @TODO reactivate this module

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('en', {

		//Configure Form Tab View
		ADVANCED_SETTINGS: 'Advanced Settings',
		FORM_NAME: 'Form Name',
		FORM_STATUS: 'Form Status',
		PUBLIC: 'Public',
		PRIVATE: 'Private',
		GA_TRACKING_CODE: 'Google Analytics Tracking Code',
		DISPLAY_FOOTER: 'Display Form Footer?',
		SAVE_CHANGES: 'Save Changes',
		CANCEL: 'Cancel',
		DISPLAY_START_PAGE: 'Display Start Page?',
		DISPLAY_END_PAGE: 'Display Custom End Page?',

		//List Forms View
		CREATE_A_NEW_FORM: 'Create a new form',
		CREATE_FORM: 'Create form',
		CREATED_ON: 'Created on',
		MY_FORMS: 'My forms',
		NAME: 'Name',
		LANGUAGE: 'Language',
		FORM_PAUSED: 'Form paused',

		//Edit Field Modal
		EDIT_FIELD: 'Edit this Field',
		SAVE_FIELD: 'Save',
		ON: 'ON',
		OFF: 'OFF',
		REQUIRED_FIELD: 'Required',
		LOGIC_JUMP: 'Logic Jump',
		SHOW_BUTTONS: 'Additional Buttons',
		SAVE_START_PAGE: 'Save',

		//Admin Form View
		ARE_YOU_SURE: 'Are you ABSOLUTELY sure?',
		READ_WARNING: 'Unexpected bad things will happen if you don’t read this!',
		DELETE_WARNING1: 'This action CANNOT be undone. This will permanently delete the "',
		DELETE_WARNING2: '" form and remove all associated form submissions.',
		DELETE_CONFIRM: 'Please type in the name of the form to confirm.',
		I_UNDERSTAND: 'I understand the consequences, delete this form.',
		DELETE_FORM_SM: 'Delete',
		DELETE_FORM_MD: 'Delete Form',
		DELETE: 'Delete',
		FORM: 'Form',
		VIEW: 'View',
		LIVE: 'Live',
		PREVIEW: 'Preview',
		COPY: 'Copy',
		COPY_AND_PASTE: 'Copy and Paste this to add your TellForm to your website',
		CHANGE_WIDTH_AND_HEIGHT: 'Change the width and height values to suit you best',
		POWERED_BY: 'Powered by',
		TELLFORM_URL: 'Your TellForm is permanently at this URL',

		//Edit Form View
		DISABLED: 'Disabled',
		YES: 'YES',
		NO: 'NO',
		ADD_LOGIC_JUMP: 'Add Logic Jump',
		ADD_FIELD_LG: 'Click to Add New Field',
		ADD_FIELD_MD: 'Add New Field',
		ADD_FIELD_SM: 'Add Field',
		EDIT_START_PAGE: 'Edit Start Page',
		EDIT_END_PAGE: 'Edit End Page',
		WELCOME_SCREEN: 'Start Page',
		END_SCREEN: 'End Page',
		INTRO_TITLE: 'Title',
		INTRO_PARAGRAPH: 'Paragraph',
		INTRO_BTN: 'Start Button',
		TITLE: 'Title',
		PARAGRAPH: 'Paragraph',
		BTN_TEXT: 'Go Back Button',
		BUTTONS: 'Buttons',
		BUTTON_TEXT: 'Text',
		BUTTON_LINK: 'Link',
		ADD_BUTTON: 'Add Button',
		PREVIEW_FIELD: 'Preview Question',
		QUESTION_TITLE: 'Title',
		QUESTION_DESCRIPTION: 'Description',
		OPTIONS: 'Options',
		ADD_OPTION: 'Add Option',
		NUM_OF_STEPS: 'Number of Steps',
		CLICK_FIELDS_FOOTER: 'Click on fields to add them here',
		SHAPE: 'Shape',
		IF_THIS_FIELD: 'If this field',
		IS_EQUAL_TO: 'is equal to',
		IS_NOT_EQUAL_TO: 'is not equal to',
		IS_GREATER_THAN: 'is greater than',
		IS_GREATER_OR_EQUAL_THAN: 'is greater or equal than',
		IS_SMALLER_THAN: 'is_smaller_than',
		IS_SMALLER_OR_EQUAL_THAN: 'is smaller or equal than',
		CONTAINS: 'contains',
		DOES_NOT_CONTAINS: 'does not contain',
		ENDS_WITH: 'ends with',
		DOES_NOT_END_WITH: 'does not end with',
		STARTS_WITH: 'starts with',
		DOES_NOT_START_WITH: 'does not start with',
		THEN_JUMP_TO: 'then jump to',

		//Edit Submissions View
		TOTAL_VIEWS: 'total unique visits',
		RESPONSES: 'responses',
		COMPLETION_RATE: 'completion rate',
		AVERAGE_TIME_TO_COMPLETE: 'avg. completion time',

		DESKTOP_AND_LAPTOP: 'Desktops',
		TABLETS: 'Tablets',
		PHONES: 'Phones',
		OTHER: 'Other',
		UNIQUE_VISITS: 'Unique Visits',

		FIELD_TITLE: 'Field Title',
		FIELD_VIEWS: 'Field Views',
		FIELD_DROPOFF: 'Field Completion',
		FIELD_RESPONSES: 'Field Responses',
		DELETE_SELECTED: 'Delete Selected',
		EXPORT_TO_EXCEL: 'Export to Excel',
		EXPORT_TO_CSV: 'Export to CSV',
		EXPORT_TO_JSON: 'Export to JSON',
		PERCENTAGE_COMPLETE: 'Percentage Complete',
		TIME_ELAPSED: 'Time Elapsed',
		DEVICE: 'Device',
		LOCATION: 'Location',
		IP_ADDRESS: 'IP Address',
		DATE_SUBMITTED: 'Date Submitted',
		GENERATED_PDF: 'Generated PDF',

		//Design View
		BACKGROUND_COLOR: 'Background Color',
		DESIGN_HEADER: 'Change how your Form Looks',
		QUESTION_TEXT_COLOR: 'Question Text Color',
		ANSWER_TEXT_COLOR: 'Answer Text Color',
		BTN_BACKGROUND_COLOR: 'Button Background Color',
		BTN_TEXT_COLOR: 'Button Text Color',

		//Admin Tabs
		CREATE_TAB: 'Create',
		DESIGN_TAB: 'Design',
		CONFIGURE_TAB: 'Configure',
		ANALYZE_TAB: 'Analyze'

	});
}]);

'use strict';

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('es', {

		//Configure Form Tab View
		ADVANCED_SETTINGS: 'Configuraciones avanzadas',
		FORM_NAME: 'Nombre del formulario',
		FORM_STATUS: 'Estado del formulario',
		PUBLIC: 'Público',
		PRIVATE: 'Privado',
		GA_TRACKING_CODE: 'Código de Google Analytics',
		DISPLAY_FOOTER: '¿Mostrar pie de página?',
		SAVE_CHANGES: 'Grabar',
		CANCEL: 'Cancelar',
		DISPLAY_START_PAGE: '¿Mostrar página de inicio?',
		DISPLAY_END_PAGE: '¿Mostrar paǵina de fin?',

		//List Forms View
		CREATE_A_NEW_FORM: 'Crear formulario',
		CREATE_FORM: 'Crear formulario',
		CREATED_ON: 'Creado en',
		MY_FORMS: 'Mis formularios',
		NAME: 'Nombre',
		LANGUAGE: 'Idioma',
		FORM_PAUSED: 'Formulario pausado',

		//Edit Field Modal
		EDIT_FIELD: 'Editar este campo',
		SAVE_FIELD: 'Grabar',
		ON: 'ON',
		OFF: 'OFF',
		REQUIRED_FIELD: 'Requerido',
		LOGIC_JUMP: 'Salto lógico',
		SHOW_BUTTONS: 'Botones adicionales',
		SAVE_START_PAGE: 'Grabar',

		//Admin Form View
		ARE_YOU_SURE: '¿Estás absolutamente seguro?',
		READ_WARNING: '¡Algo malo ocurrirá si no lees esto!',
		DELETE_WARNING1: 'Esta acción no tiene vuelta atrás. Esto borrará permanentemente el "',
		DELETE_WARNING2: '" formulario y todos los datos asociados.',
		DELETE_CONFIRM: 'Por favor escribí el nombre del formulario para confirmar.',
		I_UNDERSTAND: 'Entiendo las consecuencias y quiero borrarlo.',
		DELETE_FORM_SM: 'Borrar',
		DELETE_FORM_MD: 'Borrar formulario',
		DELETE: 'Borrar',
		FORM: 'Formulario',
		VIEW: 'Vista',
		LIVE: 'Online',
		PREVIEW: 'Vista previa',
		COPY: 'Copiar',
		COPY_AND_PASTE: 'Copiar y pegar esto para agregar su TellForm a su sitio web',
		CHANGE_WIDTH_AND_HEIGHT: 'Cambie los valores de ancho y altura para adaptar el formulario a sus necesidades',
		POWERED_BY: 'Con la tecnlogía de',
		TELLFORM_URL: 'Tu TellForm está en esta URL permanente',

		//Edit Form View
		DISABLED: 'Deshabilitado',
		YES: 'SI',
		NO: 'NO',
		ADD_LOGIC_JUMP: 'Agregar salto lógico',
		ADD_FIELD_LG: 'Click para agregar campo',
		ADD_FIELD_MD: 'Agregar nuevo campo',
		ADD_FIELD_SM: 'Agregar campo',
		EDIT_START_PAGE: 'Editar paǵina de inicio',
		EDIT_END_PAGE: 'Editar página de finalización',
		WELCOME_SCREEN: 'Comienzo',
		END_SCREEN: 'Fin',
		INTRO_TITLE: 'Título',
		INTRO_PARAGRAPH: 'Parágrafo',
		INTRO_BTN: 'Botón de comienzo',
		TITLE: 'Título',
		PARAGRAPH: 'Paragrafo',
		BTN_TEXT: 'Botón para volver atrás',
		BUTTONS: 'Botones',
		BUTTON_TEXT: 'Texto',
		BUTTON_LINK: 'Link',
		ADD_BUTTON: 'Agregar Botón',
		PREVIEW_FIELD: 'Vista previa Pregunta',
		QUESTION_TITLE: 'Título',
		QUESTION_DESCRIPTION: 'Descripción',
		OPTIONS: 'Opciones',
		ADD_OPTION: 'Agregar Opciones',
		NUM_OF_STEPS: 'Cantidad de pasos',
		CLICK_FIELDS_FOOTER: 'Click en los campos para agregar',
		SHAPE: 'Forma',
		IF_THIS_FIELD: 'Si este campo',
		IS_EQUAL_TO: 'es igual a',
		IS_NOT_EQUAL_TO: 'no es igual a',
		IS_GREATER_THAN: 'es mayor que',
		IS_GREATER_OR_EQUAL_THAN: 'es mayor o igual que',
		IS_SMALLER_THAN: 'es menor que',
		IS_SMALLER_OR_EQUAL_THAN: 'is menor o igual que',
		CONTAINS: 'contiene',
		DOES_NOT_CONTAINS: 'no contiene',
		ENDS_WITH: 'termina con',
		DOES_NOT_END_WITH: 'no termina con',
		STARTS_WITH: 'comienza con',
		DOES_NOT_START_WITH: 'no comienza con',
		THEN_JUMP_TO: 'luego salta a',

		//Edit Submissions View
		TOTAL_VIEWS: 'Total de visitas únicas',
		RESPONSES: 'respuestas',
		COMPLETION_RATE: 'Taza de terminación',
		AVERAGE_TIME_TO_COMPLETE: 'Promedio de tiempo de rellenado',

		DESKTOP_AND_LAPTOP: 'Computadora',
		TABLETS: 'Tablets',
		PHONES: 'Móviles',
		OTHER: 'Otros',
		UNIQUE_VISITS: 'Visitas únicas',

		FIELD_TITLE: 'Título de campo',
		FIELD_VIEWS: 'Vistas de campo',
		FIELD_DROPOFF: 'Finalización de campo',
		FIELD_RESPONSES: 'Respuestas de campo',
		DELETE_SELECTED: 'Borrar selección',
		EXPORT_TO_EXCEL: 'Exportar a Excel',
		EXPORT_TO_CSV: 'Exportar a CSV',
		EXPORT_TO_JSON: 'Exportar a JSON',
		PERCENTAGE_COMPLETE: 'Porcentaje de completitud',
		TIME_ELAPSED: 'Tiempo usado',
		DEVICE: 'Dispositivo',
		LOCATION: 'Lugar',
		IP_ADDRESS: 'Dirección IP',
		DATE_SUBMITTED: 'Fecha de envío',
		GENERATED_PDF: 'PDF generado',

		//Design View
		BACKGROUND_COLOR: 'Color de fondo',
		DESIGN_HEADER: 'Cambiar diseño de formulario',
		QUESTION_TEXT_COLOR: 'Color de la pregunta',
		ANSWER_TEXT_COLOR: 'Color de la respuesta',
		BTN_BACKGROUND_COLOR: 'Color de fondo del botón',
		BTN_TEXT_COLOR: 'Color del texto del botón',

		//Admin Tabs
		CREATE_TAB: 'Crear',
		DESIGN_TAB: 'Diseño',
		CONFIGURE_TAB: 'Configuración',
		ANALYZE_TAB: 'Análisis'

	});
}]);

'use strict';

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('en', {
    FORM_SUCCESS: 'Form entry successfully submitted!',
	REVIEW: 'Review',
    BACK_TO_FORM: 'Go back to Form',
	EDIT_FORM: 'Edit this TellForm',
	CREATE_FORM: 'Create this TellForm',
	ADVANCEMENT: '{{done}} out of {{total}} answered',
	CONTINUE_FORM: 'Continue to Form',
	REQUIRED: 'required',
	COMPLETING_NEEDED: '{{answers_not_completed}} answer(s) need completing',
	OPTIONAL: 'optional',
	ERROR_EMAIL_INVALID: 'Please enter a valid email address',
	ERROR_NOT_A_NUMBER: 'Please enter valid numbers only',
	ERROR_URL_INVALID: 'Please a valid url',
	OK: 'OK',
	ENTER: 'press ENTER',
	YES: 'Yes',
	NO: 'No',
	NEWLINE: 'press SHIFT+ENTER to create a newline',
	CONTINUE: 'Continue',
	LEGAL_ACCEPT: 'I accept',
	LEGAL_NO_ACCEPT: 'I don’t accept',
	DELETE: 'Delete',
	CANCEL: 'Cancel',
	SUBMIT: 'Submit',
	UPLOAD_FILE: 'Upload your File',
  TYPE_OR_SELECT_OPTION: 'Type or select an option',
  ABORT_UPLOAD: 'Abort ongoing upload',
  CLEAR_SELECTED_FILES: 'Clear selected files'
  });

}]);

'use strict';

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('fr', {
    FORM_SUCCESS: 'Votre formulaire a été enregistré!',
	REVIEW: 'Incomplet',
    BACK_TO_FORM: 'Retourner au formulaire',
	EDIT_FORM: 'Éditer le Tellform',
	CREATE_FORM: 'Créer un TellForm',
	ADVANCEMENT: '{{done}} complétés sur {{total}}',
	CONTINUE_FORM: 'Aller au formulaire',
	REQUIRED: 'obligatoire',
	COMPLETING_NEEDED: '{{answers_not_completed}} réponse(s) doive(nt) être complétée(s)',
	OPTIONAL: 'facultatif',
	ERROR_EMAIL_INVALID: 'Merci de rentrer une adresse mail valide',
	ERROR_NOT_A_NUMBER: 'Merce de ne rentrer que des nombres',
	ERROR_URL_INVALID: 'Merci de rentrer une url valide',
	OK: 'OK',
	ENTER: 'presser ENTRÉE',
	YES: 'Oui',
	NO: 'Non',
	NEWLINE: 'presser SHIFT+ENTER pour créer une nouvelle ligne',
	CONTINUE: 'Continuer',
	LEGAL_ACCEPT: 'J’accepte',
	LEGAL_NO_ACCEPT: 'Je n’accepte pas',
	DELETE: 'Supprimer',
	CANCEL: 'Réinitialiser',
	SUBMIT: 'Enregistrer',
	UPLOAD_FILE: 'Envoyer un fichier',
	Y: 'O',
	N: 'N'
  });

}]);

'use strict';

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('de', {
	FORM_SUCCESS: 'Ihre Angaben wurden gespeichert.',
	REVIEW: 'Unvollständig',
	BACK_TO_FORM: 'Zurück zum Formular',
	EDIT_FORM: 'Bearbeiten Sie diese TellForm',
	CREATE_FORM: 'Erstellen Sie eine TellForm',
	ADVANCEMENT: '{{done}} von {{total}} beantwortet',
	CONTINUE_FORM: 'Zum Formular',
	REQUIRED: 'verpflichtend',
	COMPLETING_NEEDED: 'Es fehlen/fehtl noch {{answers_not_completed}} Antwort(en)',
	OPTIONAL: 'fakultativ',
	ERROR_EMAIL_INVALID: 'Bitte gültige Mailadresse eingeben',
	ERROR_NOT_A_NUMBER: 'Bitte nur Zahlen eingeben',
	ERROR_URL_INVALID: 'Bitte eine gültige URL eingeben',
	OK: 'Okay',
	ENTER: 'Eingabetaste drücken',
	YES: 'Ja',
	NO: 'Nein',
	NEWLINE: 'Für eine neue Zeile SHIFT+ENTER drücken',
	CONTINUE: 'Weiter',
	LEGAL_ACCEPT: 'Ich akzeptiere',
	LEGAL_NO_ACCEPT: 'Ich akzeptiere nicht',
	DELETE: 'Entfernen',
	CANCEL: 'Canceln',
	SUBMIT: 'Speichern',
	UPLOAD_FILE: 'Datei versenden',
	Y: 'J',
	N: 'N'
  });

}]);

'use strict';

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('it', {
	FORM_SUCCESS: 'Il formulario è stato inviato con successo!',
	REVIEW: 'Incompleto',
	BACK_TO_FORM: 'Ritorna al formulario',
	EDIT_FORM: 'Modifica questo Tellform',
	CREATE_FORM: 'Creare un TellForm',
	ADVANCEMENT: '{{done}} su {{total}} completate',
	CONTINUE_FORM: 'Vai al formulario',
	REQUIRED: 'obbligatorio',
	COMPLETING_NEEDED: '{{answers_not_completed}} risposta/e deve/ono essere completata/e',
	OPTIONAL: 'opzionale',
	ERROR_EMAIL_INVALID: 'Si prega di inserire un indirizzo email valido',
	ERROR_NOT_A_NUMBER: 'Si prega di inserire solo numeri',
	ERROR_URL_INVALID: 'Grazie per inserire un URL valido',
	OK: 'OK',
	ENTER: 'premere INVIO',
	YES: 'Sì',
	NO: 'No',
	NEWLINE: 'premere SHIFT+INVIO per creare una nuova linea',
	CONTINUE: 'Continua',
	LEGAL_ACCEPT: 'Accetto',
	LEGAL_NO_ACCEPT: 'Non accetto',
	DELETE: 'Cancella',
	CANCEL: 'Reset',
	SUBMIT: 'Registra',
	UPLOAD_FILE: 'Invia un file',
	Y: 'S',
	N: 'N'
  });

}]);

'use strict';

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('es', {
	FORM_SUCCESS: '¡El formulario ha sido enviado con éxito!',
	REVIEW: 'Revisar',
	BACK_TO_FORM: 'Regresar al formulario',
	EDIT_FORM: 'Crear un TellForm',
	CREATE_FORM: 'Editar este TellForm',
	ADVANCEMENT: '{{done}} de {{total}} contestadas',
	CONTINUE_FORM: 'Continuar al formulario',
	REQUIRED: 'Información requerida',
	COMPLETING_NEEDED: '{{answers_not_completed}} respuesta(s) necesita(n) ser completada(s)',
	OPTIONAL: 'Opcional',
	ERROR_EMAIL_INVALID: 'Favor de proporcionar un correo electrónico válido',
	ERROR_NOT_A_NUMBER: 'Por favor, introduzca sólo números válidos',
	ERROR_URL_INVALID: 'Favor de proporcionar un url válido',
	OK: 'OK',
	ENTER: 'pulse INTRO',
	YES: 'Si',
	NO: 'No',
	NEWLINE: 'presione SHIFT+INTRO para crear una nueva línea',
	CONTINUE: 'Continuar',
	LEGAL_ACCEPT: 'Acepto',
	LEGAL_NO_ACCEPT: 'No acepto',
	DELETE: 'Eliminar',
	CANCEL: 'Cancelar',
	SUBMIT: 'Registrar',
	UPLOAD_FILE: 'Cargar el archivo',
	Y: 'S',
	N: 'N',
  TYPE_OR_SELECT_OPTION: 'Escriba o seleccione una opción',
  ABORT_UPLOAD: 'Cancelar la subida en curso',
  CLEAR_SELECTED_FILES: 'Borrar los archivos seleccionados'
  });

}]);

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider, Authorization) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/forms');
	}
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', 'Auth', '$state', '$stateParams',
	function($rootScope, Auth, $state, $stateParams) {

		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

		// add previous state property
		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
			$state.previous = fromState;
			//console.log('toState: '+toState.name);

			var statesToIgnore = ['home', 'signin', 'resendVerifyEmail', 'verify', 'signup', 'signup-success', 'forgot', 'reset-invalid', 'reset', 'reset-success'];

			//Redirect to listForms if user is authenticated
			if(statesToIgnore.indexOf(toState.name) > 0){
				if(Auth.isAuthenticated()){
					event.preventDefault(); // stop current execution
					//console.log('go to forms');
					$state.go('listForms'); // go to listForms page
				}
			}
			//Redirect to 'signup' route if user is not authenticated
			else if(toState.name !== 'access_denied' && !Auth.isAuthenticated() && toState.name !== 'submitForm'){
				console.log('go to signup');
				event.preventDefault(); // stop current execution
				$state.go('listForms'); // go to listForms page
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
				//console.log('access denied: '+!authenticator.canAccess(permissions));
				//console.log(permissions);
				if( (permissions !== null) ){
					if( !authenticator.canAccess(permissions) ){
						event.preventDefault();
						//console.log('access denied');
						$state.go('access_denied');
					}
				}
			}
		});
	}]);

'use strict';

angular.module('core').controller('HeaderController', ['$rootScope', '$scope', 'Menus', '$state', 'Auth', 'User', '$window', '$translate', '$locale',
	function ($rootScope, $scope, Menus, $state, Auth, User, $window, $translate, $locale) {

		$rootScope.signupDisabled = $window.signupDisabled;

		$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);

	    $scope.authentication = $rootScope.authentication = Auth;

		$rootScope.languages = $scope.languages = ['en', 'fr', 'es', 'it', 'de'];

		//Set global app language
		if($scope.authentication.isAuthenticated()){
			$rootScope.language = $scope.user.language;
		}else {
			$rootScope.language = $locale.id.substring(0,2);
		}
		$translate.use($rootScope.language);

		$scope.isCollapsed = false;
		$rootScope.hideNav = false;
		$scope.menu = Menus.getMenu('topbar');

	    $scope.signout = function() {
		    var promise = User.logout();
			promise.then(function() {
				Auth.logout();
				Auth.ensureHasCurrentUser(User);
				$scope.user = $rootScope.user = null;
				$state.go('listForms');

				//Refresh view
				$state.reload();
			},
			function(reason) {
			  	console.error('Logout Failed: ' + reason);
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
				if (~this.roles.indexOf('*')) {
					return true;
				} 
				for (var userRoleIndex in user.roles) {
					for (var roleIndex in this.roles) {
						if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
							return true;
						}
					}
				}
				return false;

			} 
			return this.isPublic;
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

(function () {
	'use strict';

	// Create the Socket.io wrapper service
	angular
		.module('core')
		.factory('Socket', Socket);

	Socket.$inject = ['$timeout', '$window'];

	function Socket($timeout, $window) {
		// Connect to Socket.io server
		function connect(url) {
			service.socket = io(url, {'transports': ['websocket', 'polling']});
		}

		// Wrap the Socket.io 'emit' method
		function emit(eventName, data) {
			if (service.socket) {
				service.socket.emit(eventName, data);
			}
		}

		// Wrap the Socket.io 'on' method
		function on(eventName, callback) {
			if (service.socket) {
				service.socket.on(eventName, function (data) {
					$timeout(function () {
						callback(data);
					});
				});
			}
		}

		// Wrap the Socket.io 'removeListener' method
		function removeListener(eventName) {
			if (service.socket) {
				service.socket.removeListener(eventName);
			}
		}
		
		var service = {
			connect: connect,
			emit: emit,
			on: on,
			removeListener: removeListener,
			socket: null
		};

		connect(window.location.protocol+'//'+window.location.hostname);

		return service;

	}
}());

'use strict';

angular.module('core').factory('subdomain', ['$location', function ($location) {
	var host = $location.host();
	if (host.indexOf('.') < 0) {
		return null;
	}
	return host.split('.')[0];
}]);

'use strict';

// Configuring the Forms drop-down menus
angular.module('forms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'My Forms', 'forms', '', '/forms', false);
	}
]).filter('secondsToDateTime', [function() {
	return function(seconds) {
		return new Date(1970, 0, 1).setSeconds(seconds);
	};
}]).filter('formValidity',
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

				var valid_count = fields.filter(function(field){
					if(typeof field === 'object' && field.fieldType !== 'statement' && field.fieldType !== 'rating'){
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
			templateUrl: 'modules/forms/admin/views/list-forms.client.view.html'
  		}).state('submitForm', {
			url: '/forms/:formId',
			templateUrl: 'modules/forms/base/views/submit-form.client.view.html',
			data: {
				hideNav: true
			},
			resolve: {
				Forms: 'Forms',
				myForm: ["Forms", "$stateParams", function (Forms, $stateParams) {
					return Forms.get({formId: $stateParams.formId}).$promise;
				}]
			},
			controller: 'SubmitFormController',
			controllerAs: 'ctrl'
		}).state('viewForm', {
			url: '/forms/:formId/admin',
			templateUrl: 'modules/forms/admin/views/admin-form.client.view.html',
			data: {
				permissions: [ 'editForm' ]
			},
			resolve: {
				Forms: 'Forms',
		        myForm: ["Forms", "$stateParams", function (Forms, $stateParams) {
		            return Forms.get({formId: $stateParams.formId}).$promise;
		        }]
			},
			controller: 'AdminFormController'
		}).state('viewForm.configure', {
			url: '/configure',
			templateUrl: 'modules/forms/admin/views/adminTabs/configure.html'
	    }).state('viewForm.design', {
			url: '/design',
			templateUrl: 'modules/forms/admin/views/adminTabs/design.html'
	    }).state('viewForm.analyze', {
			url: '/analyze',
			templateUrl: 'modules/forms/admin/views/adminTabs/analyze.html'
	    }).state('viewForm.create', {
			url: '/create',
			templateUrl: 'modules/forms/admin/views/adminTabs/create.html'
	    });
	}
]);

(function () {
	'use strict';

	function SendVisitorData() {

		// Create a controller method for sending visitor data
		function send(form, lastActiveIndex) {
			// Create a new message object
			/*var visitorData = {
				referrer: document.referrer,
				isSubmitted: form.submitted,
				formId: form._id,
				lastActiveField: form.form_fields[lastActiveIndex]._id,
				timeElapsed: timeElapsed,
				//@TODO @FIXME: David: Need to make this get the language from the HTTP Header instead
				language: window.navigator.userLanguage || window.navigator.language,
				ipAddr: '',
				deviceType: ''
			};

			$http.get('https://jsonip.com/').success(function(response) {
					visitorData.ipAddr = response['ip']+'';
				}).error(function(error) {
					console.error('Could not get users\'s ip');
				}).then(function(){

					visitorData.userAgent = deviceDetector.raw;

					if(deviceDetector.isTablet()) {
						visitorData.deviceType = 'tablet';
					}else if(deviceDetector.isMobile()){
						visitorData.deviceType = 'phone';
					}else {
						visitorData.deviceType = 'desktop';
					}
					console.log(visitorData.deviceType);
					Socket.emit('form-visitor-data', visitorData);
				});*/

		}

		function init(){
			// Make sure the Socket is connected
			/*if (!Socket.socket) {
				Socket.connect();
			}*/
		}

		var service = {
			send: send
		};

		init();
		return service;

	}
	
	// Create the SendVisitorData service
	angular
		.module('forms')
		.factory('SendVisitorData', SendVisitorData);

	SendVisitorData.$inject = [];

	
}());


'use strict';

angular.module('forms').directive('keyToOption', function(){
	return {
		restrict: 'A',
		scope: {
			field: '='
		},
		link: function($scope, $element, $attrs, $select) {
			$element.bind('keydown keypress', function(event) {

				var keyCode = event.which || event.keyCode;
				var index = parseInt(String.fromCharCode(keyCode))-1;
				//console.log($scope.field);

				if (index < $scope.field.fieldOptions.length) {
					event.preventDefault();
					$scope.$apply(function () {
						$scope.field.fieldValue = $scope.field.fieldOptions[index].option_value;
					});
				}

			});
		}
	};
});

'use strict';

angular.module('forms').directive('keyToTruthy', ['$rootScope', function($rootScope){
	return {
		restrict: 'A',
		scope: {
			field: '='
		},
		link: function($scope, $element, $attrs) {
			$element.bind('keydown keypress', function(event) {
				var keyCode = event.which || event.keyCode;
				var truthyKeyCode = $attrs.keyCharTruthy.charCodeAt(0) - 32;
				var falseyKeyCode = $attrs.keyCharFalsey.charCodeAt(0) - 32;

				if(keyCode === truthyKeyCode ) {
					event.preventDefault();
					$scope.$apply(function() {
						$scope.field.fieldValue = 'true';
					});
				}else if(keyCode === falseyKeyCode){
					event.preventDefault();
					$scope.$apply(function() {
						$scope.field.fieldValue = 'false';
					});
				}
			});
		}
	};
}]);


'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
    $httpProvider.interceptors.push(["$q", "$location", function($q, $location) {
      return {
        responseError: function(response) {
          if( $location.path() !== '/users/me' && response.config){
            if(response.config.url !== '/users/me'){
              console.log('intercepted rejection of ', response.config.url, response.status);
              if (response.status === 401) {
				  console.log($location.path());
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
		
      if (Auth.currentUser && Auth.currentUser.email) {
        $timeout(deferred.resolve);
      }
      else {
        Auth.currentUser = User.getCurrent(
			function() {
			  Auth.login();
			  $timeout(deferred.resolve());
			},
			function() {
			  Auth.logout();
			  $timeout(deferred.reject());
			  $state.go('signin', {reload: true});
			});
      }

      return deferred.promise;
    };
    checkLoggedin.$inject = ["$q", "$timeout", "$state", "User", "Auth"];

	var checkSignupDisabled = function($window, $timeout, $q) {
		var deferred = $q.defer();
		if($window.signupDisabled) {
			$timeout(deferred.reject());
		} else {
			$timeout(deferred.resolve());
		}
		return deferred.promise;
	};
	checkSignupDisabled.$inject = ["$window", "$timeout", "$q"];

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
			resolve: {
				isDisabled: checkSignupDisabled
			},
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signup-success', {
			resolve: {
				isDisabled: checkSignupDisabled
			},
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
		state('verify', {
			resolve: {
				isDisabled: checkSignupDisabled
			},
			url: '/verify/:token',
			templateUrl: 'modules/users/views/verify/verify-account.client.view.html'
		}).
		state('resendVerifyEmail', {
			resolve: {
				isDisabled: checkSignupDisabled
			},
			url: '/verify',
			templateUrl: 'modules/users/views/verify/resend-verify-email.client.view.html'
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
					console.error('loginError: '+error);
				}
			);
	    };

	    $scope.signup = function() {
	        User.signup($scope.credentials).then(
		        function(response) {
		        	$state.go('signup-success');
		        },
		        function(error) {
		        	console.error(error);
					if(error) {
						$scope.error = error;
						console.error(error);
					} else {
						console.error('No response received');
					}
		        }
		    );
	    };

 	}
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$state', 'User',
	function($scope, $stateParams, $state, User) {

		$scope.error = '';

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
					console.log(response);
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

angular.module('users').controller('SettingsController', ['$scope', '$rootScope', '$http', '$state', 'Users', 'Auth',
	function($scope, $rootScope, $http, $state, Users, Auth) {

		$scope.user = Auth.currentUser;

		// Check if there are additional accounts
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}
			return false;
		};

		$scope.cancel = function(){
			$scope.user = Auth.currentUser;
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

		$scope.isResetSent = false;
		$scope.credentials = {};
		$scope.error = '';

		// Submit forgotten password account id
		$scope.resendVerifyEmail = function() {
			// console.log($scope.credentials);
			// console.log($scope.credentials.email);
			User.resendVerifyEmail($scope.credentials.email).then(
				function(response){
					console.log(response);
					$scope.success = response.message;
					$scope.credentials = null;
					$scope.isResetSent = true;
				},
				function(error){
					$scope.error = error;
					$scope.credentials.email = null;
					$scope.isResetSent = false;
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
						$scope.isResetSent = true;
						$scope.credentials.email = null;
					},
					function(error){
						console.log('Error: '+error.message);
						$scope.isResetSent = false;
						$scope.error = error;
						$scope.credentials.email = null;
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
          //console.log('Using local current user.');
          //console.log(service._currentUser);
          return service._currentUser;
        }
        else if ($window.user){
          //console.log('Using cached current user.');
          //console.log($window.user);
          service._currentUser = $window.user;
          return service._currentUser;
        }
        else{
          //console.log('Fetching current user from the server.');
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
      }
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
        $http.post('/auth/signin', credentials).then(function(response) {
            deferred.resolve(response.data);
          }, function(error) {
            deferred.reject(error.data.message || error.data);
          });

        return deferred.promise;
      },
      logout: function() {

        var deferred = $q.defer();
        $http.get('/auth/signout').then(function(response) {
          deferred.resolve(null);
        }, function(error) {
          deferred.reject(error.data.message || error.data);
        });

        return deferred.promise;
      },
      signup: function(credentials) {

        var deferred = $q.defer();
        $http.post('/auth/signup', credentials).then(function(response) {
          // If successful we assign the response to the global user model
          deferred.resolve(response.data);
        }, function(error) {
          deferred.reject(error.data.message || error.data);
        });

        return deferred.promise;
      },

      resendVerifyEmail: function(_email) {

        var deferred = $q.defer();
        $http.post('/auth/verify', {email: _email}).then(function(response) {
          deferred.resolve(response.data);
        }, function(error) {
          deferred.reject(error.data.message || error.data);
        });

        return deferred.promise;
      },

      validateVerifyToken: function(token) {

        //DAVID: TODO: The valid length of a token should somehow be linked to server config values
        //DAVID: TODO: SEMI-URGENT: Should we even be doing this?
        var validTokenRe = /^([A-Za-z0-9]{48})$/g;
        if( !validTokenRe.test(token) ) throw new Error('Error token: '+token+' is not a valid verification token');

        var deferred = $q.defer();
        $http.get('/auth/verify/'+token).then(function(response) {
          deferred.resolve(response.data);
        }, function(error) {
          deferred.reject(error.data);
        });

        return deferred.promise;
      },

      resetPassword: function(passwordDetails, token) {

        var deferred = $q.defer();
        $http.post('/auth/reset/'+token, passwordDetails).then(function(response) {
          deferred.resolve(response);
        }, function(error) {
          deferred.reject(error.data.message || error.data);
        });

        return deferred.promise;
      },

      // Submit forgotten password account id
      askForPasswordReset: function(credentials) {

        var deferred = $q.defer();
        $http.post('/auth/forgot', credentials).then(function(response) {
          // Show user success message and clear form
          deferred.resolve(response.data);
        }, function(error) {
          // Show user error message
          deferred.reject(error.data.message || error.data);
        });

        return deferred.promise;
      }

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
'use strict';

angular.module('core').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('en', {
		MENU: 'MENU',
		SIGNUP_TAB: 'Sign Up',
		SIGNIN_TAB: 'Sign In',
		SIGNOUT_TAB: 'Signout',
		EDIT_PROFILE: 'Edit Profile',
		MY_FORMS: 'My Forms',
		MY_SETTINGS: 'My Settings',
		CHANGE_PASSWORD: 'Change Password'
	});

	$translateProvider.preferredLanguage('en')
		.fallbackLanguage('en')
		.useSanitizeValueStrategy('escape');

}]);

'use strict';

angular.module('core').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('fr', {
		MENU: 'MENU',
		SIGNUP_TAB: 'Créer un Compte',
		SIGNIN_TAB: 'Connexion',
		SIGNOUT_TAB: 'Créer un compte',
		EDIT_PROFILE: 'Modifier Mon Profil',
		MY_FORMS: 'Mes Formulaires',
		MY_SETTINGS: 'Mes Paramètres',
		CHANGE_PASSWORD: 'Changer mon Mot de Pass'
	});
}]);

'use strict';

angular.module('core').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('es', {
		MENU: 'MENU',
		SIGNUP_TAB: 'Registrarse',
		SIGNIN_TAB: 'Entrar',
		SIGNOUT_TAB: 'Salir',
		EDIT_PROFILE: 'Editar Perfil',
		MY_FORMS: 'Mis formularios',
		MY_SETTINGS: 'Mis configuraciones',
		CHANGE_PASSWORD: 'Cambiar contraseña'
	});

}]);

'use strict';

// Forms controller
angular.module('forms').controller('AdminFormController', ['$rootScope', '$window', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$uibModal', 'myForm', '$filter', '$sce',
	function($rootScope, $window, $scope, $stateParams, $state, Forms, CurrentForm, $http, $uibModal, myForm, $filter, $sce) {

		$scope.trustSrc = function (src) {
			return $sce.trustAsResourceUrl(src);
		};

		//Set active tab to Create
		$scope.activePill = 0;

		$scope.copied = false;
		$scope.onCopySuccess = function (e) {
			$scope.copied = true;
		};

		$scope = $rootScope;
		$scope.animationsEnabled = true;
		$scope.myform = myForm;
		$rootScope.saveInProgress = false;

		CurrentForm.setForm($scope.myform);

		$scope.formURL = '/#!/forms/' + $scope.myform._id;

		if ($scope.myform.isLive) {
			if ($window.subdomainsDisabled === true) {
				$scope.actualFormURL = window.location.protocol + '//' + window.location.host + '/view' + $scope.formURL;
			} else {
				if (window.location.host.split('.').length < 3) {
					$scope.actualFormURL = window.location.protocol + '//' + $scope.myform.admin.username + '.' + window.location.host + $scope.formURL;
				} else {
					$scope.actualFormURL = window.location.protocol + '//' + $scope.myform.admin.username + '.' + window.location.host.split('.').slice(1, 3).join('.') + $scope.formURL;
				}
			}
		} else {
			$scope.actualFormURL = window.location.protocol + '//' + window.location.host + $scope.formURL;
		}


		var refreshFrame = $scope.refreshFrame = function(){
			if(document.getElementById('iframe')) {
				document.getElementById('iframe').contentWindow.location.reload();
			}
		};

		$scope.tabData   = [
            {
                heading: $filter('translate')('CONFIGURE_TAB'),
				templateName:   'configure'
            },
            {
                heading: $filter('translate')('ANALYZE_TAB'),
				templateName:   'analyze'
            }
        ];

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
            $scope.deleteModal = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'formDeleteModal.html',
				controller: 'AdminFormController',
				resolve: {
					myForm: function(){
						return $scope.myform;
					}
				}
            });
            $scope.deleteModal.result.then(function (selectedItem) {
            	$scope.selected = selectedItem;
            }, function () {
            	console.log('Modal dismissed at: ' + new Date());
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
                    .then(function(response){
                        console.log('form deleted successfully');

                        $state.go('listForms', {}, {reload: true});

                    }, function(error){
                        console.log('ERROR: Form could not be deleted.');
                        console.error(error);
                    });
            }
        };

        // Update existing Form
        $scope.update = $rootScope.update = function(updateImmediately, data, isDiffed, refreshAfterUpdate, cb){
			refreshFrame();

            var continueUpdate = true;
            if(!updateImmediately){
                continueUpdate = !$rootScope.saveInProgress;
            }

            //Update form **if we are not currently updating** or if **shouldUpdateNow flag is set**
            if(continueUpdate) {
				var err = null;

				if (!updateImmediately) {
					$rootScope.saveInProgress = true;
				}

				if (isDiffed) {
					$scope.updatePromise = $http.put('/forms/' + $scope.myform._id, {changes: data})
						.then(function (response) {

							if (refreshAfterUpdate) $rootScope.myform = $scope.myform = response.data;
							// console.log(response.data);
						}).catch(function (response) {
							console.log('Error occured during form UPDATE.\n');
							// console.log(response.data);
							err = response.data;
						}).finally(function () {
							// console.log('finished updating');
							if (!updateImmediately) {
								$rootScope.saveInProgress = false;
							}

							if ((typeof cb) === 'function') {
								return cb(err);
							}
						});
				} else {
					var dataToSend = data;
					if(dataToSend.analytics && dataToSend.analytics.visitors){
						delete dataToSend.analytics.visitors;
					}
					if(dataToSend.submissions){
						delete dataToSend.submissions;
					}

					$scope.updatePromise = $http.put('/forms/' + $scope.myform._id, {form: dataToSend})
						.then(function (response) {

							if (refreshAfterUpdate) $rootScope.myform = $scope.myform = response.data;

						}).catch(function (response) {
							console.log('Error occured during form UPDATE.\n');
							// console.log(response.data);
							err = response.data;
						}).finally(function () {
							// console.log('finished updating');
							if (!updateImmediately) {
								$rootScope.saveInProgress = false;
							}

							if ((typeof cb) === 'function') {
								return cb(err);
							}
						});
				}
            }
        };


	}
]);

'use strict';

// Forms controller
angular.module('forms').controller('ListFormsController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$uibModal',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http, $uibModal) {

        $scope = $rootScope;
        $scope.forms = {};
        $scope.showCreateModal = false;

		$rootScope.languageRegExp = {
			regExp: /[@!#$%^&*()\-+={}\[\]|\\/'";:`.,~№?<>]+/i,
			test: function(val) {
				return !this.regExp.test(val);
			}
		};

		/*
		 ** DeleteModal Functions
		 */
		$scope.openDeleteModal = function(index){
			$scope.deleteModal = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'deleteModalListForms.html',
				controller:  ["$uibModalInstance", "items", "$scope", function($uibModalInstance, items, $scope) {
					$scope.content = items;

					$scope.cancel = $scope.cancelDeleteModal;

					$scope.deleteForm = function() {
						$scope.$parent.removeForm(items.formIndex);
					};
				}],
				resolve: {
					items: function() {
						return {
							currFormTitle: $scope.myforms[index].title,
							formIndex: index
						};
					}
				}
			});
		};


		$scope.cancelDeleteModal = function(){
			if($scope.deleteModal){
				$scope.deleteModal.dismiss('cancel');
			}
		};

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

        $scope.duplicateForm = function(form_index){
            var form = _.cloneDeep($scope.myforms[form_index]);
            delete form._id;

            $http.post('/forms', {form: form})
                .success(function(data, status, headers){
                    $scope.myforms.splice(form_index+1, 0, data);
                }).error(function(errorResponse){
                    console.error(errorResponse);
                    if(errorResponse === null){
                        $scope.error = errorResponse.data.message;
                    }
                });
        };

        // Create new Form
        $scope.createNewForm = function(){
            // console.log($scope.forms.createForm);

            var form = {};
            form.title = $scope.forms.createForm.title.$modelValue;
            form.language = $scope.forms.createForm.language.$modelValue;

            if($scope.forms.createForm.$valid && $scope.forms.createForm.$dirty){
                $http.post('/forms', {form: form})
                .success(function(data, status, headers){
                    //console.log('new form created');
                    // Redirect after save
                    $scope.goToWithId('viewForm.create', data._id+'');
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
                    //console.log('form deleted successfully');
                    $scope.myforms.splice(form_index, 1);
					$scope.cancelDeleteModal();
                }).error(function(error){
                    //console.log('ERROR: Form could not be deleted.');
                    console.error(error);
                });
        };
    }
]);

'use strict';

angular.module('forms').directive('configureFormDirective', ['$rootScope', '$http', 'Upload', 'CurrentForm',
    function ($rootScope, $http, Upload, CurrentForm) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/configure-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'=',
                user:'=',
                pdfFields:'@',
                formFields:'@'
            },
            controller: ["$scope", function($scope){
                $scope.log = '';
                $scope.languages = $rootScope.languages;

                $scope.resetForm = $rootScope.resetForm;
                $scope.update = $rootScope.update;

            }]
        };
    }
]);

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
            controller: ["$scope", function($scope){

                /*
                **  Initialize scope with variables
                */
        var newField;

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
						windowClass: 'edit-modal-window',
						controller:  ["$uibModalInstance", "$scope", function($uibModalInstance, $scope) {
							$scope.field = curr_field;
							$scope.showLogicJump = false;

							// decides whether field options block will be shown (true for dropdown and radio fields)
							$scope.showAddOptions = function (field){
								if(field.fieldType === 'dropdown' || field.fieldType === 'checkbox' || field.fieldType === 'radio'){
									return true;
								} else {
									return false;
								}
							};

							$scope.validShapes =  [
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

							// add new option to the field
							$scope.addOption = function(currField){
								if(currField.fieldType === 'checkbox' || currField.fieldType === 'dropdown' || currField.fieldType === 'radio'){
									if(!currField.fieldOptions){
										currField.fieldOptions = [];
									}

									var lastOptionID = currField.fieldOptions.length+1;

									// new option's id

									var newOption = {
										'option_id' : Math.floor(100000*Math.random()),
										'option_title' : 'Option '+lastOptionID,
										'option_value' : 'Option ' +lastOptionID
									};

									// put new option into fieldOptions array
									currField.fieldOptions.push(newOption);
								}
							};

							// delete particular option
							$scope.deleteOption = function (currField, option){
								if(currField.fieldType === 'checkbox' || currField.fieldType === 'dropdown' || currField.fieldType === 'radio'){
									for(var i = 0; i < currField.fieldOptions.length; i++){
										if(currField.fieldOptions[i].option_id === option.option_id){

											currField.fieldOptions.splice(i, 1);
											break;
										}
									}
								}
							};

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

							// decides whether field options block will be shown (true for dropdown and radio fields)
							$scope.showRatingOptions = function (field){
								if(field.fieldType === 'rating'){
									return true;
								} else {
									return false;
								}
							};

							$scope.saveField = function(){

								$scope.myform.form_fields.push(curr_field);
								$scope.$parent.update(false, $scope.$parent.myform, false, true, function(){
									$uibModalInstance.close();
								});
							};
							$scope.cancel = function(){
								$uibModalInstance.close();
							};
						}]
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
						controller:  ["$uibModalInstance", "$scope", function($uibModalInstance, $scope) {

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
								$scope.$parent.update(false, $scope.$parent.myform, false, true, function(){
									$uibModalInstance.close();
								});
							};
							$scope.cancel = function(){
								$uibModalInstance.close();
							};
						}]
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
						controller:  ["$uibModalInstance", "$scope", function($uibModalInstance, $scope) {

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
								$scope.$parent.update(false, $scope.$parent.myform, false, true, function(){
									$uibModalInstance.close();
								});
							};
							$scope.cancel = function(){
								$uibModalInstance.close();
							};
						}]
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
						logicJump: {}
                    };

					if(fieldType === 'rating'){
						newField.ratingOptions = {
							steps: 1,
							shape: 'Heart'
						};
						newField.fieldValue = '0';
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

                // Delete particular field on button click
                $scope.deleteField = function (field_index) {
                    $scope.myform.form_fields.splice(field_index, 1);
					$scope.update(false, $scope.myform, false, true, null);
                };

                $scope.duplicateField = function(field_index){
                    var currField = _.cloneDeep($scope.myform.form_fields[field_index]);
                    currField._id = 'cloned'+_.uniqueId();
                    currField.title += ' copy';

                    //Insert field at selected index
                    $scope.myform.form_fields.splice(field_index+1, 0, currField);
					$scope.update(false, $scope.myform, false, true, null);
                };

				//Populate AddField with all available form field types
				$scope.addField = {};
				$scope.addField.types = FormFields.types;

				$scope.addField.types.forEach(function(type){
					type.lastAddedID = 1;
					return type;
				});

			}]
        };
    }
]);

'use strict';

angular.module('forms').directive('editSubmissionsFormDirective', ['$rootScope', '$http', 'Forms', '$stateParams', '$interval',
    function ($rootScope, $http, Forms, $stateParams, $interval) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/edit-submissions-form.client.view.html',
            restrict: 'E',
            scope: {
                user:'=',
		myform: '='
            },
            controller: ["$scope", function($scope){

                $scope.table = {
                    masterChecker: false,
                    rows: []
                };

				$scope.table.rows = [];

				var initController = function(){

					Forms.get({
						formId: $stateParams.formId
					}, function(form){
						$scope.myform = form;
						var defaultFormFields = _.cloneDeep($scope.myform.form_fields);

						var submissions = $scope.myform.submissions || [];

						//Iterate through form's submissions
						for(var i = 0; i < submissions.length; i++){
							for(var x = 0; x < submissions[i].form_fields; x++){
								var oldValue = submissions[i].form_fields[x].fieldValue || '';
								submissions[i].form_fields[x] =  _.merge(defaultFormFields, submissions[i].form_fields);
								submissions[i].form_fields[x].fieldValue = oldValue;
							}
							submissions[i].selected = false;
						}

						$scope.table.rows = submissions;

						/*
						 ** Analytics Functions
						 */

						$scope.AverageTimeElapsed = (function(){
							var totalTime = 0;
							var numSubmissions = $scope.table.rows.length;

							for(i=0; i<$scope.table.rows.length; i++){
								totalTime += $scope.table.rows[i].timeElapsed;
							}

							if(numSubmissions === 0) {
								return 0;
							}

							return (totalTime/numSubmissions).toFixed(0);
						})();

						$scope.DeviceStatistics = (function(){
							var newStatItem = function(){
								return {
									visits: 0,
									responses: 0,
									completion: 0,
									average_time: 0,
									total_time: 0
								};
							};

							var stats = {
								desktop: newStatItem(),
								tablet: newStatItem(),
								phone: newStatItem(),
								other: newStatItem()
							};

							if($scope.myform.analytics && $scope.myform.analytics.visitors) {
								var visitors = $scope.myform.analytics.visitors;
								for (i = 0; i < visitors.length; i++) {
									var visitor = visitors[i];
									var deviceType = visitor.deviceType;

									stats[deviceType].visits++;

									stats[deviceType].total_time = stats[deviceType].total_time + visitor.timeElapsed;

									stats[deviceType].average_time = (stats[deviceType].total_time / stats[deviceType].visits).toFixed(0);
									if(!stats[deviceType].average_time) {
										stats[deviceType].average_time = 0;
									}
									
									if (visitor.isSubmitted) { 
										stats[deviceType].responses++;
									}

									stats[deviceType].completion = (stats[deviceType].responses / stats[deviceType].visits).toFixed(0);
									if(!stats[deviceType].completion) {
										stats[deviceType].completion = 0;
									}
								}
							}

							return stats;
						})();

					});

				};
				initController();

				var updateFields = $interval(initController, 2000);

				$scope.$on('$destroy', function() {
					if (updateFields) {
						$interval.cancel($scope.updateFields);
					}
				});

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
                $scope.toggleObjSelection = function($event) {
                    $event.stopPropagation();
                };
                $scope.rowClicked = function(row_index) {
                   $scope.table.rows[row_index].selected = !$scope.table.rows[row_index].selected;
                };

                /*
                * Form Submission Methods
                */

                //Delete selected submissions of Form
                $scope.deleteSelectedSubmissions = function(){

                    var delete_ids = _.chain($scope.table.rows).filter(function(row){
                        return !!row.selected;
                    }).pluck('_id').value();

                    $http({ url: '/forms/'+$scope.myform._id+'/submissions',
                            method: 'DELETE',
                            data: {deleted_submissions: delete_ids},
                            headers: {'Content-Type': 'application/json;charset=utf-8'}
                        }).success(function(data, status){
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

					angular.element('#table-submission-data').tableExport({type: type, escape:false});
                };

            }]
        };
    }
]);

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
		    }
		];
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

// Configuring the Forms drop-down menus
angular.module('forms').value('supportedFields', [
	'textfield',
	'textarea',
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
]);

'use strict';

// SubmitForm controller
angular.module('forms').controller('SubmitFormController', [
	'$scope', '$rootScope', '$state', '$translate', 'myForm', 'Auth',
	function($scope, $rootScope, $state, $translate, myForm, Auth) {
		$scope.authentication = Auth;
		$scope.myform = myForm;

		$translate.use(myForm.language);

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

angular.module('forms').directive('fieldIconDirective', function() {

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
        }]
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

angular.module('forms').directive('fieldDirective', ['$http', '$compile', '$rootScope', '$templateCache', 'supportedFields',
    function($http, $compile, $rootScope, $templateCache, supportedFields) {

    var getTemplateUrl = function(fieldType) {
        var type = fieldType;

        var supported_fields = [
            'textfield',
            'textarea',
			'file',
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

        var templateUrl = 'modules/forms/base/views/directiveViews/field/';

		if (__indexOf.call(supportedFields, type) >= 0) {
            templateUrl = templateUrl+type+'.html';
        }
   		return $templateCache.get(templateUrl);
    };

    return {
        template: '<div>{{field.title}}</div>',
        restrict: 'E',
		scope: {
            field: '=',
            required: '&',
            design: '=',
            index: '=',
			forms: '='
        },
        link: function(scope, element) {

			$rootScope.chooseDefaultOption = scope.chooseDefaultOption = function(type) {
				if(type === 'yes_no'){
					scope.field.fieldValue = 'true';
				}else if(type === 'rating'){
					scope.field.fieldValue = 0;
				}else if(scope.field.fieldType === 'radio'){
					console.log(scope.field);
					scope.field.fieldValue = scope.field.fieldOptions[0].option_value;
					console.log(scope.field.fieldValue);
				}else if(type === 'legal'){
					scope.field.fieldValue = 'true';
					$rootScope.nextField();
				}
			};

            scope.setActiveField = $rootScope.setActiveField;

			console.log(scope);
            //Set format only if field is a date
            if(scope.field.fieldType === 'date'){
                scope.dateOptions = {
                    changeYear: true,
                    changeMonth: true,
                    altFormat: 'mm/dd/yyyy',
                    yearRange: '1900:-0',
                    defaultDate: 0
                };
            }

            var fieldType = scope.field.fieldType;

			if(scope.field.fieldType === 'number' || scope.field.fieldType === 'textfield' || scope.field.fieldType === 'email' || scope.field.fieldType === 'link'){
				switch(scope.field.fieldType){
					case 'textfield':
						scope.input_type = 'text';
						break;
					case 'email':
						scope.input_type = 'email';
						scope.placeholder = 'joesmith@example.com';
						break;
					case 'number':
                        scope.input_type = 'text';
						scope.validateRegex = /^-?\d+$/;
                        break;
                    default:
						scope.input_type = 'url';
						scope.placeholder = 'http://example.com';
						break;
				}
				fieldType = 'textfield';
			}

            var template = getTemplateUrl(fieldType);
           	element.html(template).show();
            var output = $compile(element.contents())(scope);
        }
    };
}]);

'use strict';

//TODO: DAVID: Need to refactor this
angular.module('forms').directive('onEnterKey', ['$rootScope', function($rootScope){
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs) {
			$element.bind('keydown keypress', function(event) {

				var keyCode = event.which || event.keyCode;

				var onEnterKeyDisabled = false;
				if($attrs.onEnterKeyDisabled !== null) onEnterKeyDisabled = $attrs.onEnterKeyDisabled;

				if(keyCode === 13 && !event.shiftKey && !onEnterKeyDisabled) {
					event.preventDefault();
					$rootScope.$apply(function() {
						$rootScope.$eval($attrs.onEnterKey);
					});
				}
			});
		}
	};
}]).directive('onTabKey', ['$rootScope', function($rootScope){
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs) {
			$element.bind('keydown keypress', function(event) {

				var keyCode = event.which || event.keyCode;

				if(keyCode === 9 && !event.shiftKey) {

					event.preventDefault();
					$rootScope.$apply(function() {
						$rootScope.$eval($attrs.onTabKey);
					});
				}
			});
		}
	};
}]).directive('onEnterOrTabKey', ['$rootScope', function($rootScope){
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs) {
			$element.bind('keydown keypress', function(event) {

				var keyCode = event.which || event.keyCode;

				if((keyCode === 13 || keyCode === 9) && !event.shiftKey) {
					event.preventDefault();
					$rootScope.$apply(function() {
						$rootScope.$eval($attrs.onEnterOrTabKey);
					});
				}
			});
		}
	};
}]).directive('onTabAndShiftKey', ['$rootScope', function($rootScope){
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs) {
			$element.bind('keydown keypress', function(event) {

				var keyCode = event.which || event.keyCode;

				if(keyCode === 9 && event.shiftKey) {
					event.preventDefault();
					$rootScope.$apply(function() {
						$rootScope.$eval($attrs.onTabAndShiftKey);
					});
				}
			});
		}
	};
}]);

'use strict';

angular.module('forms').directive('onFinishRender', ["$rootScope", function ($rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
			
            //Don't do anything if we don't have a ng-repeat on the current element
            if(!element.attr('ng-repeat') && !element.attr('data-ng-repeat')){
                return;
            }

            var broadcastMessage = attrs.onFinishRender || 'ngRepeat';

            if(scope.$first && !scope.$last) {
                scope.$evalAsync(function () {
                    $rootScope.$broadcast(broadcastMessage+' Started');
                });
            } else if(scope.$last) {
            	scope.$evalAsync(function () {
            	    $rootScope.$broadcast(broadcastMessage+' Finished');
                });
            }
        }
    };
}]);

'use strict';


angular.module('forms').directive('submitFormDirective', ['$http', 'TimeCounter', '$filter', '$rootScope', 'Auth', 'SendVisitorData',
    function ($http, TimeCounter, $filter, $rootScope, Auth, SendVisitorData) {
        return {
            templateUrl: 'modules/forms/base/views/directiveViews/form/submit-form.client.view.html',
			restrict: 'E',
            scope: {
                myform:'='
            },
            controller: ["$document", "$window", "$scope", function($document, $window, $scope){
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
								console.log('\n\n\n\n\nSUBMITTING PROMISE');
								console.log(data);
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

//Forms service used for communicating with the forms REST endpoints
angular.module('forms').factory('Forms', ['$resource', 'FORM_URL',
	function($resource, FORM_URL) {
		return $resource(FORM_URL, {
			formId: '@_id'
		}, {
			'query' : {
				method: 'GET',
				isArray: true
			},
			'get' : {
				method: 'GET',
				transformResponse: function(data, header) {
		          	var form = angular.fromJson(data);

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

(function () {
	'use strict';


	function Socket($timeout, $window) {
		
		var service;
		
		// Connect to Socket.io server
		function connect(url) {
			service.socket = io(url, {'transports': ['websocket', 'polling']});
		}

		// Wrap the Socket.io 'emit' method
		function emit(eventName, data) {
			if (service.socket) {
				service.socket.emit(eventName, data);
			}
		}

		// Wrap the Socket.io 'on' method
		function on(eventName, callback) {
			if (service.socket) {
				service.socket.on(eventName, function (data) {
					$timeout(function () {
						callback(data);
					});
				});
			}
		}

		// Wrap the Socket.io 'removeListener' method
		function removeListener(eventName) {
			if (service.socket) {
				service.socket.removeListener(eventName);
			}
		}
		
		service = {
			connect: connect,
			emit: emit,
			on: on,
			removeListener: removeListener,
			socket: null
		};

		var url = '';
		if($window.socketPort && $window.socketUrl){
			url = $window.socketUrl + ':' + $window.socketPort;
		} else if ($window.socketUrl && !$window.socketUrl){
			url = $window.socketUrl;
		} else if ($window.socketPort){
			url = window.location.protocol+'//'+window.location.hostname + ':' + $window.socketPort;
		} else {
			url = window.location.protocol+'//'+window.location.hostname;
		}
		connect(url);

		return service;
	}
	
	// Create the Socket.io wrapper service
	angular.module('forms')
		.factory('Socket', Socket);

	Socket.$inject = ['$timeout', '$window'];

}());

'use strict';

angular.module('forms').service('TimeCounter', [
	function(){
		var _startTime, _endTime = null, that=this;

		this.timeSpent = 0;

		this.restartClock = function(){
			_startTime = Date.now();
			_endTime = null;
			// console.log('Clock Started');
		};

		this.getTimeElapsed = function(){
			if(_startTime) {
				return Math.abs(Date.now().valueOf() - _startTime.valueOf()) / 1000;
			}
		};

		this.stopClock = function(){
			if(_startTime && _endTime === null){
				_endTime = Date.now();
				this.timeSpent = Math.abs(_endTime.valueOf() - _startTime.valueOf())/1000;
				this._startTime = this._endTime = null;

				return this.timeSpent;
			}else{
				return new Error('Clock has not been started');
			}
		};

		this.clockStarted = function(){
			return !!this._startTime;
		};

	}
]);

'use strict';

angular.module('users').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('en', {
		ACCESS_DENIED_TEXT: 'You need to be logged in to access this page',
		USERNAME_OR_EMAIL_LABEL: 'Username or Email',
		USERNAME_LABEL: 'Username',
		PASSWORD_LABEL: 'Password',
		CURRENT_PASSWORD_LABEL: 'Current Password',
		NEW_PASSWORD_LABEL: 'New Password',
		VERIFY_PASSWORD_LABEL: 'Verify Password',
		UPDATE_PASSWORD_LABEL: 'Update Password',
		FIRST_NAME_LABEL: 'First Name',
		LAST_NAME_LABEL: 'Last Name',
		LANGUAGE_LABEL: 'Language',
		EMAIL_LABEL: 'Email',

		SIGNUP_ACCOUNT_LINK: 'Don\'t have an account? Sign up here',
		SIGN_IN_ACCOUNT_LINK: 'Already have an account? Sign in here',
		SIGNUP_HEADER_TEXT: 'Sign up',
		SIGNIN_HEADER_TEXT: 'Sign in',

		SIGNUP_ERROR_TEXT: 'Couldn\'t complete registration due to errors',
		ENTER_ACCOUNT_EMAIL: 'Enter your account email.',
		RESEND_VERIFICATION_EMAIL: 'Resend Verification Email',
		SAVE_CHANGES: 'Save Changes',
		CANCEL_BTN: 'Cancel',

		EDIT_PROFILE: 'Edit your profile',
		UPDATE_PROFILE_BTN: 'Update Profile',
		PROFILE_SAVE_SUCCESS: 'Profile saved successfully',
		PROFILE_SAVE_ERROR: 'Could\'t Save Your Profile.',
		CONNECTED_SOCIAL_ACCOUNTS: 'Connected social accounts',
		CONNECT_OTHER_SOCIAL_ACCOUNTS: 'Connect other social accounts',

		FORGOT_PASSWORD_LINK: 'Forgot your password?',
		REVERIFY_ACCOUNT_LINK: 'Resend your verification email',

		SIGNIN_BTN: 'Sign in',
		SIGNUP_BTN: 'Sign up',
		SAVE_PASSWORD_BTN: 'Save Password',

		SUCCESS_HEADER: 'Signup Successful',
		SUCCESS_TEXT: 'You’ve successfully registered an account at TellForm.',
		VERIFICATION_EMAIL_SENT: 'Verification Email has been Sent',
		VERIFICATION_EMAIL_SENT_TO: 'A verification email has been sent to',
		NOT_ACTIVATED_YET: 'But your account is not activated yet',
		BEFORE_YOU_CONTINUE: 'Before you continue, make sure to check your email for our verification. If you don’t receive it within 24h drop us a line at ',
		CHECK_YOUR_EMAIL: 'Check your email and click on the activation link to activate your account. If you have any questions drop us a line at',
		CONTINUE: 'Continue',

		PASSWORD_RESTORE_HEADER: 'Restore your password',
		ENTER_YOUR_EMAIL: 'Enter your account email.',
		SUBMIT_BTN: 'Submit',

		ASK_FOR_NEW_PASSWORD: 'Ask for new password reset',
		PASSWORD_RESET_INVALID: 'Password reset is invalid',
		PASSWORD_RESET_SUCCESS: 'Passport successfully reset',
		PASSWORD_CHANGE_SUCCESS: 'Passport successfully changed',
		RESET_PASSWORD: 'Reset your password',
		CHANGE_PASSWORD: 'Change your password',

		CONTINUE_TO_LOGIN: 'Continue to login page',

		VERIFY_SUCCESS: 'Account successfully activated',
		VERIFY_ERROR: 'Verification link is invalid or has expired'
	});

	$translateProvider.preferredLanguage('en')
		.fallbackLanguage('en')
		.useSanitizeValueStrategy('escape');

}]);

'use strict';

angular.module('users').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('fr', {
		ACCESS_DENIED_TEXT: 'Vouz n’êtes pas autorisé à accéder à cette page.',
		USERNAME_LABEL: 'Nom d’utilisateur',
		PASSWORD_LABEL: 'Mot de Passe',
		CURRENT_PASSWORD_LABEL: 'Mot de passe actuel',
		NEW_PASSWORD_LABEL: 'Nouveau Mot de Passe',
		VERIFY_PASSWORD_LABEL: 'Vérifier le mot de passe',
		UPDATE_PASSWORD_LABEL: 'Mettre à jour le mot de passe',
		FIRST_NAME_LABEL: 'Prénom',
		LAST_NAME_LABEL: 'Nom',
		LANGUAGE_LABEL: 'Langue',
		EMAIL_LABEL: 'Email',

		UPDATE_PROFILE_BTN: 'Modifier le Profil',
		PROFILE_SAVE_SUCCESS: 'Profil enregistré avec succès',
		PROFILE_SAVE_ERROR: 'Erreur: impossible d’enregistrer votre Profile.',

		FORGOT_PASSWORD_LINK: 'Mot de passe oublié ?',
		REVERIFY_ACCOUNT_LINK: 'Re-envoyez un email de vérification',

		SIGNIN_BTN: 'Connexion',
		SIGNUP_BTN: 'Créer un compte',
		SAVE_PASSWORD_BTN: 'Enregistrer votre nouveau Mot de Passe',

		SUCCESS_HEADER: 'Votre Compte a été enregistré !',
		SUCCESS_TEXT: 'Votre compte Tellform a été crée avec succès.',
		VERIFICATION_EMAIL_SENT: 'Un email de verification a été envoyer à',
		NOT_ACTIVATED_YET: 'Mais votre compte n\'est pas activé',
		BEFORE_YOU_CONTINUE: 'Avant de continuer, vous devez valider votre adresse mail. Merci de vérifier votre boite mail. Si vous ne l’avez pas reçu dans les prochaines 24h, contactez-nous a ',
		CHECK_YOUR_EMAIL: 'Vérifiez vos emails, et cliquez sur le lien de validation pour activer votre compte. Si vous avez une question contactez-nous à',

		PASSWORD_RESTORE_HEADER: 'Mot de passe perdu',
		ENTER_YOUR_EMAIL: 'Entrer votre email',
		SUBMIT_BTN: 'Enregistrer',

		ASK_FOR_NEW_PASSWORD: 'Demander un nouveau mot de pass ',
		PASSWORD_RESET_INVALID: 'Le nouveau mot de passe est invalid',
		PASSWORD_RESET_SUCCESS: 'Mot de passe réinitialisé avec succès',
		PASSWORD_CHANGE_SUCCESS: 'Mot de passe enregistré avec succès',

		CONTINUE_TO_LOGIN: 'Allez à la page de connexion',

		VERIFY_SUCCESS: 'Votre compte est activé !',
		VERIFY_ERROR: 'Le lien de vérification est invalide ou à expiré'
	});

}]);

'use strict';

angular.module('users').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('es', {
		ACCESS_DENIED_TEXT: 'Tenés que estar logueado para acceder a esta página',
		USERNAME_OR_EMAIL_LABEL: 'Usuario o Email',
		USERNAME_LABEL: 'Usuario',
		PASSWORD_LABEL: 'Contraseña',
		CURRENT_PASSWORD_LABEL: 'Contraseña actual',
		NEW_PASSWORD_LABEL: 'Nueva contraseña',
		VERIFY_PASSWORD_LABEL: 'Verificar contraseña',
		UPDATE_PASSWORD_LABEL: 'Actualizar contraseña',
		FIRST_NAME_LABEL: 'Nombre',
		LAST_NAME_LABEL: 'Apellido',
		LANGUAGE_LABEL: 'Idioma',
		EMAIL_LABEL: 'Email',

		SIGNUP_ACCOUNT_LINK: '¿No tenés cuenta? Resgistrate acá',
		SIGN_IN_ACCOUNT_LINK: '¿Ya tenés cuenta? Entra acá',
		SIGNUP_HEADER_TEXT: 'Registrar',
		SIGNIN_HEADER_TEXT: 'Entrar',

		SIGNUP_ERROR_TEXT: 'No se pudo terminar la registración por errores',
		ENTER_ACCOUNT_EMAIL: 'Ingresá tu correo electrónico.',
		RESEND_VERIFICATION_EMAIL: 'Reenviar email de verificación',
		SAVE_CHANGES: 'Grabar cambios',
		CANCEL_BTN: 'Cancelar',

		EDIT_PROFILE: 'Editar perfil',
		UPDATE_PROFILE_BTN: 'Actualizar perfil',
		PROFILE_SAVE_SUCCESS: 'Perfil actualizado satisfactoriamente',
		PROFILE_SAVE_ERROR: 'No se pudo grabar el perfil.',
		CONNECTED_SOCIAL_ACCOUNTS: 'Redes sociales conectadas',
		CONNECT_OTHER_SOCIAL_ACCOUNTS: 'Conectar otras redes sociales',

		FORGOT_PASSWORD_LINK: '¿Olvidaste la contraseña?',
		REVERIFY_ACCOUNT_LINK: 'Reenviar email de verificación',

		SIGNIN_BTN: 'Entrar',
		SIGNUP_BTN: 'Registrarse',
		SAVE_PASSWORD_BTN: 'Grabar contraseña',

		SUCCESS_HEADER: 'Ingresaste exitosamente',
		SUCCESS_TEXT: 'Registraste exitosamente una cuenta en TellForm.',
		VERIFICATION_EMAIL_SENT: 'El email de verificación fue enviado exitosamente',
		VERIFICATION_EMAIL_SENT_TO: 'Un email de verificación fue enviado a',
		NOT_ACTIVATED_YET: 'Tu cuenta aún no está activa',
		BEFORE_YOU_CONTINUE: 'Antes de continuar asegurate de leer el email de verificación que te enviamos. Si no lo recibís en 24hs escribinos a ',
		CHECK_YOUR_EMAIL: 'Leé el email y hacé click en el link de activación para activar la cuenta. Si tenés alguna pregunta escribinos a ',
		CONTINUE: 'Continuar',

		PASSWORD_RESTORE_HEADER: 'Restaurar la contraseña',
		ENTER_YOUR_EMAIL: 'Ingresá el email de tu cuenta.',
		SUBMIT_BTN: 'Enviar',

		ASK_FOR_NEW_PASSWORD: 'Pedir reseteo de contraseña',
		PASSWORD_RESET_INVALID: 'El reseteo de la contraseña es inválido',
		PASSWORD_RESET_SUCCESS: 'Contraseña exitosamente reseteada',
		PASSWORD_CHANGE_SUCCESS: 'Contraseña exitosamente cambiada',
		RESET_PASSWORD: 'Resetear contraseña',
		CHANGE_PASSWORD: 'Cambiar contraseña',

		CONTINUE_TO_LOGIN: 'Ir a la página de ingreso',

		VERIFY_SUCCESS: 'Cuenta activada exitosamente',
		VERIFY_ERROR: 'El link de verificación es inválido o inexistente'
	});
}]);
