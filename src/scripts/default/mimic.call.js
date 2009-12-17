Mimic.Calls = function() {
	this.calls = [];
	
	this.add = function(call) {
		this.calls.push(call);
	};
	
	this.empty = function() {
		this.calls = [];
	};
	
	this.withName = function(name) {
		var calls = [];
		for (var i = 0; i < this.calls.length; i++) {
			if (this.calls[i].name == name) {
				calls.push(this.calls[i]);
			}
		}
		
		return calls;
	};
	
	this.groupByName = function() {
		var groupedByName = {};
		
		for (var i = 0; i < this.calls.length; i++) {
			if (groupedByName[this.calls[i].name] == null) {
				groupedByName[this.calls[i].name] = [this.calls[i]];
			} else {
				groupedByName[this.calls[i].name].push(this.calls[i])
			}
		}
		
		return groupedByName;
	};
};

Mimic.Call = function(name, parameters) {
	this.name = name;
	this.parameters = parameters;
};