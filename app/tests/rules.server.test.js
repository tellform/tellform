var RuleEngine = require('node-rules'),
    should = require('should'),
    rules = require('../../docs/Node-Rules/rules.logic-jump');

describe('Logic-Jump Rules Tests', function() {


    describe('StringRules', function(){
        describe('Contains Rule', function(){
            it('should be TRUTHY if right IS a substring of left', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.StringRules.Contains);

                //sample fact to run the rules on   
                var fact = {
                    left:"userblahblahnamenaoeuaoe",
                    right:"user",
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(true);
                    done();
                });
            }); 
            it('should be FALSEY if right IS NOT a substring of left', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.StringRules.Contains);

                //sample fact to run the rules on   
                var fact = {
                    left:"userblahblahnamenaoeuaoe",
                    right:"user1",
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(false);
                    done();
                });
            });  
        });
        
        describe('NotContains Rule', function(){
            it('should be TRUTHY if right IS NOT a substring of left', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.StringRules.NotContains);

                //sample fact to run the rules on   
                var fact = {
                    "left":"userblahblahnamenaoeuaoe",
                    "right":"user1oe",
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(true);
                    done();
                });
            }); 
            it('should be FALSEY if right IS a substring of left', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.StringRules.NotContains);

                //sample fact to run the rules on   
                var fact = {
                    "left":"userblahblahnamenaoeuaoe",
                    "right":"user",
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(false);
                    done();
                });
            });
        });

        describe('BeginsWith Rule', function(){
            it('should be TRUTHY if Left string DOES begin with Right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.StringRules.BeginsWith);

                //sample fact to run the rules on   
                var fact = {
                    "left":"userblahblahnamenaoeuaoe",
                    "right":"user",
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(true);
                    done();
                });
            });   
            it('should be FALSEY if left DOES NOT begin with right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.StringRules.BeginsWith);

                //sample fact to run the rules on   
                var fact = {
                    "left":"userblahblahnamenaoeuaoe",
                    "right":"euaoe",
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(false);
                    done();
                });
            });            
        });

        describe('EndsWith Rule', function(){
            it('should be TRUTHY if Left string DOES end with Right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.StringRules.EndsWith);

                //sample fact to run the rules on   
                var fact = {
                    "left":"userblahblahnamenaoeuaoe",
                    "right":"euaoe",
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(true);
                    done();
                });
            });   
            it('should be FALSEY if left DOES NOT end with right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.StringRules.EndsWith);

                //sample fact to run the rules on   
                var fact = {
                    "left":"userblahblahnamenaoeuaoe",
                    "right":"userb",
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(false);
                    done();
                });
            });            
        });
    });

    describe('NumberRules', function(){
        describe('GreaterThan Rule', function(){
            it('NumberRules.GreaterThan rule should be TRUTHY if left > right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.NumberRules.GreaterThan);

                //sample fact to run the rules on   
                var fact = {
                    left:100,
                    right:5,
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(true);
                    done();
                });
            });
            it('NumberRules.GreaterThan rule should be FALSEY if left < right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.NumberRules.GreaterThan);

                //sample fact to run the rules on   
                var fact = {
                    left:100,
                    right:1000,
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(false);
                    done();
                });
            });
        });

        describe('SmallerThan Rule', function(){
            it('should be TRUTHY if left < right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.NumberRules.SmallerThan);

                //sample fact to run the rules on   
                var fact = {
                    left:100,
                    right:1000,
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(true);
                    done();
                });
            });
            it('should be FALSEY if left > right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.NumberRules.SmallerThan);

                //sample fact to run the rules on   
                var fact = {
                    left:100,
                    right:5,
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(false);
                    done();
                });
            });
        });

        describe('GreaterThanOrEqual Rule', function(){
            it('should be TRUTHY if left == right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.NumberRules.GreaterThanOrEqual);

                //sample fact to run the rules on   
                var fact = {
                    left:100,
                    right:100,
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(true);
                    done();
                });
            });
            it('should be TRUTHY if left > right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.NumberRules.GreaterThanOrEqual);

                //sample fact to run the rules on   
                var fact = {
                    left:100,
                    right:5,
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(true);
                    done();
                });
            });
            it('should be FALSEY if left < right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.NumberRules.GreaterThanOrEqual);

                //sample fact to run the rules on   
                var fact = {
                    left:100,
                    right:1000,
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(false);
                    done();
                });
            });
        });

        describe('SmallerThanOrEqual Rule', function(){
            it('should be TRUTHY if left === right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.NumberRules.SmallerThanOrEqual);

                //sample fact to run the rules on   
                var fact = {
                    left:100,
                    right:100,
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(true);
                    done();
                });
            });
            it('should be FALSEY if left > right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.NumberRules.SmallerThanOrEqual);

                //sample fact to run the rules on   
                var fact = {
                    left:100,
                    right:5,
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(false);
                    done();
                });
            });
            it('should be TRUTHY if left < right', function(done){
                //initialize the rule engine
                R = new RuleEngine(rules.NumberRules.SmallerThanOrEqual);

                //sample fact to run the rules on   
                var fact = {
                    left:100,
                    right:1000,
                };

                //Now pass the fact on to the rule engine for results
                R.execute(fact,function(result){ 
                    result.result.should.equal(true);
                    done();
                });
            });            
        });

    });
});