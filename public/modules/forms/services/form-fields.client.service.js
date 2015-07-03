'use strict';

angular.module('forms').service('FormFields', [
	function() {
		this.fields = [
		    {
		        name : 'textfield',
		        value : 'Short Text'
		    },
		    {
		        name : 'email',
		        value : 'E-mail'
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
		        value : 'Long Text'
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