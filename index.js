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
      var tim_end = Date.now();

      var minLat = bounds.getSouthWest().lat();
      var maxLat = bounds.getNorthEast().lat();
      var minLon = bounds.getNorthEast().lat();
      var maxLon = bounds.getSouthWest().lat();
      
      portal = portals.filter(function(portal){
        return portal.area=="横浜市西区";
      });
      
      console.log("Portals: " + portal.length + ", Time: " + (tim_end-tim_start)/1000 + "ms");
    });
}
