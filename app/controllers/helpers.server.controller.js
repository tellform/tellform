'use strict';

const constants = require('../libs/constants');

module.exports = {
	removeKeysFromDict: function(dict, keys){
		for(var i=0; i<keys.length; i++){
			var curr_key = keys[i];
			if( dict.hasOwnProperty(curr_key) ){
				delete dict[curr_key];
			}
		}
	},
	removeSensitiveModelData: function(type, object){
		switch(type){
			case 'private_form':
	            this.this.removeKeysFromDict(object, constants.privateFields[type]);
	            if(object.admin){
	            	this.removeKeysFromDict(object.admin, constants.privateFields.private_user);
	            }
	            break;

	        case 'public_form':
				this.removeKeysFromDict(object, constants.privateFields[type]);
				if(object.admin){
	            	this.removeKeysFromDict(object.admin, constants.privateFields.public_user);
	        	}
	            break;

	        default:
	        	if(constants.privateFields.hasOwnProperty(type)){
	        		this.removeKeysFromDict(object, constants.privateFields[type]);
	        	} 
	            break;
		}

		return object;
	}
};