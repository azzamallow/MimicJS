Mimic.Verifier = function(verifier) {
	this.verifier = verifier;
	
	this.verify = function() {
		this.verifier.verify();
	};
};