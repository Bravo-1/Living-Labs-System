$(function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoiYmFybmllIiwiYSI6Ik9fMXc5N0kifQ.6o-yfB_TWtg4lYlXMEzcLw';
    var map = L.mapbox.map('map', 'mapbox.streets', {
            zoomControl: false
        })
        .setView([-5.018061, 32.826279], 6);

    //adding zomming to the top right of the map instead of default left of the map
    new L.Control.Zoom({
        position: 'topright'
    }).addTo(map);

    //add markers from the geojson file
    var featureLayer = L.mapbox.featureLayer()
        .loadURL('data/map.geojson')
        .addTo(map);
});
