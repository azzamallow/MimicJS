Mimic.Ajax = {
	SUCCESS: 200,
	
	requestMimic: {},
	
	_XMLHttpRequest: XMLHttpRequest,
	
	_request: null,
	
	ajaxData: [],
	
	monitor: function () {
		Mimic.Ajax.Instrument();
	},
	
	reset: function () {
		XMLHttpRequest = this._XMLHttpRequest;
		this.ajaxData = [];
	},
	
	Request: function (url) {
		Mimic.Ajax._request = url;
		return Mimic.Ajax.matchers;
	},
	
	matchers: {
		toHaveResponse: function (status, text) {
			Mimic.Ajax.ajaxData.push({
				'request': Mimic.Ajax._request,
				'response': text
			});
		}
	}
}