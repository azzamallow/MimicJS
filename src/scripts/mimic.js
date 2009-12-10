function Mimic() {
	this.mimics = [];
	this.jQuery = null;
	this._value = null;
	
	this.reset = function() {
		if (this.jQuery != null) {
			this.jQuery._reset();
		}
		
		this.mimics = [];
	};
	
	this.that = function(value) {
		Mimic._value = value;
		return Mimic;
	};
	
	this.is = function(value) {
		if (this._value != value && !Mimic.Util.equals(this._value, value)) {
			throw('they dont equal');
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
};

Mimic = new Mimic();

function mimic(object) {
	var mimic;
	if (object.fn && object.fn.jquery) {
		mimic = Mimic.Object.JQuery;
		Mimic.jQuery = mimic();
	} else {
		mimic = new Mimic.Object();
		mimic._inject(object);
		Mimic.mimics.push(mimic);
	}

	return mimic;
}

function times(){};
function time(){};
function anything(){};

window.given = window;
window.when = window;
window.then = window;
window.and = window;
window.it = window;
window.should = window;
window.that = Mimic.that;
window.expect = Screw.Matchers.expect;

window.As = window;
window.a = window;
window.I = window;
window.want = window;
window.so = window;