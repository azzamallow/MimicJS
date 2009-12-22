// Default

Mimic.Log.Default = new Mimic.Log(new Mimic.Calls(), new Mimic.Expectations());
Mimic.register(Mimic.Log.Default, new Mimic.Verifier(Mimic.Verifier.Default));
	
// jQuery
