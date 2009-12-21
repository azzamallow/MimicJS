Mimic.Default = {};
Mimic.Default.Log = new Mimic.Log(new Mimic.Calls(), new Mimic.Expectations());

Mimic.Language = function() {
	
	this._activeExpectations = [];
	
	this.should = function(callString, ignoreArg) {
		if (ignoreArg != undefined) {
			throw('Only one parameter can be provided for <b>should()</b>. To provide extra parameters try the following:<br/><p><b>should("'+ callString +'").using(' + ignoreArg + ', ...)</b></p>');
		}
		
		var parameterCount = 0;
		var theFunction  = this[callString];
		if (theFunction != null) {
			var parameters = Mimic.Util.Parameters.arguments(theFunction);
			if (parameters != '') {
				parameterCount = parameters.split(',').length;
			}
		}
		
		this._activeExpectations = [];
		this._activeExpectations.push(Mimic.Default.Log.expectations.add(this, callString, true, parameterCount));
		this._activeExpectations[0].unlimited = true;

		return this;
	};

	this.shouldNot = function(callString) {
		var parameterCount = 0;
		var theFunction  = eval('this.' + callString);
		if (theFunction != null) {
			var parameters = Mimic.Util.Parameters.arguments(theFunction);
			if (parameters != '') {
				parameterCount = parameters.split(',').length;
			}
		}
		
		this._activeExpectations = [];
		this._activeExpectations.push(Mimic.Default.Log.expectations.add(this, callString, false, parameterCount));
		this._activeExpectations[0].unlimited = true;
		
		return this;
	};
	
	this.once = function() {
		return this.exactly(1, time);
	};
	
	this.twice = function() {
		return this.exactly(2, times);
	};
	
	this.exactly = function(callCount, times) {
		if (typeof callCount != 'number') {
			throw('A number must be provided when specifying the number of occurrences');
		}
		
		if (this._activeExpectations.length == 0) {
			throw('not good');
		}
		
		this._activeExpectations[0].unlimited = false;
		for (var i = 0; i < callCount - 1; i++) {
			var expectation = Mimic.Default.Log.expectations.copy(this._activeExpectations[0]);
			Mimic.Default.Log.expectations.expectations.push(expectation);
			this._activeExpectations.push(expectation);
		}
		
		return this;
	};
	
	this.andReturn = function(value) {
		if (this._activeExpectations.length == 0) {
			throw('not good');
		}
		
		for (var i = 0; i < this._activeExpectations.length; i++) {
			this._activeExpectations[i].returns = value;
		}
	};
	
	this.andThrow = function(value) {
		if (this._activeExpectations.length == 0) {
			throw('not good');
		}
		
		for (var i = 0; i < this._activeExpectations.length; i++) {
			this._activeExpectations[i].throwz = value;
		}
	};
	
	this.using = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
		if (this._activeExpectations.length == 0) {
			throw('not good');
		}
		
		if (arg0 == anything) {
			return;
		}
		
		for (var i = 0; i < this._activeExpectations.length; i++) {
			this._activeExpectations[i].parameters = Mimic.Util.Parameters.evaluate(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
		}
		
		return this;
	};
};