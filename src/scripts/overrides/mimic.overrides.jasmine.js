if (typeof jasmine !== 'undefined') {
	var itForBehaviour = jasmine.Env.prototype.it;
	jasmine.Env.prototype.it = function(description, func) {
		return itForBehaviour.call(this, description, function() {
			try {
				func();
		        Mimic.verify();
   		        Mimic.reset();
 		        if (thrown !== undefined) {
 		            var expected = thrown;
 		            thrown = undefined;
 		            throw('An exception was expected to be thrown but was not. The exception expected is:<br/><br/>' + expected);
 		        }
 		    } catch(e) {
 		        Mimic.reset();
 		        if (thrown !== undefined) {
 		            var expected = thrown;
 		            thrown = null;
 		            expect(e).toEqual(expected);
 		        }
 		    }
		});
	};
}