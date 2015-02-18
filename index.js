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
        return (portal.lat >= minLat && portal.lat <= maxLat
                && portal.lon >= minLon && portal.lon <= maxLon);
      });

      var iconOpt = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: '#3679B9',
      fillOpacity: 0.4,
      strokeColor: '#3679B9',
      strokeWeight: 2,
      strokeOpacity: 0.8 };

      filterd_portals.forEach(function(portal){
        var marker = new google.maps.Marker({ position: new google.maps.LatLng(portal.lat, portal.lon), map: map, title: portal.name, icon: iconOpt, zIndex: 10 });
      });
      
      var tim_end = Date.now();
      console.log("Portals: " + filterd_portals.length + ", Time: " + (tim_end-tim_start) + "ms");
    });
}
