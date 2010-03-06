var map, original;

DeepObject = {
  	First: {
      	Second: function() {}
  	},
  	Third: {
		Fourth: function() {}
	}
};

deepObject = mimic(DeepObject);

describe('should', function() {
	beforeEach(function() {
		var Map = function() {
			this.iveZoomed = false;
			this.zoomLevels = [1, 2, 3, 4];
			this.draw = function() { 
				$('select').show();
				return true; };
			this.zoom = function() { this.iveZoomed = true; };
			this.pan = function(distance, directions) { };
			this.layers = {
				markerLayer: function(layer) {
				}
			};
		};
		
		map = mimic(new Map());
		original = new Map();
	});
	
	it('should pass as the function given was received', function() {
		given.	map.draw();
		when.	map.should('draw');
		then.	itShould.pass();
 	});
	
	it('should not pass as the function given was not received', function() {
		given.	map.zoom();
		when.	map.should('draw');
		then.	itShould.say('Your specification did not pass!<br/><p><b>draw()</b> was expected but did not get called!');
 	});
	
	it('should not pass as the function expected does not exist', function() {
		when.	map.should('nothing');
		then.	itShould.say('Your specification did not pass!<br/><p><b>nothing()</b> does not exist, however it is referenced in the specification');
	});
	
	it('should pass when override should not with a should', function() {
		when.	map.shouldNot('pan');
		and.	map.should('pan');
		then.	map.pan();
	});
	
	it('should pass as the function given returned the provided value', function() {
		when.	map.should('draw').andReturn('map was drawn');
		then.	expect(map.draw()).toEqual('map was drawn');
	});
	
	it('should throw an exception when the function given is called', function() {
		when.	map.should('pan').andThrow('Ive decided to throw');
		and.	map.pan();
		then.	itShould.say('Ive decided to throw');
	});
			
	it('should show an alert when the function given is called', function() {
		map.pan = function() {
			alert('here is my alert message');
		}
		
		then.itShould.alert('here is my alert message').when.map.pan();
	});
	
	it('should mimic simple objects from the original object', function() {
		given.	that(original.iveZoomed).equals(false);
		then.	expect(map.iveZoomed).toEqual(false);
	});
	
	it('should mimic an array from the original object', function() {
		given.	that(original.zoomLevels).equals([1, 2, 3, 4]);
		then.	expect(map.zoomLevels).toEqual([1, 2, 3, 4]);
	});
	
	it('should be able to play nice with nested objects in a mimic', function() {
		given.	deepObject.First.Second();
		then.	deepObject.should('First.Second');
	});
	
	it('should allow shoulds for nexted objects in a mimic', function() {
		given.	deepObject.First.Second();
		then.	deepObject.First.should('Second');
	});
	
	it('should assert an exception without the given, when, then', function() {
		throwing = function() {
			throw('an exception was thrown');
		}
		
		itShould.say('an exception was thrown').when.throwing();
	});
	
	it('should error when the user tries to provide more than one parameter for should function', function() {
		itShould.say('Only one parameter can be provided for <b>should()</b>. To provide extra parameters try the following:<br/><p><b>should("pan").using(5000, ...)</b></p>');
		when.	map.should('pan', 5000);
	});
});
