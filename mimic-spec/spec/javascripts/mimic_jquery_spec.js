var jQuery = mimic(jQuery);

describe('jquery', function() {
	it('should assert against selector', function() {
		when.	jQuery('.enqueued');
		then.	jQuery().usingSelector('.enqueued');
	});

	it('should fail to assert against selector', function() {
		given.	jQuery('.inqueued');
		when.	jQuery().usingSelector('.enqueued');
		then.	itShould.say('Your specification did not pass!<br/><p>The selector "<b>.enqueued</b>" was expected but was not used!');
	});
	
	it('should allow assertions of a selector never being used', function() {
		when.	jQuery('.enqueued');
		then.	jQuery().usingSelector('.it').neverHappens();
	});
	
	it('should allow a mimic version of jquery to return a basic object', function() {
		when.	jQuery('.suite')[1].value;
	});
	
	it('should fail as the a selector was used when it was expected to not be used', function() {
		given.	jQuery('.enqueued');
		when.	jQuery().usingSelector('.enqueued').neverHappens();
		then.	itShould.say('Your specification did not pass!<br/><p>The selector "<b>.enqueued</b>" was expected to never be used, however it was!');
	});
	
	it('should allow for simple assertions', function() {
		when.	jQuery('.enqueued').show();
		then.	jQuery().usingSelector('.enqueued').should('show');
	});
	
	it('should fail as assertion is wrong', function() {
		given.	jQuery('.enqueued').show();
		when.	jQuery().usingSelector('.enqueued').should('show2');
		then.	itShould.say('Your specification did not pass!<br/><p>The function <b>show2()</b> was expected but did not get called!');
	});
	
	it('should allow for multiple assertions in one should', function() {
		when.	jQuery('.enqueued').show().hide();
		then.	jQuery().usingSelector('.enqueued').should('show').and('hide');
		//a change
	});
	
	it('should fail when allowing for multiple assertions in one should', function() {
		given.	jQuery('.enqueued').show().hide();
		when.	jQuery().usingSelector('.enqueued').should('show').and('hide2');
		then.	itShould.say('Your specification did not pass!<br/><p>The function <b>hide2()</b> was expected but did not get called!');
	});
	
	it('should fail when doing multiple assertions in multiple shoulds', function() {
		given.	jQuery('.enqueued').show().hide();
		when.	jQuery().usingSelector('.enqueued').should('show')
		and.	jQuery().usingSelector('.enqueued').should('hide2');
		then.	itShould.say('Your specification did not pass!<br/><p>The function <b>hide2()</b> was expected but did not get called!');
	});
	
	it('should allow for multiple assersions in multiple shoulds', function() {
		when.	jQuery('.enqueued').show().hide();
		then.	jQuery().usingSelector('.enqueued').should('show')
		and.	jQuery().usingSelector('.enqueued').should('hide');
	});
	
	it('should allow for a single assertion across multiple jquery calls', function() {
		when.	jQuery('.enqueued').show();
		and.	jQuery('.enqueued').hide();
		then.	jQuery().usingSelector('.enqueued').should('hide')
		and.	jQuery().usingSelector('.enqueued').should('show');
	});
	
	it('should fail for a single assertion across multiple jquery calls', function() {
		given.	jQuery('.enqueued').show();
		and.	jQuery('.enqueued').hide();
		when.	jQuery().usingSelector('.enqueued').should('show2')
		and.	jQuery().usingSelector('.enqueued').should('hide');
		then.	itShould.say('Your specification did not pass!<br/><p>The function <b>show2()</b> was expected but did not get called!');
	});
	
	it('should allow for an assertion of a function with a parameter', function() {
		given.	jQuery('.enqueued').show('speed');
		then.	jQuery().usingSelector('.enqueued').should('show').using('speed');
	});
	
	it('should fail for an assertion of a function with a parameter', function() {
		given.	jQuery('.enqueued').show('sp33d');
		when.	jQuery().usingSelector('.enqueued').should('show').using('speed');
		then.	itShould.say('Your specification did not pass!<br/><p>The function <b>show()</b> was expected to be called with <b>("speed")</b> but was called with <b>("sp33d")</b>');
	});
	
	it('should allow for an assertion of multiple functions with parameters', function() {
		given.	jQuery('.enqueued').show().tabs('select', 1);
		then.	jQuery().usingSelector('.enqueued').should('show').and('tabs').using('select', 1);
	});
	
	it('should fail for an assertion of a function with a parameter', function() {
		given.	jQuery('.enqueued').show().tabs('select', 1);
		when.	jQuery().usingSelector('.enqueued').should('show').and('tabz').using('select', 1);
		then.	itShould.say('Your specification did not pass!<br/><p>The function <b>tabz()</b> was expected but did not get called!');
	});
	
	it('should allow for an assertion of a function with multiple parameters', function() {
		given.	jQuery('.enqueued').attr({'key':'value'}, 'theName', [1,2,3,4]);
		then.	jQuery().usingSelector('.enqueued').should('attr').using({'key':'value'}, 'theName', [1,2,3,4]);
	});
	
	it('should fail for an assertion of a function with a parameter', function() {
		given.	jQuery('.enqueued').attr({'k3y':'valu3'}, 'theNam3', [1,2,3,'4']);
		when.	jQuery().usingSelector('.enqueued').should('attr').using({'key':'value'}, 'theName', [1,2,3,'4']);
		then.	itShould.say('Your specification did not pass!<br/><p>The function <b>attr()</b> was expected to be called with <b>({"key": "value"}, "theName", [1, 2, 3, "4"])</b> but was called with <b>({"k3y": "valu3"}, "theNam3", [1, 2, 3, "4"])</b>');
	});
	
	it('should allow calls to jquery objects with up to four parameters', function() {
		when.	jQuery('.enqueued').addClass('passed', 1);
		then.	jQuery().usingSelector('.enqueued').should('addClass').using('passed', 1);
	});
});