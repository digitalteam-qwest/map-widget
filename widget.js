class leafletMapWidget {
    constructor(wgs84) {
        this.WGS84 = wgs84;
    }

    showMap() {
        var bSuccess = false;

        var map = null;
        try
        {
            map = L.map('widgetmap').setView([this.WGS84.latitude, this.WGS84.longitude], 13);
            bSuccess = true;
        }
        catch (err) {}

        if (!bSuccess) {
            map = L.map('widgetmap').setView([53.22,-2.73], 13);
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
    }
}









<script type="text/javascript">
    $('input[name="text5"]').replaceWith("<div id='text5map' />");
    
    var map = L.map('text5map').setView([53.22,-2.73], 13);
    
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
    var vLostockGralam = null;
    var vRudheath = null;
    
    var vRedStyle = {
        "color": "#ff0000"
        };
        
    var vGreenStyle = {
        "color": "#00ff00"
        };
        
    var vBlueStyle = {
        "color": "#0000ff"
        };
        
    $.ajax({
        url: 'https://fs-filestore-eu.s3.eu-west-1.amazonaws.com/qwest/assets/GeoJSONTest/GrassCutting.geojson',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET",
        dataType: "json",
        success: function (result) {
            vGrassCutting = L.geoJson(result, { style: vBlueStyle });
            
            $.ajax({
                url: 'https://fs-filestore-eu.s3.eu-west-1.amazonaws.com/qwest/assets/GeoJSONTest/LostockGralam.geojson',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                type: "GET",
                dataType: "json",
                success: function (result) {
                    vLostockGralam = L.geoJson(result, { style: vGreenStyle });
                    
                    $.ajax({
                        url: 'https://fs-filestore-eu.s3.eu-west-1.amazonaws.com/qwest/assets/GeoJSONTest/Rudheath.geojson',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        type: "GET",
                        dataType: "json",
                        success: function (result) {
                            vRudheath = L.geoJson(result, { style: vRedStyle });

                            var baseLayers = {
                	            "Mapbox": vMapBox
                            };
                            
                            var overlays = {
                            	"Grass Cutting": vGrassCutting,
                            	"Region - Lostock Gralam": vLostockGralam,
                            	"Region - Rudheath": vRudheath
                            };
                            
                            L.control.layers(baseLayers, overlays).addTo(map);
                        },
                        error: function () {
                            console.log("error");
                        }
                    });
                },
                error: function () {
                    console.log("error");
                }
            });
        },
        error: function () {
            console.log("error");
        }
    });
</script>