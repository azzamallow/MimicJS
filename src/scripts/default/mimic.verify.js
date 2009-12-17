Mimic.Default.Verify = function(mimic) {
	var expectations = Mimic.Default.Log.expectations;
	var calls = Mimic.Default.Log.calls;
	
	for (var i = 0; i < Mimic.Default.Log.expectations.expectations.length; i++) {
		var expectation = Mimic.Default.Log.expectations.expectations[i];
		
		if (mimic[expectation.name] == null) {
			throw('Your specification did not pass!<br/><p><b>' + expectation.name + '()</b> does not exist, however it is referenced in the specification');
		}
		
		if (expectation.throwz) {
			throw(expectation.throwz);
		}
		
		if (typeof expectation.callCount != 'number') {
			throw('A number must be provided when specifying the number of occurrences');
		}
		
		var callCount = calls.withName(expectation.name).length;
		if (callCount == 0) {
			throw('Your specification did not pass!<br/><p><b>' + expectation.name + '()</b> was expected but did not get called!');
		}
		
		var expectedCount = expectations.countFor(expectation.name);
		if (expectedCount != -1 && expectedCount != callCount) {
			throw('Your specification did not pass!<br/><p>The specification executed <b>' + expectation.name + '() ' + callCount + '</b> times, however the specification expected <b>' + expectation.name + '()</b> to be executed <b>' + expectation.callCount + '</b> times');
		}
		
		if (expectation.parameters.length > 0 && expectation.parameterCount == 0) {
			throw('Your specification did not pass!<br/><p><b>' + expectation.name + '()</b> does not accept any parameters. You must remove the parameters from the specification <b>' + expectation.name + '()</b>');
		} else if (expectation.parameters.length > expectation.parameters.slice(0, expectation.parameterCount).length) {
			throw('Your specification did not pass!<br/><p>The specification executed <b>' + expectation.name + '()</b> with <b>' + expectation.parameters.length + '</b> parameters, however the specification expected <b>' + expectation.name + '()</b> with <b>' + expectation.parameters.slice(0, expectation.parameterCount).length + '</b> parameters');
		}
		
		var failedParametersForExpectations = expectations.failedParametersFrom(calls);
		var message = [];
		for (var j = 0; j < failedParametersForExpectations.length; j++) {
			if (message.length == 0) {
				message.push('Your specification did not pass!<br/><p>The specification executed <b>' + expectation.name + '(' + Mimic.Util.Object.toString(failedParametersForExpectations[j]['call'].parameters) + ')</b>, however the specification expected <b>' + expectation.name + '(' + Mimic.Util.Object.toString(failedParametersForExpectations[j]['expectation'].parameters) + ')</b>');
			} else {
				message.push(' or <b>' + expectation.name + '(' + Mimic.Util.Object.toString(failedParametersForExpectations[j]['expectation'].parameters) + ')</b>');
			}
		}
		
		if (message.length > 0) {
			message.push('</p>');
			throw(message.join(''));
		}

		// for(var j = 0; j < Mimic.Default.Log.calls.calls.length; j++) {
		// 			var call = Mimic.Default.Log.calls.calls[j];
		// 			
		// 			if (call.name != expectation.name) {
		// 				throw('Your specification did not pass!<br/><p><b>' + expectation.name + '()</b> was called, but was not expected to be called');
		// 			}
		// 		}
	}
}