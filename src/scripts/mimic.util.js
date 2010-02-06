Mimic.Util = {}

Mimic.Util.Array = {
	contains: function(array1, array2) {
		if (array1 == null || array2 == null) {
			return false;
		}
		
  		for (var i = 0; i < array1.length; i++) {
    		if (Mimic.Util.Object.equals(array1[i], array2) == true) {
      			return i;
    		}
  		}
		
  		return false;
  	},

	position: function(array, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] == value) {
				return i;
			}
		}
		
		return -1;
	},
	
	clean: function(array) {
		var clean = [];
		
		for (var i = 0; i < array.length; i++) {
			if (array[i] != null) {
				clean.push(array[i]);
			}
		}
		
		return clean;
	}
}

Mimic.Util.Object = {
	equals: function(object1, object2, parents) {
		if (parents == null) {
			parents = [];
		}
		
		parents.push(object1);
		
		if (typeof object1 == 'number' && isNaN(object1) && 
			typeof object2 == 'number' && isNaN(object2)) {
			return true;
		}
		
		if (typeof object1 == 'object' && object1 == null && 
			typeof object2 == 'object' && object2 == null) {
			return true;
		}
		
		if (typeof object1 == 'undefined' && object1 == undefined && 
			typeof object2 == 'undefined' && object2 == undefined) {
			return true;
		}
				
		if (object1 == null || object2 == null) {
			return false;
		}
		
		for (var i in object1) {
			if (object1 == object1[i] && typeof object1 == typeof object1[i]) {
				continue;
			}
			
			var position = Mimic.Util.Array.position(parents, object1[i]);
			if (position != -1) {
				if (object1[i] != object2[i]) {
					return false;
				}
			} else if (typeof object1[i] != typeof object2[i]) {
				return false;
			} else if (typeof object1[i] == 'object' || typeof object1[i] == 'function' || isNaN(object1[i])) {
				if (this.equals(object1[i], object2[i], parents) == false) {
					return false;
				}	
			} else if (object1[i] != object2[i]) {
				return false;
			}
		}
		
		if (typeof object1 == typeof object2 && typeof object1 != 'object' && typeof object1 != 'function' && object1 != object2) {
			return false;
		}
		
		return true;
	},
	
	toString: function(object, withKey) {
		var string = [];
				
		for (var key in object) {
			if (object[key] == null) {
				string.push('null');
			} else if (typeof object[key] == 'object') {
				if (object[key].join != null) {
					string.push('[' + this.toString(object[key]) + ']');
				} else {
					string.push('{' + this.toString(object[key], true) + '}');
				}
			} else if (typeof object[key] == 'string') {
				if (withKey == true) {
					string.push('"' + key + '": "' + object[key] + '"');
				} else {
					string.push('"' + object[key] + '"');
				}
			} else {
				string.push(object[key]);
			}
		}
		
		return string.join(', ');
	},
	
	clone: function(object, parents) {
		var newObject = (object instanceof Array) ? [] : {};
		
		if (parents == null) {
			parents = [];
		}
		
		parents.push(object);
		
		if (typeof object != 'object') {
			return object;
		}
		
	  	for (var key in object) {
			var position = Mimic.Util.Array.position(parents, object[key]);
			if (position != -1) {
				newObject[key] = parents[position];
			} else if (object[key] && typeof object[key] == 'object') {
	      		newObject[key] = Mimic.Util.Object.clone(object[key], parents);
	    	} else {
		 		newObject[key] = object[key];
			}
	  	} 
	
		return newObject;
	}
}

Mimic.Util.Parameters = {
	evaluate: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
		var parameters = [];
		for (var i = 0; i < 10; i++) {
			var evaluated = eval('arg' + i);
			if (typeof evaluated != 'undefined') {
				if (evaluated == null) {
					parameters.push(evaluated);
				} else {
					parameters.push(Mimic.Util.Object.clone(evaluated));
				}
			}
		}
		
		return parameters;
	},
	
	arguments: function(theFunction) {
		return theFunction.toString().replace(/ /g, "").split("(")[1].split(")")[0];
	}
}