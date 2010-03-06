if (typeof jasmine != 'undefined') {
	// Do not ammend the scope of this.func
	jasmine.Block.prototype.execute = function(onComplete) {  
	  try {
	    this.func;//.apply(this.spec);
	  } catch (e) {
	    this.spec.fail(e);
	  }
	  onComplete();
	};
}