Mimic.Instrument = function(object, parentMimic, callPrefix) {
	for (var member in object) {
		var callString = member;
		if (callPrefix != null) {
			callString = callPrefix + '.' + callString;
		}
		
		if (typeof object[member] == 'function') { 
			var instrumentedFunction =  'object.' + member + ' = function(' + Mimic.Util.Parameters.arguments(object[member]) + ') { ' +
				'    Mimic.Log.Default.calls.add(new Mimic.Call(this, "' + member + '", Mimic.Util.Parameters.evaluate(' + Mimic.Util.Parameters.arguments(object[member]) + ')));' + 
		 		'    if (Mimic.Log.Default.expectations.returnFor("' + member + '", Mimic.Util.Array.clean([' + Mimic.Util.Parameters.arguments(object[member]) + '])) != null) { ' +
		 		'    	return Mimic.Log.Default.expectations.returnFor("' + member + '", Mimic.Util.Array.clean([' + Mimic.Util.Parameters.arguments(object[member]) + ']));' + 
		 		'    } else {' +
		 		'    	return object[member];' +
		 		'    }' +
				// '	 // The actual implementation' +
				// 				object[member].toString() + '();'
		 		'}';
		
			eval(instrumentedFunction);
		} else if (typeof object[member] == 'object' && object[member] != null && object[member].join == null) {
			Mimic.Instrument(object[member], object, callString);
		}
	}
	
	object._activeExpectations = [];
	
	var language = new Mimic.Language.Default();
	for (var member in language) {
		var languageFunction = [];
		
		if (typeof language[member] == 'function') { 
			var functionString = eval('language.' + member + '.toString()');	
			
			languageFunction.push('object.');
			languageFunction.push(member);
			languageFunction.push(' = ');
			languageFunction.push(functionString);
			languageFunction.push(';');
		
			eval(languageFunction.join(''));
		}
	}
	
	if (parentMimic != null) {
		object._parentMimic = parentMimic;
	}
	
	if (callPrefix != null) {
		object._callPrefix = callPrefix;
	}
};