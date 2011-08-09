if (typeof Mimic === 'undefined') {
	Mimic = {};
}

Mimic.Ajax = function () {
	var that = this;
	this.data = [];
	var matchers = function (url, ajax) {
		return {
			toHaveResponse: function (status, text) {
				ajax.data.push({ 'url': url, 'text': text, 'status': status });
			}
		};
	};
	
	this.request = function (url) {
		return matchers(url, that);
	};
	
	this.start = function () {
		XMLHttpRequest = function (ajax) {
			return function() {
				this.onreadystatechange = undefined;
				this.readyState = -1;
				this.responseText = null;
				this.responseXML = null;
				this.status = -1;
				this.statusText = null;
				this.open = function (method, url, async, user, password) { 
					for (var i = 0; i< ajax.data.length; i++) {
						if (ajax.data[i].url === url) {
							this.responseText = ajax.data[i].text;
							this.status = ajax.data[i].status;
							this.readyState = 4;
						}
					}
				};
				this.send = function (object) {
					if (this.onreadystatechange !== undefined) {
						this.onreadystatechange(this);
					}
				};
				this.getAllResponseHeaders = function() {};
				this.getResponseHeader = function(header) {};
				this.setRequestHeader = function(header, value) {};
				this.abort = function() {};
			};
		}(that);
	};
};

Mimic.HTTP = {
	'SUCCESS': 200,
	'INTERNAL_SERVER_ERROR': 500,
	'NOT_FOUND': 404	
};