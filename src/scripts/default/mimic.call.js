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
			if (this.calls[i].isRelatedTo(mimic) && this.calls[i].hasName(name)) {
				calls.push(this.calls[i]);
			}
		}
		
		return calls;
	};
	
	this.nextWithParameters = function(mimic, parameters) {
		for (var i = 0; i < this.calls.length; i++) {
			if (this.calls[i].isRelatedTo(mimic) && 
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
	
	this.isRelatedTo = function(thisMimic) {
		var current = this.mimic;
		while (current != thisMimic) {
			current = current._parentMimic;
			if (!current) {
				return false;
			}			
		}
		return true;
	};
	
	this.hasName = function(thisName) {
		var current = this.mimic;
		var name = this.name;
		
		while (thisName != name) {
			name = current._callPrefix + '.' + name;
			current = current._parentMimic;
			if (!current) {
				return false;
			}
		}
		return true;
	};
};