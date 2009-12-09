var Map = function() {
	this.draw = function() { return true; };
	this.zoom = function() { this.iveZoomed = true; };
	this.pan = function(distance, directions) { };
}
var map;

Screw.Unit(function() {
	describe('using', function() {
		before(function() {
			map = mimic(new Map());
		});
		
		it('should pass as the function given is called with the right parameters', function() {
			when.	map.pan(2, 'left');
			then.	map.should('pan').using(2, 'left');
		});
		
		it('should not pass as the function given is not called with the right parameters', function() {
			given.	map.pan(3, 'right');
			when.	map.does('pan').using(2, 'left');
			then.	it.should.say('Your specification did not pass!<br/><p>The specification executed <b>pan(3, right)</b>, however the specification expected <b>pan(2, left)</b></p>');
		});
		
		it('should pass as the function given was called twice with the two different sets of parameters', function() {
			when.	map.pan(3, 'right');
			and.  	map.pan(2, 'left');
			then. 	map.should('pan').using(2, 'left');
			and.  	map.should('pan').using(3, 'right');
		});
		
		it('should not pass as the function given was called twice with the two different sets of parameters that have not been asserted', function() {
			given.  map.pan(3, 'right');
			and.    map.pan(2, 'left');
			when.   map.should('pan').using(3, 'left');
			and.    map.should('pan').using(2, 'right');
			then.	it.should.say('Your specification did not pass!<br/><p>The specification executed <b>pan(3, right)</b>, however the specification expected <b>pan(3, left)</b> or <b>pan(2, right)</b></p>');
		});
		
		it('should not pass when too many parameters are specified', function() {
			given.  map.pan(2, 'left');
			when.	map.does('pan').using(3, 'left', 'shouldnt be here', {}, []);
			then.	it.should.say('Your specification did not pass!<br/><p>The specification executed <b>pan()</b> with <b>5</b> parameters, however the specification expected <b>pan()</b> with <b>2</b> parameters');
		});
		
		it('should allow "anything" to be given as a parameter', function() {
			when.	map.pan();
			then.	map.should('pan').using(anything);
		});
		
		it('should not pass when a parameter is specified for a function that does not accept parameters', function() {
			given.	map.draw();
			when.	map.does('draw').using([], {}, 'something');
			then.	it.should.say('Your specification did not pass!<br/><p><b>draw()</b> does not accept any parameters. You must remove the parameters from in the specification from <b>draw()</b>');
		});
	});
});