$("#NextStep1").click(function(){
  console.log("NextStep1 clicked");
  $('#DropMarker').modal('show');
});

var labels = 'AB';
var labelIndex = 0;
var truelat;
var truelong;
var currentpos;

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
  zoom : 16,
  center : userLatLng,
  mapTypeId : google.maps.MapTypeId.ROADMAP
};
// Draw the map
var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
// Place the marker
// new google.maps.Marker({
//   map: mapObject,
//   position: userLatLng
// });

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

    google.maps.event.addListener(markernew, 'dragend', function (event) {
    truelat = this.getPosition().lat();
    truelong = this.getPosition().lng();
    console.log(truelat + "    " + truelong);
});


  }
}

window.onload = initMap;
google.maps.event.addDomListener(window, 'load', initMap);