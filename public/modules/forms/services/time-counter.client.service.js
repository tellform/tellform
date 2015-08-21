'use strict';

angular.module('forms').service('TimeCounter', [
	function(){
		var _startTime, _endTime, that=this;

		this.timeSpent = 0;

		this.startClock = function(){
			_startTime = Date.now();
			// console.log('Clock Started');
		};

		this.stopClock = function(){
			_endTime = Date.now();
			that.timeSpent = Math.abs(_endTime.valueOf() - _startTime.valueOf())/1000;
			// console.log('Clock Ended');
			return that.timeSpent;
		};

	}
]);