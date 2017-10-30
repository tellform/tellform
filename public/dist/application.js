'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(["$locationProvider", function($locationProvider) {
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

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'TellForm';
	var applicationModuleVendorDependencies = ['duScroll', 'ui.select', 'ngSanitize', 'vButton', 'ngResource', 'TellForm.templates', 'ui.router', 'ui.bootstrap', 'ui.utils', 'pascalprecht.translate', 'view-form'];

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

// Configuring the Forms drop-down menus
angular.module('view-form')
.filter('formValidity', function(){
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
				if(typeof field === 'object' && field.fieldType !== 'rating' && field.fieldType !== 'statement'){
					return !!(field.fieldValue);
				} else if (field.fieldType === 'rating'){
					return true;
				}

			}).length;
			return valid_count - (formObj.form_fields.length - formObj.visible_form_fields.length);
		}
		return 0;
	};
});

angular.module('view-form').value('supportedFields', [
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

angular.module('view-form').constant('VIEW_FORM_URL', '/forms/:formId/render');


'use strict';

angular.module('view-form').config(["$translateProvider", function ($translateProvider) {

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
	Y: 'Y',
	N: 'N',
	OPTION_PLACEHOLDER: 'Type or select an option',
	ADD_NEW_LINE_INSTR: 'Press SHIFT+ENTER to add a newline',
	ERROR: 'Error',

	FORM_404_HEADER: '404 - Form Does Not Exist',
	FORM_404_BODY: 'The form you are trying to access does not exist. Sorry about that!',

  	FORM_UNAUTHORIZED_HEADER: 'Not Authorized to Access Form',
  	FORM_UNAUTHORIZED_BODY1: 'The form you are trying to access is currently private and not accesible publically.',
  	FORM_UNAUTHORIZED_BODY2: 'If you are the owner of the form, you can set it to "Public" in the "Configuration" panel in the form admin.',
  });

  $translateProvider.preferredLanguage('en')
  	.fallbackLanguage('en')
	.useSanitizeValueStrategy('escape');

}]);

'use strict';

angular.module('view-form').config(["$translateProvider", function ($translateProvider) {

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
	N: 'N',
	OPTION_PLACEHOLDER: 'Tapez ou sélectionnez une option',
	ADD_NEW_LINE_INSTR: 'Appuyez sur MAJ + ENTRÉE pour ajouter une nouvelle ligne',
	ERROR: 'Erreur',
	
	FORM_404_HEADER: '404 - Le formulaire n\'existe pas',
	FORM_404_BODY: 'Le formulaire auquel vous essayez d\'accéder n\'existe pas. Désolé pour ça!',
  
	FORM_UNAUTHORIZED_HEADER: 'Non autorisé à accéder au formulaire',
   FORM_UNAUTHORIZED_BODY1: 'Le formulaire auquel vous essayez d\'accéder est actuellement privé et inaccessible publiquement.',
   FORM_UNAUTHORIZED_BODY2: 'Si vous êtes le propriétaire du formulaire, vous pouvez le définir sur "Public" dans le panneau "Configuration" du formulaire admin.',
  });

}]);

'use strict';

angular.module('view-form').config(["$translateProvider", function ($translateProvider) {

  $translateProvider.translations('de', {
	FORM_SUCCESS: 'Ihre Angaben wurden gespeichert.',
	REVIEW: 'Unvollständig',
	BACK_TO_FORM: 'Zurück zum Formular',
	EDIT_FORM: 'Bearbeiten Sie diese TellForm',
	CREATE_FORM: 'Dieses TellForm erstellen',
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
	LEGAL_ACCEPT: 'I accept',
	LEGAL_NO_ACCEPT: 'I don’t accept',
	DELETE: 'Entfernen',
	CANCEL: 'Canceln',
	SUBMIT: 'Speichern',
	UPLOAD_FILE: 'Datei versenden',
	Y: 'J',
	N: 'N',
	OPTION_PLACEHOLDER: 'Geben oder wählen Sie eine Option aus',
	ADD_NEW_LINE_INSTR: 'Drücken Sie UMSCHALT + EINGABETASTE, um eine neue Zeile hinzuzufügen',
  	ERROR: 'Fehler',
  	
  	FORM_404_HEADER: '404 - Formular existiert nicht',
  	FORM_404_BODY: 'Das Formular, auf das Sie zugreifen möchten, existiert nicht. Das tut mir leid!',
  	
  	FORM_UNAUTHORIZED_HEADER: 'Nicht zum Zugriffsformular berechtigt\' ',
   FORM_UNAUTHORIZED_BODY1: 'Das Formular, auf das Sie zugreifen möchten, ist derzeit privat und nicht öffentlich zugänglich.',
   FORM_UNAUTHORIZED_BODY2: 'Wenn Sie der Eigentümer des Formulars sind, können Sie es im Fenster "Konfiguration" im Formular admin auf "Öffentlich" setzen.',
  });

}]);

'use strict';

angular.module('view-form').config(["$translateProvider", function ($translateProvider) {

  $translateProvider.translations('it', {
	FORM_SUCCESS: 'Il formulario è stato inviato con successo!',
	REVIEW: 'Incompleto',
	BACK_TO_FORM: 'Ritorna al formulario',
	EDIT_FORM: 'Modifica questo TellForm',
	CREATE_FORM: 'Crea questo TellForm',
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
	LEGAL_ACCEPT: 'I accept',
	LEGAL_NO_ACCEPT: 'I don’t accept',
	DELETE: 'Cancella',
	CANCEL: 'Reset',
	SUBMIT: 'Registra',
	UPLOAD_FILE: 'Invia un file',
	Y: 'S',
	N: 'N',
	OPTION_PLACEHOLDER: 'Digitare o selezionare un\'opzione',
	ADD_NEW_LINE_INSTR: 'Premere SHIFT + INVIO per aggiungere una nuova riga',
  	ERROR: 'Errore',
  	
  	FORM_404_HEADER: '404 - Il modulo non esiste',
  	FORM_404_BODY: 'La forma che stai cercando di accedere non esiste. Ci dispiace!',
  
  	FORM_UNAUTHORIZED_HEADER: 'Non autorizzato per accedere al modulo',
   	FORM_UNAUTHORIZED_BODY1: 'Il modulo che si sta tentando di accedere è attualmente privato e non accessibile in pubblico.',
   	FORM_UNAUTHORIZED_BODY2: 'Se sei il proprietario del modulo, puoi impostarlo su "Pubblico" nel pannello "Configurazione" nell\'amministratore di moduli.',
  });

}]);

'use strict';

angular.module('view-form').config(["$translateProvider", function ($translateProvider) {

	  $translateProvider.translations('es', {
		FORM_SUCCESS: '¡El formulario ha sido enviado con éxito!',
		REVIEW: 'Revisar',
		BACK_TO_FORM: 'Regresar al formulario',
		EDIT_FORM: 'Editar este TellForm',
		CREATE_FORM: 'Crear este TellForm',
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
		LEGAL_ACCEPT: 'Yo acepto',
		LEGAL_NO_ACCEPT: 'Yo no acepto',
		DELETE: 'Eliminar',
		CANCEL: 'Cancelar',
		SUBMIT: 'Registrar',
		UPLOAD_FILE: 'Cargar el archivo',
		Y: 'S',
		N: 'N',
		OPTION_PLACEHOLDER: 'Escriba o seleccione una opción',
		ADD_NEW_LINE_INSTR: 'Presione MAYÚS + ENTRAR para agregar una nueva línea',
	  	ERROR: 'Error',
	  	
	  	FORM_404_HEADER: '404 - La forma no existe',
	  	FORM_404_BODY: 'El formulario al que intenta acceder no existe. ¡Lo siento por eso!',
	  	
	  	FORM_UNAUTHORIZED_HEADER: 'Non autorizzato per accedere al modulo',
   		FORM_UNAUTHORIZED_BODY1: 'Il modulo che si sta tentando di accedere è attualmente privato e non accessibile in pubblico.',
   		FORM_UNAUTHORIZED_BODY2: 'Se sei il proprietario del modulo, puoi impostarlo su "Pubblico" nel pannello "Configurazione" nell\'amministratore di moduli.',
	});

}]);

'use strict';

// SubmitForm controller
angular.module('view-form').controller('SubmitFormController', ["$scope", "$rootScope", "$state", "$translate", "myForm", function($scope, $rootScope, $state, $translate, myForm) {
		$scope.myform = myForm;

		$(".loader").fadeOut("slow");
		document.body.style.background = myForm.design.colors.backgroundColor;
        $translate.use(myForm.language);
	}
]);

'use strict';

angular.module('view-form').directive('fieldIconDirective', function() {

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

angular.module('view-form').directive('fieldDirective', ["$http", "$compile", "$rootScope", "$templateCache", "supportedFields", function($http, $compile, $rootScope, $templateCache, supportedFields) {

		var getTemplateHtml = function(fieldType) {
			var type = fieldType;

			var supported_fields = [
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
			];

			var templateUrl = 'form_modules/forms/base/views/directiveViews/field/';

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
						scope.field.fieldValue = scope.field.fieldOptions[0].option_value;
					}else if(type === 'legal'){
						scope.field.fieldValue = 'true';
						$rootScope.nextField();
					}
				};
                scope.nextField = $rootScope.nextField;
				scope.setActiveField = $rootScope.setActiveField;

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

				var template = getTemplateHtml(fieldType);
				element.html(template).show();
				var output = $compile(element.contents())(scope);
			}
		};
	}]);

'use strict';

//TODO: DAVID: Need to refactor this
angular.module('view-form').directive('onEnterKey', ["$rootScope", function($rootScope){
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
}]).directive('onTabKey', ["$rootScope", function($rootScope){
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs) {
			$element.bind('keyup keypress', function(event) {

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
}]).directive('onEnterOrTabKey', ["$rootScope", function($rootScope){
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
}]).directive('onTabAndShiftKey', ["$rootScope", function($rootScope){
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs) {
			$element.bind('keydown keypress', function(event) {

				var keyCode = event.which || event.keyCode;

				if(keyCode === 9 && event.shiftKey) {

					console.log('onTabAndShiftKey');
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

angular.module('view-form').directive('onFinishRender', ["$rootScope", "$timeout", function ($rootScope, $timeout) {
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
            }else if(scope.$last) {
            	scope.$evalAsync(function () {
            	    $rootScope.$broadcast(broadcastMessage+' Finished');
                });
            }
        }
    };
}]);

'use strict';

//FIXME: Should find an appropriate place for this
//Setting up jsep
jsep.addBinaryOp('contains', 10);
jsep.addBinaryOp('!contains', 10);
jsep.addBinaryOp('begins', 10);
jsep.addBinaryOp('!begins', 10);
jsep.addBinaryOp('ends', 10);
jsep.addBinaryOp('!ends', 10);

angular.module('view-form').directive('submitFormDirective', ["$http", "TimeCounter", "$filter", "$rootScope", "SendVisitorData", "$translate", "$timeout", function ($http, TimeCounter, $filter, $rootScope, SendVisitorData, $translate, $timeout) {
        return {
            templateUrl: 'form_modules/forms/base/views/directiveViews/form/submit-form.client.view.html',
			restrict: 'E',
            scope: {
                myform:'=',
                ispreview: '='
            },
            controller: ["$document", "$window", "$scope", function($document, $window, $scope){
		        var NOSCROLL = false;
		        var FORM_ACTION_ID = 'submit_field';
                $scope.forms = {};
                
				//Don't start timer if we are looking at a design preview
                if($scope.ispreview){
                    TimeCounter.restartClock();
                }

				var form_fields_count = $scope.myform.visible_form_fields.filter(function(field){
		            return field.fieldType !== 'statement';
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

                    //Reset Timer
                    TimeCounter.restartClock();
                };

                /*
                ** Field Controls
                */
				var evaluateLogicJump = function(field){
					var logicJump = field.logicJump;

					if(logicJump.enabled){
						if (logicJump.expressionString && logicJump.valueB && field.fieldValue) {
							var parse_tree = jsep(logicJump.expressionString);
							var left, right;

							if(parse_tree.left.name === 'field'){
								left = field.fieldValue;
								right = logicJump.valueB;
							} else {
								left = logicJump.valueB;
								right = field.fieldValue;
							}

							if(field.fieldType === 'number' || field.fieldType === 'scale' || field.fieldType === 'rating'){
								switch(parse_tree.operator) {
									case '==':
										return (parseInt(left) === parseInt(right));
									case '!==':
										return (parseInt(left) !== parseInt(right));
									case '>':
										return (parseInt(left) > parseInt(right));
									case '>=':
										return (parseInt(left) > parseInt(right));
									case '<':
										return (parseInt(left) < parseInt(right));
									case '<=':
										return (parseInt(left) <= parseInt(right));
									default:
										return false;
								}
							} else {
								switch(parse_tree.operator) {
									case '==':
										return (left === right);
									case '!==':
										return (left !== right);
									case 'contains':
										return (left.indexOf(right) > -1);
									case '!contains':
	                  				/* jshint -W018 */
										return !(left.indexOf(right) > -1);
									case 'begins':
										return left.startsWith(right);
									case '!begins':
										return !left.startsWith(right);
									case 'ends':
										return left.endsWith(right);
									case '!ends':
										return left.endsWith(right);
									default:
										return false;
								}
							}
						}
					}
				};

				var getActiveField = function(){
					if($scope.selected === null){
						console.error('current active field is null');
						throw new Error('current active field is null');
					}

					if($scope.selected._id === FORM_ACTION_ID) {
						return $scope.myform.form_fields.length - 1;
					}
					return $scope.selected.index;
				};

				$scope.isActiveField = function(field){
					if($scope.selected._id === field._id) {
						return true
					}
					return false;
				};

                $scope.setActiveField = $rootScope.setActiveField = function(field_id, field_index, animateScroll) {
                    if($scope.selected === null || (!field_id && field_index === null) )  {
                    	return;
                    }
	    			
	    			if(!field_id){
	    				field_id = $scope.myform.visible_form_fields[field_index]._id;
					} else if(field_index === null){
						field_index = $scope.myform.visible_form_fields.length

						for(var i=0; i < $scope.myform.visible_form_fields.length; i++){
							var currField = $scope.myform.visible_form_fields[i];
							if(currField['_id'] == field_id){
								field_index = i;
								break;
							}
						}
					}

					if($scope.selected._id === field_id){
						return;
		    		}

                    $scope.selected._id = field_id;
                    $scope.selected.index = field_index;


					var nb_valid = $filter('formValidity')($scope.myform);
					$scope.translateAdvancementData = {
						done: nb_valid,
						total: form_fields_count,
						answers_not_completed: form_fields_count - nb_valid
					};

                    if(animateScroll){
                        NOSCROLL=true;
                        setTimeout(function() {
                            $document.scrollToElement(angular.element('.activeField'), -10, 200).then(function() {
								NOSCROLL = false;
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
                    }
                };

                $scope.$watch('selected.index', function(oldValue, newValue){
                	if(oldValue !== newValue && newValue < $scope.myform.form_fields.length){
        		        //Only send analytics data if form has not been submitted
						if(!$scope.myform.submitted){
							console.log('SendVisitorData.send()');
							SendVisitorData.send($scope.myform, newValue, TimeCounter.getTimeElapsed());
						}
                	}
                });

                //Fire event when window is scrolled
				$window.onscroll = function(){
                    if(!NOSCROLL){

						var scrollTop = $(window).scrollTop();
						var elemBox = document.getElementsByClassName('activeField')[0].getBoundingClientRect();
						var fieldTop = elemBox.top;
						var fieldBottom = elemBox.bottom;

						var field_id, field_index;
						var elemHeight = $('.activeField').height();

						var submitSectionHeight = $('.form-actions').height();
						var maxScrollTop = $(document).height() - $(window).height();
						var fieldWrapperHeight = $('form_fields').height();

						var selector = 'form > .field-directive:nth-of-type(' + String($scope.myform.visible_form_fields.length - 1)+ ')'
						var fieldDirectiveHeight = $(selector).height()
						var scrollPosition = maxScrollTop - submitSectionHeight - fieldDirectiveHeight*1.2;

						var fractionToJump = 0.9;

                    	//Focus on field above submit form button
                        if($scope.selected.index === $scope.myform.visible_form_fields.length){
                            if(scrollTop < scrollPosition){
                                field_index = $scope.selected.index-1;
                                $scope.setActiveField(null, field_index, false);
                            }
                        }

                        //Focus on submit form button
                        else if($scope.selected.index === $scope.myform.visible_form_fields.length-1 && scrollTop > scrollPosition){
                            field_index = $scope.selected.index+1;
                            $scope.setActiveField(FORM_ACTION_ID, field_index, false);
                        }
                        
                        //If we scrolled bellow the current field, move to next field
                        else if(fieldBottom < elemHeight * fractionToJump && $scope.selected.index < $scope.myform.visible_form_fields.length-1 ){
                            field_index = $scope.selected.index+1;
                            $scope.setActiveField(null, field_index, false);
                        } 
                        //If we scrolled above the current field, move to prev field
                        else if ( $scope.selected.index !== 0 && fieldTop > elemHeight * fractionToJump) {
                            field_index = $scope.selected.index-1;
                            $scope.setActiveField(null, field_index, false);
                        }
                    }

                    $scope.$apply();
        		};

                $rootScope.nextField = $scope.nextField = function(){
					if($scope.selected && $scope.selected.index > -1){

						if($scope.selected._id !== FORM_ACTION_ID){
							var currField = $scope.myform.visible_form_fields[$scope.selected.index];
						
							//Jump to logicJump's destination if it is true
							if(currField.logicJump && currField.logicJump.jumpTo && evaluateLogicJump(currField)){
								$scope.setActiveField(currField.logicJump.jumpTo, null, true);
							} else if($scope.selected.index < $scope.myform.visible_form_fields.length-1){
								$scope.setActiveField(null, $scope.selected.index+1, true);
							} else {
								$scope.setActiveField(FORM_ACTION_ID, null, true);
							}
						} else {
							//If we are at the submit actions page, go to the first field
							$rootScope.setActiveField(null, 0, true);
						}
					} else {
						//If selected is not defined go to the first field
						$rootScope.setActiveField(null, 0, true);
					}
	
                };

                $rootScope.prevField = $scope.prevField = function(){
                	console.log('prevField');
                	console.log($scope.selected);
                	var selected_index = $scope.selected.index - 1;
                    if($scope.selected.index > 0){
                        $scope.setActiveField(null, selected_index, true);
                    }
                };

                $rootScope.goToInvalid = $scope.goToInvalid = function() {
					var field_id = $('.row.field-directive .ng-invalid.focusOn, .row.field-directive .ng-untouched.focusOn:not(.ng-valid)').first().parents('.row.field-directive').first().attr('data-id');
					$scope.setActiveField(field_id, null, true);
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

				var getDeviceData = function(){
					var md = new MobileDetect(window.navigator.userAgent);
					var deviceType = 'other';

					if (md.tablet()){
						deviceType = 'tablet';
					} else if (md.mobile()) {
						deviceType = 'mobile';
					} else if (!md.is('bot')) {
						deviceType = 'desktop';
					}

					return {
						type: deviceType,
						name: window.navigator.platform
					};
				};

				var getIpAndGeo = function(){
					//Get Ip Address and GeoLocation Data
					$.ajaxSetup( { 'async': false } );
					var geoData = $.getJSON('https://freegeoip.net/json/').responseJSON;
					$.ajaxSetup( { 'async': true } );

					if(!geoData || !geoData.ip){
						geoData = {
							ip: 'Adblocker'
						};
					}

					return {
						ipAddr: geoData.ip,
						geoLocation: {
							City: geoData.city,
							Country: geoData.country_name
						}
					};
				};

				$rootScope.submitForm = $scope.submitForm = function() {
					if($scope.forms.myForm.$invalid){
						$scope.goToInvalid();
						return;
					}

					var _timeElapsed = TimeCounter.stopClock();
					$scope.loading = true;

					var form = _.cloneDeep($scope.myform);

					var deviceData = getDeviceData();
					form.device = deviceData;

					var geoData = getIpAndGeo();
					form.ipAddr = geoData.ipAddr;
					form.geoLocation = geoData.geoLocation;

					form.timeElapsed = _timeElapsed;
					form.percentageComplete = $filter('formValidity')($scope.myform) / $scope.myform.visible_form_fields.length * 100;
					delete form.endPage
					delete form.isLive
					delete form.provider
					delete form.startPage
					delete form.visible_form_fields;
					delete form.analytics;
					delete form.design;
					delete form.submissions;
					delete form.submitted;
					for(var i=0; i < $scope.myform.form_fields.length; i++){
						if($scope.myform.form_fields[i].fieldType === 'dropdown' && !$scope.myform.form_fields[i].deletePreserved){
							$scope.myform.form_fields[i].fieldValue = $scope.myform.form_fields[i].fieldValue.option_value;
						}
						
						//Get rid of unnessecary attributes for each form field
						delete form.form_fields[i].submissionId;
                        			delete form.form_fields[i].disabled;
                        			delete form.form_fields[i].ratingOptions;
                       				delete form.form_fields[i].fieldOptions;
                        			delete form.form_fields[i].logicJump;
                        			delete form.form_fields[i].description;
                        			delete form.form_fields[i].validFieldTypes;
                        			delete form.form_fields[i].fieldType;	
					 
					}

					setTimeout(function () {
						$scope.submitPromise = $http.post('/forms/' + $scope.myform._id, form)
							.success(function (data, status) {
								$scope.myform.submitted = true;
								$scope.loading = false;
								SendVisitorData.send(form, getActiveField(), _timeElapsed);
							})
							.error(function (error) {
								$scope.loading = false;
								console.error(error);
								$scope.error = error.message;
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
angular.module('view-form').service('CurrentForm',
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
angular.module('view-form').factory('Forms', ["$resource", "VIEW_FORM_URL", function($resource, VIEW_FORM_URL) {
		return $resource(VIEW_FORM_URL, {
			formId: '@_id'
		}, {
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

	// Create the Socket.io wrapper service
	function Socket($timeout, $window) {

		var service = {
			socket: null
		};

		// Connect to TellForm Socket.io server
		function connect() {
			var url = '';
			if($window.socketUrl && $window.socketPort){
				url = window.location.protocol + '//' + $window.socketUrl + ':' + $window.socketPort;
			} else if ($window.socketUrl){
				url = window.location.protocol + '//' + $window.socketUrl;
			} else if ($window.socketPort){
				url = window.location.protocol + '//' + window.location.hostname + ':' + $window.socketPort;
			} else {
				url = window.location.protocol + '//' + window.location.hostname;
			}
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

		connect();

		service = {
			connect: connect,
			emit: emit,
			on: on,
			removeListener: removeListener,
			socket: null
		};

		return service;
	}

	angular
		.module('view-form')
		.factory('Socket', Socket);

	Socket.$inject = ["$timeout", "$window"];

}());

'use strict';

angular.module('view-form').service('TimeCounter', function(){
		var _startTime, _endTime = null;

		this.timeSpent = 0;

		this.restartClock = function(){
			_startTime = Date.now();
			_endTime = null;
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
			}
			return new Error('Clock has not been started');
		};

		this.clockStarted = function(){
			return !!this._startTime;
		};

	});

'use strict';

// Setting up route
angular.module('view-form').config(["$stateProvider", function($stateProvider) {
		// Forms state routing
		$stateProvider.
		state('submitForm', {
			url: '/forms/:formId',
			templateUrl: '/static/form_modules/forms/base/views/submit-form.client.view.html',
			resolve: {
				Forms: 'Forms',
				myForm: ["Forms", "$q", "$state", "$stateParams", function (Forms, $q, $state, $stateParams) {
                    var deferred = $q.defer();

                    Forms.get({formId: $stateParams.formId}).$promise.then(function(data) {
                    	deferred.resolve(data);
				    },  function(reason) {
                        $state.go('unauthorizedFormAccess');
                        deferred.reject({redirectTo: 'unauthorizedFormAccess'});
                    });
				    return deferred.promise;
				}]
			},
			controller: 'SubmitFormController',
			controllerAs: 'ctrl'
		}).
        state('unauthorizedFormAccess', {
            url: '/forms/unauthorized',
            templateUrl: '/static/form_modules/forms/base/views/form-unauthorized.client.view.html'
	    })
	    .state('formNotFound', {
            url: '*path',
            templateUrl: '/static/form_modules/forms/base/views/form-not-found.client.view.html'
	    });
    }
]);

(function () {
	'use strict';

	// Create the SendVisitorData service
	angular
		.module('view-form')
		.factory('SendVisitorData', SendVisitorData);

	SendVisitorData.$inject = ["Socket", "$state"];

	function SendVisitorData(Socket, $state) {

		// Create a controller method for sending visitor data
		function send(form, lastActiveIndex, timeElapsed) {

			var lang = window.navigator.userLanguage || window.navigator.language;
			lang = lang.slice(0,2);

			var userAgentString = navigator.userAgent;
			var md = new MobileDetect(userAgentString);
			var deviceType = 'other';

			if (md.tablet()){
				deviceType = 'tablet';
			} else if (md.mobile()) {
			 	deviceType = 'mobile';
			} else if (!md.is('bot')) {
				deviceType = 'desktop';
			}

			// Create a new message object
			var visitorData = {
				referrer: document.referrer,
				isSubmitted: form.submitted,
				formId: form._id,
				lastActiveField: form.form_fields[lastActiveIndex]._id,
				timeElapsed: timeElapsed,
				language: lang,
				deviceType: deviceType,
				ipAddr: null,
				geoLocation: null
			};

			Socket.emit('form-visitor-data', visitorData);
		}

		function init(){
			// Make sure the Socket is connected
			if (!Socket.socket) {
				Socket.connect();
			}
			
			Socket.on('disconnect', function(){
				Socket.connect();
			});
		}

		var service = {
			send: send
		};

		init();
		return service;

	}
}());


'use strict';

angular.module('view-form').directive('keyToOption', function(){
	return {
		restrict: 'A',
		scope: {
			field: '='
		},
		link: function($scope, $element, $attrs, $select) {
			$element.bind('keydown keypress', function(event) {

				var keyCode = event.which || event.keyCode;
				var index = parseInt(String.fromCharCode(keyCode))-1;

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

angular.module('view-form').directive('keyToTruthy', ["$rootScope", function($rootScope){
	return {
		restrict: 'A',
		scope: {
			field: '=',
            nextField: '&'
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
                        if($attrs.onValidKey){
                            $scope.$root.$eval($attrs.onValidKey);
                        }
					});
				}else if(keyCode === falseyKeyCode){
					event.preventDefault();
					$scope.$apply(function() {
						$scope.field.fieldValue = 'false';
					    if($attrs.onValidKey){
                            $scope.$root.$eval($attrs.onValidKey);
                        }   
                    });
				}
			});
		}
	};
}]);


'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('view-form', [
	'ngFileUpload', 'ui.date', 'angular-input-stars'
]);
