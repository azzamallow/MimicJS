Mimic.Verify = function(mimic) {
	if (mimic._expect.grouped != null) {
		var grouped = mimic._expect.grouped();
		for (var i in grouped) {
			var expectations = grouped[i];
			var call = mimic._called[expectations[0].name];
			
			Mimic.Verify.Default(mimic, call, expectations);
		}
	} else {
		Mimic.Verify.JQuery(mimic);
	}
};