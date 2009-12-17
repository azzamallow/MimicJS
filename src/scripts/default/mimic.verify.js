Mimic.Verify.Default = function(mimic, called, expectations) {
	if (called == null) { 
		if (mimic[expectations[0].name] == null) {
			throw('Your specification did not pass!<br/><p><b>' + expectations[0].name + '()</b> does not exist, however it is referenced in the specification');
		} else if (expectations[0].callExpected == true) {
			throw ('Your specification did not pass!<br/><p><b>' + expectations[0].name + '()</b> was expected but did not get called!');
		}
		
		return;
	}
	
	var name = called.name;
	var totalExpectedCallCount = 0;
	for (var i in expectations) {
		if (expectations[i].callExpected == false) {
			throw('Your specification did not pass!<br/><p><b>' + name + '()</b> was called, but was not expected to be called')
		}
		
		if (expectations[i].throwz != null) {
			throw(expectations[i].throwz);
		}
		
		if (typeof expectations[i].callCount != 'number') {
			throw('A number must be provided when specifying the number of occurrences');
		}
		
		if (expectations[i].callCount == -1) {
			totalExpectedCallCount = -1;
		} else {
			totalExpectedCallCount += expectations[i].callCount;
		}
		
		if (expectations[i].parameters.length > 0 && expectations[i].parameterCount == 0) {
			throw('Your specification did not pass!<br/><p><b>' + name + '()</b> does not accept any parameters. You must remove the parameters from the specification <b>' + name + '()</b>');
		} else if (expectations[i].parameters.length > expectations[i].parameters.slice(0, expectations[i].parameterCount).length) {
			throw('Your specification did not pass!<br/><p>The specification executed <b>' + name + '()</b> with <b>' + expectations[i].parameters.length + '</b> parameters, however the specification expected <b>' + name + '()</b> with <b>' + expectations[i].parameters.slice(0, expectations[i].parameterCount).length + '</b> parameters');
		}
	}
	
	if (totalExpectedCallCount != -1 && called.callCount != totalExpectedCallCount) {
		throw('Your specification did not pass!<br/><p>The specification executed <b>' + name + '() ' + called.callCount + '</b> times, however the specification expected <b>' + name + '()</b> to be executed <b>' + totalExpectedCallCount + '</b> times');
	}
	
	var parameters = called.parameters;
	var failedExpectations = [];
	for (var i in expectations) {
		if (expectations[i].parameters.length == 0) {
			continue;
		}
		
		var count = expectations[i].callCount;
		if (count == -1) {
			count = 1;
		}
		
		for (var j = 0; j < count; j++) {
			var position = Mimic.Util.Array.contains(parameters, expectations[i].parameters);
			if (typeof position == 'number') {
				parameters[position] = null;
				parameters = Mimic.Util.Array.clean(parameters);
	  		} else {
	  			failedExpectations.push(expectations[i]);
	  		}
		}
	}
	
	var message = [];
	for (var i in failedExpectations) {
		if (message.length == 0) {
			message.push('Your specification did not pass!<br/><p>The specification executed <b>' + name + '(' + Mimic.Util.Object.toString(parameters[0]) + ')</b>, however the specification expected <b>' + name + '(' + Mimic.Util.Object.toString(failedExpectations[i].parameters) + ')</b>');
		} else {
			message.push(' or <b>' + name + '(' + Mimic.Util.Object.toString(failedExpectations[i].parameters) + ')</b>');
		}
	}
	
	if (message.length > 0) {
		message.push('</p>');
		throw(message.join(''));
	}
}