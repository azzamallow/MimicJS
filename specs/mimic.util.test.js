Screw.Unit(function() {
	describe('Mimic Util', function() {
		describe('when evaluating parameters', function() {
			it('should evaluate three parameters and return them as an array', function() {
				expect(Mimic.Util.evalParameters('string', 3, 4)).to(equal, ['string', 3, 4]);
	  		});
			
			it('should evaluate no parameters and return an empty array', function() {
				expect(Mimic.Util.evalParameters()).to(equal, []);
	  		});
			
			it('should evaluate an object parameter and return it in an array', function() {
				expect(Mimic.Util.evalParameters({'stuff': 4})).to(equal, [{'stuff': 4}]);
	  		});
			
			it('should evaluate a function parameter and return it in an array', function() {
				var theFunction = function() { return true; };
				expect(Mimic.Util.evalParameters(theFunction)).to(equal, [theFunction]);
	  		});
			
			it('should evaluate up to ten parameters', function() {
				expect(Mimic.Util.evalParameters(0,1,2,3,4,5,6,7,8,9)).to(equal, [0,1,2,3,4,5,6,7,8,9]);
			});
		});
		
		describe('when taking parameters from the string representation of a function', function() {
			it('should return parameters as a string', function() {
				var theFunction = function(firstOne, secondOne) { return true; };
				expect(Mimic.Util.parametersFrom(theFunction)).to(equal, 'firstOne,secondOne');
			});
			
			it('should return an empty string as there are no parameters in the string given', function() {
				var theFunction = function() { return true; };
				expect(Mimic.Util.parametersFrom(theFunction)).to(equal, '');
			});
		});
		
		describe('when checking if an array contains an object', function() {
			it('should return true because the array was found in the array', function() {
				expect(Mimic.Util.contains([[1, {}], [2, 'left'], []], [2, 'left'])).to(equal, 1);
			});
		});
		
		describe('when cleaning an array', function() {
			it('should return a new array with no null values', function() {
				expect(Mimic.Util.clean([2, null, "3"])).to(equal, [2, "3"]);
			});
			
			it('should return a new array with no undefined values', function() {
				expect(Mimic.Util.clean([2, undefined, "3"])).to(equal, [2, "3"]);
			});
		});
	});
});