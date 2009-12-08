Mimic.Object = function() {
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
	
	this._inject = function(object) {
		for(var member in object) {
			if (typeof object[member] == 'function') {
				var theFunction = 'this.' + member + ' = function(' + Mimic.Util.parametersFrom(object[member]) + ') { ' +
					'    if (this._called["' + member + '"] == null) { this._called["' + member + '"] = new Mimic.Call("' + member + '"); } ' +  
			 		'    this._called["' + member + '"].incrementCallCount();' +
					'	 this._called["' + member + '"].parameters.push(Mimic.Util.evalParameters(' + Mimic.Util.parametersFrom(object[member]) + '));' +
			 		'    if (this._expect.returnFor("' + member + '", Mimic.Util.clean([' + Mimic.Util.parametersFrom(object[member]) + '])) != null) { ' +
			 		'    	return this._expect.returnFor("' + member + '", Mimic.Util.clean([' + Mimic.Util.parametersFrom(object[member]) + ']));' + 
			 		'    } else {' +
			 		'    	return object[member];' +
			 		'    }' +
			 		'}';
				eval(theFunction);
			} else {
				eval('this.' + member + ' =  object[member];');
			}
		}
	};
};