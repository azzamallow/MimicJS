if (typeof jasmine != 'undefined') {
    jasmine.Block.prototype.execute = function(onComplete) {
        try {
            this.func.apply(this.spec);

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

	jasmine.TrivialReporter.prototype.reportRunnerResultsOriginal = jasmine.TrivialReporter.prototype.reportRunnerResults;
	jasmine.TrivialReporter.prototype.reportRunnerResults = function(runner) {
		this.reportRunnerResultsOriginal(runner);
		
		if (Mimic.Coverage.passed == null) {
			return;
		}
		
		var className, description;
		if (Mimic.Coverage.passed != true) {
			className = 'runner failed';
			description = ', coverage failed. See report.';
			
		} else {
			className = 'runner passed';
			description = ', coverage passed.';
		}
		
		this.runnerDiv.setAttribute("class", className);
		this.runnerDiv.setAttribute("className", className);
		
		var coverageSpan = this.createDom('span');
		coverageSpan.appendChild(this.createDom('a', { className: 'description', href: '#'}, description));
		this.runnerDiv.appendChild(coverageSpan);
	};
	
	jasmine.JsApiReporter.prototype.reportRunnerResults = function(runner) {
		Mimic.Coverage.report();
	  	this.finished = true;
	};
}