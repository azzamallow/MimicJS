var Map = function() {
	this.draw = function() { return true; };
	this.zoom = function() { this.iveZoomed = true; };
	this.pan = function(distance, directions) { };
}
var map;

Screw.Unit(function() {
	describe('exactly', function() {
		before(function() {
			map = mimic(new Map());
		});

		it('should pass as the function given was received twice', function() {
			when.	map.draw();
			and.	map.draw();
			then.	map.should('draw').twice();
		});
		
		it('should not pass as the function given was not received twice', function() {
			given.	map.draw();
			and.	map.draw();
			and.	map.draw();
			when.	map.should('draw').twice();
			then.	it.should.say('Your specification did not pass!<br/><p>The specification executed <b>draw() 3</b> times, however the specification expected <b>draw()</b> to be executed <b>2</b> times');
		});
		
		it('should pass as the function given was received multiple times', function() {
			when.	map.draw();
			and.	map.draw();
			and.	map.draw();
			then.	map.should('draw').exactly(3, times);
		});
		
		it('should not pass as the function given was received the incorrect number of times', function() {
			given.	map.draw();
			and.	map.draw();
			and.	map.draw();
			when.	map.should('draw').exactly(4, times);
			then.	it.should.say('Your specification did not pass!<br/><p>The specification executed <b>draw() 3</b> times, however the specification expected <b>draw()</b> to be executed <b>4</b> times');
		});
		
		it('should not append the number of occurrences as more specifications are added', function() {
			given.	map.should('pan').exactly(2, times);
			when.	map.pan();
			and.	map.pan();
			and.	map.pan();
			and.	map.pan();
			and.	map.pan();
			then.	map.should('pan');
		});
		
		it('should only allow a number to be passed in when specifying number of occurrences', function() {
			when.	map.draw();
			this.	should.say('A number must be provided when specifying the number of occurrences');
			then.	map.should('draw').exactly([], times);
		});
	});
});