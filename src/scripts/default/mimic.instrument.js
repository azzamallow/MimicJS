Mimic.Instrument = function(object, root, callPrefix) {
	var language = new Mimic.Language();	
	var originalObject = object;
	
	for (var member in object) {
		var callString = member;
		if (callPrefix != null) {
			callString = callPrefix + '.' + callString;
		}
		
		if (typeof object[member] == 'function') { 
			var instrumentedFunction =  'object.' + member + ' = function(' + Mimic.Util.Parameters.arguments(object[member]) + ') { ' +
				'    Mimic.Default.Log.calls.add(new Mimic.Call(this, "' + callString + '", Mimic.Util.Parameters.evaluate(' + Mimic.Util.Parameters.arguments(object[member]) + ')));' + 
		 		'    if (Mimic.Default.Log.expectations.returnFor("' + member + '", Mimic.Util.Array.clean([' + Mimic.Util.Parameters.arguments(object[member]) + '])) != null) { ' +
		 		'    	return Mimic.Default.Log.expectations.returnFor("' + member + '", Mimic.Util.Array.clean([' + Mimic.Util.Parameters.arguments(object[member]) + ']));' + 
		 		'    } else {' +
		 		'    	return object[member];' +
		 		'    }' +
				// '	 // The actual implementation' +
				// 				object[member].toString() + '();'
		 		'}';
		
			eval(instrumentedFunction);
		} else if (typeof object[member] == 'object' && object[member] != null && object[member].join == null) {
			Mimic.Instrument(object[member], root, callString);
		}
	}
	
	object._activeExpectations = [];
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
	
	object.originalObject = originalObject;
};