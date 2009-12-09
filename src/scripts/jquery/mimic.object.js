Mimic.Object.JQuery = function(selector, context) {
	return _jQueryMimic._$(selector, context);
};

Mimic.JQuery = function() {
	this._called = [];
	this._expect = new Mimic.Expectations.JQuery();
	
	this._$ = function(selector, context) {
		if (selector != null || context != null) {
			var call = new Mimic.Call.JQuery(selector, context);
			this._called.push(call);
		}
		
		return this;
	};
	
	this.create = function() {
		this._inject(jQuery);
		this._inject(jQuery.fn);
		
		return this;
	};
	
	this.using = function(selector, context) {
		return this._expect.add(selector, context);
	};
	
	this._inject = function(object) {
		for(var member in object) {
			if (typeof object[member] == 'function') {
				var theFunction = 'this.' + member + ' = function(' + Mimic.Util.parametersFrom(object[member]) + ') { ' +
					'    var call = new Mimic.Call.JQuery(); ' +
					'	 call.set("' + member + '", Mimic.Util.evalParameters(' + Mimic.Util.parametersFrom(object[member]) + '));' +
					'	 this._called.push(call);' + 
			 		'    return this;' +
			 		'}';
				eval(theFunction);
			} else {
				eval('this.' + member + ' =  object[member];');
			}
		}
	};
	
	this._reset = function() {
		this._called = [];
		this._expect = new Mimic.Expectations.JQuery();	
	};
};

var _jQueryMimic = new Mimic.JQuery().create();