Mimic.Util = {
	contains: function(array1, array2) {
		if (array1 == null || array2 == null) {
			return false;
		}
		
		var contains = false;
  		for (var i = 0; i < array1.length; i++) {
    		if (this.arrayEquals(array1[i], array2) == true) {
      			return i;
    		}
  		}
		
  		return contains;
  	},
	
	arrayEquals: function(array1, array2) {
		if (array1 == null || array2 == null) {
			return false;
		}
		
		for (var i = 0; i < array1.length; i++) {
			if (typeof array1[i] == 'object' && typeof array2[i] == 'object') {
				if (this.arrayEquals(array1[i], array2[i]) == false) {
					return false;
				}
			} else if (array1[i] != array2[i]) {
				return false;
			}
		}
		
		return true;
	},
	
	equals: function(object1, object2) {
		if (object1 == null || object2 == null) {
			return false;
		}
		
		for (var i in object1) {
			if (typeof object1[i] == 'object' && typeof object2[i] == 'object') {
				if (this.equals(object1[i], object2[i]) == false) {
					return false;
				}
			} else if (object1[i] != object2[i]) {
				return false;
			}
		}
		
		return true;
	},
	
	parametersFrom: function(theFunction) {
		return theFunction.toString().replace(/ /g, "").split("(")[1].split(")")[0];
	},
	
	returnFrom: function(theFunction) {
		
	},
	
	toString: function(object, withKey) {
		var string = [];
				
		for (var key in object) {
			if (typeof object[key] == 'object') {
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
	
	evalParameters: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
		var parameters = [];
		for (var i = 0; i < 10; i++) {
			if (eval('arg' + i) != undefined) {
				parameters.push(eval('arg' + i));
			}
		}
		
		return parameters;
	},
	
	clean: function(array) {
		var cleaned = [];
		
		for(var key in array) {
			if (array[key] != null) {
				cleaned.push(array[key]);
			}
		}
		
		return cleaned;
	}
}