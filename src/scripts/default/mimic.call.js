Mimic.Call = function(name) {
	this.name = name;
	this.callCount = 0;
	this.parameters = [];
	
	this.incrementCallCount = function() {
		this.callCount++;
	};
};