Mimic.Verifier.JQuery = function(mimic) {
	var calls = mimic._called;
	
	for (var i in mimic._expect.expectations) {
		var expectation = mimic._expect.expectations[i];
		
		var failedSelector = expectation.hasFailedSelectorFrom(calls);
		if (failedSelector != false) {
			if (failedSelector.never == true) {
				throw('Your specification did not pass!<br/><p>The selector "<b>' + expectation.selector +'</b>" was expected to never be used, however it was!');
			} else {
				throw('Your specification did not pass!<br/><p>The selector "<b>' + expectation.selector +'</b>" was expected but was not used!');
			}
		}
		
		var failedExpectations = expectation.hasFailedExpectationsFrom(calls);
		if (failedExpectations.length > 0) {
			if (failedExpectations[0].call == null) {
				throw('Your specification did not pass!<br/><p>The function <b>' + failedExpectations[0].expectation.name + '()</b> was expected but did not get called!');				
			} else if (failedExpectations[0].expectation.name == failedExpectations[0].call.name) { 
				throw('Your specification did not pass!<br/><p>The function <b>' + failedExpectations[0].expectation.name + '()</b> was expected to be called with <b>(' + Mimic.Util.Object.toString(failedExpectations[0].expectation.value) + ')</b> but was called with <b>(' + Mimic.Util.Object.toString(failedExpectations[0].call.value) + ')</b>');
			}
		}
	}
}