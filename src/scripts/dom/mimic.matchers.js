if (typeof jasmine != 'undefined') {
	beforeEach(function() {
		this.addMatchers({
		    toHaveClass: function(expected) { 
				return this.actual.className.split(' ').indexOf(expected) != -1;
			}
		});
	});
}