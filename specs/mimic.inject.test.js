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
			given.	inject(map).into(application).as('map');
			then.	expect(map).to(equal, application.map);
		});
		
		it('should not allow a mimic to be injected because no mimic is provided', function() {
			this.	should.say('An object to be injected must be provided');
			when.	inject().into(application).as('map');
		});
		
		it('should not allow a mimic to be injected because no object to be injected into is provided', function() {
			this.	should.say('Cannot inject object into an object which has not been provided');
			when.	inject(map).into().as('map');
		});
		
		it('should not allow a mimic to be injected because no name was provided for the injected object', function() {
			this.	should.say('Cannot inject object when a name is not provided');
			when.	inject(map).into(application).as();
		});
		
		it('should not allow a mimic to be injected because a null name was provided for the injected object', function() {
			this.	should.say('Cannot inject object when a name is not provided');
			when.	inject(map).into(application).as(null);
		});
		
		it('should not allow a mimic to be injected because an empty name was provided for the injected object', function() {
			this.	should.say('Cannot inject object when a name is not provided');
			when.	inject(map).into(application).as('');
		});
		
		it('should not allow a mimic to be injected because an invalid name type was provided for the injected object', function() {
			this.	should.say('Cannot inject object when a name is not provided');
			when.	inject(map).into(application).as([1,2,3,4]);
		});
	});
});