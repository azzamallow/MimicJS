var Map = function() {
	this.draw = function() { return true; };
	this.zoom = function() { this.iveZoomed = true; };
	this.pan = function(distance, directions) { };
}

var Form = function(){ };
Form.prototype = {
	submit: function() { return 'ive submitted' },
	directions: function() { this.directionsClicked = true },
	input: function(key, value) { },
	zoom: function() {}
}

var Application = function () { 
	this.map;
	this.mapping = function() {
		map.zoom();
	};
};
var map, form, application;

Screw.Unit(function() {
	describe('multiple', function() {
		before(function() {
			map = mimic(new Map());
			form = mimic(new Form());
			application = new Application();
		});
		
		it('should handle multiple mimics in a single specification', function() {
			when.	map.zoom();
			and.	map.draw();
			and.	form.submit();
			and.	form.input('name', 'mimic');
			then.	map.should('zoom');
			and.	map.should('draw');
			and.	form.should('submit');
			and.	form.should('input').using('name', 'mimic');
		});
		
		it('should handle nested mimics in a single specification', function() {
			given.	map.should('zoom').andReturn(form);
			and.	map.zoom().submit();
			then.	form.should('submit');	
		});
		
		it('should handle indirect calls to mimic objects from other objects', function() {
			given.	application.map = map;
			when.	application.mapping();
			then.	map.should('zoom');
		});
		
		it('should not mix up should expectation between two mimic objects', function() {
			given.	map.zoom();
			when.	form.should('zoom');
			then.	it.should.say('Your specification did not pass!<br/><p><b>zoom()</b> was expected but did not get called!')
		});
		
		it('should not mix up exactly expectation between two mimic objects', function() {
			given.	map.zoom();
			and.	map.zoom();
			and.	map.zoom();
			when.	form.should('zoom').exactly(3, times);
			then.	it.should.say('Your specification did not pass!<br/><p><b>zoom()</b> was expected but did not get called!')
		});
	});
});