// Initialize the map
const map = L.map('map').setView([0, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Fetch earthquake data
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
    .then(response => response.json())
    .then(data => {
        data.features.forEach(earthquake => {
            const coordinates = earthquake.geometry.coordinates;
            const magnitude = earthquake.properties.mag;

            // Calculate circle size
            const radius = magnitude * 10000;

            // Create a circle marker
            L.circle([coordinates[1], coordinates[0]], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: radius
            }).addTo(map).bindPopup(`Magnitude: ${magnitude}`);
        });
    });
