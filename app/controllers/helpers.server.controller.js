'use strict';

const constants = require('../libs/constants');

module.exports = {
	removeSensitiveModelData: function(type, object){
		function removeKeysFromDict(dict, keys){
			for(var i=0; i<keys.length; i++){
				var curr_key = keys[i];
				if( dict.hasOwnProperty(curr_key) ){
					delete dict[curr_key];
				}
			}
		}

		switch(type){
			case 'private_form':
	            removeKeysFromDict(object, constants.privateFields[type]);
	            if(object.admin){
	            	removeKeysFromDict(object.admin, constants.privateFields.private_user);
	            }
	            break;

	        case 'public_form':
				removeKeysFromDict(object, constants.privateFields[type]);
				if(object.admin){
	            	removeKeysFromDict(object.admin, constants.privateFields.public_user);
	        	}
	            break;

	        default:
	        	if(constants.privateFields.hasOwnProperty(type)){
	        		removeKeysFromDict(object, constants.privateFields[type]);
	        	} 
	            break;
		}

		return object;
	}
};