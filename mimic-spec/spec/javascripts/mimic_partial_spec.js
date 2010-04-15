var Gun = function() {
	this.handle = function() { return true; };
	this.rounds = function() { this.rounds = true; };
	this.shoot = function(distance, direction) { return distance; };
}
var theGun;

describe('mimic types', function() {		
	it('should be able to monitor the behaviour of a partially mimicd object', function() {
		given.	theGun = new Gun();
		when.	mimic(theGun, asPartial);
		then.	expect(theGun.shoot('distance', 'direction')).toEqual('distance');
		and.	theGun.should('shoot').using('distance', 'direction');
	});
	
	it('should create a standard mimic object without monitoring partial behaviour', function() {
		given.	theGun = new Gun();
		when.	mimic(theGun);
		then.	expect(theGun.shoot('distance', 'direction')).toEqual(undefined);
		and.	theGun.should('shoot').using('distance', 'direction');
	});
	
	it('should allow overriding the return value of a partially mimicd object', function() {
		given.	theGun = new Gun();
		when.	mimic(theGun, asPartial);
		and.	theGun.should('shoot').using('distance', 'direction').andReturn('another value');
		then.	expect(theGun.shoot('distance', 'direction')).toEqual('another value');
	});
});