var points = [
    [-44.197383, -19.933029],
    [-44.194866, -19.949030],
];
  


$(window).ready(function () {

    const urlParams = new URLSearchParams(window.location.search);
    const zip = urlParams.get('cep');
    console.log(ol.source); 
    var olview = new ol.View({ center: [0, 0], zoom: 2 }),
    baseLayer = new ol.layer.Tile({ source: new ol.source.OSM() }),
    map = new ol.Map({
      target: document.getElementById('map'),
      renderer: 'canvas',
      view: olview,
      layers: [baseLayer]
    });

    $.get('https://geocode.xyz/' + zip + '?json=1').then(response => {
        var coordinate =  [
            parseFloat(response.longt),
            parseFloat(response.latt)
        ];

        var layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [
                    new ol.Feature({
                        geometry: new ol.geom.Point(
                            ol.proj.fromLonLat(coordinate)
                        ),
                        color: 'blue',
                    }),
                    new ol.Feature({
                        geometry: new ol.geom.Point(
                            ol.proj.fromLonLat([-44.197383, -19.933029])
                        ),
                        color: 'red',
                    })

                ]
            })
        });
        map.addLayer(layer);
        map.getView().setCenter(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
        map.getView().setZoom(15);
    })

  

    

});




