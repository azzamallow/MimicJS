Mimic.Calls = function() {
	this.calls = [];
	
	this.add = function(call) {
		this.calls.push(call);
	};
	
	this.empty = function() {
		this.calls = [];
	};
	
	this.withName = function(mimic, name) {
		var calls = [];
		for (var i = 0; i < this.calls.length; i++) {
			if (this.calls[i].isValidMimic(mimic) && this.calls[i].hasName(name)) {
				calls.push(this.calls[i]);
			}
		}
		
		return calls;
	};
	
	this.nextWithParameters = function(mimic, parameters) {
		for (var i = 0; i < this.calls.length; i++) {
			if (this.calls[i].isValidMimic(mimic) && 
				Mimic.Util.Object.equals(parameters, this.calls[i].parameters) && 
				this.calls[i].checked == false) {
				return this.calls[i];
			}
		}
		
		return null;
	};
};

Mimic.Call = function(mimic, name, parameters) {
	this.mimic = mimic;
	this.name = name;
	this.parameters = parameters;
	this.checked = false;
	
	this.isValidMimic = function(mimic) {
		if (this.mimic == mimic || this.mimic._parentMimic == mimic) {
			return true;
		}
		
		return false;
	};
	
	this.hasName = function(name) {
		return (this.name == name || (this.mimic._callPrefix + '.' + this.name) == name);
	};
};