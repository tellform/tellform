angular.module('TellForm.templates', []).run(['$templateCache', function ($templateCache) {
  "use strict";
  $templateCache.put("modules/core/views/header.client.view.html",
    "<section class=\"navbar navbar-inverse\" data-ng-controller=HeaderController ng-hide=hideNav><div class=container><div class=navbar-header><button class=navbar-toggle type=button data-ng-click=toggleCollapsibleMenu()><span class=sr-only>Toggle navigation</span> <i class=\"glyphicon glyphicon-menu-hamburger\"></i></button> <a href=/#!/ class=navbar-brand><img src=/static/modules/core/img/logo-inverse.svg height=100%></a></div><nav class=\"collapse navbar-collapse\" collapse=!isCollapsed role=navigation><ul class=\"nav navbar-nav navbar-right\" data-ng-hide=authentication.isAuthenticated()><li ng-hide=$root.signupDisabled ui-route=/signup ng-class=\"{active: $uiRoute}\"><a href=/#!/signup>{{ 'SIGNUP_TAB' | translate }}</a></li><li class=divider-vertical></li><li ui-route=/signin ng-class=\"{active: $uiRoute}\"><a href=/#!/signin>{{ 'SIGNIN_TAB' | translate }}</a></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-show=authentication.isAuthenticated()><li class=dropdown uib-dropdown><a href=# class=dropdown-toggle data-toggle=dropdown dropdown-toggle><span>{{ 'MY_SETTINGS' | translate }}</span> <b class=caret></b></a><ul class=dropdown-menu><li><a href=/#!/settings/profile>{{ 'MY_PROFILE' | translate }}</a></li><li class=divider></li><li><a href=/#!/settings/password>{{ 'CHANGE_PASSWORD' | translate }}</a></li></ul></li><li><a href=/ ng-click=signout()>{{ 'SIGNOUT_TAB' | translate }}</a></li></ul></nav></div></section>");
  $templateCache.put("modules/forms/admin/views/admin-form.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><div class=container></div><section class=\"admin-form container\"><div class=page-header style=\"padding-bottom: 1em\"><div class=\"col-xs-10 col-sm-10 col-md-10 col-lg-10\" style=\"padding-left: 0px !important\"><h1 class=hidden-xs style=\"margin-bottom: 0px\" uib-tooltip=\"{{ myform.title }}\">{{ myform.title }}</h1><h2 class=\"hidden-sm hidden-md hidden-lg\" style=\"margin-bottom: 10px\" uib-tooltip=\"{{ myform.title }}\">{{ myform.title }}</h2></div><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\" style=\"padding-right: 0px !important\"><a class=\"btn btn-secondary view-form-btn\" href=\"{{actualFormURL + '/preview'}}\" ng-class=\"myform.form_fields.length? '' : 'disabled'\" target=_blank><i class=\"glyphicon glyphicon-eye-open\"></i> <span class=hidden-xs>&nbsp; {{ 'PREVIEW' | translate }}</span></a></div></div><div class=row><div class=col-xs-12><uib-tabset class=hidden-xs active=activePill type=pills vertical=true><uib-tab index=0><uib-tab-heading class=ng-scope>{{ 'CONFIGURE_TAB' | translate }}</uib-tab-heading><configure-form-directive myform=myform user=user></configure-form-directive></uib-tab><uib-tab index=1><uib-tab-heading class=ng-scope>{{ 'CREATE_TAB' | translate }}</uib-tab-heading><edit-form-directive myform=myform></edit-form-directive></uib-tab><uib-tab disable=!myform.form_fields.length index=2><uib-tab-heading class=ng-scope>{{ 'SHARE_TAB' | translate }}</uib-tab-heading><share-form-directive actualformurl=actualFormURL></share-form-directive></uib-tab></uib-tabset><uib-tabset class=\"hidden-sm hidden-md hidden-lg mobile-tabs\" active=activePill type=pills vertical=false><uib-tab index=0><uib-tab-heading><i class=\"glyphicon glyphicon-wrench\"></i></uib-tab-heading><configure-form-directive myform=myform user=user></configure-form-directive></uib-tab><uib-tab index=1><uib-tab-heading class=ng-scope><i class=\"glyphicon glyphicon-pencil\"></i></uib-tab-heading><edit-form-directive myform=myform></edit-form-directive></uib-tab><uib-tab disable=!myform.form_fields.length index=2><uib-tab-heading class=ng-scope><i class=\"glyphicon glyphicon-share\"></i></uib-tab-heading><share-form-directive actualformurl=actualFormURL></share-form-directive></uib-tab>--></uib-tabset></div></div></section>");
  $templateCache.put("modules/forms/admin/views/list-forms.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><section class=overlay ng-if=showCreateModal ng-click=closeCreateModal()></section><script type=text/ng-template id=deleteModalListForms.html><div class=\"modal-header\">\n" +
    "		<h2 class=\"modal-title hidden-md hidden-lg\">{{ 'ARE_YOU_SURE' | translate }}</h2>\n" +
    "		<h3 class=\"modal-title hidden-xs hidden-sm\">{{ 'ARE_YOU_SURE' | translate }}</h3>\n" +
    "	</div>\n" +
    "	<div class=\"modal-body\">\n" +
    "		<div class=\"modal-body-alert\">\n" +
    "			{{ 'READ_WARNING' | translate }}\n" +
    "		</div>\n" +
    "		<p>\n" +
    "			{{ 'DELETE_WARNING1' | translate }}<strong>{{content.currFormTitle}}</strong>{{ 'DELETE_WARNING2' | translate }}\n" +
    "		</p>\n" +
    "		<p>{{ 'DELETE_CONFIRM' | translate }}</p>\n" +
    "	</div>\n" +
    "	<div class=\"modal-footer\">\n" +
    "		<input type=\"text\" style=\"width:100%\" data-ng-model=\"deleteConfirm\" class=\"input-block\" autofocus required aria-label=\"Type in the name of the form to confirm that you want to delete this form.\">\n" +
    "		<button type=\"submit\" ng-click=\"deleteForm()\" class=\"btn btn-block btn-danger\" ng-disabled=\"content.currFormTitle != deleteConfirm\">\n" +
    "			{{ 'I_UNDERSTAND' | translate }}\n" +
    "		</button>\n" +
    "	</div></script><section data-ng-controller=\"ListFormsController as ctrl\" data-ng-init=findAll() class=container><br><div class=row><div ng-click=openCreateModal() class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-1 form-item create-new\"><div class=\"title-row col-xs-12\"><h4 class=\"fa fa-plus fa-6\"></h4></div><div class=\"col-xs-12 details-row\"><small class=list-group-item-text>{{ 'CREATE_A_NEW_FORM' | translate }}</small></div></div><form name=forms.createForm class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-1 form-item create-new new-form\" ng-if=showCreateModal><div class=\"title-row row\"><div class=\"col-xs-12 field-title text-left\">{{ 'Form Name' | translate }}</div><div class=\"col-xs-12 field-input\"><input name=title required ng-model=formTitle ng-pattern=\"/^[a-zA-Z0-9_\\-. ]*$/\" ng-minlength=4 ng-maxlength=200 maxlength=200 style=color:black></div></div><div class=\"details-row row\" ng-hide=true><div class=\"col-xs-5 field-title text-left\">{{ 'LANGUAGE' | translate }}</div><div class=\"col-xs-12 field-input\"><div class=\"button custom-select\"><select style=color:black name=language required ng-model=formLanguage ng-init=\"formLanguage = user.language\"><option ng-repeat=\"language in languages\" value={{language}}>{{language}}</option></select></div></div></div><div class=\"details-row submit row\"><div class=\"col-xs-12 field-title text-center\"><button class=\"btn btn-primary\" ng-disabled=forms.createForm.$invalid ng-click=createNewForm()>{{ 'CREATE_FORM' | translate }}</button></div></div></form><div data-ng-repeat=\"form in myforms\" class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-1 form-item container\" ng-class=\"{'paused': !form.isLive}\"><div class=\"row form-item-toolbar\"><span class=pull-right><i style=cursor:pointer class=\"fa fa-trash-o form-item-icon\" ng-click=openDeleteModal($index)></i> <i style=cursor:pointer class=\"fa fa-files-o form-item-icon\" ng-click=duplicateForm($index)></i></span></div><div class=row><a data-ng-href=#!/forms/{{form._id}}/admin/create class=\"title-row col-xs-12\"><h4 class=list-group-item-heading data-ng-bind=form.title uib-tooltip=\"{{ form.title }}\"></h4></a><div class=\"col-xs-12 inactive-row\" ng-if=!form.isLive><small class=list-group-item-text><span>{{ 'FORM_INACTIVE' | translate }}</span></small></div></div></div></div></section>");
  $templateCache.put("modules/forms/base/views/submit-form.client.view.html",
    "<section class=public-form ng-style=\"{ 'background-color': myform.design.colors.backgroundColor }\" ng-hide=\"!myform.isPreview && !myform.isLive\"><submit-form-directive myform=myform></submit-form-directive></section>");
  $templateCache.put("modules/forms/admin/views/adminTabs/analyze.html",
    "<edit-submissions-form-directive myform=myform user=user></edit-submissions-form-directive>");
  $templateCache.put("modules/forms/admin/views/adminTabs/configure.html",
    "<configure-form-directive myform=myform user=user></configure-form-directive>");
  $templateCache.put("modules/forms/admin/views/adminTabs/create.html",
    "<edit-form-directive myform=myform></edit-form-directive>");
  $templateCache.put("modules/forms/admin/views/directiveViews/form/configure-form.client.view.html",
    "<div class=\"config-form container\" ng-form=configureForm><div class=row><div class=\"col-sm-offset-2 col-sm-4\"><div class=\"row field\"><div class=\"field-title col-sm-12\"><h5>{{ 'FORM_NAME' | translate }}</h5></div><div class=col-sm-12><input class=form-control ng-model=myform.title ng-model-options=\"{ allowInvalid: true }\" value={{myform.title}} style=\"width: 100%\" ng-minlength=4 ng-maxlength=200 maxlength=200 ng-pattern=\"/^[a-zA-Z0-9_\\-. ]*$/\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-12\"><h5>{{ 'FORM_EMAIL' | translate }}</h5></div><div class=col-sm-12><input class=form-control placeholder=\"Comma-separated list of emails\" ng-model=myform.emails value={{myform.emails}} style=\"width: 100%\"></div></div></div><div class=\"col-sm-offset-1 col-sm-4\"><div class=\"row field\"><div class=\"field-title col-sm-12\"><h5>{{ 'FORM_STATUS' | translate }}</h5></div><div class=\"field-input col-sm-12\"><label style=\"display: inline-block\"><input type=radio data-ng-value=true ng-model=myform.isLive ng-required=true style=background-color:#33CC00> &nbsp;<span>{{ 'PUBLIC' | translate }}</span></label><label style=\"display: inline-block\"><input type=radio data-ng-value=false ng-model=myform.isLive ng-required=true> &nbsp;<span>{{ 'PRIVATE' | translate }}</span></label></div></div><div class=\"row field\"><div class=\"field-title col-sm-12\"><h5>{{ 'DISPLAY_START_PAGE' | translate }}</h5></div><div class=\"field-input col-sm-12\"><label style=\"display: inline-block\"><input type=radio data-ng-value=true ng-model=myform.startPage.showStart ng-required=true style=background-color:#33CC00> &nbsp;<span>{{ 'YES' | translate }}</span></label><label style=\"display: inline-block\"><input type=radio data-ng-value=false ng-model=myform.startPage.showStart ng-required=true> &nbsp;<span>{{ 'NO' | translate }}</span></label></div></div><div class=\"row field\"><div class=\"field-title col-sm-12\"><h5>{{ 'DISPLAY_END_PAGE' | translate }}</h5></div><div class=\"field-input col-sm-12\"><label style=\"display: inline-block\"><input type=radio data-ng-value=true ng-model=myform.endPage.showEnd ng-required=true style=background-color:#33CC00> &nbsp;<span>{{ 'YES' | translate }}</span></label><label style=\"display: inline-block\"><input type=radio data-ng-value=false ng-model=myform.endPage.showEnd ng-required=true> &nbsp;<span>{{ 'NO' | translate }}</span></label></div></div></div></div><div class=row><div class=\"col-xs-12 col-sm-offset-4 col-sm-4\"><button class=\"btn btn-signup btn-rounded\" type=button ng-disabled=\"configureForm.$invalid || myform.title.length === 0\" ng-click=\"update(false, myform, false, false, null)\"><i class=\"icon-arrow-left icon-white\"></i>{{ 'SAVE_CHANGES' | translate }}</button> <button class=\"btn btn-secondary btn-rounded\" type=button ng-click=resetForm()><i class=\"icon-eye-open icon-white\"></i>{{ 'RESET' | translate }}</button></div></div></div>");
  $templateCache.put("modules/forms/admin/views/directiveViews/form/edit-form.client.view.html",
    "<form name=editForm><script type=text/ng-template id=editEndPageModal.html class=edit-endpage-modal><div class=\"modal-body\">\n" +
    "			<div class=\"row\">\n" +
    "				<div class=\"edit-panel col-md-6 col-xs-12 col-sm-12 container\">\n" +
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
    "				<div class=\"preview-field-panel col-md-6 hidden-sm hidden-xs container\">\n" +
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
    "				<div class=\"edit-panel col-md-6 col-xs-12 col-sm-12 container\">\n" +
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
    "				<div class=\"preview-field-panel col-md-6 hidden-sm hidden-xs container\">\n" +
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
    "				<div class=\"edit-panel col-md-6 col-xs-12 col-sm-12 container\">\n" +
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
    "					<div class=\"row\"><br></div>\n" +
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
    "					<div class=\"row\" ng-show=\"showAddOptions(field)\"><br></div>\n" +
    "					<div class=\"row\" ng-if=\"showAddOptions(field)\">\n" +
    "						<div class=\"col-md-4 col-xs-12 field-title\">{{ 'OPTIONS' | translate }}</div>\n" +
    "						<div class=\"col-md-8 col-xs-12 field-input\">\n" +
    "							<div ng-if=\"field.fieldType === 'dropdown'\" class=\"row optionFrom\">\n" +
    "								<label class=\"col-md-6 col-xs-6\">\n" +
    "									<input type=\"radio\" data-ng-value=\"false\" ng-model=\"field.fieldOptionsFromFile\"  ng-required=\"true\" checked/>\n" +
    "									<span>{{ 'ADD_OPTIONS_MANUAL' | translate }}</span>\n" +
    "								</label>\n" +
    "								<label class=\"col-md-6 col-xs-6\">\n" +
    "									<input type=\"radio\" data-ng-value=\"true\" ng-model=\"field.fieldOptionsFromFile\"  ng-required=\"true\" />\n" +
    "									<span>{{ 'ADD_OPTIONS_FILE' | translate }}</span>\n" +
    "								</label>\n" +
    "							</div>\n" +
    "							<div ng-if=\"!field.fieldOptionsFromFile\" class=\"option-panel\">\n" +
    "								<div ng-repeat=\"option in field.manualOptions track by $index\" class=\"option\">\n" +
    "									<a class=\"btn btn-danger btn-mini\" type=\"button\" ng-click=\"deleteOption(field, option)\">\n" +
    "										<i class=\"fa fa-trash-o\"></i>\n" +
    "									</a>\n" +
    "									<span><input type=\"text\" name=\"{{option}}{{field._id}}\" ng-model=\"field.manualOptions[$index]\"></span>\n" +
    "								</div>\n" +
    "								<div>\n" +
    "									<button class=\"btn btn-primary btn-small col-md-offset-0 col-md-6 col-sm-4 col-sm-offset-4 col-xs-6 col-xs-offset-6\" type=\"button\" ng-click=\"addOption(field)\">\n" +
    "										<i class=\"icon-plus icon-white\"></i>\n" +
    "										{{ 'ADD' | translate }}\n" +
    "									</button>\n" +
    "								</div>\n" +
    "							</div>\n" +
    "							<div ng-if=\"field.fieldOptionsFromFile\" class=\"option-panel\">\n" +
    "								<div>\n" +
    "									<label type=\"button\" class=\"btn btn-primary btn-small\">\n" +
    "										<span>{{ 'BROWSE' | translate }}</span>\n" +
    "										<input type=\"file\" on-file-select=\"loadOptions(currField, files)\" curr-field=\"field\"/>\n" +
    "									</label>\n" +
    "									<span><input type=\"text\" ng-model=\"field.fieldOptionsFile\" placeholder=\"{{ 'SELECT_OPTION_FILE' | translate }}\" disabled></span>\n" +
    "								</div>\n" +
    "								<div ng-if=\"field.loadProgress >= 0\">\n" +
    "									<uib-progressbar class=\"load-file-progress progress-striped active\" max=\"100\" value=\"field.loadProgress\" type=\"info\">{{ field.loadProgress == 100? field.fileOptions.length + ' UNIQUE options loaded' : '' }}</uib-progressbar>\n" +
    "								</div>\n" +
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
    "<!--\n" +
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
    "-->\n" +
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
    "				<div class=\"preview-field-panel col-md-6 hidden-sm hidden-xs container\">\n" +
    "					<form class=\"public-form\"ss>\n" +
    "						<field-directive field=\"field\" validate=\"false\" class=\"preview-field\">\n" +
    "						</field-directive>\n" +
    "					</form>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "		</div></script><div class=\"col-xs-3 col-sm-4 add-field\"><div class=\"row add-field-title\"><h3 class=\"col-md-12 hidden-xs\">{{ 'ADD_FIELD_LG' | translate }}</h3></div><div class=\"panel-group row\" class=draggable ng-model=addField.types><div class=\"col-xs-12 col-sm-12 col-md-6\" ng-repeat=\"type in addField.types\" style=padding-top:7.5px><div class=\"panel panel-default\" style=background-color:#f5f5f5><div class=panel-heading ng-click=\"addNewField(false, type.name)\" style=\"cursor: pointer; font-size:12px\"><span><field-icon-directive type-name={{type.name}}></field-icon-directive></span><span class=hidden-xs style=padding-left:0.3em>{{type.value}}</span></div></div></div></div></div><div class=\"col-xs-9 col-sm-8 current-fields\"><div class=row ng-if=myform.startPage.showStart><div class=col-sm-12><div class=\"panel panel-default startPage\" ng-click=openEditStartPageModal()><div class=panel-heading><h4 class=text-center>{{ 'WELCOME_SCREEN' | translate }}</h4></div></div></div></div><div class=row><div ng-show=!myform.form_fields.length class=empty-form><img src=/static/modules/core/img/placeholder.svg></div><div class=\"col-lg-11 col-md-11 col-sm-10 col-xs-10 dropzoneContainer\" style=\"padding-right:0px !important\"><div class=\"panel-group dropzone\" ui-sortable=sortableOptions ng-model=myform.form_fields><div class=\"panel panel-default\" ng-repeat=\"field in myform.form_fields\" ng-if=!field.deletePreserved ng-click=openEditModal(field)><div class=panel-heading><div class=row><span class=\"hidden-xs col-md-1\" ng-switch=field.fieldType><field-icon-directive type-name={{field.fieldType}}></field-icon-directive></span><span class=\"col-xs-12 col-md-11\">{{field.title}} <span ng-show=field.required>*</span></span></div></div></div></div></div><div class=\"col-lg-1 col-md-1 col-sm-2 col-xs-2\" style=\"padding:0 5px\"><div class=\"panel-group tool-panel text-center\"><div class=\"panel panel-default\" ng-repeat=\"field in myform.form_fields track by field._id\" ng-if=!field.deletePreserved><div class=panel-heading style=\"padding: 10px 0px\" ng-click=deleteField($index)><span class=text-center><a href=\"\" class=\"fa fa-trash-o\"></a></span></div></div></div></div></div><div class=row ng-if=myform.endPage.showEnd><div class=col-sm-12><div class=\"panel panel-default startPage\" ng-click=openEditEndPageModal()><div class=panel-heading><h4 class=text-center>{{ 'END_SCREEN' | translate }}</h4></div></div></div></div></div></form>");
  $templateCache.put("modules/forms/admin/views/directiveViews/form/edit-submissions-form.client.view.html",
    "<div class=\"submissions-table container\"><div class=\"row table-tools\"><div class=col-xs-2><button class=\"btn btn-danger\" ng-click=deleteSelectedSubmissions() ng-disabled=!isAtLeastOneChecked();><i class=\"fa fa-trash-o\"></i> {{ 'DELETE_SELECTED' | translate }}</button></div><div class=\"col-xs-2 col-xs-offset-4 text-right\"><button class=\"btn btn-gray\" ng-click=\"exportSubmissions('xml')\"><small>{{ 'EXPORT_TO_EXCEL' | translate }}</small></button></div><div class=\"col-md-2 text-right\"><button class=\"btn btn-gray\" ng-click=\"exportSubmissions('csv')\"><small>{{ 'EXPORT_TO_CSV' | translate }}</small></button></div><div class=\"col-md-2 text-right\"><button class=\"btn btn-gray\" ng-click=\"exportSubmissions('json')\"><small>{{ 'EXPORT_TO_JSON' | translate }}</small></button></div></div><div class=\"row table-outer\"><div class=col-xs-12><table id=table-submission-data class=\"table table-striped table-hover table-condensed\"><thead><tr><th><input ng-model=table.masterChecker ng-change=toggleAllCheckers() type=checkbox></th><th>#</th><th data-ng-repeat=\"(key, value) in myform.form_fields\">{{value.title}}</th><th>{{ 'DATE_SUBMITTED' | translate }} (UTC)</th></tr></thead><tbody><tr data-ng-repeat=\"row in table.rows\" ng-click=rowClicked($index) ng-class=\"{selected: row.selected === true}\"><td><input ng-model=row.selected type=checkbox></td><th class=scope>{{$index+1}}</th><td data-ng-repeat=\"field in row.form_fields\">{{field.fieldValue}}</td><td>{{row.created | date:'yyyy-MM-dd HH:mm:ss'}}</td></tr></tbody></table></div></div></div>");
  $templateCache.put("modules/forms/admin/views/directiveViews/form/preview-form.client.view.html",
    "<div class=\"config-form design container\"><div class=row><div class=\"col-md-4 col-sm-12 container design-spec\"><div class=\"row field\"><div class=\"field-title col-sm-5\"><h5>{{ 'BACKGROUND_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-6\"><input class=form-control colorpicker=hex ng-model=myform.design.colors.backgroundColor ng-style=\"{ 'background-color': myform.design.colors.backgroundColor }\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-5\"><h5>{{ 'QUESTION_TEXT_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-6\"><input class=form-control colorpicker=hex ng-model=myform.design.colors.questionColor ng-style=\"{ 'background-color': myform.design.colors.questionColor }\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-5\"><h5>{{ 'ANSWER_TEXT_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-6\"><input class=form-control colorpicker=hex ng-model=myform.design.colors.answerColor ng-style=\"{ 'background-color': myform.design.colors.answerColor }\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-5\"><h5>{{ 'BTN_BACKGROUND_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-6\"><input class=form-control colorpicker=hex ng-model=myform.design.colors.buttonColor ng-style=\"{ 'background-color': myform.design.colors.buttonColor }\"></div></div><div class=\"row field\"><div class=\"field-title col-sm-5\"><h5>{{ 'BTN_TEXT_COLOR' | translate }}</h5></div><div class=\"field-input col-sm-6\"><input class=form-control colorpicker=hex ng-model=myform.design.colors.buttonTextColor ng-style=\"{ 'background-color': myform.design.colors.buttonTextColor }\"></div></div></div><div class=\"col-md-8 hide-md hide-lg\"><iframe id=iframe src=\"{{trustSrc(formURL + '/preview')}}\"></iframe></div><div class=\"col-xs-12 col-sm-offset-4 col-sm-4\"><button class=\"btn btn-signup btn-rounded\" type=button ng-click=\"update(false, myform, false, false, null)\">{{ 'SAVE_CHANGES' | translate }}</button> <button class=\"btn btn-secondary btn-rounded\" type=button ng-click=resetForm()>{{ 'RESET' | translate }}</button></div></div></div>");
  $templateCache.put("modules/forms/admin/views/directiveViews/form/share-form.client.view.html",
    "<div class=config-form><div class=row><div class=col-sm-12><h4>Share via:</h4><uib-tabset active=activePill type=pills class=horizontal-tabs><uib-tab index=0><uib-tab-heading><i class=\"glyphicon glyphicon-link\"></i> {{ 'SHARE_YOUR_FORM' | translate }}</uib-tab-heading><div class=row><h5 class=col-sm-12>{{ 'SHARE_URL_TEXT' | translate }}</h5><div class=\"col-sm-12 form-input\"><input id=copyURL ng-value=actualFormURL class=\"form-control ng-pristine ng-untouched ng-valid\"></div><div class=\"col-sm-offset-5 col-sm-2\"><button class=\"btn btn-signup btn-rounded\" type=button ngclipboard data-clipboard-target=#copyURL><i class=\"icon-arrow-left icon-white\"></i>{{ 'COPY' | translate }}</button></div></div></uib-tab><uib-tab index=1><uib-tab-heading><i class=\"glyphicon glyphicon-globe\"></i> {{ 'EMBED_YOUR_FORM' | translate }}</uib-tab-heading><div class=row><h5 class=col-sm-12>{{ 'COPY_AND_PASTE' | translate }}</h5><div class=\"col-sm-12 form-input\"><textarea id=copyEmbedded class=\"form-control ng-pristine ng-untouched ng-valid\" style=\"min-height:200px; width:100%; background-color: #FFFFCC; color: #30313F\">\n" +
    "									&lt;!-- {{ 'CHANGE_WIDTH_AND_HEIGHT' | translate }} --&gt;\n" +
    "									<iframe id=iframe src={{actualFormURL}} style=width:100%;height:500px></iframe>\n" +
    "									<div style=\"font-family: Sans-Serif;font-size: 12px;color: #999;opacity: 0.5; padding-top: 5px\">{{ 'POWERED_BY' | translate }} <a href=https://www.form.sg style=\"color: #999\" target=_blank>Form.sg</a></div>\n" +
    "								</textarea></div><div class=\"col-sm-offset-5 col-sm-2\"><button class=\"btn btn-signup btn-rounded\" type=button ngclipboard data-clipboard-target=#copyEmbedded>{{ 'COPY' | translate }}</button></div></div></uib-tab></uib-tabset></div></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/entryPage/startPage.html",
    "<div class=\"field row text-center\"><div class=\"col-xs-12 text-center\"><h1>{{pageData.introTitle}}</h1></div><div class=\"col-xs-10 col-xs-offset-1 text-left\"><p style=color:#ddd>{{pageData.introParagraph}}</p></div></div><div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em\"><p ng-repeat=\"button in pageData.buttons\" class=text-center style=display:inline><button class=\"btn btn-info\" type=button ng-style=\"{'background-color':button.bgColor, 'color':button.color}\"><a href={{button.url}} style=\"font-size: 1.6em; text-decoration: none; color: inherit\">{{button.text}}</a></button></p></div><div class=\"row form-actions\"><p class=\"col-xs-3 col-xs-offset-3 text-center\"><button class=\"btn btn-info\" type=button><a ng-click=exitpageData() style=\"color:white; font-size: 1.6em; text-decoration: none\">{{ 'CONTINUE_FORM' | translate }}</a></button></p></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/date.html",
    "<div class=\"field row\" ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i> </small>{{field.title}} <span class=required-error ng-show=\"!field.required && !field.fieldValue\">{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><div class=\"control-group input-append\"><input class=focusOn readonly ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" ng-class=\"{ 'no-border': !!field.fieldValue }\" ui-date=dateOptions ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled ng-focus=\"setActiveField(field._id, index, true)\" on-tab-key=nextField() on-tab-and-shift-key=prevField() ng-change=$root.nextField()></div></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/dropdown.html",
    "<div class=\"field row dropdown\" ng-if=\"field.fieldOptions.length > 0\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i> </small>{{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><ui-select ng-model=field.fieldValue theme=selectize search-enabled=true ng-required=field.required ng-disabled=field.disabled on-tab-and-shift-key=prevField() on-tab-key=nextField() ng-change=$root.nextField()><ui-select-match class=public-form placeholder=\"{{ 'TYPE_OR_SELECT_OPTION' | translate }}\">{{ $select.selected }}</ui-select-match><ui-select-choices repeat=\"option in getFieldOptions() | filter: $select.search\"><span ng-bind-html=\"option | highlight: $select.search\"></span></ui-select-choices></ui-select></div></div><br>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/file.html",
    "<div class=\"field row\" ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i> </small>{{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3></div><div class=\"col-sm-8 field-input\"><div class=input-group><div tabindex=-1 class=\"form-control file-caption\"><span class=file-caption-ellipsis ng-if=!field.file>…</span><div class=file-caption-name ng-if=field.file>{{field.file.originalname}}</div></div><div class=input-group-btn><button type=button ng-if=field.file ng-click=removeFile(field); title=\"{{ 'CLEAR_SELECTED_FILES' | translate }}\" class=\"btn btn-danger fileinput-remove fileinput-remove-button\"><i class=\"glyphicon glyphicon-trash\"></i> {{ 'DELETE' | translate }}</button> <button type=button ng-if=field.fileLoading title=\"{{ 'ABORT_UPLOAD' | translate }}\" class=\"btn btn-default\" ng-click=cancelFileUpload(field)><i class=\"glyphicon glyphicon-ban-circle\"></i> {{ 'CANCEL' | translate }}</button><div class=\"btn btn-success btn-file\" ngf-select ngf-change=uploadPDF($files) ng-if=!field.file><i class=\"glyphicon glyphicon-upload\"></i> {{ UPLOAD_FILE | translate }}</div></div></div></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/hidden.html",
    "<input ng-focus=\"setActiveField(field._id, index, true)\" ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" type=hidden ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" value={{field.fieldValue}} ng-disabled=field.disabled>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/legal.html",
    "<div class=\"field row radio legal\" on-enter-or-tab-key=nextField() key-to-truthy key-char-truthy=y key-char-falsey=n field=field><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i> </small>{{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><br><p class=col-xs-12>{{field.description}}</p></div><div class=\"col-xs-12 field-input container\"><div class=row-fluid on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField()><label class=\"btn col-md-5 col-xs-12\" ng-class=\"{activeBtn: field.fieldValue == 'true'}\"><input class=focusOn ng-focus=\"setActiveField(field._id, index, true)\" ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" type=radio value=true ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled ng-change=$root.nextField()><div class=letter style=float:left>Y</div><span>{{ 'LEGAL_ACCEPT' | translate }}</span></label><label class=\"btn col-md-5 col-md-offset-1 col-xs-12\" ng-class=\"{activeBtn: field.fieldValue == 'false'}\"><input class=focusOn ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" type=radio value=false ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled ng-change=$root.nextField()><div class=letter style=float:left>N</div><span>{{ 'LEGAL_NO_ACCEPT' | translate }}</span></label></div></div></div><br>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/radio.html",
    "<div class=\"field row radio\" on-enter-or-tab-key=nextField() key-to-option field=field ng-if=\"field.fieldOptions.length > 0\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i> </small>{{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><div ng-repeat=\"option in field.fieldOptions\" class=row-fluid><label class=\"btn col-md-4 col-xs-12 col-sm-12\" style=\"margin: 0.5em; padding-left:30px\" ng-class=\"{activeBtn: field.fieldValue == field.fieldOptions[$index]}\"><div class=letter style=float:left>{{$index+1}}</div><input ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" style=visibility:hidden type=radio class=focusOn ng-focus=\"setActiveField(field._id, index, true)\" value={{option}} ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled ng-change=$root.nextField()> <span ng-bind=option style=\"white-space: normal\"></span></label></div></div></div><br>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/rating.html",
    "<div class=\"textfield field row\" on-enter-or-tab-key=nextField()><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i> </small>{{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><input-stars max={{field.ratingOptions.steps}} ng-init=\"field.fieldValue = 0\" on-shape-click=true on-star-click=$root.nextField() icon-full={{field.ratingOptions.shape}} icon-base=\"fa fa-3x\" icon-empty={{field.ratingOptions.shape}} ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-disabled=field.disabled on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() class=\"angular-input-stars focusOn\"></input-stars></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/statement.html",
    "<div class=\"statement field row\" on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() ng-focus=\"setActiveField(field._id, index, true)\"><div class=\"row field-title field-title\"><div class=col-xs-1><i class=\"fa fa-quote-left fa-1\"></i></div><h2 class=\"text-left col-xs-9\">{{field.title}}</h2><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"row field-title field-input\"><p class=col-xs-12 ng-if=field.description.length>{{field.description}}</p><br><div class=\"col-xs-offset-1 col-xs-11\"><button class=\"btn focusOn\" ng-style=\"{'font-size': '1.3em', 'background-color':design.colors.buttonColor, 'color':design.colors.buttonTextColor}\" ng-focused=\"setActiveField(field._id, index, true)\" ng-click=\"field.fieldValue='read';$root.nextField()\">{{ 'CONTINUE' | translate }}</button></div></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/textarea.html",
    "<div class=\"field row\" ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i> </small>{{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><textarea class=\"textarea focusOn\" type=text ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-class=\"{ 'no-border': !!field.fieldValue }\" value={{field.fieldValue}} ng-required=field.required ng-disabled=field.disabled ng-focus=\"setActiveField(field._id, index, true)\" on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() style=\"border: none; border-left: lightgrey dashed 2px\">\n" +
    "		</textarea></div></div><div><div class=\"btn btn-lg btn-default hidden-xs\" style=\"padding: 4px; margin-top:8px; background: rgba(255,255,255,0.5)\"><button ng-disabled=\"!field.fieldValue || forms.myForm.{{field.fieldType}}{{$index}}.$invalid\" ng-style=\"{'background-color':design.colors.buttonColor, 'color':design.colors.buttonTextColor}\" ng-click=$root.nextField() class=\"btn col-sm-5 col-xs-5\">{{ 'OK' | translate }} <i class=\"fa fa-check\"></i></button><div class=\"col-sm-3 col-xs-6\" style=margin-top:0.2em><small style=\"color:#ddd; font-size:70%\">{{ 'ENTER' | translate }}</small></div></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/textfield.html",
    "<div class=\"textfield field row\" ng-click=\"setActiveField(field._id, index, true)\"><div class=\"col-xs-12 field-title row-fluid\" ng-style=\"{'color': design.colors.questionColor}\"><h3 class=col-xs-12><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i> </small>{{field.title}} <span class=required-error ng-show=!field.required>({{ 'OPTIONAL' | translate }})</span></h3><p class=col-xs-12><small>{{field.description}}</small></p></div><div class=\"col-xs-12 field-input\"><input ng-style=\"{'color': design.colors.answerColor, 'border-color': design.colors.answerColor}\" name={{field.fieldType}}{{index}} type={{input_type}} ng-pattern=validateRegex placeholder={{placeholder}} ng-class=\"{ 'no-border': !!field.fieldValue }\" class=\"focusOn text-field-input\" ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" value=field.fieldValue ng-focus=\"setActiveField(field._id, index, true)\" on-enter-or-tab-key=nextField() on-tab-and-shift-key=prevField() ng-required=field.required ng-disabled=field.disabled aria-describedby=inputError2Status></div><div class=col-xs-12><div ng-show=\"forms.myForm.{{field.fieldType}}{{index}}.$invalid && !!forms.myForm.{{field.fieldType}}{{index}}.$viewValue \" class=\"alert alert-danger\" role=alert><span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=true></span> <span class=sr-only>Error:</span> <span ng-if=\"field.fieldType == 'email'\">{{ 'ERROR_EMAIL_INVALID' | translate }} </span><span ng-if=field.validateRegex>{{ 'ERROR_NOT_A_NUMBER' | translate }} </span><span ng-if=\"field.fieldType == 'link'\">{{ 'ERROR_URL_INVALID' | translate }}</span></div></div></div><div><div class=\"btn btn-lg btn-default col-xs-12 col-sm-4 hidden-xs\" style=\"padding: 4px; margin-top:8px; background: rgba(255,255,255,0.5)\"><button ng-disabled=\"!field.fieldValue || forms.myForm.{{field.fieldType}}{{$index}}.$invalid\" ng-style=\"{'background-color':design.colors.buttonColor, 'color':design.colors.buttonTextColor}\" ng-click=$root.nextField() class=\"btn col-sm-5 col-xs-5\">{{ 'OK' | translate }} <i class=\"fa fa-check\"></i></button><div class=\"col-xs-6 col-sm-3\" style=margin-top:0.2em><small style=\"color:#ddd; font-size:70%\">{{ 'ENTER' | translate }}</small></div></div></div>");
  $templateCache.put("modules/forms/base/views/directiveViews/field/yes_no.html",
    "<div class=\"field row radio\" ng-click=\"setActiveField(field._id, index, true)\" on-tab-and-shift-key=prevField() key-to-truthy key-char-truthy=y key-char-falsey=n field=field><div class=\"col-xs-12 field-title\" ng-style=\"{'color': design.colors.questionColor}\"><h3 class=row><small class=field-number>{{index+1}} <i class=\"fa fa-angle-double-right\" aria-hidden=true></i> </small>{{field.title}} <span class=required-error ng-show=!field.required>{{ 'OPTIONAL' | translate }}</span></h3><p class=row>{{field.description}}</p></div><div class=\"col-xs-12 field-input\"><div class=\"row col-xs-12\"><label class=\"btn btn-default\" style=\"background: rgba(0,0,0,0.1); text-align:left\"><input type=radio value=true class=focusOn style=\"opacity: 0; margin-left: 0px\" ng-model=field.fieldValue ng-focus=\"setActiveField(field._id, index, true)\" ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-change=$root.nextField() ng-disabled=field.disabled><div class=letter>{{ 'Y' | translate }}</div><span>{{ 'YES' | translate }}</span> <i ng-show=\"field.fieldValue === 'true'\" class=\"fa fa-check\" aria-hidden=true></i></label></div><div class=\"row col-xs-12\" style=\"margin-top: 10px\"><label class=\"btn btn-default\" style=\"background: rgba(0,0,0,0.1); text-align:left\"><input type=radio value=false style=\"opacity:0; margin-left:0px\" ng-model=field.fieldValue ng-model-options=\"{ debounce: 250 }\" ng-required=field.required ng-change=$root.nextField() ng-disabled=field.disabled><div class=letter>{{ 'N' | translate }}</div><span>{{ 'NO' | translate }}</span> <i ng-show=\"field.fieldValue === 'false'\" class=\"fa fa-check\" aria-hidden=true></i></label></div></div></div><br>");
  $templateCache.put("modules/forms/base/views/directiveViews/form/submit-form.client.view.html",
    "<section class=\"overlay submitform\" ng-if=\"loading || (!myform.submitted && !myform.startPage.showStart)\"></section><div ng-show=\"!myform.submitted && myform.startPage.showStart\" class=form-submitted style=\"padding-top: 35vh\"><div class=row><div class=\"col-xs-12 text-center\" style=\"overflow-wrap: break-word\"><h1 style=\"font-weight: 400; nont-size: 25px\">{{myform.startPage.introTitle}}</h1></div><div class=\"col-xs-10 col-xs-offset-1 text-center\" style=\"overflow-wrap: break-word\"><p style=\"color: grey; font-weight: 100; font-size: 16px\">{{myform.startPage.introParagraph}}</p></div></div><div class=\"row form-actions text-center\" style=\"padding: 5px 25px 5px 25px\"><button ng-click=exitStartPage() class=btn type=button ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\"><span style=\"font-size: 1.6em\">{{myform.startPage.introButtonText}}</span></button></div><div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em\"><p ng-repeat=\"button in myform.startPage.buttons\" class=text-center style=display:inline><button class=btn style=\"background-color:rgb(156, 226, 235)\" type=button ng-style=\"{'background-color':button.bgColor, 'color':button.color}\"><a href={{button.url}} style=\"font-size: 1.6em; text-decoration: none\" ng-style=\"{'color':button.color}\">{{button.text}}</a></button></p></div></div><div class=form-fields ng-show=\"!myform.submitted && !myform.startPage.showStart\" ng-style=\"{ 'border-color': myform.design.colors.buttonTextColor }\"><div class=row><form name=forms.myForm novalidate class=\"submission-form col-sm-12 col-md-offset-1 col-md-10\"><div ng-repeat=\"field in myform.form_fields\" ng-if=!field.deletePreserved data-index={{$index}} data-id={{field._id}} ng-class=\"{activeField: selected._id == field._id }\" class=\"row field-directive\"><field-directive field=field design=myform.design index=$index forms=forms></field-directive></div></form></div><div class=\"row form-actions\" id=submit_field ng-class=\"{activeField: selected._id == 'submit_field' }\" ng-style=\"{ 'background-color':myform.design.colors.buttonColor}\" style=\"border-top: 1px solid #ddd; margin-right: -13%; margin-left: -13%; margin-top: 30vh; height: 100vh\"><div class=\"col-xs-12 text-left\" style=\"background-color:#990000; color:white\" ng-if=forms.myForm.$invalid>{{ 'COMPLETING_NEEDED' | translate:translateAdvancementData }}</div><button ng-if=!forms.myForm.$invalid class=\"Button btn col-sm-2 col-xs-8 focusOn\" v-busy=loading v-busy-label=\"Please wait\" v-pressable ng-disabled=\"loading || forms.myForm.$invalid || myform.isPreview\" ng-click=submitForm() on-enter-key=submitForm() on-enter-key-disabled=\"loading || forms.myForm.$invalid\" ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" style=\"font-size: 1.6em; margin-left: 1em; margin-top: 1em\">{{ 'SUBMIT' | translate }}</button> <button ng-if=forms.myForm.$invalid class=\"Button btn col-sm-2 col-xs-8 focusOn\" ng-click=goToInvalid() on-enter-key=goToInvalid() on-enter-key-disabled=!forms.myForm.$invalid style=\"font-size: 1.6em; margin-left: 1em; margin-top: 1em; background-color:#990000; color:white\">{{ 'REVIEW' | translate }}</button><div class=\"col-sm-2 hidden-xs\" style=\"font-size: 75%; margin-top:3.25em\"><small>{{ 'ENTER' | translate }}</small></div></div><section ng-if=!myform.hideFooter class=\"navbar navbar-fixed-bottom\" ng-style=\"{ 'background-color':myform.design.colors.buttonColor, 'padding-top': '15px', 'border-top': '2px '+ myform.design.colors.buttonTextColor +' solid', 'color':myform.design.colors.buttonTextColor}\"><div class=container-fluid><div class=row><div class=\"col-sm-5 col-md-6 col-xs-12\" ng-show=!myform.submitted><p class=lead>{{ 'ADVANCEMENT' | translate:translateAdvancementData }}</p></div><div class=\"col-md-6 col-md-offset-0 col-sm-offset-2 col-sm-3 col-xs-12\"><div class=\"col-md-4 col-md-offset-2 hidden-sm hidden-xs\" ng-if=authentication.isAuthenticated()><a href=/#!/forms/{{myform._id}}/admin/create ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" class=btn>{{ 'EDIT_FORM' | translate }}</a></div><div class=\"col-md-4 col-sm-10 col-md-offset-0 col-sm-offset-2 col-xs-12\"><button class=\"btn btn-lg col-xs-6\" id=focusDownButton ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" ng-click=nextField() ng-disabled=\"selected.index > myform.form_fields.length-1\"><i class=\"fa fa-chevron-down\"></i></button> <button class=\"btn btn-lg col-xs-6\" id=focusUpButton ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\" ng-click=prevField() ng-disabled=\"selected.index == 0\"><i class=\"fa fa-chevron-up\"></i></button></div></div></div></div></section></div><div ng-if=\"myform.submitted && !loading && !myform.endPage.showEnd\" class=form-submitted ng-style=\"{'color':myform.design.colors.buttonTextColor}\" style=\"padding-top: 5vh\"><div class=\"field row text-center\"><div class=\"col-xs-12 col-sm-12 col-md-6 col-md-offset-3 text-center\">{{ 'FORM_SUCCESS' | translate }}</div></div><div class=\"row form-actions\"><p class=text-center><button ng-click=reloadForm() class=btn type=button ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\"><span style=\"font-size: 1.6em\">{{ 'BACK_TO_FORM' | translate }}</span></button></p></div></div><div ng-if=\"myform.submitted && !loading && myform.endPage.showEnd\" class=form-submitted ng-style=\"{'color':myform.design.colors.buttonTextColor}\" style=\"padding-top: 5vh\"><div class=row><div class=\"col-xs-12 text-center\" style=\"overflow-wrap: break-word\"><h1 style=\"font-weight: 400; nont-size: 25px\">{{myform.endPage.title}}</h1></div><div class=\"col-xs-10 col-xs-offset-1 text-center\" style=\"overflow-wrap: break-word\"><p style=\"color: grey; font-weight: 100; font-size: 16px\">{{myform.endPage.paragraph}}</p></div></div><div class=\"row form-actions text-center\" style=\"padding: 5px 25px 5px 25px\"><button ng-click=reloadForm() class=btn type=button ng-style=\"{'background-color':myform.design.colors.buttonColor, 'color':myform.design.colors.buttonTextColor}\"><span style=\"font-size: 1.6em\">{{myform.endPage.buttonText}}</span></button></div><div class=\"row form-actions\" style=\"padding-bottom:3em; padding-left: 1em; padding-right: 1em\"><p ng-repeat=\"button in myform.endPage.buttons\" class=text-center style=display:inline><button class=btn style=\"background-color:rgb(156, 226, 235)\" type=button ng-style=\"{'background-color':button.bgColor, 'color':button.color}\"><a href={{button.url}} style=\"font-size: 1.6em; text-decoration: none\" ng-style=\"{'color':button.color}\">{{button.text}}</a></button></p></div></div>");
  $templateCache.put("modules/users/views/authentication/access-denied.client.view.html",
    "<section class=\"text-center auth\"><h3 class=col-md-12>{{ 'ACCESS_DENIED_TEXT' | translate }}</h3><a href=/#!/sigin class=col-md-12>{{ 'SIGNIN_BTN' | translate }}</a></section>");
  $templateCache.put("modules/users/views/authentication/signin.client.view.html",
    "<section class=\"auth sigin-view valign-wrapper\" data-ng-controller=AuthenticationController><div class=valign><div class=\"col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 authen-wrapper\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo-full.svg height=100px></div><div class=col-md-12><form class=\"signin form-horizontal\" autocomplete=off><fieldset><div data-ng-show=error class=\"text-center text-danger\">Error: <strong data-ng-bind=error></strong></div><div class=form-group><label for=username>{{ 'EMAIL_LABEL' | translate }}</label><input id=username name=username class=form-control data-ng-model=credentials.username ng-minlength=4></div><div class=form-group><label for=password>{{ 'PASSWORD_LABEL' | translate }}</label><input type=password id=password name=password class=form-control data-ng-model=credentials.password ng-minlength=4></div><div class=form-group><button class=\"btn btn-signup btn-rounded btn-block\" ng-click=signin()>{{ 'SIGNIN_BTN' | translate }}</button></div><div class=\"text-center forgot-password\"><a ui-sref=forgot>{{ 'FORGOT_PASSWORD_LINK' | translate }}</a></div></fieldset></form></div><div class=\"text-center forgot-password col-md-12\"><a ui-sref=signup>{{ 'SIGNUP_ACCOUNT_LINK' | translate }}</a></div></div></div></section>");
  $templateCache.put("modules/users/views/authentication/signup-success.client.view.html",
    "<section class=\"auth signup-view success\" data-ng-controller=AuthenticationController><h3 class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6 text-center\">{{ 'SUCCESS_HEADER' | translate }}</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6\"><h2>{{ 'SUCCESS_TEXT' | translate }}<br><br>{{ 'NOT_ACTIVATED_YET' | translate }}</h2><br><br><p><strong>{{ 'BEFORE_YOU_CONTINUE' | translate }}</strong> <a href=mail:leonard@data.gov.sg>leonard@data.gov.sg</a></p><div class=\"text-center form-group\"><button type=submit class=\"btn btn-primary btn-rounded\"><a href=/#!/ style=\"color: white; text-decoration: none\">{{ 'CONTINUE' | translate }}</a></button></div></div></section>");
  $templateCache.put("modules/users/views/authentication/signup.client.view.html",
    "<section class=\"auth signup-view valign-wrapper\" data-ng-controller=AuthenticationController ng-init=getAgencies()><div class=valign><div class=\"col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 authen-wrapper\"><div class=\"col-md-12 text-center vcenter\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo-full.svg height=100px></div><div class=col-xs-12><form ng-if=agencies name=userForm data-ng-submit=signup() class=\"signin form-horizontal\" autocomplete=off><fieldset><div data-ng-show=error id=signup_errors class=\"text-center text-danger\">{{'SIGNUP_ERROR_TEXT' | translate}}:<br><strong data-ng-bind=error></strong></div><div class=form-group><label for=agency>{{ 'AGENCY_LABEL' | translate }}</label><ui-select class=form-control ng-model=credentials.agency theme=selectize search-enabled=true ng-required=true ng-change=\"credentials.emailDomain = ''\"><ui-select-match class=public-form placeholder=\"{{ 'TYPE_OR_SELECT_AGENCY' | translate }}\">{{ $select.selected.fullName }}</ui-select-match><ui-select-choices repeat=\"agency in (agencies | filter: $select.search) track by agency._id\"><span ng-bind-html=\"agency.fullName | highlight: $select.search\"></span></ui-select-choices></ui-select></div><div class=\"form-group email\"><div class=\"col-md-6 col-xs-6 email-name\"><label for=email>{{ 'EMAIL_LABEL' | translate }}</label><input id=email name=email class=form-control ng-model=credentials.emailName pattern=[A-Za-z0-9-_.]+ title=\"Special characters are not allowed.\" ng-required=true></div><div class=\"col-md-6 col-xs-6\"><div class=\"input-group email-domain\"><div class=input-group-addon>@</div><ui-select class=form-control ng-model=credentials.emailDomain theme=selectize search-enabled=false ng-required=true ng-disabled=!credentials.agency><ui-select-match class=public-form>{{ $select.selected }}</ui-select-match><ui-select-choices repeat=\"emailDomain in credentials.agency.emailDomain\"><span ng-bind-html=emailDomain></span></ui-select-choices></ui-select></div></div></div><div class=form-group><label for=password>{{ 'PASSWORD_LABEL' | translate }}</label><input type=password id=password name=password class=form-control ng-model=credentials.password ng-minlength=4 ng-required=true></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-signup btn-rounded btn-block\" ng-click=preProcessForm()>{{ 'SIGNUP_BTN' | translate }}</button></div></fieldset></form><div class=\"text-center forgot-password\"><a ui-sref=signin>{{ 'SIGN_IN_ACCOUNT_LINK' | translate }}</a></div></div></div></div></section>");
  $templateCache.put("modules/users/views/password/forgot-password.client.view.html",
    "<section class=\"auth valign-wrapper\" data-ng-controller=PasswordController><div class=valign><div class=\"col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 authen-wrapper\"><div class=col-md-12><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo-full.svg height=100px></div><div class=col-md-12><form data-ng-submit=askForPasswordReset() autocomplete=off><fieldset><div class=form-group><input id=username name=username class=form-control data-ng-model=credentials.username placeholder=\"{{ 'USERNAME_OR_EMAIL_LABEL' | translate }}\"></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-signup btn-rounded btn-block\">{{ 'PASSWORD_RESTORE_HEADER' | translate }}</button></div><div data-ng-show=error class=\"text-center text-danger\"><strong>{{error}}</strong></div><div data-ng-show=success class=\"text-center text-success\"><strong>{{success}}</strong></div></fieldset></form></div></div></div></div></section>");
  $templateCache.put("modules/users/views/password/reset-password-invalid.client.view.html",
    "<section class=\"row text-center\"><h3 class=col-md-12>{{ 'PASSWORD_RESET_INVALID' | translate }}</h3><a href=/#!/password/forgot class=col-md-12>{{ 'ASK_FOR_NEW_PASSWORD' | translate }}</a></section>");
  $templateCache.put("modules/users/views/password/reset-password-success.client.view.html",
    "<section class=\"row text-center\"><h3 class=col-md-12>{{ 'PASSWORD_RESET_SUCCESS' | translate }}</h3><a href=/#!/ class=col-md-12>{{ 'CONTINUE_TO_LOGIN' | translate }}</a></section>");
  $templateCache.put("modules/users/views/password/reset-password.client.view.html",
    "<section class=\"row auth\" data-ng-controller=PasswordController><h3 class=\"col-md-12 text-center\">{{ 'RESET_PASSWORD' | translate }}</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6\"><form data-ng-submit=resetUserPassword() class=\"signin form-horizontal\" autocomplete=off><fieldset><div class=form-group><label for=newPassword>{{ 'NEW_PASSWORD_LABEL' | translate }}</label><input type=password id=newPassword name=newPassword class=form-control data-ng-model=passwordDetails.newPassword placeholder=\"{{ 'NEW_PASSWORD_LABEL' | translate }}\"></div><div class=form-group><label for=verifyPassword>{{ 'VERIFY_PASSWORD_LABEL' | translate }}</label><input type=password id=verifyPassword name=verifyPassword class=form-control data-ng-model=passwordDetails.verifyPassword placeholder=\"{{ 'VERIFY_PASSWORD_LABEL' | translate }}\"></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-large btn-primary\">{{ 'UPDATE_PASSWORD_LABEL' | translate }}</button></div><div data-ng-show=error class=\"text-center text-danger\"><strong>{{error}}</strong></div><div data-ng-show=success class=\"text-center text-success\"><strong>{{success}}</strong></div></fieldset></form></div></section>");
  $templateCache.put("modules/users/views/settings/change-password.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><section class=row data-ng-controller=SettingsController><h3 class=\"col-md-12 text-center\">{{ 'CHANGE_PASSWORD' | translate }}</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6\"><form data-ng-submit=changeUserPassword() class=\"signin form-horizontal\" autocomplete=off><fieldset><div class=form-group><label for=currentPassword>{{ 'CURRENT_PASSWORD_LABEL' | translate }}</label><input type=password id=currentPassword name=currentPassword class=form-control data-ng-model=passwordDetails.currentPassword placeholder=\"{{ 'CURRENT_PASSWORD_LABEL' | translate }}\"></div><hr><div class=form-group><label for=newPassword>{{ 'NEW_PASSWORD_LABEL' | translate }}</label><input type=password id=newPassword name=newPassword class=form-control data-ng-model=passwordDetails.newPassword placeholder=\"{{ 'NEW_PASSWORD_LABEL' | translate }}\"></div><div class=form-group><label for=verifyPassword>{{ 'VERIFY_PASSWORD_LABEL' | translate }}</label><input type=password id=verifyPassword name=verifyPassword class=form-control data-ng-model=passwordDetails.verifyPassword placeholder=\"{{ 'VERIFY_PASSWORD_LABEL' | translate }}\"></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-large btn-primary\">{{ 'SAVE_PASSWORD_BTN' | translate }}</button></div><div data-ng-show=success class=\"text-center text-success\"><strong>{{ 'PASSWORD_CHANGE_SUCCESS' | translate }}</strong></div><div data-ng-show=error class=\"text-center text-danger\"><strong data-ng-bind=error></strong></div></fieldset></form></div></section>");
  $templateCache.put("modules/users/views/settings/edit-profile.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><section class=\"row valign\" data-ng-controller=SettingsController><h3 class=\"col-md-12 text-center\">{{ 'MY_PROFILE' | translate }}</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6\"><form name=userForm data-ng-submit=updateUserProfile(userForm.$valid) class=\"signin form-horizontal\" autocomplete=off><fieldset><div class=form-group><label for=email>{{ 'EMAIL_LABEL' | translate }}</label><input type=email id=email name=email class=form-control ng-model=user.email readonly></div><div class=form-group><label for=agency>{{ 'AGENCY_LABEL' | translate }}</label><input id=agency name=agency class=form-control ng-model=user.agency.fullName readonly></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-signup btn-rounded\" disabled>{{ 'SAVE_CHANGES' | translate }}</button> <button type=none ng-click=cancel() class=\"btn btn-rounded\" disabled>{{ 'CANCEL_BTN' | translate }}</button></div></fieldset></form></div></section>");
  $templateCache.put("modules/users/views/settings/social-accounts.client.view.html",
    "<header data-ng-include=\"'/static/modules/core/views/header.client.view.html'\"></header><section class=row data-ng-controller=SettingsController><h3 class=\"col-md-12 text-center\" data-ng-show=hasConnectedAdditionalSocialAccounts()>{{ 'CONNECTED_SOCIAL_ACCOUNTS' | translate }}:</h3><div class=\"col-md-12 text-center\"><div data-ng-repeat=\"(providerName, providerData) in user.additionalProvidersData\" class=remove-account-container><img ng-src=/modules/users/img/buttons/{{providerName}}.png> <a class=\"btn btn-danger btn-remove-account\" data-ng-click=removeUserSocialAccount(providerName)><i class=\"glyphicon glyphicon-trash\"></i></a></div></div><h3 class=\"col-md-12 text-center\">{{ 'CONNECT_OTHER_SOCIAL_ACCOUNTS' | translate }}</h3><div class=\"col-md-12 text-center\"><a href=/auth/facebook data-ng-hide=\"isConnectedSocialAccount('facebook')\" class=undecorated-link><img src=/modules/users/img/buttons/facebook.png> </a><a href=/auth/twitter data-ng-hide=\"isConnectedSocialAccount('twitter')\" class=undecorated-link><img src=/modules/users/img/buttons/twitter.png> </a><a href=/auth/google data-ng-hide=\"isConnectedSocialAccount('google')\" class=undecorated-link><img src=/modules/users/img/buttons/google.png> </a><a href=/auth/linkedin data-ng-hide=\"isConnectedSocialAccount('linkedin')\" class=undecorated-link><img src=/modules/users/img/buttons/linkedin.png> </a><a href=/auth/github data-ng-hide=\"isConnectedSocialAccount('github')\" class=undecorated-link><img src=/modules/users/img/buttons/github.png></a></div></section>");
  $templateCache.put("modules/users/views/verify/resend-verify-email.client.view.html",
    "<section class=\"auth valign-wrapper\" data-ng-controller=VerifyController><section class=\"row valign\" ng-if=!isResetSent><div class=\"col-md-4 col-md-offset-4\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo_white.svg height=100px></div><div data-ng-show=error class=\"text-center text-danger\"><strong>{{error}}</strong></div><div class=col-md-12><form data-ng-submit=resendVerifyEmail() class=\"signin form-horizontal\" autocomplete=off><fieldset><div class=form-group><input id=email name=email class=form-control data-ng-model=credentials.email placeholder=\"{{ 'ENTER_ACCOUNT_EMAIL' | translate}}\"></div><div class=\"text-center form-group\"><button type=submit class=\"btn btn-signup btn-rounded btn-block\" ng-click=resendVerifyEmail()>{{ 'RESEND_VERIFICATION_EMAIL' | translate }}</button></div></fieldset></form></div></div></section><section class=\"row valign\" ng-if=isResetSent><div class=\"col-md-4 col-md-offset-4\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo_white.svg height=100px></div><h3 class=\"col-md-12 text-center\">{{ 'VERIFICATION_EMAIL_SENT' | translate }}</h3><div class=col-md-12><h2>{{ 'VERIFICATION_EMAIL_SENT_TO' | translate }} {{username}}.<br>{{ 'NOT_ACTIVATED_YET' | translate }}</h2><p>{{ 'CHECK_YOUR_EMAIL' | translate }} <a href=mail:polydaic@gmail.com>polydaic@gmail.com</a></p><div class=\"text-center form-group\"><button type=submit class=\"btn btn-large btn-primary btn-rounded\"><a href=/#!/ style=color:white>{{ 'CONTINUE' | translate }}</a></button></div></div></div></section></section>");
  $templateCache.put("modules/users/views/verify/verify-account.client.view.html",
    "<section class=auth data-ng-controller=VerifyController ng-init=validateVerifyToken()><section class=\"row text-center\" ng-if=isResetSent><div class=\"col-md-4 col-md-offset-4\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo-inverse.svg height=100px></div><h3 class=col-md-12>{{ 'VERIFY_SUCCESS' | translate }}</h3><div class=col-md-12><a href=/#!/signin class=\"btn btn-signup btn-rounded btn-block\">{{ 'CONTINUE_TO_LOGIN' | translate }}</a></div></div></section><section class=\"row text-center\" ng-if=!isResetSent><div class=\"col-md-4 col-md-offset-4\"><div class=\"col-md-12 text-center\" style=\"padding-bottom: 50px\"><img src=/static/modules/core/img/logo-inverse.svg height=100px></div><h3 class=col-md-12>{{ 'VERIFY_ERROR' | translate }}</h3><div class=col-md-12><a href=/#!/verify class=\"btn btn-rounded btn-default\">{{ 'REVERIFY_ACCOUNT_LINK' | translate }}</a></div><div class=col-sm-12><a href=/#!/signin class=\"btn btn-rounded btn-primary\">{{ 'SIGNIN_BTN' | translate }}</a></div></div></section></section>");
}]);
