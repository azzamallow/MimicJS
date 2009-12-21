Mimic.Expectations = function() {
	this.expectations = [];
	
	this.add = function(expectation) {
		for (var i in this.expectations) {
			if (this.expectations[i].name == expectation.name && this.expectations[i].callExpected != expectation.callExpected) {
				this.expectations[i] = null;
			}
		}
		this.expectations = Mimic.Util.Array.clean(this.expectations);
		this.expectations.push(expectation);
	};
	
	this.returnFor = function(name, parameters) {
		for (var i in this.expectations) {
			if (this.expectations[i].name == name && Mimic.Util.Array.equals(this.expectations[i].parameters, parameters)) {
				return this.expectations[i].returns;
			}
		}
	};
	
	this.copy = function(expectationToCopy) {
		var expectation = new Mimic.Expectation(expectationToCopy.mimic, expectationToCopy.name, expectationToCopy.callExpected, expectationToCopy.parameterCount);
		expectation.unlimited = expectationToCopy.unlimited;
		expectation.parameters = Mimic.Util.Object.clone(expectationToCopy.parameters);
		expectation.returns = expectationToCopy.returns;
		expectation.throwz = expectationToCopy.throwz;
		
		return expectation;
	}
	
	this.countFor = function(name) {
		var expectedCount = 0;
		for (var i = 0; i < this.expectations.length; i++) {
			if (this.expectations[i].unlimited == false) {
				if (expectedCount == -1) {
					expectedCount = 0;
				}
				expectedCount++;
			} else {
				expectedCount = -1;
			}
		}
		
		return expectedCount;
	};
	
	this.failedParametersFrom = function(calls) {
		var failedExpectations = [];
		
		for (var i = 0; i < this.expectations.length; i++) {
			var call = calls.withParameters(this.expectations[i].mimic, this.expectations[i].parameters);
			if (call != null) {
				call.checked = true;
			} else {
				failedExpectations.push(this.expectations[i]);						
			}
		}
		
		return failedExpectations;
	};
	
	this.empty = function() {
		this.expectations = [];
	};
};

Mimic.Expectation = function(mimic, name, callExpected, parameterCount) {
	this.mimic = mimic;
	this.name = name;
	this.callExpected = callExpected;
	this.parameterCount = parameterCount;
	this.unlimited = false;
	this.parameters = [];
	this.returns = null;
	this.throwz = null;
};