var Map, map;

Map = function() {
	this.iveZoomed = false;
	this.zoomLevels = [1, 2, 3, 4];
	this.draw = function() { return true; };
	this.zoom = function() { this.iveZoomed = true; };
	this.pan = function(distance, directions) { };
}

var mimicJQuery;

Screw.Unit(function() {
	describe('should()', function() {
		before(function() {
			map = mimic(new Map());
		});
		
		it('should pass as the function given was received', function() {
			when.	map.draw();
			then.	map.should('draw');
  		});
		
		it('should not pass as the function given was not received', function() {
			given.	map.zoom();
			when.	map.should('draw');
			then.	it.should.say('The function "draw" was expected but did not get called!');
  		});
		
		it('should not pass as the function expected does not exist', function() {
			when.	map.should('nothing');
			then.	it.should.say('Your specification did not pass!<br/><p><b>nothing()</b> does not exist, however it is referenced in the specification');
		});
		
		it('should pass when override should not with a should', function() {
			when.	map.shouldNot('pan');
			and.	map.should('pan');
			then.	map.pan();
		});
		
		it('should pass as the function given returned the provided value', function() {
			when.	map.should('draw').andReturn('map was drawn');
			then.	expect(map.draw()).to(equal, 'map was drawn');
		});
		
		it('should throw an exception when the function given is called', function() {
			when.	map.should('pan').andThrow('Ive decided to throw');
			and.	map.pan();
			then.	it.should.say('Ive decided to throw');
		});
		
		it('should return its original return value', function() {
			var original = new Map();
			
			given.	that(original.draw()).is(true);
			when.	expect(map.draw()).to(be_true);
		});
		
		it('should mimic simple objects from the original object', function() {
			var original = new Map();
			
			given.	that(original.iveZoomed).is(false);
			then.	expect(map.iveZoomed).to(be_false);
		});
		
		it('should mimic an array from the original object', function() {
			var original = new Map();
			
			given.	that(original.zoomLevels).is([1, 2, 3, 4]);
			then.	expect(map.zoomLevels).to(equal, [1, 2, 3, 4]);
		});
	});
});
//	describe('using new operator with prototype', function() {
//		before(function() {
//			Map = function() {};
//			Map.prototype = {
//				draw: function() { return true; },
//				zoom: function() { this.iveZoomed = true; },
//				pan: function(distance, directions) { }
//			}
//		});
//		
//		describe('shouldReceive()', function() {
//			before(function() {
//				map = mimic(new Map());
//			});
//			
//			it('should pass as the function given was received', function() {
//				map.shouldReceive('draw');
//				map.draw();
//	  		});
//			
//			it('should not pass as the function given was not received', function() {
//				shouldReceiveException('The function "draw" was expected but did not get called!');
//				map.shouldReceive('draw');
//				map.zoom();
//	  		});
//			
//			it('should not pass as the function expected does not exist', function() {
//				shouldReceiveException('The function "nothing" does not exist');
//				map.shouldReceive('nothing');
//			});
//			
//			it('should not pass when override not receive with a receive', function() {
//				shouldReceiveException('The function "pan" cannot be asserted to receive and not receive in a single specification');
//				map.shouldNot('pan');
//				map.shouldReceive('pan');
//				map.pan();
//			});
//			
//			it('should pass as the function given returned the provided value', function() {
//				map.shouldReceive('draw').andReturn('map was drawn');
//				expect(map.draw()).to(equal, 'map was drawn');
//			});
//			
//			it('should throw an exception when the function given is called', function() {
//				shouldReceiveException('Ive decided to throw');
//				map.shouldReceive('pan').andThrow('Ive decided to throw');
//				map.pan();
//			});
//			
//			describe('combination of specifications', function() {
//				it('should pass using a combination of number of occurances and specifying parameters', function() {
//					map.shouldReceive('pan').exactly(3, times).withValues(2, 'left');
//					map.pan(2, 'left');
//					map.pan(2, 'left');
//					map.pan(2, 'left');
//				});
//				
//				it('should pass using a combination of two occurances and specifying parameters', function() {
//					map.shouldReceive('pan').twice().withValues(2, 'left');
//					map.pan(2, 'left');
//					map.pan(2, 'left');
//				});
//				
//				it('should pass using a combination of specifying parameters and number of occurances', function() {
//					map.shouldReceive('pan').withValues(2, 'left').exactly(3, times);
//					map.pan(2, 'left');
//					map.pan(2, 'left');
//					map.pan(2, 'left');
//				});
//				
//				it('should pass specifying parameters and using a combination of two occurances', function() {
//					map.shouldReceive('pan').withValues(2, 'left').twice();
//					map.pan(2, 'left');
//					map.pan(2, 'left');
//				});
//				
//				it('should not pass using a combination of number of occurances and specifying parameters', function() {
//					shouldReceiveException('The function "pan" was called with parameters (2, left) but was expected to be called with (3, left)');
//					map.shouldReceive('pan').exactly(3, times).withValues(3, 'left');
//					map.pan(2, 'left');
//					map.pan(3, 'left');
//					map.pan(3, 'left');
//				});
//				
//				it('should not pass using a combination of two occurances and specifying parameters', function() {
//					shouldReceiveException('The function "pan" was called with parameters (3, left) but was expected to be called with (2, left)');
//					map.shouldReceive('pan').twice().withValues(2, 'left');
//					map.pan(2, 'left');
//					map.pan(3, 'left');
//				});
//				
//				it('should not pass using a combination of specifying parameters and number of occurances', function() {
//					shouldReceiveException('The function "pan" was called with parameters (2, left) but was expected to be called with (3, left)');
//					map.shouldReceive('pan').withValues(3, 'left').exactly(3, times);
//					map.pan(2, 'left');
//					map.pan(3, 'left');
//					map.pan(3, 'left');
//				});
//				
//				it('should not pass using a combination of specifying parameters and two occurances', function() {
//					shouldReceiveException('The function "pan" was called with parameters (3, left) but was expected to be called with (2, left)');
//					map.shouldReceive('pan').withValues(2, 'left').twice();
//					map.pan(3, 'left');
//					map.pan(2, 'left');
//				});
//			});
//			
//			describe('specifying number of occurances', function() {
//				it('should pass as the function given was received twice', function() {
//					map.shouldReceive('draw').twice();
//					map.draw();
//					map.draw();
//				});
//				
//				it('should not pass as the function given was not received twice', function() {
//					shouldReceiveException('The function "draw" was called 3 times, but was expected to be called 2 times');
//					map.shouldReceive('draw').twice();
//					map.draw();
//					map.draw();
//					map.draw();
//				});
//				
//				it('should pass as the function given was received multiple times', function() {
//					map.shouldReceive('draw').exactly(3, times);
//					map.draw();
//					map.draw();
//					map.draw();
//				});
//				
//				it('should not pass as the function given was received the incorrect number of times', function() {
//					shouldReceiveException('The function "draw" was called 3 times, but was expected to be called 4 times');
//					map.shouldReceive('draw').exactly(4, times);
//					map.draw();
//					map.draw();
//					map.draw();
//				});
//				
//				it('should not append the number of occurances as more specifications are added', function() {
//					map.shouldReceive('pan').exactly(2, times);
//					map.shouldReceive('pan');
//					map.pan();
//				});
//				
//				it('should reset the number of occurances to unlimited', function() {
//					map.shouldReceive('pan').exactly(2, times);
//					map.shouldReceive('pan');
//					map.pan();
//					map.pan();
//					map.pan();
//					map.pan();
//					map.pan();
//				});
//				
//				it('should only allow a number to be passed in when specifying number of occurances', function() {
//					shouldReceiveException('A number must be provided when specifying the number of occurances');
//					map.shouldReceive('pan').exactly([], times);
//				});
//			});
//			
//			describe('specifying parameters', function() {
//				it('should pass as the function given is called with the right parameters', function() {
//					map.shouldReceive('pan').withValues(2, 'left');
//					map.pan(2, 'left');
//				});
//				
//				it('should not pass as the function given is not called with the right parameters', function() {
//					shouldReceiveException('The function "pan" was called with parameters (3, right) but was expected to be called with (2, left)');
//					map.shouldReceive('pan').withValues(2, 'left');
//					map.pan(3, 'right');
//				});
//				
//				it('should pass as the function given was called twice with the two different sets of parameters', function() {
//					map.shouldReceive('pan').withValues(2, 'left');
//					map.shouldReceive('pan').withValues(3, 'right');
//					map.pan(3, 'right');
//					map.pan(2, 'left');
//				});
//				
//				it('should not pass as the function given was called twice with the two different sets of parameters that have not been asserted', function() {
//					shouldReceiveException('The function "pan" was called with parameters (3, right) but was expected to be called with (3, left) or (2, right)');
//					map.shouldReceive('pan').withValues(3, 'left');
//					map.shouldReceive('pan').withValues(2, 'right');
//					map.pan(3, 'right');
//					map.pan(2, 'left');
//				});
//				
//				it('should not pass when too many parameters are specified', function() {
//					given.  map.pan(2, 'left');
//					when.	map.should('pan').using(3, 'left', 'shouldnt be here', {}, []);
//					then.	it.should.say('The function "pan" does not accept 5 parameters, it will only accept 2 parameters');
//				});
//				
//				it('should allow "anything" to be given as a parameter', function() {
//					when.  map.pan();
//					then.  map.should('pan').using(anything);
//				});
//				
//				it('should not pass when a parameter is specified for a function that does not accept parameters', function() {
//					shouldReceiveException('The function "draw" does not accept any parameters');
//					map.shouldReceive('draw').withValues([], {}, 'something');
//					map.draw();
//				});
//			});
//		});
//		
//		describe('shouldNot()', function() {
//			before(function() {
//				map = mimic(new Map());
//			});
//			
//			it('should pass as the function given was not received', function() {
//				map.shouldNot('zoom');
//				map.draw();
//	  		});
//			
//			it('should not pass as the function given was received', function() {
//				shouldReceiveException('The function "draw" was called, but was not expected to be called');
//				map.shouldNot('draw');
//				map.draw();
//	  		});
//			
//			it('should not pass as the function expected does not exist', function() {
//				shouldReceiveException('The function "nothing" does not exist');
//				map.shouldNot('nothing');
//			});
//		});
//	});
//	
//	describe('using raw object', function() {
//		before(function() {
//			Map = {
//				draw: function() { return true; },
//				zoom: function() { this.iveZoomed = true; },
//				pan: function(distance, directions) { }
//			}
//		});
//		
//		describe('shouldReceive()', function() {
//			before(function() {
//				map = mimic(Map);
//			});
//			
//			it('should pass as the function given was received', function() {
//				map.shouldReceive('draw');
//				map.draw();
//	  		});
//			
//			it('should not pass as the function given was not received', function() {
//				shouldReceiveException('The function "draw" was expected but did not get called!');
//				map.shouldReceive('draw');
//				map.zoom();
//	  		});
//			
//			it('should not pass as the function expected does not exist', function() {
//				shouldReceiveException('The function "nothing" does not exist');
//				map.shouldReceive('nothing');
//			});
//			
//			it('should not pass when override not receive with a receive', function() {
//				shouldReceiveException('The function "pan" cannot be asserted to receive and not receive in a single specification');
//				map.shouldNot('pan');
//				map.shouldReceive('pan');
//				map.pan();
//			});
//			
//			it('should pass as the function given returned the provided value', function() {
//				map.shouldReceive('draw').andReturn('map was drawn');
//				expect(map.draw()).to(equal, 'map was drawn');
//			});
//			
//			it('should throw an exception when the function given is called', function() {
//				shouldReceiveException('Ive decided to throw');
//				map.shouldReceive('pan').andThrow('Ive decided to throw');
//				map.pan();
//			});
//			
//			describe('combination of specifications', function() {
//				it('should pass using a combination of number of occurances and specifying parameters', function() {
//					map.shouldReceive('pan').exactly(3, times).withValues(2, 'left');
//					map.pan(2, 'left');
//					map.pan(2, 'left');
//					map.pan(2, 'left');
//				});
//				
//				it('should pass using a combination of two occurances and specifying parameters', function() {
//					map.shouldReceive('pan').twice().withValues(2, 'left');
//					map.pan(2, 'left');
//					map.pan(2, 'left');
//				});
//				
//				it('should pass using a combination of specifying parameters and number of occurances', function() {
//					map.shouldReceive('pan').withValues(2, 'left').exactly(3, times);
//					map.pan(2, 'left');
//					map.pan(2, 'left');
//					map.pan(2, 'left');
//				});
//				
//				it('should pass specifying parameters and using a combination of two occurances', function() {
//					map.shouldReceive('pan').withValues(2, 'left').twice();
//					map.pan(2, 'left');
//					map.pan(2, 'left');
//				});
//				
//				it('should not pass using a combination of number of occurances and specifying parameters', function() {
//					shouldReceiveException('The function "pan" was called with parameters (2, left) but was expected to be called with (3, left)');
//					map.shouldReceive('pan').exactly(3, times).withValues(3, 'left');
//					map.pan(2, 'left');
//					map.pan(3, 'left');
//					map.pan(3, 'left');
//				});
//				
//				it('should not pass using a combination of two occurances and specifying parameters', function() {
//					shouldReceiveException('The function "pan" was called with parameters (3, left) but was expected to be called with (2, left)');
//					map.shouldReceive('pan').twice().withValues(2, 'left');
//					map.pan(2, 'left');
//					map.pan(3, 'left');
//				});
//				
//				it('should not pass using a combination of specifying parameters and number of occurances', function() {
//					shouldReceiveException('The function "pan" was called with parameters (2, left) but was expected to be called with (3, left)');
//					map.shouldReceive('pan').withValues(3, 'left').exactly(3, times);
//					map.pan(2, 'left');
//					map.pan(3, 'left');
//					map.pan(3, 'left');
//				});
//				
//				it('should not pass using a combination of specifying parameters and two occurances', function() {
//					shouldReceiveException('The function "pan" was called with parameters (3, left) but was expected to be called with (2, left)');
//					map.shouldReceive('pan').withValues(2, 'left').twice();
//					map.pan(3, 'left');
//					map.pan(2, 'left');
//				});
//			});
//			
//			describe('specifying number of occurances', function() {
//				it('should pass as the function given was received twice', function() {
//					map.shouldReceive('draw').twice();
//					map.draw();
//					map.draw();
//				});
//				
//				it('should not pass as the function given was not received twice', function() {
//					shouldReceiveException('The function "draw" was called 3 times, but was expected to be called 2 times');
//					map.shouldReceive('draw').twice();
//					map.draw();
//					map.draw();
//					map.draw();
//				});
//				
//				it('should pass as the function given was received multiple times', function() {
//					map.shouldReceive('draw').exactly(3, times);
//					map.draw();
//					map.draw();
//					map.draw();
//				});
//				
//				it('should not pass as the function given was received the incorrect number of times', function() {
//					shouldReceiveException('The function "draw" was called 3 times, but was expected to be called 4 times');
//					map.shouldReceive('draw').exactly(4, times);
//					map.draw();
//					map.draw();
//					map.draw();
//				});
//				
//				it('should not append the number of occurances as more specifications are added', function() {
//					map.shouldReceive('pan').exactly(2, times);
//					map.shouldReceive('pan');
//					map.pan();
//				});
//				
//				it('should reset the number of occurances to unlimited', function() {
//					map.shouldReceive('pan').exactly(2, times);
//					map.shouldReceive('pan');
//					map.pan();
//					map.pan();
//					map.pan();
//					map.pan();
//					map.pan();
//				});
//				
//				it('should only allow a number to be passed in when specifying number of occurances', function() {
//					shouldReceiveException('A number must be provided when specifying the number of occurances');
//					map.shouldReceive('pan').exactly([], times);
//				});
//			});
//			
//			describe('specifying parameters', function() {
//				it('should pass as the function given is called with the right parameters', function() {
//					map.shouldReceive('pan').withValues(2, 'left');
//					map.pan(2, 'left');
//				});
//				
//				it('should not pass as the function given is not called with the right parameters', function() {
//					shouldReceiveException('The function "pan" was called with parameters (3, right) but was expected to be called with (2, left)');
//					map.shouldReceive('pan').withValues(2, 'left');
//					map.pan(3, 'right');
//				});
//				
//				it('should pass as the function given was called twice with the two different sets of parameters', function() {
//					map.shouldReceive('pan').withValues(2, 'left');
//					map.shouldReceive('pan').withValues(3, 'right');
//					map.pan(3, 'right');
//					map.pan(2, 'left');
//				});
//				
//				it('should not pass as the function given was called twice with the two different sets of parameters that have not been asserted', function() {
//					shouldReceiveException('The function "pan" was called with parameters (3, right) but was expected to be called with (3, left) or (2, right)');
//					map.shouldReceive('pan').withValues(3, 'left');
//					map.shouldReceive('pan').withValues(2, 'right');
//					map.pan(3, 'right');
//					map.pan(2, 'left');
//				});
//				
//				it('should not pass when too many parameters are specified', function() {
//					when.   map.pan(2, 'left');
//					and.	map.does('pan').using(3, 'left', 'shouldnt be here', {}, []);
//					then.	it.should.say('The function "pan" does not accept 5 parameters, it will only accept 2 parameters');
//				});
//				
//				it('should allow "anything" to be given as a parameter', function() {
//					when.  map.pan();
//					then.  map.should('pan').using(anything);
//				});
//				
//				it('should not pass when a parameter is specified for a function that does not accept parameters', function() {
//					shouldReceiveException('The function "draw" does not accept any parameters');
//					map.shouldReceive('draw').withValues([], {}, 'something');
//					map.draw();
//				});
//			});
//		});
//		
//		describe('shouldNot()', function() {
//			before(function() {
//				map = mimic(Map);
//			});
//			
//			it('should pass as the function given was not received', function() {
//				map.shouldNot('zoom');
//				map.draw();
//	  		});
//			
//			it('should not pass as the function given was received', function() {
//				shouldReceiveException('The function "draw" was called, but was not expected to be called');
//				map.shouldNot('draw');
//				map.draw();
//	  		});
//			
//			it('should not pass as the function expected does not exist', function() {
//				shouldReceiveException('The function "nothing" does not exist');
//				map.shouldNot('nothing');
//			});
//		});
//	});
