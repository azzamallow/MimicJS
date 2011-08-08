describe('DOM element', function() {
	var env, spec;
	
	beforeEach(function() {
	    env = new jasmine.Env();
		env.matchersClass.prototype = jasmine.getEnv().currentSpec.getMatchersClass_().prototype;
	   	env.updateInterval = 0;

	    var suite = env.describe("suite", function() {
	      spec = env.it("spec", function() {
	      });
	    });
	
	    spyOn(spec, 'addMatcherResult');

	    this.addMatchers({
	      toPass: function() {
	        return lastResult().passed();
	      },
	      toFail: function() {
	        return !lastResult().passed();
	      }
	    });
	});
	
	function match(value) {
		return spec.expect(value);
	}

	function lastResult() {
	  return spec.addMatcherResult.mostRecentCall.args[0];
	}
		
	describe('For style assertions', function() {
		describe('when matching class names', function() {
			describe('and positively matching, then', function() {
				it('should match when only one class name is available', function() {
					var element = document.createElement('div');
					element.className = 'theClassName';
					expect(match(element).toHaveClass('theClassName')).toPass();
				});

				it('should match when multiple class names are available', function() {
					var element = document.createElement('div');
					element.className = 'theClassName anotherClass   thirdClass';
					expect(match(element).toHaveClass('theClassName')).toPass();
					expect(match(element).toHaveClass('anotherClass')).toPass();
					expect(match(element).toHaveClass('thirdClass')).toPass();
				});
		
				it('should not match when class name is not available', function() {
					var element = document.createElement('div');
					element.className = 'theClassName';
					expect(match(element).toHaveClass('anotherClass')).toFail();
				});
			});
		});
	});
	
	describe('For basic assertions', function() {
		describe('when matching text', function() {
			describe('and positively matching, then', function() {
				it('should match when an element has no other elements as children', function() {
					var element = document.createElement('div');
					element.innerHTML = 'this is some text in an element';
					expect(match(element).toHaveText('this is some text in an element')).toPass();
				});
				
				it('should match when an element has other elements as children', function() {
					var element = document.createElement('div');
					var child = document.createElement('span');
					element.appendChild(child);
					child.innerHTML = 'this is some text in an element';
					expect(match(element).toHaveText('this is some text in an element')).toPass();
				});
				
				it('should match when an element contains the expected text and some other text', function() {
					var element = document.createElement('div');
					element.innerHTML = 'Guess what? this is some text in an element and here is a bit extra';
					expect(match(element).toHaveText('this is some text in an element')).toPass();
				});
				
				it('should match when an elements text is wrapped in other elements', function() {
					var element = document.createElement('div');
					var child = document.createElement('span');
					element.innerHTML = 'this is some text ';
					element.appendChild(child);
					child.innerHTML = 'in an element';
					expect(match(element).toHaveText('this is some text in an element')).toPass();
				});
				
				it('should not match when an element does not contain the text', function() {
					var element = document.createElement('div');
					element.innerHTML = 'this is some text in an element';
					expect(match(element).toHaveText('more text that will not match')).toFail();
				});
				
				it('should not match when an element contains the text but capitalised', function() {
					var element = document.createElement('div');
					element.innerHTML = 'this is some text in an element';
					expect(match(element).toHaveText('THIS IS SOME TEXT IN AN ELEMENT')).toFail();
				});
			});
		});
	});
	
	describe('For surrounding element assertions', function() {
		describe('when matching parent elements', function() {
			describe('and positively matching, then', function() {
				it('should match when an element is the child of the parent element given', function() {
					var parent = document.createElement('div');
					var child = document.createElement('span');
					parent.appendChild(child);
					expect(match(child).toHaveParent(parent)).toPass();
				});
				
				it('should match when an element is the child of a parent which is not a direct parent', function() {
					var grandparent = document.createElement('div');
					var parent = document.createElement('div');
					var child = document.createElement('span');
					parent.appendChild(child);
					grandparent.appendChild(parent);
					expect(match(child).toHaveParent(grandparent)).toPass();
				});
				
				it('should not match when an element is not the child of the parent element given', function() {
					var parent = document.createElement('div');
					var child = document.createElement('span');
					expect(match(child).toHaveParent(parent)).toFail();
				});
				
				it('should not match when an element and the parent element given are the same', function() {
					var parent = document.createElement('div');
					expect(match(parent).toHaveParent(parent)).toFail();
				});
			});
		});
		
		describe('when matching child elements', function() {
			describe('and positively matching, then', function() {
				it('should match when an element is the parent of the child element given', function() {
					var parent = document.createElement('div');
					var firstChild = document.createElement('span');
					var secondChild = document.createElement('span');
					var thirdChild = document.createElement('span');
					parent.appendChild(firstChild);
					parent.appendChild(secondChild);
					parent.appendChild(thirdChild);
					expect(match(parent).toHaveChild(firstChild)).toPass();
					expect(match(parent).toHaveChild(secondChild)).toPass();
					expect(match(parent).toHaveChild(thirdChild)).toPass();
				});
				
				it('should match when an element is the parent of a child which is not a direct child', function() {
					var grandparent = document.createElement('div');
					var parent = document.createElement('div');
					var child = document.createElement('span');
					parent.appendChild(child);
					grandparent.appendChild(parent);
					expect(match(grandparent).toHaveChild(child)).toPass();
				});
				
				it('should match when an element is the parent of a child which is not a direct parent, and other siblings are involved', function() {
					var grandparent = document.createElement('div');
					var parent = document.createElement('div');
					var child = document.createElement('span');
					var anotherParent = document.createElement('div');
					var anotherChild = document.createElement('span');
					parent.appendChild(child);
					anotherParent.appendChild(anotherChild);
					grandparent.appendChild(parent);
					grandparent.appendChild(anotherParent);
					expect(match(grandparent).toHaveChild(child)).toPass();
					expect(match(grandparent).toHaveChild(anotherChild)).toPass();
				});
				
				it('should not match when an element is not the parent of the child element given', function() {
					var parent = document.createElement('div');
					var child = document.createElement('span');
					var otherChild = document.createElement('span');
					parent.appendChild(child);
					expect(match(parent).toHaveChild(otherChild)).toFail();
				});
			});
		});
		
		describe('when matching siblings of an element', function() {
			describe('and positively matching, then', function() {
				it('should match when an element is a sibling of the element given', function() {
					var parent = document.createElement('div');
					var firstChild = document.createElement('span');
					var secondChild = document.createElement('span');
					var thirdChild = document.createElement('span');
					parent.appendChild(firstChild);
					parent.appendChild(secondChild);
					parent.appendChild(thirdChild);
					expect(match(firstChild).toHaveSibling(secondChild)).toPass();
					expect(match(firstChild).toHaveSibling(thirdChild)).toPass();
				});
				
				it('should not match when an element is not a sibling of the element given', function() {
					var parent = document.createElement('div');
					var child = document.createElement('span');
					var anotherParent = document.createElement('div');
					var anotherChild = document.createElement('span');
					parent.appendChild(child);
					anotherParent.appendChild(anotherChild);
					expect(match(child).toHaveSibling(anotherChild)).toFail();
				});
				
				it('should not match when an element and the element given have no parents', function() {
					var element = document.createElement('div');
					var notRelatedElement = document.createElement('div');
					expect(match(element).toHaveSibling(notRelatedElement)).toFail();
				});
			});
		});
	});
	
	describe('for form element assertions', function() {
		describe('when matching the value of elements', function() {
			describe('and positively matching, then', function() {
				it('should match when input element has the expected value', function() {
					var input = document.createElement('input');
					input.value = 'this is the value';
					expect(match(input).toHaveValue('this is the value')).toPass();
				});
				
				it('should not match when the input element does not have the expected value', function() {
					var input = document.createElement('input');
					input.value = 'this is the value';
					expect(match(input).toHaveValue('nah, this is really the value')).toBeFalsy();
				});
				
				xit('should match when the select element has the expected value', function() {
					var select = document.createElement('select');
					var option1 = document.createElement('option');
					option1.value = 'first value';
					var option2 = document.createElement('option');
					option2.value = 'second value';
					select.appendChild(option1);
					select.appendChild(option2);
					expect(match(select).toHaveValue('second value')).toPass();
				});
			});
		});
	});	
});

// dom assertions
// --------------------------
// Form
// -toHaveValue
// -toHaveField
// -toBeEditable
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