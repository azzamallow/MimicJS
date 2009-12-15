Mimic.Verify.JQuery = function(mimic) {
	var calls = mimic._called;
	
	for (var i in mimic._expect.expectations) {
		var expectation = mimic._expect.expectations[i];
		
		var failedSelector = expectation.hasFailedSelectorFrom(calls);
		if (failedSelector != false) {
			if (failedSelector.never == true) {
				throw ('The selector "' + expectation.selector +'" was expected to never be used, however it was!');
			} else {
				throw ('The selector "' + expectation.selector +'" was expected but was not used!');
			}
		}
		
		var failedExpectations = expectation.hasFailedExpectationsFrom(calls);
		if (failedExpectations.length > 0) {
			if (failedExpectations[0].call == null) {
				throw ('The function "' + failedExpectations[0].expectation.name + '" was expected but did not get called!');				
			} else if (failedExpectations[0].expectation.name == failedExpectations[0].call.name) { 
				throw ('The function "' + failedExpectations[0].expectation.name + '" was expected to be called with (' + Mimic.Util.Object.toString(failedExpectations[0].expectation.value) + ') but was called with (' + Mimic.Util.Object.toString(failedExpectations[0].call.value) + ')');
			}
		}
	}
}