// 'use strict';
//
// angular.module('forms').filter('toFaIcon', ['FontAwesomeIcons',  '$timeout', function(FontAwesomeIcons, $timeout) {
// 	var data = null, // DATA RECEIVED ASYNCHRONOUSLY AND CACHED HERE
// 		serviceInvoked = false;
//
// 	var getRatingShape = function (fieldType, iconData) {
// 		var iconObj = {
// 			full: "",
// 			empty: ""
// 		};
// 		var supported_fields = [
// 			'Heart',
// 			'Star',
// 			'thumbs-up',
// 			'thumbs-down',
// 			'Circle',
// 			'Square',
// 			'Check Circle',
// 			'Smile Outlined',
// 			'Hourglass',
// 			'bell',
// 			'Paper Plane',
// 			'Comment',
// 			'Trash'
// 		];
// 		if (__indexOf.call(iconData.iconList, fieldType) >= 0) {
//
// 			iconObj.full = "fa-"+iconData.iconMap[fieldType];
// 			iconObj.empty = "fa-"+iconData.iconMap[fieldType]+"-o";
// 			if(fieldType == "thumbs-up" || fieldType == "thumbs-down"){
// 				iconObj.empty = "fa-"+iconData.iconMap[fieldType].split("-")[0]+"-o-"+iconData.iconMap[fieldType].split("-")[1];
// 			}else if(fieldType == "Smile Outlined"){
// 				iconObj.empty = "fa-frown-o";
// 			}
//
// 			return iconObj;
// 		} else {
// 			throw new Error("Error no shape of type: " + fieldType + " for rating input");
// 		}
// 	};
//
//
// 	var realFilter = function initialFilter(shapeType, isEmpty) {
// 		console.log('oldFilter');
// 		if(isEmpty) return "fa-star-o"; // PLACEHOLDER
// 		else return "fa-star";
// 	};
//
// 	// function filterStub(shapeType, isEmpty){
// 	// 	if( data === null ) {
// 	// 		if (!serviceInvoked) {
// 	// 			serviceInvoked = true;
// 	//$timeout(function () {
// 		FontAwesomeIcons.get().then(function (result) {
// 			data = result;
//
//
// 			realFilter = function newFilter(shapeType, isEmpty) {
// 				console.log('newFilter');
// 				var faData = getRatingShape(shapeType, data);
// 				if (isEmpty) return faData.empty;
// 				return faData.full;
// 			};
//
// 		}, function (err) {
// 			throw new Error("toShapeIcon Error: " + err.message || err);
// 		});
// 		/*realFilter = function newFilter(shapeType, isEmpty) {
// 			console.log('newFilter');
// 			if(isEmpty) return "fa-heart-o"; // PLACEHOLDER
// 			else return "fa-heart";
// 		}*/
// 	//}, 1000);
// 	// 		}
// 	// 		return "-";
// 	// 		//if(isEmpty) return "fa-star-o"; // PLACEHOLDER
// 	// 		//else return "fa-star";
// 	// 	} else return realFilter(shapeType, isEmpty);
// 	// }
// 	// filterStub.$stateful = true;
// 	// return filterStub;
//
// 	 function tempFilter(shapeType, isEmpty) {
// 		return realFilter(shapeType, isEmpty);
// 	 }
// 	tempFilter.$stateful = true;
//
// 	return tempFilter;
//
// }]);
