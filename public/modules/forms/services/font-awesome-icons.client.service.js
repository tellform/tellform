// 'use strict';
//
// //Font-awesome-icon service used for fetching and mapping icon class names
// angular.module('forms').service('FontAwesomeIcons', ['$http', '$q',
// 	function($http, $q){
//
// 		var iconData = {};
// 		this.get = function(callback){
//
// 			var deferred = $q.defer();
//
// 			//Fetch icon list from font-awesome repo
// 			$http.get('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/gh-pages/icons.yml').then(function (response) {
// 				var parsedData = jsyaml.load(response.data);
//
// 				var parsedIconData = {
// 					iconMap: {},
// 					iconList: [],
// 					iconCategoryList: []
// 				};
//
// 				var icons = parsedData.icons;
//
// 				for (var i = 0; i < icons.length; i++) {
// 					parsedIconData.iconMap[icons[i].name] = icons[i].id;
// 					parsedIconData.iconList.push(icons[i].name);
//
// 					for (var x = 0; x < icons[i].categories.length; x++) {
// 						if (!parsedIconData.iconCategoryList[icons[i].categories[x]]) parsedIconData.iconCategoryList[icons[i].categories[x]] = [];
// 						parsedIconData.iconCategoryList[icons[i].categories[x]].push(icons[i].name);
// 					}
// 				}
//
// 				deferred.resolve(parsedIconData);
// 			},
// 			//Error Callback Function
// 			function(data){
// 				var error = response.data || "Request failed";
// 				deferred.reject(error);
// 			});
//
// 			return deferred.promise;
// 		}
//
// 	}
// ]);
