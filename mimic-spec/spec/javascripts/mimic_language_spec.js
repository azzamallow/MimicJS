var map, application;

describe('inject', function() {
	beforeEach(function() {
		var Map = function() {};
		var Application = function () {
			this.map;
		};
		
		map = mimic(new Map());
		application = new Application();
	});
	
	it('should allow a mimic to be injected', function(){
		given.	inject(map).into(application).as('map');
		then.	expect(map).toEqual(application.map);
	});
	
	it('should not allow a mimic to be injected because no mimic is provided', function() {
		itShould.say('An object to be injected must be provided');
		when.	inject().into(application).as('map');
	});
	
	it('should not allow a mimic to be injected because no object to be injected into is provided', function() {
		itShould.say('Cannot inject object into an object which has not been provided');
		when.	inject(map).into().as('map');
	});
	
	it('should not allow a mimic to be injected because no name was provided for the injected object', function() {
		itShould.say('Cannot inject object when a name is not provided');
		when.	inject(map).into(application).as();
	});
	
	it('should not allow a mimic to be injected because a null name was provided for the injected object', function() {
		itShould.say('Cannot inject object when a name is not provided');
		when.	inject(map).into(application).as(null);
	});
	
	it('should not allow a mimic to be injected because an empty name was provided for the injected object', function() {
		itShould.say('Cannot inject object when a name is not provided');
		when.	inject(map).into(application).as('');
	});
	
	it('should not allow a mimic to be injected because an invalid name type was provided for the injected object', function() {
		itShould.say('Cannot inject object when a name is not provided');
		when.	inject(map).into(application).as([1,2,3,4]);
	});
	
	it('should allow an assertion of one value against another', function() {
		var value1 = 'hello';
		var value2 = 'hello';
		
		given.	that(value1).equals(value2);
	});
	
	it('should fail assertion of one value against another', function() {
		var value1 = 'hello';
		var value2 = 'hello2';
		
		itShould.say('The value "hello" was expected to equal "hello2", but does not.');
		when.	that(value1).equals(value2);
	});
});