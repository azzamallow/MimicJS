var Gun = function() {
	this.handle = function() { return true; };
	this.rounds = function() { this.rounds = true; };
	this.shoot = function(distance, direction) { return distance; };
}
var theGun;

describe('screwunit', function() {		
	it('should override the original it function', function() {
		expect(Screw.Specifications.itOriginal).toBeDefined();
	});
	
	it('should change jquerys text function to use jquerys html function', function() {
		jQuery = originalJQuery; // other tests in the suite have changed jQuery, change it back momentarily
		jQuery('body').append('<div id="example"><span>exampleText</span></div>');
		
		expect(jQuery('#example').text()).toEqual(jQuery('#example').html());
		expect(jQuery('#example').text()).toEqual('<span>exampleText</span>');
		
		jQuery('#example').remove();
		jQuery = mimic(jQuery);
	});
	
	
	it('should do a simple verification and pass', function() {
		var simpleTest = function() {
			given.	theGun = mimic(new Gun());
			when.	theGun.handle();
			then.	theGun.should('handle');
		}
		
		Screw.Specifications.it('simple test', simpleTest);
		
		itShould.pass();
	});
	
	it('should do a simple verification and fail', function() {
		var simpleFailingTest = function() {
			given.	theGun = mimic(new Gun());
			when.	theGun.handle();
			then.	theGun.shouldNot('handle');
		}
		
		itShould.say('Your specification did not pass!<br/><p><b>handle()</b> was called, but was not expected to be called');
		
		Screw.Specifications.it('simple failing test', simpleFailingTest);
	});
});