function Mimic() {
	this.mimics = [];
	this.jQuery = null;
	this._value = null;
	
	this.reset = function() {
		for (var mimic in this.mimics) {
			this.mimics[mimic]._reset();
		}

		if (this.jQuery != null) {
			this.jQuery._reset();
		}
	};
	
	this.clear = function() {
		this.mimics = [];
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
	
	this.verify = function() {
		for (var mimic in this.mimics) {
			Mimic.Verify(this.mimics[mimic]);
		}
		
		if (this.jQuery != null) {
			Mimic.Verify(this.jQuery);
		}
	};
	
	this.isMimic = function(mimic) {
		if (mimic._inject != null) {
			return true;
		}
		
		return false;
	}
};

Mimic = new Mimic();

function mimic(object) {
	var mimic;
	if (object.fn && object.fn.jquery) {
		mimic = Mimic.Object.JQuery;
		Mimic.jQuery = mimic();
	} else {
		if (Mimic.isMimic(object)) {
			mimic = object;
		} else {
			mimic = new Mimic.Object();
			mimic._inject(object, mimic);
			Mimic.mimics.push(mimic);
		}		
	}

	return mimic;
}

function restore(mimic) {
	if (mimic == null) { return; }
	
	var object = mimic._originalObject;
	
	for (var i = 0; i < Mimic.mimics.length; i++) {
		if (Mimic.mimics[i] == mimic) {
			Mimic.mimics[i] = null;
			Mimic.mimics = Mimic.Util.Array.clean(Mimic.mimics);
		}
	}
	
	return object;
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
window.expect = Screw.Matchers.expect;
window.pass = function() {};
window.say = function(exception) {
	thrown = exception;
	return window;
};

var thrown;
