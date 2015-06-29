'use strict';

angular.module('forms').service('FormFields', [
	function() {
		this.fields = [
		    {
		        name : 'textfield',
		        value : 'Textfield'
		    },
		    {
		        name : 'email',
		        value : 'E-mail'
		    },
		    {
		        name : 'password',
		        value : 'Password'
		    },
		    {
		        name : 'radio',
		        value : 'Radio Buttons'
		    },
		    {
		        name : 'dropdown',
		        value : 'Dropdown List'
		    },
		    {
		        name : 'date',
		        value : 'Date'
		    },
		    {
		        name : 'textarea',
		        value : 'Text Area'
		    },
		    {
		        name : 'checkbox',
		        value : 'Checkbox'
		    },
		    {
		        name : 'hidden',
		        value : 'Hidden'
		    }
		];
	}
		
]);