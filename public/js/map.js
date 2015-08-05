var map = L.map('map');
map.setView([-5.018061, 32.826279], 6);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

var sidebar = L.control.sidebar('sidebar');
map.addControl(sidebar);




$(function() {
    //on each feature
    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.popupContent) {

            var html = '<div>';
            
                html += "<h3>" + feature.name + "</h3> <br> <h3>" + feature.properties.popupContent + "</h3>";
           
            html += '</div>';


            //layer.bindPopup(feature.properties.popupContent);
            //Onclick function to get information particular living labs

            layer.on("click", function(feature) {
                $("#sidebar").removeClass("collapsed");
                $("#project").addClass("active");
                $(".projCont").html(html);

            });

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
