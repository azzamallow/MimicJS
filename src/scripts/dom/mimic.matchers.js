if (typeof jasmine != 'undefined') {
	beforeEach(function() {
		this.addMatchers({
		    toHaveClass: function(expected) { 
				return this.actual.className.split(' ').indexOf(expected) != -1;
			},
			
			toNotHaveClass: function(expected) {
				return !this.toHaveClass(expected);
			},
			
			toHaveText: function(expected) {
				return this.actual.textContent.indexOf(expected) != -1;
			},
			
			toNotHaveText: function(expected) {
				return !this.toHaveText(expected);
			},
			
			toHaveParent: function(expected) {
				var current = this.actual.parentNode;
				while (current != null && current != expected) {
					current = current.parentNode;
				}
				return current != null;
			},
			
			toNotHaveParent: function(expected) {
				return !this.toHaveParent(expected);
			},
			
			toHaveChild: function(expected) {
				return _nodeListHas(this.actual.childNodes, expected)
			},
			
			toNotHaveChild: function(expected) {
				return !_nodeListHas(this.actual.childNodes, expected)
			},
			
			toHaveSibling: function(expected) {
				if (this.actual.parentNode == null || expected.parentNode == null) {
					return false;
				}
				
				return this.actual.parentNode == expected.parentNode;
			},
			
			toNotHaveSibling: function(expected) {
				return !this.toHaveSibling(expected);
			},
			
			toHaveValue: function(expected) {
				return this.actual.value == expected;
			},
			
			toNotHaveValue: function(expected) {
				return !this.toHaveValue(expected);
			}
		});
	});
	
	
	function _nodeListHas(childNodes, expected) {
		for (var i = 0; i < childNodes.length; i++) {
			if (childNodes[i] == expected) {
				return true;
			} else if (childNodes[i].hasChildNodes()) {
				if (_nodeListHas(childNodes[i].childNodes, expected)) {
					return true;
				}
			}
		}
		return false;
	}
}