if (typeof jasmine !== 'undefined') {
	var describeForAjax = jasmine.Env.prototype.describe;
	jasmine.Env.prototype.describe = function(description, specDefinitions) {
		return describeForAjax.call(this, description, function () {
			ajax = Mimic.Ajax.getInstance();
			ajax.start();
			specDefinitions.call(this, ajax.request);
		});
	};
	
	var beforeEachForAjax = jasmine.Env.prototype.beforeEach;
	jasmine.Env.prototype.beforeEach = function(beforeEachFunction) {
		return beforeEachForAjax.call(this, function () {
			beforeEachFunction.call(this, Mimic.Ajax.getInstance().request);
		});
	};
	
	var itForAjax = jasmine.Env.prototype.it;
	jasmine.Env.prototype.it = function(description, func) {
		return itForAjax.call(this, description, function () {
			func.call(this, Mimic.Ajax.getInstance().request);
		});
	};
}