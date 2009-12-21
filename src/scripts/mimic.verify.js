Mimic.Verify = function(mimic) {
	if (Mimic.Default && Mimic.Default.Log.expectations.expectations != null) {
		Mimic.Default.Verify();
	} else {
		Mimic.Verify.JQuery(mimic);
	}
};