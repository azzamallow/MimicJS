var Map = function() {}
var Application = function () {
	this.map;
};

var map, application;

Screw.Unit(function() {
	describe('inject', function() {
		title(function() {
			As.a('behaviour driven developer');
			I.want('to be able to inject mimic objects into another object');
			So.that('I can test the behaviour of my object correctly');
		});
		
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