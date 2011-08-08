if (typeof jasmine != 'undefined') {
    jasmine.Block.prototype.execute = function(onComplete) {
        try {
			Mimic.Ajax.monitor();
            this.func.apply(this.spec, [Mimic.Ajax.Request]);

            Mimic.verify();
			Mimic.Ajax.reset();
            Mimic.reset();
            if (thrown != null) {
                var expected = thrown;
                thrown = null;
                throw('An exception was expected to be thrown but was not. The exception expected is:<br/><br/>' + expected);
            }
        } catch(e) {
			Mimic.Ajax.reset();
            Mimic.reset();
            if (thrown != null) {
                var expected = thrown;
                thrown = null;
                expect(e).toEqual(expected);
            } else {
                this.spec.fail(e);
            }
        }
        onComplete();
    };
}