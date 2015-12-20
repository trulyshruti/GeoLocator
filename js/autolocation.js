$("#NextStep1").click(function(){
  console.log("NextStep1 clicked");
  $('#DropMarker').modal('show');
});

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
new google.maps.Marker({
  map: mapObject,
  position: userLatLng
});
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
}

function geolocationError(positionError) {
  console.log("error");
}

function geolocateUser() {
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

window.onload = geolocateUser;