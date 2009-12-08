var Map = function() {}
var Application = function () {
	this.map;
};

var map, application;

Screw.Unit(function() {
	describe('jquery', function() {
		before(function() {
			map = mimic(new Map());
			$ = mimic(jQuery);
		});
		
		it('should assert against selector', function() {
			when.	$('#id');
			then.	$().using('#id');
		});

		it('should fail to assert against selector', function() {
			given.	$('#id');
			when.	$().using('#id2');
			then.	it.should.say('The selector "#id2" was expected but was not used!');
		});
		
		it('should allow for simple assertions', function() {
			when.	$('#pagination').show();
			then.	$().using('#pagination').should('show');
		});
		
		it('should fail as assertion is wrong', function() {
			given.	$('#pagination').show();
			when.	$().using('#pagination').should('show2');
			then.	it.should.say('The function "show2" was expected but did not get called!');
		});
		
		it('should allow for multiple assertions in one should', function() {
			when.	$('#pagination').show().hide();
			then.	$().using('#pagination').should('show').and('hide');
		});
		
		it('should fail when allowing for multiple assertions in one should', function() {
			given.	$('#pagination').show().hide();
			when.	$().using('#pagination').should('show').and('hide2');
			then.	it.should.say('The function "hide2" was expected but did not get called!');
		});
		
		it('should fail when doing multiple assertions in multiple shoulds', function() {
			given.	$('#pagination').show().hide();
			when.	$().using('#pagination').should('show')
			and.	$().using('#pagination').should('hide2');
			then.	it.should.say('The function "hide2" was expected but did not get called!');
		});
		
		it('should allow for multiple assersions in multiple shoulds', function() {
			when.	$('#pagination').show().hide();
			then.	$().using('#pagination').should('show')
			and.	$().using('#pagination').should('hide');
		});
		
		it('should allow for a single assertion across multiple jquery calls', function() {
			when.	$('#pagination').show();
			and.	$('#pagination').hide();
			then.	$().using('#pagination').should('hide')
			and.	$().using('#pagination').should('show');
		});
		
		it('should fail for a single assertion across multiple jquery calls', function() {
			given.	$('#pagination').show();
			and.	$('#pagination').hide();
			when.	$().using('#pagination').should('show2')
			and.	$().using('#pagination').should('hide');
			then.	it.should.say('The function "show2" was expected but did not get called!');
		});
		
		it('should allow for an assertion of a function with a parameter', function() {
			given.	$('#pagination').show('speed');
			then.	$().using('#pagination').should('show').using('speed');
		});
		
		it('should fail for an assertion of a function with a parameter', function() {
			given.	$('#pagination').show('sp33d');
			when.	$().using('#pagination').should('show').using('speed');
			then.	it.should.say('The function "show" was expected to be called with ("speed") but was called with ("sp33d")');
		});
		
		it('should allow for an assertion of a function with multiple parameters', function() {
			given.	$('#pagination').attr({'key':'value'}, 'theName', [1,2,3,4]);
			then.	$().using('#pagination').should('attr').using({'key':'value'}, 'theName', [1,2,3,4]);
		});
		
		it('should fail for an assertion of a function with a parameter', function() {
			given.	$('#pagination').attr({'k3y':'valu3'}, 'theNam3', [1,2,3,'4']);
			when.	$().using('#pagination').should('attr').using({'key':'value'}, 'theName', [1,2,3,'4']);
			then.	it.should.say('The function "attr" was expected to be called with ({"key": "value"}, "theName", [1, 2, 3, "4"]) but was called with ({"k3y": "valu3"}, "theNam3", [1, 2, 3, "4"])');
		});
	});
});