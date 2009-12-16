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

		it('should successfully restore to the original state of the object', function() {
			var map, newMap;
			map = new Map();
			newMap = new Map();
			map = mimic(map);
			expect(Mimic.mimics.length).to(equal, 1);
			expect(Mimic.mimics[0]).to(equal, map);
			
			map = restore(map);
			
			expect(Mimic.mimics.length).to(equal, 0);
			expect(Mimic.Util.Object.equals(map, newMap)).to(be_true);
		});
	});
});
