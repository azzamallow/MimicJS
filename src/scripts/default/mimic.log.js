Mimic.Log = {
	
	this.called = [];
	this.expectations = new Mimic.Expectations();	
	
	this.reset = function() {
		this.called = [];
		this.expectations = new Mimic.Expectations();
	};
}