var map = L.map('map');
    map.setView([-5.018061, 32.826279], 6);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; OpenStreetMap contributors'
    }).addTo(map);

    var marker = L.marker([-5.018061, 32.826279]).addTo(map);

    var sidebar = L.control.sidebar('sidebar').addTo(map);