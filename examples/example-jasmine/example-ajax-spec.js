describe('Mimic.Ajax', function() {
	beforeEach(function() {
		jQuery('body').append('<div id="hello"></div>');
	});
	
	afterEach(function() {
		jQuery('#hello').remove();
	});

	it('should grab an example tweet from twitter', function (request) {
		request('http://www.twitter.com/example.tweet').toHaveResponse(Mimic.HTTP.SUCCESS, 'Here is my example tweet');
		
		// runs(function () {
			var success = function(response) {
				jQuery('#hello').text(response);
			}
			jQuery.ajax({'url': 'http://www.twitter.com/example.tweet', 'success': success });
		// }
		
		// waits(200);
		// runs(function () {
			expect(jQuery('#hello').text()).toEqual('Here is my example tweet');
		// });
	});	
});