if (typeof require == 'function') {
	require("spec_helper.js");
}

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

Screw.Unit(function() {
	describe('defaults', function() {
		it('should successfully create a mimic and add it to a list', function() {
			expect(Mimic.mimics.length).to(equal, 0);
			
			var map = mimic(new Map());
			
			expect(Mimic.mimics.length).to(equal, 1);
			expect(Mimic.mimics[0]).to(equal, map);
			
			Mimic.clear();
  		});

		it('should return itself if the developer tries to mimic an object which is already a mimic object', function() {
			var firstMimic = mimic(new Map());
			var secondMimic = mimic(firstMimic);
			
			expect(firstMimic).to(equal, secondMimic);
		});
		
		it('should error when exactly is used without a should being used', function() {
			this.should.say('The function "exactly" can only be used when the function "should" precedes it');
			mimic(new Map()).exactly(3, times);
		});
		
		it('should error when once is used without a should being used', function() {
			this.should.say('The function "once" can only be used when the function "should" precedes it');
			mimic(new Map()).once();
		});
		
		it('should error when once is used without a should being used', function() {
			this.should.say('The function "twice" can only be used when the function "should" precedes it');
			mimic(new Map()).twice();
		});
		
		it('should error when andReturn is used without a should being used', function() {
			this.should.say('The function "andReturn" can only be used when the function "should" precedes it');
			mimic(new Map()).andReturn();
		});
		
		it('should error when andThrow is used without a should being used', function() {
			this.should.say('The function "andThrow" can only be used when the function "should" precedes it');
			mimic(new Map()).andThrow();
		});
		
		it('should error when using is used without a should being used', function() {
			this.should.say('The function "using" can only be used when the function "should" precedes it');
			mimic(new Map()).using();
		});
	});
});
