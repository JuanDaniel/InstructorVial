var map, vectorLayer, animation, terminada = false;
function init() {
  map = new OpenLayers.Map('map', {
    displayProjection: new OpenLayers.Projection("EPSG:4326")
  });
  var world_WGS84_wms_layer = new OpenLayers.Layer.WMS("Calles",
          "http://localhost/cgi-bin/mapserv?map=/var/www/mapa/Maps/osm/mapa.map&",
          {
            layers: 'default'
          },
  {
    gutter: 0, buffer: 0, isBaseLayer: true, transitionEffect: 'resize',
    resolutions: [
      0.00001072883605957030,
      0.00000536441802978516
    ],
    units: "dd",
    maxExtent: new OpenLayers.Bounds(-85.02312, 19.325768, -74.131618, 23.276031),
    projection: new OpenLayers.Projection("EPSG:4326".toUpperCase()),
    sphericalMercator: false
  }
  );
    
  vectorLayer = new OpenLayers.Layer.Vector('Recorrido');

  map.addLayers([world_WGS84_wms_layer, vectorLayer]);
  
  //Point Start
  map.setCenter(
          new OpenLayers.LonLat(-82.36657, 23.13071).transform(
          new OpenLayers.Projection("EPSG:4326"), map.getProjection()),
          2);
          
  if (!map.getCenter())
    map.zoomToMaxExtent();

  map.addControl(new OpenLayers.Control.LayerSwitcher());
  map.addControl(new OpenLayers.Control.MousePosition());
  map.addControl(new OpenLayers.Control.PanZoomBar());  
}

/*function simular(){
  //Comienza la simulacion
  $.ajax({
    url: Routing.generate('generar'),
    type: 'post',
    dataType: 'json',
    success: function(data){
      var i=0;
      animation = setInterval(function(){
        ubicar(data[i]);
        i++;
      },100);
    }
  });
}*/

function simular(ruta){
	var i=0;
      animation = setInterval(function(){
        ubicar(ruta[i]);
        i++;
      },100);		
}

function ubicar(d){
  if(typeof (d) != "undefined"){
    point = new OpenLayers.Geometry.Point(d['lon'], d['lat']);
    pointFeature = new OpenLayers.Feature.Vector(point);
    vectorLayer.addFeatures([pointFeature]);
  }
  else{
    clearInterval(animation);
    terminada = true;
  }
}

$('#infracciones').click(function(){
	if(!terminada)
		alert('La simulación no ha concluido');
	else
		window.location = 'infracciones.html';
});
