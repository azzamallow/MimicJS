Mimic.Object = {};
Mimic.Object.JQuery = function(selector, context) {
	return _jQueryMimic.mimicInit(selector, context);
};

Mimic.JQuery = function() {
	this._called = [];
	this._expect = new Mimic.Expectations.JQuery();
	
	this.mimicInit = function(selector, context) {
		if (selector != null && typeof selector == 'string') {
			var call = new Mimic.Call.JQuery(selector, context);
			this._called.push(call);			
		}
		
		// Code below is copied from jQuery.fn.init() and edited for 'mimic'ing;
		selector = selector || document;
		
		if (selector.nodeType) {
			Mimic.Object.JQuery.clean();
			this[0] = selector;
			this.length = 1;
			return this;
		}
		if (typeof selector == 'string') {
			var match = quickExpr.exec(selector);
			if (match && (match[1] || !context)) {
				if (match[1]) {
					selector = originalJQuery.clean([match[1]], context);
				} else {
					var elem = document.getElementById(match[3]);
					if (elem) {
						if (elem.id != match[3]) {
							return this.mimicInit()._find(selector);
						}
						return this.mimicInit(elem);
					}
					selector = [];
				}
			} else {
				return this.mimicInit(context)._find(selector);
			}
		} else if (originalJQuery.isFunction(selector)) {
			return this.mimicInit(document)[ originalJQuery.fn.ready ? "ready" : "load" ](selector);
		}
		
		Mimic.Object.JQuery.clean();
		
		return Mimic.Object.JQuery.setArray(originalJQuery.makeArray(selector));
	};
	
	this.create = function() {
		this._inject(jQuery);
		this._inject(jQuery.fn);
		
		return this;
	};
	
	this.usingSelector = function(selector, context) {
		return this._expect.add(selector, context);
	};
	
	this._find = function(selector) {
		return Mimic.Object.JQuery.find(selector);
	};
	
	this._inject = function(object) {
		for(var member in object) {
			if (typeof object[member] == 'function') {
				eval(['this.', member, ' = function(', Mimic.Util.Parameters.arguments(object[member]), ') { ',
					'    var call = new Mimic.Call.JQuery(); ',
					'	 call.set("', member, '", Mimic.Util.Object.clone([', Mimic.Util.Parameters.arguments(object[member]), ']));',
					'	 this._called.push(call);', 
			 		'    return this;',
			 		'}'].join(''));
			} else {
				eval(['this.', member, ' =  object[member];'].join(''));
			}
		}
	};
	
	this._reset = function() {
		this._called = [];
		this._expect = new Mimic.Expectations.JQuery();	
	};
};

var _jQueryMimic = new Mimic.JQuery().create();