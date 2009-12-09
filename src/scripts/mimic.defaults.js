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

Screw.Specifications.title = function(fn) {};

$(Screw).bind('loaded', function() {
	$('.it').unbind('failed');
	$('.it').bind('failed', function(e, reason) {
      $(this).addClass('failed').append($('<p class="error">').html(reason.toString()))

      var file = reason.fileName || reason.sourceURL;
      var line = reason.lineNumber || reason.line;          
      if (file || line) {
        $(this).append($('<p class="error">').text('line ' + line + ', ' + file));
      }
    })
});

say = function(exception) {
	thrown = exception;
};

var thrown;
