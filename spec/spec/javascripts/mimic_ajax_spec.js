describe('Mimic.Ajax', function() {
	beforeEach(function() {
		ajax.monitor();
		if (jQuery('#hello').length == 0) {
			jQuery('body').append('<div id="hello"></div>');			
		}
	});
	
	afterEach(function() {
		ajax.reset();
		jQuery('#hello').empty();
	});

	it('should provide basic ajax request and response stubbing', function() {
		when.ajax.requestsFrom('http://www.twitter.com').then.ajax.respondsWith('hello world');

		tweet = new XMLHttpRequest();
		tweet.onreadystatechange = function(response) {
			jQuery('#hello').text(response.responseText);
		}
		tweet.open("GET", "http://www.twitter.com", true);
		tweet.send();
		
		then.expect(jQuery('#hello')[0]).toHaveText('hello world');
	});
	
	it('should set the neccassary variables on the XMLHttpRequest with a successful response', function() {
		when.ajax.requestsFrom('http://www.twitter2.com').then.ajax.respondsWith('hello world');
		
		tweet = new XMLHttpRequest();
		tweet.onreadystatechange = function(response) {}
		tweet.open("GET", "http://www.twitter2.com", true);
		tweet.send();
		
		then.expect(tweet.status).toEqual(200);
		and.expect(tweet.readyState).toEqual(4);
	});
	
	it('should allow basic ajax request and response stubbing when using jQuery ajax call', function() {
		when.ajax.requestsFrom('http://www.twitter3.com').then.ajax.respondsWith('called with jquery');
		
		var success = function(response, status) {
			jQuery('#hello').text(response);
		}
		
		when.	jQuery.ajax({'url': 'http://www.twitter3.com', 'success': success });
		then.	expect(jQuery('#hello').text()).toEqual('called with jquery');
	});	
	
	it('should allow ajax stubbing when using jQuery getJSON call', function() {
		when.ajax.requestsFrom('http://www.twitter4.com').then.ajax.respondsWith('[1,2,3,4]');
		
		var success = function(data) {
			jQuery('#hello').text(data.join(','));
		}
		
		when.	jQuery.getJSON('http://www.twitter4.com', success );
		then.	expect(jQuery('#hello').text()).toEqual('1,2,3,4');
	});
});