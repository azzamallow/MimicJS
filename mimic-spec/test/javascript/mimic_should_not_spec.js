if (typeof require == 'function') {
	require("spec_helper.js");
}

var Map = function() {
	this.draw = function() { return true; };
	this.zoom = function() { this.iveZoomed = true; };
	this.pan = function(distance, directions) { };
}
var map;

Screw.Unit(function() {
	describe('shouldNot', function() {
		before(function() {
			map = mimic(new Map());
		});

		it('should pass as the function given was not received', function() {
			given.	map.draw();
			when.	map.shouldNot('zoom');
			then.	it.should.pass();
  		});
		
		it('should not pass as the function given was received', function() {
			when.	map.draw();
			and.	map.shouldNot('draw');
			then.	it.should.say('Your specification did not pass!<br/><p><b>draw()</b> was called, but was not expected to be called');
  		});
		
		it('should not pass as the function expected does not exist', function() {
			when.	map.shouldNot('doAnything');
			then.	it.should.say('Your specification did not pass!<br/><p><b>doAnything()</b> does not exist, however it is referenced in the specification');
		});
	});
});