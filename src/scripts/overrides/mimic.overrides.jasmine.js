if (typeof jasmine !== 'undefined') {
	var jasmineIt = jasmine.Env.prototype.it;
	jasmine.Env.prototype.it = function(description, func) {
		return jasmineIt.call(this, description, function() {
			try {
				ajax = new Mimic.Ajax();
				ajax.start();
				func(ajax.request);

		        Mimic.verify();
   		        Mimic.reset();
 		        if (thrown != null) {
 		            var expected = thrown;
 		            thrown = null;
 		            throw('An exception was expected to be thrown but was not. The exception expected is:<br/><br/>' + expected);
 		        }
 		    } catch(e) {
 		        Mimic.reset();
 		        if (thrown != null) {
 		            var expected = thrown;
 		            thrown = null;
 		            expect(e).toEqual(expected);
 		        }
 		    }
		});
	};
}