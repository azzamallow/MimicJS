var jQuery = mimic(jQuery);

Screw.Unit(function() {
	describe('jquery', function() {
		it('should assert against selector', function() {
			when.	jQuery('.enqueued');
			then.	jQuery().using('.enqueued');
		});

		it('should fail to assert against selector', function() {
			given.	jQuery('.inqueued');
			when.	jQuery().using('.enqueued');
			then.	it.should.say('The selector ".enqueued" was expected but was not used!');
		});
		
		it('should allow assertions of a selector never being used', function() {
			when.	jQuery('.enqueued');
			then.	jQuery().using('.it').neverHappens();
		});
		
		it('should allow a mimic version of jquery to return a basic object', function() {
			when.	jQuery('.it')[1].value;
		});
		
		it('should fail as the a selector was used when it was expected to not be used', function() {
			given.	jQuery('.enqueued');
			when.	jQuery().using('.enqueued').neverHappens();
			then.	it.should.say('The selector ".enqueued" was expected to never be used, however it was!');
		});
		
		it('should allow for simple assertions', function() {
			when.	jQuery('.enqueued').show();
			then.	jQuery().using('.enqueued').should('show');
		});
		
		it('should fail as assertion is wrong', function() {
			given.	jQuery('.enqueued').show();
			when.	jQuery().using('.enqueued').should('show2');
			then.	it.should.say('The function "show2" was expected but did not get called!');
		});
		
		it('should allow for multiple assertions in one should', function() {
			when.	jQuery('.enqueued').show().hide();
			then.	jQuery().using('.enqueued').should('show').and('hide');
		});
		
		it('should fail when allowing for multiple assertions in one should', function() {
			given.	jQuery('.enqueued').show().hide();
			when.	jQuery().using('.enqueued').should('show').and('hide2');
			then.	it.should.say('The function "hide2" was expected but did not get called!');
		});
		
		it('should fail when doing multiple assertions in multiple shoulds', function() {
			given.	jQuery('.enqueued').show().hide();
			when.	jQuery().using('.enqueued').should('show')
			and.	jQuery().using('.enqueued').should('hide2');
			then.	it.should.say('The function "hide2" was expected but did not get called!');
		});
		
		it('should allow for multiple assersions in multiple shoulds', function() {
			when.	jQuery('.enqueued').show().hide();
			then.	jQuery().using('.enqueued').should('show')
			and.	jQuery().using('.enqueued').should('hide');
		});
		
		it('should allow for a single assertion across multiple jquery calls', function() {
			when.	jQuery('.enqueued').show();
			and.	jQuery('.enqueued').hide();
			then.	jQuery().using('.enqueued').should('hide')
			and.	jQuery().using('.enqueued').should('show');
		});
		
		it('should fail for a single assertion across multiple jquery calls', function() {
			given.	jQuery('.enqueued').show();
			and.	jQuery('.enqueued').hide();
			when.	jQuery().using('.enqueued').should('show2')
			and.	jQuery().using('.enqueued').should('hide');
			then.	it.should.say('The function "show2" was expected but did not get called!');
		});
		
		it('should allow for an assertion of a function with a parameter', function() {
			given.	jQuery('.enqueued').show('speed');
			then.	jQuery().using('.enqueued').should('show').using('speed');
		});
		
		it('should fail for an assertion of a function with a parameter', function() {
			given.	jQuery('.enqueued').show('sp33d');
			when.	jQuery().using('.enqueued').should('show').using('speed');
			then.	it.should.say('The function "show" was expected to be called with ("speed") but was called with ("sp33d")');
		});
		
		it('should allow for an assertion of multiple functions with parameters', function() {
			given.	jQuery('.enqueued').show().tabs('select', 1);
			then.	jQuery().using('.enqueued').should('show').and('tabs').using('select', 1);
		});
		
		it('should fail for an assertion of a function with a parameter', function() {
			given.	jQuery('.enqueued').show().tabs('select', 1);
			when.	jQuery().using('.enqueued').should('show').and('tabz').using('select', 1);
			then.	it.should.say('The function "tabz" was expected but did not get called!');
		});
		
		it('should allow for an assertion of a function with multiple parameters', function() {
			given.	jQuery('.enqueued').attr({'key':'value'}, 'theName', [1,2,3,4]);
			then.	jQuery().using('.enqueued').should('attr').using({'key':'value'}, 'theName', [1,2,3,4]);
		});
		
		it('should fail for an assertion of a function with a parameter', function() {
			given.	jQuery('.enqueued').attr({'k3y':'valu3'}, 'theNam3', [1,2,3,'4']);
			when.	jQuery().using('.enqueued').should('attr').using({'key':'value'}, 'theName', [1,2,3,'4']);
			then.	it.should.say('The function "attr" was expected to be called with ({"key": "value"}, "theName", [1, 2, 3, "4"]) but was called with ({"k3y": "valu3"}, "theNam3", [1, 2, 3, "4"])');
		});
	});
});