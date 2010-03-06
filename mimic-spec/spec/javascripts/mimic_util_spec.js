MyProduct = {
  Services: {
      communicationMode: "",
      Map: function(divName, others) {
        this.addControl = function() {};
        this.events = new Object();
        this.events.register = function() {};
        this.pan = function(dx, dy) {};
		this.markersLayer = { 
			addMarker: function(marker){},
			clearMarkers: function(){},
			markers: [ {listingId: 0, popupContents: ''} ] };
        this.zoomToExtent = function (bounds) {
            this.bounds = bounds;
        };
        this.addPopup = function(p) {
            this.popup = p;
        };
		this.removePopup = function(popup) {};
		this.zoomTo = function(zoomLevel) {};
		this.setCenter = function(MyProductLonLat) {};
		this.mouseDefaults = { cancelRecenter: function() {} };
      },
      Geocoder: function() {
          this.findAddress = function(street, suburb, state, callback) {
                geocoder_findAddress_calledWith = { street: street,
                        suburb: suburb, state: state, callback: callback };
          };
      },
	  StandardIcons: { poi: function(a, b, c, label) { return label; } }
  },
  Control: {
      Copyright: function() {},
      Scale: function() {},
      MouseDefaults: function() { this.name = "MouseDefaults"; },
      ZoomBar: function() { this.name = "ZoomBar"; },
      PanButton: function(direction) { this.name = ("PanButton-" + direction); }
  },
  Bounds: function(left, bottom, right, top) { return [left, bottom, right, top]; },
  Popup: function(name, lonlat, bounds, contents, icon, b) {
	  this.name = name;
      this.lonlat = lonlat;
      this.bounds = bounds;
      this.contents = contents;
	  this.icon = icon;
      this.setSize = function(s) {
          this.size = s;
      };
	  this.hide = function() {};
  },
  LonLat: function(lon, lat) {
      this.longitude = lon;
      this.latitude = lat;
  }
};

OpenLayers = {
  Control: { KeyboardDefaults: function() { this.name = "KeyboardDefaults"; } },
  Size: function(lat, lon) {
      this.lat = lat;
      this.lon = lon;
  },
  Marker: function(lonlat, icon) {
	this.popupContents;
	this.index;
	this.listingId; 
	this.events = {
		register: function(event, marker, action) {}
	  }
	}
};

describe('Util', function() {
	describe('when evaluating parameters', function() {
		it('should evaluate three parameters and return them as an array', function() {
			expect(Mimic.Util.Parameters.evaluate('string', 3, 4)).toEqual(['string', 3, 4]);
  		});
		
		it('should evaluate no parameters and return an empty array', function() {
			expect(Mimic.Util.Parameters.evaluate()).toEqual([]);
  		});
		
		it('should evaluate an object parameter and return it in an array', function() {
			expect(Mimic.Util.Parameters.evaluate({'stuff': 4})).toEqual([{'stuff': 4}]);
  		});
		
		it('should evaluate a function parameter and return it in an array', function() {
			var theFunction = function() { return true; };
			expect(Mimic.Util.Parameters.evaluate(theFunction)).toEqual([theFunction]);
  		});
		
		it('should evaluate up to ten parameters', function() {
			expect(Mimic.Util.Parameters.evaluate(0,1,2,3,4,5,6,7,8,9)).toEqual([0,1,2,3,4,5,6,7,8,9]);
		});
		
		it('should evaluate nulls', function() {
			expect(Mimic.Util.Parameters.evaluate(null, null)).toEqual([null, null]);
		});
		
		it('should clone array when evaluating parameters', function() {
			var originalArray = [1, 2, 3];
			var evaluated = Mimic.Util.Parameters.evaluate(originalArray);
			evaluated[0] = 4;
			
			expect(originalArray[0]).toEqual(1);
		});
		
		it('should clone object when evaluating parameters', function() {
			var originalObject = {'key': 'value'};
			var evaluated = Mimic.Util.Parameters.evaluate(originalObject);
			evaluated['key'] = 'anothervalue';
			
			expect(originalObject['key']).toEqual('value');
		});
		
		it('should clone deep object when evaluating parameters', function() {
			var originalObject = {
				firstObject: { 1:2, 3:4 },
				secondObject: {
					anArray: [5, 8, 11]
				},
				firstArray: [
					function() {},
					{
						1:2, 3:4
					}
				]
			};
			var evaluated = Mimic.Util.Parameters.evaluate(originalObject);
			evaluated[0]['secondObject']['anArray'][0] = 1;
			evaluated[0]['firstArray'][1][1] = 3;
			
			expect(originalObject['secondObject']['anArray'][0]).toEqual(5);
			expect(originalObject['firstArray'][1][1]).toEqual(2);
		});
		
		it('should clone objects with circular dependencies', function() {
			var originalObject = {
				firstObject: { 1:2, 3:4 },
				secondObject: {
					thirdObject: null
				},
				firstArray: [
					function() {},
					{
						1:2, 3:4
					}
				]
			};
			originalObject.secondObject.thirdObject = originalObject;
			
			var newObject = Mimic.Util.Object.clone(originalObject);
			expect(Mimic.Util.Object.equals(newObject, originalObject)).toBeTruthy();
		});
	});
	
	describe('when taking parameters from the string representation of a function', function() {
		it('should return parameters as a string', function() {
			var theFunction = function(firstOne, secondOne) { return true; };
			expect(Mimic.Util.Parameters.arguments(theFunction)).toEqual('firstOne,secondOne');
		});
		
		it('should return an empty string as there are no parameters in the string given', function() {
			var theFunction = function() { return true; };
			expect(Mimic.Util.Parameters.arguments(theFunction)).toEqual('');
		});
	});
	
	describe('when checking if an array contains an object', function() {
		it('should return a number because the array was found in the array', function() {
			expect(Mimic.Util.Array.contains([[1, {}], [2, 'left'], []], [2, 'left'])).toEqual(1);
		});
		
		it('should return false because the parameter is not contained in the array', function() {
			expect(Mimic.Util.Array.contains([[1, {}], [2, 'left'], ['z']], [null, null])).toBeFalsy();
		});
		
		it('should work with more complicated values', function() {
			var icon = MyProduct.Services.StandardIcons.poi('WIDGET.TILE_PATH', "052d6a", "1589d3", 'label');
			var marker = { lonlat: '1, 2', icon:icon, popupContents:'popupContents'};
													
			var theArray = [['something'], 
							[new MyProduct.Popup('listing_popup', marker.lonlat, new OpenLayers.Size(220,100),
	                    marker.popupContents, marker.icon, true)]];
			var theValue =  [new MyProduct.Popup('listing_popup', marker.lonlat, new OpenLayers.Size(220,100),
	                    marker.popupContents, marker.icon, true)];
			
			expect(Mimic.Util.Array.contains(theArray, theValue)).toEqual(1);
		});

		it('should fail with more complicated values', function() {
			var icon = 1;
			var marker = { lonlat: '1, 2', icon:icon, popupContents:'popupContents'};
													
			var theArray = [['something'], 
							[new MyProduct.Popup('listing_popup', marker.lonlat, new OpenLayers.Size(220,100),
	                    marker.popupContents, marker.icon, true)]];
	
			var theValue =  [new MyProduct.Popup('listing_popup1', marker.lonlat, new OpenLayers.Size(220,100),
	                    marker.popupContents, marker.icon, true)];
			
			expect(Mimic.Util.Array.contains(theArray, theValue)).toBeFalsy();
		});
	});
	
	describe('when cleaning an array', function() {
		it('should return a new array with no null values', function() {
			expect(Mimic.Util.Array.clean([2, null, "3"])).toEqual([2, "3"]);
		});
		
		it('should return a new array with no undefined values', function() {
			expect(Mimic.Util.Array.clean([2, undefined, "3"])).toEqual([2, "3"]);
		});
	});
	
	describe('when checking the equality of two objects', function() {
		it('should work with complex objects', function() {
			var object = {
				x: NaN,
				'here': function() {
					this.something = 'more';
					this.array = [1, 2, 3, 4];
					
					return '3';
				}, 
				'array': [1,2,3,{
					'deeper': 'object',
					'anotherArray': [1,2,3,4,5,6],
					'function': function() {
							this.isCool = true;
							[1,2,3,4,5].join(geometry, this);
						}
					}],
				'object': {
					'object': { 'more': 'yep!'},
					'anotherArray': [1,2,3,4,5,6],
					'function': function() {
						this.isCool = true;
					}
				},
				'null': null,
				'id': Array.prototype.join.apply(this, ['arguments'])
			}
			
			expect(Mimic.Util.Object.equals(object, object)).toBeTruthy();
		});
		
		it('should work with circular dependencies', function() {
			var originalObject = {
				firstObject: { 1:2, 3:4 },
				secondObject: {
					thirdObject: null
				},
				firstArray: [
					function() {},
					{
						1:2, 3:4
					}
				]
			};
			originalObject.secondObject.thirdObject = originalObject;
			
			expect(Mimic.Util.Object.equals(originalObject, originalObject)).toBeTruthy();
		});
		
		it('should see two null values of the right type as equal', function() {
			expect(Mimic.Util.Object.equals(undefined, null)).toBeFalsy();
			expect(Mimic.Util.Object.equals(null, null)).toBeTruthy();
		});
		
		it('should see two undefined values as equal', function() {
			expect(Mimic.Util.Object.equals(undefined, undefined)).toBeTruthy();
		});
		
		it('should see two NaN values of the right type as equal', function() {
			expect(Mimic.Util.Object.equals(NaN, NaN)).toBeTruthy();
		});
		
		it('should see two different strings as not equal', function() {
			expect(Mimic.Util.Object.equals('hello', 'hello2')).toBeFalsy();
		});
		
		it('should see two different numbers as not equal', function() {
			expect(Mimic.Util.Object.equals(1, 2)).toBeFalsy();
		});
		
		it('should ignore attributes is assigned to itself', function() {
			var objectWithRecursiveValue = function() {
				this.as = this;
				this.something = 'cool!';
			};
			
			var objectWithoutRecursiveValue = function() {
				this.something = 'cool!';
			};
			
			expect(Mimic.Util.Object.equals(new objectWithRecursiveValue(), new objectWithoutRecursiveValue())).toBeTruthy();
		});
		
		it('should equate kinda complex objects as equal', function() {
			expect(Mimic.Util.Object.equals({'name': 'show', 'value':['speed']}, {'name': 'show', 'value':['sp33d']})).toBeFalsy();
		});
	});
	
	describe('when checking the equality of two arrays', function() {
		it('should work with complex arrays', function() {
			var array = [
				function() {
					this.something = 'more';
					this.array = [1, 2, 3, 4];
				}, 
				[1,2,3,{
					'deeper': 'object',
					'anotherArray': [1,2,3,4,5,[6]],
					'function': function() {
						this.isCool = true;
						[1,2,3,4,5].join(geometry, this);
					}
				}],
				{
					'object': { 'more': 'yep!'},
					'anotherArray': [1,2,3,4,5,6],
					'function': function() {
						this.isCool = true;
					}
				},
				null,
				Array.prototype.join.apply(this, ['arguments'])
			]
			
			expect(Mimic.Util.Object.equals(array, array)).toBeTruthy();
		});
		
		it('should be false if an array given is not valid', function() {
			expect(Mimic.Util.Object.equals([], null)).toBeFalsy();
			expect(Mimic.Util.Object.equals([], undefined)).toBeFalsy();
		});
		
		it('should be true if the array contains nothing but nulls', function() {
			expect(Mimic.Util.Object.equals([null, null], [null, null])).toBeTruthy();
		});

		it('should be true if the array contains nothing but undefined', function() {
			expect(Mimic.Util.Object.equals([undefined, undefined], [undefined, undefined])).toBeTruthy();
		});
	});
});