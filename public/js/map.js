var map = L.map('map');
map.setView([-5.018061, 32.826279], 6);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

var sidebar = L.control.sidebar('sidebar');
map.addControl(sidebar);

/*var marker = L.marker([-5.018061, 32.826279]);
map.addControl(marker);
L.Control.Marker = L.Control.extend({

});*/


$(function() {
	//on each feature
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

  var data;
  $.getJSON('data/map.geojson').then(function(geoJSON) {
    data = geoJSON;
    var options = {
      onEachFeature: onEachFeature
    }
    L.geoJson(geoJSON, options).addTo(map);
  })
});


/*var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [32.826279,-5.018061,]
    }
};

var options={
    onEachFeature: onEachFeature
};
L.geoJson(geojsonFeature,options).addTo(map);*/
