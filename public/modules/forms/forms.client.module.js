'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('forms', [
	'ngFileUpload', 'ui.date', 'ui.sortable',
	'angular-input-stars', 'users', 'ngclipboard',
	'frapontillo.bootstrap-switch', 'ngQuill'
]);//, 'colorpicker.module' @TODO reactivate this module
