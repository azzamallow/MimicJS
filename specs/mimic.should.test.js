var Map, map;

Map = function() {
	this.iveZoomed = false;
	this.zoomLevels = [1, 2, 3, 4];
	this.draw = function() { return true; };
	this.zoom = function() { this.iveZoomed = true; };
	this.pan = function(distance, directions) { };
	this.layers = {
		markerLayer: function(layer) {}
	};
}

DeepObject = {
  First: {
      Second: function() {}
  }
};

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
			then.	it.should.say('Your specification did not pass!<br/><p><b>draw()</b> was expected but did not get called!');
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
		
		it('should be able to reference variables defined in the spec', function() {
			var theVariableDefinedInTheSpec = {'defined': true};
			
			given.	theVariableDefinedInTheSpec.defined = false;
			when.	theVariableDefinedInTheSpec.defined = false;
			then.	theVariableDefinedInTheSpec.defined = false;
			and.	theVariableDefinedInTheSpec.defined = false;
		});
		
		it('should be able to play nice with nested objects in a mimic', function() {
			deepObject = mimic(DeepObject);
			
			given.	deepObject.First.Second();
			then.	deepObject.should('First.Second');
		});
	});
});
