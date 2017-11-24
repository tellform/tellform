'use strict';

const constants = require('../libs/constants');
const _ = require('lodash');

module.exports = {
	removeKeysFromDict: function(dict, keys){
		for(var i=0; i<keys.length; i++){
			var curr_key = keys[i];
			if( dict.hasOwnProperty(curr_key) ){
				delete dict[curr_key];
			}
		}
		return dict;
	},
	removeSensitiveModelData: function(type, actual_object){
		var object = _.cloneDeep(actual_object);

		if(constants.privateFields.hasOwnProperty(type)) {
	        object = this.removeKeysFromDict(object, constants.privateFields[type]);
	    }
        if(object.admin){
        	object.admin = this.removeKeysFromDict(object.admin, constants.privateFields.private_user);
        }
		debugger;

		return object;
	}
};