// API
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var url2 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

// GET Request
d3.json(url, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {



    // Create Popups
    // Create GeoJSON Layer
    var earthquake = L.geoJSON(earthquakeData, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +
            "</h3><h3>Location: " + feature.properties.place + 
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        },

        pointToLayer: function(feature, latlng) {
            return new L.circle(latlng,
                {radius: getRadius(feature.properties.mag),
                fillColor: getColor(features.properties.mag),
                fillOpacity: .6,
                color: "#000",
                stroke: true,
                weight: .8
            })
        }
    });

    // Send layer to createMap function
    createMap(earthquake);

}
    function createMaps(earthquake) {

        // Create Street and Dark Map layers
        var street = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
        "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
        "T6YbdDixkOBWH_k9GbS8JQ");

        var darkmap = L.tilelayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
        "access_token=pk.eyJ1IjoidGJlcnRvbiIsImEiOiJjamRoanlkZXIwenp6MnFuOWVsbGo2cWhtIn0.zX40X0x50dpaN96rKQKarw." +
        "T6YbdDixkOBWH_k9GbS8JQ");

        // Create Base Map
        var baseMap = {
            "Street Map": street,
            "Dark Map": darkmap
        };

        // // Create Plate Layer
        // var plates = new L.LayerGroup();

        // Create Overlay Maps 
        var overlayMaps = {
            "Earthquakes": earthquake,
            // "Tectonic Plates": plates
        };

        // Create our Map
        var myMap = L.map("map", {
            center: [
                37.09, -95.71],
            zoom: 5,
            layers: [street, dark, earthquake]
        });

        // Create Layer Control
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);

        // Create Legend 
        var legend = L.control({position: 'bottomright'});

            legend.onAdd = function (myMap) {
                var div = L.DomUtil.create('div', 'info legend'),
                grades = [o, 1, 2, 3, 4, 5, 6, 7, 8],
                labels = [];

            // div.innerHTML+='Magnitude<br><hr>'

            // Create Loop 
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i +1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }
            return div;

        };

        legend.addTo(myMap);
    }

    // Create colors 
    function getColor(d){
        return d > 5 ? "#a54500":
        d  > 4 ? "#cc5500":
        d > 3 ? "#ff6f08":
        d > 2 ? "#ff9143":
        d > 1 ? "#ffb37e":
                    "#ffcca5";
    }
        
    // Format Magnitude Radius
    function getRadius(value) {
        return value*25000
    }



    // pointToLayer: function(feature, latlng) {
    //     var color;
    //     var r = 255;
    //     var g = Math.floor(255-80*feature.properties.mag);
    //     var b = Math.floor(255-80*feature.properties.mag);
    //     color = "rgb("+r+","+g+","+b+")"

    //     var geojsonMarketOptions = {
    //         radius: 4*feature.properties.mag,
    //         fillColor: color,
    //         color: "black",
    //         weight: 1,
    //         opacity: 1,
    //         fillOpacity: 0.8
    //     };
    //     return L.circleMarket(latlng, geojsonMarkerOptions)
    // }

    // function getColor(d) {
    //     return d < 1 ? 'rgb(255,255,255)' :
    //           d < 2 ? 'rgb(255,225,225)' :
    //           d < 3 ? 'rgb(255,195,195)' :
    //           d < 4 ? 'rgb(255,165,165)' :
    //           d < 5 ? 'rgb(255,135,135)' :
    //           d < 6 ? 'rgb(255,105,105)' :
    //           d < 7 ? 'rgb(255,75,75)' :
    //           d < 8 ? 'rgb(255,45,45)' :
    //           d < 9 ? 'rgb(255,15,15)' :
    //                      'rgb(255,0,0)';
    // }
