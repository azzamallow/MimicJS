What is Mimic?
==============

Mimic is a specification framework for Javascript designed with Behaviour Driven Development (BDD) and agile in mind. Rather than simply providing the mechanics of most frameworks (such as stubbing, mocking), Mimic allows a developer to clearly specify the behaviour of an object using its natural syntax, making their unit tests concise and easy to read.

On top of this, Mimic provides the developer with the ability to assert the behaviour of jQuery. A developer can "mimic" the jQuery object, and any use of the object will be recorded and can be asserted in a specification.

Mimic is being developed more and more each day, and the effort will continue until Mimic is complete & consistent.

Mimic was conceived by azzamallow, and has the continued support of DiUS Computing Pty Ltd. Thanks guys :)

Mission Statement
=================

The primary goals for Mimic:
 * Bring the goodness of BDD, such as ubiquitous language and readable error messages, closer to the code base,
 * Force the developer to provide function and variable names that make the specification readable, hence making the codebase more meaningful,
 * Deter the use of technical grammar in the specification,
 * Become the preferred specification framework for Javascript.

Technology
==========

Mimic is built with raw Javascript and does not rely on any Javascript framework to be fully functional.

As it currently stands, Mimic is best used in conjunction with both the ScrewUnit & Jasmine testing framework. For the best experience it is recommended that Mimic is used with Jasmine or ScrewUnit, however Mimic is not limited to these frameworks and can be used with other testing frameworks out there (such as JSSpec).

Mimic currently works with all Webkit browsers (such as Safari and Google Chrome) and Gecko (Mozilla Firefox).

How To
======

Basic examples of how to use Mimic have been provided in the /examples folder. There are more complex examples on how to use Mimic the specs/ folder.

Creating a Mimic is easy. 

Instantiate a new object and wrap it in the mimic function:

    john = mimic(new Student());

From here you can now monitor the behaviour of the object and do assertion against it:

    john.enrolInSubject('Math');
    john.should('enrolInSubject').using('Math');
    
To verify the assertion, you will need to put Mimic in the context of a testing framework, either Jasmine or ScrewUnit will be fine. Mimic has been tailored to work with these frameworks, and hides the noisy overheads of verifying your assertions, keeping your tests as concise as possible:

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
    
All existing features within the testing frameworks (Jasmine and ScrewUnit) can be used in conjunction with Mimic.
    
Other assertions
----------------

Mimic offers all the assertions you would expect:

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

jQuery
------

Mimic offers assertions against jQuery calls within your objects as well.

To Mimic jQuery, simple do the following:

    mimic(jQuery);

Which allows you to do the following:

    it('should assert against selector', function() {
        given.  mimic(jQuery);
        when.	jQuery('.enqueued').show('something');
    	then.	jQuery().usingSelector('.enqueued').should('show').using('something');
    	and.    jQuery().usingSelector('.it').neverHappens();
    });

Mimic supports jQuery-1.2.6 currently and will support later versions soon :)
  
Other features
==============
    
Partials
--------

Mimic allows you to monitor the behaviour of the object you are actually testing. Simple declare a mimic as a partial:

    Student = function() {
        this.enrolInSubject = function(subject) {
            this.reallyEnrolInSubject(subject);
        };
        
        this.reallyEnrolInSubject(subject) {
            this.subject = subject;
        }
    }

    student = new Student();
    john = mimic(student, asPartial);

A specification may look like this:

    it('should really enrol in a subject', function() {
        student = new Student();
        
    	given.	john = mimic(student, asPartial);
	    when.	john.enrolInSubject('Math');
	    then.   john.should('reallyEnrolInSubject').using('Math');
    });

Deep monitoring
---------------

When creating a Mimic for a deep object, Mimic will recurse through the object and Mimic those objects as well. This allows for deep assertions, like the following:

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

 * Wikipedia BDD (http://en.wikipedia.org/wiki/Behavior_Driven_Development)
 * Jasmine (http://github.com/pivotal/jasmine)
 * ScrewUnit (http://github.com/nkallen/screw-unit)
 * jQuery (http://jquery.com/)