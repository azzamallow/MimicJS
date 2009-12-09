Mimic.Call.JQuery = function(selector, context, call) {
	this.selector = selector;
	this.context = context;
	this.call = call;
	
	this.set = function(name, value) {
		this.call = {'name': name, 'value': value};
	};
};