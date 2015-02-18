function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(35.464512, 139.614334),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions)
  google.maps.event.addListener(map, 'idle', function() {
    var bounds = map.getBounds();
      console.log(bounds.getNorthEast().lat);
      //bounds.getSouthWest();
  });
}