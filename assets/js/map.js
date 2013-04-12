var map, points = [];
function init() {
  map = new OpenLayers.Map('map', {
    displayProjection: new OpenLayers.Projection("EPSG:4326")
  });
  var world_WGS84_wms_layer = new OpenLayers.Layer.WMS("Calles",
          "http://10.36.81.88/cgi-bin/mapserv?map=/var/www/mapa/Maps/osm/mapa.map&",
          {
            layers: 'default'
          },
  {
    gutter: 0, buffer: 0, isBaseLayer: true, transitionEffect: 'resize',
    resolutions: [
      0.35156250000000000000,
      0.17578125000000000000,
      0.08789062500000000000,
      0.04394531250000000000,
      0.02197265625000000000,
      0.01098632812500000000,
      0.00549316406250000000,
      0.00274658203125000000,
      0.00137329101562500000,
      0.00068664550781250000,
      0.00034332275390625000,
      0.00017166137695312500,
      0.00008583068847656250,
      0.00004291534423828120,
      0.00002145767211914060,
      0.00001072883605957030,
      0.00000536441802978516
    ],
    units: "dd",
    maxExtent: new OpenLayers.Bounds(-85.02312, 19.325768, -74.131618, 23.276031),
    projection: new OpenLayers.Projection("EPSG:4326".toUpperCase()),
    sphericalMercator: false
  }
  );
    
  points.push(new OpenLayers.Geometry.Point(-82.36997, 23.12870));
  points.push(new OpenLayers.Geometry.Point(-82.36933, 23.13272));
  points.push(new OpenLayers.Geometry.Point(-82.36244, 23.13277));
  points.push(new OpenLayers.Geometry.Point(-82.36243, 23.12887));
  points.push(points[0]);
  
  linearRing = new OpenLayers.Geometry.LinearRing(points);
  polygonFeature = new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.Polygon([linearRing])
        );

  var polygonLayer = new OpenLayers.Layer.Vector("Simulación");
  polygonLayer.addFeatures([polygonFeature]);

  map.addLayers([world_WGS84_wms_layer, polygonLayer]);
  
  //Point Start
  map.setCenter(
          new OpenLayers.LonLat(-82.36657, 23.13071).transform(
          new OpenLayers.Projection("EPSG:4326"), map.getProjection()),
          15);

  if (!map.getCenter())
    map.zoomToMaxExtent();

  map.addControl(new OpenLayers.Control.LayerSwitcher());
  map.addControl(new OpenLayers.Control.MousePosition());
  map.addControl(new OpenLayers.Control.PanZoomBar());
  
}
