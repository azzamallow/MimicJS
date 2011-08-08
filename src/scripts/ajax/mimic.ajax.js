Mimic.Ajax = function () {
	var data = [];
	var matchers = function (url) {
		return {
			toHaveResponse: function (status, text) {
				data.push({
					'url': url,
					'text': text,
					'status': status
				});
			}
		};
	};
	
	this.request = function (url) {
		return matchers(url);
	};
	
	this.start = function () {
		XMLHttpRequest = function() {
			this.onreadystatechange = null;
			this.readyState = -1;
			this.responseText = null;
			this.responseXML = null;
			this.status = -1;
			this.statusText = null;
			this.open = function (method, url, async, user, password) { 
				for (var item in data) {
					if (data[item].url === url) {
						this.responseText = data[item].text;
						this.status = data[item].status;
						this.readyState = 4;
					}
				}
			};
			this.send = function (data) {
				this.onreadystatechange(this);
			};
			this.getAllResponseHeaders = function() {};
			this.getResponseHeader = function(header) {};
			this.setRequestHeader = function(header, value) {};
			this.abort = function() {};
		};
	};
};

Mimic.Ajax.Codes = {
	'SUCCESS': 200,
	'INTERNAL_SERVER_ERROR': 500	
};