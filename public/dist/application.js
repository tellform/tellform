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

angular.module('TellForm.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("modules/core/views/header.client.view.html",
    "<section class=\"navbar navbar-inverse\" data-ng-controller=HeaderController ng-hide=hideNav><div class=container><div class=navbar-header><button class=navbar-toggle type=button data-ng-click=toggleCollapsibleMenu()><span class=sr-only>Toggle navigation</span> <span>{{ 'MENU_BTN' | translate }}</span></button> <a href=\"/#!/\" class=navbar-brand><img src=/static/modules/core/img/logo_white.svg height=100%></a></div><nav class=\"collapse navbar-collapse\" collapse=!isCollapsed role=navigation><ul class=\"nav navbar-nav navbar-right\" data-ng-hide=authentication.isAuthenticated()><li ng-hide=$root.signupDisabled ui-route=/signup ng-class=\"{active: $uiRoute}\"><a href=/#!/signup>{{ 'SIGNUP_TAB' | translate }}</a></li><li class=divider-vertical></li><li ui-route=/signin ng-class=\"{active: $uiRoute}\"><a href=/#!/signin>{{ 'SIGNIN_TAB' | translate }}</a></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-show=authentication.isAuthenticated()><li class=dropdown uib-dropdown><a href=# class=dropdown-toggle data-toggle=dropdown dropdown-toggle><span>{{ 'MY_SETTINGS' | translate }}</span> <b class=caret></b></a><ul class=dropdown-menu><li><a href=/#!/settings/profile>{{ 'EDIT_PROFILE' | translate }}</a></li><li class=divider></li><li><a href=/#!/settings/password>{{ 'CHANGE_PASSWORD' | translate }}</a></li></ul></li><li><a href=\"/\" ng-click=signout()>{{ 'SIGNOUT_TAB' | translate }}</a></li></ul></nav></div></section>");
  $templateCache.put("modules/forms/admin/views/admin-form.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><section class=\"admin-form container-fluid\"><script type=text/ng-template id=formDeleteModal.html><div class=\"modal-header\">\n" +
    "            <h2 class=\"modal-title hidden-md hidden-lg\">{{ 'ARE_YOU_SURE' | translate }}</h2>\n" +
    "            <h3 class=\"modal-title hidden-xs hidden-sm\">{{ 'ARE_YOU_SURE' | translate }}</h3>\n" +
    "        </div>\n" +
    "        <div class=\"modal-body\">\n" +
    "        	<div class=\"modal-body-alert\">\n" +
    "				{{ 'READ_WARNING' | translate }}\n" +
    "			</div>\n" +
    "       		<p class=\"hidden-xs hidden-sm\">\n" +
    "       		 	{{ 'DELETE_WARNING1' | translate }} <strong>{{myform.title}}</strong> {{ 'DELETE_WARNING2' | translate }}\n" +
    "       		</p>\n" +
    "            <p>{{ 'DELETE_CONFIRM' | translate }}</p>\n" +
    "        </div>\n" +
    "        <div class=\"modal-footer\">\n" +
    "			<input type=\"text\" style=\"width:100%\" data-ng-model=\"deleteConfirm\" class=\"input-block\" autofocus required aria-label=\"Type in the name of the form to confirm that you want to delete this form.\">\n" +
    "            <button type=\"submit\" ng-click=\"removeCurrentForm()\" class=\"btn btn-block btn-danger\" ng-disabled=\"myform.title != deleteConfirm\">\n" +
    "            	{{ 'I_UNDERSTAND' | translate }}\n" +
    "            </button>\n" +
    "        </div></script><div class=\"page-header row\" style=\"padding-bottom: 1em\"><div class=\"col-xs-10 col-sm-8\"><h1 class=\"hidden-sm hidden-xs\" data-ng-bind=myform.title style=\"margin-bottom: 0px\"></h1><h2 class=\"hidden-md hidden-lg\" data-ng-bind=myform.title style=\"margin-bottom: 0px\"></h2></div><div class=\"col-xs-1 col-sm-2\"><small class=pull-right><button class=\"btn btn-danger\" ng-click=openDeleteModal()><i class=\"fa fa-trash-o\"></i> <span class=\"show-sm hidden-lg hidden-md hidden-xs\">{{ 'DELETE_FORM_SM' | translate}}</span> <span class=\"hidden-xs hidden-sm\">{{ 'DELETE_FORM_MD' | translate}}</span></button></small></div><div class=\"col-xs-1 col-sm-2\"><small class=pull-right><a class=\"btn btn-secondary view-form-btn\" href={{actualFormURL}}><span class=\"hidden-xs hidden-sm\">{{ 'VIEW' | translate }} <span ng-show=myform.isLive>{{ 'LIVE' | translate }}</span> <span ng-hide=myform.isLive>{{ 'PREVIEW' | translate }}</span></span> <i class=\"status-light status-light-on fa fa-dot-circle-o\" ng-if=myform.isLive></i> <i class=\"status-light status-light-off fa fa-dot-circle-o\" ng-if=!myform.isLive></i></a></small></div></div><div class=row><div class=col-xs-12><uib-tabset active=activePill vertical=true type=pills><uib-tab index=0 heading=\"{{ 'CREATE_TAB' | translate }}\" select=deactivateDesignTab()><edit-form-directive myform=myform></edit-form-directive></uib-tab><uib-tab ng-repeat=\"tab in tabData\" index={{$index+1}} heading={{tab.heading}} select=deactivateDesignTab()><div class=row data-ng-include=\"'/static/modules/forms/admin/views/adminTabs/'+tab.templateName+'.html'\"></div></uib-tab><uib-tab index=2 heading=\"{{ 'ANALYZE_TAB' | translate }}\" select=deactivateDesignTab()><edit-submissions-form-directive myform=myform user=myform.admin></edit-submissions-form-directive></uib-tab><uib-tab ng-if=tabData heading=\"{{ 'SHARE_TAB' | translate }}\" index={{tabData.length}} select=deactivateDesignTab()><div class=config-form><div class=row><div class=col-sm-12><uib-tabset active=activePill vertical=true type=pills><uib-tab index=0 heading=\"{{ 'SHARE_YOUR_FORM' | translate }}\"><div class=row><div class=col-sm-12>{{ 'TELLFORM_URL' | translate }}</div><div class=\"col-sm-8 form-input\"><span ngclipboard data-clipboard-target=#copyURL><input id=copyURL ng-value=actualFormURL class=\"form-control ng-pristine ng-untouched ng-valid\"></span></div><div class=col-sm-4><button class=\"btn btn btn-secondary view-form-btn\" ngclipboard data-clipboard-target=#copyURL>{{ 'COPY' | translate }} <i class=\"fa fa-clipboard\" aria-hidden=true></i></button></div></div></uib-tab><uib-tab index=1 heading=\"{{ 'EMBED_YOUR_FORM' | translate }}\"><div class=row><div class=col-sm-12>{{ 'COPY_AND_PASTE' | translate }}</div><div class=\"col-sm-8 form-input\"><span ngclipboard data-clipboard-target=#copyEmbedded><textarea id=copyEmbedded class=\"form-control ng-pristine ng-untouched ng-valid\" style=\"min-height:200px; width:100%; background-color: #FFFFCC; color: #30313F\">\n" +
    "														&lt;!-- {{ 'CHANGE_WIDTH_AND_HEIGHT' | translate }} --&gt;\n" +
    "														<iframe id=iframe src={{actualFormURL}} style=width:100%;height:500px></iframe>\n" +
    "														<div style=\"font-family: Sans-Serif;font-size: 12px;color: #999;opacity: 0.5; padding-top: 5px\">{{ 'POWERED_BY' | translate }} <a href=https://www.tellform.com style=\"color: #999\" target=_blank>TellForm</a></div>\n" +
    "													</textarea></span></div><div class=col-sm-4><button class=\"btn btn btn-secondary view-form-btn\" ngclipboard data-clipboard-target=#copyEmbedded>{{ 'COPY' | translate }} <i class=\"fa fa-clipboard\" aria-hidden=true></i></button></div></div></uib-tab></uib-tabset></div></div></div></uib-tab><uib-tab class=design-tab ng-if=\"tabData && myform.form_fields.length\" heading=\"{{ 'DESIGN_TAB' | translate }}\" index={{tabData.length}}+1 select=activateDesignTab()><div class=\"config-form design container\"><div class=row><div class=\"col-sm-4 col-xs-12\"><div class=\"row field\"><div class=\"field-title col-sm-5\"><h5>{{ 'BACKGROUND_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-6\"><input class=form-control colorpicker=hex ng-model=myform.design.colors.backgroundColor ng-pattern=\"/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/\" ng-style=\"{ 'background-color': myform.design.colors.backgroundColor }\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-5\"><h5>{{ 'QUESTION_TEXT_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-6\"><input class=form-control colorpicker=hex ng-model=myform.design.colors.questionColor ng-pattern=\"/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/\" ng-style=\"{ 'background-color': myform.design.colors.questionColor }\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-5\"><h5>{{ 'ANSWER_TEXT_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-6\"><input class=form-control colorpicker=hex ng-model=myform.design.colors.answerColor ng-pattern=\"/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/\" ng-style=\"{ 'background-color': myform.design.colors.answerColor }\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-5\"><h5>{{ 'BTN_BACKGROUND_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-6\"><input class=form-control colorpicker=hex ng-model=myform.design.colors.buttonColor ng-pattern=\"/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/\" ng-style=\"{ 'background-color': myform.design.colors.buttonColor }\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-5\"><h5>{{ 'BTN_TEXT_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-6\"><input class=form-control colorpicker=hex ng-model=myform.design.colors.buttonTextColor ng-pattern=\"/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/\" ng-style=\"{ 'background-color': myform.design.colors.buttonTextColor }\"></div></div></div><div class=\"col-sm-8 hidden-xs\" ng-if=designTabActive><div class=public-form ng-style=\"{ 'background-color': myform.design.colors.backgroundColor }\"><iframe id=iframe ng-if=!!formURL ng-src=\"{{formURL | trustSrc}}\" style=\"border: none; box-shadow: 0px 0px 10px 0px grey; overflow: hidden; height: 400px; width: 90%; position: absolute\"></iframe></div></div></div><div class=row><div class=\"col-sm-offset-4 col-sm-2\"><button class=\"btn btn-signup btn-rounded\" type=button ng-click=\"updateDesign(false, myform, false, false)\"><i class=\"icon-arrow-left icon-white\"></i>{{ 'SAVE_CHANGES' | translate }}</button></div><div class=col-sm-1><button class=\"btn btn-secondary btn-rounded\" type=button ng-click=resetForm()><i class=\"icon-eye-open icon-white\"></i>{{ 'CANCEL' | translate }}</button></div></div></div></uib-tab></uib-tabset></div></div></section>");
  $templateCache.put("modules/forms/admin/views/list-forms.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><section class=overlay ng-if=showCreateModal ng-click=closeCreateModal()></section><script type=text/ng-template id=deleteModalListForms.html><div class=\"modal-header\">\n" +
    "		<h2 class=\"modal-title hidden-md hidden-lg\">{{ 'ARE_YOU_SURE' | translate }}</h2>\n" +
    "		<h3 class=\"modal-title hidden-xs hidden-sm\">{{ 'ARE_YOU_SURE' | translate }}</h3>\n" +
    "	</div>\n" +
    "	<div class=\"modal-body\">\n" +
    "		<div class=\"modal-body-alert\">\n" +
    "			{{ 'READ_WARNING' | translate }}\n" +
    "		</div>\n" +
    "		<p class=\"hidden-xs hidden-sm\">\n" +
    "			{{ 'DELETE_WARNING1' | translate }} <strong>{{content.currFormTitle}}</strong> {{ 'DELETE_WARNING2' | translate }}\n" +
    "		</p>\n" +
    "		<p>{{ 'DELETE_CONFIRM' | translate }}</p>\n" +
    "	</div>\n" +
    "	<div class=\"modal-footer\">\n" +
    "		<input type=\"text\" style=\"width:100%\" data-ng-model=\"deleteConfirm\" class=\"input-block\" autofocus required aria-label=\"Type in the name of the form to confirm that you want to delete this form.\">\n" +
    "		<button type=\"submit\" ng-click=\"deleteForm()\" class=\"btn btn-block btn-danger\" ng-disabled=\"content.currFormTitle != deleteConfirm\">\n" +
    "			{{ 'I_UNDERSTAND' | translate }}\n" +
    "		</button>\n" +
    "	</div></script><section data-ng-controller=\"ListFormsController as ctrl\" data-ng-init=findAll() class=container><br><div class=row><div ng-click=openCreateModal() class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-1 form-item create-new\"><div class=\"title-row col-xs-12\"><h4 class=\"fa fa-plus fa-6\"></h4></div><div class=\"col-xs-12 details-row\"><small class=list-group-item-text>{{ 'CREATE_A_NEW_FORM' | translate }}</small></div></div><form name=forms.createForm class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-1 form-item create-new new-form\" ng-if=showCreateModal><div class=\"title-row row\"><div class=\"col-xs-5 field-title text-left\">{{ 'NAME' | translate }}</div><div class=\"col-xs-12 field-input\"><input name=title required ng-model=formTitle ng-pattern=languageRegExp ng-minlength=4 style=\"color:black\"></div></div><div class=\"details-row row\"><div class=\"col-xs-5 field-title text-left\">{{ 'LANGUAGE' | translate }}</div><div class=\"col-xs-12 field-input\"><div class=\"button custom-select\"><select style=color:black name=language required ng-model=formLanguage ng-init=\"formLanguage = user.language\"><option ng-repeat=\"language in languages\" value={{language}}>{{language}}</option></select></div></div></div><div class=\"details-row submit row\"><div class=\"col-xs-12 field-title text-center\"><button class=\"btn btn-primary\" ng-disabled=forms.createForm.$invalid ng-click=createNewForm()>{{ 'CREATE_FORM' | translate }}</button></div></div></form><div data-ng-repeat=\"form in myforms\" class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-1 form-item container\" ng-class=\"{'paused': !form.isLive}\"><div class=row><span class=pull-right><i style=cursor:pointer class=\"fa fa-trash-o\" ng-click=openDeleteModal($index)></i> <i style=cursor:pointer class=\"fa fa-files-o\" ng-click=duplicateForm($index)></i></span></div><div class=row><a data-ng-href=#!/forms/{{form._id}}/admin/create class=\"title-row col-xs-12\"><h4 class=list-group-item-heading data-ng-bind=form.title></h4></a><div class=\"col-xs-12 responses-row\"><small class=list-group-item-text><span>{{ form.numberOfResponses }} {{ 'RESPONSES' | translate }}</span></small><br><br><small ng-if=!form.isLive class=list-group-item-text><span>{{ 'FORM_PAUSED' | translate }}</span></small></div></div></div></div></section>");
  $templateCache.put("modules/forms/admin/views/adminTabs/analyze.html",
    "<edit-submissions-form-directive myform=myform user=user></edit-submissions-form-directive>");
  $templateCache.put("modules/forms/admin/views/adminTabs/configure.html",
    "<configure-form-directive myform=myform user=user></configure-form-directive>");
  $templateCache.put("modules/forms/admin/views/adminTabs/create.html",
    "<edit-form-directive myform=myform></edit-form-directive>");
  $templateCache.put("modules/forms/admin/views/directiveViews/form/configure-form.client.view.html",
    "<div class=\"config-form container\"><div class=row><div class=\"col-sm-offset-2 col-sm-4\"><div class=\"row field\"><div class=\"field-title col-sm-12\"><h5>{{ 'FORM_NAME' | translate }}</h5></div><div class=col-sm-12><input class=form-control ng-model=myform.title value={{myform.title}} style=\"width: 100%\" ng-minlength=4 ng-pattern=\"/^[a-zA-Z0-9 \\-.]*$/\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-12\"><h5>{{ 'FORM_STATUS' | translate }}</h5></div><div class=\"field-input col-sm-12\"><label style=\"display: inline-block\"><input type=radio data-ng-value=true ng-model=myform.isLive ng-required=true style=\"background-color:#33CC00\"> &nbsp;<span>{{ 'PUBLIC' | translate }}</span></label><label style=\"display: inline-block\"><input type=radio data-ng-value=false ng-model=myform.isLive ng-required=\"true\"> &nbsp;<span>{{ 'PRIVATE' | translate }}</span></label></div></div><div class=\"row field\"><div class=\"col-sm-12 field-title\">{{ 'LANGUAGE' | translate }}</div><div class=\"col-sm-12 field-input\"><select ng-model=myform.language><option ng-repeat=\"language in languages\" ng-selected=\"language == myform.language\" value={{language}}>{{language}}</option></select><span class=required-error ng-show=\"field.required && !field.fieldValue\">* {{ 'REQUIRED_FIELD' | translate }}</span></div></div></div><div class=col-sm-4><div class=\"row field\"><div class=\"field-title col-sm-12\"><h5>{{ 'GA_TRACKING_CODE' | translate }}</h5></div><div class=col-sm-12><input class=form-control ng-model=myform.analytics.gaCode value={{myform.analytics.gaCode}} style=\"width: 100%\" ng-minlength=4 placeholder=UA-XXXXX-Y ng-pattern=\"/\\bUA-\\d{4,10}-\\d{1,4}\\b/\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-12\"><h5>{{ 'DISPLAY_FOOTER' | translate }}</h5></div><div class=\"field-input col-sm-12\"><label style=\"display: inline-block\"><input type=radio data-ng-value=false ng-model=myform.hideFooter ng-required=\"true\"> &nbsp;<span>{{ 'YES' | translate }}</span></label><label style=\"display: inline-block\"><input type=radio data-ng-value=true ng-model=myform.hideFooter ng-required=\"true\"> &nbsp;<span>{{ 'NO' | translate }}</span></label></div></div><div class=\"row field\"><div class=\"field-title col-sm-12\"><h5>{{ 'DISPLAY_START_PAGE' | translate }}</h5></div><div class=\"field-input col-sm-12\"><label style=\"display: inline-block\"><input type=radio data-ng-value=true ng-model=myform.startPage.showStart ng-required=true style=\"background-color:#33CC00\"> &nbsp;<span>{{ 'YES' | translate }}</span></label><label style=\"display: inline-block\"><input type=radio data-ng-value=false ng-model=myform.startPage.showStart ng-required=\"true\"> &nbsp;<span>{{ 'NO' | translate }}</span></label></div></div><div class=\"row field\"><div class=\"field-title col-sm-12\"><h5>{{ 'DISPLAY_END_PAGE' | translate }}</h5></div><div class=\"field-input col-sm-12\"><label style=\"display: inline-block\"><input type=radio data-ng-value=true ng-model=myform.endPage.showEnd ng-required=true style=\"background-color:#33CC00\"> &nbsp;<span>{{ 'YES' | translate }}</span></label><label style=\"display: inline-block\"><input type=radio data-ng-value=false ng-model=myform.endPage.showEnd ng-required=\"true\"> &nbsp;<span>{{ 'NO' | translate }}</span></label></div></div></div></div><div class=row><div class=\"col-sm-offset-4 col-sm-2\"><button class=\"btn btn-signup btn-rounded\" type=button ng-click=\"update(false, myform, false, false, null)\"><i class=\"icon-arrow-left icon-white\"></i>{{ 'SAVE_CHANGES' | translate }}</button></div><div class=col-sm-1><button class=\"btn btn-secondary btn-rounded\" type=button ng-click=resetForm()><i class=\"icon-eye-open icon-white\"></i>{{ 'CANCEL' | translate }}</button></div></div></div>");
  $templateCache.put("modules/forms/admin/views/directiveViews/form/edit-form.client.view.html",
    "<form class=row name=editForm><script type=text/ng-template id=editEndPageModal.html class=edit-endpage-modal><div class=\"modal-body\">\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"edit-panel col-md-6 col-xs-12 col-sm-12\">\n" +
    "					<div class=\"row modal-header\">\n" +
    "						<h2 class=\"modal-title hidden-md hidden-lg\">{{ 'EDIT_END_PAGE' | translate }}</h2>\n" +
    "						<h3 class=\"modal-title hidden-xs hidden-sm\">{{ 'EDIT_END_PAGE' | translate }}</h3>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row question\">\n" +
    "						<div class=\"col-md-4 col-sm-12\">{{ 'TITLE' | translate }}:</div>\n" +
    "						<div class=\"col-md-8 col-sm-12\">\n" +
    "							<input class=\"form-control\" type=\"text\"\n" +
    "								   ng-model=\"myform.endPage.title\" required>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row\"><br></div>\n" +
    "\n" +
    "					<div class=\"row question\">\n" +
    "						<div class=\"col-md-4 col-sm-12\">{{ 'PARAGRAPH' | translate }}:</div>\n" +
    "						<div class=\"col-md-8 col-sm-12\">\n" +
    "                                    <textarea class=\"form-control\" type=\"text\"\n" +
    "											  ng-model=\"myform.endPage.paragraph\"></textarea>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row\"><br></div>\n" +
    "\n" +
    "					<div class=\"row question\">\n" +
    "						<div class=\"col-md-4 col-sm-12\">{{ 'BTN_TEXT' | translate }}:</div>\n" +
    "						<div class=\"col-md-8 col-sm-12\">\n" +
    "							<input class=\"form-control\" type=\"text\"\n" +
    "								   ng-model=\"myform.endPage.buttonText\" required>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row\"><br></div>\n" +
    "\n" +
    "					<div class=\"row\">\n" +
    "						<div class=\"col-md-4 col-xs-12 field-input\">{{ 'SHOW_BUTTONS' | translate }}</div>\n" +
    "						<div class=\"col-md-8 col-xs-12 field-input\">\n" +
    "							<label class=\"switch-light switch-holo\" onclick=\"\">\n" +
    "								<input type=\"checkbox\" ng-model=\"showButtons\">\n" +
    "								<span>\n" +
    "									<span> {{ 'OFF' | translate }}</span>\n" +
    "									<span> {{ 'ON' | translate }}</span>\n" +
    "									<a></a>\n" +
    "								</span>\n" +
    "							</label>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row options buttons\" ng-if=\"showButtons\">\n" +
    "						<div class=\"col-md-3 col-xs-12\">{{ 'BUTTONS' | translate }}:</div>\n" +
    "						<div class=\"col-md-9 col-xs-12\">\n" +
    "							<div ng-repeat=\"button in myform.endPage.buttons track by button._id\" class=\"row\" style=\"padding-bottom:1em;\">\n" +
    "\n" +
    "								<div class=\"col-xs-5\">\n" +
    "									<span>{{ 'BUTTON_TEXT' | translate }}</span>\n" +
    "									<input type=\"text\"\n" +
    "										   name=\"{{button.text}}_buttonText_startPage\"\n" +
    "										   ng-model=\"button.text\"\n" +
    "										   value=\"{{button.text}}\"\n" +
    "										   placeholder=\"{{ 'BUTTON_TEXT' | translate }}\">\n" +
    "								</div>\n" +
    "\n" +
    "\n" +
    "								<div class=\"col-xs-5\">\n" +
    "									<span>{{ 'BUTTON_LINK' | translate }}</span>\n" +
    "									<input type=\"text\"\n" +
    "										   name=\"{{button.url}}_url_startPage\"\n" +
    "										   ng-model=\"button.url\"\n" +
    "										   value=\"{{button.url}}\"\n" +
    "										   placeholder=\"http://aeouaou.com/aoeuoa\">\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"col-xs-2\">\n" +
    "									<a class=\"btn btn-danger btn-mini right\" type=\"button\" ng-click=\"deleteButton(button)\">\n" +
    "										<i class=\"fa fa-trash-o\"></i>\n" +
    "									</a>\n" +
    "								</div>\n" +
    "							</div>\n" +
    "\n" +
    "							<div class=\"row\"><br></div>\n" +
    "							<div class=\"row\">\n" +
    "								<button class=\"btn btn-primary btn-small col-md-offset-6 col-md-6 col-sm-4 col-sm-offset-8 col-xs-4 col-xs-offset-8\" type=\"button\" ng-click=\"addButton()\">\n" +
    "									<i class=\"icon-plus icon-white\"></i> {{ 'ADD_BUTTON' | translate }}\n" +
    "								</button>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"modal-footer row\">\n" +
    "						<button type=\"submit\" ng-click=\"saveEndPage()\" class=\"btn btn-signup btn-rounded\">\n" +
    "							{{ 'SAVE_START_PAGE' | translate }}\n" +
    "						</button>\n" +
    "\n" +
    "						<button ng-click=\"cancel()\" class=\"btn btn-secondary btn-rounded\">\n" +
    "							{{ 'CANCEL' | translate }}\n" +
    "						</button>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class=\"preview-field-panel col-md-6 hidden-sm hidden-xs\">\n" +
    "					<form class=\"public-form\">\n" +
    "\n" +
    "						<div class=\"row\">\n" +
    "							<div class=\"col-xs-12 text-center\" style=\"overflow-wrap: break-word;\">\n" +
    "								<h1 style=\"font-weight: 400; font-size: 25px;\">\n" +
    "									{{myform.endPage.title}}\n" +
    "								</h1>\n" +
    "							</div>\n" +
    "							<div class=\"col-xs-10 col-xs-offset-1 text-center\" style=\"overflow-wrap: break-word;\">\n" +
    "								<p style=\"color: grey; font-weight: 100; font-size: 16px;\">\n" +
    "									{{myform.endPage.paragraph}}\n" +
    "								</p>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "\n" +
    "						<div class=\"row form-actions text-center\" style=\"padding: 5px 25px 5px 25px;\">\n" +
    "							<button ng-click=\"reloadForm()\" class=\"btn\" type=\"button\"\n" +
    "									ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\">\n" +
    "			<span style=\"font-size: 1.6em;\">\n" +
    "			{{myform.endPage.buttonText}}\n" +
    "			</span>\n" +
    "							</button>\n" +
    "						</div>\n" +
    "						<div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em;\">\n" +
    "							<p ng-repeat=\"button in myform.endPage.buttons\" class=\"text-center\" style=\"display:inline;\">\n" +
    "								<button class=\"btn\" style=\"background-color:rgb(156, 226, 235)\" type=\"button\" ng-style=\"{'background-color':button.bgColor, 'color':button.color}\">\n" +
    "									<a href=\"{{button.url}}\"\n" +
    "									   style=\"font-size: 1.6em; text-decoration: none;\"\n" +
    "									   ng-style=\"{'color':button.color}\">\n" +
    "										{{button.text}}\n" +
    "									</a>\n" +
    "								</button>\n" +
    "							</p>\n" +
    "						</div>\n" +
    "\n" +
    "					</form>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "		</div></script><script type=text/ng-template id=editStartPageModal.html class=edit-startpage-modal><div class=\"modal-body\">\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"edit-panel col-md-6 col-xs-12 col-sm-12\">\n" +
    "					<div class=\"row modal-header\">\n" +
    "						<h2 class=\"modal-title hidden-md hidden-lg\">{{ 'EDIT_START_PAGE' | translate }}</h2>\n" +
    "						<h3 class=\"modal-title hidden-xs hidden-sm\">{{ 'EDIT_START_PAGE' | translate }}</h3>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row question\">\n" +
    "						<div class=\"col-md-4 col-sm-12\">{{ 'INTRO_TITLE' | translate }}:</div>\n" +
    "						<div class=\"col-md-8 col-sm-12\">\n" +
    "							<input class=\"form-control\" type=\"text\"\n" +
    "								   ng-model=\"myform.startPage.introTitle\"\n" +
    "								   name=\"introTitleStartPage\" required>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row\"><br></div>\n" +
    "\n" +
    "					<div class=\"row question\">\n" +
    "						<div class=\"col-md-4 col-sm-12\">{{ 'INTRO_PARAGRAPH' | translate }}:</div>\n" +
    "						<div class=\"col-md-8 col-sm-12\">\n" +
    "                                    <textarea class=\"form-control\" type=\"text\"\n" +
    "											  ng-model=\"myform.startPage.introParagraph\"\n" +
    "											  name=\"introParagraphStartPage\"></textarea>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row\"><br></div>\n" +
    "\n" +
    "					<div class=\"row question\">\n" +
    "						<div class=\"col-md-4 col-sm-12\">{{ 'INTRO_BTN' | translate }}:</div>\n" +
    "						<div class=\"col-md-8 col-sm-12\">\n" +
    "							<input class=\"form-control\" type=\"text\"\n" +
    "								   ng-model=\"myform.startPage.introButtonText\"\n" +
    "								   name=\"introButtonText\" required>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row\"><br></div>\n" +
    "\n" +
    "					<div class=\"row\">\n" +
    "						<div class=\"col-md-4 col-xs-12 field-input\">{{ 'SHOW_BUTTONS' | translate }}</div>\n" +
    "						<div class=\"col-md-8 col-xs-12 field-input\">\n" +
    "							<label class=\"switch-light switch-holo\" onclick=\"\">\n" +
    "								<input type=\"checkbox\" ng-model=\"showButtons\">\n" +
    "								<span>\n" +
    "									<span> {{ 'OFF' | translate }}</span>\n" +
    "									<span> {{ 'ON' | translate }}</span>\n" +
    "									<a></a>\n" +
    "								</span>\n" +
    "							</label>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row options buttons\" ng-if=\"showButtons\">\n" +
    "						<div class=\"col-md-3 col-xs-12\">{{ 'BUTTONS' | translate }}:</div>\n" +
    "						<div class=\"col-md-9 col-xs-12\">\n" +
    "							<div ng-repeat=\"button in myform.startPage.buttons track by button._id\" class=\"row\" style=\"padding-bottom:1em;\">\n" +
    "\n" +
    "								<div class=\"col-xs-5\">\n" +
    "									<span>{{ 'BUTTON_TEXT' | translate }}</span>\n" +
    "									<input type=\"text\"\n" +
    "										   name=\"{{button.text}}_buttonText_startPage\"\n" +
    "										   ng-model=\"button.text\"\n" +
    "										   value=\"{{button.text}}\"\n" +
    "										   placeholder=\"{{ 'BUTTON_TEXT' | translate }}\">\n" +
    "								</div>\n" +
    "\n" +
    "\n" +
    "								<div class=\"col-xs-5\">\n" +
    "									<span>{{ 'BUTTON_LINK' | translate }}</span>\n" +
    "									<input type=\"text\"\n" +
    "										   name=\"{{button.url}}_url_startPage\"\n" +
    "										   ng-model=\"button.url\"\n" +
    "										   value=\"{{button.url}}\"\n" +
    "										   placeholder=\"http://aeouaou.com/aoeuoa\">\n" +
    "								</div>\n" +
    "\n" +
    "								<div class=\"col-xs-2\">\n" +
    "									<a class=\"btn btn-danger btn-mini right\" type=\"button\" ng-click=\"deleteButton(button)\">\n" +
    "										<i class=\"fa fa-trash-o\"></i>\n" +
    "									</a>\n" +
    "								</div>\n" +
    "							</div>\n" +
    "\n" +
    "							<div class=\"row\"><br></div>\n" +
    "							<div class=\"row\">\n" +
    "								<button class=\"btn btn-primary btn-small col-md-offset-6 col-md-6 col-sm-4 col-sm-offset-8 col-xs-4 col-xs-offset-8\" type=\"button\" ng-click=\"addButton()\">\n" +
    "									<i class=\"icon-plus icon-white\"></i> {{ 'ADD_BUTTON' | translate }}\n" +
    "								</button>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"modal-footer row\">\n" +
    "						<button type=\"submit\" ng-click=\"saveStartPage()\" class=\"btn btn-signup btn-rounded\">\n" +
    "							{{ 'SAVE_START_PAGE' | translate }}\n" +
    "						</button>\n" +
    "\n" +
    "						<button ng-click=\"cancel()\" class=\"btn btn-secondary btn-rounded\">\n" +
    "							{{ 'CANCEL' | translate }}\n" +
    "						</button>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class=\"preview-field-panel col-md-6 hidden-sm hidden-xs\">\n" +
    "					<form class=\"public-form\">\n" +
    "\n" +
    "						<div class=\"field row\">\n" +
    "							<div class=\"col-xs-12 text-center\" style=\"overflow-wrap: break-word;\">\n" +
    "								<h1>{{myform.startPage.introTitle}}</h1>\n" +
    "							</div>\n" +
    "							<div class=\"col-xs-10 col-xs-offset-1 text-left\" style=\"overflow-wrap: break-word;\">\n" +
    "								<p style=\"color:#ddd;\">{{myform.startPage.introParagraph}}</p>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "						<div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em;\">\n" +
    "							<p ng-repeat=\"button in myform.startPage.buttons\" class=\"text-center\" style=\"display:inline;\">\n" +
    "								<button class=\"btn btn-info\" type=\"button\" ng-style=\"{'background-color':button.bgColor, 'color':button.color}\">\n" +
    "									<a href=\"{{button.url}}\" style=\"font-size: 1.6em; text-decoration: none; color: inherit;\" >\n" +
    "										{{button.text}}\n" +
    "									</a>\n" +
    "								</button>\n" +
    "							</p>\n" +
    "						</div>\n" +
    "						<div class=\"row form-actions\">\n" +
    "							<button class=\"btn btn-info btn btn-info col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3\" type=\"button\">\n" +
    "										<span style=\"color:white; font-size: 1.6em; text-decoration: none;\">\n" +
    "											{{myform.startPage.introButtonText}}\n" +
    "										</span>\n" +
    "							</button>\n" +
    "						</div>\n" +
    "\n" +
    "					</form>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "		</div></script><script type=text/ng-template id=editFieldModal.html class=edit-field-modal><div class=\"modal-body\">\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"edit-panel col-md-6 col-xs-12 col-sm-12\">\n" +
    "					<div class=\"row modal-header\">\n" +
    "						<h2 class=\"modal-title hidden-md hidden-lg\">{{ 'EDIT_FIELD' | translate }}</h2>\n" +
    "						<h3 class=\"modal-title hidden-xs hidden-sm\">{{ 'EDIT_FIELD' | translate }}</h3>\n" +
    "					</div>\n" +
    "					<div class=\"row question\">\n" +
    "						<div class=\"col-md-12 bold\">{{ 'QUESTION_TITLE' | translate }}</div>\n" +
    "						<div class=\"col-md-12\">\n" +
    "							<input type=\"text\" class=\"form-control\" ng-model=\"field.title\" name=\"title{{field._id}}\" value=\"{{field.title}}\" required></div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row\"><br></div>\n" +
    "\n" +
    "					<div class=\"row description\" ng-hide=\"showRatingOptions(field)\">\n" +
    "						<div class=\"col-md-12 bold\">{{ 'QUESTION_DESCRIPTION' | translate }}</div>\n" +
    "						<div class=\"col-md-12\">\n" +
    "							<textarea type=\"text\" class=\"form-control\" ng-model=\"field.description\" name=\"description{{field._id}}\"value=\"{{field.description}}\"></textarea>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row\" ng-show=\"showAddOptions(field)\"><br></div>\n" +
    "					<div class=\"row options\" ng-if=\"showAddOptions(field)\">\n" +
    "						<div class=\"col-md-4 col-xs-12\">{{ 'OPTIONS' | translate }}</div>\n" +
    "						<div class=\"col-md-8 col-xs-12\">\n" +
    "							<div ng-repeat=\"option in field.fieldOptions track by option.option_id\" class=\"row\">\n" +
    "								<input type=\"text\" name=\"{{option.option_value}}{{field._id}}\" ng-model=\"option.option_value\" class=\"col-xs-5\">\n" +
    "\n" +
    "								<a class=\"btn btn-danger btn-mini right\" type=\"button\" ng-click=\"deleteOption(field, option)\" class=\"col-xs-3\">\n" +
    "									<i class=\"fa fa-trash-o\"></i>\n" +
    "								</a>\n" +
    "							</div>\n" +
    "							<div class=\"row\">\n" +
    "								<button class=\"btn btn-primary btn-small col-md-offset-0 col-md-6 col-sm-4 col-sm-offset-4 col-xs-6 col-xs-offset-6\" type=\"button\" ng-click=\"addOption(field)\">\n" +
    "									<i class=\"icon-plus icon-white\"></i> {{ 'ADD_OPTION' | translate }}\n" +
    "								</button>\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row\" ng-show=\"showRatingOptions(field)\"><br></div>\n" +
    "					<div class=\"row\" ng-if=\"showRatingOptions(field)\">\n" +
    "						<div class=\"col-md-9 col-sm-9\">{{ 'NUM_OF_STEPS' | translate }}</div>\n" +
    "						<div class=\"col-md-3 col-sm-3\">\n" +
    "							<input style=\"width:100%\" type=\"number\"\n" +
    "								   min=\"1\" max=\"10\"\n" +
    "								   ng-model=\"field.ratingOptions.steps\"\n" +
    "								   name=\"ratingOptions_steps{{field._id}}\"\n" +
    "								   ng-value=\"{{field.ratingOptions.steps}}\"\n" +
    "								   required>\n" +
    "						</div>\n" +
    "						<br>\n" +
    "						<div class=\"col-md-5 col-sm-9\">{{ 'SHAPE' | translate }}:</div>\n" +
    "						<div class=\"col-md-7 col-sm-3\">\n" +
    "							<select style=\"width:100%\" ng-model=\"field.ratingOptions.shape\"\n" +
    "									value=\"{{field.ratingOptions.steps}}\"\n" +
    "									name=\"ratingOptions_shape{{field._id}}\" required>\n" +
    "								<option ng-repeat=\"shapeType in validShapes\"\n" +
    "										value=\"{{shapeType}}\">\n" +
    "									{{select2FA[shapeType]}}\n" +
    "								</option>\n" +
    "							</select>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row\"><br></div>\n" +
    "\n" +
    "					<div class=\"row\">\n" +
    "						<div class=\"col-md-4 col-xs-12 field-title\">{{ 'REQUIRED_FIELD' | translate }}</div>\n" +
    "						<div class=\"col-md-8 col-xs-12 field-input\">\n" +
    "							<label class=\"switch-light switch-holo\" onclick=\"\">\n" +
    "								<input type=\"checkbox\" ng-model=\"field.required\">\n" +
    "								<span class=\"large-3 columns float-left\">\n" +
    "									<span> {{ 'OFF' | translate }}</span>\n" +
    "									<span> {{ 'ON' | translate }}</span>\n" +
    "									<a></a>\n" +
    "								</span>\n" +
    "							</label>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div class=\"row\">\n" +
    "						<div class=\"col-md-4 col-xs-12 field-input\">{{ 'LOGIC_JUMP' | translate }}</div>\n" +
    "						<div class=\"col-md-8 col-xs-12 field-input\">\n" +
    "							<label class=\"switch-light switch-holo\" onclick=\"\">\n" +
    "								<input type=\"checkbox\" ng-model=\"showLogicJump\">\n" +
    "								<span>\n" +
    "									<span> {{ 'OFF' | translate }}</span>\n" +
    "									<span> {{ 'ON' | translate }}</span>\n" +
    "									<a></a>\n" +
    "								</span>\n" +
    "							</label>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"row question\" ng-if=\"!!showLogicJump\">\n" +
    "						<div class=\"col-md-4 col-sm-12\">\n" +
    "\n" +
    "							<b> {{ 'IF_THIS_FIELD' | translate }} </b>\n" +
    "						</div>\n" +
    "						<div class=\"col-md-4 col-sm-12\">\n" +
    "							<select style=\"width:100%\" ng-model=\"field.logicJump.expressionString\"\n" +
    "									value=\"{{field.logicJump.expressionString}}\"\n" +
    "									name=\"logicjump_expressionString{{field._id}}\">\n" +
    "								<option value=\"field == static\">\n" +
    "\n" +
    "									{{ 'IS_EQUAL_TO' | translate }}\n" +
    "								</option>\n" +
    "								<option value=\"field != static\">\n" +
    "\n" +
    "									{{ 'IS_NOT_EQUAL_TO' | translate }}\n" +
    "								</option>\n" +
    "\n" +
    "								<option value=\"field > static\" ng-if-start=\"field.fieldType === 'number' || field.fieldType === 'rating' || field.fieldType === 'number'\">\n" +
    "\n" +
    "									{{ 'IS_GREATER_THAN' | translate }}\n" +
    "								</option>\n" +
    "								<option value=\"field >= static\">\n" +
    "\n" +
    "									{{ 'IS_GREATER_OR_EQUAL_THAN' | translate }}\n" +
    "								</option>\n" +
    "								<option value=\"field < static\">\n" +
    "\n" +
    "									{{ 'IS_SMALLER_THAN' | translate }}\n" +
    "								</option>\n" +
    "								<option value=\"field <= static\" ng-if-end>\n" +
    "\n" +
    "									{{ 'IS_SMALLER_OR_EQUAL_THAN' | translate }}\n" +
    "								</option>\n" +
    "\n" +
    "								<option value=\"field contains static\" ng-if-start=\"field.fieldType !== 'number' && field.fieldType !== 'rating' && field.fieldType !== 'number'\">\n" +
    "\n" +
    "									{{ 'CONTAINS' | translate }}\n" +
    "								</option>\n" +
    "								<option value=\"field !contains static\">\n" +
    "\n" +
    "									{{ 'DOES_NOT_CONTAINS' | translate }}\n" +
    "								</option>\n" +
    "								<option value=\"field ends static\">\n" +
    "\n" +
    "									{{ 'ENDS_WITH' | translate }}\n" +
    "								</option>\n" +
    "								<option value=\"field !ends static\">\n" +
    "\n" +
    "									{{ 'DOES_NOT_END_WITH' | translate }}\n" +
    "								</option>\n" +
    "								<option value=\"field starts static\">\n" +
    "\n" +
    "									{{ 'STARTS_WITH' | translate }}\n" +
    "								</option>\n" +
    "								<option value=\"field !starts static\" ng-if-end>\n" +
    "\n" +
    "									{{ 'DOES_NOT_START_WITH' | translate }}\n" +
    "								</option>\n" +
    "							</select>\n" +
    "						</div>\n" +
    "						<div class=\"col-md-4 col-sm-12\">\n" +
    "							<input type=\"text\" ng-model=\"field.logicJump.valueB\"/>\n" +
    "						</div>\n" +
    "						<div class=\"col-md-2\">\n" +
    "\n" +
    "							<b>{{ 'THEN_JUMP_TO' | translate }}</b>\n" +
    "						</div>\n" +
    "						<div class=\"col-md-10\">\n" +
    "							<select style=\"width:100%\" ng-model=\"field.logicJump.jumpTo\"\n" +
    "									value=\"{{field.logicJump.jumpTo}}\"\n" +
    "									name=\"logicjump_jumpTo{{field._id}}\">\n" +
    "								<option ng-repeat=\"jump_field in myform.form_fields\"\n" +
    "										value=\"{{jump_field._id}}\">\n" +
    "									{{jump_field.title}}\n" +
    "								</option>\n" +
    "							</select>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"modal-footer row\">\n" +
    "						<button type=\"submit\" ng-click=\"saveField()\" class=\"btn btn-signup btn-rounded\">\n" +
    "							{{ 'SAVE_FIELD' | translate }}\n" +
    "						</button>\n" +
    "\n" +
    "						<button ng-click=\"cancel()\" class=\"btn btn-secondary btn-rounded\">\n" +
    "							{{ 'CANCEL' | translate }}\n" +
    "						</button>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class=\"preview-field-panel col-md-6 hidden-sm hidden-xs\">\n" +
    "					<form class=\"public-form\"ss>\n" +
    "						<field-directive field=\"field\" validate=\"false\" class=\"preview-field\">\n" +
    "						</field-directive>\n" +
    "					</form>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "		</div></script><div class=\"col-xs-2 col-sm-4 add-field\"><div class=\"row add-field-title\"><h3 class=\"col-md-12 hidden-sm hidden-xs\">{{ 'ADD_FIELD_LG' | translate }}</h3><h4 class=\"col-sm-12 hidden-xs hidden-md hidden-lg\">{{ 'ADD_FIELD_MD' | translate }}</h4><h5 class=\"col-xs-12 hidden-sm hidden-md hidden-lg\">{{ 'ADD_FIELD_SM' | translate }}</h5></div><div class=\"panel-group row\" class=draggable ng-model=addField.types><div class=\"col-xs-12 col-sm-12 col-md-6\" ng-repeat=\"type in addField.types\" style=padding-top:7.5px><div class=\"panel panel-default\" style=background-color:#f5f5f5><div class=panel-heading ng-click=\"addNewField(false, type.name)\" style=\"cursor: pointer; font-size:12px; padding-left: 10px; padding-right: 10px\"><span><field-icon-directive type-name={{type.name}}></field-icon-directive></span> <span class=hidden-xs style=padding-left:0.3em>{{type.value}}</span></div></div></div></div></div><div class=\"col-xs-10 col-sm-8 current-fields\"><div class=row ng-if=myform.startPage.showStart><div class=col-sm-12><div class=\"panel panel-default startPage\" ng-click=openEditStartPageModal()><div class=panel-heading><h4 class=text-center>{{ 'WELCOME_SCREEN' | translate }}</h4></div></div></div></div><div class=row><div class=col-sm-12><hr></div></div><div class=\"row dropzoneContainer\"><div class=\"panel-group dropzone col-xs-12\" ui-sortable=sortableOptions ng-model=myform.form_fields><div class=\"col-xs-12 field-row\" ng-repeat=\"field in myform.form_fields track by $id($index)\" ng-if=!field.deletePreserved><div class=col-xs-10><div class=\"panel panel-default\" ng-click=openEditModal(field)><div class=panel-heading><div class=row><span class=col-xs-1 ng-switch=field.fieldType><field-icon-directive type-name={{field.fieldType}}></field-icon-directive></span> <span class=col-xs-11>{{field.title}} <span ng-show=field.required>*</span></span></div></div></div></div><div class=\"col-xs-1 box\"><div class=\"panel tool-panel panel-default\"><div class=panel-heading style=\"padding: 10px 10px\" ng-click=deleteField($index)><span class=text-center><a href=\"\" class=\"fa fa-trash-o\"></a></span></div></div></div><div class=\"col-xs-1 box\"><div class=\"panel tool-panel panel-default\"><div class=panel-heading style=\"padding: 10px 10px\" ng-click=duplicateField($index)><span class=text-center><a href=\"\" class=\"fa fa-files-o\"></a></span></div></div></div></div><div class=\"col-xs-12 field-row\"><div class=col-xs-12 style=\"padding-right: 5px\"><div class=\"panel panel-default\" style=\"border-style: dashed; border-color: #a9a9a9\"><div class=panel-heading><h4 class=\"panel-title text-center\" style=\"color: #a9a9a9\">{{ 'CLICK_FIELDS_FOOTER' | translate }}</h4></div></div></div></div><hr></div></div><div class=row ng-if=myform.endPage.showEnd><div class=col-sm-12><div class=\"panel panel-default startPage\" ng-click=openEditEndPageModal()><div class=panel-heading><h4 class=text-center>{{ 'END_SCREEN' | translate }}</h4></div></div></div></div></div></form>");
  $templateCache.put("modules/forms/admin/views/directiveViews/form/edit-submissions-form.client.view.html",
    "<div class=\"submissions-table container\"><div class=\"row text-center analytics\"><div class=\"col-xs-12 header-title\"><div class=col-xs-3>{{ 'TOTAL_VIEWS' | translate }}</div><div class=col-xs-3>{{ 'RESPONSES' | translate }}</div><div class=col-xs-3>{{ 'COMPLETION_RATE' | translate }}</div><div class=col-xs-3>{{ 'AVERAGE_TIME_TO_COMPLETE' | translate }}</div></div><div class=\"col-xs-12 header-numbers\"><div class=col-xs-3>{{myform.analytics.visitors.length}}</div><div class=col-xs-3>{{myform.analytics.submissions}}</div><div class=col-xs-3>{{myform.analytics.conversionRate | number:0}}%</div><div class=col-xs-3>{{ AverageTimeElapsed | secondsToDateTime | date:'mm:ss'}}</div></div><div class=\"col-xs-12 detailed-title\"><div class=col-xs-3>{{ 'DESKTOP_AND_LAPTOP' | translate }}</div><div class=col-xs-3>{{ 'TABLETS' | translate }}</div><div class=col-xs-3>{{ 'PHONES' | translate }}</div><div class=col-xs-3>{{ 'OTHER' | translate }}</div></div><div class=\"col-xs-12 detailed-row\"><div class=col-xs-3><div class=\"row header\">{{ 'UNIQUE_VISITS' | translate }}</div><div class=row>{{DeviceStatistics.desktop.visits}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'UNIQUE_VISITS' | translate }}</div><div class=row>{{DeviceStatistics.tablet.visits}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'UNIQUE_VISITS' | translate }}</div><div class=row>{{DeviceStatistics.tablet.visits}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'UNIQUE_VISITS' | translate }}</div><div class=row>{{DeviceStatistics.other.visits}}</div></div></div><div class=\"col-xs-12 detailed-row\"><div class=col-xs-3><div class=\"row header\">{{ 'RESPONSES' | translate }}</div><div class=row>{{DeviceStatistics.desktop.responses}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'RESPONSES' | translate }}</div><div class=row>{{DeviceStatistics.tablet.responses}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'RESPONSES' | translate }}</div><div class=row>{{DeviceStatistics.phone.responses}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'RESPONSES' | translate }}</div><div class=row>{{DeviceStatistics.other.responses}}</div></div></div><div class=\"col-xs-12 detailed-row\"><div class=col-xs-3><div class=\"row header\">{{ 'COMPLETION_RATE' | translate }}</div><div class=row>{{DeviceStatistics.desktop.completion}}%</div></div><div class=col-xs-3><div class=\"row header\">{{ 'COMPLETION_RATE' | translate }}</div><div class=row>{{DeviceStatistics.tablet.completion}}%</div></div><div class=col-xs-3><div class=\"row header\">{{ 'COMPLETION_RATE' | translate }}</div><div class=row>{{DeviceStatistics.phone.completion}}%</div></div><div class=col-xs-3><div class=\"row header\">{{ 'COMPLETION_RATE' | translate }}</div><div class=row>{{DeviceStatistics.other.completion}}%</div></div></div><div class=\"col-xs-12 detailed-row\"><div class=col-xs-3><div class=\"row header\">{{ 'AVERAGE_TIME_TO_COMPLETE' | translate }}</div><div class=row>{{DeviceStatistics.desktop.average_time | secondsToDateTime | date:'mm:ss'}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'AVERAGE_TIME_TO_COMPLETE' | translate }}</div><div class=row>{{DeviceStatistics.tablet.average_time | secondsToDateTime | date:'mm:ss'}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'AVERAGE_TIME_TO_COMPLETE' | translate }}</div><div class=row>{{DeviceStatistics.phone.average_time | secondsToDateTime | date:'mm:ss'}}</div></div><div class=col-xs-3><div class=\"row header\">{{ 'AVERAGE_TIME_TO_COMPLETE' | translate }}</div><div class=row>{{DeviceStatistics.other.average_time | secondsToDateTime | date:'mm:ss'}}</div></div></div><div class=\"col-xs-12 field-title-row\"><div class=col-xs-3><strong>{{ 'FIELD_TITLE' | translate }}</strong></div><div class=col-xs-3><strong>{{ 'FIELD_VIEWS' | translate }}</strong></div><div class=col-xs-3><strong>{{ 'FIELD_RESPONSES' | translate }}</strong></div><div class=col-xs-3><strong>{{ 'FIELD_DROPOFF' | translate }}</strong></div></div><div class=\"col-xs-12 field-detailed-row\" ng-repeat=\"fieldStats in myform.analytics.fields\"><div class=col-xs-3>{{fieldStats.field.title}}</div><div class=col-xs-3>{{fieldStats.totalViews}}</div><div class=col-xs-3>{{fieldStats.responses}}</div><div class=col-xs-3>{{fieldStats.continueRate}}%</div></div></div><br><div class=\"row table-tools\"><div class=col-xs-2><button class=\"btn btn-danger\" ng-click=deleteSelectedSubmissions() ng-disabled=!isAtLeastOneChecked();><i class=\"fa fa-trash-o\"></i> {{ 'DELETE_SELECTED' | translate }}</button></div><div class=\"col-xs-2 col-xs-offset-4 text-right\"><button class=\"btn btn-gray\" ng-click=\"exportSubmissions('xml')\"><small>{{ 'EXPORT_TO_EXCEL' | translate }}</small></button></div><div class=\"col-md-2 text-right\"><button class=\"btn btn-gray\" ng-click=\"exportSubmissions('csv')\"><small>{{ 'EXPORT_TO_CSV' | translate }}</small></button></div><div class=\"col-md-2 text-right\"><button class=\"btn btn-gray\" ng-click=\"exportSubmissions('json')\"><small>{{ 'EXPORT_TO_JSON' | translate }}</small></button></div></div><div class=\"row table-outer\"><div class=col-xs-12><table id=table-submission-data class=\"table table-striped table-hover table-condensed\"><thead><tr><th><input ng-model=table.masterChecker ng-change=toggleAllCheckers() type=\"checkbox\"></th><th>#</th><th data-ng-repeat=\"(key, value) in myform.form_fields track by $index\">{{value.title}}</th><th>{{ 'PERCENTAGE_COMPLETE' | translate }}</th><th>{{ 'TIME_ELAPSED' | translate }}</th><th>{{ 'DEVICE' | translate }}</th><th>{{ 'LOCATION' | translate }}</th><th>{{ 'IP_ADDRESS' | translate }}</th><th>{{ 'DATE_SUBMITTED' | translate }} (UTC)</th></tr></thead><tbody><tr data-ng-repeat=\"row in table.rows\" ng-click=rowClicked($index) ng-class=\"{selected: row.selected === true}\"><td><input ng-model=row.selected type=\"checkbox\"></td><th class=scope>{{$index+1}}</th><td data-ng-repeat=\"field in row.form_fields\">{{field.fieldValue}}</td><td>{{row.percentageComplete}}%</td><td>{{row.timeElapsed | secondsToDateTime | date:'mm:ss'}}</td><td>{{row.device.name}}, {{row.device.type}}</td><td>{{row.geoLocation.City}}, {{row.geoLocation.Country}}</td><td>{{row.ipAddr}}</td><td>{{row.created | date:'yyyy-MM-dd HH:mm:ss'}}</td></tr></tbody></table></div></div></div>");
  $templateCache.put("modules/users/views/authentication/access-denied.client.view.html",
    "<section class=\"text-center auth\"><h3 class=col-md-12>{{ 'ACCESS_DENIED_TEXT' | translate }}</h3><a href=/#!/sigin class=col-md-12>{{ 'SIGNIN_BTN' | translate }}</a></section>");
  $templateCache.put("modules/users/views/authentication/signin.client.view.html",
    "<section class=\"auth sigin-view valign-wrapper\" data-ng-controller=AuthenticationController><div class=\"row valign\"><div class=\"col-md-4 col-md-offset-4\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo_white.svg height=100px></div><div class=col-md-12><form class=\"signin form-horizontal\" autocomplete=off><fieldset><div data-ng-show=error class=\"text-center text-danger\">Error: <strong data-ng-bind=error></strong></div><div class=form-group><input id=username name=username class=form-control data-ng-model=credentials.username placeholder=\"{{ 'USERNAME_OR_EMAIL_LABEL' | translate }}\" ng-minlength=4></div><div class=form-group><input type=password id=password name=password class=form-control data-ng-model=credentials.password placeholder=\"{{ 'PASSWORD_LABEL' | translate }}\" ng-minlength=4></div><div class=form-group><button class=\"btn btn-signup btn-rounded btn-block\" ng-click=signin()>{{ 'SIGNIN_BTN' | translate }}</button></div><div class=\"text-center forgot-password\"><a ui-sref=forgot>{{ 'FORGOT_PASSWORD_LINK' | translate }}</a></div></fieldset></form></div></div><div class=\"text-center forgot-password col-md-12\"><a ui-sref=signup>{{ 'SIGNUP_ACCOUNT_LINK' | translate }}</a></div></div></section>");
  $templateCache.put("modules/users/views/authentication/signup-success.client.view.html",
    "<section class=\"auth signup-view success\" data-ng-controller=AuthenticationController><h3 class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6 text-center\">{{ 'SUCCESS_HEADER' | translate }}</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6\"><h2>{{ 'SUCCESS_TEXT' | translate }}<br><br>{{ 'NOT_ACTIVATED_YET' | translate }}</h2><br><br><p><strong>{{ 'BEFORE_YOU_CONTINUE' | translate }}</strong> <a href=mail:polydaic@gmail.com>polydaic@gmail.com</a></p><div class=\"text-center form-group\"><button type=submit class=\"btn btn-primary btn-rounded\"><a href=\"/#!/\" style=\"color: white; text-decoration: none\">{{ 'CONTINUE' | translate }}</a></button></div></div></section>");
  $templateCache.put("modules/users/views/authentication/signup.client.view.html",
    "<section class=\"auth signup-view valign-wrapper\" data-ng-controller=AuthenticationController><div class=\"row valign\"><div class=\"col-md-12 text-center vcenter\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo_white.svg height=100px></div><div class=\"col-xs-offset-3 col-xs-6 col-sm-offset-4 col-sm-4\"><form name=userForm data-ng-submit=signup() class=\"signin form-horizontal\" autocomplete=off><fieldset><div data-ng-show=error id=signup_errors class=text-center>{{'SIGNUP_ERROR_TEXT' | translate}}:<br><strong data-ng-bind=error></strong></div><div class=form-group><input id=username name=username class=form-control ng-pattern=languageRegExp ng-minlength=4 ng-model=credentials.username placeholder=\"{{ 'USERNAME_LABEL' | translate }}\" ng-minlength=4></div><div class=form-group><input type=email id=email name=email class=form-control ng-model=credentials.email placeholder=\"{{ 'EMAIL_LABEL' | translate }}\"></div><div class=form-group><input type=password id=password name=password class=form-control ng-model=credentials.password placeholder=\"{{ 'PASSWORD_LABEL' | translate }}\" ng-minlength=4></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-signup btn-rounded btn-block\">{{ 'SIGNUP_BTN' | translate }}</button></div></fieldset></form><div class=\"text-center forgot-password\"><a ui-sref=signin>{{ 'SIGN_IN_ACCOUNT_LINK' | translate }}</a></div></div></div></section>");
  $templateCache.put("modules/users/views/password/forgot-password.client.view.html",
    "<section class=\"auth valign-wrapper\" data-ng-controller=PasswordController><div class=\"row valign\"><div class=\"col-md-4 col-md-offset-4\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo_white.svg height=100px></div><div class=col-md-12><form data-ng-submit=askForPasswordReset() autocomplete=off><fieldset><div class=form-group><input id=username name=username class=form-control data-ng-model=credentials.username placeholder=\"{{ 'USERNAME_OR_EMAIL_LABEL' | translate }}\"></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-signup btn-rounded btn-block\">{{ 'PASSWORD_RESTORE_HEADER' | translate }}</button></div><div data-ng-show=error class=text-center><strong>Error: {{error}}</strong></div><div data-ng-show=success class=text-center><strong>{{success}}</strong></div></fieldset></form></div></div></div></section>");
  $templateCache.put("modules/users/views/password/reset-password-invalid.client.view.html",
    "<section class=\"row text-center\"><h3 class=col-md-12>{{ 'PASSWORD_RESET_INVALID' | translate }}</h3><a href=/#!/password/forgot class=col-md-12>{{ 'ASK_FOR_NEW_PASSWORD' | translate }}</a></section>");
  $templateCache.put("modules/users/views/password/reset-password-success.client.view.html",
    "<section class=\"row text-center\"><h3 class=col-md-12>{{ 'PASSWORD_RESET_SUCCESS' | translate }}</h3><a href=\"/#!/\" class=col-md-12>{{ 'CONTINUE_TO_LOGIN' | translate }}</a></section>");
  $templateCache.put("modules/users/views/password/reset-password.client.view.html",
    "<section class=\"row auth\" data-ng-controller=PasswordController><h3 class=\"col-md-12 text-center\">{{ 'RESET_PASSWORD' | translate }}</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6\"><form data-ng-submit=resetUserPassword() class=\"signin form-horizontal\" autocomplete=off><fieldset><div class=form-group><label for=newPassword>{{ 'NEW_PASSWORD_LABEL' | translate }}</label><input type=password id=newPassword name=newPassword class=form-control data-ng-model=passwordDetails.newPassword placeholder=\"{{ 'NEW_PASSWORD_LABEL' | translate }}\"></div><div class=form-group><label for=verifyPassword>{{ 'VERIFY_PASSWORD_LABEL' | translate }}</label><input type=password id=verifyPassword name=verifyPassword class=form-control data-ng-model=passwordDetails.verifyPassword placeholder=\"{{ 'VERIFY_PASSWORD_LABEL' | translate }}\"></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-large btn-primary\">{{ 'UPDATE_PASSWORD_LABEL' | translate }}</button></div><div data-ng-show=error class=\"text-center text-danger\"><strong>{{error}}</strong></div><div data-ng-show=success class=\"text-center text-success\"><strong>{{success}}</strong></div></fieldset></form></div></section>");
  $templateCache.put("modules/users/views/settings/change-password.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><section class=row data-ng-controller=SettingsController><h3 class=\"col-md-12 text-center\">{{ 'CHANGE_PASSWORD' | translate }}</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6\"><form data-ng-submit=changeUserPassword() class=\"signin form-horizontal\" autocomplete=off><fieldset><div class=form-group><label for=currentPassword>{{ 'CURRENT_PASSWORD_LABEL' | translate }}</label><input type=password id=currentPassword name=currentPassword class=form-control data-ng-model=passwordDetails.currentPassword placeholder=\"{{ 'CURRENT_PASSWORD_LABEL' | translate }}\"></div><hr><div class=form-group><label for=newPassword>{{ 'NEW_PASSWORD_LABEL' | translate }}</label><input type=password id=newPassword name=newPassword class=form-control data-ng-model=passwordDetails.newPassword placeholder=\"{{ 'NEW_PASSWORD_LABEL' | translate }}\"></div><div class=form-group><label for=verifyPassword>{{ 'VERIFY_PASSWORD_LABEL' | translate }}</label><input type=password id=verifyPassword name=verifyPassword class=form-control data-ng-model=passwordDetails.verifyPassword placeholder=\"{{ 'VERIFY_PASSWORD_LABEL' | translate }}\"></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-large btn-primary\">{{ 'SAVE_PASSWORD_BTN' | translate }}</button></div><div data-ng-show=success class=\"text-center text-success\"><strong>{{ 'PASSWORD_CHANGE_SUCCESS' | translate }}</strong></div><div data-ng-show=error class=\"text-center text-danger\"><strong data-ng-bind=error></strong></div></fieldset></form></div></section>");
  $templateCache.put("modules/users/views/settings/edit-profile.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><section class=row data-ng-controller=SettingsController><h2 class=\"col-xs-offset-1 col-xs-10 text-center\">{{ 'EDIT_PROFILE' | translate }}</h2><div class=\"col-xs-offset-3 col-xs-6\"><form name=userForm data-ng-submit=updateUserProfile(userForm.$valid) class=\"signin form-horizontal\" autocomplete=off><fieldset><div data-ng-show=success class=\"text-center text-success\"><strong>{{ 'PROFILE_SAVE_SUCCESS' | translate }}</strong></div><div data-ng-show=error class=\"text-center text-danger\">{{ 'PROFILE_SAVE_ERROR' | translate }}<br><strong data-ng-bind=error></strong></div><div class=\"form-group row\"><div class=\"col-xs-7 field-title\">{{ 'FIRST_NAME_LABEL' | translate }}</div><div class=\"col-xs-12 field-input\"><input id=firstName name=firstName class=form-control data-ng-model=user.firstName ng-pattern=\"/^[\\w0-9 \\-.]*$/\"></div></div><div class=\"form-group row\"><div class=\"col-xs-7 field-title\">{{ 'LAST_NAME_LABEL' | translate }}</div><div class=\"col-xs-12 field-input\"><input id=lastName name=lastName class=form-control data-ng-model=user.lastName ng-pattern=\"/^[\\w0-9 \\-.]*$/\"></div></div><div class=row><hr></div><div class=\"row form-group\"><div class=\"col-xs-7 field-title\">{{ 'LANGUAGE_LABEL' | translate }}</div><div class=\"col-xs-12 field-input\"><select ng-model=user.language required><option ng-repeat=\"language in languages\" ng-selected=\"language == user.language\" value={{language}}>{{language}}</option></select></div></div><div class=\"row form-group\"><div class=\"col-xs-7 field-title\">{{ 'USERNAME_LABEL' | translate }}</div><div class=\"col-xs-12 field-input\"><input id=username name=username class=form-control data-ng-model=user.username></div></div><div class=\"row form-group\"><div class=\"col-xs-7 field-title\">{{ 'EMAIL_LABEL' | translate }}</div><div class=\"col-xs-12 field-input\"><input type=email id=email name=email class=form-control data-ng-model=user.email></div></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-signup btn-rounded\">{{ 'SAVE_CHANGES' | translate }}</button> <button type=none ng-click=cancel() class=\"btn btn-rounded\">{{ 'CANCEL_BTN' | translate }}</button></div></fieldset></form></div></section>");
  $templateCache.put("modules/users/views/settings/social-accounts.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><section class=row data-ng-controller=SettingsController><h3 class=\"col-md-12 text-center\" data-ng-show=hasConnectedAdditionalSocialAccounts()>{{ 'CONNECTED_SOCIAL_ACCOUNTS' | translate }}:</h3><div class=\"col-md-12 text-center\"><div data-ng-repeat=\"(providerName, providerData) in user.additionalProvidersData\" class=remove-account-container><img ng-src=/modules/users/img/buttons/{{providerName}}.png> <a class=\"btn btn-danger btn-remove-account\" data-ng-click=removeUserSocialAccount(providerName)><i class=\"glyphicon glyphicon-trash\"></i></a></div></div><h3 class=\"col-md-12 text-center\">{{ 'CONNECT_OTHER_SOCIAL_ACCOUNTS' | translate }}</h3><div class=\"col-md-12 text-center\"><a href=/auth/facebook data-ng-hide=\"isConnectedSocialAccount('facebook')\" class=undecorated-link><img src=/modules/users/img/buttons/facebook.png></a> <a href=/auth/twitter data-ng-hide=\"isConnectedSocialAccount('twitter')\" class=undecorated-link><img src=/modules/users/img/buttons/twitter.png></a> <a href=/auth/google data-ng-hide=\"isConnectedSocialAccount('google')\" class=undecorated-link><img src=/modules/users/img/buttons/google.png></a> <a href=/auth/linkedin data-ng-hide=\"isConnectedSocialAccount('linkedin')\" class=undecorated-link><img src=/modules/users/img/buttons/linkedin.png></a> <a href=/auth/github data-ng-hide=\"isConnectedSocialAccount('github')\" class=undecorated-link><img src=/modules/users/img/buttons/github.png></a></div></section>");
  $templateCache.put("modules/users/views/verify/resend-verify-email.client.view.html",
    "<section class=\"auth valign-wrapper\" data-ng-controller=VerifyController><section class=\"row valign\" ng-if=!isResetSent><div class=\"col-md-4 col-md-offset-4\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo_white.svg height=100px></div><div data-ng-show=error class=\"text-center text-danger\"><strong>{{error}}</strong></div><div class=col-md-12><form data-ng-submit=resendVerifyEmail() class=\"signin form-horizontal\" autocomplete=off><fieldset><div class=form-group><input id=email name=email class=form-control data-ng-model=credentials.email placeholder=\"{{ 'ENTER_ACCOUNT_EMAIL' | translate}}\"></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-signup btn-rounded btn-block\" ng-click=resendVerifyEmail()>{{ 'RESEND_VERIFICATION_EMAIL' | translate }}</button></div></fieldset></form></div></div></section><section class=\"row valign\" ng-if=isResetSent><div class=\"col-md-4 col-md-offset-4\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo_white.svg height=100px></div><h3 class=\"col-md-12 text-center\">{{ 'VERIFICATION_EMAIL_SENT' | translate }}</h3><div class=col-md-12><h2>{{ 'VERIFICATION_EMAIL_SENT_TO' | translate }} {{username}}.<br>{{ 'NOT_ACTIVATED_YET' | translate }}</h2><p>{{ 'CHECK_YOUR_EMAIL' | translate }} <a href=mail:polydaic@gmail.com>polydaic@gmail.com</a></p><div class=\"text-center form-group\"><button type=submit class=\"btn btn-large btn-primary btn-rounded\"><a href=\"/#!/\" style=color:white>{{ 'CONTINUE' | translate }}</a></button></div></div></div></section></section>");
  $templateCache.put("modules/users/views/verify/verify-account.client.view.html",
    "<section class=auth data-ng-controller=VerifyController ng-init=validateVerifyToken()><section class=\"row text-center\" ng-if=isResetSent><div class=\"col-md-4 col-md-offset-4\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo_white.svg height=100px></div><h3 class=col-md-12>{{ 'VERIFY_SUCCESS' | translate }}</h3><div class=col-md-12><a href=/#!/signin class=\"btn btn-signup btn-rounded btn-block\">{{ 'CONTINUE_TO_LOGIN' | translate }}</a></div></div></section><section class=\"row text-center\" ng-if=!isResetSent><div class=\"col-md-4 col-md-offset-4\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo_white.svg height=100px></div><h3 class=col-md-12>{{ 'VERIFY_ERROR' | translate }}</h3><div class=col-md-12><a href=/#!/verify class=\"btn btn-rounded btn-default\">{{ 'REVERIFY_ACCOUNT_LINK' | translate }}</a></div><div class=col-sm-12><a href=/#!/signin class=\"btn btn-rounded btn-primary\">{{ 'SIGNIN_BTN' | translate }}</a></div></div></section></section>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/entryPage/startPage.html",
    "<div class=\"field row text-center\"><div class=\"col-xs-12 text-center\"><h1>{{pageData.introTitle}}</h1></div><div class=\"col-xs-10 col-xs-offset-1 text-left\"><p style=color:#ddd>{{pageData.introParagraph}}</p></div></div><div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em\"><p ng-repeat=\"button in pageData.buttons\" class=text-center style=display:inline><button class=\"btn btn-info\" type=button ng-style=\"{'background-color':button.bgColor, 'color':button.color}\"><a href={{button.url}} style=\"font-size: 1.6em; text-decoration: none; color: inherit\">{{button.text}}</a></button></p></div><div class=\"row form-actions\"><p class=\"col-xs-3 col-xs-offset-3 text-center\"><button class=\"btn btn-info\" type=button><a ng-click=exitpageData() style=\"color:white; font-size: 1.6em; text-decoration: none\">{{ 'CONTINUE_FORM' | translate }}</a></button></p></div>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/date.html",
    "<div class=\"field row\" ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=\"!field.required && !field.fieldValue\">{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><div class=\"control-group input-append\"><input class=focusOn ng-focus=\"setActiveField(field._id, null, false)\" ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" ng-class=\"{ 'no-border': !!field.fieldValue }\" ui-date=dateOptions ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required placeholder=MM/DD/YYYY on-tab-key=nextField() on-tab-and-shift-key=prevField() ng-change=nextField()></div></div></div>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/dropdown.html",
    "<div class=\"field row dropdown\" ng-if=\"field.fieldOptions.length > 0\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><ui-select ng-model=field.fieldValue ng-focus=\"setActiveField(field._id, null, false)\" theme=selectize search-enabled=true search-by=option_value set-search-to-answer=true ng-required=field.required on-tab-and-shift-key=prevField() on-tab-key=nextField() ng-change=nextField()><ui-select-match placeholder=\"Type or select an option\"></ui-select-match><ui-select-choices repeat=\"option in field.fieldOptions | filter: $select.search\" ng-class=\"{'active': option.option_value === field.fieldValue }\"><span ng-bind-html=\"option.option_value | highlight: $select.search\"></span></ui-select-choices></ui-select></div></div><br>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/hidden.html",
    "<input type=hidden>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/legal.html",
    "<div class=\"field row radio legal\" on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() key-to-truthy key-char-truthy=y key-char-falsey=n field=field on-valid-key=nextField()><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><br><p class=col-xs-12>{{field.description}}</p></div><div class=\"col-xs-12 field-input container\"><div class=row-fluid><label class=\"btn col-md-5 col-xs-12\" ng-class=\"{activeBtn: field.fieldValue == 'true'}\"><input class=focusOn ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" type=radio value=true ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-change=\"nextField()\"><div class=letter style=float:left>Y</div><span>{{ 'LEGAL_ACCEPT' | translate }}</span></label><label class=\"btn col-md-5 col-md-offset-1 col-xs-12\" ng-class=\"{activeBtn: field.fieldValue == 'false'}\"><input class=focusOn ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" type=radio value=false ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-change=\"nextField()\"><div class=letter style=float:left>N</div><span>{{ 'LEGAL_NO_ACCEPT' | translate }}</span></label></div></div></div><br>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/radio.html",
    "<div class=\"field row radio\" on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() key-to-option field=field ng-if=\"field.fieldOptions.length > 0\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><div ng-repeat=\"option in field.fieldOptions\" class=row-fluid><label class=\"btn col-md-4 col-xs-12 col-sm-12\" style=\"margin: 0.5em; padding-left:30px\" ng-class=\"{activeBtn: field.fieldValue == field.fieldOptions[$index].option_value}\"><div class=letter style=float:left>{{$index+1}}</div><input ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" ng-focus=\"setActiveField(field._id, null, false)\" type=radio class=focusOn value={{option.option_value}} ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-change=\"$root.nextField()\"> <span ng-bind=option.option_value></span></label></div></div></div><br>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/rating.html",
    "<div class=\"textfield field row\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><input-stars max={{field.ratingOptions.steps}} ng-init=\"field.fieldValue = 1\" on-shape-click=true on-star-click=nextField() icon-full={{field.ratingOptions.shape}} icon-base=\"fa fa-3x\" icon-empty={{field.ratingOptions.shape}} ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() class=\"angular-input-stars focusOn\"></input-stars></div></div>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/statement.html",
    "<div class=\"statement field row\" on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField()><div class=\"row field-title field-title\"><div class=col-xs-1><i class=\"fa fa-quote-left fa-1\"></i></div><h2 class=\"text-left col-xs-9\">{{field.title}}</h2><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"row field-title field-input\"><p class=col-xs-12 ng-if=field.description.length>{{field.description}}</p><br><div class=\"col-xs-offset-1 col-xs-11\"><button class=\"btn focusOn\" ng-style=\"{'font-size': '1.3em', 'background-color':design.colors.buttonColor, 'color':design.colors.buttonTextColor}\" ng-click=nextField()>{{ 'CONTINUE' | translate }}</button></div></div></div>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/textarea.html",
    "<div class=\"field row\" ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><small>{{ 'NEWLINE' | translate }}</small><p><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><small style=font-size:0.6em>Press SHIFT+ENTER to add a newline</small><textarea class=\"textarea focusOn\" type=text ng-focus=\"setActiveField(field._id, null, false)\" ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-class=\"{ 'no-border': !!field.fieldValue }\" value={{field.fieldValue}} ng-required=field.required on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() style=\"border: none; border-left: lightgrey dashed 2px\">\n" +
    "		</textarea></div></div><div><div class=\"btn btn-lg btn-default\" style=\"padding: 4px; margin-top:8px; background: rgba(255,255,255,0.5)\"><button ng-disabled=\"!field.fieldValue || forms.myForm.{{field.fieldType}}{{$index}}.$invalid\" ng-style=\"{'background-color':design.colors.buttonColor, 'color':design.colors.buttonTextColor}\" ng-click=$root.nextField() class=\"btn col-sm-5 col-xs-5\">{{ 'OK' | translate }} <i class=\"fa fa-check\"></i></button><div class=\"col-sm-3 col-xs-6\" style=margin-top:0.2em><small style=\"color:#ddd; font-size:70%\">{{ 'ENTER' | translate }}</small></div></div></div>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/textfield.html",
    "<div class=\"textfield field row\" ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title row-fluid\" ng-style=\"{'color': design.colors.questionColor}\"><h3 class=col-xs-12><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>({{ 'OPTIONAL' | translate }})</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><input ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" name={{field.fieldType}}{{index}} type={{input_type}} ng-pattern=validateRegex placeholder={{placeholder}} ng-class=\"{ 'no-border': !!field.fieldValue }\" class=\"focusOn text-field-input\" ng-focus=\"setActiveField(field._id, null, false)\" ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" value=field.fieldValue on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() ng-required=field.required aria-describedby=\"inputError2Status\"></div><div class=col-xs-12><div ng-show=\"forms.myForm.{{field.fieldType}}{{index}}.$invalid && !!forms.myForm.{{field.fieldType}}{{index}}.$viewValue \" class=\"alert alert-danger\" role=alert><span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=true></span> <span class=sr-only>Error:</span> <span ng-if=\"field.fieldType == 'email'\">{{ 'ERROR_EMAIL_INVALID' | translate }}</span> <span ng-if=\"field.fieldType == 'number'\">{{ 'ERROR_NOT_A_NUMBER' | translate }}</span> <span ng-if=\"field.fieldType == 'link'\">{{ 'ERROR_URL_INVALID' | translate }}</span></div></div></div><div><div class=\"btn btn-lg btn-default\" ng-disabled=\"!field.fieldValue || field.$invalid\" style=\"padding: 4px; margin-top:8px; background: rgba(255,255,255,0.5)\"><button ng-disabled=\"!field.fieldValue || field.$invalid\" ng-style=\"{'background-color':design.colors.buttonColor, 'color':design.colors.buttonTextColor}\" ng-click=nextField() class=\"btn col-sm-5 col-xs-5\">{{ 'OK' | translate }} <i class=\"fa fa-check\"></i></button><div class=\"col-xs-6 col-sm-3\" style=margin-top:0.2em><small style=\"color:#ddd; font-size:70%\">{{ 'ENTER' | translate }}</small></div></div></div>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/field/yes_no.html",
    "<div class=\"field row radio\" ng-click=\"setActiveField(field._id, index, true)\" key-to-truthy key-char-truthy=y key-char-falsey=n field=field on-tab-key=nextField() on-tab-and-shift-key=prevField() on-valid-key=nextField()><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3 class=row><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i></small> {{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=row>{{field.description}}</p></div><div class=\"col-xs-12 field-input\"><div class=row><label class=\"btn btn-default col-md-2 col-sm-3 col-xs-7\" style=\"background: rgba(0,0,0,0.1); text-align:left\"><input type=radio value=true class=focusOn style=\"opacity: 0; margin-left: 0px\" ng-focus=\"setActiveField(field._id, null, false)\" ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-change=\"nextField()\"><div class=letter>{{ 'Y' | translate }}</div><span>{{ 'YES' | translate }}</span> <i ng-show=\"field.fieldValue === 'true'\" class=\"fa fa-check\" aria-hidden=true></i></label></div><div class=row style=\"margin-top: 10px\"><label class=\"btn btn-default col-md-2 col-sm-3 col-xs-7\" style=\"background: rgba(0,0,0,0.1); text-align:left\"><input type=radio value=false style=\"opacity:0; margin-left:0px\" ng-focus=\"setActiveField(field._id, null, false)\" ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-change=\"nextField()\"><div class=letter>{{ 'N' | translate }}</div><span>{{ 'NO' | translate }}</span> <i ng-show=\"field.fieldValue === 'false'\" class=\"fa fa-check\" aria-hidden=true></i></label></div></div></div><br>");
  $templateCache.put("form_modules/forms/base/views/directiveViews/form/submit-form.client.view.html",
    "<div ng-show=\"!myform.submitted && myform.startPage.showStart\" class=form-submitted style=\"padding-top: 35vh\"><div class=row><div class=\"col-xs-12 text-center\" style=\"overflow-wrap: break-word\"><h1 style=\"font-weight: 400; nont-size: 25px\" ng-style=\"{'color': myform.design.colors.questionColor}\">{{myform.startPage.introTitle}}</h1></div><div class=\"col-xs-10 col-xs-offset-1 text-center\" style=\"overflow-wrap: break-word\"><p style=\"font-weight: 100; font-size: 16px\" ng-style=\"{'color': myform.design.colors.questionColor}\">{{myform.startPage.introParagraph}}</p></div></div><div class=\"row form-actions text-center\" style=\"padding: 5px 25px 5px 25px\"><button ng-click=exitStartPage() class=btn type=button ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\"><span style=\"font-size: 1.6em\">{{myform.startPage.introButtonText}}</span></button></div><div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em\"><p ng-repeat=\"button in myform.startPage.buttons\" class=text-center style=display:inline><button class=btn style=\"background-color:rgb(156, 226, 235)\" type=button ng-style=\"{'background-color':button.bgColor, 'color':button.color}\"><a href={{button.url}} style=\"font-size: 1.6em; text-decoration: none\" ng-style=\"{'color':button.color}\">{{button.text}}</a></button></p></div></div><div class=form-fields ng-show=\"!myform.submitted && !myform.startPage.showStart\" ng-style=\"{ 'border-color': myform.design.colors.buttonTextColor }\"><div class=\"row form-field-wrapper\"><form name=forms.myForm novalidate class=submission-form><div ng-repeat=\"field in myform.form_fields\" ng-if=!field.deletePreserved data-index={{$index}} data-id={{field._id}} ng-class=\"{activeField: selected._id == field._id }\" class=\"row field-directive\"><field-directive field=field design=myform.design index=$index forms=forms></field-directive></div><div class=\"row form-actions\" id=submit_field ng-class=\"{activeField: selected._id == 'submit_field' }\" ng-style=\"{ 'background-color':myform.design.colors.buttonColor}\" style=\"border-top: 1px solid #ddd; margin-top: 30vh; height: 100vh; margin-left: 1%; margin-right: 1%\" on-tab-and-shift-key=prevField() on-tab-key=nextField() on-enter-key=submitForm()><div class=\"col-xs-12 text-left\" style=\"background-color:#990000; color:white\" ng-if=forms.myForm.$invalid>{{ 'COMPLETING_NEEDED' | translate:translateAdvancementData }}</div><button ng-if=!forms.myForm.$invalid class=\"Button btn col-sm-2 col-xs-8 focusOn\" v-busy=loading v-busy-label=\"Please wait\" v-pressable ng-disabled=\"loading || forms.myForm.$invalid\" ng-click=submitForm() on-enter-key-disabled=\"loading || forms.myForm.$invalid\" ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" style=\"font-size: 1.6em; margin-left: 1em; margin-top: 1em\">{{ 'SUBMIT' | translate }}</button> <button ng-if=forms.myForm.$invalid class=\"Button btn col-sm-2 col-xs-8 focusOn\" ng-click=goToInvalid() on-enter-key=goToInvalid() on-enter-key-disabled=!forms.myForm.$invalid style=\"font-size: 1.6em; margin-left: 1em; margin-top: 1em; background-color:#990000; color:white\">{{ 'REVIEW' | translate }}</button><div class=\"col-sm-2 hidden-xs\" style=\"font-size: 75%; margin-top:3.25em\"><small>{{ 'ENTER' | translate }}</small></div></div></form></div><section ng-if=!myform.hideFooter class=\"navbar navbar-fixed-bottom\" ng-style=\"{ 'background-color':myform.design.colors.buttonColor, 'padding-top': '15px', 'border-top': '2px '+ myform.design.colors.buttonTextColor +' solid', 'color':myform.design.colors.buttonTextColor}\"><div class=container-fluid><div class=row><div class=\"col-sm-5 col-md-6 col-xs-5\" ng-show=!myform.submitted><p class=lead>{{ 'ADVANCEMENT' | translate:translateAdvancementData }}</p></div><div class=\"col-md-6 col-md-offset-0 col-sm-offset-2 col-sm-3 col-xs-offset-1 col-xs-6 row\"><div class=\"col-md-4 col-md-offset-2 hidden-sm hidden-xs\"><a href=/#!/forms class=btn ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\">{{ 'CREATE_FORM' | translate }}</a></div><div class=\"col-md-4 col-sm-10 col-md-offset-0 col-sm-offset-2 col-xs-12 row\"><button class=\"btn btn-lg col-xs-6\" id=focusDownButton ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" ng-click=nextField() ng-disabled=\"selected.index > myform.form_fields.length-1\"><i class=\"fa fa-chevron-down\"></i></button> <button class=\"btn btn-lg col-xs-6\" id=focusUpButton ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" ng-click=prevField() ng-disabled=\"selected.index == 0\"><i class=\"fa fa-chevron-up\"></i></button></div></div></div></div></section></div><div ng-if=\"myform.submitted && !loading && !myform.endPage.showEnd\" class=form-submitted ng-style=\"{'color':myform.design.colors.buttonTextColor}\" style=\"padding-top: 5vh\"><div class=\"field row text-center\" ng-style=\"{'color': myform.design.colors.questionColor}\"><div class=\"col-xs-12 col-sm-12 col-md-6 col-md-offset-3 text-center\">{{ 'FORM_SUCCESS' | translate }}</div></div><div class=\"row form-actions\"><p class=text-center><button ng-click=reloadForm() class=btn type=button ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\"><span style=\"font-size: 1.6em\">{{ 'BACK_TO_FORM' | translate }}</span></button></p></div></div><div ng-if=\"myform.submitted && !loading && myform.endPage.showEnd\" class=form-submitted ng-style=\"{'color':myform.design.colors.buttonTextColor}\" style=\"padding-top: 5vh\"><div class=row><div class=\"col-xs-12 text-center\" style=\"overflow-wrap: break-word\"><h1 style=\"font-weight: 400; font-size: 25px\" ng-style=\"{'color': myform.design.colors.questionColor}\">{{myform.endPage.title}}</h1></div><div class=\"col-xs-10 col-xs-offset-1 text-center\" style=\"overflow-wrap: break-word\"><p style=\"font-weight: 100; font-size: 16px\" ng-style=\"{'color': myform.design.colors.questionColor}\">{{myform.endPage.paragraph}}</p></div></div><div class=\"row form-actions text-center\" style=\"padding: 5px 25px 5px 25px\"><button ng-click=reloadForm() class=btn type=button ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\"><span style=\"font-size: 1.6em\">{{myform.endPage.buttonText}}</span></button></div><div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em\"><p ng-repeat=\"button in myform.endPage.buttons\" class=text-center style=display:inline><button class=btn style=\"background-color:rgb(156, 226, 235)\" type=button ng-style=\"{'background-color':button.bgColor, 'color':button.color}\"><a href={{button.url}} style=\"font-size: 1.6em; text-decoration: none\" ng-style=\"{'color':button.color}\">{{button.text}}</a></button></p></div></div>");
  $templateCache.put("form_modules/forms/base/views/form-not-found.client.view.html",
    "<script>$(\".loader\").fadeOut(\"slow\");</script><section class=\"public-form auth sigin-view valign-wrapper\"><div class=\"row valign\"><h3 class=\"col-md-12 text-center\">404 - Form Does not Exist</h3><div class=\"col-md-4 col-md-offset-4\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\">The form you are trying to access does not exist. Sorry about that!</div></div></div></section>");
  $templateCache.put("form_modules/forms/base/views/form-unauthorized.client.view.html",
    "<script>$(\".loader\").fadeOut(\"slow\");</script><section class=\"public-form auth sigin-view valign-wrapper\"><div class=\"row valign\"><h3 class=\"col-md-12 text-center\">Not Authorized to Access Form</h3><div class=\"col-md-4 col-md-offset-4\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\">The form you are trying to access is currently private and not accesible publically.<br>If you are the owner of the form, you can set it to \"Public\" in the \"Configuration\" panel in the form admin.</div></div></div></section>");
  $templateCache.put("form_modules/forms/base/views/submit-form.client.view.html",
    "<section class=public-form><submit-form-directive myform=myform></submit-form-directive></section><script ng-if=myform.analytics.gaCode>window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;\n" +
    "	ga('create', '{{myform.analytics.gaCode}}', 'auto'); ga('send', 'pageview');</script><script ng-if=myform.analytics.gaCode src=https://www.google-analytics.com/analytics.js async defer></script>");
}]);

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

			var statesToIgnore = ['home', 'signin', 'resendVerifyEmail', 'verify', 'signup', 'signup-success', 'forgot', 'reset-invalid', 'reset', 'reset-success'];

			//Redirect to listForms if user is authenticated
			if(statesToIgnore.indexOf(toState.name) > 0){
				if(Auth.isAuthenticated()){
					event.preventDefault(); // stop current execution
					$state.go('listForms'); // go to listForms page
				}
			}
			//Redirect to 'signup' route if user is not authenticated
			else if(toState.name !== 'access_denied' && !Auth.isAuthenticated() && toState.name !== 'submitForm'){
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

				if( (permissions !== null) ){
					if( !authenticator.canAccess(permissions) ){
						event.preventDefault();
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
}]).filter('formValidity', [function(){
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
					} else if(field.fieldType === 'rating'){
					    return true;
					}

				}).length;
				return valid_count - (formObj.form_fields.length - formObj.visible_form_fields.length);
			}
			return 0;
        };
}]).filter('trustSrc', ['$sce', function($sce){
        return function(formUrl){
        	return $sce.trustAsResourceUrl(formUrl);
        };
}]).config(['$provide', function ($provide){
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
			templateUrl: '/static/form_modules/forms/base/views/submit-form.client.view.html',
			data: {
				hideNav: true
			},
			resolve: {
				Forms: 'GetForms',
				myForm: ["GetForms", "$stateParams", "$q", function (GetForms, $stateParams, $q) {
		           	var deferred = $q.defer();
		           	GetForms.get({formId: $stateParams.formId}, function(resolvedForm){
		           		deferred.resolve(resolvedForm);
					});

					return deferred.promise;
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
				GetForms: 'GetForms',
		        myForm: ["GetForms", "$stateParams", "$q", function (GetForms, $stateParams, $q) {
		            var deferred = $q.defer();
		           	GetForms.get({formId: $stateParams.formId}, function(resolvedForm){
		           		deferred.resolve(resolvedForm);
					});

					return deferred.promise;
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

'use strict';

//Forms service used for communicating with the forms REST endpoints
angular.module('forms').factory('GetForms', ['$resource', 'FORM_URL',
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

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
    $httpProvider.interceptors.push(["$q", "$location", function($q, $location) {
      return {
        responseError: function(response) {
          if( $location.path() !== '/users/me' && response.config){
            if(response.config.url !== '/users/me'){
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

					if($state.previous.name !== 'home' && $state.previous.name !== 'verify' && $state.previous.name !== '') {
						$state.go($state.previous.name);
					} else {
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
	    	if($scope.credentials === 'admin'){
	    		$scope.error = 'Username cannot be \'admin\'. Please pick another username.';
	    		return;
	    	}

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
			User.resendVerifyEmail($scope.credentials.email).then(
				function(response){
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
						$scope.success = response.message;
						$scope.isResetSent = true;
						$scope.credentials.email = null;
					},
					function(error){
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
          return service._currentUser;
        } else if ($window.user){
          service._currentUser = $window.user;
          return service._currentUser;
        } else{
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
angular.module('forms').controller('AdminFormController', ['$rootScope', '$window', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$uibModal', 'myForm', '$filter',
    function($rootScope, $window, $scope, $stateParams, $state, Forms, CurrentForm, $http, $uibModal, myForm, $filter) {

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
        $scope.oldForm = _.cloneDeep($scope.myform);

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

        $scope.tabData = [
            {
                heading: $filter('translate')('CONFIGURE_TAB'),
                templateName:   'configure'
            }
        ];

        $scope.designTabActive = false

        $scope.deactivateDesignTab = function(){
            $scope.designTabActive = false
        }

        $scope.activateDesignTab = function(){
            $scope.designTabActive = true
        }

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
                        $state.go('listForms', {}, {reload: true})
                    }, function(error){
                        console.error(error);
                    });
            }
        };

        $scope.updateDesign = function(updateImmediately, data, shouldDiff, refreshAfterUpdate){
            $scope.update(updateImmediately, data, shouldDiff, refreshAfterUpdate, function(){
                refreshFrame();
            });
        }

        // Update existing Form
        $scope.update = $rootScope.update = function(updateImmediately, data, shouldDiff, refreshAfterUpdate, cb){
            var continueUpdate = true;
            if(!updateImmediately){
                continueUpdate = !$rootScope.saveInProgress;
            }

            //Update form **if we are not in the middle of an update** or if **shouldUpdateNow flag is set**
            if(continueUpdate) {
                var err = null;

                if (!updateImmediately) {
                    $rootScope.saveInProgress = true;
                }

                if (shouldDiff) {
                    //Do this so we can create duplicate fields
                    var checkForValidId = new RegExp('^[0-9a-fA-F]{24}$');
                    for(var i=0; i < $scope.myform.form_fields.length; i++){
                        var field = $scope.myform.form_fields[i];
                        if(!checkForValidId.exec(field._id+'')){
                            delete $scope.myform.form_fields[i]._id;
                            delete $scope.myform.form_fields[i].id;
                        }
                    }

                    var data = DeepDiff.diff($scope.oldForm, $scope.myform);

                    $scope.updatePromise = $http.put('/forms/' + $scope.myform._id, {changes: data})
                        .then(function (response) {
                            if (refreshAfterUpdate) {
                                $rootScope.myform = $scope.myform = response.data;
                                $scope.oldForm = _.cloneDeep($scope.myform);
                            }
                        }).catch(function (response) {
                            err = response.data;
                            console.error(err);
                        }).finally(function () {
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

                    if(dataToSend.visible_form_fields){
                        delete dataToSend.visible_form_fields;
                    }

                     if(dataToSend.analytics){
                        delete dataToSend.analytics.visitors;
                        delete dataToSend.analytics.fields;
                        delete dataToSend.analytics.submissions;
                        delete dataToSend.analytics.views;
                        delete dataToSend.analytics.conversionRate;
                    }

                    delete dataToSend.created;
                    delete dataToSend.lastModified;
                    delete dataToSend.__v;

                    $scope.updatePromise = $http.put('/forms/' + $scope.myform._id, {form: dataToSend})
                        .then(function (response) {
                            if (refreshAfterUpdate) {
                                $rootScope.myform = $scope.myform = response.data;
                            }

                        }).catch(function (response) {
                            err = response.data;
                            console.error(err);
                        }).finally(function () {
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
angular.module('forms').controller('ListFormsController', ['$rootScope', '$scope', '$stateParams', '$state', 'GetForms', 'CurrentForm', '$http', '$uibModal',
	function($rootScope, $scope, $stateParams, $state, GetForms, CurrentForm, $http, $uibModal) {

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
            GetForms.query(function(_forms){
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

            var form = {};
            form.title = $scope.forms.createForm.title.$modelValue;
            form.language = $scope.forms.createForm.language.$modelValue;

            if($scope.forms.createForm.$valid && $scope.forms.createForm.$dirty){
                $http.post('/forms', {form: form})
                .success(function(data, status, headers){
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
                    $scope.myforms.splice(form_index, 1);
					$scope.cancelDeleteModal();
                }).error(function(error){
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
				    //helper: 'clone',
					forceHelperSize: true,
					forcePlaceholderSize: true,
					update: function(e, ui) {
                        $scope.update(false, $scope.myform, true, false, function(err){
						});
					},
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
								$scope.$parent.update(false, $scope.$parent.myform, true, true, function(){
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
								$scope.$parent.update(false, $scope.$parent.myform, true, true, function(){
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
				 ** EditEndPageModal Functions
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
								$scope.$parent.update(false, $scope.$parent.myform, true, true, function(){
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
							steps: 5,
							shape: 'Heart'
						};
						newField.fieldValue = 0;
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
                    var currField = angular.copy($scope.myform.form_fields[field_index]);
                    currField._id = 'cloned'+_.uniqueId();
                    currField.title += ' copy';

                    //Insert field at selected index
                    $scope.myform.form_fields.push(currField);
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

		var submissions = $scope.myform.submissions || [];

                //Iterate through form's submissions
                for(var i = 0; i < submissions.length; i++){
                    for(var x = 0; x < submissions[i].form_fields.length; x++){
                        if(submissions[i].form_fields[x].fieldType === 'dropdown'){
                            submissions[i].form_fields[x].fieldValue = submissions[i].form_fields[x].fieldValue.option_value;
                        }
                        //var oldValue = submissions[i].form_fields[x].fieldValue || '';
                        //submissions[i].form_fields[x] =  _.merge(defaultFormFields, submissions[i].form_fields);
                        //submissions[i].form_fields[x].fieldValue = oldValue;
                    }
                    submissions[i].selected = false;
                }

                $scope.table.rows = submissions;		

                var initController = function(){
                    $http({
                      method: 'GET',
                      url: '/someUrl'
                    }).then(function successCallback(response) {
                        var defaultFormFields = _.cloneDeep($scope.myform.form_fields);

                        var submissions = response.data || [];

                        //Iterate through form's submissions
                        for(var i = 0; i < submissions.length; i++){
                            for(var x = 0; x < submissions[i].form_fields.length; x++){
                                if(submissions[i].form_fields[x].fieldType === 'dropdown'){
                                    submissions[i].form_fields[x].fieldValue = submissions[i].form_fields[x].fieldValue.option_value;
                                }
                                //var oldValue = submissions[i].form_fields[x].fieldValue || '';
                                //submissions[i].form_fields[x] =  _.merge(defaultFormFields, submissions[i].form_fields);
                                //submissions[i].form_fields[x].fieldValue = oldValue;
                            }
                            submissions[i].selected = false;
                        }

                        $scope.table.rows = submissions;
                    });
                };


                /*
                ** Analytics Functions
                */
                $scope.AverageTimeElapsed = (function(){
                    var totalTime = 0;
                    var numSubmissions = $scope.table.rows.length;

                    for(var i=0; i<$scope.table.rows.length; i++){
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
                        for (var i = 0; i < visitors.length; i++) {
                            var visitor = visitors[i];
                            var deviceType = visitor.deviceType;

                            stats[deviceType].visits++;

                            if (visitor.isSubmitted) {
                                stats[deviceType].total_time = stats[deviceType].total_time + visitor.timeElapsed;
                                stats[deviceType].responses++;
                            }

                            if(stats[deviceType].visits) {
                                stats[deviceType].completion = 100*(stats[deviceType].responses / stats[deviceType].visits).toFixed(2);
                            }

                            if(stats[deviceType].responses){
                                stats[deviceType].average_time = (stats[deviceType].total_time / stats[deviceType].responses).toFixed(0);
                            }
                        }
                    }
                    return stats;
                })();

                var updateFields = $interval(initController, 1000000);

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
                            console.error(err);
                        });
                };

                //Export selected submissions of Form
                $scope.exportSubmissions = function(type){
                    angular.element('#table-submission-data').tableExport({type: type, escape:false, ignoreColumn: [0]});
                };

            }]
        };
    }
]);

'use strict';

//TODO: DAVID: URGENT: Make this a $resource that fetches valid field types from server
angular.module('forms').service('FormFields', [ '$filter',
	function($filter) {
		this.types = [
		    {
		        name : 'textfield',
		        value : $filter('translate')('SHORT_TEXT'),
		    },
		    {
		        name : 'email',
		        value : $filter('translate')('EMAIL'),
		    },
		    {
		        name : 'radio',
		        value : $filter('translate')('MULTIPLE_CHOICE'),
		    },
		    {
		        name : 'dropdown',
		        value : $filter('translate')('DROPDOWN'),
		    },
		    {
		        name : 'date',
		        value : $filter('translate')('DATE'),
		    },
		    {
		        name : 'textarea',
		        value : $filter('translate')('PARAGRAPH'),
		    },
		    {
		        name : 'yes_no',
		        value : $filter('translate')('YES_NO'),
		    },
		    {
		        name : 'legal',
		        value : $filter('translate')('LEGAL'),
		    },
		    // {
		    //     name : 'sig',
		    //     value : $filter('translate')('SIGNATURE'),
		    // },
			// {
		    //     name : 'file',
		    //     value : $filter('translate')('FILE_UPLOAD'),
		    // },
		    {
		        name : 'rating',
		        value : $filter('translate')('RATING'),
		    },
		    {
		        name : 'link',
		        value : $filter('translate')('LINK'),
		    },
		    {
		        name : 'number',
		        value : $filter('translate')('NUMBERS'),
		    },
		    // {
		    //     name : 'scale',
		    //     value : $filter('translate')('OPINION SCALE'),
		    // },
		    // {
		    //     name : 'stripe',
		    //     value : $filter('translate')('PAYMENT'),
		    // },
		    {
		        name : 'statement',
		        value : $filter('translate')('STATEMENT')
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

	    //Share View
	    EMBED_YOUR_FORM: 'Embed your form',
	    SHARE_YOUR_FORM: 'Share your form',

		//Admin Tabs
		CREATE_TAB: 'Create',
		DESIGN_TAB: 'Design',
		CONFIGURE_TAB: 'Configure',
		ANALYZE_TAB: 'Analyze',
    	SHARE_TAB: 'Share',

	    //Field Types
	    SHORT_TEXT: 'Short Text',
	    EMAIL: 'Email',
	    MULTIPLE_CHOICE: 'Multiple Choice',
	    DROPDOWN: 'Dropdown',
	    DATE: 'Date',
	    PARAGRAPH_T: 'Paragraph',
	    YES_NO: 'Yes/No',
	    LEGAL: 'Legal',
	    RATING: 'Rating',
	    NUMBERS: 'Numbers',
	    SIGNATURE: 'Signature',
	    FILE_UPLOAD: 'File upload',
	    OPTION_SCALE: 'Option Scale',
	    PAYMENT: 'Payment',
	    STATEMENT: 'Statement',
	    LINK: 'Link',

	    //Form Preview
	    FORM_SUCCESS: 'Form entry successfully submitted!',
		REVIEW: 'Review',
	    BACK_TO_FORM: 'Go back to Form',
		EDIT_FORM: 'Edit this TellForm',
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
		NEWLINE: 'press SHIFT+ENTER to create a newline',
		CONTINUE: 'Continue',
		LEGAL_ACCEPT: 'I accept',
		LEGAL_NO_ACCEPT: 'I don’t accept',
		SUBMIT: 'Submit',
		UPLOAD_FILE: 'Upload your File'
	});
}]);

'use strict';

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

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

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

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

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

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

	    //Share View
	    EMBED_YOUR_FORM: 'Pone tu formulario',
	    SHARE_YOUR_FORM: 'Compartí tu formulario',

		//Admin Tabs
		CREATE_TAB: 'Crear',
		DESIGN_TAB: 'Diseño',
		CONFIGURE_TAB: 'Configuración',
		ANALYZE_TAB: 'Análisis',
	    SHARE_TAB: 'Compartir',

	    //Field Types
	    SHORT_TEXT: 'Texto corto',
	    EMAIL: 'Email',
	    MULTIPLE_CHOICE: 'Opciones múltiples',
	    DROPDOWN: 'Desplegable',
	    DATE: 'Fecha',
	    PARAGRAPH_T: 'Párrafo',
	    YES_NO: 'Si/No',
	    LEGAL: 'Legal',
	    RATING: 'Puntaje',
	    NUMBERS: 'Números',
	    SIGNATURE: 'Firma',
	    FILE_UPLOAD: 'Subir archivo',
	    OPTION_SCALE: 'Escala',
	    PAYMENT: 'Pago',
	    STATEMENT: 'Declaración',
	    LINK: 'Enlace',

	    FORM_SUCCESS: '¡El formulario ha sido enviado con éxito!',
		REVIEW: 'Revisar',
		BACK_TO_FORM: 'Regresar al formulario',
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
		NEWLINE: 'presione SHIFT+INTRO para crear una nueva línea',
		CONTINUE: 'Continuar',
		LEGAL_ACCEPT: 'Yo acepto',
		LEGAL_NO_ACCEPT: 'Yo no acepto',
		SUBMIT: 'Registrar',
		UPLOAD_FILE: 'Cargar el archivo',
		Y: 'S',
		N: 'N'
	});
}]);

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('view-form', [
	'ngFileUpload', 'ui.date', 'angular-input-stars'
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

angular.module('view-form').directive('keyToTruthy', ['$rootScope', function($rootScope){
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
	LEGAL_ACCEPT: 'Yo acepto',
	LEGAL_NO_ACCEPT: 'Yo no acepto',
	DELETE: 'Eliminar',
	CANCEL: 'Cancelar',
	SUBMIT: 'Registrar',
	UPLOAD_FILE: 'Cargar el archivo',
	Y: 'S',
	N: 'N'
  });

}]);

'use strict';

// SubmitForm controller
angular.module('view-form').controller('SubmitFormController', [
	'$scope', '$rootScope', '$state', '$translate', 'myForm',
	function($scope, $rootScope, $state, $translate, myForm) {
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

angular.module('view-form').directive('fieldDirective', ['$http', '$compile', '$rootScope', '$templateCache', 'supportedFields',
	function($http, $compile, $rootScope, $templateCache, supportedFields) {

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

angular.module('view-form').directive('submitFormDirective', ['$http', 'TimeCounter', '$filter', '$rootScope', 'SendVisitorData', '$translate', '$timeout',
    function ($http, TimeCounter, $filter, $rootScope, SendVisitorData, $translate, $timeout) {
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

	Socket.$inject = ['$timeout', '$window'];

}());

'use strict';

angular.module('view-form').service('TimeCounter', [
	function(){
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

	}
]);
