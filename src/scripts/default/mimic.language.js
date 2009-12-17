Mimic.Default = {};
Mimic.Default.Log = new Mimic.Log(new Mimic.Calls(), new Mimic.Expectations());

Mimic.Language = function() {
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

		return Mimic.Default.Log.expectations.add(callString, true, parameterCount, -1);
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

		return Mimic.Default.Log.expectations.add(callString, false, parameterCount, -1);
	};
};