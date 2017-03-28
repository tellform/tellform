'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'TellForm-Form';
	var applicationModuleVendorDependencies = ['duScroll', 'ui.select', 'ngSanitize', 'vButton', 'ngResource', 'TellForm-Form.form_templates', 'ui.router', 'ui.bootstrap', 'ui.utils', 'pascalprecht.translate'];

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

angular.module('TellForm-Form.form_templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("form_modules/forms/base/views/submit-form.client.view.html",
    "<section class=public-form ng-style=\"{ 'background-color': myform.design.colors.backgroundColor }\"><submit-form-directive myform=myform></submit-form-directive></section><script ng-if=myform.analytics.gaCode>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n" +
    "				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n" +
    "			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n" +
    "	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\n" +
    "\n" +
    "	ga('create', '{{myform.analytics.gaCode}}', 'auto');\n" +
    "	ga('send', 'pageview');</script>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/entryPage/startPage.html",
    "<div class=\"field row text-center\"><div class=\"col-xs-12 text-center\"><h1>{{pageData.introTitle}}</h1></div><div class=\"col-xs-10 col-xs-offset-1 text-left\"><p style=color:#ddd>{{pageData.introParagraph}}</p></div></div><div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em\"><p ng-repeat=\"button in pageData.buttons\" class=text-center style=display:inline><button class=\"btn btn-info\" type=button ng-style=\"{'background-color':button.bgColor, 'color':button.color}\"><a href={{button.url}} style=\"font-size: 1.6em; text-decoration: none; color: inherit\">{{button.text}}</a></button></p></div><div class=\"row form-actions\"><p class=\"col-xs-3 col-xs-offset-3 text-center\"><button class=\"btn btn-info\" type=button><a ng-click=exitpageData() style=\"color:white; font-size: 1.6em; text-decoration: none\">{{ 'CONTINUE_FORM' | translate }}</a></button></p></div>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/date.html",
    "<div class=\"field row\" ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=\"!field.required && !field.fieldValue\">{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><div class=\"control-group input-append\"><input class=focusOn ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" ng-class=\"{ 'no-border': !!field.fieldValue }\" ui-date=dateOptions ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled placeholder=MM/DD/YYYY ng-focus=\"setActiveField(field._id, index, true)\" on-tab-key=nextField() on-tab-and-shift-key=prevField() ng-change=$root.nextField()></div></div></div>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/dropdown.html",
    "<div class=\"field row dropdown\" ng-if=\"field.fieldOptions.length > 0\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><ui-select ng-model=field.fieldValue theme=selectize search-enabled=true search-by=option_value set-search-to-answer=true ng-required=field.required ng-disabled=field.disabled on-tab-and-shift-key=prevField() on-tab-key=nextField() ng-change=$root.nextField()><ui-select-match placeholder=\"Type or select an option\"></ui-select-match><ui-select-choices repeat=\"option in field.fieldOptions | filter: $select.search\" ng-class=\"{'active': option.option_value === field.fieldValue }\"><span ng-bind-html=\"option.option_value | highlight: $select.search\"></span></ui-select-choices></ui-select></div></div><br>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/file.html",
    "<div class=\"field row\" ng-if=form.autofillPDFs ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3></div><div class=\"col-sm-8 field-input\"><div class=input-group><div tabindex=-1 class=\"form-control file-caption\"><span class=file-caption-ellipsis ng-if=!form.pdf>…</span><div class=file-caption-name ng-if=form.pdf>{{field.file.originalname}}</div></div><div class=input-group-btn><button type=button ng-if=field.file ng-click=removeFile(field); title=\"Clear selected files\" class=\"btn btn-danger fileinput-remove fileinput-remove-button\"><i class=\"glyphicon glyphicon-trash\"></i> {{ 'DELETE' | translate }}</button> <button type=button ng-if=field.fileLoading title=\"Abort ongoing upload\" class=\"btn btn-default\" ng-click=cancelFileUpload(field)><i class=\"glyphicon glyphicon-ban-circle\"></i> {{ 'CANCEL' | translate }}</button><div class=\"btn btn-success btn-file\" ngf-select ngf-change=uploadPDF($files) ng-if=!field.file><i class=\"glyphicon glyphicon-upload\"></i> {{ UPLOAD_FILE | translate }}</div></div></div></div></div>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/hidden.html",
    "<input ng-focus=\"setActiveField(field._id, index, true)\" ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" type=hidden ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" value={{field.fieldValue}} ng-disabled=field.disabled>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/legal.html",
    "<div class=\"field row radio legal\" on-enter-or-tab-key=nextField() key-to-truthy key-char-truthy=y key-char-falsey=n field=field><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><br><p class=col-xs-12>{{field.description}}</p></div><div class=\"col-xs-12 field-input container\"><div class=row-fluid on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField()><label class=\"btn col-md-5 col-xs-12\" ng-class=\"{activeBtn: field.fieldValue == 'true'}\"><input class=focusOn ng-focus=\"setActiveField(field._id, index, true)\" ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" type=radio value=true ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled ng-change=\"$root.nextField()\"><div class=letter style=float:left>Y</div><span>{{ 'LEGAL_ACCEPT' | translate }}</span></label><label class=\"btn col-md-5 col-md-offset-1 col-xs-12\" ng-class=\"{activeBtn: field.fieldValue == 'false'}\"><input class=focusOn ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" type=radio value=false ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled ng-change=\"$root.nextField()\"><div class=letter style=float:left>N</div><span>{{ 'LEGAL_NO_ACCEPT' | translate }}</span></label></div></div></div><br>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/radio.html",
    "<div class=\"field row radio\" on-enter-or-tab-key=nextField() key-to-option field=field ng-if=\"field.fieldOptions.length > 0\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><div ng-repeat=\"option in field.fieldOptions\" class=row-fluid><label class=\"btn col-md-4 col-xs-12 col-sm-12\" style=\"margin: 0.5em; padding-left:30px\" ng-class=\"{activeBtn: field.fieldValue == field.fieldOptions[$index].option_value}\"><div class=letter style=float:left>{{$index+1}}</div><input ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" type=radio class=focusOn ng-focus=\"setActiveField(field._id, index, true)\" value={{option.option_value}} ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled ng-change=\"$root.nextField()\"> <span ng-bind=option.option_value></span></label></div></div></div><br>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/rating.html",
    "<div class=\"textfield field row\" on-enter-or-tab-key=nextField()><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><input-stars max={{field.ratingOptions.steps}} ng-init=\"field.fieldValue = 1\" on-star-click=$root.nextField() icon-full={{field.ratingOptions.shape}} icon-base=\"fa fa-3x\" icon-empty={{field.ratingOptions.shape}} ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() ng-focus=\"setActiveField(field._id, index, true)\" class=\"angular-input-stars focusOn\"></input-stars></div></div>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/statement.html",
    "<div class=\"statement field row\" on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() ng-focus=\"setActiveField(field._id, index, true)\"><div class=\"row field-title field-title\"><div class=col-xs-1><i class=\"fa fa-quote-left fa-1\"></i></div><h2 class=\"text-left col-xs-9\">{{field.title}}</h2><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"row field-title field-input\"><p class=col-xs-12 ng-if=field.description.length>{{field.description}}</p><br><div class=\"col-xs-offset-1 col-xs-11\"><button class=\"btn focusOn\" ng-style=\"{'font-size': '1.3em', 'background-color':design.colors.buttonColor, 'color':design.colors.buttonTextColor}\" ng-focused=\"setActiveField(field._id, index, true)\" ng-click=$root.nextField()>{{ 'CONTINUE' | translate }}</button></div></div></div>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/textarea.html",
    "<div class=\"field row\" ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><small>{{ 'NEWLINE' | translate }}</small><p><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><small style=font-size:0.6em>Press SHIFT+ENTER to add a newline</small><textarea class=\"textarea focusOn\" type=text ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-class=\"{ 'no-border': !!field.fieldValue }\" value={{field.fieldValue}} ng-required=field.required ng-disabled=field.disabled ng-focus=\"setActiveField(field._id, index, true)\" on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() style=\"border: none; border-left: lightgrey dashed 2px\">\n" +
    "		</textarea></div></div><div><div class=\"btn btn-lg btn-default col-xs-12 col-sm-4 hidden-xs\" style=\"padding: 4px; margin-top:8px; background: rgba(255,255,255,0.5)\"><button ng-disabled=\"!field.fieldValue || forms.myForm.{{field.fieldType}}{{$index}}.$invalid\" ng-style=\"{'background-color':design.colors.buttonColor, 'color':design.colors.buttonTextColor}\" ng-click=$root.nextField() class=\"btn col-sm-5 col-xs-5\">{{ 'OK' | translate }} <i class=\"fa fa-check\"></i></button><div class=\"col-sm-3 col-xs-6\" style=margin-top:0.2em><small style=\"color:#ddd; font-size:70%\">{{ 'ENTER' | translate }}</small></div></div></div>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/textfield.html",
    "<div class=\"textfield field row\" ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title row-fluid\" ng-style=\"{'color': design.colors.questionColor}\"><h3 class=col-xs-12><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>({{ 'OPTIONAL' | translate }})</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><input ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" name={{field.fieldType}}{{index}} type={{input_type}} ng-pattern=validateRegex placeholder={{placeholder}} ng-class=\"{ 'no-border': !!field.fieldValue }\" class=\"focusOn text-field-input\" ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" value=field.fieldValue ng-focus=\"setActiveField(field._id, index, true)\" on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() ng-required=field.required ng-disabled=field.disabled aria-describedby=inputError2Status></div><div class=col-xs-12><div ng-show=\"forms.myForm.{{field.fieldType}}{{index}}.$invalid && !!forms.myForm.{{field.fieldType}}{{index}}.$viewValue \" class=\"alert alert-danger\" role=alert><span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=true></span> <span class=sr-only>Error:</span> <span ng-if=\"field.fieldType == 'email'\">{{ 'ERROR_EMAIL_INVALID' | translate }}</span> <span ng-if=field.validateRegex>{{ 'ERROR_NOT_A_NUMBER' | translate }}</span> <span ng-if=\"field.fieldType == 'link'\">{{ 'ERROR_URL_INVALID' | translate }}</span></div></div></div><div><div class=\"btn btn-lg btn-default col-xs-12 col-sm-4 hidden-xs\" style=\"padding: 4px; margin-top:8px; background: rgba(255,255,255,0.5)\"><button ng-disabled=\"!field.fieldValue || forms.myForm.{{field.fieldType}}{{$index}}.$invalid\" ng-style=\"{'background-color':design.colors.buttonColor, 'color':design.colors.buttonTextColor}\" ng-click=nextField() class=\"btn col-sm-5 col-xs-5\">{{ 'OK' | translate }} <i class=\"fa fa-check\"></i></button><div class=\"col-xs-6 col-sm-3\" style=margin-top:0.2em><small style=\"color:#ddd; font-size:70%\">{{ 'ENTER' | translate }}</small></div></div></div>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/yes_no.html",
    "<div class=\"field row radio\" ng-click=\"setActiveField(field._id, index, true)\" on-tab-and-shift-key=prevField() key-to-truthy key-char-truthy=y key-char-falsey=n field=field><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3 class=row><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=row>{{field.description}}</p></div><div class=\"col-xs-12 field-input\"><div class=row><label class=\"btn btn-default col-md-2 col-sm-3 col-xs-7\" style=\"background: rgba(0,0,0,0.1); text-align:left\"><input type=radio value=true class=focusOn style=\"opacity: 0; margin-left: 0px\" ng-model=field.fieldValue ng-focus=\"setActiveField(field._id, index, true)\" ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-change=$root.nextField() ng-disabled=\"field.disabled\"><div class=letter>{{ 'Y' | translate }}</div><span>{{ 'YES' | translate }}</span> <i ng-show=\"field.fieldValue === 'true'\" class=\"fa fa-check\" aria-hidden=true></i></label></div><div class=row style=\"margin-top: 10px\"><label class=\"btn btn-default col-md-2 col-sm-3 col-xs-7\" style=\"background: rgba(0,0,0,0.1); text-align:left\"><input type=radio value=false style=\"opacity:0; margin-left:0px\" ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-change=$root.nextField() ng-disabled=\"field.disabled\"><div class=letter>{{ 'N' | translate }}</div><span>{{ 'NO' | translate }}</span> <i ng-show=\"field.fieldValue === 'false'\" class=\"fa fa-check\" aria-hidden=true></i></label></div></div></div><br>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/form/submit-form.client.view.html",
    "<section class=\"overlay submitform\" ng-if=\"loading || (!myform.submitted && !myform.startPage.showStart)\"></section><div ng-show=\"!myform.submitted && myform.startPage.showStart\" class=form-submitted style=\"padding-top: 35vh\"><div class=row><div class=\"col-xs-12 text-center\" style=\"overflow-wrap: break-word\"><h1 style=\"font-weight: 400; nont-size: 25px\">{{myform.startPage.introTitle}}</h1></div><div class=\"col-xs-10 col-xs-offset-1 text-center\" style=\"overflow-wrap: break-word\"><p style=\"color: grey; font-weight: 100; font-size: 16px\">{{myform.startPage.introParagraph}}</p></div></div><div class=\"row form-actions text-center\" style=\"padding: 5px 25px 5px 25px\"><button ng-click=exitStartPage() class=btn type=button ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\"><span style=\"font-size: 1.6em\">{{myform.startPage.introButtonText}}</span></button></div><div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em\"><p ng-repeat=\"button in myform.startPage.buttons\" class=text-center style=display:inline><button class=btn style=\"background-color:rgb(156, 226, 235)\" type=button ng-style=\"{'background-color':button.bgColor, 'color':button.color}\"><a href={{button.url}} style=\"font-size: 1.6em; text-decoration: none\" ng-style=\"{'color':button.color}\">{{button.text}}</a></button></p></div></div><div class=form-fields ng-show=\"!myform.submitted && !myform.startPage.showStart\" ng-style=\"{ 'border-color': myform.design.colors.buttonTextColor }\"><div class=row><form name=forms.myForm novalidate class=\"submission-form col-sm-12 col-md-offset-1 col-md-10\"><div ng-repeat=\"field in myform.form_fields\" ng-if=!field.deletePreserved data-index={{$index}} data-id={{field._id}} ng-class=\"{activeField: selected._id == field._id }\" class=\"row field-directive\"><field-directive field=field design=myform.design index=$index forms=forms></field-directive></div></form></div><div class=\"row form-actions\" id=submit_field ng-class=\"{activeField: selected._id == 'submit_field' }\" ng-style=\"{ 'background-color':myform.design.colors.buttonColor}\" style=\"border-top: 1px solid #ddd; margin-right: -13%; margin-left: -13%; margin-top: 30vh; height: 100vh\"><div class=\"col-xs-12 text-left\" style=\"background-color:#990000; color:white\" ng-if=forms.myForm.$invalid>{{ 'COMPLETING_NEEDED' | translate:translateAdvancementData }}</div><button ng-if=!forms.myForm.$invalid class=\"Button btn col-sm-2 col-xs-8 focusOn\" v-busy=loading v-busy-label=\"Please wait\" v-pressable ng-disabled=\"loading || forms.myForm.$invalid\" ng-click=submitForm() on-enter-key=submitForm() on-enter-key-disabled=\"loading || forms.myForm.$invalid\" ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" style=\"font-size: 1.6em; margin-left: 1em; margin-top: 1em\">{{ 'SUBMIT' | translate }}</button> <button ng-if=forms.myForm.$invalid class=\"Button btn col-sm-2 col-xs-8 focusOn\" ng-click=goToInvalid() on-enter-key=goToInvalid() on-enter-key-disabled=!forms.myForm.$invalid style=\"font-size: 1.6em; margin-left: 1em; margin-top: 1em; background-color:#990000; color:white\">{{ 'REVIEW' | translate }}</button><div class=\"col-sm-2 hidden-xs\" style=\"font-size: 75%; margin-top:3.25em\"><small>{{ 'ENTER' | translate }}</small></div></div><section ng-if=!myform.hideFooter class=\"navbar navbar-fixed-bottom\" ng-style=\"{ 'background-color':myform.design.colors.buttonColor, 'padding-top': '15px', 'border-top': '2px '+ myform.design.colors.buttonTextColor +' solid', 'color':myform.design.colors.buttonTextColor}\"><div class=container-fluid><div class=row><div class=\"col-sm-5 col-md-6 col-xs-5\" ng-show=!myform.submitted><p class=lead>{{ 'ADVANCEMENT' | translate:translateAdvancementData }}</p></div><div class=\"col-md-6 col-md-offset-0 col-sm-offset-2 col-sm-3 col-xs-offset-1 col-xs-6 row\"><div class=\"col-md-4 col-md-offset-2 hidden-sm hidden-xs\"><a href=/#!/forms class=btn ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\">{{ 'CREATE_FORM' | translate }}</a></div><div class=\"col-md-4 col-sm-10 col-md-offset-0 col-sm-offset-2 col-xs-12 row\"><button class=\"btn btn-lg col-xs-6\" id=focusDownButton ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" ng-click=nextField() ng-disabled=\"selected.index > myform.form_fields.length-1\"><i class=\"fa fa-chevron-down\"></i></button> <button class=\"btn btn-lg col-xs-6\" id=focusUpButton ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" ng-click=prevField() ng-disabled=\"selected.index == 0\"><i class=\"fa fa-chevron-up\"></i></button></div></div></div></div></section></div><div ng-if=\"myform.submitted && !loading && !myform.endPage.showEnd\" class=form-submitted ng-style=\"{'color':myform.design.colors.buttonTextColor}\" style=\"padding-top: 5vh\"><div class=\"field row text-center\"><div class=\"col-xs-12 col-sm-12 col-md-6 col-md-offset-3 text-center\">{{ 'FORM_SUCCESS' | translate }}</div></div><div class=\"row form-actions\"><p class=text-center><button ng-click=reloadForm() class=btn type=button ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\"><span style=\"font-size: 1.6em\">{{ 'BACK_TO_FORM' | translate }}</span></button></p></div></div><div ng-if=\"myform.submitted && !loading && myform.endPage.showEnd\" class=form-submitted ng-style=\"{'color':myform.design.colors.buttonTextColor}\" style=\"padding-top: 5vh\"><div class=row><div class=\"col-xs-12 text-center\" style=\"overflow-wrap: break-word\"><h1 style=\"font-weight: 400; nont-size: 25px\">{{myform.endPage.title}}</h1></div><div class=\"col-xs-10 col-xs-offset-1 text-center\" style=\"overflow-wrap: break-word\"><p style=\"color: grey; font-weight: 100; font-size: 16px\">{{myform.endPage.paragraph}}</p></div></div><div class=\"row form-actions text-center\" style=\"padding: 5px 25px 5px 25px\"><button ng-click=reloadForm() class=btn type=button ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\"><span style=\"font-size: 1.6em\">{{myform.endPage.buttonText}}</span></button></div><div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em\"><p ng-repeat=\"button in myform.endPage.buttons\" class=text-center style=display:inline><button class=btn style=\"background-color:rgb(156, 226, 235)\" type=button ng-style=\"{'background-color':button.bgColor, 'color':button.color}\"><a href={{button.url}} style=\"font-size: 1.6em; text-decoration: none\" ng-style=\"{'color':button.color}\">{{button.text}}</a></button></p></div></div>");
}]);

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('view-form', [
	'ngFileUpload', 'ui.router.tabs', 'ui.date', 'ui.sortable',
	'angular-input-stars', 'pascalprecht.translate'
]);

'use strict';

angular.module('view-form').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('english', {
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
  });

  $translateProvider.preferredLanguage('english')
  	.fallbackLanguage('english')
	.useSanitizeValueStrategy('escape');

}]);

'use strict';

angular.module('view-form').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('french', {
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
  });

}]);

'use strict';

angular.module('view-form').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('german', {
	FORM_SUCCESS: 'Ihre Angaben wurden gespeichert.',
	REVIEW: 'Unvollständig',
	BACK_TO_FORM: 'Zurück zum Formular',
	EDIT_FORM: '',
	CREATE_FORM: '',
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
  });

}]);

'use strict';

angular.module('view-form').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('italian', {
	FORM_SUCCESS: 'Il formulario è stato inviato con successo!',
	REVIEW: 'Incompleto',
	BACK_TO_FORM: 'Ritorna al formulario',
	EDIT_FORM: '',
	CREATE_FORM: '',
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
  });

}]);

'use strict';

angular.module('view-form').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('spanish', {
	FORM_SUCCESS: '¡El formulario ha sido enviado con éxito!',
	REVIEW: 'Revisar',
	BACK_TO_FORM: 'Regresar al formulario',
	EDIT_FORM: '',
	CREATE_FORM: '',
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
	LEGAL_ACCEPT: 'I accept',
	LEGAL_NO_ACCEPT: 'I don’t accept',
	DELETE: 'Eliminar',
	CANCEL: 'Cancelar',
	SUBMIT: 'Registrar',
	UPLOAD_FILE: 'Cargar el archivo',
	Y: 'S',
	N: 'N'
  });

}]);

'use strict';

// Setting up route
angular.module('view-form').config(['$stateProvider',
	function($stateProvider) {
		// Forms state routing
		$stateProvider.
		state('submitForm', {
			url: '/forms/:formId',
			templateUrl: '/static/form_modules/forms/base/views/submit-form.client.view.html',
			resolve: {
				Forms: 'Forms',
				myForm: ["Forms", "$stateParams", function (Forms, $stateParams) {
					return Forms.get({formId: $stateParams.formId}).$promise;
				}]
			},
			controller: 'SubmitFormController',
			controllerAs: 'ctrl'
		});
	}
]);

(function () {
	'use strict';

	// Create the SendVisitorData service
	angular
		.module('view-form')
		.factory('SendVisitorData', SendVisitorData);

	SendVisitorData.$inject = ['Socket', '$state'];

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

			$.ajaxSetup( { "async": false } );
			var geoData = $.getJSON('https://freegeoip.net/json/').responseJSON;
			$.ajaxSetup( { "async": true } );

			if(!geoData){
				geoData = {
					ip: '',
					city: '',
					country_name: ''
				}
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
				ipAddr: geoData.ip,
				geoLocation: {
					city: geoData.city,
					country: geoData.country_name
				}
			};
			Socket.emit('form-visitor-data', visitorData);
		}

		function init(){
			// Make sure the Socket is connected
			if (!Socket.socket) {
				Socket.connect();
			}
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

angular.module('view-form').directive('keyToTruthy', ['$rootScope', function($rootScope){
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
				if(typeof field === 'object' && field.fieldType !== 'statement' && field.fieldType !== 'rating'){
					return !!(field.fieldValue);
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

// SubmitForm controller
angular.module('view-form').controller('SubmitFormController', [
	'$scope', '$rootScope', '$state', '$translate', 'myForm',
	function($scope, $rootScope, $state, $translate, myForm) {
		$scope.myform = myForm;
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

angular.module('view-form').directive('fieldDirective', ['$http', '$compile', '$rootScope', '$templateCache', 'supportedFields',
	function($http, $compile, $rootScope, $templateCache, supportedFields) {

		var getTemplateUrl = function(fieldType) {
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
						console.log(scope.field);
						scope.field.fieldValue = scope.field.fieldOptions[0].option_value;
						console.log(scope.field.fieldValue);
					}else if(type === 'legal'){
						scope.field.fieldValue = 'true';
						$rootScope.nextField();
					}
				};

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

				var template = getTemplateUrl(fieldType);
				element.html(template).show();
				var output = $compile(element.contents())(scope);
			}
		};
	}]);

'use strict';

//TODO: DAVID: Need to refactor this
angular.module('view-form').directive('onEnterKey', ['$rootScope', function($rootScope){
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
                    // console.log(broadcastMessage+'Finished');
            	    $rootScope.$broadcast(broadcastMessage+' Finished');
                });
            }
        }
    };
}]);

'use strict';

//FIXME: Should find an appropriate place for this
//Setting up jsep
jsep.addBinaryOp("contains", 10);
jsep.addBinaryOp("!contains", 10);
jsep.addBinaryOp("begins", 10);
jsep.addBinaryOp("!begins", 10);
jsep.addBinaryOp("ends", 10);
jsep.addBinaryOp("!ends", 10);

/**
 * Calculate a 32 bit FNV-1a hash
 * Found here: https://gist.github.com/vaiorabbit/5657561
 * Ref.: http://isthe.com/chongo/tech/comp/fnv/
 *
 * @param {string} str the input value
 * @param {boolean} [asString=false] set to true to return the hash value as
 *     8-digit hex string instead of an integer
 * @param {integer} [seed] optionally pass the hash of the previous chunk
 * @returns {integer | string}
 */
function hashFnv32a(str, asString, seed) {
	/*jshint bitwise:false */
	var i, l,
		hval = (seed === undefined) ? 0x811c9dc5 : seed;

	for (i = 0, l = str.length; i < l; i++) {
		hval ^= str.charCodeAt(i);
		hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	}
	if( asString ){
		// Convert to 8 digit hex string
		return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
	}
	return hval >>> 0;
}

angular.module('view-form').directive('submitFormDirective', ['$http', 'TimeCounter', '$filter', '$rootScope', 'SendVisitorData',
    function ($http, TimeCounter, $filter, $rootScope, SendVisitorData) {
        return {
            templateUrl: 'form_modules/forms/base/views/directiveViews/form/submit-form.client.view.html',
			restrict: 'E',
            scope: {
                myform:'='
            },
            controller: ["$document", "$window", "$scope", function($document, $window, $scope){
		        $scope.noscroll = false;
                $scope.forms = {};
				TimeCounter.restartClock();

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
				var evaluateLogicJump = function(field){
					var logicJump = field.logicJump;

					if (logicJump.expressionString && logicJump.valueB && field.fieldValue) {
						var parse_tree = jsep(logicJump.expressionString);
						var left, right;

						if(parse_tree.left.name === 'field'){
							left = field.fieldValue;
							right = logicJump.valueB
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
				};

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
					if(!field_index){
						for(var i=0; i<$scope.myform.visible_form_fields.length; i++){
							var currField = $scope.myform.visible_form_fields[i];
							if(field_id == currField._id){
								$scope.selected.index = i;
								break;
							}
						}
					}

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
                    }else {
						setTimeout(function() {
							if (document.querySelectorAll('.activeField .focusOn')[0]) {
								//FIXME: DAVID: Figure out how to set focus without scroll movement in HTML Dom
								document.querySelectorAll('.activeField .focusOn')[0].focus();
							} else {
								document.querySelectorAll('.activeField input')[0].focus();
							}
						});
					}

					SendVisitorData.send($scope.myform, getActiveField(), TimeCounter.getTimeElapsed());
                };

                $rootScope.nextField = $scope.nextField = function(){
					var currField = $scope.myform.visible_form_fields[$scope.selected.index];

					if($scope.selected && $scope.selected.index > -1){
						//Jump to logicJump's destination if it is true
						if(currField.logicJump && evaluateLogicJump(currField)){
							$rootScope.setActiveField(currField.logicJump.jumpTo, null, true);
						} else {
							var selected_index, selected_id;
							if($scope.selected.index < $scope.myform.visible_form_fields.length-1){
								selected_index = $scope.selected.index+1;
								selected_id = $scope.myform.visible_form_fields[selected_index]._id;
								$rootScope.setActiveField(selected_id, selected_index, true);
							} else if($scope.selected.index === $scope.myform.visible_form_fields.length-1) {
								selected_index = $scope.selected.index+1;
								selected_id = 'submit_field';
								$rootScope.setActiveField(selected_id, selected_index, true);
							}
						}
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
					}
				};

				var getIpAndGeo = function(){
					//Get Ip Address and GeoLocation Data
					$.ajaxSetup( { "async": false } );
					var geoData = $.getJSON('https://freegeoip.net/json/').responseJSON;
					$.ajaxSetup( { "async": true } );

					return {
						ipAddr: geoData.ip,
						geoLocation: {
							City: geoData.city,
							Country: geoData.country_name
						}
					}
				};

				$rootScope.submitForm = $scope.submitForm = function() {

					var _timeElapsed = TimeCounter.stopClock();
					$scope.loading = true;

					var form = _.cloneDeep($scope.myform);

					var deviceData = getDeviceData();
					form.device = deviceData;

					var geoData = getIpAndGeo();
					form.ipAddr = geoData.ipAddr;
					form.geoLocation = geoData.geoLocation;
					console.log(geoData);

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
								$scope.myform.submitted = true;
								$scope.loading = false;
								SendVisitorData.send($scope.myform, getActiveField(), _timeElapsed);
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
angular.module('view-form').factory('Forms', ['$resource', 'VIEW_FORM_URL',
	function($resource, VIEW_FORM_URL) {
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
	angular
		.module('view-form')
		.factory('Socket', Socket);

	Socket.$inject = ['$timeout', '$window'];

	function Socket($timeout, $window) {
		var service = {
			connect: connect,
			emit: emit,
			on: on,
			removeListener: removeListener,
			socket: null
		};

		var url = '';
		console.log("$window.socketPort: "+$window.socketPort);
		console.log("$window.socketUrl: "+$window.socketUrl);
		if($window.socketPort && $window.socketUrl){
			url = window.location.protocol + '//' + $window.socketUrl + ':' + $window.socketPort;
		} else if ($window.socketUrl && !$window.socketUrl){
			url = window.location.protocol + '//' + $window.socketUrl;
		} else if ($window.socketPort){
			url = window.location.protocol + '//' + window.location.hostname + ':' + $window.socketPort;
		} else {
			url = window.location.protocol + '//' + window.location.hostname;
		}
		connect(url);

		return service;

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
	}
}());

'use strict';

angular.module('view-form').service('TimeCounter', [
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
