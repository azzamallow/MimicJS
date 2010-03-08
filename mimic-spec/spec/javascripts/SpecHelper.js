// Create a fake ScrewUnit so we can test it properly
var Screw = {
    Specifications: {
        it: function(name, fn) {
			fn();
		}
    },
    Matchers: {
        expect: function(actual) {
            return {
                to: function(matcher, expected, not) {
		          	if (actual != expected) {
			            throw('"' + actual + '" didnt match "' + expected + '"');
			        }
				}
            }
        }
    }
}