EMS = {
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
		this.setCenter = function(emsLonLat) {};
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

Screw.Unit(function() {
	describe('Mimic Util', function() {
		describe('when evaluating parameters', function() {
			it('should evaluate three parameters and return them as an array', function() {
				expect(Mimic.Util.Parameters.evaluate('string', 3, 4)).to(equal, ['string', 3, 4]);
	  		});
			
			it('should evaluate no parameters and return an empty array', function() {
				expect(Mimic.Util.Parameters.evaluate()).to(equal, []);
	  		});
			
			it('should evaluate an object parameter and return it in an array', function() {
				expect(Mimic.Util.Parameters.evaluate({'stuff': 4})).to(equal, [{'stuff': 4}]);
	  		});
			
			it('should evaluate a function parameter and return it in an array', function() {
				var theFunction = function() { return true; };
				expect(Mimic.Util.Parameters.evaluate(theFunction)).to(equal, [theFunction]);
	  		});
			
			it('should evaluate up to ten parameters', function() {
				expect(Mimic.Util.Parameters.evaluate(0,1,2,3,4,5,6,7,8,9)).to(equal, [0,1,2,3,4,5,6,7,8,9]);
			});
			
			it('should evaluate nulls', function() {
				expect(Mimic.Util.Parameters.evaluate(null, null)).to(equal, [null, null]);
			});
			
			it('should clone array when evaluating parameters', function() {
				var originalArray = [1, 2, 3];
				var evaluated = Mimic.Util.Parameters.evaluate(originalArray);
				evaluated[0] = 4;
				
				expect(originalArray[0]).to(equal, 1);
			});
			
			it('should clone object when evaluating parameters', function() {
				var originalObject = {'key': 'value'};
				var evaluated = Mimic.Util.Parameters.evaluate(originalObject);
				evaluated['key'] = 'anothervalue';
				
				expect(originalObject['key']).to(equal, 'value');
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
				
				expect(originalObject['secondObject']['anArray'][0]).to(equal, 5);
				expect(originalObject['firstArray'][1][1]).to(equal, 2);
			});
		});
		
		describe('when taking parameters from the string representation of a function', function() {
			it('should return parameters as a string', function() {
				var theFunction = function(firstOne, secondOne) { return true; };
				expect(Mimic.Util.Parameters.arguments(theFunction)).to(equal, 'firstOne,secondOne');
			});
			
			it('should return an empty string as there are no parameters in the string given', function() {
				var theFunction = function() { return true; };
				expect(Mimic.Util.Parameters.arguments(theFunction)).to(equal, '');
			});
		});
		
		describe('when checking if an array contains an object', function() {
			it('should return a number because the array was found in the array', function() {
				expect(Mimic.Util.Array.contains([[1, {}], [2, 'left'], []], [2, 'left'])).to(equal, 1);
			});
			
			it('should return false because the parameter is not contained in the array', function() {
				expect(Mimic.Util.Array.contains([[1, {}], [2, 'left'], ['z']], [null, null])).to(be_false);
			});
			
			it('should work with more complicated values', function() {
				var icon = EMS.Services.StandardIcons.poi('WIDGET.TILE_PATH', "052d6a", "1589d3", 'label');
				var marker = { lonlat: '1, 2', icon:icon, popupContents:'popupContents'};
														
				var theArray = [['something'], [new EMS.Popup('listing_popup', marker.lonlat, new OpenLayers.Size(220,100),
		                    marker.popupContents, marker.icon, true)]];
				var theValue = [new EMS.Popup('listing_popup', marker.lonlat, new OpenLayers.Size(220,100),
		                    marker.popupContents, marker.icon, true)];
				
				expect(Mimic.Util.Array.contains(theArray, theValue)).to(equal, 1);
			});

			it('should fail with more complicated values', function() {
				var icon = EMS.Services.StandardIcons.poi('WIDGET.TILE_PATH', "052d6a", "1589d3", 'label');
				var marker = { lonlat: '1, 2', icon:icon, popupContents:'popupContents'};
														
				var theArray = [['something'], [new EMS.Popup('listing_popup', marker.lonlat, new OpenLayers.Size(220,100),
		                    marker.popupContents, marker.icon, true)]];
				var theValue = [new EMS.Popup('listing_popup1', marker.lonlat, new OpenLayers.Size(220,100),
		                    marker.popupContents, marker.icon, true)];
				
				expect(Mimic.Util.Array.contains(theArray, theValue)).to(be_false);
			});
		});
		
		describe('when cleaning an array', function() {
			it('should return a new array with no null values', function() {
				expect(Mimic.Util.Array.clean([2, null, "3"])).to(equal, [2, "3"]);
			});
			
			it('should return a new array with no undefined values', function() {
				expect(Mimic.Util.Array.clean([2, undefined, "3"])).to(equal, [2, "3"]);
			});
		});
		
		describe('when producing an error message', function() {
			it('should prefix the error message correctly', function() {
				this.should.say('Your specification did not pass!<br/><p>here is my error message');
				Mimic.Util.Error.say('here is my error message');
			});
			
			it('should not prefix the error message', function() {
				this.should.say('here is my error message');
				Mimic.Util.Error.say('here is my error message', true);
			});
			
		});
	});
});