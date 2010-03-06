var map;

describe('shouldNot', function() {
	beforeEach(function() {
		var Map = function() {
			this.draw = function() { return true; };
			this.zoom = function() { this.iveZoomed = true; };
			this.pan = function(distance, directions) { };
		}
		
		map = mimic(new Map());
	});

	it('should pass as the function given was not received', function() {
		given.	map.draw();
		when.	map.shouldNot('zoom');
		then.	itShould.pass();
 	});
	
	it('should not pass as the function given was received', function() {
		when.	map.draw();
		and.	map.shouldNot('draw');
		then.	itShould.say('Your specification did not pass!<br/><p><b>draw()</b> was called, but was not expected to be called');
 	});
	
	it('should not pass as the function expected does not exist', function() {
		when.	map.shouldNot('doAnything');
		then.	itShould.say('Your specification did not pass!<br/><p><b>doAnything()</b> does not exist, however it is referenced in the specification');
	});
});