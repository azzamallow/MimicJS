Mimic.Instrument = function(object, withImplementation, parentMimic, callPrefix) {
	for (var member in object) {
		try {
			object[member];
		} catch(e) {
			if (e.message.indexOf('Permission denied') != -1) {
				continue;
			}
		}
		
		if (typeof object[member] == 'function') { 
			var instrumentedFunction = ['object.', member, ' = function(', Mimic.Util.Parameters.arguments(object[member]), ') { ',
				'    Mimic.Log.Default.calls.add(new Mimic.Call(this, "', member, '", Mimic.Util.Object.clone([', Mimic.Util.Parameters.arguments(object[member]), '])));', 
		 		'    if (Mimic.Log.Default.expectations.returnFor("', member, '", Mimic.Util.Array.clean([', Mimic.Util.Parameters.arguments(object[member]), '])) != null) { ',
		 		'    	return Mimic.Log.Default.expectations.returnFor("', member, '", Mimic.Util.Array.clean([', Mimic.Util.Parameters.arguments(object[member]), ']));', 
		 		'    } else {'];

			if (withImplementation == true) {
				instrumentedFunction = instrumentedFunction.concat([' return (', object[member].toString(), ')(', Mimic.Util.Parameters.arguments(object[member]), ');']);
			}
			
			instrumentedFunction = instrumentedFunction.concat(' } }');
			eval(instrumentedFunction.join(''));
		} else if (typeof object[member] == 'object' && object[member] != null && object[member].join == null) {
			if (!Mimic.isMimic(object[member])) {
				Mimic.Instrument(object[member], withImplementation, object, member);
			}
		}
	}
	
	object._activeExpectations = [];
	
	for (var member in Mimic.Language.Default) {
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