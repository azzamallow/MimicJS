if (jasmine !== undefined) {
	beforeEach(function() {
		this.addMatchers({
		    toHaveClass: function(expected) {
				if (this.actual instanceof jQuery) {
					return this.actual.hasClass(expected);
				} else {
					return this.actual.className.split(' ').indexOf(expected) !== -1;
				}
			},

			toHaveText: function(expected) {
				return this.actual.textContent.indexOf(expected) !== -1;
			},

			toHaveParent: function(expected) {
				var current = this.actual.parentNode;
				while (current !== null && current !== expected) {
					current = current.parentNode;
				}
				return current !== null;
			},
			
			toHaveChild: function(expected) {
				return _nodeListHas(this.actual.childNodes, expected)
			},
			
			toHaveSibling: function(expected) {
				if (this.actual.parentNode === null || expected.parentNode === null) {
					return false;
				}
				
				return this.actual.parentNode === expected.parentNode;
			},
		
			toHaveValue: function(expected) {
				return this.actual.value === expected;
			},
		});
		
		function _nodeListHas(childNodes, expected) {
			for (var i = 0; i < childNodes.length; i++) {
				if (childNodes[i] === expected) {
					return true;
				} else if (childNodes[i].hasChildNodes()) {
					if (_nodeListHas(childNodes[i].childNodes, expected)) {
						return true;
					}
				}
			}
			return false;
		}
	});
}