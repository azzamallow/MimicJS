describe('Mimic.Ajax', function() {
	beforeEach(function() {
		if (jQuery('#hello').length === 0) {
			jQuery('body').append('<div id="hello"></div>');			
		}
	});
	
	afterEach(function() {
		jQuery('#hello').empty();
	});
	
	it('should provide a request', function (request) {
		expect(request).toBeDefined();
	});

	it('should provide basic ajax request and response stubbing', function (request) {
		request('http://www.twitter.com').toHaveResponse(Mimic.HTTP.SUCCESS, 'hello world');

		tweet = new XMLHttpRequest();
		tweet.onreadystatechange = function(response) {
			jQuery('#hello').text(response.responseText);
		}
		tweet.open("GET", "http://www.twitter.com", true);
		tweet.send();
		
		expect(jQuery('#hello')[0]).toHaveText('hello world');
	});
	
	it('should set the neccassary variables on the XMLHttpRequest with a successful response', function (request) {
		request('http://www.twitter2.com').toHaveResponse(Mimic.HTTP.SUCCESS, 'hello world');
		
		tweet = new XMLHttpRequest();
		tweet.onreadystatechange = function(response) {}
		tweet.open("GET", "http://www.twitter2.com", true);
		tweet.send();
		
		expect(tweet.status).toEqual(200);
		expect(tweet.readyState).toEqual(4);
	});
	
	it('should allow basic ajax request and response stubbing when using jQuery ajax call', function (request) {
		request('http://www.twitter3.com').toHaveResponse(Mimic.HTTP.SUCCESS, 'called with jquery');
		
		var success = function(response) {
			jQuery('#hello').text(response);
		}
		
		jQuery.ajax({'url': 'http://www.twitter3.com', 'success': success });
		expect(jQuery('#hello').text()).toEqual('called with jquery');
	});	
	
	it('should allow ajax stubbing when using jQuery getJSON call', function (request) {
		request('http://www.twitter4.com').toHaveResponse(Mimic.HTTP.SUCCESS, '[1,2,3,4]');
		
		var success = function(data) {
			jQuery('#hello').text(data.join(','));
		}
		
		jQuery.getJSON('http://www.twitter4.com', success);
		expect(jQuery('#hello').text()).toEqual('1,2,3,4');
	});
	
	it('should allow a 500 response', function (request) {
		request('http://www.twitter.com').toHaveResponse(Mimic.HTTP.INTERNAL_SERVER_ERROR);
		
		var error = function(response) {
			jQuery('#hello').text(response.status);
		}
		
		jQuery.ajax({'url': 'http://www.twitter.com', 'error': error });
		expect(parseInt(jQuery('#hello').text())).toEqual(Mimic.HTTP.INTERNAL_SERVER_ERROR);
	});
	
	it('should override the previous response specified', function (request) {
		request('http://www.twitter.com').toHaveResponse(Mimic.HTTP.INTERNAL_SERVER_ERROR, 'shouldnt be called');
		request('http://www.twitter.com').toHaveResponse(Mimic.HTTP.SUCCESS, 'should be called');
		
		var success = function(response) {
			jQuery('#hello').text(response);
		}
		
		jQuery.ajax({'url': 'http://www.twitter.com', 'success': success });
		expect(jQuery('#hello').text()).toEqual('should be called');
	});
});