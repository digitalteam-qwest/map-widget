class leafletMapWidget {
    constructor(wgs84) {
        this.WGS84 = wgs84;
    }

    showMap() {
        var bSuccess = false;

        var map = null;
        try
        {
            if ((this.WGS84.latitude != 0.0) && (this.WGS84.longitude != 0.0)) {
                map = L.map('widgetmap').setView([this.WGS84.latitude, this.WGS84.longitude], 15);
                bSuccess = true;
            }
        }
        catch (err) {}

        if (!bSuccess) {
            map = L.map('widgetmap').setView([53.213, -2.902], 13);
        }
    
        // load a tile layer
        var vMapBox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiamR1bmNhbGYiLCJhIjoiY2wxMHJxMm55MDFiZDNjbnM3cGV3YzF3dyJ9.JwiikZcJsfBr2ebIytXcxw'
        }).addTo(map);

        var vGrassCutting = null;
        
        var vGreenStyle = {
            "color": "#00ff00"
            };
            
        $.ajax({
            url: 'https://fs-filestore-eu.s3.eu-west-1.amazonaws.com/qwest/assets/GeoJSONTest/GrassCutting.geojson',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "GET",
            dataType: "json",
            success: function (result) {
                vGrassCutting = L.geoJson(result, {
                    style: vGreenStyle,
                    onEachFeature: function (f, l) {
                        debugger;
                    }

                });
/*                
                
                
                .bindPopup(function (layer) {
                    return layer.feature.properties.description;
                });
*/                

                var baseLayers = {
                    "Mapbox": vMapBox
                };
                
                var overlays = {
                    "Grass Cutting": vGrassCutting
                };

                map.addLayer(vGrassCutting);
                L.control.layers(baseLayers, overlays).addTo(map);
            },
            error: function () {
                console.log("error");
            }
        });
    }
}
