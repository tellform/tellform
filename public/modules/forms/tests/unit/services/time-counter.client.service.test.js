'use strict';

(function() {
    // Forms Controller Spec
    describe('TimeCounter Service Tests', function() {
        // Initialize global variables
        var TimeCounter;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(inject(function (_TimeCounter_) {
		    TimeCounter = _TimeCounter_;
		 }));


        it('should be able to time 1 second interval as 1 second', function() {
            var timeSpent = 0;
        	TimeCounter.restartClock();

            setTimeout(function(){
                timeSpent = TimeCounter.stopClock();
                expect(timeSpent).toEqual(1);
            },1000);

        });
    });
}());