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

describe('defaults', function() {
	beforeEach(function() {
		Mimic.mimics = [];
	});
	
	it('should successfully create a mimic and add it to a list', function() {
		expect(Mimic.mimics.length).toEqual(0);
		
		var map = mimic(new Map());
		
		expect(Mimic.mimics.length).toEqual(1);
		expect(Mimic.mimics[0]).toEqual(map);
 	});

	it('should return itself if the developer tries to mimic an object which is already a mimic object', function() {
		var firstMimic = mimic(new Map());
		var secondMimic = mimic(firstMimic);
		
		expect(firstMimic).toEqual(secondMimic);
	});
	
	it('should error when exactly is used without a should being used', function() {
		itShould.say('The function "exactly" can only be used when the function "should" precedes it');
		mimic(new Map()).exactly(3, times);
	});
	
	it('should error when once is used without a should being used', function() {
		itShould.say('The function "once" can only be used when the function "should" precedes it');
		mimic(new Map()).once();
	});
	
	it('should error when once is used without a should being used', function() {
		itShould.say('The function "twice" can only be used when the function "should" precedes it');
		mimic(new Map()).twice();
	});
	
	it('should error when andReturn is used without a should being used', function() {
		itShould.say('The function "andReturn" can only be used when the function "should" precedes it');
		mimic(new Map()).andReturn();
	});
	
	it('should error when andThrow is used without a should being used', function() {
		itShould.say('The function "andThrow" can only be used when the function "should" precedes it');
		mimic(new Map()).andThrow();
	});
	
	it('should error when using is used without a should being used', function() {
		itShould.say('The function "using" can only be used when the function "should" precedes it');
		mimic(new Map()).using();
	});
	
	it('should reference the same mimic object if a reference to the same object is defined in two different places', function() {
		var Apple = function() {
			this.eat = function() {}
		};
		var theApple = new Apple();
		
		var Person = function() {
			this.apple = theApple;
			this.children = {
				apple: theApple
			}
		}
		var thePerson = mimic(new Person());
		
		thePerson.apple.eat();
		thePerson.children.apple.should('eat');
		expect(thePerson.apple).toEqual(thePerson.children.apple);
	});
});
