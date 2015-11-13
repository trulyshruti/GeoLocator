
	function findDistance(yours, other) {
		var latitude = 0;
		var longitude = 0;
		var yourLoc = yours;
		var otherLoc = other;
		getLat(yourLoc, function(yourLat) {
			getLat(otherLoc, function(otherLat) {
				getLon(yourLoc, function(yourLon) {
					getLon(otherLoc, function(otherLon) {
							
							// stuff goes here
							
						});
					});
				});
			});
    }
    
    function findlonglat(address){
    	getLat(address, function(yourLat){
    			getLon(address, function(yourLon){
    				document.getElementById('long').value = yourLon;
	  				document.getElementById('lat').value = yourLat;
	  				console.log(yourLon+" "+yourLat);
    			});
    	});
    }
    
	
	function getLat(address, callback) {
        if (address) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                var result = 0;
				if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
						var lati = results[0].geometry.location.lat();
						result = lati;
                    }
				}
				callback(result);
            });
        }
        else {
			callback(0);
    	}
    }
    
    function getLon(address, callback) {
        if (address) {
			var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
				var result = 0;
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
						var longi = results[0].geometry.location.lng();
						result = longi;
                    }
				}
				callback(result);
            });
        	}
        else {
           	// error('Please enter an address');
			callback(0);
		}
    }
    function findMe() {
    	// alert('You are in Princeton, NJ. \nLatitude: 40.3487° N, Longitude: 74.6593° W');
    	getLocation();
    }
	    

	function getLocation()
	{
		if (navigator.geolocation)
		{
		    navigator.geolocation.getCurrentPosition(showPosition);
		}
		else {
			//alert("Sorry, geolocation is not supported by this browser.");
		}
	}
	
	function showPosition(position)
	{
	  	var whereAmI = "Latitude: " + position.coords.latitude;
	  	whereAmI += ", Longitude: " + position.coords.longitude; 
	  	
	  	var lati = position.coords.latitude;
	  	var longi = position.coords.longitude; 
	  	
	  	// stuff goes here
	  	
	  	console.log(whereAmI);
	}
	
 