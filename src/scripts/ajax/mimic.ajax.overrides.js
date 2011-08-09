if (typeof jasmine !== 'undefined') {
	var itForAjax = jasmine.Env.prototype.it;
	jasmine.Env.prototype.it = function(description, func) {
		return itForAjax.call(this, description, function() {
			ajax = new Mimic.Ajax();
			ajax.start();
			func(ajax.request);
		});
	};
}