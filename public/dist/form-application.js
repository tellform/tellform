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
    "<form class=\"row container\" name=editForm auto-save-form auto-save-watch=myform auto-save-callback=update><div class=\"col-xs-2 col-sm-4 col-md-4 add-field\"><div class=\"row add-field-title\"><h3 class=\"col-md-12 hidden-sm hidden-xs\">{{ 'ADD_FIELD_LG' | translate }}</h3><h4 class=\"col-sm-12 hidden-xs hidden-md hidden-lg\">{{ 'ADD_FIELD_MD' | translate }}</h4><h5 class=\"col-xs-12 hidden-sm hidden-md hidden-lg\">{{ 'ADD_FIELD_SM' | translate }}</h5></div><div class=\"panel-group row\" class=draggable ng-model=addField.types><div class=\"col-xs-12 col-sm-12 col-md-6\" ng-repeat=\"type in addField.types\" style=padding-top:7.5px><div class=\"panel panel-default\" style=background-color:#f5f5f5><div class=panel-heading ng-click=\"addNewField(true, type.name)\" style=\"cursor: pointer; font-size:12px; padding-left: 10px; padding-right: 10px\"><span><field-icon-directive type-name={{type.name}}></field-icon-directive></span> <span class=hidden-xs style=padding-left:0.3em>{{type.value}}</span></div></div></div></div></div><div class=\"col-xs-10 col-sm-8 current-fields container\"><div class=row><div class=col-sm-12><div class=\"panel panel-default startPage\"><div class=\"panel-heading accordion-toggle collapsed\" data-toggle=collapse data-target=#collapseStart><h4 class=text-center>{{ 'WELCOME_SCREEN' | translate }} <span class=pull-right><i class=\"fa fa-chevron-right\" ng-hide=startPage.isOpen></i> <i class=\"fa fa-chevron-down\" ng-show=startPage.isOpen></i></span></h4></div><div id=collapseStart class=\"panel-collapse collapse\"><div class=panel-body><div class=\"row hidden-sm hidden-xs\"><div class=col-md-12><h4>{{ 'PREVIEW_START_PAGE' | translate }}</h4></div><ul class=\"col-md-12 container\" style=\"list-style:none; border:2px lightgray solid; padding-bottom: 2em\"><div class=\"field row\"><div class=\"col-xs-12 text-center\" style=\"overflow-wrap: break-word\"><h1>{{myform.startPage.introTitle}}</h1></div><div class=\"col-xs-10 col-xs-offset-1 text-left\" style=\"overflow-wrap: break-word\"><p style=color:#ddd>{{myform.startPage.introParagraph}}</p></div></div><div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em\"><p ng-repeat=\"button in myform.startPage.buttons\" class=text-center style=display:inline><button class=\"btn btn-info\" type=button ng-style=\"{'background-color':button.bgColor, 'color':button.color}\"><a href={{button.url}} style=\"font-size: 1.6em; text-decoration: none; color: inherit\">{{button.text}}</a></button></p></div><div class=\"row form-actions\"><button class=\"btn btn-info btn btn-info col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3\" type=button><span style=\"color:white; font-size: 1.6em; text-decoration: none\">{{myform.startPage.introButtonText}}</span></button></div></ul></div><div class=row><div class=col-xs-12><h4>{{ 'EDIT_START_PAGE' | translate }}</h4><br></div></div><div class=\"row question\"><div class=\"col-md-4 col-sm-12\">{{ 'INTRO_TITLE' | translate }}:</div><div class=\"col-md-8 col-sm-12\"><input ng-model=myform.startPage.introTitle name=introTitleStartPage value={{myform.startPage.introTitle}} required></div></div><div class=\"row question\"><div class=\"col-md-4 col-sm-12\">{{ 'INTRO_PARAGRAPH' | translate }}:</div><div class=\"col-md-8 col-sm-12\"><textarea type=text ng-model=myform.startPage.introParagraph name=introParagraphStartPage></textarea></div></div><div class=\"row question\"><div class=\"col-md-4 col-sm-12\">{{ 'INTRO_BTN' | translate }}:</div><div class=\"col-md-8 col-sm-12\"><input ng-model=myform.startPage.introButtonText name=introButtonText value={{myform.startPage.introButtonText}} required></div></div><div class=row><br><br></div><div class=\"row options buttons\"><div class=\"col-md-3 col-xs-12\">Buttons:</div><div class=\"col-md-9 col-xs-12\"><div ng-repeat=\"button in myform.startPage.buttons track by button._id\" class=row style=padding-bottom:1em><div class=col-xs-5><span>{{ 'BUTTON_TEXT' | translate }}</span> <input name={{button.text}}_buttonText_startPage ng-model=button.text value={{button.text}} placeholder=\"Button Text\"></div><div class=col-xs-5><span>{{ 'BUTTON_LINK' | translate }}</span> <input name={{button.url}}_url_startPage ng-model=button.url value={{button.url}} placeholder=http://aeouaou.com/aoeuoa></div><div class=col-xs-2><a class=\"btn btn-danger btn-mini right\" type=button ng-click=deleteButton(button)><i class=\"fa fa-trash-o\"></i></a></div></div><div class=row><br></div><div class=row><button class=\"btn btn-primary btn-small col-md-offset-6 col-md-6 col-sm-4 col-sm-offset-8 col-xs-4 col-xs-offset-8\" type=button ng-click=addButton()><i class=\"icon-plus icon-white\"></i> {{ 'ADD_BUTTON' | translate }}</button></div></div></div></div></div></div></div></div><div class=row><div class=col-sm-12><hr></div></div><div class=row><div class=\"col-sm-12 col-md-10 dropzoneContainer\"><accordion close-others=accordion.oneAtATime ui-sortable=sortableOptions ng-model=myform.form_fields class=dropzone><accordion-group ng-repeat=\"field in myform.form_fields track by field._id\" is-open=accordion[$index].isOpen on-finish-render=editFormFields ng-if=!field.deletePreserved><accordion-heading><div class=handle><span class=col-xs-1 ng-switch=field.fieldType><field-icon-directive type-name={{field.fieldType}}></field-icon-directive></span> <span class=col-xs-10>{{field.title}} <span ng-show=field.required>*</span></span> <span class=pull-right><i class=\"fa fa-chevron-right\" ng-hide=accordion[$index].isOpen></i> <i class=\"fa fa-chevron-down\" ng-show=accordion[$index].isOpen></i></span></div></accordion-heading><div class=\"accordion-edit container\"><div class=\"row hidden-sm hidden-xs\"><div class=col-md-12><h4>{{ 'PREVIEW_FIELD' | translate }}</h4></div><ul class=\"col-md-12 container\" style=\"list-style:none;border:2px lightgray solid\"><field-directive field=field validate=false></field-directive></ul><hr></div><div class=row><div class=col-xs-12><h4>{{ 'EDIT_FIELD' | translate }}</h4><br></div></div><div class=\"row question\"><div class=\"col-md-4 col-sm-12\">{{ 'QUESTION_TITLE' | translate }}:</div><div class=\"col-md-8 col-sm-12\"><input ng-model=field.title name=title{{field._id}} value={{field.title}} required></div></div><div class=row><br></div><div class=\"row description\" ng-hide=showRatingOptions(field)><div class=\"col-md-4 col-sm-12\">{{ 'QUESTION_DESCRIPTION' | translate }}:</div><div class=\"col-md-8 col-sm-12\"><textarea type=text ng-model=field.description name=description{{field._id}} value={{field.description}}></textarea></div></div><div class=row ng-show=showAddOptions(field)><br></div><div class=\"row options\" ng-if=showAddOptions(field)><div class=\"col-md-4 col-xs-12\">{{ 'OPTIONS' | translate }}:</div><div class=\"col-md-8 col-xs-12\"><div ng-repeat=\"option in field.fieldOptions track by option.option_id\" class=row><input name={{option.option_value}}{{field._id}} ng-model=option.option_value class=col-xs-5> <a class=\"btn btn-danger btn-mini right\" type=button ng-click=\"deleteOption($index, option)\" class=col-xs-3><i class=\"fa fa-trash-o\"></i></a></div><div class=row><button class=\"btn btn-primary btn-small col-md-offset-0 col-md-6 col-sm-4 col-sm-offset-4 col-xs-6 col-xs-offset-6\" type=button ng-click=addOption($index)><i class=\"icon-plus icon-white\"></i> {{ 'ADD_OPTION' | translate }}</button></div></div></div><div class=row ng-show=showRatingOptions(field)><br></div><div class=row ng-if=showRatingOptions(field)><div class=\"col-md-9 col-sm-9\">{{ 'NUM_OF_STEPS' | translate }}</div><div class=\"col-md-3 col-sm-3\"><input style=width:100% type=number min=1 max=10 ng-model=field.ratingOptions.steps name=ratingOptions_steps{{field._id}} ng-value={{field.ratingOptions.steps}} required></div><br><div class=\"col-md-5 col-sm-9\">Shape:</div><div class=\"col-md-7 col-sm-3\"><select style=width:100% ng-model=field.ratingOptions.shape value={{field.ratingOptions.steps}} name=ratingOptions_shape{{field._id}} required><option ng-repeat=\"shapeType in field.ratingOptions.validShapes\" value={{shapeType}}>{{select2FA[shapeType]}}</option></select></div></div><div class=row><br></div><div class=row><div class=\"col-md-4 col-xs-12 field-title\">Required:</div><div class=\"col-md-8 col-xs-12 field-input\"><label class=\"btn col-xs-5\"><input type=radio ng-value=true ng-model=field.required name=\"required{{field._id}}\"> <span>&nbsp; {{ 'YES' | translate }}</span></label><label class=\"btn col-xs-5 col-xs-offset-1\"><input type=radio ng-value=false ng-model=field.required name=\"required{{field._id}}\"> <span>&nbsp; {{ 'NO' | translate }}</span></label></div></div><div class=row><div class=\"col-md-4 col-xs-12 field-input\">Disabled:</div><div class=\"col-md-8 col-xs-12 field-input\"><label class=\"btn col-xs-5\"><input type=radio ng-value=true ng-model=field.disabled name=\"disabled{{field._id}}\"> <span>&nbsp; {{ 'YES' | translate }}</span></label><label class=\"btn col-xs-5 col-xs-offset-1\"><input type=radio ng-value=false ng-model=field.disabled name=\"disabled{{field._id}}\"> <span>&nbsp; {{ 'NO' | translate }}</span></label></div></div></div></accordion-group><div class=\"panel panel-default\" style=\"border-style: dashed; border-color: #a9a9a9\"><div class=panel-heading><h4 class=\"panel-title text-center\" style=\"color: #a9a9a9\">{{ 'CLICK_FIELDS_FOOTER' | translate }}</h4></div></div><hr></accordion></div><div class=\"col-md-1 hidden-xs hidden-sm\" style=\"padding:0 5px\"><div class=\"panel-group tool-panel text-center\"><div class=\"panel panel-default\" ng-repeat=\"field in myform.form_fields track by field._id\" ng-if=!field.deletePreserved><div class=panel-heading style=\"padding: 10px 10px; height: 37px\" ng-click=deleteField($index)><span class=text-center><a href=\"\" class=\"fa fa-trash-o\"></a></span></div></div></div></div><div class=\"col-md-1 hidden-xs hidden-sm\" style=\"padding:0 5px\"><div class=\"panel-group tool-panel text-center\"><div class=\"panel panel-default\" ng-repeat=\"field in myform.form_fields track by field._id\" ng-if=!field.deletePreserved><div class=panel-heading style=\"padding: 10px 10px; height: 37px\" ng-click=duplicateField($index)><span class=text-center><a href=\"\" class=\"fa fa-files-o\"></a></span></div></div></div></div></div></div></form>");
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

// Configuring the Forms drop-down menus
angular.module('view-form').filter('formValidity',
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
});

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

			// Create a new message object
			var visitorData = {
				referrer: document.referrer,
				isSubmitted: form.submitted,
				formId: form._id,
				lastActiveField: form.form_fields[lastActiveIndex]._id,
				timeElapsed: timeElapsed
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
;

angular.module('view-form').directive('submitFormDirective', ['$http', 'TimeCounter', '$filter', '$rootScope', 'SendVisitorData',
    function ($http, TimeCounter, $filter, $rootScope, SendVisitorData) {
        return {
            templateUrl: 'modules/forms/base/views/directiveViews/form/submit-form.client.view.html',
			restrict: 'E',
            scope: {
                myform:'='
            },
            controller: ["$document", "$window", "$scope", function($document, $window, $scope){
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
				var evaluateLogicJump = function(field){
					console.log('evaluateLogicJump');
					console.log(field.fieldValue);
					var logicJump = field.logicJump;

					if (logicJump.expressionString && logicJump.valueB && field.fieldValue) {
						var parse_tree = jsep(logicJump.expressionString);
						var left, right;

						console.log(parse_tree);

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
angular.module('view-form').factory('Forms', ['$resource', 'FORM_URL',
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
