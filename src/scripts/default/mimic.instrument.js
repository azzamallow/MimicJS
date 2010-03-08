Mimic.Instrument = function(object, asPartial, parentMimic, callPrefix) {
	for (var member in object) {
		var callString = member;
		if (callPrefix != null) {
			callString = [callPrefix, '.', callString].join('');
		}
		
		if (typeof object[member] == 'function') { 
			var instrumentedFunction = ['object.', member, ' = function(', Mimic.Util.Parameters.arguments(object[member]), ') { ',
				'    Mimic.Log.Default.calls.add(new Mimic.Call(this, "', member, '", Mimic.Util.Parameters.evaluate(', Mimic.Util.Parameters.arguments(object[member]), ')));', 
		 		'    if (Mimic.Log.Default.expectations.returnFor("', member, '", Mimic.Util.Array.clean([', Mimic.Util.Parameters.arguments(object[member]), '])) != null) { ',
		 		'    	return Mimic.Log.Default.expectations.returnFor("', member, '", Mimic.Util.Array.clean([', Mimic.Util.Parameters.arguments(object[member]), ']));', 
		 		'    } else {'];

			if (asPartial == true) {
				instrumentedFunction = instrumentedFunction.concat([' return (', object[member].toString(), ')(', Mimic.Util.Parameters.arguments(object[member]), ');']);
			}
			
			instrumentedFunction = instrumentedFunction.concat(' } }');

			eval(instrumentedFunction.join(''));
		} else if (typeof object[member] == 'object' && object[member] != null && object[member].join == null) {
			if (!Mimic.isMimic(object[member])) {
				Mimic.Instrument(object[member], asPartial, object, callString);
			}
		}
	}
	
	object._activeExpectations = [];
	
	for (var member in Mimic.Language.Default) {
		var languageFunction = [];
		
		if (typeof Mimic.Language.Default[member] == 'function') { 
			var functionString = eval('Mimic.Language.Default.' + member + '.toString()');	
			eval(['object.', member, ' = ', functionString, ';'].join(''));
		}
	}
	
	if (parentMimic != null) {
		object._parentMimic = parentMimic;
	}
	
	if (callPrefix != null) {
		object._callPrefix = callPrefix;
	}
};