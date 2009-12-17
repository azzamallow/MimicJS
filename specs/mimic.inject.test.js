var Map = function() {}
var Application = function () {
	this.map;
};

var map, application;

Screw.Unit(function() {
	describe('inject', function() {
		before(function() {
			map = mimic(new Map());
			application = new Application();
		});
		
		it('should allow a mimic to be injected', function(){
			given.	map.is.injectedInto(application).as('map');
			then.	expect(map).to(equal, application.map);
		});
	});
});