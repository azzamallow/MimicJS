Mimic.Ajax = {
	requestMimic: {},
	
	_XMLHttpRequest: XMLHttpRequest,
	
	_request: null,
	
	ajaxData: [],
	
	monitor: function() {
		Mimic.Ajax.Instrument();
	},
	
	reset: function() {
		XMLHttpRequest = this._XMLHttpRequest;
		this.ajaxData = [];
	},
	
	requestsFrom: function(request) {
		this._request = request;
		return window;
	},
	
	respondsWith: function(response) {
		this.ajaxData.push({
			'request': this._request,
			'response': response
		});
	}
}