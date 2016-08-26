'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'NodeForm';
	var applicationModuleVendorDependencies = ['duScroll', 'ui.select', 'cgBusy', 'ngSanitize', 'vButton', 'ngResource', 'NodeForm.templates', 'ui.router', 'ui.bootstrap', 'ui.utils', 'pascalprecht.translate', 'ng.deviceDetector'];

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

angular.module('NodeForm.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("modules/core/views/header.client.view.html",
    "<section class=\"navbar navbar-inverse\" data-ng-controller=HeaderController ng-hide=hideNav><div class=container><div class=navbar-header><button class=navbar-toggle type=button data-ng-click=toggleCollapsibleMenu()><span class=sr-only>Toggle navigation</span> <span>{{ 'MENU_BTN' | translate }}</span></button> <a href=\"https://www.tellform.com/#!/\" class=navbar-brand><img src=/static/modules/core/img/logo_white.svg height=100%></a></div><nav class=\"collapse navbar-collapse\" collapse=!isCollapsed role=navigation><ul class=\"nav navbar-nav\" data-ng-if=authentication.isAuthenticated()><li data-ng-repeat=\"item in menu.items | orderBy: 'position'\" data-ng-if=item.shouldRender(authentication.isAuthenticated()); ng-switch=item.menuItemType ui-route={{item.uiRoute}} class={{item.menuItemClass}} ng-class=\"{active: ($uiRoute)}\" dropdown=\"item.menuItemType === 'dropdown'\"><a ng-switch-when=dropdown class=dropdown-toggle dropdown-toggle><span data-ng-bind=item.title></span> <b class=caret></b></a><ul ng-switch-when=dropdown class=dropdown-menu><li data-ng-repeat=\"subitem in item.items | orderBy: 'position'\" data-ng-if=subitem.shouldRender(authentication.isAuthenticated()); ui-route={{subitem.uiRoute}} ng-class=\"{active: $uiRoute}\"><a href=/#!/{{subitem.link}} data-ng-bind=subitem.title></a></li></ul><a ng-switch-default href=/#!/{{item.link}} data-ng-bind=item.title></a></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-hide=authentication.isAuthenticated()><li ng-hide=$root.signupDisabled ui-route=/signup ng-class=\"{active: $uiRoute}\"><a href=/#!/signup>{{ 'SIGNUP_TAB' | translate }}</a></li><li class=divider-vertical></li><li ui-route=/signin ng-class=\"{active: $uiRoute}\"><a href=/#!/signin>{{ 'SIGNIN_TAB' | translate }}</a></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-show=authentication.isAuthenticated()><li class=dropdown uib-dropdown><a href=# class=dropdown-toggle data-toggle=dropdown dropdown-toggle><span>{{ 'MY_SETTINGS' | translate }}</span> <b class=caret></b></a><ul class=dropdown-menu><li><a href=/#!/settings/profile>{{ 'EDIT_PROFILE' | translate }}</a></li><li class=divider></li><li><a href=/#!/settings/password>{{ 'CHANGE_PASSWORD' | translate }}</a></li></ul></li><li><a href=\"/\" ng-click=signout()>{{ 'SIGNOUT_TAB' | translate }}</a></li></ul></nav></div></section>");
  $templateCache.put("modules/forms/admin/views/admin-form.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><div class=container cg-busy=\"{promise:updatePromise,templateUrl:'modules/forms/admin/views/directiveViews/cgBusy/update-form-message-TypeB.html',message:'Updating form...', backdrop:false, wrapperClass:'.busy-updating-wrapper'}\"></div><section class=\"container admin-form\"><script type=text/ng-template id=myModalContent.html><div class=\"modal-header\">\n" +
    "            <h2 class=\"modal-title hidden-md hidden-lg\">{{ 'ARE_YOU_SURE' | translate }}</h2>\n" +
    "            <h3 class=\"modal-title hidden-xs hidden-sm\">{{ 'ARE_YOU_SURE' | translate }}</h3>\n" +
    "        </div>\n" +
    "        <div class=\"modal-body\">\n" +
    "        	<div class=\"modal-body-alert\">\n" +
    "				{{ 'READ_WARNING' | translate }}\n" +
    "			</div>\n" +
    "       		<p class=\"hidden-xs hidden-sm\">\n" +
    "       		 	{{ 'DELETE_WARNING1' | translate }}<strong>{{myform.title}}</strong> {{ 'DELETE_WARNING2' | translate }}\n" +
    "       		</p>\n" +
    "            <p>{{ 'DELETE_CONFIRM' | translate }}</p>\n" +
    "        </div>\n" +
    "        <div class=\"modal-footer\">\n" +
    "	        <p>\n" +
    "				<input type=\"text\" data-ng-model=\"deleteConfirm\" class=\"input-block\" autofocus required aria-label=\"Type in the name of the form to confirm that you want to delete this form.\">\n" +
    "			</p>\n" +
    "            <button type=\"submit\" ng-click=\"removeCurrentForm()\" class=\"btn btn-block btn-danger\" ng-disabled=\"myform.title != deleteConfirm\">\n" +
    "            	{{ 'I_UNDERSTAND' | translate }}\n" +
    "            </button>\n" +
    "        </div></script><div class=\"page-header row-fluid\" style=\"padding-bottom: 1em\"><div class=\"col-xs-10 col-sm-8\"><h1 class=\"hidden-sm hidden-xs\" data-ng-bind=myform.title style=\"margin-bottom: 0px\"></h1><h2 class=\"hidden-md hidden-lg\" data-ng-bind=myform.title style=\"margin-bottom: 0px\"></h2></div><div class=\"col-xs-1 col-sm-2\"><small class=pull-right><button class=\"btn btn-danger\" ng-click=openDeleteModal()><i class=\"fa fa-trash-o\"></i> <span class=\"show-sm hidden-lg hidden-md hidden-xs\">{{ 'DELETE_FORM_SM' | translate}}</span> <span class=\"hidden-xs hidden-sm\">{{ 'DELETE_FORM_MD' | translate}}</span></button></small></div><div class=\"col-xs-1 col-sm-2\"><small class=pull-right><a class=\"btn btn-default view-form-btn\" href=//{{formURL}}/#!/forms/{{myform._id}}><span class=\"hidden-xs hidden-sm\">{{ 'VIEW' | translate }} <span ng-show=myform.isLive>{{ 'LIVE' | translate }}</span> <span ng-hide=myform.isLive>{{ 'PREVIEW' | translate }}</span> {{ 'FORM' | translate }}</span> <span class=\"hidden-xs hidden-md hidden-lg\">View <span ng-if=myform.isLive>{{ 'LIVE' | translate }}</span> <span ng-if=!myform.isLive>{{ 'PREVIEW' | translate }}</span></span> <i class=\"status-light status-light-on fa fa-dot-circle-o\" ng-if=myform.isLive></i> <i class=\"status-light status-light-off fa fa-dot-circle-o\" ng-if=!myform.isLive></i></a></small></div></div><div class=row-fluid><div class=col-xs-12><tabs data=tabData></tabs></div><div class=col-xs-12><ui-view></ui-view></div></div></section>");
  $templateCache.put("modules/forms/admin/views/list-forms.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><section class=overlay ng-if=showCreateModal ng-click=closeCreateModal()></section><section data-ng-controller=\"ListFormsController as ctrl\" data-ng-init=findAll() class=container><br><div class=row><div ng-click=openCreateModal() class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-1 form-item create-new\"><div class=\"title-row col-xs-12\"><h4 class=\"fa fa-plus fa-6\"></h4></div><div class=\"col-xs-12 details-row\"><small class=list-group-item-text>{{ 'CREATE_A_NEW_FORM' | translate }}</small></div></div><form name=forms.createForm class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-1 form-item create-new new-form\" ng-if=showCreateModal><div class=\"title-row row\"><div class=\"col-xs-5 field-title text-left\">Name</div><div class=\"col-xs-12 field-input\"><input name=title required ng-model=formTitle ng-pattern=languageRegExp ng-minlength=4 style=\"color:black\"></div></div><div class=\"details-row row\"><div class=\"col-xs-5 field-title text-left\">Language</div><div class=\"col-xs-12 field-input\"><div class=\"button custom-select\"><select style=color:black name=language required ng-model=formLanguage ng-init=\"formLanguage = user.language\"><option ng-repeat=\"language in languages\" value={{language}}>{{language}}</option></select></div></div></div><div class=\"details-row submit row\"><div class=\"col-xs-12 field-title text-center\"><button class=\"btn btn-primary\" ng-disabled=forms.createForm.$invalid ng-click=createNewForm()>{{ 'CREATE_FORM' | translate }}</button></div></div></form><div data-ng-repeat=\"form in myforms\" ng-style=\"{ 'background-color': form.design.colors.backgroundColor, 'color': form.design.colors.answerColor }\" class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-1 form-item container\"><div class=row><span class=pull-right><i style=cursor:pointer class=\"fa fa-trash-o\" ng-click=removeForm($index)></i> <i style=cursor:pointer class=\"fa fa-files-o\" ng-click=duplicateForm($index)></i></span></div><div class=row><a data-ng-href=#!/forms/{{form._id}}/admin/create ng-style=\"{ 'color': form.design.colors.answerColor }\" class=\"title-row col-xs-12\"><h4 class=list-group-item-heading data-ng-bind=form.title></h4></a></div><div class=\"row footer\"><div class=\"col-xs-12 details-row\"><small class=list-group-item-text>{{ 'CREATED_ON' | translate }} <span data-ng-bind=\"form.created | date:'shortDate'\"></span></small></div></div></div></div></section>");
  $templateCache.put("modules/forms/base/views/submit-form.client.view.html",
    "<section class=public-form ng-style=\"{ 'background-color': myform.design.colors.backgroundColor }\"><submit-form-directive myform=myform></submit-form-directive></section><script ng-if=myform.analytics.gaCode>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n" +
    "				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n" +
    "			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n" +
    "	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\n" +
    "\n" +
    "	ga('create', '{{myform.analytics.gaCode}}', 'auto');\n" +
    "	ga('send', 'pageview');</script>");
  $templateCache.put("modules/forms/admin/views/adminTabs/analyze.html",
    "<edit-submissions-form-directive myform=myform user=user></edit-submissions-form-directive>");
  $templateCache.put("modules/forms/admin/views/adminTabs/configure.html",
    "<configure-form-directive myform=myform user=user></configure-form-directive>");
  $templateCache.put("modules/forms/admin/views/adminTabs/create.html",
    "<edit-form-directive myform=myform></edit-form-directive>");
  $templateCache.put("modules/forms/admin/views/adminTabs/design.html",
    "<div class=\"config-form design container\"><div class=row><div class=\"col-md-12 container\"><div class=row><div class=col-sm-12><h2 class=\"hidden-sm hidden-xs\">{{ 'DESIGN_HEADER' | translate }}</h2><h3 class=\"hidden-lg hidden-md\">{{ 'DESIGN_HEADER' | translate }}</h3></div></div><div class=\"row field\"><div class=\"field-title col-sm-3\"><h5>{{ 'BACKGROUND_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-9\"><input colorpicker=hex ng-model=myform.design.colors.backgroundColor ng-style=\"{ 'background-color': myform.design.colors.backgroundColor }\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-3\"><h5>{{ 'QUESTION_TEXT_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-9\"><input colorpicker=hex ng-model=myform.design.colors.questionColor ng-style=\"{ 'background-color': myform.design.colors.questionColor }\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-3\"><h5>{{ 'ANSWER_TEXT_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-9\"><input colorpicker=hex ng-model=myform.design.colors.answerColor ng-style=\"{ 'background-color': myform.design.colors.answerColor }\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-3\"><h5>{{ 'BTN_BACKGROUND_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-9\"><input colorpicker=hex ng-model=myform.design.colors.buttonColor ng-style=\"{ 'background-color': myform.design.colors.buttonColor }\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-3\"><h5>{{ 'BTN_TEXT_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-9\"><input colorpicker=hex ng-model=myform.design.colors.buttonTextColor ng-style=\"{ 'background-color': myform.design.colors.buttonTextColor }\"></div></div></div></div><div class=row><div class=\"col-sm-offset-4 col-sm-2\"><button class=\"btn btn-primary btn-large\" type=button ng-click=\"update(false, null)\"><i class=\"icon-arrow-left icon-white\"></i> Save Changes</button></div><div class=col-sm-1><button class=\"btn btn-default\" type=button ng-click=resetForm()><i class=\"icon-eye-open icon-white\"></i> Cancel</button></div></div></div>");
  $templateCache.put("modules/forms/admin/views/directiveViews/cgBusy/update-form-message-TypeA.html",
    "<div><div style=\"text-align:center;font-size:26px;position:absolute;top:100px;width:100%;text-shadow:1px 1px 2px white, -1px -1px 2px white,-4px 4px 4px white,-4px 4px 4px white\">{{$message}}</div></div>");
  $templateCache.put("modules/forms/admin/views/directiveViews/cgBusy/update-form-message-TypeB.html",
    "<div><div style=\"text-align: center; font-size: 20px;position: fixed; bottom: 0; right: 55px; background-color: gray; color: white; padding: 5px 15px 5px 10px; z-index: 10\">{{$message}}</div></div>");
  $templateCache.put("modules/forms/admin/views/directiveViews/form/configure-form.client.view.html",
    "<div class=\"config-form container\"><div class=row><div class=\"col-sm-12 container-fluid\"><div class=row><div class=col-sm-12><h2 class=\"hidden-sm hidden-xs\">{{ 'ADVANCED_SETTINGS' | translate }}</h2><h3 class=\"hidden-lg hidden-md\">{{ 'ADVANCED_SETTINGS' | translate }}</h3></div></div><div class=\"row field\"><div class=\"field-title col-sm-4\"><h5>{{ 'FORM_NAME' | translate }}</h5></div><div class=col-sm-8><input ng-model=myform.title value={{myform.title}} style=\"width: 100%\" ng-minlength=4 ng-pattern=\"/^[a-zA-Z0-9 \\-.]*$/\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-6\"><h5>{{ 'FORM_STATUS' | translate }}</h5></div><div class=\"field-input col-sm-6\"><label><input type=radio data-ng-value=true ng-model=myform.isLive ng-required=true style=\"background-color:#33CC00\"> &nbsp;<span>{{ 'PUBLIC' | translate }}</span></label><label><input type=radio data-ng-value=false ng-model=myform.isLive ng-required=\"true\"> &nbsp;<span>{{ 'PRIVATE' | translate }}</span></label></div></div><div class=\"row field\"><div class=\"field-title col-sm-4\"><h5>{{ 'GA_TRACKING_CODE' | translate }}</h5></div><div class=col-sm-8><input ng-model=myform.analytics.gaCode value={{myform.analytics.gaCode}} style=\"width: 100%\" ng-minlength=4 placeholder=UA-XXXXX-Y ng-pattern=\"/\\bUA-\\d{4,10}-\\d{1,4}\\b/\"></div></div><div class=\"row field\"><div class=\"col-xs-6 field-title\">Language</div><div class=\"col-xs-4 field-input\"><select ng-model=myform.language><option ng-repeat=\"language in languages\" ng-selected=\"language == myform.language\" value={{language}}>{{language}}</option></select><span class=required-error ng-show=\"field.required && !field.fieldValue\">* required</span></div></div><div class=\"row field\"><div class=\"field-title col-sm-6\"><h5>{{ 'DISPLAY_FOOTER' | translate }}</h5></div><div class=\"field-input col-sm-6\"><label><input type=radio data-ng-value=false ng-model=myform.hideFooter ng-required=\"true\"> &nbsp;<span>{{ 'YES' | translate }}</span></label><label><input type=radio data-ng-value=true ng-model=myform.hideFooter ng-required=\"true\"> &nbsp;<span>{{ 'No' | translate }}</span></label></div></div><div class=\"row field\"><div class=\"field-title col-sm-6\"><h5>Display Start Page?</h5></div><div class=\"field-input col-sm-6\"><label><input type=radio data-ng-value=true ng-model=myform.startPage.showStart ng-required=true style=\"background-color:#33CC00\"> &nbsp;<span>{{ 'YES' | translate }}</span></label><label><input type=radio data-ng-value=false ng-model=myform.startPage.showStart ng-required=\"true\"> &nbsp;<span>{{ 'NO' | translate }}</span></label></div></div></div></div><div class=row><div class=\"col-sm-offset-4 col-sm-2\"><button class=\"btn btn-primary btn-large\" type=button ng-click=\"update(false, null)\"><i class=\"icon-arrow-left icon-white\"></i>{{ 'SAVE_CHANGES' | translate }}</button></div><div class=col-sm-1><button class=\"btn btn-default\" type=button ng-click=resetForm()><i class=\"icon-eye-open icon-white\"></i>{{ 'CANCEL' | translate }}</button></div></div></div>");
  $templateCache.put("modules/forms/admin/views/directiveViews/form/edit-form.client.view.html",
    "<form class=\"row container\" name=editForm auto-save-form auto-save-watch=myform auto-save-callback=update><div class=\"col-xs-2 col-sm-4 col-md-4 add-field\"><div class=\"row add-field-title\"><h3 class=\"col-md-12 hidden-sm hidden-xs\">{{ 'ADD_FIELD_LG' | translate }}</h3><h4 class=\"col-sm-12 hidden-xs hidden-md hidden-lg\">{{ 'ADD_FIELD_MD' | translate }}</h4><h5 class=\"col-xs-12 hidden-sm hidden-md hidden-lg\">{{ 'ADD_FIELD_SM' | translate }}</h5></div><div class=\"panel-group row\" class=draggable ng-model=addField.types><div class=\"col-xs-12 col-sm-12 col-md-6\" ng-repeat=\"type in addField.types\" style=padding-top:7.5px><div class=\"panel panel-default\" style=background-color:#f5f5f5><div class=panel-heading ng-click=\"addNewField(true, type.name)\" style=\"cursor: pointer; font-size:12px; padding-left: 10px; padding-right: 10px\"><span><field-icon-directive type-name={{type.name}}></field-icon-directive></span> <span class=hidden-xs style=padding-left:0.3em>{{type.value}}</span></div></div></div></div></div><div class=\"col-xs-10 col-sm-8 current-fields container\"><div class=row><div class=col-sm-12><div class=\"panel panel-default startPage\"><div class=\"panel-heading accordion-toggle collapsed\" data-toggle=collapse data-target=#collapseStart><h4 class=text-center>{{ 'WELCOME_SCREEN' | translate }} <span class=pull-right><i class=\"fa fa-chevron-right\" ng-hide=startPage.isOpen></i> <i class=\"fa fa-chevron-down\" ng-show=startPage.isOpen></i></span></h4></div><div id=collapseStart class=\"panel-collapse collapse\"><div class=panel-body><div class=\"row hidden-sm hidden-xs\"><div class=col-md-12><h4>{{ 'PREVIEW_START_PAGE' | translate }}</h4></div><ul class=\"col-md-12 container\" style=\"list-style:none; border:2px lightgray solid; padding-bottom: 2em\"><div class=\"field row\"><div class=\"col-xs-12 text-center\" style=\"overflow-wrap: break-word\"><h1>{{myform.startPage.introTitle}}</h1></div><div class=\"col-xs-10 col-xs-offset-1 text-left\" style=\"overflow-wrap: break-word\"><p style=color:#ddd>{{myform.startPage.introParagraph}}</p></div></div><div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em\"><p ng-repeat=\"button in myform.startPage.buttons\" class=text-center style=display:inline><button class=\"btn btn-info\" type=button ng-style=\"{'background-color':button.bgColor, 'color':button.color}\"><a href={{button.url}} style=\"font-size: 1.6em; text-decoration: none; color: inherit\">{{button.text}}</a></button></p></div><div class=\"row form-actions\"><button class=\"btn btn-info btn btn-info col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3\" type=button><span style=\"color:white; font-size: 1.6em; text-decoration: none\">{{myform.startPage.introButtonText}}</span></button></div></ul></div><div class=row><div class=col-xs-12><h4>{{ 'EDIT_START_PAGE' | translate }}</h4><br></div></div><div class=\"row question\"><div class=\"col-md-4 col-sm-12\">{{ 'INTRO_TITLE' | translate }}:</div><div class=\"col-md-8 col-sm-12\"><input ng-model=myform.startPage.introTitle name=introTitleStartPage value={{myform.startPage.introTitle}} required></div></div><div class=\"row question\"><div class=\"col-md-4 col-sm-12\">{{ 'INTRO_PARAGRAPH' | translate }}:</div><div class=\"col-md-8 col-sm-12\"><textarea type=text ng-model=myform.startPage.introParagraph name=introParagraphStartPage></textarea></div></div><div class=\"row question\"><div class=\"col-md-4 col-sm-12\">{{ 'INTRO_BTN' | translate }}:</div><div class=\"col-md-8 col-sm-12\"><input ng-model=myform.startPage.introButtonText name=introButtonText value={{myform.startPage.introButtonText}} required></div></div><div class=row><br><br></div><div class=\"row options buttons\"><div class=\"col-md-3 col-xs-12\">Buttons:</div><div class=\"col-md-9 col-xs-12\"><div ng-repeat=\"button in myform.startPage.buttons track by button._id\" class=row style=padding-bottom:1em><div class=col-xs-5><span>{{ 'BUTTON_TEXT' | translate }}</span> <input name={{button.text}}_buttonText_startPage ng-model=button.text value={{button.text}} placeholder=\"Button Text\"></div><div class=col-xs-5><span>{{ 'BUTTON_LINK' | translate }}</span> <input name={{button.url}}_url_startPage ng-model=button.url value={{button.url}} placeholder=http://aeouaou.com/aoeuoa></div><div class=col-xs-2><a class=\"btn btn-danger btn-mini right\" type=button ng-click=deleteButton(button)><i class=\"fa fa-trash-o\"></i></a></div></div><div class=row><br></div><div class=row><button class=\"btn btn-primary btn-small col-md-offset-6 col-md-6 col-sm-4 col-sm-offset-8 col-xs-4 col-xs-offset-8\" type=button ng-click=addButton()><i class=\"icon-plus icon-white\"></i> {{ 'ADD_BUTTON' | translate }}</button></div></div></div></div></div></div></div></div><div class=row><div class=col-sm-12><hr></div></div><div class=row><div class=\"col-sm-12 col-md-10 dropzoneContainer\"><accordion close-others=accordion.oneAtATime ui-sortable=sortableOptions ng-model=myform.form_fields class=dropzone><accordion-group ng-repeat=\"field in myform.form_fields track by field._id\" is-open=accordion[$index].isOpen on-finish-render=editFormFields ng-if=!field.deletePreserved><accordion-heading><div class=handle><span class=col-xs-1 ng-switch=field.fieldType><field-icon-directive type-name={{field.fieldType}}></field-icon-directive></span> <span class=col-xs-10>{{field.title}} <span ng-show=field.required>*</span></span> <span class=pull-right><i class=\"fa fa-chevron-right\" ng-hide=accordion[$index].isOpen></i> <i class=\"fa fa-chevron-down\" ng-show=accordion[$index].isOpen></i></span></div></accordion-heading><div class=\"accordion-edit container\"><div class=\"row hidden-sm hidden-xs\"><div class=col-md-12><h4>{{ 'PREVIEW_FIELD' | translate }}</h4></div><ul class=\"col-md-12 container\" style=\"list-style:none;border:2px lightgray solid\"><field-directive field=field validate=false></field-directive></ul><hr></div><div class=row><div class=col-xs-12><h4>{{ 'EDIT_FIELD' | translate }}</h4><br></div></div><div class=\"row question\"><div class=\"col-md-4 col-sm-12\">{{ 'QUESTION_TITLE' | translate }}:</div><div class=\"col-md-8 col-sm-12\"><input ng-model=field.title name=title{{field._id}} value={{field.title}} required></div></div><div class=row><br></div><div class=\"row description\" ng-hide=showRatingOptions(field)><div class=\"col-md-4 col-sm-12\">{{ 'QUESTION_DESCRIPTION' | translate }}:</div><div class=\"col-md-8 col-sm-12\"><textarea type=text ng-model=field.description name=description{{field._id}} value={{field.description}}></textarea></div></div><div class=row ng-show=showAddOptions(field)><br></div><div class=\"row options\" ng-if=showAddOptions(field)><div class=\"col-md-4 col-xs-12\">{{ 'OPTIONS' | translate }}:</div><div class=\"col-md-8 col-xs-12\"><div ng-repeat=\"option in field.fieldOptions track by option.option_id\" class=row><input name={{option.option_value}}{{field._id}} ng-model=option.option_value class=col-xs-5> <a class=\"btn btn-danger btn-mini right\" type=button ng-click=\"deleteOption($index, option)\" class=col-xs-3><i class=\"fa fa-trash-o\"></i></a></div><div class=row><button class=\"btn btn-primary btn-small col-md-offset-0 col-md-6 col-sm-4 col-sm-offset-4 col-xs-6 col-xs-offset-6\" type=button ng-click=addOption($index)><i class=\"icon-plus icon-white\"></i> {{ 'ADD_OPTION' | translate }}</button></div></div></div><div class=row ng-show=showRatingOptions(field)><br></div><div class=row ng-if=showRatingOptions(field)><div class=\"col-md-9 col-sm-9\">{{ 'NUM_OF_STEPS' | translate }}</div><div class=\"col-md-3 col-sm-3\"><input style=width:100% type=number min=1 max=10 ng-model=field.ratingOptions.steps name=ratingOptions_steps{{field._id}} ng-value={{field.ratingOptions.steps}} required></div><br><div class=\"col-md-5 col-sm-9\">Shape:</div><div class=\"col-md-7 col-sm-3\"><select style=width:100% ng-model=field.ratingOptions.shape value={{field.ratingOptions.steps}} name=ratingOptions_shape{{field._id}} required><option ng-repeat=\"shapeType in field.ratingOptions.validShapes\" value={{shapeType}}>{{select2FA[shapeType]}}</option></select></div></div><div class=row><br></div><div class=row><div class=\"col-md-4 col-xs-12 field-title\">Required:</div><div class=\"col-md-8 col-xs-12 field-input\"><label class=\"btn col-xs-5\"><input type=radio ng-value=true ng-model=field.required name=\"required{{field._id}}\"> <span>&nbsp; {{ 'YES' | translate }}</span></label><label class=\"btn col-xs-5 col-xs-offset-1\"><input type=radio ng-value=false ng-model=field.required name=\"required{{field._id}}\"> <span>&nbsp; {{ 'NO' | translate }}</span></label></div></div><div class=row><div class=\"col-md-4 col-xs-12 field-input\">{{ 'DISABLED' | translate }}</div><div class=\"col-md-8 col-xs-12 field-input\"><label class=\"btn col-xs-5\"><input type=radio ng-value=true ng-model=field.disabled name=\"disabled{{field._id}}\"> <span>&nbsp; {{ 'YES' | translate }}</span></label><label class=\"btn col-xs-5 col-xs-offset-1\"><input type=radio ng-value=false ng-model=field.disabled name=\"disabled{{field._id}}\"> <span>&nbsp; {{ 'NO' | translate }}</span></label></div></div><div class=row ng-if=\"myform.form_fields.length > 1 && myform.form_fields[$index].logicJump.fieldA\"><h4>Logic Jump</h4></div><div class=row ng-if=\"myform.form_fields.length > 1 && myform.form_fields[$index].logicJump.fieldA\"><div class=\"col-md-4 col-xs-12 field-input\">{{ 'ADD_LOGIC_JUMP' | translate }}</div><div class=\"col-md-8 col-xs-12 field-input\"><label class=\"btn col-xs-5\"><input type=radio ng-checked=!!myform.form_fields[$index].logicJump.fieldA name=logicJumpYes{{field._id}} ng-click=\"addNewLogicJump($index)\"> <span>&nbsp; {{ 'YES' | translate }}</span></label><label class=\"btn col-xs-5 col-xs-offset-1\"><input type=radio ng-checked=!myform.form_fields[$index].logicJump.fieldA name=logicJumpNo{{field._id}} ng-click=\"removeLogicJump($index)\"> <span>&nbsp; {{ 'NO' | translate }}</span></label></div></div><div class=\"row question\" ng-if=\"myform.form_fields.length > 1 && myform.form_fields[$index].logicJump.fieldA\"><div class=\"col-md-4 col-sm-12\"><b>If this field</b></div><div class=\"col-md-4 col-sm-12\"><select style=width:100% ng-model=field.logicJump.expressionString value={{field.logicJump.expressionString}} name=logicjump_expressionString{{field._id}}><option value=\"a == b\">is equal to</option><option value=\"a !== b\">is not equal to</option></select></div><div class=\"col-md-4 col-sm-12\"><input ng-model=\"field.logicJump.valueB\"></div><div class=\"col-md-4 col-md-offset-2\"><b>Jumps to</b></div><div class=\"col-md-6 col-sm-12\"><select style=width:100% ng-model=field.logicJump.jumpTo value={{field.logicJump.jumpTo}} name=logicjump_jumpTo{{field._id}}><option ng-repeat=\"jump_field in myform.form_fields\" value={{jump_field._id}}>{{jump_field.title}}</option></select></div></div></div></accordion-group><div class=\"panel panel-default\" style=\"border-style: dashed; border-color: #a9a9a9\"><div class=panel-heading><h4 class=\"panel-title text-center\" style=\"color: #a9a9a9\">{{ 'CLICK_FIELDS_FOOTER' | translate }}</h4></div></div><hr></accordion></div><div class=\"col-md-1 hidden-xs hidden-sm\" style=\"padding:0 5px\"><div class=\"panel-group tool-panel text-center\"><div class=\"panel panel-default\" ng-repeat=\"field in myform.form_fields track by field._id\" ng-if=!field.deletePreserved><div class=panel-heading style=\"padding: 10px 10px; height: 37px\" ng-click=deleteField($index)><span class=text-center><a href=\"\" class=\"fa fa-trash-o\"></a></span></div></div></div></div><div class=\"col-md-1 hidden-xs hidden-sm\" style=\"padding:0 5px\"><div class=\"panel-group tool-panel text-center\"><div class=\"panel panel-default\" ng-repeat=\"field in myform.form_fields track by field._id\" ng-if=!field.deletePreserved><div class=panel-heading style=\"padding: 10px 10px; height: 37px\" ng-click=duplicateField($index)><span class=text-center><a href=\"\" class=\"fa fa-files-o\"></a></span></div></div></div></div></div></div></form>");
  $templateCache.put("modules/forms/admin/views/directiveViews/form/edit-submissions-form.client.view.html",
    "<div class=\"submissions-table row container\"><div class=\"row text-center analytics\"><div class=\"row col-xs-12 header-numbers\">Overview Analytics</div><div class=\"row col-xs-12 header-title\"><div class=col-xs-3>{{ 'TOTAL_VIEWS' | translate }}</div><div class=col-xs-3>{{ 'RESPONSES' | translate }}</div><div class=col-xs-3>{{ 'COMPLETION_RATE' | translate }}</div><div class=col-xs-3>{{ 'AVERAGE_TIME_TO_COMPLETE' | translate }}</div></div><div class=\"row col-xs-12 header-numbers\"><div class=col-xs-3>{{myform.analytics.views}}</div><div class=col-xs-3>{{myform.analytics.submissions}}</div><div class=col-xs-3>{{myform.analytics.conversionRate | number:0}}%</div><div class=col-xs-3>{{AverageTimeElapsed | secondsToDateTime | date:'mm:ss'}}</div></div><div class=\"row col-xs-12 header-numbers\">Device Analytics</div><div class=\"row col-xs-12 detailed-title\"><div class=col-xs-3>{{ 'DESKTOP_AND_LAPTOP' | translate }}</div><div class=col-xs-3>{{ 'TABLETS' | translate }}</div><div class=col-xs-3>{{ 'PHONES' | translate }}</div><div class=col-xs-3>{{ 'OTHER' | translate }}</div></div><div class=\"row col-xs-12 detailed-row\"><div class=col-xs-3><div class=\"row header\">{{ 'UNIQUE_VISITS' | translate }}</div><div class=row>{{DeviceStatistics.desktop.visits}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'UNIQUE_VISITS' | translate }}</div><div class=row>{{DeviceStatistics.tablet.visits}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'UNIQUE_VISITS' | translate }}</div><div class=row>{{DeviceStatistics.tablet.visits}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'UNIQUE_VISITS' | translate }}</div><div class=row>{{DeviceStatistics.other.visits}}</div></div></div><div class=\"row col-xs-12 detailed-row\"><div class=col-xs-3><div class=\"row header\">{{ 'RESPONSES' | translate }}</div><div class=row>{{DeviceStatistics.desktop.responses}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'RESPONSES' | translate }}</div><div class=row>{{DeviceStatistics.tablet.responses}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'RESPONSES' | translate }}</div><div class=row>{{DeviceStatistics.phone.responses}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'RESPONSES' | translate }}</div><div class=row>{{DeviceStatistics.other.responses}}</div></div></div><div class=\"row col-xs-12 detailed-row\"><div class=col-xs-3><div class=\"row header\">{{ 'COMPLETION_RATE' | translate }}</div><div class=row>{{DeviceStatistics.desktop.completion}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'COMPLETION_RATE' | translate }}</div><div class=row>{{DeviceStatistics.tablet.completion}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'COMPLETION_RATE' | translate }}</div><div class=row>{{DeviceStatistics.phone.completion}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'COMPLETION_RATE' | translate }}</div><div class=row>{{DeviceStatistics.other.completion}}</div></div></div><div class=\"row col-xs-12 detailed-row\"><div class=col-xs-3><div class=\"row header\">{{ 'AVERAGE_TIME_TO_COMPLETE' | translate }}</div><div class=row>{{DeviceStatistics.desktop.average_time | secondsToDateTime | date:'mm:ss'}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'AVERAGE_TIME_TO_COMPLETE' | translate }}</div><div class=row>{{DeviceStatistics.tablet.average_time | secondsToDateTime | date:'mm:ss'}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'AVERAGE_TIME_TO_COMPLETE' | translate }}</div><div class=row>{{DeviceStatistics.phone.average_time | secondsToDateTime | date:'mm:ss'}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'AVERAGE_TIME_TO_COMPLETE' | translate }}</div><div class=row>{{DeviceStatistics.other.average_time | secondsToDateTime | date:'mm:ss'}}</div></div></div><div class=\"row col-xs-12 text-center\" style=font-size:5em>Field Analytics</div><div class=\"row col-xs-12 field-title-row\"><div class=col-xs-3><strong>{{ 'FIELD_TITLE' | translate }}</strong></div><div class=col-xs-3><strong>{{ 'FIELD_VIEWS' | translate }}</strong></div><div class=col-xs-3><strong>{{ 'FIELD_RESPONSES' | translate }}</strong></div><div class=col-xs-3><strong>{{ 'FIELD_DROPOFF' | translate }}</strong></div></div><div class=\"row col-xs-12 field-detailed-row\" ng-repeat=\"fieldStats in myform.analytics.fields\"><div class=col-xs-3>{{fieldStats.field.title}}</div><div class=col-xs-3>{{fieldStats.totalViews}}</div><div class=col-xs-3>{{fieldStats.responses}}</div><div class=col-xs-3>{{fieldStats.continueRate}}%</div></div></div><br><div class=\"row col-xs-12 header-numbers text-center\" style=font-size:5em>Responses Table</div><div class=\"row table-tools\"><div class=col-xs-2><button class=\"btn btn-danger\" ng-click=deleteSelectedSubmissions() ng-disabled=!isAtLeastOneChecked();><i class=\"fa fa-trash-o\"></i> {{ 'DELETE_SELECTED' | translate }}</button></div><div class=\"col-xs-2 col-xs-offset-4 text-right\"><button class=\"btn btn-default\" ng-click=\"exportSubmissions('xml')\"><small>{{ 'EXPORT_TO_EXCEL' | translate }}</small></button></div><div class=\"col-md-2 text-right\"><button class=\"btn btn-default\" ng-click=\"exportSubmissions('csv')\"><small>{{ 'EXPORT_TO_CSV' | translate }}</small></button></div><div class=\"col-md-2 text-right\"><button class=\"btn btn-default\" ng-click=\"exportSubmissions('json')\"><small>{{ 'EXPORT_TO_JSON' | translate }}</small></button></div></div><div class=\"row table-outer\"><div class=col-xs-12><table id=table-submission-data class=\"table table-striped table-hover table-condensed\"><thead><tr><th><input ng-model=table.masterChecker ng-change=toggleAllCheckers() type=\"checkbox\"></th><th>#</th><th data-ng-repeat=\"(key, value) in myform.form_fields\">{{value.title}}</th><th>{{ 'PERCENTAGE_COMPLETE' | translate }}</th><th>{{ 'TIME_ELAPSED' | translate }}</th><th>{{ 'DEVICE' | translate }}</th><th>{{ 'LOCATION' | translate }}</th><th>{{ 'IP_ADDRESS' | translate }}</th><th>{{ 'DATE_SUBMITTED' | translate }} (UTC)</th><th ng-if=myform.autofillPDFs>{{ 'GENERATED_PDF' | translate }}</th></tr></thead><tbody><tr data-ng-repeat=\"row in table.rows\" ng-click=rowClicked($index) ng-class=\"{selected: row.selected === true}\"><td><input ng-model=row.selected type=\"checkbox\"></td><th class=scope>{{$index+1}}</th><td data-ng-repeat=\"field in row.form_fields\">{{field.fieldValue}}</td><td>{{row.percentageComplete}}%</td><td>{{row.timeElapsed | secondsToDateTime | date:'mm:ss'}}</td><td>{{row.device.name}}, {{row.device.type}}</td><td>{{row.geoLocation.city}}, {{row.geoLocation.country_name}}</td><td>{{row.ipAddr}}</td><td>{{row.created | date:'yyyy-MM-dd HH:mm:ss'}}</td><td ng-if=row.pdf><a href={{row.pdfFilePath}} download={{row.pdf.name}} target=_self>{{ 'GENERATED_PDF' | translate }}</a></td></tr></tbody></table></div></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/entryPage/startPage.html",
    "<div class=\"field row text-center\"><div class=\"col-xs-12 text-center\"><h1>{{pageData.introTitle}}</h1></div><div class=\"col-xs-10 col-xs-offset-1 text-left\"><p style=color:#ddd>{{pageData.introParagraph}}</p></div></div><div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em\"><p ng-repeat=\"button in pageData.buttons\" class=text-center style=display:inline><button class=\"btn btn-info\" type=button ng-style=\"{'background-color':button.bgColor, 'color':button.color}\"><a href={{button.url}} style=\"font-size: 1.6em; text-decoration: none; color: inherit\">{{button.text}}</a></button></p></div><div class=\"row form-actions\"><p class=\"col-xs-3 col-xs-offset-3 text-center\"><button class=\"btn btn-info\" type=button><a ng-click=exitpageData() style=\"color:white; font-size: 1.6em; text-decoration: none\">{{ 'CONTINUE_FORM' | translate }}</a></button></p></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/date.html",
    "<div class=\"field row\" ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=\"!field.required && !field.fieldValue\">{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><div class=\"control-group input-append\"><input class=focusOn ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" ng-class=\"{ 'no-border': !!field.fieldValue }\" ui-date=dateOptions ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled placeholder=MM/DD/YYYY ng-focus=\"setActiveField(field._id, index, true)\" on-tab-key=nextField() on-tab-and-shift-key=prevField() ng-change=$root.nextField()></div></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/dropdown.html",
    "<div class=\"field row dropdown\" ng-if=\"field.fieldOptions.length > 0\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><ui-select ng-model=field.fieldValue theme=selectize search-enabled=true search-by=option_value set-search-to-answer=true ng-required=field.required ng-disabled=field.disabled on-tab-and-shift-key=prevField() on-tab-key=nextField() ng-change=$root.nextField()><ui-select-match placeholder=\"Type or select an option\"></ui-select-match><ui-select-choices repeat=\"option in field.fieldOptions | filter: $select.search\" ng-class=\"{'active': option.option_value === field.fieldValue }\"><span ng-bind-html=\"option.option_value | highlight: $select.search\"></span></ui-select-choices></ui-select></div></div><br>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/file.html",
    "<div class=\"field row\" ng-if=form.autofillPDFs ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3></div><div class=\"col-sm-8 field-input\"><div class=input-group><div tabindex=-1 class=\"form-control file-caption\"><span class=file-caption-ellipsis ng-if=!form.pdf>…</span><div class=file-caption-name ng-if=form.pdf>{{field.file.originalname}}</div></div><div class=input-group-btn><button type=button ng-if=field.file ng-click=removeFile(field); title=\"Clear selected files\" class=\"btn btn-danger fileinput-remove fileinput-remove-button\"><i class=\"glyphicon glyphicon-trash\"></i> {{ 'DELETE' | translate }}</button> <button type=button ng-if=field.fileLoading title=\"Abort ongoing upload\" class=\"btn btn-default\" ng-click=cancelFileUpload(field)><i class=\"glyphicon glyphicon-ban-circle\"></i> {{ 'CANCEL' | translate }}</button><div class=\"btn btn-success btn-file\" ngf-select ngf-change=uploadPDF($files) ng-if=!field.file><i class=\"glyphicon glyphicon-upload\"></i> {{ UPLOAD_FILE | translate }}</div></div></div></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/hidden.html",
    "<input ng-focus=\"setActiveField(field._id, index, true)\" ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" type=hidden ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" value={{field.fieldValue}} ng-disabled=field.disabled>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/legal.html",
    "<div class=\"field row radio legal\" on-enter-or-tab-key=nextField() key-to-truthy key-char-truthy=y key-char-falsey=n field=field><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><br><p class=col-xs-12>{{field.description}}</p></div><div class=\"col-xs-12 field-input container\"><div class=row-fluid on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField()><label class=\"btn col-md-5 col-xs-12\" ng-class=\"{activeBtn: field.fieldValue == 'true'}\"><input class=focusOn ng-focus=\"setActiveField(field._id, index, true)\" ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" type=radio value=true ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled ng-change=\"$root.nextField()\"><div class=letter style=float:left>Y</div><span>{{ 'LEGAL_ACCEPT' | translate }}</span></label><label class=\"btn col-md-5 col-md-offset-1 col-xs-12\" ng-class=\"{activeBtn: field.fieldValue == 'false'}\"><input class=focusOn ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" type=radio value=false ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled ng-change=\"$root.nextField()\"><div class=letter style=float:left>N</div><span>{{ 'LEGAL_NO_ACCEPT' | translate }}</span></label></div></div></div><br>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/radio.html",
    "<div class=\"field row radio\" on-enter-or-tab-key=nextField() key-to-option field=field ng-if=\"field.fieldOptions.length > 0\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><div ng-repeat=\"option in field.fieldOptions\" class=row-fluid><label class=\"btn col-md-4 col-xs-12 col-sm-12\" style=\"margin: 0.5em; padding-left:30px\" ng-class=\"{activeBtn: field.fieldValue == field.fieldOptions[$index].option_value}\"><div class=letter style=float:left>{{$index+1}}</div><input ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" style=visibility:hidden type=radio class=focusOn ng-focus=\"setActiveField(field._id, index, true)\" value={{option.option_value}} ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled ng-change=\"$root.nextField()\"> <span ng-bind=option.option_value style=\"white-space: normal\"></span></label></div></div></div><br>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/rating.html",
    "<div class=\"textfield field row\" on-enter-or-tab-key=nextField()><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><input-stars max={{field.ratingOptions.steps}} ng-init=\"field.fieldValue = 1\" on-star-click=$root.nextField() icon-full={{field.ratingOptions.shape}} icon-base=\"fa fa-3x\" icon-empty={{field.ratingOptions.shape}} ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() ng-focus=\"setActiveField(field._id, index, true)\" class=\"angular-input-stars focusOn\"></input-stars></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/statement.html",
    "<div class=\"statement field row\" on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() ng-focus=\"setActiveField(field._id, index, true)\"><div class=\"row field-title field-title\"><div class=col-xs-1><i class=\"fa fa-quote-left fa-1\"></i></div><h2 class=\"text-left col-xs-9\">{{field.title}}</h2><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"row field-title field-input\"><p class=col-xs-12 ng-if=field.description.length>{{field.description}}</p><br><div class=\"col-xs-offset-1 col-xs-11\"><button class=\"btn focusOn\" ng-style=\"{'font-size': '1.3em', 'background-color':design.colors.buttonColor, 'color':design.colors.buttonTextColor}\" ng-focused=\"setActiveField(field._id, index, true)\" ng-click=$root.nextField()>{{ 'CONTINUE' | translate }}</button></div></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/textarea.html",
    "<div class=\"field row\" ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><small>{{ 'NEWLINE' | translate }}</small><p><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><small style=font-size:0.6em>Press SHIFT+ENTER to add a newline</small><textarea class=\"textarea focusOn\" type=text ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-class=\"{ 'no-border': !!field.fieldValue }\" value={{field.fieldValue}} ng-required=field.required ng-disabled=field.disabled ng-focus=\"setActiveField(field._id, index, true)\" on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() style=\"border: none; border-left: lightgrey dashed 2px\">\n" +
    "		</textarea></div></div><div><div class=\"btn btn-lg btn-default hidden-xs\" style=\"padding: 4px; margin-top:8px; background: rgba(255,255,255,0.5)\"><button ng-disabled=\"!field.fieldValue || forms.myForm.{{field.fieldType}}{{$index}}.$invalid\" ng-style=\"{'background-color':design.colors.buttonColor, 'color':design.colors.buttonTextColor}\" ng-click=$root.nextField() class=\"btn col-sm-5 col-xs-5\">{{ 'OK' | translate }} <i class=\"fa fa-check\"></i></button><div class=\"col-sm-3 col-xs-6\" style=margin-top:0.2em><small style=\"color:#ddd; font-size:70%\">{{ 'ENTER' | translate }}</small></div></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/textfield.html",
    "<div class=\"textfield field row\" ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title row-fluid\" ng-style=\"{'color': design.colors.questionColor}\"><h3 class=col-xs-12><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>({{ 'OPTIONAL' | translate }})</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><input ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" name={{field.fieldType}}{{index}} type={{field.input_type}} ng-pattern=field.validateRegex placeholder={{field.placeholder}} ng-class=\"{ 'no-border': !!field.fieldValue }\" class=\"focusOn text-field-input\" ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" value=field.fieldValue ng-focus=\"setActiveField(field._id, index, true)\" on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() ng-required=field.required ng-disabled=field.disabled aria-describedby=inputError2Status></div><div class=col-xs-12><div ng-show=\"forms.myForm.{{field.fieldType}}{{index}}.$invalid && !!forms.myForm.{{field.fieldType}}{{index}}.$viewValue \" class=\"alert alert-danger\" role=alert><span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=true></span> <span class=sr-only>Error:</span> <span ng-if=\"field.fieldType == 'email'\">{{ 'ERROR_EMAIL_INVALID' | translate }}</span> <span ng-if=field.validateRegex>{{ 'ERROR_NOT_A_NUMBER' | translate }}</span> <span ng-if=\"field.fieldType == 'link'\">{{ 'ERROR_URL_INVALID' | translate }}</span></div></div></div><div><div class=\"btn btn-lg btn-default hidden-xs\" style=\"padding: 4px; margin-top:8px; background: rgba(255,255,255,0.5)\"><button ng-disabled=\"!field.fieldValue || forms.myForm.{{field.fieldType}}{{$index}}.$invalid\" ng-style=\"{'background-color':design.colors.buttonColor, 'color':design.colors.buttonTextColor}\" ng-click=$root.nextField() class=\"btn col-sm-5 col-xs-5\">{{ 'OK' | translate }} <i class=\"fa fa-check\"></i></button><div class=\"col-xs-6 col-sm-3\" style=margin-top:0.2em><small style=\"color:#ddd; font-size:70%\">{{ 'ENTER' | translate }}</small></div></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/yes_no.html",
    "<div class=\"field row radio\" ng-click=\"setActiveField(field._id, index, true)\" on-tab-and-shift-key=prevField() key-to-truthy key-char-truthy=y key-char-falsey=n field=field><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3 class=row><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=row>{{field.description}}</p></div><div class=\"col-xs-12 field-input\"><div class=\"row col-xs-12\"><label class=\"btn btn-default\" style=\"background: rgba(0,0,0,0.1); text-align:left\"><input type=radio value=true class=focusOn style=\"opacity: 0; margin-left: 0px\" ng-model=field.fieldValue ng-focus=\"setActiveField(field._id, index, true)\" ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-change=$root.nextField() ng-disabled=\"field.disabled\"><div class=letter>{{ 'Y' | translate }}</div><span>{{ 'YES' | translate }}</span> <i ng-show=\"field.fieldValue === 'true'\" class=\"fa fa-check\" aria-hidden=true></i></label></div><div class=\"row col-xs-12\" style=\"margin-top: 10px\"><label class=\"btn btn-default\" style=\"background: rgba(0,0,0,0.1); text-align:left\"><input type=radio value=false style=\"opacity:0; margin-left:0px\" ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-change=$root.nextField() ng-disabled=\"field.disabled\"><div class=letter>{{ 'N' | translate }}</div><span>{{ 'NO' | translate }}</span> <i ng-show=\"field.fieldValue === 'false'\" class=\"fa fa-check\" aria-hidden=true></i></label></div></div></div><br>");
  $templateCache.put("modules/forms/base/views/directiveViews/form/submit-form.client.view.html",
    "<section class=\"overlay submitform\" ng-if=\"loading || (!myform.submitted && !myform.startPage.showStart)\"></section><div ng-show=\"!myform.submitted && myform.startPage.showStart\" class=form-submitted style=\"padding-top: 35vh\"><div class=row><div class=\"col-xs-12 text-center\" style=\"overflow-wrap: break-word\"><h1 style=\"font-weight: 400; nont-size: 25px\">{{myform.startPage.introTitle}}</h1></div><div class=\"col-xs-10 col-xs-offset-1 text-center\" style=\"overflow-wrap: break-word\"><p style=\"color: grey; font-weight: 100; font-size: 16px\">{{myform.startPage.introParagraph}}</p></div></div><div class=\"row form-actions text-center\" style=\"padding: 5px 25px 5px 25px\"><button ng-click=exitStartPage() class=btn type=button ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\"><span style=\"font-size: 1.6em\">{{myform.startPage.introButtonText}}</span></button></div><div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em\"><p ng-repeat=\"button in myform.startPage.buttons\" class=text-center style=display:inline><button class=btn style=\"background-color:rgb(156, 226, 235)\" type=button ng-style=\"{'background-color':button.bgColor, 'color':button.color}\"><a href={{button.url}} style=\"font-size: 1.6em; text-decoration: none\" ng-style=\"{'color':button.color}\">{{button.text}}</a></button></p></div></div><div class=form-fields ng-show=\"!myform.submitted && !myform.startPage.showStart\" ng-style=\"{ 'border-color': myform.design.colors.buttonTextColor }\"><div class=row><form name=forms.myForm novalidate class=\"submission-form col-sm-12 col-md-offset-1 col-md-10\"><div ng-repeat=\"field in myform.form_fields\" ng-if=!field.deletePreserved data-index={{$index}} data-id={{field._id}} ng-class=\"{activeField: selected._id == field._id }\" class=\"row field-directive\"><field-directive field=field design=myform.design index=$index forms=forms></field-directive></div></form></div><div class=\"row form-actions\" id=submit_field ng-class=\"{activeField: selected._id == 'submit_field' }\" ng-style=\"{ 'background-color':myform.design.colors.buttonColor}\" style=\"border-top: 1px solid #ddd; margin-right: -13%; margin-left: -13%; margin-top: 30vh; height: 100vh\"><div class=\"col-xs-12 text-left\" style=\"background-color:#990000; color:white\" ng-if=forms.myForm.$invalid>{{ 'COMPLETING_NEEDED' | translate:translateAdvancementData }}</div><button ng-if=!forms.myForm.$invalid class=\"Button btn col-sm-2 col-xs-8 focusOn\" v-busy=loading v-busy-label=\"Please wait\" v-pressable ng-disabled=\"loading || forms.myForm.$invalid\" ng-click=submitForm() on-enter-key=submitForm() on-enter-key-disabled=\"loading || forms.myForm.$invalid\" ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" style=\"font-size: 1.6em; margin-left: 1em; margin-top: 1em\">{{ 'SUBMIT' | translate }}</button> <button ng-if=forms.myForm.$invalid class=\"Button btn col-sm-2 col-xs-8 focusOn\" ng-click=goToInvalid() on-enter-key=goToInvalid() on-enter-key-disabled=!forms.myForm.$invalid style=\"font-size: 1.6em; margin-left: 1em; margin-top: 1em; background-color:#990000; color:white\">{{ 'REVIEW' | translate }}</button><div class=\"col-sm-2 hidden-xs\" style=\"font-size: 75%; margin-top:3.25em\"><small>{{ 'ENTER' | translate }}</small></div></div><section ng-if=!myform.hideFooter class=\"navbar navbar-fixed-bottom\" ng-style=\"{ 'background-color':myform.design.colors.buttonColor, 'padding-top': '15px', 'border-top': '2px '+ myform.design.colors.buttonTextColor +' solid', 'color':myform.design.colors.buttonTextColor}\"><div class=container-fluid><div class=row><div class=\"col-sm-5 col-md-6 col-xs-5\" ng-show=!myform.submitted><p class=lead>{{ 'ADVANCEMENT' | translate:translateAdvancementData }}</p></div><div class=\"col-md-6 col-md-offset-0 col-sm-offset-2 col-sm-3 col-xs-offset-1 col-xs-6 row\"><div class=\"col-md-4 col-md-offset-2 hidden-sm hidden-xs\" ng-if=!authentication.isAuthenticated()><a href=/#!/forms class=btn ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\">{{ 'CREATE_FORM' | translate }}</a></div><div class=\"col-md-4 col-md-offset-2 hidden-sm hidden-xs\" ng-if=authentication.isAuthenticated()><a href=/#!/forms/{{myform._id}}/admin/create ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" class=btn>{{ 'EDIT_FORM' | translate }}</a></div><div class=\"col-md-4 col-sm-10 col-md-offset-0 col-sm-offset-2 col-xs-12 row\"><button class=\"btn btn-lg col-xs-6\" id=focusDownButton ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" ng-click=nextField() ng-disabled=\"selected.index > myform.form_fields.length-1\"><i class=\"fa fa-chevron-down\"></i></button> <button class=\"btn btn-lg col-xs-6\" id=focusUpButton ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" ng-click=prevField() ng-disabled=\"selected.index == 0\"><i class=\"fa fa-chevron-up\"></i></button></div></div></div></div></section></div><div ng-if=\"myform.submitted && !loading\" class=form-submitted ng-style=\"{'color':myform.design.colors.buttonTextColor}\" style=\"padding-top: 5vh\"><div class=\"field row text-center\"><div class=\"col-xs-12 col-sm-12 col-md-6 col-md-offset-3 text-center\">{{ 'FORM_SUCCESS' | translate }}</div></div><div class=\"row form-actions\"><p class=text-center><button ng-click=reloadForm() class=btn type=button ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\"><span style=\"font-size: 1.6em\">{{ 'BACK_TO_FORM' | translate }}</span></button></p></div></div>");
  $templateCache.put("modules/users/views/authentication/access-denied.client.view.html",
    "<section class=\"text-center auth\"><h3 class=col-md-12>{{ 'ACCESS_DENIED_TEXT' | translate }}</h3><a href=/#!/sigin class=col-md-12>{{ 'SIGNIN_BTN' | translate }}</a></section>");
  $templateCache.put("modules/users/views/authentication/signin.client.view.html",
    "<section class=\"auth sigin-view valign-wrapper\" data-ng-controller=AuthenticationController><div class=\"row valign\"><div class=\"col-md-4 col-md-offset-4\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo_white.svg height=100px></div><div class=col-md-12><form class=\"signin form-horizontal\" autocomplete=off><fieldset><div data-ng-show=error class=\"text-center text-danger\">Error: <strong data-ng-bind=error></strong></div><div class=form-group><input id=username name=username class=form-control data-ng-model=credentials.username placeholder=\"{{ 'USERNAME_LABEL' | translate }}\" ng-minlength=4></div><div class=form-group><input type=password id=password name=password class=form-control data-ng-model=credentials.password placeholder=\"{{ 'PASSWORD_LABEL' | translate }}\" ng-minlength=4></div><div class=form-group><button class=\"btn btn-signup\" ng-click=signin()>{{ 'SIGNIN_BTN' | translate }}</button></div><div class=\"text-center forgot-password\"><a ui-sref=forgot>{{ 'FORGOT_PASSWORD_LINK' | translate }}</a></div></fieldset></form></div></div><div class=\"text-center forgot-password col-md-12\"><a ui-sref=signup>{{ 'SIGNUP_ACCOUNT_LINK' | translate }}</a></div></div></section>");
  $templateCache.put("modules/users/views/authentication/signup-success.client.view.html",
    "<section class=\"auth signup-view success\" data-ng-controller=AuthenticationController><h3 class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6 text-center\">{{ 'SUCCESS_HEADER' | translate }}</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6\"><h2>{{ 'SUCCESS_TEXT' | translate }}<br><br>{{ 'NOT_ACTIVATED_YET' | translate }}</h2><br><br><p><strong>{{ 'BEFORE_YOU_CONTINUE' | translate }}</strong> <a href=mail:polydaic@gmail.com>polydaic@gmail.com</a></p><div class=\"text-center form-group\"><button type=submit class=\"btn btn-large btn-primary\"><a href=\"/#!/\" style=\"color: white; text-decoration: none\">Continue</a></button></div></div></section>");
  $templateCache.put("modules/users/views/authentication/signup.client.view.html",
    "<section class=\"auth signup-view valign-wrapper\" data-ng-controller=AuthenticationController><div class=\"row valign\"><div class=\"col-md-12 text-center vcenter\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo_white.svg height=100px></div><div class=\"col-xs-offset-3 col-xs-6 col-sm-offset-4 col-sm-4\"><form name=userForm data-ng-submit=signup() class=\"signin form-horizontal\" autocomplete=off><fieldset><div data-ng-show=error id=signup_errors class=\"text-center text-danger\">{{'SIGNUP_ERROR_TEXT' | translate}}:<br><strong data-ng-bind=error></strong></div><div class=form-group><input id=username name=username class=form-control ng-pattern=languageRegExp ng-minlength=4 ng-model=credentials.username placeholder=\"{{ 'USERNAME_LABEL' | translate }}\" ng-minlength=4></div><div class=form-group><input type=email id=email name=email class=form-control ng-model=credentials.email placeholder=\"{{ 'EMAIL_LABEL' | translate }}\"></div><div class=form-group><input type=password id=password name=password class=form-control ng-model=credentials.password placeholder=\"{{ 'PASSWORD_LABEL' | translate }}\" ng-minlength=4></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-signup\">{{ 'SIGNUP_BTN' | translate }}</button></div></fieldset></form><div class=\"text-center forgot-password\"><a ui-sref=signin>{{ 'SIGN_IN_ACCOUNT_LINK' | translate }}</a></div></div></div></section>");
  $templateCache.put("modules/users/views/password/forgot-password.client.view.html",
    "<section class=\"auth row\" data-ng-controller=PasswordController><h3 class=\"col-md-12 text-center\">{{ 'PASSWORD_RESTORE_HEADER' | translate }}</h3><p class=\"small text-center\">{{ 'ENTER_YOUR_EMAIL' | translate }}</p><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6\"><form data-ng-submit=askForPasswordReset() class=\"signin form-horizontal\" autocomplete=off><fieldset><div class=form-group><input id=username name=username class=form-control data-ng-model=credentials.username placeholder=\"{{ 'USERNAME_LABEL' | translate }}\"></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-primary\">{{ 'UPDATE_PASSWORD_LABEL' | translate }}</button></div><div data-ng-show=error class=\"text-center text-danger\"><strong>{{error}}</strong></div><div data-ng-show=success class=\"text-center text-success\"><strong>{{success}}</strong></div></fieldset></form></div></section>");
  $templateCache.put("modules/users/views/password/reset-password-invalid.client.view.html",
    "<section class=\"row text-center\"><h3 class=col-md-12>{{ 'PASSWORD_RESET_INVALID' | translate }}</h3><a href=/#!/password/forgot class=col-md-12>{{ 'ASK_FOR_NEW_PASSWORD' | translate }}</a></section>");
  $templateCache.put("modules/users/views/password/reset-password-success.client.view.html",
    "<section class=\"row text-center\"><h3 class=col-md-12>{{ 'PASSWORD_RESET_SUCCESS' | translate }}</h3><a href=\"/#!/\" class=col-md-12>{{ 'CONTINUE_TO_LOGIN' | translate }}</a></section>");
  $templateCache.put("modules/users/views/password/reset-password.client.view.html",
    "<section class=\"row auth\" data-ng-controller=PasswordController><h3 class=\"col-md-12 text-center\">Reset your password</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6\"><form data-ng-submit=resetUserPassword() class=\"signin form-horizontal\" autocomplete=off><fieldset><div class=form-group><label for=newPassword>{{ 'NEW_PASSWORD_LABEL' | translate }}</label><input type=password id=newPassword name=newPassword class=form-control data-ng-model=passwordDetails.newPassword placeholder=\"New Password\"></div><div class=form-group><label for=verifyPassword>{{ 'VERIFY_PASSWORD_LABEL' | translate }}</label><input type=password id=verifyPassword name=verifyPassword class=form-control data-ng-model=passwordDetails.verifyPassword placeholder=\"Verify Password\"></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-large btn-primary\">Update Password</button></div><div data-ng-show=error class=\"text-center text-danger\"><strong>{{error}}</strong></div><div data-ng-show=success class=\"text-center text-success\"><strong>{{success}}</strong></div></fieldset></form></div></section>");
  $templateCache.put("modules/users/views/settings/change-password.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><section class=row data-ng-controller=SettingsController><h3 class=\"col-md-12 text-center\">Change your password</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6\"><form data-ng-submit=changeUserPassword() class=\"signin form-horizontal\" autocomplete=off><fieldset><div class=form-group><label for=currentPassword>Current Password</label><input type=password id=currentPassword name=currentPassword class=form-control data-ng-model=passwordDetails.currentPassword placeholder=\"Current Password\"></div><hr><div class=form-group><label for=newPassword>{{ 'NEW_PASSWORD_LABEL' | translate }}</label><input type=password id=newPassword name=newPassword class=form-control data-ng-model=passwordDetails.newPassword placeholder=\"New Password\"></div><div class=form-group><label for=verifyPassword>{{ 'VERIFY_PASSWORD_LABEL' | translate }}</label><input type=password id=verifyPassword name=verifyPassword class=form-control data-ng-model=passwordDetails.verifyPassword placeholder=\"Verify Password\"></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-large btn-primary\">{{ 'SAVE_PASSWORD_BTN' | translate }}</button></div><div data-ng-show=success class=\"text-center text-success\"><strong>{{ 'PASSWORD_CHANGE_SUCCESS' | translate }}</strong></div><div data-ng-show=error class=\"text-center text-danger\"><strong data-ng-bind=error></strong></div></fieldset></form></div></section>");
  $templateCache.put("modules/users/views/settings/edit-profile.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><section class=row data-ng-controller=SettingsController><h3 class=\"col-xs-offset-1 col-xs-10 text-center\">Edit your profile</h3><div class=\"col-xs-offset-3 col-xs-6\"><form name=userForm data-ng-submit=updateUserProfile(userForm.$valid) class=\"signin form-horizontal\" autocomplete=off><fieldset><div data-ng-show=success class=\"text-center text-success\"><strong>{{ 'PROFILE_SAVE_SUCCESS' | translate }}</strong></div><div data-ng-show=error class=\"text-center text-danger\">{{ 'PROFILE_SAVE_ERROR' | translate }}<br><strong data-ng-bind=error></strong></div><div class=\"form-group row\"><div class=\"col-xs-7 field-title\"><b>{{ 'FIRST_NAME_LABEL' | translate }}</b></div><div class=\"col-xs-12 field-input\"><input id=firstName name=firstName class=form-control data-ng-model=user.firstName placeholder=\"First Name\" ng-pattern=\"/^[a-zA-Z0-9 \\-.]*$/\"></div></div><div class=\"form-group row\"><div class=\"col-xs-7 field-title\"><b>Last Name</b></div><div class=\"col-xs-12 field-input\"><input id=lastName name=lastName class=form-control data-ng-model=user.lastName placeholder=\"Last Name\" ng-pattern=\"/^[a-zA-Z0-9 \\-.]*$/\"></div></div><div class=row><hr></div><div class=\"row form-group\"><div class=\"col-xs-7 field-title\"><b>{{ 'LANGUAGE_LABEL' | translate }}</b></div><div class=\"col-xs-12 field-input\"><select ng-model=user.language required><option ng-repeat=\"language in languages\" ng-selected=\"language == user.language\" value={{language}}>{{language}}</option></select></div></div><div class=\"row form-group\"><div class=\"col-xs-7 field-title\"><b>Username</b></div><div class=\"col-xs-12 field-input\"><input id=username name=username class=form-control data-ng-model=user.username placeholder=Username></div></div><div class=\"row form-group\"><div class=\"col-xs-7 field-title\"><b>{{ 'EMAIL_LABEL' | translate }}</b></div><div class=\"col-xs-12 field-input\"><input type=email id=email name=email class=form-control data-ng-model=user.email placeholder=Email></div></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-large btn-primary\" style=font-size:1.6em>{{ 'SUBMIT_BTN' | translate }}</button></div></fieldset></form></div></section>");
  $templateCache.put("modules/users/views/settings/social-accounts.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><section class=row data-ng-controller=SettingsController><h3 class=\"col-md-12 text-center\" data-ng-show=hasConnectedAdditionalSocialAccounts()>Connected social accounts:</h3><div class=\"col-md-12 text-center\"><div data-ng-repeat=\"(providerName, providerData) in user.additionalProvidersData\" class=remove-account-container><img ng-src=/modules/users/img/buttons/{{providerName}}.png> <a class=\"btn btn-danger btn-remove-account\" data-ng-click=removeUserSocialAccount(providerName)><i class=\"glyphicon glyphicon-trash\"></i></a></div></div><h3 class=\"col-md-12 text-center\">Connect other social accounts:</h3><div class=\"col-md-12 text-center\"><a href=/auth/facebook data-ng-hide=\"isConnectedSocialAccount('facebook')\" class=undecorated-link><img src=/modules/users/img/buttons/facebook.png></a> <a href=/auth/twitter data-ng-hide=\"isConnectedSocialAccount('twitter')\" class=undecorated-link><img src=/modules/users/img/buttons/twitter.png></a> <a href=/auth/google data-ng-hide=\"isConnectedSocialAccount('google')\" class=undecorated-link><img src=/modules/users/img/buttons/google.png></a> <a href=/auth/linkedin data-ng-hide=\"isConnectedSocialAccount('linkedin')\" class=undecorated-link><img src=/modules/users/img/buttons/linkedin.png></a> <a href=/auth/github data-ng-hide=\"isConnectedSocialAccount('github')\" class=undecorated-link><img src=/modules/users/img/buttons/github.png></a></div></section>");
  $templateCache.put("modules/users/views/verify/resend-verify-email.client.view.html",
    "<section class=auth data-ng-controller=VerifyController><section ng-if=!isResetSent><h3 class=\"col-md-12 text-center\">Resend your account verification email</h3><p class=\"small text-center\">Enter your account email.</p><div data-ng-show=error class=\"text-center text-danger\"><strong>{{error}}</strong></div><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6\"><form data-ng-submit=resendVerifyEmail() class=\"signin form-horizontal\" autocomplete=off><fieldset><div class=form-group><input id=email name=email class=form-control data-ng-model=credentials.email placeholder=bob@example.com></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-primary\" ng-click=resendVerifyEmail()>{{ 'SUBMIT_BTN' | translate }}</button></div></fieldset></form></div></section><section ng-if=isResetSent><h3 class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6 text-center\">Verification Email has been Sent</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6\"><h2>{{ 'VERIFICATION_EMAIL_SENT' | translate }} {{username}}.<br>{{ 'NOT_ACTIVATED_YET' | translate }}</h2><p>{{ 'CHECK_YOUR_EMAIL' | translate }} <a href=mail:polydaic@gmail.com>polydaic@gmail.com</a></p><div class=\"text-center form-group\"><button type=submit class=\"btn btn-large btn-primary\"><a href=\"/#!/\" style=color:white>Continue</a></button></div></div></section></section>");
  $templateCache.put("modules/users/views/verify/verify-account.client.view.html",
    "<section class=auth data-ng-controller=VerifyController ng-init=validateVerifyToken()><section class=\"row text-center\" ng-if=isResetSent><h3 class=col-md-12></h3><a href=/#!/signin class=col-md-12>{{ 'CONTINUE_TO_LOGIN' | translate }}</a></section><section class=\"row text-center\" ng-if=!isResetSent><h3 class=col-md-12>{{ 'VERIFY_ERROR' | translate }}</h3><a href=/#!/verify class=col-md-6>{{ 'REVERIFY_ACCOUNT_LINK' | translate }}</a> <a href=/#!/signin class=col-md-6>{{ 'SIGNIN_BTN' | translate }}</a></section></section>");
}]);

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core', ['users']);

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('forms', [
	'ngFileUpload', 'ui.router.tabs', 'ui.date', 'ui.sortable',
	'angular-input-stars', 'users'
]);//, 'colorpicker.module' @TODO reactivate this module

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('en', {

		//Configure Form Tab View
		PDF_GENERATION_EMR: 'PDF Generation/EMR',
		SAVE_PDF_SUBMISSIONS: 'Save Submissions as PDFs?',
		UPLOAD_YOUR_PDF: 'Upload Your PDF Template',
		ADVANCED_SETTINGS: 'Advanced Settings',
		FORM_NAME: 'Form Name',
		FORM_STATUS: 'Form Status',
		PUBLIC: 'Public',
		PRIVATE: 'Private',
		GA_TRACKING_CODE: 'Google Analytics Tracking Code',
		DISPLAY_FOOTER: 'Display Form Footer?',
		SAVE_CHANGES: 'Save Changes',
		CANCEL: 'Cancel',

		//List Forms View
		CREATE_A_NEW_FORM: 'Create a new form',
		CREATE_FORM: 'Create form',
		CREATED_ON: 'Created on',

		//Admin Form View
		ARE_YOU_SURE: 'Are you ABSOLUTELY sure?',
		READ_WARNING: 'Unexpected bad things will happen if you don’t read this!',
		DELETE_WARNING1: 'This action CANNOT be undone.This will permanently delete the',
		DELETE_WARNING2: 'form, form submissions and remove all associated pdfs.',
		DELETE_CONFIRM: 'Please type in the name of the form to confirm',
		I_UNDERSTAND: 'I understand the consequences, delete this form',
		DELETE_FORM_SM: 'Delete',
		DELETE_FORM_MD: 'Delete Form',
		DELETE: 'Delete',
		FORM: 'Form',
		VIEW: 'View',
		LIVE: 'Live',
		PREVIEW: 'Preview',

		//Edit Form View
		DISABLED: 'Disabled:',
		YES: 'YES',
		NO: 'NO',
		ADD_LOGIC_JUMP: 'Add Logic Jump',
		ADD_FIELD_LG: 'Click to Add New Field',
		ADD_FIELD_MD: 'Add New Field',
		ADD_FIELD_SM: 'Add Field',
		PREVIEW_START_PAGE: 'Preview Welcome Screen',
		EDIT_START_PAGE: 'Edit Welcome Screen',
		WELCOME_SCREEN: 'Welcome Screen',
		INTRO_TITLE: 'Intro Title',
		INTRO_PARAGRAPH: 'Intro Paragraph',
		INTRO_BTN: 'Intro Button',
		BUTTONS: 'Buttons',
		BUTTON_TEXT: 'Text',
		BUTTON_LINK: 'Link',
		ADD_BUTTON: 'Add Button',
		PREVIEW_FIELD: 'Preview Field',
		EDIT_FIELD: 'Edit Field',
		QUESTION_TITLE: 'Question Title',
		QUESTION_DESCRIPTION: 'Question Description',
		OPTIONS: 'Options',
		ADD_OPTION: 'Add Option',
		NUM_OF_STEPS: 'Number of Steps',
		CLICK_FIELDS_FOOTER: 'Click on fields to add them here',

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
	UPLOAD_FILE: 'Upload your File'
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
	N: 'N'
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

		console.log($locale.id);
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

(function () {
	'use strict';

	// Create the Socket.io wrapper service
	angular
		.module('core')
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

		connect(window.location.protocol+'//'+window.location.hostname+':'+$window.socketPort);

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

angular.module('core').factory('subdomain', ['$location', function ($location) {
	var host = $location.host();
	if (host.indexOf('.') < 0)
		return null;
	else
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
			templateUrl: 'modules/forms/admin/views/adminTabs/analyze.html',
	    }).state('viewForm.create', {
			url: '/create',
			templateUrl: 'modules/forms/admin/views/adminTabs/create.html'
	    });
	}
]);

(function () {
	'use strict';

	// Create the SendVisitorData service
	angular
		.module('forms')
		.factory('SendVisitorData', SendVisitorData);

	SendVisitorData.$inject = ['Socket', '$state', '$http', 'deviceDetector'];

	function SendVisitorData(Socket, $state, $http, deviceDetector) {

		// Create a controller method for sending visitor data
		function send(form, lastActiveIndex, timeElapsed) {
			// Create a new message object
			var visitorData = {
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
				});

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

      //console.log(Auth.ensureHasCurrentUser(User));

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
					console.log('loginError: '+error);
				}
			);
	    };

	    $scope.signup = function() {
			console.log($scope.credentials);
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

// Forms controller
angular.module('forms').controller('AdminFormController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$uibModal', 'myForm', '$filter',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http, $uibModal, myForm, $filter) {

        $scope = $rootScope;
        $scope.animationsEnabled = true;
        $scope.myform = myForm;
        $rootScope.saveInProgress = false;

        CurrentForm.setForm($scope.myform);

	$scope.formURL = $scope.myform.admin.username + '.tellform.com';

        $scope.tabData   = [
            {
                heading: $filter('translate')('CREATE_TAB'),
                route:   'viewForm.create'
            },
            {
                heading: $filter('translate')('DESIGN_TAB'),
                route:   'viewForm.design'
            },
            {
                heading: $filter('translate')('CONFIGURE_TAB'),
                route:   'viewForm.configure'
            },
            {
                heading: $filter('translate')('ANALYZE_TAB'),
                route:   'viewForm.analyze'
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
				templateUrl: 'myModalContent.html',
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

            //Update form **if we are not currently updating** or if **shouldUpdateNow flag is set**
            if(continueUpdate){
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
                            return cb(err);
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

		$rootScope.languageRegExp = {
			regExp: /[@!#$%^&*()\-+={}\[\]|\\/'";:`.,~№?<>]+/i,
			test: function(val) {
				return !this.regExp.test(val);
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
                }).error(function(error){
                    //console.log('ERROR: Form could not be deleted.');
                    console.error(error);
                });
        };
    }
]);

'use strict';


function removeDateFieldsFunc(o) {
    var clone = _.clone(o);
    function eachObject(v,k){

		if(k === 'lastModified' || k === 'created'){
        	delete clone[k];
        }
	}

	for(var i=0; i<clone.length; i++){
        _.each(clone[i], eachObject);
    }
    return clone;
}

_.mixin({ removeDateFields : removeDateFieldsFunc });

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
                    // console.log('hello');
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
                            //console.log('\n\nForm data persisted -- setting pristine flag');
                            $formCtrl.$setPristine();
                            $formCtrl.$setUntouched();
                        }else{
                            console.error('Error form data NOT persisted');
                            console.error(err);
                        }
                    });
                };

                //Update/Save Form if any Form fields are Dirty and Touched
                $scope.$watch(function(newValue, oldValue) {
                    //console.log('introParagraphStartPage.$dirty: '+$scope.editForm.introParagraphStartPage.$dirty);
                    //console.log('introParagraphStartPage.$touched: '+$scope.editForm.introParagraphStartPage.$touched);
                    if($rootScope.finishedRender && $scope.anyDirtyAndTouched($scope.editForm) && !$rootScope.saveInProgress){
                        //console.log('Form saving started');
                        debounceSave();
                        //console.log('introParagraphStartPage.$dirty AFTER: '+$scope.editForm.introParagraphStartPage.$dirty);
                    }
                });

                //Autosave Form when model (specified in $attrs.autoSaveWatch) changes
                $scope.$watch($attrs.autoSaveWatch, function(newValue, oldValue) {

                    newValue = angular.copy(newValue);
                    oldValue = angular.copy(oldValue);

                    newValue.form_fields = _.removeDateFields(newValue.form_fields);
                    oldValue.form_fields = _.removeDateFields(oldValue.form_fields);

                    var changedFields = !_.isEqual(oldValue.form_fields,newValue.form_fields) || !_.isEqual(oldValue.startPage, newValue.startPage);
                    var changedFieldMap = false;

                    if(oldValue.hasOwnProperty('plugins.oscarhost.settings.fieldMap')){
                    	changedFieldMap = !!oldValue.plugins.oscarhost.settings.fieldMap && !_.isEqual(oldValue.plugins.oscarhost.settings.fieldMap,newValue.plugins.oscarhost.settings.fieldMap);
                    }

                    //If our form is undefined, don't save form
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

                    if(oldValue.form_fields.length === 0) {
                        $rootScope.finishedRender = true;
                    }

                    //Save form ONLY IF rendering is finished, form_fields have been changed AND currently not save in progress
                    if( $rootScope.finishedRender && ((changedFields && !$formCtrl.$dirty) || changedFieldMap)  && !$rootScope.saveInProgress) {

                        if(savePromise) {
                            $timeout.cancel(savePromise);
                            savePromise = null;
                        }

                        savePromise = $timeout(function() {
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

                $scope.uploadPDF = function(file) {

                    if (file) {
                        console.log(file);

                        Upload.upload({
                            url: '/upload/pdf',
							data: {
                                'user': $scope.user,
                            	 file: file
						 	}
                        }).then(function (resp) {
							var data = resp.data;
							$scope.log = 'file ' + data.originalname + ' uploaded as ' + data.filename + '. JSON: ' + JSON.stringify(data) + '\n' + $scope.log;
							$scope.myform.pdf = angular.fromJson(angular.toJson(data));

							//console.log($scope.myform.pdf);

							$scope.pdfLoading = false;

							console.log($scope.log);
							if (!$scope.$$phase && !$scope.$digest) {
								$scope.$apply();
							}
						}, function(resp){
                            $scope.pdfLoading = false;
                            console.log('Error occured during upload.\n');
                            console.log(resp.status);
                        },  function (evt) {
								var progressPercentage = parseInt(100.0 * evt.loaded / evt.total, 10);
								$scope.log = 'progress: ' + progressPercentage + '% ' +
									evt.config.data.file.name + '\n' + $scope.log;

								console.log($scope.log);

								$scope.pdfLoading = true;
						});
                    }
                };

            }]
        };
    }
]);

'use strict';

angular.module('forms').directive('editFormDirective', ['$rootScope', 'FormFields',
    function ($rootScope, FormFields) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/edit-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'='
            },
            controller: ["$scope", function($scope){

                var field_ids = _($scope.myform.form_fields).pluck('_id');
                for(var i=0; i<field_ids.length; i++){
                    $scope.myform.plugins.oscarhost.settings.fieldMap[field_ids[i]] = null;
                }
                /*
                **  Initialize scope with variables
                */
				//Setup UI-Sortable
				$scope.sortableOptions = {
					appendTo: '.dropzone',
					forceHelperSize: true,
					forcePlaceholderSize: true
				};

				/*
				**  Setup Angular-Input-Star Shape Dropdown
				 */
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

				// LOGIC JUMP METHODS
				$scope.removeLogicJump = function (field_index) {
					var currField = $scope.myform.form_fields[field_index];
					currField.logicJump = {};
				};

				$scope.addNewLogicJump = function (field_index) {
					var form_fields = $scope.myform.form_fields;
					var currField = form_fields[field_index];
					console.log(currField);
					if (form_fields.length > 1 && currField._id) {

						var newLogicJump = {
							fieldA: currField._id
						};
						currField.logicJump = newLogicJump;
					}
				};

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
                        deletePreserved: false,
						logicJump: {}
                    };

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
                    return newField;
                };

                // Delete particular field on button click
                $scope.deleteField = function (field_index){

                    //Delete field from field map
                    var currFieldId = $scope.myform.form_fields[field_index]._id;
                    if($scope.myform.hasOwnProperty('plugins.oscarhost.baseUrl')) delete $scope.myform.plugins.oscarhost.settings.fieldMap[currFieldId];

                    //Delete field
                    $scope.myform.form_fields.splice(field_index, 1);
                };
                $scope.duplicateField = function (field_index){
                    var currField = _.cloneDeep($scope.myform.form_fields[field_index]);
                    currField._id = 'cloned'+_.uniqueId();
                    currField.title += ' copy';

                    //Insert field at selected index
                    $scope.myform.form_fields.splice(field_index+1, 0, currField);
                };


                /*
                **  startPage Button Methods
                */

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
                $scope.addOption = function(field_index){
                    var currField = $scope.myform.form_fields[field_index];
					//console.log(field_index);
					//console.log(currField);

					if(currField.fieldType === 'checkbox' || currField.fieldType === 'dropdown' || currField.fieldType === 'radio'){
                        if(!currField.fieldOptions){
							$scope.myform.form_fields[field_index].fieldOptions = [];
						}

						var lastOptionID = $scope.myform.form_fields[field_index].fieldOptions.length+1;

                        // new option's id

                        var newOption = {
                            'option_id' : Math.floor(100000*Math.random()),
                            'option_title' : 'Option '+lastOptionID,
                            'option_value' : 'Option ' +lastOptionID
                        };

                        // put new option into fieldOptions array
                        $scope.myform.form_fields[field_index].fieldOptions.push(newOption);
                    }
                };

                // delete particular option
                $scope.deleteOption = function (field_index, option){
                    var currField = $scope.myform.form_fields[field_index];

                    if(currField.fieldType === 'checkbox' || currField.fieldType === 'dropdown' || currField.fieldType === 'radio'){
                        for(var i = 0; i < currField.fieldOptions.length; i++){
                            if(currField.fieldOptions[i].option_id === option.option_id){

                                $scope.myform.form_fields[field_index].fieldOptions.splice(i, 1);
                                break;

                            }
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

				// decides whether field options block will be shown (true for dropdown and radio fields)
				$scope.showRatingOptions = function (field){
					if(field.fieldType === 'rating'){
						return true;
					} else {
						return false;
					}
				};


			}]

        };
    }
]);

'use strict';

angular.module('forms').directive('editSubmissionsFormDirective', ['$rootScope', '$http',
    function ($rootScope, $http) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/edit-submissions-form.client.view.html',
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

				(function initController(){

					var defaultFormFields = _.cloneDeep($scope.myform.form_fields);

					//Iterate through form's submissions

					var submissions = _.cloneDeep($scope.myform.submissions);
					for(var i = 0; i < submissions.length; i++){
						for(var x = 0; x < submissions[i].form_fields; x++){
							var oldValue = submissions[i].form_fields[x].fieldValue || '';
							submissions[i].form_fields[x] =  _.merge(defaultFormFields, submissions[i].form_fields);
							submissions[i].form_fields[x].fieldValue = oldValue;
						}
						submissions[i].selected = false;
					}
					// console.log('after textField2: '+data[0].form_fields[1].fieldValue);

					$scope.table.rows = submissions;

					// console.log('form submissions successfully fetched');
					// console.log( JSON.parse(JSON.stringify($scope.submissions)) ) ;
					// console.log( JSON.parse(JSON.stringify($scope.myform.form_fields)) );

				})();

				/*
				** Analytics Functions
				*/
				$scope.AverageTimeElapsed = (function(){
					var totalTime = 0;
					var numSubmissions = $scope.table.rows.length;

					for(var i=0; i<$scope.table.rows.length; i++){
						totalTime += $scope.table.rows[i].timeElapsed;
					}

					console.log(totalTime/numSubmissions);
					return totalTime/numSubmissions;
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

					var visitors = $scope.myform.analytics.visitors;

					console.log(visitors);
					for(var i=0; i<visitors.length; i++){
						var visitor = visitors[i];
						var deviceType = visitor.deviceType;

						stats[deviceType].visits++;

						stats[deviceType].total_time =+ visitor.timeElapsed;
						stats[deviceType].average_time = stats[deviceType].total_time/stats[deviceType].visits || 0;

						if(visitor.isSubmitted) stats[deviceType].responses++;

						stats[deviceType].completion = stats[deviceType].response/stats[deviceType].visits || 0;
					}

					console.log(stats);
					return stats;
				})();

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
                        'csv': 'csv'
                    };

					console.log($scope.table.rows);

					angular.element('#table-submission-data').tableExport({type: type, escape:false});

					/*
                    var blob = new Blob([$scope.table.rows], {
                            type: 'application/'+fileMIMETypeMap[type]+';charset=utf-8'
                    });
                    saveAs(blob, $scope.myform.title+'_sumbissions_export_'+Date.now()+'.'+type);
                    */
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
						scope.field.input_type = 'text';
						break;
					case 'email':
						scope.field.input_type = 'email';
						scope.field.placeholder = 'joesmith@example.com';
						break;
					case 'number':
                        scope.field.input_type = 'text';
						scope.field.validateRegex = /^-?\d+$/;
                        break;
                    default:
						scope.field.input_type = 'url';
						scope.field.placeholder = 'http://example.com';
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

angular.module('forms').directive('onFinishRender', ["$rootScope", "$timeout", function ($rootScope, $timeout) {
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

				$rootScope.submitForm = $scope.submitForm = function() {

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
								console.log($scope.myform.form_fields[0]);
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
		USERNAME_LABEL: 'Username or Email',
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

		UPDATE_PROFILE_BTN: 'Update Profile',
		PROFILE_SAVE_SUCCESS: 'Profile saved successfully',
		PROFILE_SAVE_ERROR: 'Could\'t Save Your Profile.',

		FORGOT_PASSWORD_LINK: 'Forgot your password?',
		REVERIFY_ACCOUNT_LINK: 'Resend your verification email',

		SIGNIN_BTN: 'Sign in',
		SIGNUP_BTN: 'Sign up',
		SAVE_PASSWORD_BTN: 'Save Password',

		SUCCESS_HEADER: 'Signup Successful',
		SUCCESS_TEXT: 'You’ve successfully registered an account at TellForm.',
		VERIFICATION_EMAIL_SENT: 'A verification email has been sent to',
		NOT_ACTIVATED_YET: 'But your account is not activated yet',
		BEFORE_YOU_CONTINUE: 'Before you continue, make sure to check your email for our verification. If you don’t receive it within 24h drop us a line at ',
		CHECK_YOUR_EMAIL: 'Check your email and click on the activation link to activate your account. If you have any questions drop us a line at',

		PASSWORD_RESTORE_HEADER: 'Restore your password',
		ENTER_YOUR_EMAIL: 'Enter your account email.',
		SUBMIT_BTN: 'Submit',

		ASK_FOR_NEW_PASSWORD: 'Ask for new password reset',
		PASSWORD_RESET_INVALID: 'Password reset is invalid',
		PASSWORD_RESET_SUCCESS: 'Passport successfully reset',
		PASSWORD_CHANGE_SUCCESS: 'Passport successfully changed',

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
