function Mimic() {
	this.mimics = [];
	this.verifiers = [];
	this.logs = [];
	this.jQuery = null;
	this._value = null;
	
	this.register = function(log, verifier) {
		this.logs.push(log);
		this.verifiers.push(verifier);
	};
	
	this.reset = function() {
		for (var i = 0; i < this.logs.length; i++) {
			this.logs[i].empty();
		}
				
		if (this.jQuery != null) {
			this.jQuery._reset();
		}
	};
	
	this.verify = function() {
		for (var i = 0; i < this.verifiers.length; i++) {
			this.verifiers[i].verify();
		}
		
		if (this.jQuery != null) {
			Mimic.Verifier.JQuery(this.jQuery);
		}
	};
	
	this.isMimic = function(mimic) {
		return mimic._activeExpectations != null;
	};
};

Mimic = new Mimic();

function mimic(object, withImplementation) {
	if (!Mimic.isMimic(object)) {
		Mimic.Instrument(object, withImplementation);
		Mimic.mimics.push(object);
	}
	
	return object;
};