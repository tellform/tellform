// 'use strict';

// var should = require('should'),
// 	mongoose = require('mongoose'),
// 	math = require('math'),
// 	Form = mongoose.model('Form'),
// 	LogicJump = mongoose.model('LogicJump'),
// 	BooleanƒExpression = mongoose.model('BooleanExpression'),
// 	Field = mongoose.model('Field');

// /**
//  * Globals
//  */
// var textField;

// /**
//  * Form routes tests
//  */
// describe('LogicJump Tests', function() {

// 	beforeEach(function(done) {
// 		textField = new Field({
// 			title: 'First Name',
// 			fieldType: 'textfield',
// 			fieldValue: 'David',
// 		});

// 		textField.save(function(err){
// 			if(err) done(err);
// 			done();
// 		});
// 	});

// 	describe('BooleanExpression', function(){
// 		var scope;

// 		beforeEach(function(){
// 			scope = {
// 				x: false,
// 				y: true,
// 				b: 5,
// 				a: 3
// 			}
// 		});

// 		it('should evaluate a simple boolean expression to be true', function(){
// 			var expression = 'and( or( x, y), (b > a))';

// 			var code = math.parse(expression);
// 			var actual = code.compile().eval(scope);

// 			// var expected = ( (false || true) && !!(5 > 3) );

// 			actual.should.equal(true);
// 		});


// 		afterEach(function(done){
// 			BooleanExpression.remove().exec(function() {
// 				done();
// 			});
// 		});
// 	});

// 	afterEach(function(done) {
// 		Field.remove().exec(function() {
// 			done();
// 		});
// 	});
// });
