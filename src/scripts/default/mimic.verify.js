Mimic.Default.Verify = function() {
	var expectations = Mimic.Default.Log.expectations;
	var calls = Mimic.Default.Log.calls;
	
	for (var i = 0; i < Mimic.Default.Log.expectations.expectations.length; i++) {
		var expectation = Mimic.Default.Log.expectations.expectations[i];
		
		if (expectation.mimic[expectation.name] == null) {
			throw('Your specification did not pass!<br/><p><b>' + expectation.name + '()</b> does not exist, however it is referenced in the specification');
		}
		
		if (expectation.throwz) {
			throw(expectation.throwz);
		}
		
		var callCount = calls.withName(expectation.mimic, expectation.name).length;
		if (expectation.callExpected == false) {
			if (callCount > 0) {
				throw('Your specification did not pass!<br/><p><b>' + expectation.name + '()</b> was called, but was not expected to be called');
			}
		} else {
			if (callCount == 0) {
				throw('Your specification did not pass!<br/><p><b>' + expectation.name + '()</b> was expected but did not get called!');
			}	
		}		
				
		var expectedCount = expectations.countFor(expectation.name);
		if (expectedCount != -1 && expectedCount != callCount) {
			throw('Your specification did not pass!<br/><p>The specification executed <b>' + expectation.name + '() ' + callCount + '</b> times, however the specification expected <b>' + expectation.name + '()</b> to be executed <b>' + expectedCount + '</b> times');
		}
		
		if (expectation.parameters.length > 0 && expectation.parameterCount == 0) {
			throw('Your specification did not pass!<br/><p><b>' + expectation.name + '()</b> does not accept any parameters. You must remove the parameters from the specification <b>' + expectation.name + '()</b>');
		} else if (expectation.parameters.length > expectation.parameters.slice(0, expectation.parameterCount).length) {
			throw('Your specification did not pass!<br/><p>The specification executed <b>' + expectation.name + '()</b> with <b>' + expectation.parameters.length + '</b> parameters, however the specification expected <b>' + expectation.name + '()</b> with <b>' + expectation.parameters.slice(0, expectation.parameterCount).length + '</b> parameters');
		}
	}
	
	var failedExpectations = expectations.failedParametersFrom(calls);
	var message = [];
	for (var i = 0; i < failedExpectations.length; i++) {
		if (message.length == 0) {
			message.push('Your specification did not pass!<br/><p>The specification expected <b>' + failedExpectations[i].name + '(' + Mimic.Util.Object.toString(failedExpectations[i].parameters) + ')</b>');
		} else {
			message.push(' or <b>' + failedExpectations[i].name + '(' + Mimic.Util.Object.toString(failedExpectations[i].parameters) + ')</b>');
		}
	}
	
	if (message.length > 0) {
		message.push('</p>');
		throw(message.join(''));
	}
}