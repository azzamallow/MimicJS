Mimic.Object = function() {
	
	this.language = ['should', 'shouldNot'];

	this.should = function(callString, ignoreArg) {
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

		return this._expect.add(callString, true, parameterCount, -1);
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

		return this._expect.add(callString, false, parameterCount, -1);
	};
	
	this.mimic = function(object, root, callString) {
		var originalObject = object;
		
		for (var i = 0; i < this.language.length; i++) {
			var languageFunction = [];
			var functionString = eval('this.' + this.language[i] + '.toString()');
			
			languageFunction.push('object.');
			languageFunction.push(this.language[i]);
			languageFunction.push(' = ');
			languageFunction.push(functionString);
			
			eval(languageFunction.join(''));
		}
		
		for (var member in object) {
			if (typeof object[member] == 'function') { 
				var instrumentedFunction =  'object.' + member + ' = function(' + Mimic.Util.Parameters.arguments(object[member]) + ') { ' +
					'    if (root._called["' + callString + '"] == null) { root._called["' + callString + '"] = new Mimic.Call("' + callString + '"); } ' +  
			 		'    root._called["' + callString + '"].incrementCallCount();' +
					'	 root._called["' + callString + '"].parameters.push(Mimic.Util.Parameters.evaluate(' + Mimic.Util.Parameters.arguments(object[member]) + '));' +
			 		'    if (root._expect.returnFor("' + member + '", Mimic.Util.Array.clean([' + Mimic.Util.Parameters.arguments(object[member]) + '])) != null) { ' +
			 		'    	return root._expect.returnFor("' + member + '", Mimic.Util.Array.clean([' + Mimic.Util.Parameters.arguments(object[member]) + ']));' + 
			 		'    } else {' +
			 		'    	return object[member];' +
			 		'    }' +
					'	 // The actual implementation' +
					object[member].toString() + '();'
			 		'}';
			
				eval(instrumentedFunction);
			} else if (typeof object[member] == 'object' && object[member] != null && object[member].join == null) {
				object[member] = this.mimic(object[member], root, callString);
			}
		}
		
		object.originalObject = originalObject;
	}
};