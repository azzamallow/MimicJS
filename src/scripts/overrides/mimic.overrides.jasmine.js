if (typeof jasmine != 'undefined') {
    jasmine.Block.prototype.execute = function(onComplete) {
        try {
			ajax = new Mimic.Ajax();
			ajax.start();
            this.func.apply(this.spec, [ajax.request]);

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
            } else {
                this.spec.fail(e);
            }
        }
        onComplete();
    };
}