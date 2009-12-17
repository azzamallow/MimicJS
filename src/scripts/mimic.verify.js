Mimic.Verify = function(mimic) {
	if (Mimic.Default && Mimic.Default.Log.expectations.group != null) {
		Mimic.Default.Verify(mimic);
	} else {
		Mimic.Verify.JQuery(mimic);
	}
};