//LogicJump (node-rules) Rules in JSON

var simpleFact = {
    left:"user 4",
    right:"something something user something",
};
var multiFact = {
    operandTuples: [
        {
            left:"user 4",
            right:"something something user something",
            logicOp: "AND",
        },
        {
            left:"something something user something",
            right:"something",
            logicOp: "OR",
        }
    ],
    left:"",
    right:"",
    logicOp:"",
    prevResult: null,
};

var _globalRules = function(){};
_globalRules.Equal = {
    "condition" : function(R) {
        if(this.operandTuples){
            var currTuple = this.operandTuples.pop();
            this.left = currTuple.left;
            this.right = currTuple.right;
            this.logicOp = currTuple.logicOp;
        }

        R.when(!(this.left === this.right));
    },
    "consequence" : function(R) {

        if(prevResult !== null){
            if(logicOp === "AND"){
                
            }
        }
        this.result = false;
        R.next();
    },
};
_globalRules.NotEqual = {
    "condition" : function(R) {
        if(this.operandTuples){
            var currTuple = this.operandTuples.pop();
            this.left = currTuple.left;
            this.right = currTuple.right;
        }

        R.when(!(this.left !== this.right));
    },
    "consequence" : function(R) {
        this.result = false;
        R.next();
    },
};
_globalRules.AND = {
    "condition" : function(R) {
        if(this.operandTuples){
            var currTuple = this.operandTuples.pop();
            this.left = currTuple.left;
            this.right = currTuple.right;
        }

        R.when(!(this.left && this.right));
    },
    "consequence" : function(R) {
        this.result = false;
        R.next();
    },
};
_globalRules.OR = {
    "condition" : function(R) {
        if(this.operandTuples){
            var currTuple = this.operandTuples.pop();
            this.left = currTuple.left;
            this.right = currTuple.right;
        }
        
        R.when(!(this.left || this.right));
    },
    "consequence" : function(R) {
        this.result = false;
        R.next();
    },
};

var _stringRules = function(){};
_stringRules.prototype = _globalRules;
_stringRules.Contains = {
    "condition" : function(R) {
        if(this.operandTuples){
            var currTuple = this.operandTuples.pop();
            this.left = currTuple.left;
            this.right = currTuple.right;
        }
        
        var contains = (this.left.indexOf(this.right) > -1);
        R.when(!contains);
    },
    "consequence" : function(R) {
        this.result = false;
        R.next();
    },
};
_stringRules.NotContains = {
    "condition" : function(R) {
        if(this.operandTuples){
            var currTuple = this.operandTuples.pop();
            this.left = currTuple.left;
            this.right = currTuple.right;
        }
        
        var notContains = !(this.left.indexOf(this.right) > -1);
        R.when(!notContains);
    },
    "consequence" : function(R) {
        this.result = false;
        R.next();
    },
};
_stringRules.BeginsWith = {
    "condition" : function(R) {
        if(this.operandTuples){
            var currTuple = this.operandTuples.pop();
            this.left = currTuple.left;
            this.right = currTuple.right;
        }
        
        R.when(!(this.left.indexOf(this.right) === 0));
    },
    "consequence" : function(R) {
        this.result = false;
        R.next();
    },
};
_stringRules.EndsWith = {
    "condition" : function(R) {
        if(this.operandTuples){
            var currTuple = this.operandTuples.pop();
            this.left = currTuple.left;
            this.right = currTuple.right;
        }
        
    	var lenLeft = this.left.length;
    	var lenRight = this.right.length;

        R.when(!(this.left.indexOf(this.right) === (lenLeft-lenRight)));
    },
    "consequence" : function(R) {
        this.result = false;
        R.next();
    },
};

var _numberRules = function(){};
_numberRules.prototype = _globalRules;
_numberRules.GreaterThan = {
    "condition" : function(R) {
        if(this.operandTuples){
            var currTuple = this.operandTuples.pop();
            this.left = currTuple.left;
            this.right = currTuple.right;
        }
        
        var greaterThan = (this.left > this.right);
        R.when(!greaterThan);
    },
    "consequence" : function(R) {
        this.result = false;
        R.next();
    },
};
_numberRules.SmallerThan = {
    "condition" : function(R) {
        if(this.operandTuples){
            var currTuple = this.operandTuples.pop();
            this.left = currTuple.left;
            this.right = currTuple.right;
        }
        
        var smallerThan = (this.left < this.right);
        R.when(!smallerThan);
    },
    "consequence" : function(R) {
        this.result = false;
        R.next();
    },
};
_numberRules.GreaterThanOrEqual = {
    "condition" : function(R) {
        if(this.operandTuples){
            var currTuple = this.operandTuples.pop();
            this.left = currTuple.left;
            this.right = currTuple.right;
        }
        
        var greaterThanOrEqual = (this.left >= this.right);
        R.when(!greaterThanOrEqual);
    },
    "consequence" : function(R) {
        this.result = false;
        R.next();
    },
};

_numberRules.SmallerThanOrEqual = {
    "condition" : function(R) {
        if(this.operandTuples){
            var currTuple = this.operandTuples.pop();
            this.left = currTuple.left;
            this.right = currTuple.right;
        }
        
        var smallerThanOrEqual = (this.left <= this.right);
        R.when(!smallerThanOrEqual);
    },
    "consequence" : function(R) {
        this.result = false;
        R.next();
    },
};

module.exports = {
    StringRules: _stringRules,
    NumberRules: _numberRules,
    BooleanRules: _globalRules,
};

