var labels = 'AB';
var labelIndex = 0;
var givenloc;
var truelat;
var truelong;
var trueloc;
var currentpos;
var nextflag = 1;
var mapObject;
var distance;

jQuery("#NextStep").click(function(){
  if(truelat==null)
  {
    if(nextflag==1)
      {
        jQuery('#DropMarker').modal('show');
        nextflag++;
      }
      else
        jQuery('#ValidMarker').modal('show');
  }
  else if(truelat!=null)
  {
    drawline();
  }
  else
    console.log("error");
});

jQuery("#Finish").click(function(){
calcresults();
jQuery('#Results').modal('show');
});


function refreshPage() {
  // window.location.reload(true);
  location.reload(true);
}

function calcresults() {
distance = getDistance(trueloc, givenloc);
distance = Number((distance).toFixed(4));
var resultsnode1 = document.getElementById("Resultstext1");
Resultstext1.innerHTML = trueloc;
var resultsnode2 = document.getElementById("Resultstext2");
Resultstext2.innerHTML = givenloc;
var resultsnode3 = document.getElementById("Resultstext3");
Resultstext3.innerHTML = distance + " meters";
}


function rad(x) {
  return x * Math.PI / 180;
};

function getDistance(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

function drawline()
{
  console.log("nextstep2");
  var flightPlanCoordinates = [
    trueloc, givenloc
  ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 1
  });

  flightPath.setMap(mapObject);

  hideme("NextStep");
  unhideme("Finish");
}


function unhideme (divid) {
  var item = document.getElementById(divid);
  if (item) {
    // console.log("unhideme: " + divid);
    item.style.display='block';
  }
}

function hideme (divid) {
  var item = document.getElementById(divid);
  if (item) {
    // console.log("hideme: " + divid);
    item.style.display='none';
  }
}


function writeAddressName(latLng) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    "location": latLng
  },
  function(results, status) {
    if (status == google.maps.GeocoderStatus.OK)
      console.log("yay!")
    else
      console.log("nooo!")
  });
}

function geolocationSuccess(position) {
var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
// Write the formatted address
writeAddressName(userLatLng);

var myOptions = {
  zoom : 17,
  center : userLatLng,
  mapTypeId : google.maps.MapTypeId.ROADMAP
};
// Draw the map
mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
// Place the marker
// new google.maps.Marker({
//   map: mapObject,
//   position: userLatLng
// });

givenloc = userLatLng;
addMarker(userLatLng,mapObject);

// Draw a circle around the user position to have an idea of the current localization accuracy
var circle = new google.maps.Circle({
  center: userLatLng,
  radius: position.coords.accuracy,
  map: mapObject,
  fillColor: '#5BC0DE',
  fillOpacity: 0.2,
  strokeColor: '#5BC0DE',
  strokeOpacity: 0.2
});
mapObject.fitBounds(circle.getBounds());

google.maps.event.addListener(mapObject, 'click', function(event) {
    addMarker(event.latLng, mapObject);
  });

}

function geolocationError(positionError) {
  console.log("error");
}

function initMap() {
// If the browser supports the Geolocation API
if (navigator.geolocation)
{
  var positionOptions = {
    enableHighAccuracy: true,
timeout: 10 * 1000 // 10 seconds
};
navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
}
else
  console.log("Your browser doesn't support the Geolocation API");

}

function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  if(labelIndex==0)
  {
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++],
    map: map
  });
  }
  else if(labelIndex==1){
    var markernew = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++],
    map: map,
    draggable: true
  });

    
    trueloc = location;
    truelat = location.lat();
    truelong = location.lng();

    console.log(truelat + "    " + truelong);

    google.maps.event.addListener(markernew, 'dragend', function (event) {
    truelat = this.getPosition().lat();
    truelong = this.getPosition().lng();
    trueloc = this.getPosition();
    console.log(truelat + "    " + truelong);
});


  }
}

window.onload = initMap;
google.maps.event.addDomListener(window, 'load', initMap);