Mimic.Expectations.JQuery = function() {
	this.expectations = [];
	
	this.add = function(selector, context) {
		var expectation = new Mimic.Expectation.JQuery(selector, context);
		this.expectations.push(expectation);
		
		return expectation;
	};
};

Mimic.Expectation.JQuery = function(selector, context) {
	this.selector = selector;
	this.context = context;
	this.functions = [];
	
	this.should = function(name) {
		return this.and(name);
	},
	
	this.and = function(name) {
		this.functions.push({'name': name, 'value': []});
		
		return this;
	};
	
	this.using = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
		this.functions[this.functions.length - 1].value = Mimic.Util.evalParameters(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
		
		return this;
	};
	
	this.hasFailedSelectorFrom = function(calls) {
		if (this.selector == null) {
			return false;
		}
		
		for (var i = 0; i < calls.length; i++) {
			if (this.selector == calls[i].selector) {
				return false;
			}
		}
		
		return true;
	};
	
	this.hasFailedExpectationsFrom = function(calls) {
		var failedExpectations = [];
		var expectationMet, brokenCall;
		
		for (var i = 0; i < this.functions.length; i++) {
			expectationMet = false;
			brokenCall = null;
			
			for (var j = 0; j < calls.length; j++) {
				if (calls[j].call != null) {
					if (Mimic.Util.equals(this.functions[i], calls[j].call)) {
						expectationMet = true;
					} else {
						if (this.functions[i].name == calls[j].call.name && 
							!Mimic.Util.equals(this.functions[i].value, calls[j].call.value)) {
							brokenCall = calls[j].call;
						}
					}
				}
			}
			
			if (expectationMet == false) {
				failedExpectations.push({'expectation': this.functions[i], 'call': brokenCall});
			}
		}

		return failedExpectations;
	};
};