if (typeof Mimic === 'undefined') {
	Mimic = {};
}

Mimic.Ajax = function () {
	data = [];
	var matchers = function (url) {
		return {
			toHaveResponse: function (status, text) {
				data.push({ 'url': url, 'text': text, 'status': status });
			}
		};
	};
	
	this.request = function (url) {
		return matchers(url);
	};
	
	this.start = function () {
		XMLHttpRequest = function () {
			this.onreadystatechange = undefined;
			this.readyState = -1;
			this.responseText = null;
			this.responseXML = null;
			this.status = -1;
			this.statusText = null;
			this.open = function (method, url, async, user, password) { 
				for (var i = 0; i< data.length; i++) {
					if (data[i].url === url) {
						this.responseText = data[i].text;
						this.status = data[i].status;
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
	};
};

Mimic.Ajax.getInstance = function() {
	if (Mimic.Ajax.instance == null) {
	    Mimic.Ajax.instance = new Mimic.Ajax();
	}

	return Mimic.Ajax.instance;
}

Mimic.HTTP = {
	'SUCCESS': 200,
	'INTERNAL_SERVER_ERROR': 500,
	'NOT_FOUND': 404	
};