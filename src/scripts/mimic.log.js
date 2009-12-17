Mimic.Log = function(calls, expectations) {
	this.calls = calls;
	this.expectations = expectations;	
	
	this.empty = function() {
		this.calls.empty();
		this.expectations.empty();
	};
}