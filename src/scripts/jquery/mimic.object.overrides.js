var originalJQuery = jQuery;

var chars = originalJQuery.browser.safari && parseInt(originalJQuery.browser.version) < 417 ?
		"(?:[\\w*_-]|\\\\.)" :
		"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",
	quickChild = new RegExp("^>\\s*(" + chars + "+)"),
	quickID = new RegExp("^(" + chars + "+)(#)(" + chars + "+)"),
	quickClass = new RegExp("^([#.]?)(" + chars + "*)");
	
var quickExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;

Mimic.Object.JQuery.find = function(selector) {
	var elems = originalJQuery.map(_jQueryMimic, function(elem){
		return Mimic.Object.JQuery.findElements( selector, elem );
	});

	return Mimic.Object.JQuery.pushStack( /[^+>] [^+>]/.test( selector ) || selector.indexOf("..") > -1 ?
		originalJQuery.unique(elems) :
		elems);
};


// Take an array of elements and push it onto the stack
// (returning the new matched element set)
Mimic.Object.JQuery.pushStack = function(elems) {
	// Build a new jQuery matched element set
	var ret = _jQueryMimic.mimicInit(elems);

	// Add the old object onto the stack (as a reference)
	ret.prevObject = _jQueryMimic;

	// Return the newly-formed element set
	return ret;
};

// Force the current matched set of elements to become
// the specified array of elements (destroying the stack in the process)
// You should use pushStack() in order to do this, but maintain the stack
Mimic.Object.JQuery.setArray = function(elems) {
	// Resetting the length to 0, then using the native Array push
	// is a super-fast way to populate an object with array-like properties
	_jQueryMimic.length = 0;
	Array.prototype.push.apply(_jQueryMimic, elems);

	return _jQueryMimic;
};

Mimic.Object.JQuery.findElements = function( t, context ) {
	// Quickly handle non-string expressions
	if ( typeof t != "string" )
		return [ t ];

	// check to make sure context is a DOM element or a document
	if ( context && context.nodeType != 1 && context.nodeType != 9)
		return [ ];

	// Set the correct context (if none is provided)
	context = context || document;

	// Initialize the search
	var ret = [context], done = [], last, nodeName;

	// Continue while a selector expression exists, and while
	// we're no longer looping upon ourselves
	while ( t && last != t ) {
		var r = [];
		last = t;

		t = originalJQuery.trim(t);

		var foundToken = false,

		// An attempt at speeding up child selectors that
		// point to a specific element tag
			re = quickChild,

			m = re.exec(t);

		if ( m ) {
			nodeName = m[1].toUpperCase();

			// Perform our own iteration and filter
			for ( var i = 0; ret[i]; i++ )
				for ( var c = ret[i].firstChild; c; c = c.nextSibling )
					if ( c.nodeType == 1 && (nodeName == "*" || c.nodeName.toUpperCase() == nodeName) )
						r.push( c );

			ret = r;
			t = t.replace( re, "" );
			if ( t.indexOf(" ") == 0 ) continue;
			foundToken = true;
		} else {
			re = /^([>+~])\s*(\w*)/i;

			if ( (m = re.exec(t)) != null ) {
				r = [];

				var merge = {};
				nodeName = m[2].toUpperCase();
				m = m[1];

				for ( var j = 0, rl = ret.length; j < rl; j++ ) {
					var n = m == "~" || m == "+" ? ret[j].nextSibling : ret[j].firstChild;
					for ( ; n; n = n.nextSibling )
						if ( n.nodeType == 1 ) {
							var id = originalJQuery.data(n);

							if ( m == "~" && merge[id] ) break;

							if (!nodeName || n.nodeName.toUpperCase() == nodeName ) {
								if ( m == "~" ) merge[id] = true;
								r.push( n );
							}

							if ( m == "+" ) break;
						}
				}

				ret = r;

				// And remove the token
				t = originalJQuery.trim( t.replace( re, "" ) );
				foundToken = true;
			}
		}

		// See if there's still an expression, and that we haven't already
		// matched a token
		if ( t && !foundToken ) {
			// Handle multiple expressions
			if ( !t.indexOf(",") ) {
				// Clean the result set
				if ( context == ret[0] ) ret.shift();

				// Merge the result sets
				done = originalJQuery.merge( done, ret );

				// Reset the context
				r = ret = [context];

				// Touch up the selector string
				t = " " + t.substr(1,t.length);

			} else {
				// Optimize for the case nodeName#idName
				var re2 = quickID;
				var m = re2.exec(t);

				// Re-organize the results, so that they're consistent
				if ( m ) {
					m = [ 0, m[2], m[3], m[1] ];

				} else {
					// Otherwise, do a traditional filter check for
					// ID, class, and element selectors
					re2 = quickClass;
					m = re2.exec(t);
				}

				m[2] = m[2].replace(/\\/g, "");

				var elem = ret[ret.length-1];

				// Try to do a global search by ID, where we can
				if ( m[1] == "#" && elem && elem.getElementById && !originalJQuery.isXMLDoc(elem) ) {
					// Optimization for HTML document case
					var oid = elem.getElementById(m[2]);

					// Do a quick check for the existence of the actual ID attribute
					// to avoid selecting by the name attribute in IE
					// also check to insure id is a string to avoid selecting an element with the name of 'id' inside a form
					if ( (originalJQueryy.browser.msie||originalJQuery.browser.opera) && oid && typeof oid.id == "string" && oid.id != m[2] )
						oid = jQuery('[@id="'+m[2]+'"]', elem)[0];

					// Do a quick check for node name (where applicable) so
					// that div#foo searches will be really fast
					ret = r = oid && (!m[3] || originalJQuery.nodeName(oid, m[3])) ? [oid] : [];
				} else {
					// We need to find all descendant elements
					for ( var i = 0; ret[i]; i++ ) {
						// Grab the tag name being searched for
						var tag = m[1] == "#" && m[3] ? m[3] : m[1] != "" || m[0] == "" ? "*" : m[2];

						// Handle IE7 being really dumb about <object>s
						if ( tag == "*" && ret[i].nodeName.toLowerCase() == "object" )
							tag = "param";

						r = originalJQuery.merge( r, ret[i].getElementsByTagName( tag ));
					}

					// It's faster to filter by class and be done with it
					if ( m[1] == "." )
						r = originalJQuery.classFilter( r, m[2] );

					// Same with ID filtering
					if ( m[1] == "#" ) {
						var tmp = [];

						// Try to find the element with the ID
						for ( var i = 0; r[i]; i++ )
							if ( r[i].getAttribute("id") == m[2] ) {
								tmp = [ r[i] ];
								break;
							}

						r = tmp;
					}

					ret = r;
				}

				t = t.replace( re2, "" );
			}

		}

		// If a selector string still exists
		if ( t ) {
			// Attempt to filter it
			var val = originalJQuery.filter(t,r);
			ret = r = val.r;
			t = originalJQuery.trim(val.t);
		}
	}

	// An error occurred with the selector;
	// just return an empty set instead
	if ( t )
		ret = [];

	// Remove the root context
	if ( ret && context == ret[0] )
		ret.shift();

	// And combine the results
	done = originalJQuery.merge( done, ret );

	return done;
};

Mimic.Object.JQuery.clean = function() {
	for (var i = 0; _jQueryMimic[i] != undefined; i++) {
		delete _jQueryMimic[i];
	}
};

