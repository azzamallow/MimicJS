Mimic.Ajax.Instrument = function() {
	XMLHttpRequest = function() {
		this.onreadystatechange = null;
		this.readyState = -1;
		this.responseText = null;
		this.responseXML = null;
		this.status = -1;
		this.statusText = null;
	
		this.open = function(method, url, async, user, password) { 
			for (var data in Mimic.Ajax.ajaxData) {
				if (Mimic.Ajax.ajaxData[data].request === url) {
					this.responseText = Mimic.Ajax.ajaxData[data].response;
					this.status = 200;
					this.readyState = 4;
				}
			}
		};
		
		this.getAllResponseHeaders = function() {};
		this.getResponseHeader = function(header) {};
		this.setRequestHeader = function(header, value) {};
		
		this.send = function(data) {
			this.onreadystatechange(this);
		};
		
		this.abort = function() {};
	};
}