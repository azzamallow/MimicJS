if (typeof require == 'function') {
	require("spec_helper.js");
}

var Map = function() {
	this.draw = function() { return true; };
	this.zoom = function() { this.iveZoomed = true; };
	this.pan = function(distance, directions) { return distance; };
}
var theMap;

Screw.Unit(function() {
	describe('partial', function() {
		it('should be able to monitor the behaviour of a partially mimicd object', function() {
			given.	theMap = new Map();
			when.	mimic(theMap, asPartial);
			then.	expect(theMap.pan('distance', 'directions')).to(equal, 'distance');
			and.	theMap.should('pan').using('distance', 'directions');
		});
		
		it('should create a standard mimic object without monitoring partial behaviour', function() {
			given.	theMap = new Map();
			when.	mimic(theMap);
			then.	expect(theMap.pan('distance', 'directions')).to(equal, undefined);
			and.	theMap.should('pan').using('distance', 'directions');
		});
		
		it('should allow overriding the return value of a partially mimicd object', function() {
			given.	theMap = new Map();
			when.	mimic(theMap, asPartial);
			and.	theMap.should('pan').using('distance', 'directions').andReturn('another value');
			then.	expect(theMap.pan('distance', 'directions')).to(equal, 'another value');
		});
	});
});