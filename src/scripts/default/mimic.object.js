Mimic.Object = function(nested) {
	if (nested != true) {
		this._called = [];
		this._expect = new Mimic.Expectations();
		this._injectInto = null;

		this.is = this;

		this.injectedInto = function(object) {
			this._injectInto = object;
			return this;
		};

		this.as = function(name) {
			if (this._injectInto != null) {
				eval('this._injectInto.' + name + ' = this;');
			}
			this._injectInto = null;
		};

		this.should = function(theFunction) {
			var parameterCount = 0;
			if (this[theFunction] != null) {
				var parameters = Mimic.Util.parametersFrom(this[theFunction]);
				if (parameters != '') {
					parameterCount = parameters.split(',').length;
				}
			}

			return this._expect.add(theFunction, true, parameterCount, -1);
		};

		this.does = function(theFunction) {
			return this.should(theFunction);
		};

		this.shouldNot = function(theFunction) {
			var parameterCount = 0;
			if (this[theFunction] != null) {
				parameterCount = Mimic.Util.parametersFrom(this[theFunction]).split(',').length;
			}

			return this._expect.add(theFunction, false, parameterCount, -1);
		};
	}
	
	this._inject = function(object, root, callPrefix) {
		for(var member in object) {
			var callString = member;
			if (callPrefix != null) {
				callString = callPrefix + '.' + callString;
			}
			
			if (typeof object[member] == 'function') { 
				var theFunction = 'this.' + member + ' = function(' + Mimic.Util.parametersFrom(object[member]) + ') { ' +
					'    if (root._called["' + callString + '"] == null) { root._called["' + callString + '"] = new Mimic.Call("' + callString + '"); } ' +  
			 		'    root._called["' + callString + '"].incrementCallCount();' +
					'	 root._called["' + callString + '"].parameters.push(Mimic.Util.evalParameters(' + Mimic.Util.parametersFrom(object[member]) + '));' +
			 		'    if (root._expect.returnFor("' + member + '", Mimic.Util.clean([' + Mimic.Util.parametersFrom(object[member]) + '])) != null) { ' +
			 		'    	return root._expect.returnFor("' + member + '", Mimic.Util.clean([' + Mimic.Util.parametersFrom(object[member]) + ']));' + 
			 		'    } else {' +
			 		'    	return object[member];' +
			 		'    }' +
			 		'}';
				eval(theFunction);
			} else if (typeof object[member] == 'object' && object[member].join == null) {
				eval('this.' + member + ' =  childMimic(object[member], root, callString);');
			} else {
				eval('this.' + member + ' =  object[member];');
			}
		}
	};
};

function childMimic(object, root, callPrefix) {
	var mimic = new Mimic.Object(nested);
	mimic._inject(object, root, callPrefix);

	return mimic;
}

var nested = true;