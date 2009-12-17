Mimic.Verify = function(mimic) {
	if (Mimic.Default && Mimic.Default.Log.expectations.grouped != null) {
		var grouped = Mimic.Default.Log.expectations.grouped();
		for (var i in grouped) {
			var expectations = grouped[i];
			var call = Mimic.Default.Log.calls[expectations[0].name];
			
			Mimic.Default.Verify(mimic, call, expectations);
		}
	} else {
		Mimic.Verify.JQuery(mimic);
	}
};