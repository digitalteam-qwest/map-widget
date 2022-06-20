class leafletMapWidget {
    constructor(UPRN) {
        this.UPRN = UPRN;
    }

    showMap() {
        var map = L.map('widgetmap').setView([53.22,-2.73], 13);
    
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
