document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map
    var map = L.map('map').setView([9.6922, 76.5523], 13);

    // Add OpenStreetMap as the base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Fetch and add GeoJSON data
    fetch('Meenachil_RainGauge_Locations/Meenachil_RainGauge_Locations_with_dummy.geojson')
        .then(response => response.json())
        .then(geojsonData => {
            var geojsonLayer = L.geoJson(geojsonData, {
                style: function (feature) {
                    return { color: feature.properties.color || '#3388ff' };
                },
                onEachFeature: function (feature, layer) {
                    layer.on('click', function () {
                        var popupContent = '<p>Location: ' + feature.properties.Location + '</p>' +
                                          '<p>Rainfall: ' + feature.properties.Rainfall + '</p>' +
                                          '<p>Humidity: ' + feature.properties.Humidity + '</p>' +
                                          '<p>River Water Level: ' + feature.properties["River Water Level"] + '</p>';
                        layer.bindPopup(popupContent).openPopup();

                        // Create and display overlay
                        var overlay = document.createElement('div');
                        overlay.className = 'map-overlay';
                        overlay.innerHTML = '<strong>' + feature.properties.name + '</strong><br>' +
                                            feature.properties.description;
                        document.body.appendChild(overlay);

                        // Position the overlay
                        var overlayPosition = map.latLngToContainerPoint(layer.getLatLng());
                        overlay.style.position = 'absolute';
                        overlay.style.left = overlayPosition.x + 'px';
                        overlay.style.top = overlayPosition.y + 'px';
                    });
                }
            }).addTo(map);
        });
});