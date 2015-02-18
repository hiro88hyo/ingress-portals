function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(35.464512, 139.614334),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions)
  google.maps.event.addListener(map, 'idle', filterPortals);
}

function filterPortals(){
  var tim_start = Date.now();
  var bounds = map.getBounds();
  var tim_end = Date.now();
  console.log("Time: " + (tim_end-tim_start)/1000 + "ms");
}
