/****************************************** Setting Up Map Component ******************************************/

// basemap options
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});



// basemap control
var baseMaps = {
	"OpenStreetMap": OpenStreetMap_Mapnik,
	"CARTO Voyager": CartoDB_Voyager
};



// map component
var map = L.map('map', {
	center: [44.074817, -78.995836], // default centre
	zoom: 8, // default zoom,
	defaultExtentControl: true, // default extent button
	layers: [CartoDB_Voyager]
});



// Disclaimer text for the splash
var disclaimer = "<h2>Travelling from City to City</h2>"
+"<h3>Comparing intercity transit modes and policy implications</h3>"
+"<p><b>Objectives</b>"
+"<ol><li>Understand inercity transit modes in southern Ontario</li><li>Visualize intercity transit factors and tradeoffs</li><li>Characterize variability in access to intercity transit at the city scale</li></ol>"
;


// splash/info button
var infoButton = L.control.infoButton({
    position: 'topleft',
    linkTitle: 'About',
    title: '<h2>About</h2>',
    show: false,
    html: disclaimer
}).addTo(map);




/****************************************** Data Layers and Styling ******************************************/

// Transit Hubs

// popup function for hubs
function popupHubs(feature, layer) {
    var hubCity = feature.properties.City,
        hubName = feature.properties.Name,
        hubMode = feature.properties.Transit_Mode,
        hubMain = feature.properties.Is_Main_Hub;
    
    layer.bindPopup(hubName);
}

// hubs style
var styleHubs = {
    radius: 8,
    fillColor: "#ffffff",
    color: "#000000",
    weight: 2.5,
    opacity: 1,
    fillOpacity: 0.9
};

// pointToLayer function to determine which hubs to display in which style
function cmarker(feature, latlng) {
    return L.circleMarker(latlng, styleHubs); // in given style
}

var transit_hubs = L.geoJson(hubs, {
    pointToLayer: cmarker,
    onEachFeature: popupHubs
});


map.addLayer(transit_hubs);




/****************************************** Adding all layers to map ******************************************/

// layers that can be toggled in the control
var overlayMaps = {
"Intercity Transit Hubs": transit_hubs
};

// add basemap layers of the control to the map
L.control.layers(baseMaps, overlayMaps).addTo(map);

// Add scale bar to map
L.control.scale().addTo(map);

// Data attribution to CHARIM
//map.attributionControl.addAttribution("CHARIM");




