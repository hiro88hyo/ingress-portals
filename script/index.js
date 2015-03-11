var isCluster = true;
var isPortal = true;
var map;
var heatmap;

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(35.464512, 139.614334),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var markers = [];
  var openedInfoWindow;
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  
//  var attacks = [
//    new google.maps.LatLng(35.448197,139.636295)
//    ];

  heatmap = new google.maps.visualization.HeatmapLayer({
  data: attacks
  });
  heatmap.set('radius', 50);
  heatmap.set('opacity', 0.7);
  heatmap.setMap(map);
      
  google.maps.event.addListener(map, 'idle', function(){
    var tim_start = Date.now();
    var bounds = map.getBounds();
    
    var minLat = bounds.getSouthWest().lat();
    var maxLat = bounds.getNorthEast().lat();
    var minLon = bounds.getSouthWest().lng();
    var maxLon = bounds.getNorthEast().lng();
    
    console.log("Lat: [" + minLat +" to " + maxLat +"], Lng: [" + minLon +" to " + maxLon +"]");
    
    markers.forEach(function(marker){
      marker.setMap(null);
    });
    markers = [];
    
    if (isPortal){
      var filterd_portals = portals.filter(function(portal){
        return (portal.lat >= minLat && portal.lat <= maxLat
                && portal.lon >= minLon && portal.lon <= maxLon);
      });
      
      var iconOpt = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 6,
      fillColor: '#3679B9',
      fillOpacity: 0.4,
      strokeColor: '#3679B9',
      strokeWeight: 2,
      strokeOpacity: 0.8 };
      
      filterd_portals.forEach(function(portal){
        var content = "";
        content += "<div>"+portal.name+"</div>";
        content += "<a href='https://www.ingress.com/intel?pll=" + portal.lat + "," + portal.lon + "' target=_blank>";
        content += "intel...</a>";
        var marker = new google.maps.Marker({ position: new google.maps.LatLng(portal.lat, portal.lon), map: map, title: portal.name, icon: iconOpt, zIndex: 10 });
        var infoWindow = new google.maps.InfoWindow({ content: content, disableAutoPan: false, maxWidth: 640, noSupress: true });
        google.maps.event.addListener(marker, 'click', function(_marker, _infoWindow) { // closure
          return function(event) {
            if (openedInfoWindow) { // !!! global
              openedInfoWindow.close();
              openedInfoWindow = null;
            }
            //_infoWindow.setContent(_infoWindow.getContent().replace(/<img no_load_src=/gi, '<img src=')); // lazy img loading
            _infoWindow.open(map, _marker);
            openedInfoWindow = _infoWindow; };
        }(marker, infoWindow));
        markers.push(marker);
      });
    }
    if(isCluster){
      markerCluster.clearMarkers();
      markerCluster.addMarkers(markers);
    }else{
      markerCluster.clearMarkers();
    }
    
    var tim_end = Date.now();
    console.log("Portals: " + filterd_portals.length + ", Time: " + (tim_end-tim_start) + "ms");
  });

  if(isCluster){
    var markerCluster = new MarkerClusterer(map);
  }
}

function toggleCluster(){
  isCluster = isCluster?false:true;
}
function toggleHeatmap(){
  heatmap.setMap(heatmap.getMap() ? null : map);
}
function togglePortal(){
  isPortal =isPortal?false:true;
}
