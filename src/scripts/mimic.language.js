Mimic.Language = {
	inject: function(mimic) {
		if (mimic == undefined) {
			throw('An object to be injected must be provided');
		}
		
		Mimic.Language._mimic = mimic;
		return Mimic.Language;
	},
	
	into: function(object) {
		if (object == undefined) {
			throw('Cannot inject object into an object which has not been provided');
		}
				
		this._object = object;
		return this;
	},
	
	as: function(name) {
		if (name == null || name == '' || typeof name != 'string') {
			throw('Cannot inject object when a name is not provided');
		}
		
		this._object[name] = this._mimic;
		this._object = null;
		this._mimic = null;
	},
	
	that: function(value) {
		Mimic.Language._value = value;
		return Mimic.Language;
	},
	
	equals: function(value) {
		if (this._value != value && !Mimic.Util.Object.equals(this._value, value)) {
			throw('The value "' + this._value + '" was expected to equal "' + value + '", but does not.');
		}
		
		this._value = null;
	}
};

function times(){};
function time(){};
function anything(){};
function never(){};

window.given = window;
window.when = window;
window.then = window;
window.and = window;
window.it = window;
window.that = Mimic.Language.that;
window.inject = Mimic.Language.inject;
window.expect = Screw.Matchers.expect;
window.should = {
	alert: function(msg) {
		message = msg;
		return window;
	},
	
	pass: function() {},
	
	say: function(exception) {
		thrown = exception;
		return window;
	}
};

window.realAlert = window.alert;
window.alert = function(actualMessage) {
	if (message != undefined && message != null) {
		Screw.Matchers.expect(actualMessage).to(Screw.Matchers.equal, message);		
	} else {
		realAlert(actualMessage);
	}
}

var thrown, message;