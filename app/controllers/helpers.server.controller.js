'use strict';

module.exports = {
	removeSensitiveModelData: function(type, object){
		var privateFields = {
			'public_form': ['__v', 'analytics.visitors', 'analytics.views', 'analytics.conversionRate', 'analytics.fields', 'lastModified', 'created'],
			'private_form': ['__v'],
			'public_user': ['passwordHash', 'password', 'provider', 'salt', 'lastModified', 'created', 'resetPasswordToken', 'resetPasswordExpires', 'token', 'apiKey', '__v'],
			'private_user': ['passwordHash', 'password', 'provider', 'salt', 'resetPasswordToken', 'resetPasswordExpires', 'token', '__v']
		};

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
	            removeKeysFromDict(object, privateFields[type]);
	            if(object.admin){
	            	removeKeysFromDict(object.admin, privateFields.private_user);
	            }
	            break;

	        case 'public_form':
				removeKeysFromDict(object, privateFields[type]);
				if(object.admin){
	            	removeKeysFromDict(object.admin, privateFields.public_user);
	        	}
	            break;

	        default:
	        	if(privateFields.hasOwnProperty(type)){
	        		removeKeysFromDict(object, privateFields[type]);
	        	} 
	            break;
		}

		return object;
	}
};