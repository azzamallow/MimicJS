describe('DOM element', function() {
	beforeEach(function() {
	    env = new jasmine.Env();
	    env.updateInterval = 0;

	    var suite = env.describe("suite", function() {
	      spec = env.it("spec", function() { });
	    });
	  });
	
	function match(value) {
	    return spec.expect(value);
	  }
	
	describe('when asserting for class names', function() {
		it('should match when only one class is available', function() {
			var element = document.createElement('div');
			element.className = 'theClassName';
			expect(element).toHaveClass('theClassName');
		});

		it('should match when only multiple classes is available', function() {
			var element = document.createElement('div');
			element.className = 'theClassName anotherClass   thirdClass';
			expect(element).toHaveClass('theClassName');
			expect(element).toHaveClass('anotherClass');
			expect(element).toHaveClass('thirdClass');
		});
		
		it('should not match when class name is not available', function() {
			var element = document.createElement('div');
			element.className = 'theClassName';
			expect((match(element).toHaveClass('anotherClass'))).toEqual(false);
		});
	});
});

// dom assertions
// --------------------------
// Basic
// -toHaveText
// Style
// -toHaveClass
// Surrounding elements
// -toHaveParent
// -toHaveChild
// -toHaveSibling
// Form
// -toHaveValue
// Events
// -toHaveClickEvent
// -toHaveDoubleClickEvent
// -toHaveFocusEvent
// -toHaveBlurEvent
// -toHaveChangeEvent
// -toHaveKeyDownEvent
// -toHaveKeyPressEvent
// -toHaveKeyUpEvent
// -toHaveMouseDownEvent
// -toHaveMouseUpEvent
// -toHaveMouseOverEvent
// -toHaveMouseOutEvent
// -toHaveMouseMoveEvent
// -toHaveResizeEvent
// -toHaveSelectEvent
// -toHaveLoadEvent
// -toHaveUnloadEvent