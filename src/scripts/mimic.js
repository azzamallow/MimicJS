function Mimic() {
	this.mimics = [];
	this.verifiers = [];
	this.logs = [];
	this.jQuery = null;
	this._value = null;
	
	this.addVerification = function(log, verifier) {
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
	
	this.clear = function() {
		this.mimics = [];
	};
	
	this.verify = function() {
		for (var i = 0; i < this.verifiers.length; i++) {
			this.verifiers[i]();
		}
		
		if (this.jQuery != null) {
			Mimic.Verify.JQuery(this.jQuery);
		}
	};
	
	this.isMimic = function(mimic) {
		if (mimic._activeExpectations != null) {
			return true;
		}
		
		return false;
	};
	
	this.that = function(value) {
		Mimic._value = value;
		return Mimic;
	};
	
	this.is = function(value) {
		if (this._value != value && !Mimic.Util.Object.equals(this._value, value)) {
			throw('The value ' + value + ' was expected to equal ' + this._value + ', but does not.');
		}
		
		this._value = null;
	};
	
	this.inject = function(mimic) {
		if (mimic == undefined) {
			throw('An object to be injected must be provided');
		}
		
		Mimic._mimic = mimic;
		return Mimic;
	};
	
	this.into = function(object) {
		if (object == undefined) {
			throw('Cannot inject object into an object which has not been provided');
		}
				
		Mimic._object = object;
		return Mimic;
	}
	
	this.as = function(name) {
		if (name == null || name == '' || typeof name != 'string') {
			throw('Cannot inject object when a name is not provided');
		}
		
		Mimic._object[name] = Mimic._mimic;
		Mimic._object = null;
		Mimic._mimic = null;
	};
};

Mimic = new Mimic();
Mimic.Verify = {};

function mimic(object) {
	var mimic;
	if (object.fn && object.fn.jquery) {
		mimic = Mimic.Object.JQuery;
		Mimic.jQuery = mimic();
		
		return mimic;
	} else {
		if (!Mimic.isMimic(object)) {
			Mimic.Instrument(object);
			Mimic.mimics.push(object);
		}
		
		return object;
	}
}

function times(){};
function time(){};
function anything(){};
function never(){};

window.given = window;
window.when = window;
window.then = window;
window.and = window;
window.it = window;
window.should = window;
window.that = Mimic.that;
window.inject = Mimic.inject;
window.expect = Screw.Matchers.expect;
window.pass = function() {};
window.say = function(exception) {
	thrown = exception;
	return window;
};


var thrown;
