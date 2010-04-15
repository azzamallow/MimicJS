Mimic.Language.Default = {
	_activeExpectations: [],
	
	should: function(callString, ignoreArg) {
		if (ignoreArg != undefined) {
			throw('Only one parameter can be provided for <b>should()</b>. To provide extra parameters try the following:<br/><p><b>should("'+ callString +'").using(' + ignoreArg + ', ...)</b></p>');
		}
		
		var parameterCount = 0;
		var theFunction  = eval('this.' + callString);
		if (theFunction != null) {
			var parameters = Mimic.Util.Parameters.arguments(theFunction);
			if (parameters != '') {
				parameterCount = parameters.split(',').length;
			}
		}
		
		var expectation = new Mimic.Expectation(this, callString, true, parameterCount);
		expectation.unlimited = true;
		Mimic.Log.Default.expectations.add(expectation);
		this._activeExpectations = [];
		this._activeExpectations.push(expectation);

		return this;
	},

	shouldNot: function(callString) {
		var parameterCount = 0;
		var theFunction  = eval('this.' + callString);
		if (theFunction != null) {
			var parameters = Mimic.Util.Parameters.arguments(theFunction);
			if (parameters != '') {
				parameterCount = parameters.split(',').length;
			}
		}
		
		var expectation = new Mimic.Expectation(this, callString, false, parameterCount);
		expectation.unlimited = true;
		Mimic.Log.Default.expectations.add(expectation);
		this._activeExpectations = [];
		this._activeExpectations.push(expectation);
		
		return this;
	},
	
	once: function() {
		if (this._activeExpectations.length == 0) {
			throw('The function "once" can only be used when the function "should" precedes it');
		}
		
		return this.exactly(1, time);
	},
	
	twice: function() {
		if (this._activeExpectations.length == 0) {
			throw('The function "twice" can only be used when the function "should" precedes it');
		}
		
		return this.exactly(2, times);
	},
	
	exactly: function(callCount, times) {
		if (typeof callCount != 'number') {
			throw('A number must be provided when specifying the number of occurrences');
		}
		
		if (this._activeExpectations.length == 0) {
			throw('The function "exactly" can only be used when the function "should" precedes it');
		}
		
		this._activeExpectations[0].unlimited = false;
		for (var i = 0; i < callCount - 1; i++) {
			var expectation = Mimic.Log.Default.expectations.copy(this._activeExpectations[0]);
			Mimic.Log.Default.expectations.add(expectation);
			this._activeExpectations.push(expectation);
		}
		
		return this;
	},
	
	andReturn: function(value) {
		if (this._activeExpectations.length == 0) {
			throw('The function "andReturn" can only be used when the function "should" precedes it');
		}
		
		for (var i = 0; i < this._activeExpectations.length; i++) {
			this._activeExpectations[i].returns = value;
		}
	},
	
	andThrow: function(value) {
		if (this._activeExpectations.length == 0) {
			throw('The function "andThrow" can only be used when the function "should" precedes it');
		}
		
		for (var i = 0; i < this._activeExpectations.length; i++) {
			this._activeExpectations[i].throwz = value;
		}
	},
	
	using: function() {
		if (this._activeExpectations.length == 0) {
			throw('The function "using" can only be used when the function "should" precedes it');
		}
		
		if (arguments[0] == anything) {
			return;
		}
		
		for (var i = 0; i < this._activeExpectations.length; i++) {
			this._activeExpectations[i].parameters = Mimic.Util.Object.clone(Array.apply(null, arguments));
		}
		
		return this;
	}
};