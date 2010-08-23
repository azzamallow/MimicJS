What is MimicJS?
================

MimicJS is a specification framework for Javascript designed with Behaviour Driven Development (BDD) and agile in mind. Rather than simply providing the mechanics of most frameworks (such as stubbing, mocking), MimicJS allows a developer to clearly specify the behaviour of an object using its natural syntax, making their unit tests concise and easy to read.

On top of this, MimicJS provides the developer with the ability to assert the behaviour of jQuery. A developer can "mimic" the jQuery object, and any use of the object will be recorded and can be asserted in a specification.

MimicJS was conceived by azzamallow, and has the continued support of DiUS Computing Pty Ltd. Thanks guys :)

MimicJS doesn't replace other BDD frameworks
============================================
MimicJS is designed to be used in conjunction with the testing framework of your choice. Working with these frameworks, MimicJS help developers write meaningful unit tests using BDD syntax.

MimicJS currently works seamlessly with both Jasmine and ScrewUnit, though is not limited to just these frameworks.

Releases
========

* [Version 0.3](http://github.com/azzamallow/MimicJS/tree/master/release/mimic-0.3.js) ([Release Notes](http://github.com/azzamallow/MimicJS/tree/master/release/mimic-0.3.txt))

Older releases
--------------

* [Version 0.2](http://github.com/azzamallow/MimicJS/tree/master/release/mimic-0.2.js) ([Release Notes](http://github.com/azzamallow/MimicJS/tree/master/release/mimic-0.2.txt))


Mission Statement
=================

The primary goals for MimicJS:

* Bring the goodness of BDD, such as ubiquitous language and readable error messages, closer to the code base,
* Force the developer to provide function and variable names that make the specification readable, hence making the codebase more meaningful,
* Deter the use of technical grammar in the specification,
* Become the preferred specification framework for Javascript.

Technology
==========

MimicJS is built with raw Javascript and does not rely on any Javascript framework to be fully functional.

As it currently stands, MimicJS is best used in conjunction with both the ScrewUnit and Jasmine testing frameworks. For the best experience it is recommended that MimicJS is used with Jasmine or ScrewUnit, however MimicJS is not limited to these frameworks and can be used with other testing frameworks out there (such as JSSpec).

MimicJS currently works with all Webkit browsers (such as Safari and Google Chrome) and Gecko (Mozilla Firefox).

How To
======

Working examples of how to use MimicJS have been provided in the [examples](http://github.com/azzamallow/MimicJS/tree/master/examples/) folder. There are more complex examples of how to use MimicJS in the [mimic-spec](http://github.com/azzamallow/MimicJS/tree/master/mimic-spec/spec/javascripts/) folder.

Creating a Mimic is easy. 

Instantiate a new object and wrap it in the mimic function:

    john = mimic(new Student());

From here you can now monitor the behaviour of the object and do assertions against it:

    john.enrolInSubject('Math');
    john.should('enrolInSubject').using('Math');
    
To verify the assertion, you will need to put Mimic in the context of a testing framework, either Jasmine or ScrewUnit will be fine. MimicJS has been tailored to work with these frameworks, and hides the noisy overheads of verifying your assertions, keeping your tests as concise as possible:

    it('should allow a student to enrol in a subject, function() {
        john.enrolInSubject('Math');
        john.should('enrolInSubject').using('Math');
    });
    
You can take this further and write your specifications in BDD 'Given, When, Then, And' format. Here is the complete example:

    it('should allow a student to enrol in a subject, function() {
        aStudent = new Student();
        
        given.  john = mimic(aStudent);
        when.   john.enrolInSubject('Math');
        then.   john.should('enrolInSubject').using('Math');
    });
    
All existing features within the testing frameworks (Jasmine and ScrewUnit) can be used in conjunction with MimicJS.
    
Other assertions
----------------

MimicJS offers all the assertions you would expect:

>`should(functionName);` Assert that an object should call the function given.
>
>`shouldNot(functionName);` Assert that an object should not call the function given.
>

In the context of a should or shouldNot, you can do the following:

>`exactly(numberOfTimes, times);` e.g. exactly(3, times) will assert that a function was called exactly three times.
>
>`once();` will assert that a function was called exactly once.
>
>`twice();` will assert that a function was called exactly twice.
>
>`using(params);` e.g. using('John') will assert that a function was called using the given params. Up to ten parameters can be given.
>
>`andReturn(returnValue);` e.g. andReturn('Math') will stub the function call and force it to return the value given.
>
>`andThrow(message);` e.g. andThrow('Something went wrong') will force a function call to throw with the message given.
>

You can also specify verify the following outcomes.

>`itShould.say(message); ` Verify an exception was thrown with the given message.
>
>`itShould.pass(); ` Doesn't do much, but is sometimes nice to explicitly say the spec should pass.
>
>`itShould.alert(message); ` Verify an alert was given with the given message.
>

DOM Testing
===========

DOM Testing allows a developer to make assertions against the state of the DOM. This feature is currently available for use with Jasmine.

    it('should ensure the item has the correct class', function() {
		item = document.getElementById('item');
	
		given.	expect(item).toNotHaveClass('selected');
		when.	object.selectItem();
		then.	expect(item).toHaveClass('selected');
    });

Other matchers
--------------

MimicJS offers the following matchers:

>`toHaveClass;` Asserts that an element has a class
>
>`toHaveText;` Asserts that an element has specific text
>
>`toHaveParent;` Asserts that an element has a specified element as its parent
>
>`toHaveChild;` Asserts that an element has a specified element as its child
>
>`toHaveSibling;` Asserts that an element has a specified element as its sibling
>
>`toHaveValue;` Asserts that an element has a value. 
>

All matchers can be used negatively as well. For example, toHaveClass has a matching assertion called toNotHaveClass.

More to come soon!

Ajax Testing
============

MimicJS also provides a simple ajax testing feature. This feature is still under development and will be improved over the coming months.

Ajax testing is not tied to any particular javascript framework. jQuery is being used in the example below.

    var callback = function(response) {
	    $('#response').text(response);
    }

    it('should do a basic ajax test', function() {
    	ajax.monitor();

        when.ajax.requestsFrom('http://www.twitter.com').then.ajax.respondsWith('hello world');

        when.	$.ajax({'url': 'http://www.twitter.com', 'success': callback });
		then.	expect($('#response').text()).toEqual('hello world');

        ajax.stop();    
    });

Other features
==============
    
Including Implementation
------------------------

MimicJS allows you to monitor the behaviour of the object you are actually testing. Simple declare a mimic withImplementation:

    Student = function() {
        this.enrolInSubject = function(subject) {
            this.reallyEnrolInSubject(subject);
        };
        
        this.reallyEnrolInSubject(subject) {
            this.subject = subject;
        }
    }

    student = new Student();
    john = mimic(student, withImplementation);

A specification may look like this:

    it('should really enrol in a subject', function() {
        student = new Student();
        
    	given.	john = mimic(student, withImplementation);
	    when.	john.enrolInSubject('Math');
	    then.   john.should('reallyEnrolInSubject').using('Math');
    });

Deep monitoring
---------------

When creating a Mimic for a deep object, MimicJS will recurse through the object and Mimic those objects as well. This allows for deep assertions, like the following:

    it('should monitor my deep object', function() {
    	given.	deepObject.First.Second();
	    then.	deepObject.should('First.Second');
    });

    it('should monitor my deep object in a different way', function() {
	    given.	deepObject.First.Second();
    	then.	deepObject.First.should('Second');
    });

Links to cool stuff
===================

 * Wikipedia BDD [http://en.wikipedia.org/wiki/Behavior_Driven_Development](http://en.wikipedia.org/wiki/Behavior_Driven_Development)
 * Jasmine [http://github.com/pivotal/jasmine](http://github.com/pivotal/jasmine)
 * ScrewUnit [http://github.com/nkallen/screw-unit](http://github.com/nkallen/screw-unit)
 * jQuery [http://jquery.com/](http://jquery.com/)