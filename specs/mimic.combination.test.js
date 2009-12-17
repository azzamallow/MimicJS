var Map = function() {
	this.draw = function() { return true; };
	this.zoom = function() { this.iveZoomed = true; };
	this.pan = function(distance, directions) { return distance; };
}
var map;

Screw.Unit(function() {
	describe('combination', function() {
		before(function() {
			map = mimic(new Map());
		});

		it('should pass using a combination of number of occurrences and specifying parameters', function() {
			given.	map.pan(2, 'left');
			and.	map.pan(2, 'left');
			and.	map.pan(2, 'left');
			then.	map.should('pan').exactly(3, times).using(2, 'left');
		});
		
		it('should pass using a combination of two occurrences and specifying parameters', function() {
			given.	map.pan(2, 'left');
			and.	map.pan(2, 'left');
			then.	map.should('pan').twice().using(2, 'left');
		});
		
		it('should pass using a combination of specifying parameters and number of occurrences', function() {
			given.	map.pan(2, 'left');
			and.	map.pan(2, 'left');
			and.	map.pan(2, 'left');
			then.	map.should('pan').using(2, 'left').exactly(3, times);
		});
		
		it('should pass specifying parameters and using a combination of two occurrences', function() {
			when.	map.pan(2, 'left');
			and.	map.pan(2, 'left');
			then.	map.should('pan').using(2, 'left').twice();
		});
		
		it('should not pass using a combination of number of occurrences and specifying parameters', function() {
			given.	map.pan(2, 'left');
			and.	map.pan(3, 'left');
			and.	map.pan(3, 'left');
			when.	map.should('pan').exactly(3, times).using(3, 'left');
			then.	it.should.say('Your specification did not pass!<br/><p>The specification executed <b>pan(2, "left")</b>, however the specification expected <b>pan(3, "left")</b></p>');
		});
		
		it('should not pass using a combination of two occurrences and specifying parameters', function() {
			given.	map.pan(2, 'left');
			and.	map.pan(3, 'left');
			when.	map.should('pan').twice().using(2, 'left');
			then.	it.should.say('Your specification did not pass!<br/><p>The specification executed <b>pan(3, "left")</b>, however the specification expected <b>pan(2, "left")</b></p>');
		});
		
		it('should not pass using a combination of specifying parameters and number of occurrences', function() {
			given.	map.pan(2, 'left');
			and.	map.pan(3, 'left');
			and.	map.pan(3, 'left');
			when.	map.should('pan').using(3, 'left').exactly(3, times);
			then.	it.should.say('Your specification did not pass!<br/><p>The specification executed <b>pan(2, "left")</b>, however the specification expected <b>pan(3, "left")</b></p>');
		});
		
		it('should not pass using a combination of specifying parameters and two occurrences', function() {
			given.	map.pan(3, 'left');
			and.	map.pan(2, 'left');
			when.	map.should('pan').using(2, 'left').twice();
			then.	it.should.say('Your specification did not pass!<br/><p>The specification executed <b>pan(3, "left")</b>, however the specification expected <b>pan(2, "left")</b></p>');
		});
		
		it('should pass specifying parameters and using return values', function() {
			given.	map.should('pan').using(3, 'left').andReturn('first call');
			and.	map.should('pan').using(2, 'right').andReturn('second call');
			then.	expect(map.pan(3, 'left')).to(equal, 'first call');
			and.	expect(map.pan(2, 'right')).to(equal, 'second call');
		});
		
		it('should not override any previous returns with a global return', function() {
			given.	map.should('pan').using(3, 'left').andReturn('first call');
			and.	map.should('pan').using(2, 'right').andReturn('second call');
			and.	map.should('pan').andReturn('third call');
			then.	expect(map.pan(3, 'left')).to(equal, 'first call');
			and.	expect(map.pan(2, 'right')).to(equal, 'second call');
			and.	expect(map.pan()).to(equal, 'third call');
		});
		
		it('should use returns in conjunction with number of occurrences', function() {
			given.	map.should('pan').using(3, 'left').twice().andReturn('first call');
			and.	map.should('pan').using(2, 'right').twice().andReturn('second call');
			then.	expect(map.pan(3, 'left')).to(equal, 'first call');
			and.	expect(map.pan(3, 'left')).to(equal, 'first call');
			and.	expect(map.pan(2, 'right')).to(equal, 'second call');
			and.	expect(map.pan(2, 'right')).to(equal, 'second call');
		});
	});
});