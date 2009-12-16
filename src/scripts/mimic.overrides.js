// Override ScrewUnit "it" to hook in Mimic verification
Screw.Specifications.itOriginal = Screw.Specifications.it;
Screw.Specifications.it = function(name, fnOriginal) {
	Screw.Specifications.itOriginal(name, function() {
		try {
			fnOriginal();
			Mimic.verify();
			Mimic.reset();
			if (thrown != null) {
				var expected = thrown;
				thrown = null;
				throw('An exception was expected to thrown and was not. The exception is: ' + expected);
			}
		} catch(exception) {
			Mimic.reset();
			if (thrown != null) {
				var expected = thrown;
				thrown = null;
				Screw.Matchers.expect(exception).to(Screw.Matchers.equal, expected);
			} else {
				throw(exception);
			}
		}
	});
};

// Override jQuery "text" so that error messages appear as html
jQuery.fn.text = function(text) {
	return this.html(text);
}