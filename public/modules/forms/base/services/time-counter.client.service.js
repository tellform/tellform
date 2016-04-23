'use strict';

angular.module('forms').service('TimeCounter', [
	function(){
		var _startTime, _endTime, that=this;

		this.timeSpent = 0;

		this.restartClock = function(){
			_startTime = Date.now();
			_endTime = _startTime;
			// console.log('Clock Started');
		};

		this.stopClock = function(){
			if(_startTime){
				_endTime = Date.now();
				that.timeSpent = Math.abs(_endTime.valueOf() - _startTime.valueOf())/1000;
				// console.log('Clock Ended');
				return that.timeSpent;
			}else{
				return new Error('Clock has not been started');
			}
		};

		this.clockStarted = function(){
			return !!this._startTime;
		};

	}
]);