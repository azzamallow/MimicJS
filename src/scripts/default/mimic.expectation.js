Mimic.Expectations = function() {
	this.expectations = [];
	
	this.add = function(name, callExpected, parameterCount, callCount) {
		for (var i in this.expectations) {
			if (this.expectations[i].name == name && this.expectations[i].callExpected != callExpected) {
				this.expectations[i] = null;
			}
		}
		this.expectations = Mimic.Util.Array.clean(this.expectations);
		
		var expectation = new Mimic.Expectation(name, callExpected, parameterCount, callCount);
		this.expectations.push(expectation);
		return expectation;
	};
	
	this.returnFor = function(name, parameters) {
		for (var i in this.expectations) {
			if (this.expectations[i].name == name && Mimic.Util.Array.equals(this.expectations[i].parameters, parameters)) {
				return this.expectations[i].returns;
			}
		}
	};
	
	this.countFor = function(name) {
		var expectedCount = 0;
		for (var i = 0; i < this.expectations.length; i++) {
			if (this.expectations[i].callCount == -1) {
				expectedCount = -1;
			} else {
				if (expectedCount == -1) {
					expectedCount = 0;
				}
				expectedCount += this.expectations[i].callCount;
			}
		}
		
		return expectedCount;
	};
	
	this.failedParametersFrom = function(calls) {
		var failedParametersForExpectations = [];
		var groupedCalls = calls.groupByName();
		
		for (var i in groupedCalls) {
			var groupedParameters = [];
			for (var j = 0; j < groupedCalls[i].length; j++) {
				groupedParameters.push(groupedCalls[i][j].parameters);
			}
			
			for (var j = 0; j < this.expectations.length; j++) {
				var position = Mimic.Util.Array.contains(groupedParameters, this.expectations[j].parameters);
				if (typeof position == 'boolean' && position == false) {
		  			failedParametersForExpectations.push({'call': groupedCalls[i][0], 'expectation': this.expectations[j]});
		  		} else {
					groupedParameters[position] = null;
					groupedParameters = Mimic.Util.Array.clean(groupedParameters);
				}
			}
			
			if (failedParametersForExpectations.length > 0) {
				return failedParametersForExpectations;
			}
		}
		
		return failedParametersForExpectations;
	};
	
	this.group = function() {
		var groups = [];
		
		for (var i in this.expectations) {
			var currentGroup = null;
			for (var j in groups) {
				if (groups[j][0].name == this.expectations[i].name) {
					currentGroup = groups[j];
				}
			}
			
			if (currentGroup == null) {
				groups.push([this.expectations[i]]);
			} else {
				currentGroup.push(this.expectations[i]);
			}
		}
		
		return groups;
	};
	
	this.empty = function() {
		this.expectations = [];
	};
};

Mimic.Expectation = function(name, callExpected, parameterCount, callCount) {
	this.name = name;
	this.callExpected = callExpected;
	this.callCount = callCount;
	this.parameterCount = parameterCount;
	this.parameters = [];
	this.returns = null;
	this.throwz = null;
	
	this.once = function() {
		return this.exactly(1, time);
	};
	
	this.twice = function() {
		return this.exactly(2, times);
	};
	
	this.exactly = function(callCount, times) {
		this.callCount = callCount;
		return this;
	};
	
	this.andReturn = function(value) {
		this.returns = value;
	};
	
	this.andThrow = function(value) {
		this.throwz = value;
	};
	
	this.using = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
		if (arg0 == anything) {
			return;
		}
		
		this.parameters = Mimic.Util.Parameters.evaluate(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
		return this;
	};
};