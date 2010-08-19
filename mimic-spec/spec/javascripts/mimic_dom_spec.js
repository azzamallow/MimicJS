describe('DOM element', function() {
	beforeEach(function() {
	    env = new jasmine.Env();
		env.matchersClass.prototype = jasmine.getEnv().currentSpec.getMatchersClass_().prototype;
	    env.updateInterval = 0;

	    var suite = env.describe("suite", function() {
	      spec = env.it("spec", function() { });
	    });
	});
	
	function match(value) {
		return spec.expect(value);
	}
	
	describe('For style assertions', function() {
		describe('when matching class names', function() {
			describe('and positively matching, then', function() {
				it('should match when only one class name is available', function() {
					var element = document.createElement('div');
					element.className = 'theClassName';
					expect(match(element).toHaveClass('theClassName')).toBeTruthy();
				});

				it('should match when multiple class names are available', function() {
					var element = document.createElement('div');
					element.className = 'theClassName anotherClass   thirdClass';
					expect(match(element).toHaveClass('theClassName')).toBeTruthy();
					expect(match(element).toHaveClass('anotherClass')).toBeTruthy();
					expect(match(element).toHaveClass('thirdClass')).toBeTruthy();
				});
		
				it('should not match when class name is not available', function() {
					var element = document.createElement('div');
					element.className = 'theClassName';
					expect(match(element).toHaveClass('anotherClass')).toBeFalsy();
				});
			});
		
			describe('and negatively matching, then', function() {
				it('should match when class name is not available', function() {
					var element = document.createElement('div');
					element.className = 'theClassName';
					expect(match(element).toNotHaveClass('anotherClass')).toBeTruthy();
				});
			
				it('should not match when multiple class names are available', function() {
					var element = document.createElement('div');
					element.className = 'theClassName xanotherClass thirdClass';
					expect(match(element).toNotHaveClass('anotherClass')).toBeTruthy();
				});
			
				it('should not match when one class name is available', function() {
					var element = document.createElement('div');
					element.className = 'theClassName';
					expect(match(element).toNotHaveClass('theClassName')).toBeFalsy();
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
					expect(match(element).toHaveText('this is some text in an element')).toBeTruthy();
				});
				
				it('should match when an element has other elements as children', function() {
					var element = document.createElement('div');
					var child = document.createElement('span');
					element.appendChild(child);
					child.innerHTML = 'this is some text in an element';
					expect(match(element).toHaveText('this is some text in an element')).toBeTruthy();
				});
				
				it('should match when an element contains the expected text and some other text', function() {
					var element = document.createElement('div');
					element.innerHTML = 'Guess what? this is some text in an element and here is a bit extra';
					expect(match(element).toHaveText('this is some text in an element')).toBeTruthy();
				});
				
				it('should match when an elements text is wrapped in other elements', function() {
					var element = document.createElement('div');
					var child = document.createElement('span');
					element.innerHTML = 'this is some text ';
					element.appendChild(child);
					child.innerHTML = 'in an element';
					expect(match(element).toHaveText('this is some text in an element')).toBeTruthy();
				});
				
				it('should not match when an element does not contain the text', function() {
					var element = document.createElement('div');
					element.innerHTML = 'this is some text in an element';
					expect(match(element).toHaveText('more text that will not match')).toBeFalsy();
				});
				
				it('should not match when an element contains the text but capitalised', function() {
					var element = document.createElement('div');
					element.innerHTML = 'this is some text in an element';
					expect(match(element).toHaveText('THIS IS SOME TEXT IN AN ELEMENT')).toBeFalsy();
				});
			});
			
			describe('and negatively matching, then', function() {
				it('should match when an element has no other elements as children', function() {
					var element = document.createElement('div');
					element.innerHTML = 'this is some text in an element';
					expect(match(element).toNotHaveText('something else')).toBeTruthy();
				});
				
				it('should not match when an element contain the text', function() {
					var element = document.createElement('div');
					element.innerHTML = 'this is some text in an element';
					expect(match(element).toNotHaveText('in an element')).toBeFalsy();
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
					expect(match(child).toHaveParent(parent)).toBeTruthy();
				});
				
				it('should match when an element is the child of a parent which is not a direct parent', function() {
					var grandparent = document.createElement('div');
					var parent = document.createElement('div');
					var child = document.createElement('span');
					parent.appendChild(child);
					grandparent.appendChild(parent);
					expect(match(child).toHaveParent(grandparent)).toBeTruthy();
				});
				
				it('should not match when an element is not the child of the parent element given', function() {
					var parent = document.createElement('div');
					var child = document.createElement('span');
					expect(match(child).toHaveParent(parent)).toBeFalsy();
				});
				
				it('should not match when an element and the parent element given are the same', function() {
					var parent = document.createElement('div');
					expect(match(parent).toHaveParent(parent)).toBeFalsy();
				});
			});
			
			describe('and negatively matching, then', function() {
				it('should match when an element is not the child of the parent element given', function() {
					var parent = document.createElement('div');
					var child = document.createElement('span');
					expect(match(child).toNotHaveParent(parent)).toBeTruthy();
				});
				
				it('should not match when an element is the child of the parent element given', function() {
					var parent = document.createElement('div');
					var child = document.createElement('span');
					parent.appendChild(child);
					expect(match(child).toNotHaveParent(parent)).toBeFalsy();
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
					expect(match(parent).toHaveChild(firstChild)).toBeTruthy();
					expect(match(parent).toHaveChild(secondChild)).toBeTruthy();
					expect(match(parent).toHaveChild(thirdChild)).toBeTruthy();
				});
				
				it('should match when an element is the parent of a child which is not a direct child', function() {
					var grandparent = document.createElement('div');
					var parent = document.createElement('div');
					var child = document.createElement('span');
					parent.appendChild(child);
					grandparent.appendChild(parent);
					expect(match(grandparent).toHaveChild(child)).toBeTruthy();
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
					expect(match(grandparent).toHaveChild(child)).toBeTruthy();
					expect(match(grandparent).toHaveChild(anotherChild)).toBeTruthy();
				});
				
				it('should not match when an element is not the parent of the child element given', function() {
					var parent = document.createElement('div');
					var child = document.createElement('span');
					var otherChild = document.createElement('span');
					parent.appendChild(child);
					expect(match(parent).toHaveChild(otherChild)).toBeFalsy();
				});
			});
			
			describe('and negatively matching, then', function() {
				it('should match when an element is not the parent of the child element given', function() {
					var parent = document.createElement('div');
					var otherElement = document.createElement('span');
					expect(match(parent).toNotHaveChild(otherElement)).toBeTruthy();
				});
				
				it('should not match when an element is the parent of the child element given', function() {
					var parent = document.createElement('div');
					var child = document.createElement('span');
					parent.appendChild(child);
					expect(match(parent).toNotHaveChild(child)).toBeFalsy();
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
					expect(match(firstChild).toHaveSibling(secondChild)).toBeTruthy();
					expect(match(firstChild).toHaveSibling(thirdChild)).toBeTruthy();
				});
				
				it('should not match when an element is not a sibling of the element given', function() {
					var parent = document.createElement('div');
					var child = document.createElement('span');
					var anotherParent = document.createElement('div');
					var anotherChild = document.createElement('span');
					parent.appendChild(child);
					anotherParent.appendChild(anotherChild);
					expect(match(child).toHaveSibling(anotherChild)).toBeFalsy();
				});
				
				it('should not match when an element and the element given have no parents', function() {
					var element = document.createElement('div');
					var notRelatedElement = document.createElement('div');
					expect(match(element).toHaveSibling(notRelatedElement)).toBeFalsy();
				});
			});
			
			describe('and negatively matching, then', function() {
				it('should match when an element is not a sibling of the element given', function() {
					var element = document.createElement('div');
					var notRelatedElement = document.createElement('div');
					expect(match(element).toNotHaveSibling(notRelatedElement)).toBeTruthy();
				});
				
				it('should not match when an element is a sibling of the element given', function() {
					var parent = document.createElement('div');
					var firstChild = document.createElement('span');
					var secondChild = document.createElement('span');
					parent.appendChild(firstChild);
					parent.appendChild(secondChild);
					expect(match(firstChild).toNotHaveSibling(secondChild)).toBeFalsy();
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
					expect(match(input).toHaveValue('this is the value')).toBeTruthy();
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
					expect(match(select).toHaveValue('second value')).toBeTruthy();
				});
			});
			
			describe('and negatively matching, then', function() {
				it('should match when input element does not have the expected value', function() {
					var input = document.createElement('input');
					input.value = 'this is the value';
					expect(match(input).toNotHaveValue('nah, this is really the value')).toBeTruthy();
				});
				
				it('should not match when the input element does not have the expected value', function() {
					var input = document.createElement('input');
					input.value = 'this is the value';
					expect(match(input).toNotHaveValue('this is the value')).toBeFalsy();
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