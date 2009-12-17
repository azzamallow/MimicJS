Mimic.Calls = function() {
	this.calls = [];
	
	this.add = function(name, parameters) {
		this.calls.push(new Mimic.Call(name, parameters));
	};
	
	this.empty = function() {
		this.calls = [];
	}
};

Mimic.Call = function(name, parameters) {
	this.name = name;
	this.parameters = parameters;
};