Mimic.Expectations = function() {
	this.expectations = [];
	
	this.add = function(name, callExpected, parameterCount, callCount) {
		for (var i in this.expectations) {
			if (this.expectations[i].name == name && this.expectations[i].callExpected != callExpected) {
				this.expectations[i] = null;
			}
		}
		this.expectations = Mimic.Util.clean(this.expectations);
		
		var expectation = new Mimic.Expectation(name, callExpected, parameterCount, callCount);
		this.expectations.push(expectation);
		return expectation;
	};
	
	this.returnFor = function(name, parameters) {
		for (var i in this.expectations) {
			if (this.expectations[i].name == name && Mimic.Util.arrayEquals(this.expectations[i].parameters, parameters)) {
				return this.expectations[i].returns;
			}
		}
	};
	
	this.grouped = function() {
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
	}
};

Mimic.Expectation = function(name, callExpected, parameterCount, callCount) {
	this.name = name;
	this.callExpected = callExpected;
	this.callCount = callCount;
	this.parameterCount = parameterCount;
	this.parameters = [];
	this.returns = null;
	this.throws = null;
	
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
		this.throws = value;
	};
	
	this.using = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
		if (arg0 == anything) {
			return;
		}
		
		this.parameters = Mimic.Util.evalParameters(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
		return this;
	};
};