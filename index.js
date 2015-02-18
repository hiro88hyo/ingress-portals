function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(35.464512, 139.614334),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions)
    google.maps.event.addListener(map, 'idle', function(){
      var tim_start = Date.now();
      var bounds = map.getBounds();

      var minLat = bounds.getSouthWest().lat();
      var maxLat = bounds.getNorthEast().lat();
      var minLon = bounds.getSouthWest().lng();
      var maxLon = bounds.getNorthEast().lng();

      
      console.log("Lat: [" + minLat +" to " + maxLat +"], Lng: [" + minLon +" to " + maxLon +"]");
      var filterd_portals = portals.filter(function(portal){
        return (minLat >= portal.lat && portal.lat <= maxLat
                && minLon >= portal.lon && portal.lon <= maxLon);
      });
      
      var tim_end = Date.now();
      console.log("Portals: " + filterd_portals.length + ", Time: " + (tim_end-tim_start) + "ms");
    });
}
